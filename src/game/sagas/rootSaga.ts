import { all, call, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as asceanAPI from '../../utils/asceanApi';
import * as communityAPI from '../../utils/communityApi';
import * as equipmentAPI from '../../utils/equipmentApi';
import * as gameAPI from '../../utils/gameApi';
import * as settingsAPI from '../../utils/settingsApi';
import userService from "../../utils/userService";
import { getUserLogout, getUserSuccess, getUserAsceanSuccess } from '../reducers/userState'; 
import { getCommunityAsceanSuccess, getFocusAsceanSuccess } from '../reducers/communityState';
import { Player, getAsceanTraits } from '../../components/GameCompiler/GameStore';
import { setAsceanState, setCurrency, setExperience, setFirewater, setInitialAsceanState, setInventory, setLootDrops, setPlayer, setPlayerLevelUp, setSettings, setStatistics, setTraits } from '../reducers/gameState';
import { setCombatInput, setCombatPlayer, setEnemyActions, setRest, setToggleDamaged } from '../reducers/combatState';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { useSoundEffects } from '../../game/phaser/SoundEffects';
import EventEmitter from '../phaser/EventEmitter';

const compareScores = (a: any, b: any) => {
    if (a[0] === undefined) a[0] = { score: 0 };
    if (b[0] === undefined) b[0] = { score: 0 };
    return a[0].score - b[0].score;
};
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// ==================== User ====================

function* userSaga(): SagaIterator {
    console.log("User Listener");
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
    console.log("Community Listener");
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
    const response = yield call(() => communityAPI.getOneAscean(focusID));
    const ascean = response.data;
    yield put(getFocusAsceanSuccess(ascean));
};

// ************************* Combat ************************* \\

function* combatSaga(): SagaIterator {
    console.log("Combat Listener");
    yield takeEvery('combat/getCombatStateUpdate', workGetCombatState);
    yield takeEvery('combat/getEnemyActionFetch', workGetEnemyAction);
};

function* workGetCombatState(action: any): SagaIterator {
    yield put(setCombatInput(action.payload));
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
            computer_effects: [],
            enemyID: '',
        };
        let response = yield call(() => gameAPI.phaserAction(enemyData));
        yield put(setEnemyActions(response.data));
        yield call(() => useSoundEffects(response.data));
        response.data.enemyID = enemyID;
        // if (response.data.player_win) yield call(() => playerWin(response.data));
        // if (response.data.computer_win) yield call(() => computerWin(response.data));
        // yield call(delay(1500), setToggleDamaged(false));
        setTimeout(() => {
            setToggleDamaged(false);
        }, 1500);
    } catch (err: any) {
        console.log(err, 'Error in workGetEnemyAction');
    };
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
    const res = yield call(() => asceanAPI.recordCombatStatistic(stats));
    yield put(setStatistics(res));
};

// *********************** Game *********************** \\

function* gameSaga(): SagaIterator {
    yield takeEvery('game/getGameFetch', workGetGameFetch);
    yield takeEvery('game/getAsceanLevelUpFetch', workGetAsceanLevelUpFetch);
    yield takeEvery('game/getDrinkFirewaterFetch', workGetDrinkFirewaterFetch);
    yield takeEvery('game/getGainExperienceFetch', workGetGainExperienceFetch);
    yield takeEvery('game/getAsceanAndInventoryFetch', workGetAsceanAndInventoryFetch);
    yield takeEvery('game/getOnlyInventoryFetch', workGetOnlyInventoryFetch);
    yield takeEvery('game/getLootDropFetch', workGetLootDropFetch);
    yield takeEvery('game/getCombatStatisticFetch', workGetCombatStatistic);
};

function* workGetGameFetch(action: any): SagaIterator {
    const gameResponse = yield call(() => asceanAPI.getOneAscean(action.payload));
    const combatResponse = yield call(() => asceanAPI.getAsceanStats(action.payload));
    const settingsResponse = yield call(settingsAPI.getSettings);
    const traitResponse = yield call(() => getAsceanTraits(gameResponse.data));

    yield put(setPlayer(gameResponse.data));
    yield put(setCombatPlayer(combatResponse.data.data));
    yield put(setInitialAsceanState(combatResponse.data.data));
    yield put(setSettings(settingsResponse));
    yield put(setTraits(traitResponse));
};

function* workGetAsceanLevelUpFetch(action: any): SagaIterator {
    const res = yield call(() => asceanAPI.levelUp(action.payload));
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
    const resTwo = yield call(() => asceanAPI.getCleanAscean(res.data._id));
    const resThree = yield call(() => asceanAPI.getAsceanStats(res.data._id));

    yield put(setPlayerLevelUp(resTwo.data));
    yield put(setCombatPlayer(resThree.data.data));
    yield put(setAsceanState(asceanState));
};

function* workGetDrinkFirewaterFetch(action: any): SagaIterator {
    const res = yield call(() => asceanAPI.drinkFirewater(action.payload));
    yield put(setFirewater(res.firewater));
    yield put(setRest(40));
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

    const response = yield call(() => asceanAPI.saveExperience(asceanState));
    const res = yield call(() => asceanAPI.getCleanAscean(response.data._id));

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
    const ressponse = yield call(() => asceanAPI.getAsceanAndInventory(action.payload));
    yield put (setPlayer(ressponse.data));

    const res = yield call(() => asceanAPI.getAsceanStats(action.payload));
    yield put(setCombatPlayer(res.data.data));
};

function* workGetOnlyInventoryFetch(action: any): SagaIterator {
    const res = yield call(() => asceanAPI.getAsceanInventory(action.payload));
    yield put(setInventory(res.data));
};

function* workGetLootDropFetch(action: any): SagaIterator {
    const res = yield call(() => equipmentAPI.getLootDrop(action.payload.level));
    yield put(setLootDrops(res.data[0]));
    const roll = Math.floor(Math.random() * 101);
    if (roll > 50) {
        let sec = yield call(() => equipmentAPI.getLootDrop(action.payload.level));
        yield put(setLootDrops(sec.data[0]));
        EventEmitter.emit('enemyLootDrop', { enemyID: action.payload.enemyID, loot: [res.data[0], sec.data[0]] } );
    } else {
        EventEmitter.emit('enemyLootDrop', { enemyID: action.payload.enemyID, loot: res.data } );
    };
};


// ==================== Root ====================

export default function* rootSaga() {
    yield all ([ 
        userSaga(),
        communitySaga(),
        combatSaga(),
        gameSaga(),
    ]); 
};