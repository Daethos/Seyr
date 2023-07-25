import { NotUndefined, END } from '@redux-saga/types';
import { SagaIterator, eventChannel } from 'redux-saga';
import { call, take, put, fork, cancel, apply, all, takeEvery, cps, select, takeLatest } from 'redux-saga/effects';
import * as io from 'socket.io-client';
import { connectToSocket, closeSocketConnection, getSocketInstance } from './socketManager';
import { compress, workGetResponse, workTickResponse } from './rootSaga';

export const SOCKET = {
    // Emitters
    SETUP: 'setup',
    DISCONNECT: 'disconnect',
    URL: 'http://localhost:3000', // 'https://ascea.herokuapp.com'
    SETUP_PLAYER: 'setupPlayer',

    SET_PHASER_AGGRESSION: 'setPhaserAggression',
    SET_COMBAT: 'setCombat',
    CLEAR_COMBAT: 'clearCombat',
    CLEAR_ENEMY: 'clearEnemy',
    SETUP_ENEMY: 'setupEnemy',
    SETUP_COMBAT_DATA: 'setupCombatData',
    UPDATE_COMBAT_DATA: 'updateCombatData',

    CONSUME_PRAYER: 'consumePrayer',
    INVOKE_PRAYER: 'invokePrayer',
    EFFECT_TICK: 'effectTick',
    ENEMY_ACTION: 'enemyAction',
    PHASER_ACTION: 'computerCombat',

    // Listeners
    PLAYER_SETUP: 'playerSetup',
    COMPUTER_COMBAT_RESPONSE: 'computerCombatResponse',
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

function* playerResEvent(payload: Uint8Array): SagaIterator {
    const combat = yield select((state) => state.combat);
    const socket = getSocketInstance();
    const press = yield call(compress, combat);
    socket.emit(SOCKET.SETUP_COMBAT_DATA, press);
};
function* combatResEvent(payload: Uint8Array): SagaIterator {
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
    const playerChan = yield call(createSocketEventChannel, socket, SOCKET.PLAYER_SETUP);
    const combatChan = yield call(createSocketEventChannel, socket, SOCKET.COMPUTER_COMBAT_RESPONSE);
    const invokeChan = yield call(createSocketEventChannel, socket, SOCKET.INVOKE_PRAYER_RESPONSE);
    const prayerChan = yield call(createSocketEventChannel, socket, SOCKET.CONSUME_PRAYER_RESPONSE);
    const effectChan = yield call(createSocketEventChannel, socket, SOCKET.EFFECT_TICK_RESPONSE);
    const enemyChan = yield call(createSocketEventChannel, socket, SOCKET.ENEMY_COMBAT_RESPONSE);
    
    while (true) {
        try {
            yield takeLatest(playerChan, playerResEvent);
            yield takeEvery(combatChan, combatResEvent);
            yield takeEvery(enemyChan, enemyResEvent);
            yield takeEvery(invokeChan, combatResEvent);
            yield takeEvery(prayerChan, combatResEvent);
            yield takeEvery(effectChan, effectResEvent);
        } catch (error) {
            console.error('Socket error:', error);
        };
    };
};

function* rootSocketSaga(): SagaIterator {
    while (true) {
        console.log('Root Socket Saga');
        const task = yield fork(socketSaga);
        yield take(SOCKET.DISCONNECT);
        yield cancel(task);
        closeSocketConnection();
    };
};

export default rootSocketSaga;