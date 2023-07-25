import { NotUndefined, END } from '@redux-saga/types';
import { SagaIterator, eventChannel } from 'redux-saga';
import { call, take, put, fork, cancel, apply } from 'redux-saga/effects';
import * as io from 'socket.io-client';
import { getUserSocket } from './userState';
import { connectToSocket, closeSocketConnection, getSocketInstance } from './socketManager';
import { workGetResponse, workTickResopnse } from '../sagas/rootSaga';
import { CombatData } from '../../components/GameCompiler/CombatStore';

export const SOCKET = {
    // Emitters
    SETUP: 'setup',
    DISCONNECT: 'disconnect',
    PING: 'ping',
    PONG: 'pong',
    OTHER_EVENT: 'otherEvent',
    SETUP_PLAYER: 'setupPlayer',
    URL: 'http://localhost:3000', // 'https://ascea.herokuapp.com'
    PHASER_ACTION: 'computerCombat',
    INVOKE_PRAYER: 'invokePrayer',
    CONSUME_PRAYER: 'consumePrayer',
    ENEMY_ACTION: 'enemyAction',
    EFFECT_TICK: 'effectTick',

    // Listeners
    PLAYER_SETUP: 'playerSetup',
    COMPUTER_COMBAT_RESPONSE: 'computerCombatResponse',
    ENEMY_COMBAT_RESPONSE: 'enemyCombatResponse',
    INVOKE_PRAYER_RESPONSE: 'invokePrayerResponse',
    CONSUME_PRAYER_RESPONSE: 'consumePrayerResponse',
    EFFECT_TICK_RESPONSE: 'effectTickResponse',
};

// Function to create event channel for a specific socket event
function createSocketEventChannel(socket: io.Socket, event: string) {
    return eventChannel(emit => {
        const eventHandler = (data: NotUndefined | END) => {
            console.log(`Received data from socket event: ${event}`, data);
            emit(data);
        };
        // Subscribe to the socket event
        socket.on(event, eventHandler);

        // Return the unsubscribe function
        return () =>{
            console.log(`Unsubscribing from socket event: ${event}`);
            socket.off(event, eventHandler);
        };
    });
}; 

// Socket Saga
function* socketSaga(): SagaIterator {
    console.log('Socket Saga');
    // Connect to the socket
    const socket = yield call(connectToSocket, SOCKET.URL);

    // This is the callback setup fucntion to receive data from the server
    const playerSetup = yield call(createSocketEventChannel, socket, SOCKET.PLAYER_SETUP);
    const combatRes = yield call(createSocketEventChannel, socket, SOCKET.COMPUTER_COMBAT_RESPONSE);
    const enemyRes = yield call(createSocketEventChannel, socket, SOCKET.ENEMY_COMBAT_RESPONSE);
    const invokeRes = yield call(createSocketEventChannel, socket, SOCKET.INVOKE_PRAYER_RESPONSE);
    const prayerRes = yield call(createSocketEventChannel, socket, SOCKET.CONSUME_PRAYER_RESPONSE);
    const effectRes = yield call(createSocketEventChannel, socket, SOCKET.EFFECT_TICK_RESPONSE);

    while (true) {
        try {
            const playerSetupEvent = yield take(playerSetup);
            console.log(playerSetupEvent, "Player Setup Event Received");
            const combatResponseEvent = yield take(combatRes);
            console.log(combatResponseEvent, "Computer Combat Response Event Received");
            const enemyResponseEvent = yield take(enemyRes);
            console.log(enemyResponseEvent, "Enemy Combat Response Event Received");
            const invokeResponseEvent = yield take(invokeRes);
            console.log(invokeResponseEvent, "Invoke Prayer Response Event Received");
            const prayerResponseEvent = yield take(prayerRes);
            console.log(prayerResponseEvent, "Consume Prayer Response Event Received");
            const effectTickResponseEvent = yield take(effectRes);
            console.log(effectTickResponseEvent, "Effect Tick Response Event Received");

            yield call(workGetResponse, combatResponseEvent);
            yield call(workGetResponse, enemyResponseEvent, 'enemy');
            yield call(workGetResponse, invokeResponseEvent);
            yield call(workGetResponse, prayerResponseEvent);
            yield call(workTickResopnse, effectTickResponseEvent);

            // yield put({ type: 'PING_RECEIVED', payload: pingEvent });
            // yield put({ type: 'OTHER_EVENT_RECEIVED', payload: otherEvent });
        } catch (error) {
            console.error('Socket error:', error);
        };
    };
};

// Root Socket Saga
function* rootSocketSaga(): SagaIterator {
    while (true) {

        // Start the Socket Saga
        const task = yield fork(socketSaga);

        // Wait for a disconnect action
        yield take(SOCKET.DISCONNECT);

        // Cancel the Socket Saga to handle disconnection
        yield cancel(task);

        // Close the socket connection
        // yield call(closeSocketConnection);
        closeSocketConnection();
    };
};

export default rootSocketSaga;