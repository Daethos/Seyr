import { all, call, put, takeEvery, take, AllEffect, select, actionChannel } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as asceanAPI from '../../utils/asceanApi';
import { setDialog, setInstantStatus, setShowDialog, setStatistics } from '../reducers/gameState';
import { setCombatResolution, setCombatInput, setDamageType, setEffectResponse, setEnemyActions, setPlayerBlessing, setToggleDamaged, setWeaponOrder, setCombat, clearCombat, setEnemy, setNpc, clearNonAggressiveEnemy, clearNpc, setCombatTimer, setEnemyPersuaded, setPlayerLuckout, setPlayerWin, setEnemyWin } from '../reducers/combatState';
import { CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import EventEmitter from '../phaser/EventEmitter';
import { getNpcDialog } from '../../components/GameCompiler/Dialog';
import { getNodesForNPC, npcIds } from '../../components/GameCompiler/DialogNode';
import pako from 'pako';
import rootSocketSaga, { SOCKET } from './socketSaga';
import { getSocketInstance } from './socketManager';
import { userSaga } from './userSaga';
import { communitySaga } from './communitySaga';
import { gameSaga, workGetGainExperienceFetch, workGetLootDropFetch } from './gameSaga';

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const getOpponentDialog = (enemy: string) => {
    const res = getNpcDialog(enemy);
    return res;
}; 

const statFiler = (data: CombatData, win: boolean): Object => {
    const stat = {
        asceanID: data.player._id,
        wins: win ? 1 : 0,
        losses: win ? 0 : 1,
        total: 1,
        actionData: data.actionData,
        typeAttackData: data.typeAttackData,
        typeDamageData: data.typeDamageData,
        totalDamageData: data.totalDamageData,
        prayerData: data.prayerData,
        deityData: data.deityData,
    };
    return stat;
};
export const decompress = (data: any) => {
    const decompressed = pako.inflate(data, { to: 'string' });
    return JSON.parse(decompressed);
};
export const compress = (data: any) => {
    const compressed = pako.deflate(JSON.stringify(data), { to: 'string' });
    return compressed;
};

function* juice(): SagaIterator {
    const game = yield select((state) => state.game);
    if ('vibrate' in navigator) navigator.vibrate(game.vibrationTime);
    shakeScreen(game.shake);
};

function* combatSaga(): SagaIterator {
    yield takeEvery('combat/getCombatStateUpdate', workGetCombatState);
    yield takeEvery('combat/getEnemySetupFetch', workGetEnemySetup);
    yield takeEvery('combat/getNpcSetupFetch', workGetNpcSetup);
    yield takeEvery('combat/getClearEnemyFetch', workGetClearEnemy);
    yield takeEvery('combat/getClearNpcFetch', workGetClearNpc);
    yield takeEvery('combat/getCombatFetch', workGetCombat);
    yield takeEvery('combat/getCombatSettingFetch', workGetCombatSetting);
    yield takeEvery('combat/getInitiateFetch', workGetInitiate);
    yield takeEvery('combat/getEnemyActionFetch', workGetEnemyAction);
    yield takeEvery('combat/getEffectTickFetch', workGetEffectTick);
    yield takeEvery('combat/getAsceanHealthUpdateFetch', workGetAsceanHealthUpdate);
    yield takeEvery('combat/getCombatStatisticFetch', workGetCombatStatistic);
    yield takeEvery('combat/getCombatTimerFetch', workGetCombatTimer);
    yield takeEvery('combat/getPersuasionFetch', workGetPersuasion);
    yield takeEvery('combat/getLuckoutFetch', workGetLuckout);
};

function* workResolveCombat(state: CombatData): SagaIterator {
    try {
        if (!state.player_win && !state.computer_win) return;
        let combat = yield select((state) => state.combat);
        combat = { ...combat, ...state };
        const stat = yield call(statFiler, combat, combat.player_win);
        const res = yield call(asceanAPI.recordCombatStatistic, stat);
        yield put(setStatistics(res));
        if (combat.player_win) {
            console.log("Player Won");
            const asceanState = yield select((state) => state.game.asceanState);
            const exp = { payload: { asceanState, combatState: combat } };
            yield call(workGetGainExperienceFetch, exp);
            const loot = { payload: { enemyID: combat.enemyID, level: combat.computer.level } };
            yield call(workGetLootDropFetch, loot);
            yield put(setPlayerWin(combat));
        } else {
            console.log("Enemy Won");
            const health = { payload: { health: combat.new_player_health, id: combat.player._id } };
            yield call(workGetAsceanHealthUpdate, health);      
            yield put(setEnemyWin(combat));    
        };
    } catch (err: any) {
        console.log(err, 'Error in workResolveCombat');
    };
};

function* workGetCombat(action: any): SagaIterator {
    const socket = getSocketInstance();
    if (action.payload) {
        yield put(setCombat());
        socket.emit(SOCKET.SET_COMBAT)
    } else {
        yield put(clearCombat());
        socket.emit(SOCKET.CLEAR_COMBAT);
    };
};
function* workGetCombatTimer(action: any): SagaIterator {
    yield put(setCombatTimer(action.payload));
};
function* workGetEnemySetup(action: any): SagaIterator {
    const dialog = yield call(getOpponentDialog, action.payload.enemy.name);
    if (dialog) yield put(setDialog(dialog));
    yield put(setEnemy({ enemy: action.payload.enemy, health: action.payload.health, enemyID: action.payload.id, isAggressive: action.payload.isAggressive, startedAggressive: action.payload.startedAggressive, isDefeated: action.payload.isDefeated, isTriumphant: action.payload.isTriumphant }));
    const socket = getSocketInstance();
    const inject = {
        computer: action.payload.enemy.ascean,
        computer_health: action.payload.enemy.attributes.healthTotal,
        current_computer_health: action.payload.health,
        new_computer_health: action.payload.health,
        computer_weapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
        computer_weapon_one: action.payload.enemy.combat_weapon_one,
        computer_weapon_two: action.payload.enemy.combat_weapon_two,
        computer_weapon_three: action.payload.enemy.combat_weapon_three,
        computer_defense: action.payload.enemy.defense,
        computer_attributes: action.payload.enemy.attributes,
        computer_damage_type: action.payload.enemy.combat_weapon_one.damage_type[0],
        isEnemy: true,
        npcType: '',
        isAggressive: action.payload.isAggressive,
        startedAggressive: action.payload.isAggressive,
        player_win: action.payload.isDefeated,
        computer_win: action.payload.isTriumphant,
        enemyID: action.payload.enemyID, 
    };
    const press = yield call(compress, inject);
    socket.emit(SOCKET.SETUP_ENEMY, press);
};
function* workGetNpcSetup(action: any): SagaIterator {
    const dialog = yield call(getNodesForNPC, npcIds[action.payload.type]);
    if (dialog) yield put(setDialog(dialog));
    yield put(setNpc({ enemy: action.payload.enemy, health: action.payload.health, enemyID: action.payload.id, npcType: action.payload.type }));
};
function* workGetClearEnemy(): SagaIterator {
    yield put(clearNonAggressiveEnemy());
    yield put(setShowDialog(false));
    const socket = getSocketInstance();
    socket.emit(SOCKET.CLEAR_ENEMY);
};
function* workGetClearNpc(): SagaIterator {
    yield put(clearNpc());
    yield put(setShowDialog(false));
}; 
function* workGetCombatState(action: any): SagaIterator {
    const socket = getSocketInstance();
    yield put(setCombatInput(action.payload));
    socket.emit(SOCKET.UPDATE_COMBAT_DATA, { [action.payload.key]: action.payload.value });
};
function* workGetCombatSetting(action: any): SagaIterator {
    const socket = getSocketInstance();
    switch (action.payload.type) {
        case 'Damage':
            yield put(setDamageType(action.payload.loadout));
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { player_damage_type: action.payload.loadout });
            break;
        case 'Prayer':
            yield put(setPlayerBlessing(action.payload.loadout));
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { playerBlessing: action.payload.loadout });
            break;
        case 'Weapon':
            yield put(setWeaponOrder(action.payload.loadout));
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { weapons: action.payload.loadout, player_damage_type: action.payload.loadout[0].damage_type[0] });
            break;
        default:
            break;        
    };
};
function* workGetEffectTick(action: any): SagaIterator {
    const socket = getSocketInstance();
    socket.emit(SOCKET.EFFECT_TICK, action.payload);
};
export function* workTickResponse(load: any): SagaIterator {
    let dec = decompress(load);
    yield put(setEffectResponse(dec));
    EventEmitter.emit('update-combat', dec);
    setTimeout(() => {
        call(setToggleDamaged, false);
    }, 1500);
};
function* workGetEnemyAction(action: any): SagaIterator {
    try {
        const { enemyID, enemy, damageType, combatStats, weapons, health, actionData, state } = action.payload;
        let enemyData = {
            // ...state,
            computer: enemy,
            computer_attributes: combatStats.attributes,
            computer_weapon_one: combatStats.combat_weapon_one,
            computer_weapon_two: combatStats.combat_weapon_two,
            computer_weapon_three: combatStats.combat_weapon_three,
            current_computer_health: health,
            new_computer_health: health,
            computer_health: combatStats.healthTotal,
            computer_defense: combatStats.defense,
            computer_weapons: weapons,
            computer_action: actionData.action,
            computer_counter_guess: actionData.counter,
            computer_damage_type: damageType,
            computerEffects: [], // TODO:FIXME: Retain effects of enemies, perhaps move logic into phaser rather than react
            enemyID: enemyID, // Was ''
        };
        const press = yield call(compress, enemyData);
        const socket = getSocketInstance();
        socket.emit(SOCKET.ENEMY_ACTION, press);
    } catch (err: any) {
        console.log(err, 'Error in workGetEnemyAction');
    };
};
function* workGetInitiate(action: any): SagaIterator {
    try {
        const socket = getSocketInstance();
        switch (action.payload.type) {
            case 'Weapon':
                console.log(action.payload.combatData, "Weapon Action");
                socket.emit(SOCKET.PHASER_ACTION, action.payload.combatData);
                break;
            case 'Instant':
                socket.emit(SOCKET.INVOKE_PRAYER, action.payload.combatData);
                yield put(setInstantStatus(true));
                break;
            case 'Prayer':
                socket.emit(SOCKET.CONSUME_PRAYER, action.payload.combatData);
                break;
            default:
                break;
            };
    } catch (err: any) {
        console.log(err, 'Error in workGetInitiate');
    };
};
export function* workGetResponse(load: any, type?: string): SagaIterator {
    try {
        let dec = yield call(decompress, load);
        if (type === 'enemy') {
            yield put(setEnemyActions(dec));
        } else {
            yield put(setCombatResolution(dec));
        };
        let combat = yield select((state) => state.combat);
        combat = { ...combat, ...dec };
        yield call(juice);
        EventEmitter.emit('update-sound', dec);
        EventEmitter.emit('update-combat', dec);
        yield call(workResolveCombat, dec);
        setTimeout(() => {
            call(setToggleDamaged, false);
        }, 1500);
    } catch (err: any) {
        console.log(err, 'Error in workGetResponse');
    };
};
export function* workGetCombatStatistic(action: any): SagaIterator {
    const data = action.payload;
    const stats = {
        asceanID: data.player._id,
        wins: 1,
        losses: 0,
        total: 1,
        actionData: data.actionData,
        typeAttackData: data.typeAttackData,
        typeDamageData: data.typeDamageData,
        totalDamageData: data.totalDamageData,
        prayerData: data.prayerData,
        deityData: data.deityData,
    };
    const res = yield call(asceanAPI.recordCombatStatistic, stats);
    yield put(setStatistics(res));
};
function* workGetAsceanHealthUpdate(action: any): SagaIterator {
    yield call(asceanAPI.asceanHealth, action.payload);
};
function* workGetPersuasion(action: any): SagaIterator { 
    const { persuasion, id, persuaded } = action.payload;
    const stat = {
        asceanID: id,
        name: 'persuasion',
        type: persuasion === "Kyr'naic" ? 'Kyrnaic' : persuasion,
        successes: persuaded ? 1 : 0,
        failures: persuaded ? 0 : 1,
        total: 1,
    };
    const res = yield call(asceanAPI.recordNonCombatStatistic, stat);
    yield put(setStatistics(res));
    yield put(setEnemyPersuaded({ enemyPersuaded: persuaded, playerTrait: persuasion }));
};
function* workGetLuckout(action: any): SagaIterator {
    const { luck, id, luckedOut } = action.payload;
    const stat = {
        asceanID: id,
        name: 'luckout',
        type: luck === "Kyr'naic" ? 'Kyrnaic' : luck,
        successes: luckedOut ? 1 : 0,
        failures: luckedOut ? 0 : 1,
        total: 1,
    };
    const res = yield call(() => asceanAPI.recordNonCombatStatistic(stat));
    yield put(setStatistics(res));
    yield put(setPlayerLuckout({ playerLuckout: luckedOut, playerTrait: luck }));
}; 

// ==================== Root ====================

export default function* rootSaga(): Generator<AllEffect<SagaIterator>, void, unknown> {
    yield all ([ 
        userSaga(),
        communitySaga(),
        combatSaga(),
        gameSaga(),
        rootSocketSaga(),
    ]); 
};