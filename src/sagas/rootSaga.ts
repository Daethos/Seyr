import { all, AllEffect } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import rootSocketSaga from './socketSaga';
import { userSaga } from './userSaga';
import { communitySaga } from './communitySaga';
import { gameSaga } from './gameSaga';
import { combatSaga } from './combatSaga';
import { phaserSaga } from './phaserSaga';

export default function* rootSaga(): Generator<AllEffect<SagaIterator>, void, unknown> {
    yield all ([ 
        userSaga(),
        communitySaga(),
        combatSaga(),
        gameSaga(),
        phaserSaga(),
        rootSocketSaga(),
    ]); 
};