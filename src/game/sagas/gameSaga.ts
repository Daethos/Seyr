import { SagaIterator } from "redux-saga";
import { takeEvery, select, put, call } from "redux-saga/effects";
import { getAsceanTraits } from "../../components/GameCompiler/PlayerTraits";
import EventEmitter from "../phaser/EventEmitter";
import { setCombatPlayer, setPhaser, setRest } from "../reducers/combatState";
import { setPlayer, setInitialAsceanState, setSettings, setTraits, setPlayerLevelUp, setAsceanState, setFirewater, setExperience, setCurrency, setInventory, setLootDrops, setShowLoot, setStatistics, setTutorialContent } from "../reducers/gameState";
import { compress, workGetCombatStatistic } from "./combatSaga";
import { getSocketInstance } from "./socketManager";
import { SOCKET } from "./socketSaga";
import * as asceanAPI from '../../utils/asceanApi';
import * as equipmentAPI from '../../utils/equipmentApi';
import * as settingsAPI from '../../utils/settingsApi';
import Tutorial from "../../components/GameCompiler/Tutorial";

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

export function* gameSaga(): SagaIterator {
    yield takeEvery('game/getGameFetch', workGetGameFetch);
    yield takeEvery('game/getAsceanLevelUpFetch', workGetAsceanLevelUpFetch);
    yield takeEvery('game/getDrinkFirewaterFetch', workGetDrinkFirewaterFetch);
    yield takeEvery('game/getReplenishFirewaterFetch', workGetReplenishFirewaterFetch);
    yield takeEvery('game/getRestoreFirewaterFetch', workGetRestoreFirewaterFetch);
    yield takeEvery('game/getGainExperienceFetch', workGetGainExperienceFetch);
    yield takeEvery('game/getAsceanAndInventoryFetch', workGetAsceanAndInventoryFetch);
    yield takeEvery('game/getOnlyInventoryFetch', workGetOnlyInventoryFetch);
    yield takeEvery('game/getLootDropFetch', workGetLootDropFetch);
    yield takeEvery('game/getCombatStatisticFetch', workGetCombatStatistic);
    yield takeEvery('game/getInteracingLootFetch', workGetInteracingLootFetch);
    yield takeEvery('game/getPurchaseFetch', workGetPurchaseFetch);
    yield takeEvery('game/getThieverySuccessFetch', workGetThieverySuccessFetch);
    yield takeEvery('game/getTutorialFetch', workGetTutorialFetch);
};

function* workGetGameFetch(action: any): SagaIterator {
    const gameResponse = yield call(asceanAPI.getOneAscean, action.payload);
    const combatResponse = yield call(asceanAPI.getAsceanStats, action.payload);
    const settingsResponse = yield call(settingsAPI.getSettings);
    const traitResponse = yield call(getAsceanTraits, gameResponse.data);
    const asceanState = yield select((state) => state.game.asceanState);
    const data = { 
        user: yield select((state) => state.user.user),
        ascean: gameResponse.data, 
        stats: combatResponse.data.data, 
        settings: settingsResponse,
        temp: { 
            ...asceanState, 
            'ascean': gameResponse.data,
            'currentHealth': gameResponse.data.health.current,
            'level': gameResponse.data.level,
            'experience': gameResponse.data.experience,
            'experienceNeeded': gameResponse.data.level * 1000,
            'mastery': gameResponse.data.mastery,
            'faith': gameResponse.data.faith, 
        },
        traits: traitResponse, 
    };
    const press = yield call(compress, data);
    const socket = getSocketInstance();
    socket.emit(SOCKET.SETUP_PLAYER, press);

    yield put(setPlayer(gameResponse.data));
    yield put(setCombatPlayer(combatResponse.data.data));
    yield put(setInitialAsceanState(combatResponse.data.data));
    yield put(setSettings(settingsResponse));
    yield put(setTraits(traitResponse));
    yield put(setPhaser(true)); 
}; 
function* workGetAsceanLevelUpFetch(action: any): SagaIterator {
    console.log(action.payload, "Leveling Up");
    const res = yield call(asceanAPI.levelUp, action.payload);
    console.log(res, "Response Leveling Up");
    let asceanState = yield select((state) => state.game.asceanState);
    asceanState = {
        ...asceanState,
        ascean: res.data,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        opponent: 0,
        opponentExp: 0,
        experience: res.data.experience,
        level: res.data.level,
        mastery: res.data.mastery,
        faith: res.data.faith,
        experienceNeeded: res.data.experience * 1000,
    };
    const resTwo = yield call(asceanAPI.getCleanAscean, res.data._id);
    const resThree = yield call(asceanAPI.getAsceanStats, res.data._id);
    console.log(resTwo, resThree, "Responses to Getting Clean Ascean and Stats");
    yield put(setPlayerLevelUp(resTwo.data));
    yield put(setCombatPlayer(resThree.data.data));
    yield put(setAsceanState(asceanState));
    // TODO:FIXME: Socket Concern ??
};
function* workGetDrinkFirewaterFetch(action: any): SagaIterator {
    const firewater = yield select((state) => state.game.player.firewater);
    if (firewater.charges === 0) return;
    const res = yield call(asceanAPI.drinkFirewater, action.payload);
    yield put(setFirewater(res.firewater));
    yield put(setRest(40));
};
function* workGetReplenishFirewaterFetch(action: any): SagaIterator {
    const res = yield call(asceanAPI.replenishFirewater, action.payload);
    yield put(setExperience(res.experience));
    yield put(setFirewater(res.firewater));
};
function* workGetRestoreFirewaterFetch(action: any): SagaIterator {
    const res = yield call(asceanAPI.restoreFirewater, action.payload);
    yield put(setCurrency(res.currency));
    yield put(setExperience(res.experience));
    yield put(setFirewater(res.firewater));
};
export function* workGetGainExperienceFetch(action: any): SagaIterator {
    console.log(action, "Gain Experience");
    let { asceanState, combatState } = action.payload;
    let opponentExp = Math.round(combatState.computer.level * 100 * (combatState.computer.level / combatState.player.level) + combatState.playerAttributes.rawKyosir);
    const hasAvaricePrayer = combatState.prayerData.includes('Avarice');
    const totalExp = asceanState.ascean.experience + opponentExp;
    
    asceanState = {
      ...asceanState,
      'opponent': combatState.computer.level,
      'opponentExp': opponentExp,
      'currentHealth': combatState.newPlayerHealth,
      'experience': Math.min(totalExp, asceanState.experienceNeeded),
      'avarice': hasAvaricePrayer ? true : false,
    };

    const res = yield call(asceanAPI.saveExperience, asceanState);
    yield put(setExperience(res.experience));
    yield put(setCurrency(res.currency));
    yield put(setFirewater(res.firewater));
    yield put(setAsceanState({
        ...asceanState,
        'currentHealth': res.health.current,
        'experience': res.experience,
        'avarice': false,
        'opponent': 0,
        'opponentExp': 0
    }));
    if (res.level === 1 && res.experience > 700 && res.tutorial.firstPhenomena) yield put(setTutorialContent('firstPhenomena'));
    if (res.level === 1 && res.experience === 1000 && res.tutorial.firstLevelUp) yield put(setTutorialContent('firstLevelUp'));
};
function* workGetAsceanAndInventoryFetch(action: any): SagaIterator {
    const re = yield call(asceanAPI.getAsceanAndInventory, action.payload);
    yield put (setPlayer(re.data));

    const res = yield call(asceanAPI.getAsceanStats, action.payload);
    yield put(setCombatPlayer(res.data.data));
};
function* workGetOnlyInventoryFetch(action: any): SagaIterator {
    const res = yield call(asceanAPI.getAsceanInventory, action.payload);
    yield put(setInventory(res.inventory));
};
export function* workGetLootDropFetch(action: any): SagaIterator {
    const res = yield call(equipmentAPI.getLootDrop, action.payload.level);
    yield put(setLootDrops(res.data[0]));
    const roll = Math.floor(Math.random() * 101);
    if (roll > 50) {
        let sec = yield call(equipmentAPI.getLootDrop, action.payload.level);
        yield put(setLootDrops(sec.data[0]));
        EventEmitter.emit('enemyLootDrop', { enemyID: action.payload.enemyID, drops: [res.data[0], sec.data[0]] } );
    } else {
        EventEmitter.emit('enemyLootDrop', { enemyID: action.payload.enemyID, drops: res.data } );
    };
    const game = yield select((state) => state.game);
    if (game.player.tutorial.firstLoot) yield put(setTutorialContent('firstLoot'));
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
    console.log(res, "Response Purchasing Item");
    yield put(setCurrency(res.currency));
};

export function* workGetTutorialFetch(): SagaIterator {
    const ascean = yield select((state) => state.game.player);
    const asceanViews = yield select((state) => state.game.asceanViews);
    if (!Object.keys(ascean).length) return;
    let tutorial: string = '';

    if (ascean.experience === 1000 && ascean.level === 1 && ascean.tutorial.firstLevelUp) tutorial = 'firstLevelUp';
    if (ascean.experience > 700 && ascean.tutorial.firstPhenomena) tutorial = 'firstPhenomena';
    if (ascean.inventory.length > 0) {
        if (ascean.tutorial.firstLoot) tutorial = 'firstLoot';
        if (ascean.tutorial.firstInventory && asceanViews === 'Inventory') tutorial = 'firstInventory'; 
    };
    if (ascean.health.current <= 0 && ascean.tutorial.firstDeath) tutorial = 'firstDeath';
    console.log(tutorial, "Tutorial");
    switch (tutorial) {
        case 'firstPhenomena':
            return setTutorialContent(tutorial);
        case 'firstInventory':
            return setTutorialContent(tutorial);
        case 'firstLoot':
            return setTutorialContent(tutorial);
        case 'firstDeath':
            return setTutorialContent(tutorial);
        case 'firstLevelUp':
            return setTutorialContent(tutorial);
        default:
            return null;
    };
}; 
    
    // const tutorialConcerns = useCallback(async (): Promise<void> => {
    //     console.log(ascean.experience, ascean.tutorial, ascean.level, gameState.asceanViews, "Tutorial Concerns");
    //     if (ascean.experience === 1000 && ascean.level === 1 && ascean.tutorial.firstLevelUp) await handleTutorial('firstLevelUp');
    //     if (ascean.experience > 700 && ascean.tutorial.firstPhenomena) await handleTutorial('firstPhenomena');
    //     if (ascean.inventory.length > 0) {
    //         if (ascean.tutorial.firstLoot) await handleTutorial('firstLoot');
    //         if (ascean.tutorial.firstInventory && gameState.asceanViews === 'Inventory') await handleTutorial('firstInventory');
    //     };
    //     if (ascean.health.current <= 0 && ascean.tutorial.firstDeath) await handleTutorial('firstDeath');
    // }, [ascean, gameState.asceanViews]);
     
    // const handleTutorial = async (tutorial: string): Promise<void | null> => {
    //     switch (tutorial) {
    //         case 'firstPhenomena':
    //             shakeScreen({ duration: 1500, intensity: 2 });
    //             playReligion();
    //             return setTutorial(<Tutorial setTutorialContent={setTutorial} player={ascean} dispatch={dispatch} firstPhenomena={true} />);
    //         case 'firstInventory':
    //             return setTutorial(<Tutorial setTutorialContent={setTutorial} player={ascean} dispatch={dispatch} firstInventory={true} />);
    //         case 'firstLoot':
    //             return setTutorial(<Tutorial setTutorialContent={setTutorial} player={ascean} dispatch={dispatch} firstLoot={true} />);
    //         case 'firstDeath':
    //             return setTutorial(<Tutorial setTutorialContent={setTutorial} player={ascean} dispatch={dispatch} firstDeath={true} />);
    //         case 'firstLevelUp':
    //             return setTutorial(<Tutorial setTutorialContent={setTutorial} player={ascean} dispatch={dispatch} firstLevelUp={true} />);
    //         default:
    //             return null;
    //     };
    // };