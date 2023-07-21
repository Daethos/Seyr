import { all, call, put, takeEvery, takeLatest, take, AllEffect, select, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as asceanAPI from '../../utils/asceanApi';
import * as communityAPI from '../../utils/communityApi';
import * as equipmentAPI from '../../utils/equipmentApi';
import * as gameAPI from '../../utils/gameApi';
import * as settingsAPI from '../../utils/settingsApi';
import userService from "../../utils/userService";
import { getUserLogout, getUserSuccess, getUserAsceanSuccess } from '../reducers/userState'; 
import { getCommunityAsceanSuccess, getFocusAsceanSuccess } from '../reducers/communityState';
import { Player } from '../../components/GameCompiler/GameStore';
import { setAsceanState, setCurrency, setDialog, setExperience, setFirewater, setInitialAsceanState, setInstantStatus, setInventory, setLootDrops, setPlayer, setPlayerLevelUp, setSettings, setShowDialog, setShowLoot, setStatistics, setTraits } from '../reducers/gameState';
import { setCombatResolution, setCombatInput, setCombatPlayer, setDamageType, setEffectResponse, setEnemyActions, setPlayerBlessing, setRest, setToggleDamaged, setWeaponOrder, setCombat, clearCombat, setEnemy, setNpc, clearNonAggressiveEnemy, clearNpc, setCombatTimer, setPhaser, setEnemyPersuaded, setPlayerLuckout, setPlayerWin, setEnemyWin } from '../reducers/combatState';
import { CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import EventEmitter from '../phaser/EventEmitter';
import { getNpcDialog } from '../../components/GameCompiler/Dialog';
import { getNodesForNPC, npcIds } from '../../components/GameCompiler/DialogNode';
import { getAsceanTraits } from '../../components/GameCompiler/PlayerTraits';

const compareScores = (a: any, b: any) => {
    if (a[0] === undefined) a[0] = { score: 0 };
    if (b[0] === undefined) b[0] = { score: 0 };
    return a[0].score - b[0].score;
};
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const getOpponentDialog = (enemy: string) => {
    console.log(enemy, 'getOpponentDialog');
    const res = getNpcDialog(enemy);
    console.log(res, 'getOpponentDialog');
    return res;
}; 
const checkStatisticalValue = (rarity: string) => {
    switch (rarity) {
        case 'Common': return 10;
        case 'Uncommon': return 100;
        case 'Rare': return 400;
        case 'Epic': return 1200;
        case 'Legendary': return 12000;
        default: return 0;
    };
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

// ==================== User ====================

function* userSaga(): SagaIterator {
    yield takeEvery('user/getUserFetch', workGetUserFetch);
    yield takeEvery('user/getLogoutSaga', workGetLogoutSaga);
    yield takeEvery('user/getUserAsceanFetch', workGetUserAsceanFetch);
};

function* workGetUserFetch(): SagaIterator {
    const user = yield call(userService.getUser);
    yield put(getUserSuccess(user));
};
function* workGetLogoutSaga(): SagaIterator {
    try {
        yield call(userService.logout);
        yield put(getUserLogout());
    } catch (err: any) {
        console.log(err, 'Error in workGetLogoutSaga');
    };
}; 
function* workGetUserAsceanFetch(): SagaIterator {
    const response = yield call(asceanAPI.getAllAscean);
    const ascean = response.data.reverse();
    yield put(getUserAsceanSuccess(ascean));
};

// ************************ Community ************************ \\

function* communitySaga(): SagaIterator {
    yield takeEvery('community/getCommunityAsceanFetch', workGetAsceanAllFetch);
    yield takeEvery('community/getFocusAsceanFetch', workGetAsceanFocusFetch);
};

function* workGetAsceanAllFetch(): SagaIterator {
    const response = yield call(communityAPI.getEveryone);
    const ascean = response.data.reverse();
    const scores = yield ascean.map((a: Player, i: number) => {
        let arr: any = [];
        if (a.hardcore) {
            let scores = { ascean: a.name, score: a.high_score, key: i, _id: a._id, mastery: a.mastery, photoUrl: process.env.PUBLIC_URL + `/images/${a.origin}-${a.sex}.jpg` };
            arr.push(scores);
        };
        return arr;
    });
    const sorted = yield scores.sort(compareScores).filter((a: any) => a[0].ascean).reverse();
    yield put(getCommunityAsceanSuccess({ascean, scores: sorted}));
};
function* workGetAsceanFocusFetch(action: any): SagaIterator {
    const focusID = action.payload;
    const response = yield call(communityAPI.getOneAscean, focusID);
    const ascean = response.data;
    yield put(getFocusAsceanSuccess(ascean));
};

// ************************* Combat ************************* \\

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
    // yield fork(workResolveCombat);
};

// function* watchResolveCombat(): SagaIterator {
//     yield takeEvery('workGetInitiate', workResolveCombat);
// };
function* workResolveCombat(state: CombatData): SagaIterator {
    if (!state.player_win && !state.computer_win) return;
    console.log(state.player_win, "Player Won?", state.computer_win, "Computer Won?");
    const stat = yield call(statFiler, state, state.player_win);
    yield call(asceanAPI.recordCombatStatistic, stat);
    yield put(setStatistics(stat));
    if (state.player_win) {
        const asceanState = yield select((state) => state.game.asceanState);
        console.log(asceanState, "Ascean State Fetched");
        yield call(workGetGainExperienceFetch, { asceanState, state });
        yield call(workGetLootDropFetch, { enemyID: state.enemyID, level: state.computer.level });
        yield put(setPlayerWin(state));
    } else {
        console.log("Enemy Won");
        yield call(workGetAsceanHealthUpdate, { health: state.new_player_health, id: state.player._id });      
        yield put(setEnemyWin(state));    
    };
};

function* workGetCombat(action: any): SagaIterator {
    if (action.payload) {
        yield put(setCombat());
    } else {
        yield put(clearCombat());
    };
};
function* workGetCombatTimer(action: any): SagaIterator {
    yield put(setCombatTimer(action.payload));
};
function* workGetEnemySetup(action: any): SagaIterator {
    const dialog = yield call(getOpponentDialog, action.payload.enemy.name);
    if (dialog) yield put(setDialog(dialog));
    yield put(setEnemy({ enemy: action.payload.enemy, health: action.payload.health, enemyID: action.payload.id, isAggressive: action.payload.isAggressive, startedAggressive: action.payload.startedAggressive, isDefeated: action.payload.isDefeated, isTriumphant: action.payload.isTriumphant }));
};
function* workGetNpcSetup(action: any): SagaIterator {
    const dialog = yield call(getNodesForNPC, npcIds[action.payload.type]);
    if (dialog) yield put(setDialog(dialog));
    yield put(setNpc({ enemy: action.payload.enemy, health: action.payload.health, enemyID: action.payload.id, npcType: action.payload.type }));
};
function* workGetClearEnemy(): SagaIterator {
    yield put(clearNonAggressiveEnemy());
    yield put(setShowDialog(false));
};
function* workGetClearNpc(): SagaIterator {
    yield put(clearNpc());
    yield put(setShowDialog(false));
}; 
function* workGetCombatState(action: any): SagaIterator {
    console.log(action.payload, "Combat Input");
    yield put(setCombatInput(action.payload));
};
function* workGetCombatSetting(action: any): SagaIterator {
    console.log(action.payload, "Combat Setting");
    switch (action.payload.type) {
        case 'Damage':
            yield put(setDamageType(action.payload.loadout));
            break;
        case 'Prayer':
            yield put(setPlayerBlessing(action.payload.loadout));
            break;
        case 'Weapon':
            yield put(setWeaponOrder(action.payload.loadout));
            break;
        default:
            break;        
    };
};
function* workGetEffectTick(action: any): SagaIterator {
    console.log(action.payload, "Effect Tick");
    const res = yield call(gameAPI.effectTick, action.payload);
    console.log(res.data, "Effect Tick Response");
    yield put(setEffectResponse(res.data));
};
function* workGetEnemyAction(action: any): SagaIterator {
    try {
        const { enemyID, enemy, damageType, combatStats, weapons, health, actionData, state } = action.payload;
        let enemyData: CombatData = {
            ...state,
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
            computer_effects: [], // TODO:FIXME: Retain effects of enemies, perhaps move logic into phaser rather than react
            enemyID: '',
        };
        let res = yield call(gameAPI.phaserAction, enemyData);
        yield put(setEnemyActions(res.data));
        yield fork(workResolveCombat, res.data);
        res.data.enemyID = enemyID;
        // EventEmitter.emit('update-combat-data', res.data);
        EventEmitter.emit('update-combat', res.data);
        setTimeout(() => {
            call(() => setToggleDamaged(false));
        }, 1500);
    } catch (err: any) {
        console.log(err, 'Error in workGetEnemyAction');
    };
};
function* workGetInitiate(action: any): SagaIterator {
    console.log(action.payload, "Action Initiated");
    const game = yield select((state) => state.game);
    let res: any;
    switch (action.payload.type) {
        case 'Weapon':
            res = yield call(gameAPI.phaserAction, action.payload.combatData);
            break;
        case 'Instant':
            res = yield call(gameAPI.instantAction, action.payload.combatData);
            yield put(setInstantStatus(true));
            break;
        case 'Prayer':
            res = yield call(gameAPI.consumePrayer, action.payload.combatData);
            break;
        default:
            break;
        };
    if ('vibrate' in navigator) navigator.vibrate(game.vibrationTime);
    shakeScreen(game.shake);
    console.log(res.data, "Initiate Response");
    yield put(setCombatResolution(res.data));
    yield fork(workResolveCombat, res.data);
    // EventEmitter.emit('update-combat-data', res.data);
    EventEmitter.emit('update-combat', res.data);
    setTimeout(() => {
        call(() => setToggleDamaged(false));
    }, 1500);
};
function* workGetCombatStatistic(action: any): SagaIterator {
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

// *********************** Game *********************** \\

function* gameSaga(): SagaIterator {
    yield takeEvery('game/getGameFetch', workGetGameFetch);
    yield takeEvery('game/getAsceanLevelUpFetch', workGetAsceanLevelUpFetch);
    yield takeEvery('game/getDrinkFirewaterFetch', workGetDrinkFirewaterFetch);
    yield takeEvery('game/getReplenishFirewaterFetch', workGetReplenishFirewaterFetch);
    yield takeEvery('game/getGainExperienceFetch', workGetGainExperienceFetch);
    yield takeEvery('game/getAsceanAndInventoryFetch', workGetAsceanAndInventoryFetch);
    yield takeEvery('game/getOnlyInventoryFetch', workGetOnlyInventoryFetch);
    yield takeEvery('game/getLootDropFetch', workGetLootDropFetch);
    yield takeEvery('game/getCombatStatisticFetch', workGetCombatStatistic);
    yield takeEvery('game/getInteracingLootFetch', workGetInteracingLootFetch);
    yield takeEvery('game/getPurchaseFetch', workGetPurchaseFetch);
    yield takeEvery('game/getThieverySuccessFetch', workGetThieverySuccessFetch);
};

function* workGetGameFetch(action: any): SagaIterator {
    const gameResponse = yield call(asceanAPI.getOneAscean, action.payload);
    const combatResponse = yield call(asceanAPI.getAsceanStats, action.payload);
    const settingsResponse = yield call(settingsAPI.getSettings);
    const traitResponse = yield call(getAsceanTraits, gameResponse.data);

    yield put(setPlayer(gameResponse.data));
    yield put(setCombatPlayer(combatResponse.data.data));
    yield put(setInitialAsceanState(combatResponse.data.data));
    yield put(setSettings(settingsResponse));
    yield put(setTraits(traitResponse));
    yield put(setPhaser(true));
}; 
function* workGetAsceanLevelUpFetch(action: any): SagaIterator {
    const res = yield call(asceanAPI.levelUp, action.payload);
    const asceanState = {
        ascean: res.data,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        experience: res.data.experience,
        level: res.data.level,
        mastery: res.data.mastery,
        faith: res.data.faith,
        experienceNeeded: res.data.experience * 1000,
    };
    const resTwo = yield call(asceanAPI.getCleanAscean, res.data._id);
    const resThree = yield call(asceanAPI.getAsceanStats, res.data._id);

    yield put(setPlayerLevelUp(resTwo.data));
    yield put(setCombatPlayer(resThree.data.data));
    yield put(setAsceanState(asceanState));
};
function* workGetDrinkFirewaterFetch(action: any): SagaIterator {
    const res = yield call(asceanAPI.drinkFirewater, action.payload);
    yield put(setFirewater(res.firewater));
    yield put(setRest(40));
};
function* workGetReplenishFirewaterFetch(action: any): SagaIterator {
    const res = yield call(asceanAPI.replenishFirewater, action.payload);
    yield put(setExperience(res.experience));
    yield put(setFirewater(res.firewater));
};
function* workGetGainExperienceFetch(action: any): SagaIterator {
    let { asceanState, combatState } = action.payload;
    let opponentExp = Math.round(combatState.computer.level * 100 * (combatState.computer.level / combatState.player.level) + combatState.player_attributes.rawKyosir);
    const hasAvaricePrayer = combatState.prayerData.includes('Avarice');
    const totalExp = asceanState.ascean.experience + opponentExp;
    
    asceanState = {
      ...asceanState,
      'opponentExp': opponentExp,
      'currentHealth': combatState.new_player_health,
      'experience': Math.min(totalExp, asceanState.experienceNeeded),
      'avarice': hasAvaricePrayer ? true : false,
    };

    const response = yield call(asceanAPI.saveExperience, asceanState);
    const res = yield call(asceanAPI.getCleanAscean, response.data._id);

    yield put(setExperience(res.data.experience));
    yield put(setCurrency(res.data.currency));
    yield put(setFirewater(res.data.firewater));
    yield put(setAsceanState({
        ...asceanState,
        'currentHealth': res.data.health.current,
        'experience': res.data.experience,
        'avarice': false,
        'opponent': 0,
        'opponentExp': 0
    }));
};
function* workGetAsceanAndInventoryFetch(action: any): SagaIterator {
    const ressponse = yield call(asceanAPI.getAsceanAndInventory, action.payload);
    yield put (setPlayer(ressponse.data));

    const res = yield call(asceanAPI.getAsceanStats, action.payload);
    yield put(setCombatPlayer(res.data.data));
};
function* workGetOnlyInventoryFetch(action: any): SagaIterator {
    const res = yield call(asceanAPI.getAsceanInventory, action.payload);
    yield put(setInventory(res.inventory));
};
function* workGetLootDropFetch(action: any): SagaIterator {
    const res = yield call(equipmentAPI.getLootDrop, action.payload.level);
    yield put(setLootDrops(res.data[0]));
    const roll = Math.floor(Math.random() * 101);
    if (roll > 50) {
        let sec = yield call(equipmentAPI.getLootDrop, action.payload.level);
        yield put(setLootDrops(sec.data[0]));
        EventEmitter.emit('enemyLootDrop', { enemyID: action.payload.enemyID, loot: [res.data[0], sec.data[0]] } );
    } else {
        EventEmitter.emit('enemyLootDrop', { enemyID: action.payload.enemyID, loot: res.data } );
    };
};
function* workGetInteracingLootFetch(action: any): SagaIterator {
    yield put(setShowLoot(action.payload));
};
function* workGetThieverySuccessFetch(action: any): SagaIterator {
    const { item, id } = action.payload;
    yield call(asceanAPI.purchaseToInventory, item);
    const stat = {
        asceanID: id, 
        successes: 1,
        failures: 0,
        total: 1,
        totalValue: checkStatisticalValue(item.item.rarity),
    };
    const res = yield call(asceanAPI.recordThievery, stat);
    yield put(setStatistics(res));
};
function* workGetPurchaseFetch(action: any): SagaIterator {
    const res = yield call(asceanAPI.purchaseToInventory, action.payload);
    console.log(res, "Response Purchasing Item")
    yield put(setCurrency(res.currency));
};

// ==================== Root ====================

export default function* rootSaga(): Generator<AllEffect<SagaIterator>, void, unknown> {
    yield all ([ 
        userSaga(),
        communitySaga(),
        combatSaga(),
        gameSaga(),
    ]); 
};