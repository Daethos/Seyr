import { SagaIterator } from "redux-saga";
import { takeEvery, put, call } from "redux-saga/effects";
import userService from "../../utils/userService";
import { getUserSuccess, getUserLogout, getUserAsceanSuccess } from "../reducers/userState";
import * as asceanAPI from '../../utils/asceanApi';

export function* userSaga(): SagaIterator {
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