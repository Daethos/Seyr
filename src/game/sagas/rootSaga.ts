import { all, call, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as asceanAPI from '../../utils/asceanApi';
import * as equipmentAPI from '../../utils/equipmentApi';
import * as gameAPI from '../../utils/gameApi';
import userService from "../../utils/userService";
import { getUserLogout, getUserSuccess, getUserAsceanSuccess } from '../reducers/userState';
import { getAsceanAllSuccess } from '../reducers/playerState';

export const ACTIONS = {
    SET_GUEST: 'SET_GUEST',
    SET_PLAYER: 'SET_PLAYER',
    SET_EXPERIENCE: 'SET_EXPERIENCE',
    SET_CURRENCY: 'SET_CURRENCY',
    SET_COMPUTER: 'SET_COMPUTER',
    SET_NEW_COMPUTER_GUEST: 'SET_NEW_COMPUTER_GUEST',
    SET_PHASER_AGGRESSION: 'SET_PHASER_AGGRESSION',
    SET_DUEL: 'SET_DUEL',
    RESET_LUCKOUT: 'RESET_LUCKOUT',
    RESET_GRAPPLING_WIN: 'RESET_GRAPPLING_WIN',
    ENEMY_PERSUADED: 'ENEMY_PERSUADED',
    RESET_PLAYER: 'RESET_PLAYER',
    RESET_COMPUTER: 'RESET_COMPUTER',
    RESET_DUEL: 'RESET_DUEL',
    CLEAR_NON_AGGRESSIVE_ENEMY: 'CLEAR_NON_AGGRESSIVE_ENEMY',
    CLEAR_NPC: 'CLEAR_NPC',
    SET_NEW_COMPUTER: 'SET_NEW_COMPUTER',
    SET_PHASER_COMPUTER_ENEMY: 'SET_PHASER_COMPUTER_ENEMY',
    SET_PHASER_COMPUTER_NPC: 'SET_PHASER_COMPUTER_NPC',
    SET_ACTION_STATUS: 'SET_ACTION_STATUS',
    SET_COMBAT_ACTION: 'SET_COMBAT_ACTION',
    SET_COMBAT_COUNTER: 'SET_COMBAT_COUNTER',
    SET_COMBAT_INITIATED: 'SET_COMBAT_INITIATED',
    SET_DAMAGE_TYPE: 'SET_DAMAGE_TYPE',
    SET_DODGE_STATUS: 'SET_DODGE_STATUS',
    SET_INSTANT_STATUS: 'SET_INSTANT_STATUS',
    SET_PRAYER_BLESSING: 'SET_PRAYER_BLESSING',
    SET_PRAYER_SACRIFICE: 'SET_PRAYER_SACRIFICE',
    SET_WEAPON_ORDER: 'SET_WEAPON_ORDER',
    INITIATE_COMBAT: 'INITIATE_COMBAT',
    INSTANT_COMBAT: 'INSTANT_COMBAT',
    CONSUME_PRAYER: 'CONSUME_PRAYER',
    AUTO_COMBAT: 'AUTO_COMBAT',
    SET_PLAYER_QUICK: 'SET_PLAYER_QUICK',
    SET_PLAYER_SLICK: 'SET_PLAYER_SLICK',
    SET_PLAYER_LEVEL_UP: 'SET_PLAYER_LEVEL_UP',
    SAVE_EXPERIENCE: 'SAVE_EXPERIENCE',
    CLEAR_COUNTER: 'CLEAR_COUNTER',
    AUTO_ENGAGE: 'AUTO_ENGAGE',
    PLAYER_LUCKOUT: 'PLAYER_LUCKOUT',
    LUCKOUT_FAILURE: 'LUCKOUT_FAILURE',
    PLAYER_WIN: 'PLAYER_WIN',
    COMPUTER_WIN: 'COMPUTER_WIN',
    CLEAR_DUEL: 'CLEAR_DUEL',
    SET_WEATHER: 'SET_WEATHER',
    PLAYER_REST: 'PLAYER_REST',
    TOGGLED_DAMAGED: 'TOGGLED_DAMAGED',
    SET_GRAPPLING_WIN: 'SET_GRAPPLING_WIN',
    SET_PHASER: 'SET_PHASER',
    SET_STALWART: 'SET_STALWART',
    SET_COMBAT_TIMER: 'SET_COMBAT_TIMER',
    EFFECT_RESPONSE: 'EFFECT_RESPONSE',
    REMOVE_EFFECT: 'REMOVE_EFFECT',
    SET_UPDATE_STATE: 'SET_UPDATE_STATE',
    REGISTER_ENEMY_ACTIONS: 'REGISTER_ENEMY_ACTIONS',
};

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* workGetUserFetch(): SagaIterator {
    const user = yield call(userService.getUser);
    yield put(getUserSuccess(user));
};

function* logoutSaga(): SagaIterator {
    try {
        yield call(userService.logout);
        yield put(getUserLogout());
    } catch (err: any) {
        console.log(err, 'Error in logoutSaga');
    };
}; 

function* workGetAsceanFetch(): SagaIterator {
    console.log(`workGetAsceanFetch`);
    const response = yield call(asceanAPI.getAllAscean);
    console.log(response.data, 'response.data');
    const ascean = response.data.reverse();
    yield put(getUserAsceanSuccess(ascean));
}; 

export default function* rootSaga() {
    yield all ([
        takeEvery('user/getUserFetch', workGetUserFetch),
        takeEvery('user/getUserAsceanFetch', workGetAsceanFetch),
    ]);

    while (true) {
        yield take('user/getUserLogout');
        yield call(logoutSaga);
    };
};