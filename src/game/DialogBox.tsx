import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import LootDrop from '../components/GameCompiler/LootDrop';
import MerchantTable from '../components/GameCompiler/MerchantTable';
import Loading from '../components/Loading/Loading';
import * as eqpAPI from '../utils/equipmentApi';
import * as questAPI from '../utils/questApi';
import { ACTIONS, CombatData } from '../components/GameCompiler/CombatStore';
import ToastAlert from '../components/ToastAlert/ToastAlert';
import { GAME_ACTIONS, ENEMY_ENEMIES, QUESTS, getQuests, getAsceanTraits, GameData, nameCheck, checkPlayerTrait } from '../components/GameCompiler/GameStore';
import DialogTree, { getNodesForNPC, npcIds } from '../components/GameCompiler/DialogNode';
import dialogNodes from "../components/GameCompiler/DialogNodes.json"
import { useLocation } from 'react-router-dom';

const DialogButtons = ({ options, setIntent }: { options: any, setIntent: any }) => {
    const filteredOptions = Object.keys(options).filter((option: any) => option !== 'defeat' && option !== 'victory' && option !== 'taunt' && option !== 'praise' && option !== 'greeting');
    const buttons = filteredOptions.map((o: any, i: number) => {
        return (
            <div key={i}>
            <Button variant='' className='dialog-buttons' onClick={() => setIntent(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }}>{o}</Button>
            </div>
        )
    });
    return <>{buttons}</>;
};
  
const CombatDialogButtons = ({ options, handleCombatAction }: { options: any, handleCombatAction: any }) => {
    const buttons = Object.keys(options).map((o: any, i: number) => {
        return (
            <Button variant='' className='dialog-buttons' key={i} onClick={() => handleCombatAction('actions', o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
};

const ProvincialWhispersButtons = ({ options, handleRegion }: { options: any, handleRegion: any }) => {
    console.log(options, 'The Options');
    const buttons = Object.keys(options).map((o: any, i: number) => {
        console.log(o, 'Options in ProvincialWhispersButtons');
        return (
            <Button variant='' className='dialog-buttons' key={i} onClick={() => handleRegion(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }}>{o}</Button>
        )
    });
    return <>{buttons}</>;
};

interface Props {
    ascean: any;
    enemy: any;
    npc: any;
    dialog: [];
    getOpponent: () => Promise<void>;
    playerWin: boolean;
    computerWin: boolean;
    resetAscean: () => Promise<void>;
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
    mapState: any;
    mapDispatch: any;
    currentIntent: any;
    clearOpponent: (data: CombatData) => Promise<void>;
    gameDispatch: React.Dispatch<any>;
    gameState: GameData;
};

interface Region { 
    Astralands: string;
    Kingdom: string;
    Soverains: string;
    Fangs: string;
    Licivitas: string;
    Firelands: string;
    Sedyrus: string;
    Isles: string; 
};


const DialogBox = ({ state, dispatch, gameState, gameDispatch, mapState, mapDispatch, clearOpponent, currentIntent, ascean, enemy, npc, dialog, merchantEquipment, deleteEquipment, getOpponent, playerWin, computerWin, resetAscean, winStreak, loseStreak, highScore, lootDrop, lootDropTwo, itemSaved }: Props) => {
    const location = useLocation();
    const [namedEnemy, setNamedEnemy] = useState<boolean>(false);
    const [traits, setTraits] = useState<any | null>(null);
    const [combatAction, setCombatAction] = useState<any | null>('actions');
    const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
    const [localWhispers, setLocalWhispers] = useState<any>({});
    const [showQuest, setShowQuest] = useState<boolean>(false);
    const regionInformation = {
        Astralands: "Good one, those Ashtre have quite the mouth on them I hear yet never heard. Perhaps you'll be able to catch their whispers.", 
        Kingdom: "The King, Mathyus Caderyn II, has been away from his court as of late, his son Dorien sitting the throne--though constant feathers aid his communication when abroad. Despite its unification, groans have increased with disparate and slow recovery from the century long war only having quelled for 7 years prior, with select places receiving abundance of aid over others, the discernment itself seeming weighed in favor of longstanding allies. As the King reaches further East to establish peaceable connections with the Soverains, it leads one to speculate on the disposition of those houses already under his kingship.", 
        Soverains: "The Soverain-Eulex, Garrick Myelle, is throwing a week's long feast for the coming manhood of his son, Relien Myelle. It is his last surviving son, others perishing in the Kingdom-Soverain War, and his daughter being wed off to the Kingdom as part of a truce. It has been wondered whether the boy can live up to the immense fortune and luck of his father, whom started not long ago as a would-be trader lord, slowly building roads and connectivitiy throughout the Soverains during the war, a wild boon during the war economically--its enhancement of intra-provincial aid notwithstanding.", 
        Fangs: "Word has spread that the growing settlement and peaceable futures of provinces has caused the chaotic stability of mercenary life in the Fangs to decouple from the consistent pattern of war occurring throughout the land for centuries. Some have been accepting work which brings them far and away from their homelands, by whom and for what purpose remains to be recorded. The Fang Lords themselves have outstretched their lands to incorporate better agriculture, with some of the more inland mercenaries providing a challenge as they wish to graze the land as any animal would. What do you believe?", 
        Licivitas: "The Ascean, General Peroumes, is avoiding the prospect of coming back to Lor without cause of the authority of both the First Lorian and the Dae it seems. Much criticism of his prolonged campaign among the optimate fall to whipsers on the shoulders of the adoring populare, tales of his commentaries reaching further than the Good Lorian's word, its been said. The Cragorean, enemies in the current war against Licivitas, despite their fewer numbers and armament, have proved ruthless in their willingness to defy Licivitan conquest. What do you make of that growing sentiment?", 
        Firelands: "The Ghosthawk of Greyrock, Theogeni Spiras, has not been seen as of late--his wife's health has been failing worse. He has been leaning on his administration housed with devoted, a strong change from the previous Protectorate, the Ashfyres and their adherence to Fyer, tradition that has persisted since written word. Peculiar, the man, once wildly famed from his crowning at the Ascea in 130, to overthrowing the longstanding Fyerslord, Laveous Ashfyre. The last vestige of their lineage, Searous Ashfyre, has been left in a fragile position, and many are curious as to the future of the Firelands. What do you think?", 
        Sedyrus: "The Sedyren Sun, Cyrian Shyne, has reached an agreement with a lesser Quor'ator to betrothe his firstborn son to one of their daughters, hoping to stem general unrest from the cooling tempers of various families being uprooted of the Quor'eite, who lost a surprise war against their neighboring Sedyreal some decades past--the province solidifying after centuries of a Sedyrus/Quor'eia split into Sedyrus. Would you believe those that say this will leads toward a more peaceful future?", 
        Isles: "The Alluring Isles is its own world, gigantic and terrifying despite its grandeur isolated by strange tides. The land itself a shade of this world, yet what can allow a man to travel a fortnight here, and a day there? I've heard about the size of the animals that stalk those jungles and swim in the waters, hard to believe anyone can sustain themselves there. Would you wish to see this place?",
    };
    const [province, setProvince] = useState<keyof typeof regionInformation>('Astralands');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [quest, setQuest] = useState<any>({});
    const [questModalShow, setQuestModalShow] = useState<boolean>(false);
    const [luckoutModalShow, setLuckoutModalShow] = useState<boolean>(false);
    const [persuasionModalShow, setPersuasionModalShow] = useState<boolean>(false);
    const [miniGameModalShow, setMiniGameModalShow] = useState<boolean>(false);
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
        let enemyQuests = getQuests(enemy?.name);
        setLocalWhispers(enemyQuests);
        setShowQuest(true);
        getDialogTree();
        checkLuckout();
        checkPersuasion();
        checkMiniGame();
        setNamedEnemy(nameCheck(enemy?.name));
        setEnemyArticle(
            () => {
                console.log((['a', 'e', 'i', 'o', 'u'].includes(enemy?.name.charAt(0).toLowerCase()) ? 'an' : 'a'), "Enemy Article");
                return ['a', 'e', 'i', 'o', 'u'].includes(enemy?.name.charAt(0).toLowerCase()) ? 'an' : 'a';
            }
        );
    }, [enemy]);

    useEffect(() => {
        console.log(namedEnemy, "Named Enemy");
    }, [namedEnemy]);

    useEffect(() => {
        console.log(dialogTree, "Dialog Tree")
    }, [dialogTree]);
    
    useEffect(() => {
        console.log(localWhispers, "Local Whisper")
    }, [localWhispers]);

    const getDialogTree = () => {
        console.log(enemy, "New Enemy")
        if (!enemy.dialogId) return;
        let dialogTree = getNodesForNPC(npcIds[enemy?.dialogId]);
        setDialogTree(dialogTree);
    };

    const handleCurrentQuest = (currentQuest: any) => {
        let quest = {
            player: ascean,
            giver: enemy,
            title: currentQuest.title,
            description: currentQuest.description,
            details: {
                isBounty: currentQuest.isBounty,
                bounty: {
                    name: ENEMY_ENEMIES?.[enemy?.name as keyof typeof ENEMY_ENEMIES][Math.floor(Math.random() * ENEMY_ENEMIES?.[enemy?.name as keyof typeof ENEMY_ENEMIES]?.length)],
                    bounty: Math.floor(Math.random() * 3) + 2, // 2-4
                },
                isTimed: currentQuest.isBounty,
                timer: ascean?.level + Math.floor(Math.random() * 3) + 1, // 1-3
                isGiver: enemy?.name,
            },
        };
        setQuest(quest);
        setQuestModalShow(true);
    };

    const handleCombatAction = (options: any, action: string) => {
        setCombatAction(action);
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

    const checkReset = async () => {
        await checkingLoot();
        await resetAscean();
    };

    const checkOpponent = async () => {
        await checkingLoot();
        await getOpponent();
    };

    const getLoot = async (type: string) => {
        try {
            if (merchantEquipment.length > 0) {
                const deleteResponse = await eqpAPI.deleteEquipment(merchantEquipment);
                console.log(deleteResponse, 'Delete Response!');
            };
            let response: any;
            setLoading(true);
            if (type === 'weapon') {
                response = await eqpAPI.getPhysicalWeaponEquipment(ascean?.level);
            } else if (type === 'armor') {
                response = await eqpAPI.getArmorEquipment(ascean?.level);
            } else if (type === 'jewelry') {
                response = await eqpAPI.getJewelryEquipment(ascean?.level);
            } else if (type === 'general') {
                response = await eqpAPI.getMerchantEquipment(ascean?.level);
            } else if (type === 'cloth') {
                response = await eqpAPI.getClothEquipment(ascean?.level);
            };
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: response.data });
            setLoading(false);
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

    function checkUniqueQuest () {
        let thisQuest = getQuests(enemy?.name);
        let newQuest = thisQuest[Math.floor(Math.random() * thisQuest.length)];
        let uniqueQuest = ascean?.quests.some((q: any) => q.title === newQuest.title);
        return uniqueQuest;
    }

    const getQuest = async (newQuest: any) => {
        try {
            setShowQuest(false);
            let uniqueQuest = ascean?.quests.some((q: any) => q.title === newQuest.title);
            console.log(uniqueQuest, "Unique QUest ?")
            if (uniqueQuest) {
                setError({ title: `Unique Quest`, content: `You already possess knowledge of ${newQuest.title}, given to you by ${newQuest.giver.name}.` });
                return;
            };
            const response = await questAPI.createQuest(newQuest);
            console.log(response, "Quest Response");
            setQuest(response);
            setQuestModalShow(false);
            gameDispatch({ type: GAME_ACTIONS.SAVE_QUEST, payload: true });
        } catch (err: any) {
            console.log(err, "Error Getting Quest");
        };
    };

    const getTraits = async () => {
        const response = await getAsceanTraits(ascean);
        console.log(response, "Response");
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
            case 'Tashaeral': // Fear
                playerPersuasion = ascean.strength + ascean.kyosir;
                enemyPersuasion = enemy.strength + enemy.kyosir;  
                break;
            default:
                break;
        };
        if (namedEnemy) { enemyPersuasion *= 1.25; } else { enemyPersuasion *= 1.1; };
        console.log(playerPersuasion, enemyPersuasion, "Persuasion");
        if (playerPersuasion >= enemyPersuasion) {
            dispatch({ type: ACTIONS.ENEMY_PERSUADED, payload: { enemyPersuaded: true, playerTrait: persuasion } });        
        } else {
            await checkingLoot();
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Failure. Despite your ${persuasion} nature,${namedEnemy ? '' : ` the`} ${enemy.name} was not persuased, and infact, became incensed. Presumably, this was not your intention. \n\n Nevertheless, prepare for some chincanery, ${ascean.name}, and perhaps leave the pleasantries for warmer company.` });
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
        const luckoutTrait = luckoutTraits?.find((trait: { name: string; }) => trait.name === luck);
        if (namedEnemy) { enemyLuck *= 1.5; } else { enemyLuck *= 1.25; };
        console.log(playerLuck, enemyLuck, "Luckout");
        if (playerLuck >= enemyLuck) {
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Success. Your ${luck} nature was irresistible to ${namedEnemy ? '' : ` ${article}`} ${enemy.name}. What is it they say, ${luckoutTrait.luckout.description} \n\n Congratulations, ${ascean.name}, your words ensured you needn't a single strike to win the day.` });
            setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: false });
                gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: '' });
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
            gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Failure. Despite your ${luck} nature,${namedEnemy ? '' : ` ${article}`} ${enemy.name} managed to resist. \n\n Prepare for combat, ${ascean.name}, and may your weapon strike surer than your words.` });
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

    const traitStyle = (trait: string) => {
        switch (trait) {
            case 'Arbituous':
                return 'green';
            case 'Chiomic':
                return 'gold';
            case 'Kyr\'naic':
                return 'purple';
            case 'Lilosian':
                return '#fdf6d8';
            case 'Ilian':
                return 'white';
            case 'Kyn\'gian':
                return 'brown';
            case 'Se\'van':
                return 'red';
            case 'Shrygeian':
                return 'orange';
            case 'Fyeran':
                return 'orangered';
            case 'Tshaeral':
                return 'darkblue';
            case 'Astral':
                return 'yellow';
            case 'Shaorahi':
                return 'blue';
            case 'Cambiren':
                return 'darkgreen';
            case 'Sedyrist':
                return 'silver';
            case 'Ma\'anreic':
                return 'darkgoldenrod';
            default:
                break;
        };
    };

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <>
        <Modal show={questModalShow} onHide={() => setQuestModalShow(false)} centered id='modal-weapon'>
            <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>{quest?.title}</Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                {quest?.description}<br /><br />
                <p style={{ fontSize: "18px", color: "gold" }}>
                Quest Giver: {quest?.giver?.name}
                </p>
                { quest?.details?.isBounty ? (
                    <>
                    Bounty: ({quest?.details?.bounty?.bounty}) {quest?.details?.bounty?.name} <br />
                    Timer: {quest?.details?.timer - ascean?.level} {quest?.details?.bounty?.timer === 1 ? 'Month' : 'Months'}<br />
                    </>
                ) : ( "" ) }
                <br />
                [Note: These Quests are classified as Curiosities, and are not required to complete the game. No quests are required to complete the game.]<br /><br />
                <Button variant='' style={{ color: "green", fontSize: "20px" }} onClick={() => getQuest(quest)}>Accept {quest?.title}?</Button>
            </Modal.Body>
        </Modal>
        <Modal show={luckoutModalShow} onHide={() => setLuckoutModalShow(false)} centered id='modal-weapon'>
            <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>Hush and Tendril</Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                These offer a unique opportunity to defeat your enemies without the need for combat. However, failure will result in hostile and immediate engagement. Named Enemies are 50% more difficult to defeat with this method.<br /><br />
                <p style={{ fontSize: "18px", color: "gold" }}>
                Arbituous - Rhetoric (Convince the enemy to cease hostility) <br /><br />
                Chiomic - Shatter (Mental seizure of the enemy) <br /><br />
                Kyr'naic - Apathy (Unburden the enemy to acquiesce and die) <br /><br /> 
                Lilosian - Peace (Allow the enemy to let go of their human failures) <br /><br />
                </p>
                [Note: Your character build has granted this avenue of gameplay experience. There are more in other elements to discover.]<br /><br />
            </Modal.Body>
        </Modal>
        <Modal show={persuasionModalShow} onHide={() => setPersuasionModalShow(false)} centered id='modal-weapon'>
            <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>Correspondence</Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                These offer a unique opportunity to entreat with your enemies without the need for combat. 
                However, failure may result anywhere from stymied conversation to hostile engagement. 
                Named Enemies are 25% more difficult to persuade. Perhaps with more notoriety this can change.<br /><br />
                <p style={{ fontSize: "18px", color: "gold" }}>
                Arbituous - Ethos (Affects all enemies within the Ley) <br /><br />
                Chiomic - Humor (This affects enemies of lesser Chomism) <br /><br />
                Fyeran - Seer (Affects all enemies who are more mystic than martial) <br /><br />
                Ilian - Heroism (This can affect all potential enemies) <br /><br />
                Kyr'naic - Apathy (Affects all enemies of lesser conviction) <br /><br /> 
                Lilosian - Pathos (Affects all enemies of the same faith) <br /><br />
                Shaorahi - Awe (Affects all enemies of lesser conviction) <br /><br />
                Tshaeral - Fear (Affects all enemies who can be fearful of your Tshaeral presence) <br /><br />
                </p>
                [Note: Your character build has granted this avenue of gameplay experience. There are more in other elements to discover.]<br /><br />
            </Modal.Body>
        </Modal>
        <div className='dialog-box'>
            <div className='dialog-text'>
            <ToastAlert error={error} setError={setError} />
            <img src={process.env.PUBLIC_URL + `/images/` + enemy?.origin + '-' + enemy?.sex + '.jpg'} alt={enemy?.name} className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
            {' '}{enemy?.name} (Level {enemy?.level}) {!enemy?.alive ? '[Deceased]' : ''}<br />
                { currentIntent === 'combat' ?
                    <>
                        <CombatDialogButtons options={dialog[currentIntent]} handleCombatAction={handleCombatAction}  />
                        <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', color: 'gold' }}>
                            {dialog[currentIntent][combatAction]}
                        </div>
                    </>
                : currentIntent === 'challenge' ?
                    state.playerTrait !== '' ?
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
                        { luckout ?
                            ( <div>
                                <Button variant='' className='dialog-buttons inner' style={{ color: "pink" }} onClick={() => setLuckoutModalShow(true)}>[ {'>>>'} Combat Alternative(s) {'<<<'} ]</Button>
                                {luckoutTraits.map((trait: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name) }} onClick={() => attemptLuckout(trait.name)}>[{trait.name}] - {trait.luckout.action.replace('{enemy.name}', enemy.name).replace('{ascean.weapon_one.influences[0]}', ascean.weapon_one.influences[0])}</Button>
                                        </div>
                                    )
                                })} 
                            </div>
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
                    { playerWin ?
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
                    { checkPlayerTrait("Kyn'gian", gameState) ? (
                        <Button variant='' className='dialog-buttons inner' style={{ color: 'green' }} onClick={() => clearDuel()}>Your Kyn'gian nature allows you to shirk most encounters.</Button>
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
                        <br /><br/>
                        [Note: This is currently a work in progress, yet you may still accept quests.]
                        <br />
                        { showQuest ?
                            localWhispers ?
                                localWhispers.map((whisper: any, index: number) => {
                                    return (
                                        <div key={index}>
                                        <Button variant='' className='dialog-buttons inner' onClick={() => handleCurrentQuest(whisper)}>{whisper.title}</Button>
                                        </div>
                                )})
                            : ''
                        : '' }
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
                            <div>
                                <Button variant='' className='dialog-buttons inner' style={{ color: "pink" }} onClick={() => setPersuasionModalShow(true)}>[ {'>>>'} Persuasive Alternative {'<<<'} ]</Button>
                                {persuasionTraits.map((trait: any, index: number) => {
                                    return (
                                        <div key={index}>
                                        <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name) }} onClick={() => attemptPersuasion(trait.name)}>[{trait.name}]: {trait.persuasion.action.replace('{enemy.name}', enemy.name).replace('{ascean.weapon_one.influences[0]}', ascean.weapon_one.influences[0])}</Button>
                                    </div>
                                    )
                                })} 
                            </div>
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
                            ) : (
                                <>
                                </>
                            ) }
                            </>
                        ) : ( 
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {ascean.name}."<br /><br />
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
                            <MerchantTable table={merchantEquipment} gameDispatch={gameDispatch} gameState={gameState} ascean={ascean} error={error} setError={setError} />
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