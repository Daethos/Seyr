import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery } from "redux-saga/effects";
import * as asceanAPI from '../utils/asceanApi';
import * as eqpAPI from '../utils/equipmentApi';
import { setPhaserAssets } from '../game/reducers/phaserState';
import EventEmitter from "../game/phaser/EventEmitter";
import { getSocketInstance } from "./socketManager";
import { SOCKET } from "./socketSaga";

const sanitizeAssets = async (assets: any): Promise<[]> => {
    const fields = ['weapons', 'shields', 'helmets', 'chests', 'legs', 'rings', 'amulets', 'trinkets'];
    const array: any = [];
    const imageSprite = async (url: string): Promise<string> => url.split('/')[2].split('.')[0];

    await Promise.all(fields.map(async (field: string) => {
        await Promise.all(assets[field].map(async (item: any) => {
            const sprite = await imageSprite(item.imgURL);
            array.push({
                sprite: sprite,
                imgURL: item.imgURL,
            });
        })); 
    })); 
    return array;
};  

export function* phaserSaga(): SagaIterator {
    yield takeEvery('phaser/getPhaserAssets', workGetPhaserAssets);
};

function* workGetPhaserAssets(): SagaIterator {
    const res = yield call(eqpAPI.index);
    const sanitized = yield call(sanitizeAssets, res.data);
    yield put(setPhaserAssets(sanitized));
};  
 

function* workGetPhaserClear(): SagaIterator {
    const assets = yield select((state) => state.phaser.assets);
    assets.forEach((asset: any) => {
        const sprite = asset.sprite;
        const img = document.getElementById(sprite);
        if (img) {
            img.remove();
        };
    });
    yield put(setPhaserAssets([]));
};