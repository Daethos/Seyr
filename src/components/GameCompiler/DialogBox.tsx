import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import LootDrop from './LootDrop';
import MerchantTable from './MerchantTable';
import * as asceanAPI from '../../utils/asceanApi';
import * as eqpAPI from '../../utils/equipmentApi';
import { ACTIONS, CombatData, shakeScreen } from './CombatStore';
import ToastAlert from '../ToastAlert/ToastAlert';
import { GAME_ACTIONS, GameData, nameCheck } from './GameStore';
import { getNodesForNPC, npcIds } from './DialogNode';
import { useLocation } from 'react-router-dom';
import { ProvincialWhispersButtons, Region, regionInformation } from './Regions';
import { LuckoutModal, PersuasionModal, checkPlayerTrait, getAsceanTraits } from './PlayerTraits';

const DialogButtons = ({ options, setIntent }: { options: any, setIntent: any }) => {
    const filteredOptions = Object.keys(options);
    const buttons = filteredOptions.map((o: any, i: number) => {
        return (
            <div key={i}>
            <Button variant='' className='dialog-buttons' onClick={() => setIntent(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }}>{o}</Button>
            </div>
        );
    });
    return <>{buttons}</>;
};  

interface Props {
    ascean: any;
    enemy: any;
    npc: any;
    dialog: [];
    playerWin: boolean;
    computerWin: boolean;
    winStreak: number;
    loseStreak: number;
    highScore: number;
    lootDrop: any;
    lootDropTwo: any;
    itemSaved: boolean;
    dispatch: any;
    state: any;
    deleteEquipment: (eqp: any) => Promise<void>;
    merchantEquipment: any;
    currentIntent: any;
    clearOpponent: (data: CombatData) => Promise<void>;
    gameDispatch: React.Dispatch<any>;
    gameState: GameData;
}; 

const DialogBox = ({ state, dispatch, gameState, gameDispatch, clearOpponent, currentIntent, ascean, enemy, npc, dialog, merchantEquipment, deleteEquipment, playerWin, computerWin, winStreak, loseStreak, highScore, lootDrop, lootDropTwo, itemSaved }: Props) => {
    const location = useLocation();
    const [namedEnemy, setNamedEnemy] = useState<boolean>(false);
    const [traits, setTraits] = useState<any | null>(null);
    const [province, setProvince] = useState<keyof typeof regionInformation>('Astralands');
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [dialogTree, setDialogTree] = useState<any>([]);
    const [luckout, setLuckout] = useState<boolean>(false);
    const [luckoutTraits, setLuckoutTraits] = useState<any>([]);
    const [persuasion, setPersuasion] = useState<boolean>(false);
    const [persuasionTraits, setPersuasionTraits] = useState<any>([]);
    const [miniGame, setMiniGame] = useState<boolean>(false);
    const [miniGameTraits, setMiniGameTraits] = useState<any>([]);
    const article = ['a', 'e', 'i', 'o', 'u'].includes(enemy?.name.charAt(0).toLowerCase()) ? 'an' : 'a';
    const [enemyArticle, setEnemyArticle] = useState<any>('')

    useEffect(() => {
        getDialogTree();
        checkLuckout();
        checkPersuasion();
        checkMiniGame();
        setNamedEnemy(nameCheck(enemy?.name));
        setEnemyArticle(
            () => {
                return ['a', 'e', 'i', 'o', 'u'].includes(enemy?.name.charAt(0).toLowerCase()) ? 'an' : 'a';
            }
        );
    }, [enemy]);

    const getDialogTree = () => {
        if (!enemy.dialogId) return;
        let dialogTree = getNodesForNPC(npcIds[enemy?.dialogId]);
        setDialogTree(dialogTree);
    }; 
    const handleRegion = (region: keyof Region) => {
        setProvince(region);
    };
    const handleIntent = (intent: string) => {
        gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_INTENT, payload: intent });
    };
    const engageCombat = async () => {
        await checkingLoot();
        dispatch({ type: ACTIONS.SET_DUEL, payload: '' });
    };

    const engageGrappling = async () => {
        await checkingLoot();
        gameDispatch({ type: GAME_ACTIONS.LOADING_UNDERLAY, payload: true });
        gameDispatch({ type: GAME_ACTIONS.SET_MINIGAME_SEVAN, payload: true });
    };

    const clearDuel = async () => {
        try {
            await checkingLoot();
            await clearOpponent(state);
        } catch (err: any) {
            console.log(err.message, "Error Clearing Duel");
        };
    };

    const getLoot = async (type: string) => {
        try {
            if (merchantEquipment.length > 0) {
                const deleteResponse = await eqpAPI.deleteEquipment(merchantEquipment);
                console.log(deleteResponse, 'Delete Response!');
            };
            let response: any;
            if (type === 'weapon') {
                response = await eqpAPI.getPhysicalWeaponEquipment(ascean?.level);
            } else if (type === 'armor') {
                response = await eqpAPI.getArmorEquipment(ascean?.level);
            } else if (type === 'jewelry') {
                response = await eqpAPI.getJewelryEquipment(ascean?.level);
            } else if (type === 'general') {
                response = await eqpAPI.getMerchantEquipment(ascean?.level + 1);
            } else if (type === 'cloth') {
                response = await eqpAPI.getClothEquipment(ascean?.level);
            };
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: response.data });
        } catch (err) {
            console.log(err, 'Error Getting Loot!');
        };
    };

    const checkingLoot = async () => {
        if (merchantEquipment.length > 0) {
            await deleteEquipment(merchantEquipment);
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: [] });
        };
        if (lootDrop !== null) {
            await deleteEquipment([lootDrop]);
            gameDispatch({ type: GAME_ACTIONS.CLEAR_LOOTDROP, payload: lootDrop });
        };
        if (lootDropTwo !== null) {
            await deleteEquipment([lootDropTwo]);
            gameDispatch({ type: GAME_ACTIONS.CLEAR_LOOTDROP, payload: lootDropTwo });
        };
    };

    const getTraits = async () => {
        const response = await getAsceanTraits(ascean);
        setTraits(response);
    };

    const checkPersuasion = async () => {
        const traits = {
            primary: gameState?.primary,
            secondary: gameState?.secondary,
            tertiary: gameState?.tertiary,
        };
        const persuasionTraits = ['Ilian', 'Lilosian', 'Arbituous', "Kyr'naic", 'Chiomic', 'Fyeran', 'Shaorahi', 'Tashaeral'];
        const matchingTraits = Object.values(traits).filter(trait => persuasionTraits.includes(trait.name));
        if (matchingTraits.length === 0) {
            setPersuasion(false);
            return;
        };
        setPersuasion(true);
        setPersuasionTraits(matchingTraits);
    };

    const checkMiniGame = async () => {
        const traits = {
            primary: gameState?.primary,
            secondary: gameState?.secondary,
            tertiary: gameState?.tertiary,
        };
        const miniGameTraits = ['Cambiren', "Se'van", 'Shrygeian', 'Tashaeral'];
        const matchingTraits = Object.values(traits).filter(trait => miniGameTraits.includes(trait.name));
        if (matchingTraits.length === 0) {
            setMiniGame(false);
            return;
        };
        setMiniGame(true);
        setMiniGameTraits(matchingTraits);
    };

    const attemptPersuasion = async (persuasion: string) => {
        let playerPersuasion: number = 0;
        let enemyPersuasion: number = 0;
        switch (persuasion) {
            case 'Arbituous': // Ethos (Law)
                playerPersuasion = ascean.constitution + ascean.achre;
                enemyPersuasion = enemy.constitution + enemy.achre;
                break;
            case 'Chiomic': // Humor
                playerPersuasion = ascean.achre + ascean.kyosir;
                enemyPersuasion = enemy.achre + enemy.kyosir;
                break;
            case 'Kyr\'naic': // Apathy
                playerPersuasion = ascean.constitution + ascean.kyosir;
                enemyPersuasion = enemy.constitution + enemy.kyosir;
                break;
            case 'Lilosian': // Peace
                playerPersuasion = ascean.constitution + ascean.caeren;
                enemyPersuasion = enemy.constitution + enemy.caeren;
                break;
            case 'Ilian': // Heroism
                playerPersuasion = ascean.constitution + ascean.strength;
                enemyPersuasion = enemy.constitution + enemy.strength;
                break;
            case 'Fyeran': // Seer
                playerPersuasion = ascean.achre + ascean.caeren;
                enemyPersuasion = enemy.achre + enemy.caeren;
                break;
            case 'Shaorahi': // Awe
                playerPersuasion = ascean.strength + ascean.caeren;
                enemyPersuasion = enemy.strength + enemy.caeren;
                break;
            default:
                break;
        };
        const specialEnemies = ["Laetrois Ath'Shaorah", "Mavros Ilios", "Lorian", "King Mathyus Caderyn", "Cyrian Shyne", "Vincere", "Eugenes", "Dorien Caderyn", "Ashreu'ul", "Kreceus"];
        const persuasionTrait = persuasionTraits.find((trait: { name: string; }) => trait.name === persuasion);
        if (namedEnemy && specialEnemies.includes(enemy.name)) {
            enemyPersuasion *= 1.5;
        } else if (namedEnemy) { 
            enemyPersuasion *= 1.25; 
        } else { 
            enemyPersuasion *= 1.1; 
        };
        console.log(playerPersuasion, enemyPersuasion, "Persuasion");
        if (playerPersuasion >= enemyPersuasion) {
            dispatch({ type: ACTIONS.ENEMY_PERSUADED, payload: { enemyPersuaded: true, playerTrait: persuasion } });
            const statistic = {
                asceanID: ascean._id,
                name: 'persuasion',
                type: persuasion === "Kyr'naic" ? "Kyrnaic" : persuasion,
                successes: 1,
                failures: 0,
                total: 1,
            };
            const response = await asceanAPI.recordNonCombatStatistic(statistic);
            console.log(response, "Persuasion Response Recorded");        
        } else {
            await checkingLoot();
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, 
                payload: `Failure. ${persuasionTrait?.persuasion?.failure.replace('{enemy.name}', enemy.name).replace('{ascean.weapon_one.influences[0]}', ascean.weapon_one.influences[0]).replace('{ascean.name}', ascean.name).replace('{enemy.weapon_one.influences[0]}', enemy.weapon_one.influences[0]).replace('{enemy.faith}', enemy.faith)} \n\n Nevertheless, prepare for some chincanery, ${ascean.name}, and perhaps leave the pleasantries for warmer company.` });
            const statistic = {
                asceanID: ascean._id,
                name: 'persuasion',
                type: persuasion === "Kyr'naic" ? "Kyrnaic" : persuasion,
                successes: 0,
                failures: 1,
                total: 1,
            };
            const response = await asceanAPI.recordNonCombatStatistic(statistic);
            console.log(response, "Persuasion Response Recorded");
            gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response }); 
                setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: false });
                gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: '' });
                dispatch({ type: ACTIONS.SET_DUEL, payload: '' });
            }, 4000);
        };
    };

    const attemptLuckout = async (luck: string) => {
        let playerLuck: number = 0;
        let enemyLuck: number = 0;
        switch (luck) {
            case 'Arbituous': // Rhetoric
                playerLuck = ascean.constitution + ascean.achre;
                enemyLuck = enemy.constitution + enemy.achre;
                break;
            case 'Chiomic': // Shatter
                playerLuck = ascean.achre + ascean.kyosir;
                enemyLuck = enemy.achre + enemy.kyosir;
                break;
            case 'Kyr\'naic': // Apathy
                playerLuck = ascean.constitution + ascean.kyosir;
                enemyLuck = enemy.constitution + enemy.kyosir;
                break;
            case 'Lilosian': // Peace
                playerLuck = ascean.constitution + ascean.caeren;
                enemyLuck = enemy.constitution + enemy.caeren;
                break;
            default:
                break;
        };
        const specialEnemies = ["Laetrois Ath'Shaorah", "Mavros Ilios", "Lorian", "King Mathyus Caderyn"];
        const luckoutTrait = luckoutTraits?.find((trait: { name: string; }) => trait.name === luck);
        if (namedEnemy && specialEnemies.includes(enemy.name)) { 
            enemyLuck *= 2; 
        } else if (namedEnemy) {
            enemyLuck *= 1.5;
        } else { 
            enemyLuck *= 1.25; 
        };
        console.log(playerLuck, enemyLuck, "Luckout");
        if (playerLuck >= enemyLuck) {
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, 
                payload: `Success. Your ${luck} nature was irresistible to ${namedEnemy ? '' : ` ${article}`} ${enemy.name}. What is it they say, ${luckoutTrait.luckout.description} \n\n Congratulations, ${ascean.name}, your words ensured you needn't a single strike to win the day.` });
            const statistic = {
                asceanID: ascean._id,
                name: 'luckout',
                type: luck === "Kyr'naic" ? "Kyrnaic" : luck,
                successes: 1,
                failures: 0,
                total: 1,
            };
            const response = await asceanAPI.recordNonCombatStatistic(statistic);
            console.log(response, "Luckout Response Recorded");
            gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
            setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: false });
                gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: '' });
                shakeScreen({ duration: 1000, intensity: 1.5 });
                if ('vibrate' in navigator) navigator.vibrate(1000);
                dispatch({
                    type: ACTIONS.PLAYER_LUCKOUT,
                    payload: {
                        playerLuckout: true,
                        playerTrait: luck
                    }
                });
            }, 4000);
        } else {
            await checkingLoot();
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, 
                payload: `Failure. ${luckoutTrait?.luckout?.failure.replace('{enemy.name}', enemy.name).replace('{ascean.weapon_one.influences[0]}', ascean.weapon_one.influences[0]).replace('{ascean.name}', ascean.name).replace('{enemy.weapon_one.influences[0]}', enemy.weapon_one.influences[0]).replace('{enemy.faith}', enemy.faith)} \n\n Prepare for combat, ${ascean.name}, and may your weapon strike surer than your words.` });
            const statistic = {
                asceanID: ascean._id,
                name: 'luckout',
                type: luck === "Kyr'naic" ? "Kyrnaic" : luck,
                successes: 0,
                failures: 1,
                total: 1,
            };
            const response = await asceanAPI.recordNonCombatStatistic(statistic);
            console.log(response, "Luckout Response Recorded");
            gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
            setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: false });
                gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: '' });
                dispatch({
                    type: ACTIONS.SET_DUEL,
                    payload: ''
                });
            }, 4000);
        };
    };

    const checkLuckout = async () => {
        const traits = {
            primary: gameState?.primary,
            secondary: gameState?.secondary,
            tertiary: gameState?.tertiary,
        };
        const luckoutTraits = ['Lilosian', 'Arbituous', "Kyr'naic", 'Chiomic'];
        const matchingTraits = Object.values(traits).filter(trait => luckoutTraits.includes(trait.name));
        if (matchingTraits.length === 0) {
            setLuckout(false);
            return;
        };
        setLuckout(true);
        setLuckoutTraits(matchingTraits);
    };
 
    return (
        <> 
        <div className='dialog-box'>
            <div className='dialog-text'>
            <ToastAlert error={error} setError={setError} />
            <img src={process.env.PUBLIC_URL + `/images/` + enemy?.origin + '-' + enemy?.sex + '.jpg'} alt={enemy?.name} className='dialog-picture' />
            {' '}{enemy?.name} (Level {enemy?.level}) {!enemy?.alive ? '[Deceased]' : ''}<br />
                { currentIntent === 'challenge' ?
                    state.enemyPersuaded ?
                        <div style={{ color: "gold" }}>
                        [Success]:{' '}
                        { namedEnemy ? (
                        <>
                        { state.playerTrait === 'Arbituous' ? ( 
                            <>
                            "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {ascean.name}."<br /><br />
                            </>
                        ) : state.playerTrait === 'Chiomic' ? (
                            <>
                            {enemy?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {ascean.name}. What is happening to me, what have you brought back?"<br /><br />
                            </>
                        ) : state.playerTrait === "Kyr'naic" ? (
                            <>
                            "I'm sorry, {ascean.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                            </>
                        ) : state.playerTrait === 'Lilosian' ? (
                            <>
                            Tears well up in {enemy?.name}'s eyes. "I'm sorry, {ascean.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
                            </>
                        ) : state.playerTrait === 'Shaorahi' ? (
                            <>
                            A stillness hollows {enemy?.name}, the chant of a dead language stirs their blood without design.<br /><br />
                            </>
                        ) : state.playerTrait === 'Ilian' ? (
                            <>
                            "My, its been some time since I have witnessed a design such as yours. Careful whom you show your nature to, {ascean.name}, others may be feaful of the Black Sun."<br /><br />
                            </>
                        ) : state.playerTrait === 'Fyeran' ? (
                            <>
                            "You are not here right now, {ascean.name}. Perchance we may see us in another land, then?"<br /><br />
                            </>
                        ) : ( '' ) }
                        </>
                    ) : ( 
                        <>
                        { state.playerTrait === 'Arbituous' ? ( 
                            <>
                            "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {ascean.name}. May we never meet again."<br /><br />
                            </>
                        ) : state.playerTrait === 'Chiomic' ? (
                            <>
                            The {enemy?.name} contorts and swirls with designs of ancient artifice and delight. They may still speak but it seems as though their mind is retracing former moments.<br /><br />
                            </>
                        ) : state.playerTrait === "Kyr'naic" ? (
                            <>
                            "{ascean.name}, all my life as {article} {enemy?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                            </>
                        ) : state.playerTrait === 'Lilosian' ? (
                            <>
                            Tears well up in the {enemy?.name}'s eyes. "All of that glory in all those years, {ascean.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {ascean.weapon_one.influences[0]}." <br /><br />
                            </>
                        ) : state.playerTrait === 'Shaorahi' ? (
                            <>
                            An unsure unease stifles the ascent of the {enemy.name}, their eyes a haze of murk. <br /><br />
                            </>
                        ) : state.playerTrait === 'Ilian' ? (
                            <>
                            "Nooo, you cannot be Him." Concern marks the {enemy.name}, for whomever they believe you are, it arrests their confidence in any action. "Yet I am not to thwart naked fate, good day {ascean.name}."<br /><br />
                            </>
                        ) : state.playerTrait === 'Fyeran' ? (
                            <>
                            Sweet tendrils stretch a creeping smile adorning your face, casting shades of delight for any occasion.<br /><br />
                            </>
                        ) : ( '' ) }         
                        </>
                    ) }
                        You persuaded {namedEnemy ? '' : ` the`} {enemy?.name} to forego hostilities. You may now travel freely through this area.<br />
                        <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                        </div>
                : state.playerTrait !== '' ?
                        <div>
                        { namedEnemy ? (
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {ascean.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                {enemy?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {ascean.name}. What is happening to me, what have you brought back?"<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "I'm sorry, {ascean.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in {enemy?.name}'s eyes. "I'm sorry, {ascean.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
                                </>
                            ) : (
                                <>
                                </>
                            ) }
                            </>
                        ) : ( 
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh dear, another wandering Arbiter. I am absolutely not getting involved with you folk again. Good day, {ascean.name}. May we never meet again."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                The {enemy?.name} contorts and swirls with designs of ancient artifice and delight.<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "{ascean.name}, all my life as {article} {enemy?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in the {enemy?.name}'s eyes. "All of that glory in all those years, {ascean.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {ascean.weapon_one.influences[0]}." <br /><br />
                                </>
                            ) : (
                                <>
                                </>
                            ) }         
                            </>
                        ) }
                        { lootDrop?._id && lootDropTwo?._id ?
                            <>
                                <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                                <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                            </>
                        : lootDrop?._id ?
                        <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : lootDropTwo?._id ?
                        <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : '' }
                        { location.pathname.startsWith(`/Hardcore`) ?
                            <p style={{ color: 'orangered' }}>
                                You Win. Hot Streak: {winStreak} Hi-Score: {highScore}
                            </p>
                        : ''  }
                        { location.pathname.startsWith(`/Hardcore`) ?
                            <p style={{ color: 'orangered' }}>
                                You Win. Hot Streak: {winStreak} Hi-Score: {highScore}
                            </p>
                        : ''  }
                        </div>
                    : playerWin ? 
                        <div>
                        { namedEnemy ? (
                            <>
                            "Congratulations {ascean.name}, you were fated this win. This is all I have to offer, if it pleases you." <br /><br />        
                            </>
                        ) : ( 
                            <>
                            "Appears I were wrong to treat with you in such a way, {ascean.name}. Take this if it suits you, I've no need." <br /><br />         
                            </>
                        ) }
                        { lootDrop?._id && lootDropTwo?._id ?
                            <>
                                <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                                <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                            </>
                        : lootDrop?._id ?
                        <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : lootDropTwo?._id ?
                        <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : '' }
                        { location.pathname.startsWith(`/Hardcore`) ?
                            <p style={{ color: 'orangered' }}>
                                You Win. Hot Streak: {winStreak} Hi-Score: {highScore}
                            </p>
                        : ''  }
                        </div> 
                    : computerWin ? 
                        <div>
                            { namedEnemy ? (
                                <>
                                "{ascean.name}, surely this was a jest? Come now, you disrespect me with such play. What was it that possessed you to even attempt this failure?" <br /><br />        
                                </>
                            ) : ( 
                                <>
                                "The {npc} are not to be trifled with."<br /><br />         
                                </>
                            ) }
                            
                            { location.pathname.startsWith(`/Hardcore`) ?
                                <p style = {{ color: 'dodgerblue' }}>
                                <br /> 
                                You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})
                                </p>
                            : '' }
                        </div> 
                    :
                        <div>
                        { namedEnemy ? ( 
                            <>
                            "Greetings traveler, I am {enemy?.name}. {ascean.name}, is it? You seem a bit dazed, can I be of some help?"<br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={engageCombat}>Forego pleasantries and surprise attack {npc}?</Button>
                            </> 
                        ) : ( 
                            <>
                            {enemyArticle === 'a' ? enemyArticle?.charAt(0).toUpperCase() : enemyArticle?.charAt(0).toUpperCase() + enemyArticle?.slice(1)} {enemy?.name} stares at you, unflinching. Eyes lightly trace about you, reacting to your movements in wait. Grip your {ascean.weapon_one.name} and get into position?<br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={engageCombat}>Engage in hostilities with {npc}?</Button>
                            </> 
                        ) }
                        { luckout ? (
                            <LuckoutModal traits={luckoutTraits} callback={attemptLuckout} name={enemy?.name} influence={state.weapons[0].influences[0]} /> 
                        ) : ('') }
                        { miniGame ? (
                            <>
                            {miniGameTraits.map((trait: any, index: number) => {
                                return (
                                    <div key={index}>
                                        {trait.name === "Se'van" ? (
                                            <Button variant='' className='dialog-buttons inner' onClick={() => engageGrappling()}>[Testing] Surprise {enemy.name} and initiate Se'van Grappling</Button>
                                        ) : trait.name === "Cambiren" ? (
                                            <Button variant='' className='dialog-buttons inner' >[WIP] Cambiren Combat</Button>
                                        ) : trait.name === "Tshaeral" ? (
                                            <Button variant='' className='dialog-buttons inner' >[WIP] Tshaeral Combat</Button>
                                        ) : trait.name === "Shrygeian" ? (
                                            <Button variant='' className='dialog-buttons inner' >[WIP] Shrygeian Combat</Button>
                                        ) : ('')}
                                    </div>
                                )
                            })}
                            </>
                        ) : ('') }
                        </div> 
                : currentIntent === 'conditions' ?
                    <>
                        This portion has not yet been written. Here you will be able to evaluate the conditions you have with said individual, disposition, quests, and the like. 
                        At the moment, this will register to you your qualities you are capable of, ranked in highest to lowest order in efficacy. You may temporarily experience all benefits simultaneously, 
                        but will be level-locked when fully fleshed out.
                        <br /><br />
                        <Button variant='' className='dialog-buttons inner' style={{ color: 'gold' }} onClick={getTraits}>Check Personal Traits?</Button>
                        <br /><br />
                        { traits ?
                            <>
                                <div style={{ fontSize: '16px', whiteSpace: 'pre-wrap', color: 'gold' }}>
                                    {traits.primary.name} <br /><br />
                                    {traits.secondary.name}<br /><br />
                                    {traits.tertiary.name}<br /><br />
                                </div>
                            </>
                        : ''}
                    </>
                : currentIntent === 'farewell' ?
                    <>
                    { state.enemyPersuaded ?
                        <div style={{ color: "gold" }}>
                            [Success]:{' '}
                        { namedEnemy ? (
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {ascean.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                {enemy?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {ascean.name}. What is happening to me, what have you brought back?"<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "I'm sorry, {ascean.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in {enemy?.name}'s eyes. "I'm sorry, {ascean.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
                                </>
                            ) : state.playerTrait === 'Shaorahi' ? (
                                <>
                                A stillness hollows {enemy?.name}, the chant of a dead language stirs their blood without design.<br /><br />
                                </>
                            ) : state.playerTrait === 'Ilian' ? (
                                <>
                                "My, its been some time since I have witnessed a design such as yours. Careful whom you show your nature to, {ascean.name}, others may be feaful of the Black Sun."<br /><br />
                                </>
                            ) : state.playerTrait === 'Fyeran' ? (
                                <>
                                "You are not here right now, {ascean.name}. Perchance we may see us in another land, then?"<br /><br />
                                </>
                            ) : ( '' ) }
                            </>
                        ) : ( 
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {ascean.name}. May we never meet again."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                The {enemy?.name} contorts and swirls with designs of ancient artifice and delight. They may still speak but it seems as though their mind is retracing former moments.<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "{ascean.name}, all my life as {article} {enemy?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in the {enemy?.name}'s eyes. "All of that glory in all those years, {ascean.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {ascean.weapon_one.influences[0]}." <br /><br />
                                </>
                            ) : state.playerTrait === 'Shaorahi' ? (
                                <>
                                An unsure unease stifles the ascent of the {enemy.name}, their eyes a haze of murk. <br /><br />
                                </>
                            ) : state.playerTrait === 'Ilian' ? (
                                <>
                                "Nooo, you cannot be Him." Concern marks the {enemy.name}, for whomever they believe you are, it arrests their confidence in any action. "Yet I am not to thwart naked fate, good day {ascean.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Fyeran' ? (
                                <>
                                Sweet tendrils stretch a creeping smile adorning your face, casting shades of delight for any occasion.<br /><br />
                                </>
                            ) : ( '' ) }         
                            </>
                        ) }
                            You persuaded {namedEnemy ? '' : ` the`} {enemy?.name} to forego hostilities. You may now travel freely through this area.<br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                            </div>
                    : state.playerTrait !== '' ?
                        <div>
                        { namedEnemy ? (
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {ascean.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                {enemy?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {ascean.name}. What is happening to me, what have you brought back?"<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "I'm sorry, {ascean.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in {enemy?.name}'s eyes. "I'm sorry, {ascean.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
                                </>
                            ) : (
                                <>
                                </>
                            ) }
                            </>
                        ) : ( 
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh dear, another wandering Arbiter. I am absolutely not getting involved with you folk again. Good day, {ascean.name}. May we never meet again."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                The {enemy?.name} contorts and swirls with designs of ancient artifice and delight.<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "{ascean.name}, all my life as {article} {enemy?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in the {enemy?.name}'s eyes. "All of that glory in all those years, {ascean.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {ascean.weapon_one.influences[0]}." <br /><br />
                                </>
                            ) : (
                                <>
                                </>
                            ) }         
                            </>
                        ) }
                        { lootDrop?._id && lootDropTwo?._id ?
                            <>
                                <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                                <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                            </>
                        : lootDrop?._id ?
                        <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : lootDropTwo?._id ?
                        <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : '' }
                        { location.pathname.startsWith(`/Hardcore`) ?
                            <p style={{ color: 'orangered' }}>
                                You Win. Hot Streak: {winStreak} Hi-Score: {highScore}
                            </p>
                        : ''  }
                         <Button variant='' className='dialog-buttons inner' onClick={() => clearDuel()}>Leave {enemy.name}'s caeren behind in contemplation of your {state.playerTrait} nature.</Button>
                        </div>          
                    : playerWin ?
                        <>
                        { namedEnemy ? (
                            <>
                            "{ascean.name}, you are truly unique in someone's design. Before you travel further, if you wish to have it, its yours."<br /><br />       
                            </>
                        ) : ( 
                            <>
                            "Go now, {ascean.name}, take what you will and find those better pastures."<br /><br />        
                            </>
                        ) }
                        { lootDrop?._id && lootDropTwo?._id ?
                            <>
                            <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                            <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                            </>
                        : lootDrop?._id ?
                            <LootDrop lootDrop={lootDrop}  ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : lootDropTwo?._id ?
                            <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        : '' }
                            <Button variant='' className='dialog-buttons inner' onClick={() => clearDuel()}>Seek those pastures and leave your lesser to their pitious nature.</Button>
                        </>
                    : computerWin ?
                        <>
                        "If you weren't entertaining in defeat I'd have a mind to simply snuff you out here and now. Seek refuge {ascean.name}, your frailty wears on my caer."<br />
                        <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Feign scamperping away to hide your shame and wounds. There's always another chance, perhaps.</Button>
                        </>
                    : state.enemyPersuaded ?
                        <>
                        You have persuaded {namedEnemy ? '' : ` ${article}`} {enemy?.name} to forego hostilities. You may now travel freely through this area.<br />
                        <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                        </>
                    :
                        <>
                        { namedEnemy ? 
                            <>
                            "I hope you find what you seek, {ascean.name}. Take care in these parts, you may never know when someone wishes to approach out of malice and nothing more. Strange denizens these times." <br/>
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Take the advice and keep moving.</Button>
                            </>
                        : enemy?.level > ascean?.level && enemy?.name !== 'Traveling General Merchant' ?
                            <>
                            "You may not be ready, yet time has tethered us here. Come now {ascean?.name}, prepare."
                            <br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={engageCombat}>Prepare to strike {npc}?</Button>
                            </>
                        : enemy?.name !== 'Traveling General Merchant' ?
                        <>
                            "Where do you think you're going, {ascean?.name}? Yes, I know who you are, and you may be stronger, but I'm not going to let you pass."
                            <br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={engageCombat}>Engage with {npc}?</Button>
                            </>
                        : 
                            <> 
                            "Well, {ascean?.name}, I suppose you've got better things to do. I'll be around if you happen to find yourself in need of supply."
                            <br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Depart from the trader's caravan and keep moving.</Button>
                            </>
                        }
                        </>
                    }
                    { checkPlayerTrait("Kyn'gian", gameState) && !playerWin && !computerWin ? (
                        <Button variant='' className='dialog-buttons inner' onClick={() => clearDuel()}>You remain at the edges of sight and sound, and before {enemy.name} can react, you attempt to flee.</Button>
                    ) : ( '' ) }
                    </>
                : currentIntent === 'localLore' ?
                    <>
                        This has not been written yet.<br /><br />
                        This will entail the local lore of the region you inhabit, and the history of the area from the perspective of the enemy in question, and hopefully grant more insight into the world.
                    </>
                : currentIntent === 'localWhispers' ?
                    <>
                        "Well, if you wish to know more, you'll have to ask."
                    </>
                : currentIntent === 'persuasion' ?
                    <>
                        At the moment this is testing the utilization of traits, in creation and evaluation. 
                        As a temporary display of its concept, you may persuade an enemy--if available, to cease hostility 
                        (This currently only affects non-named enemies, as named enemies start neutral).<br /><br />
                        { playerWin ? (
                            <>
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path, perhaps words will work next time.</Button>
                            </>
                        ) : computerWin ? (
                            <>
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={() => clearDuel()}>Continue moving along your path, there's nothing left to say now.</Button>
                            </>
                        ) : persuasion && !state.enemyPersuaded ? ( 
                                <PersuasionModal traits={persuasionTraits} callback={attemptPersuasion} name={enemy.name} influence={state.weapons[0].influences[0]} /> 
                        ) : ('') }
                        { state.enemyPersuaded ?
                            <div style={{ color: "gold" }}>
                            [Success]:{' '}
                             { namedEnemy ? (
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {ascean.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                {enemy?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {ascean.name}. What is happening to me, what have you brought back?"<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "I'm sorry, {ascean.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in {enemy?.name}'s eyes. "I'm sorry, {ascean.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
                                </>
                            ) : state.playerTrait === 'Shaorahi' ? (
                                <>
                                A stillness hollows {enemy?.name}, the chant of a dead language stirs their blood without design.<br /><br />
                                </>
                            ) : state.playerTrait === 'Ilian' ? (
                                <>
                                "My, its been some time since I have witnessed a design such as yours. Careful whom you show your nature to, {ascean.name}, others may be feaful of the Black Sun."<br /><br />
                                </>
                            ) : state.playerTrait === 'Fyeran' ? (
                                <>
                                "You are not here right now, {ascean.name}. Perchance we may see us in another land, then?"<br /><br />
                                </>
                            ) : ( '' ) }
                            </>
                        ) : ( 
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {ascean.name}. May we never meet again."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                The {enemy?.name} contorts and swirls with designs of ancient artifice and delight. They may still speak but it seems as though their mind is retracing former moments.<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "{ascean.name}, all my life as {article} {enemy?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in the {enemy?.name}'s eyes. "All of that glory in all those years, {ascean.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {ascean.weapon_one.influences[0]}." <br /><br />
                                </>
                            ) : state.playerTrait === 'Shaorahi' ? (
                                <>
                                An unsure unease stifles the ascent of the {enemy.name}, their eyes a haze of murk. <br /><br />
                                </>
                            ) : state.playerTrait === 'Ilian' ? (
                                <>
                                "Nooo, you cannot be Him." Concern marks the {enemy.name}, for whomever they believe you are, it arrests their confidence in any action. "Yet I am not to thwart naked fate, good day {ascean.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Fyeran' ? (
                                <>
                                Sweet tendrils stretch a creeping smile adorning your face, casting shades of delight for any occasion.<br /><br />
                                </>
                            ) : ( '' ) }         
                            </>
                        ) }
                            You persuaded {namedEnemy ? '' : ` the`} {enemy?.name} to forego hostilities. You may now travel freely through this area.<br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                            </div>
                        : '' }
                    </>
                : currentIntent === 'services' ?
                    <>
                        "Greetings, chance meeting you here. I've been traveling these lands for some time now, and it's good to see those with a mind for wander. I have some items you have find of you here on your adventures, if it interests you."
                        <br /><br />
                        <img src={process.env.PUBLIC_URL + '/images/gold-full.png'} alt="Gold Stack" /> {ascean.currency.gold} <img src={process.env.PUBLIC_URL + '/images/silver-full.png'} alt="Silver Stack" /> {ascean.currency.silver}
                        <br /><br />
                        <Button variant='' className='dialog-buttons inner' onClick={() => getLoot('general')}>See the merchant's wares.</Button>
                        <br />
                        { merchantEquipment?.length > 0 ?
                            <MerchantTable dispatch={dispatch} table={merchantEquipment} gameDispatch={gameDispatch} gameState={gameState} ascean={ascean} error={error} setError={setError} />
                        : '' }

                    </>
                : currentIntent === 'provincialWhispers' ?
                <>
                    { playerWin ? (
                        <>
                        "There's concern in places all over, despite what has been said about steadying tides of war amongst the more civilized. Of where are you inquiring?"<br />
                        <ProvincialWhispersButtons options={regionInformation} handleRegion={handleRegion}  />
                        <div style={{ color: 'gold' }}>
                            "{regionInformation?.[province]}"
                        </div>
                        </>
                    ) : computerWin ? (
                        <>"I guess those whipspers must wait another day."</>
                    ) : ( 
                        <>"What is it you wish to hear? If you can best me I will tell you what I know in earnest."</>
                    ) }
                    </>
                : currentIntent === 'worldLore' ?
                    <>
                        This has not been written yet<br /><br />
                        This will entail the world lore of the region you inhabit, 
                        the history of the world from the perspective of the enemy in question, 
                        and hopefully grant more insight into the cultural mindset.
                        <br /><br />
                        <Button variant='' className='dialog-buttons inner' onClick={() => engageGrappling()}>Test Se'van Grappling</Button>
                    </>
                : '' }
            </div>
            <div className='dialog-options'>
                <DialogButtons options={dialog} setIntent={handleIntent} />
            </div>
        </div>
        </>
    );
};

export default DialogBox;