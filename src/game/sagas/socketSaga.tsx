import { NotUndefined, END } from '@redux-saga/types';
import { SagaIterator, eventChannel } from 'redux-saga';
import { call, take, fork, cancel, takeEvery, select, takeLatest } from 'redux-saga/effects';
import * as io from 'socket.io-client';
import { connectToSocket, closeSocketConnection, getSocketInstance } from './socketManager';
import { compress, workGetResponse, workTickResponse } from './combatSaga';
const API_URL = process.env.NODE_ENV === 'production' ? 'https://ascea.herokuapp.com' : 'http://localhost:3001';
export const SOCKET = {
    // Emitters
    SETUP: 'setup',
    DISCONNECT: 'disconnect',
    URL: API_URL, // 'https://ascea.herokuapp.com' || 'http://localhost:3000'
    SETUP_PLAYER: 'setupPlayer',

    SET_PHASER_AGGRESSION: 'setPhaserAggression',
    SET_COMBAT: 'setCombat',
    CLEAR_COMBAT: 'clearCombat',
    CLEAR_ENEMY: 'clearEnemy',
    SETUP_ENEMY: 'setupEnemy',
    SETUP_COMBAT_DATA: 'setupCombatData',
    UPDATE_COMBAT_DATA: 'updateCombatData',

    PLAYER_ACTION: 'playerAction',
    TSHAERAL_ACTION: 'tshaeralAction',
    CONSUME_PRAYER: 'consumePrayer',
    INVOKE_PRAYER: 'invokePrayer',
    EFFECT_TICK: 'effectTick',
    ENEMY_ACTION: 'enemyAction',
    PHASER_ACTION: 'computerCombat',
    REMOVE_EFFECT: 'removeEffect',
    PLAYER_WIN: 'playerWin',
    COMPUTER_WIN: 'computerWin',

    // Listeners
    PLAYER_SETUP: 'playerSetup',
    COMPUTER_COMBAT_RESPONSE: 'computerCombatResponse',
    PLAYER_COMBAT_RESPONSE: 'playerCombatResponse',
    ENEMY_COMBAT_RESPONSE: 'enemyCombatResponse',
    INVOKE_PRAYER_RESPONSE: 'invokePrayerResponse',
    CONSUME_PRAYER_RESPONSE: 'consumePrayerResponse',
    EFFECT_TICK_RESPONSE: 'effectTickResponse',
};

function createSocketEventChannel(socket: io.Socket, event: string) {
    return eventChannel(emit => {
        const eventHandler = (data: NotUndefined | END) => emit(data);
        socket.on(event, eventHandler);
        return () => socket.off(event, eventHandler);
    });
};

function* setupResEvent(_payload: Uint8Array): SagaIterator {
    const combat = yield select((state) => state.combat);
    const socket = getSocketInstance();
    const press = yield call(compress, combat);
    socket.emit(SOCKET.SETUP_COMBAT_DATA, press);
};
function* combatResEvent(payload: Uint8Array): SagaIterator {
    yield call(workGetResponse, payload, 'combat');
};
function* playerResEvent(payload: Uint8Array): SagaIterator {
    yield call(workGetResponse, payload, 'player');
};
function* prayerResEvent(payload: Uint8Array): SagaIterator {
    yield call(workGetResponse, payload);
};
function* enemyResEvent(payload: Uint8Array): SagaIterator {
    yield call(workGetResponse, payload, 'enemy');
};
function* effectResEvent(payload: Uint8Array): SagaIterator {
    yield call(workTickResponse, payload);
};

function* socketSaga(): SagaIterator {
    const socket = yield call(connectToSocket, SOCKET.URL);
    const setupChan = yield call(createSocketEventChannel, socket, SOCKET.PLAYER_SETUP);
    const combatChan = yield call(createSocketEventChannel, socket, SOCKET.COMPUTER_COMBAT_RESPONSE);
    const invokeChan = yield call(createSocketEventChannel, socket, SOCKET.INVOKE_PRAYER_RESPONSE);
    const prayerChan = yield call(createSocketEventChannel, socket, SOCKET.CONSUME_PRAYER_RESPONSE);
    const effectChan = yield call(createSocketEventChannel, socket, SOCKET.EFFECT_TICK_RESPONSE);
    const enemyChan = yield call(createSocketEventChannel, socket, SOCKET.ENEMY_COMBAT_RESPONSE);
    const playerChan = yield call(createSocketEventChannel, socket, SOCKET.PLAYER_COMBAT_RESPONSE);
    
    while (true) {
        try {
            yield takeLatest(setupChan, setupResEvent);
            yield takeEvery(combatChan, combatResEvent);
            yield takeEvery(playerChan, playerResEvent);
            yield takeEvery(enemyChan, enemyResEvent);
            yield takeEvery(invokeChan, prayerResEvent);
            yield takeEvery(prayerChan, prayerResEvent);
            yield takeEvery(effectChan, effectResEvent);
        } catch (error) {
            console.error('Socket error:', error);
        };
    };
};

function* rootSocketSaga(): SagaIterator {
    while (true) {
        const task = yield fork(socketSaga);
        yield take(SOCKET.DISCONNECT);
        yield cancel(task);
        closeSocketConnection();
    };
};

export default rootSocketSaga;