import * as asceanAPI from '../../utils/asceanApi';
import pako from "pako";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { CombatData, shakeScreen } from "../../components/GameCompiler/CombatStore";
import { getNpcDialog } from "../../components/GameCompiler/Dialog";
import { getNodesForNPC, npcIds } from "../../components/GameCompiler/DialogNode";
import EventEmitter from "../phaser/EventEmitter";
import { setPlayerWin, setEnemyWin, setCombat, clearCombat, setCombatTimer, setEnemy, setNpc, clearNonAggressiveEnemy, clearNpc, setCombatInput, setDamageType, setPlayerBlessing, setWeaponOrder, setEffectResponse, setEnemyActions, setCombatResolution, setEnemyPersuaded, setPlayerLuckout, setInstantStatus, setLuckoutFailure, setDrain, getDrainFetch } from "../reducers/combatState";
import { setStatistics, setDialog, setShowDialog } from "../reducers/gameState";
import { workGetGainExperienceFetch, workGetLootDropFetch } from "./gameSaga";
import { getSocketInstance } from "./socketManager";
import { SOCKET } from "./socketSaga";

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

export function* combatSaga(): SagaIterator {
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
    yield takeEvery('combat/getDrainFetch', workGetDrain); // Was takeLatest
};

function* workResolveCombat(state: CombatData): SagaIterator {
    try {
        console.log(state.playerWin, state.computerWin, 'Player Win, Computer Win');
        if ((!state.playerWin && !state.computerWin) || state.enemyID === '') return;
        let combat = yield select((state) => state.combat);
        combat = { ...combat, ...state };
        const stat = yield call(statFiler, combat, combat.playerWin);
        const res = yield call(asceanAPI.recordCombatStatistic, stat);
        yield put(setStatistics(res));
        if (combat.playerWin) {
            console.log("Player Won", combat.enemyID);
            const asceanState = yield select((state) => state.game.asceanState);
            const exp = { payload: { asceanState, combatState: combat } };
            yield call(workGetGainExperienceFetch, exp);
            const loot = { payload: { enemyID: combat.enemyID, level: combat.computer.level } };
            yield call(workGetLootDropFetch, loot);
            yield put(setPlayerWin(combat));
        } else {
            console.log("Enemy Won");
            const health = { payload: { health: combat.newPlayerHealth, id: combat.player._id } };
            yield call(workGetAsceanHealthUpdate, health);      
            yield put(setEnemyWin(combat));    
        };
    } catch (err: any) {
        console.log(err, 'Error in workResolveCombat');
    };
};
function* workGetDrain(action: any): SagaIterator {
    let state: CombatData = yield select((state) => state.combat);
    if (state.newComputerHealth <= 0 || state.playerWin) return;
    const drained = Math.floor(state.playerHealth * (action / 100));
    const newPlayerHealth = state.newPlayerHealth + drained > state.playerHealth ? state.playerHealth : state.newPlayerHealth + drained;
    const newComputerHealth = state.newComputerHealth - drained < 0 ? 0 : state.newComputerHealth - drained;
    const won = state.newComputerHealth - drained <= 0;

    if (won) {
        state = {
            ...state,
            newPlayerHealth: newPlayerHealth,
            currentPlayerHealth: newPlayerHealth,
            currentComputerHealth: 0,
            newComputerHealth: 0,
            playerWin: true,
        };
    } else {
        state = {
            ...state,
            newPlayerHealth: newPlayerHealth,
            currentPlayerHealth: newPlayerHealth,
            currentComputerHealth: newComputerHealth,
            newComputerHealth: newComputerHealth,
        };
    };

    const socket = getSocketInstance();
    socket.emit(SOCKET.TSHAERAL_ACTION, { newPlayerHealth, currentPlayerHealth: newPlayerHealth, newComputerHealth, currentComputerHealth: newComputerHealth, playerWin: won });

    yield put(setCombatResolution(state));
    if (won) {
        yield call(workResolveCombat, state);
        EventEmitter.emit('update-combat', state); // Added
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
        computerHealth: action.payload.enemy.attributes.healthTotal,
        currentComputerHealth: action.payload.health,
        newComputerHealth: action.payload.health,
        computerWeapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
        computerWeaponOne: action.payload.enemy.combat_weapon_one,
        computerWeaponTwo: action.payload.enemy.combat_weapon_two,
        computerWeaponThree: action.payload.enemy.combat_weapon_three,
        computerDefense: action.payload.enemy.defense,
        computerAttributes: action.payload.enemy.attributes,
        computerDamageType: action.payload.enemy.combat_weapon_one.damage_type[0],
        isEnemy: true,
        npcType: '',
        isAggressive: action.payload.isAggressive,
        startedAggressive: action.payload.isAggressive,
        playerWin: action.payload.isDefeated,
        computerWin: action.payload.isTriumphant,
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
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { playerDamageType: action.payload.loadout });
            break;
        case 'Prayer':
            yield put(setPlayerBlessing(action.payload.loadout));
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { playerBlessing: action.payload.loadout });
            break;
        case 'Weapon':
            yield put(setWeaponOrder(action.payload.loadout));
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { weapons: action.payload.loadout, playerDamageType: action.payload.loadout[0].damage_type[0] });
            break;
        default:
            break;        
    };
};
function workGetEffectTick(action: any): void {
    const socket = getSocketInstance();
    socket.emit(SOCKET.EFFECT_TICK, action.payload);
};
export function* workTickResponse(load: any): SagaIterator {
    let dec = decompress(load);
    yield put(setEffectResponse(dec));
    EventEmitter.emit('update-combat', dec); 
};
function* workGetEnemyAction(action: any): SagaIterator {
    try {
        const { enemyID, enemy, damageType, combatStats, weapons, health, actionData } = action.payload;
        let enemyData = {
            computer: enemy,
            computerAttributes: combatStats.attributes,
            computerWeaponOne: combatStats.combat_weapon_one,
            computerWeaponTwo: combatStats.combat_weapon_two,
            computerWeaponThree: combatStats.combat_weapon_three,
            currentComputerHealth: health,
            newComputerHealth: health,
            computerHealth: combatStats.healthTotal,
            computerDefense: combatStats.defense,
            computerWeapons: weapons,
            computerAction: actionData.action,
            computerCounterGuess: actionData.counter,
            computerDamageType: damageType,
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
                socket.emit(SOCKET.PHASER_ACTION, action.payload.combatData);
                break;
            case 'Instant':
                yield put(setInstantStatus(true));
                socket.emit(SOCKET.INVOKE_PRAYER, action.payload.combatData);
                break;
            case 'Prayer':
                socket.emit(SOCKET.CONSUME_PRAYER, action.payload.combatData);
                break;
            case 'Tshaeral':
                yield call(workGetDrain, 3);
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
        let combat: CombatData = yield select((state) => state.combat);
        combat = { ...combat, ...dec };
        // console.log("Getting Response", combat.playerWin, combat.computerWin, combat.enemyID);
        yield call(workResolveCombat, combat); 
        if (type === 'enemy') { yield put(setEnemyActions(dec)); } else { yield put(setCombatResolution(dec)); };
        if (type === 'enemy' || type === 'combat') EventEmitter.emit('update-sound', combat);
        EventEmitter.emit('update-combat', combat);
        yield call(juice);
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
    if (luckedOut) {
        yield put(setPlayerLuckout({ playerLuckout: luckedOut, playerTrait: luck }));
    } else {
        yield put(setLuckoutFailure({ playerLuckout: luckedOut, playerTrait: luck }));
    };
}; 