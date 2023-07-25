import { SagaIterator } from "redux-saga";
import { takeEvery, put, call } from "redux-saga/effects";
import { getCommunityAsceanSuccess, getFocusAsceanSuccess } from "../reducers/communityState";
import * as communityAPI from '../../utils/communityApi';
import { Player } from "../../components/GameCompiler/GameStore";

export function* communitySaga(): SagaIterator {
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

const compareScores = (a: any, b: any) => {
    if (a[0] === undefined) a[0] = { score: 0 };
    if (b[0] === undefined) b[0] = { score: 0 };
    return a[0].score - b[0].score;
};