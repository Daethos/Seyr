import React, { useState, useEffect, useRef } from 'react'
import * as asceanAPI from '../utils/asceanApi';
import * as eqpAPI from '../utils/equipmentApi';
import ToastAlert from '../components/ToastAlert/ToastAlert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MerchantTable from '../components/GameCompiler/MerchantTable';
import Inventory from '../components/GameCompiler/Inventory';
import { DialogNode, getNodesForNPC, npcIds, DialogNodeOption, getNodesForEnemy } from '../components/GameCompiler/DialogNode';
import Currency from '../components/GameCompiler/Currency';
import { ACTIONS, CombatData, shakeScreen } from '../components/GameCompiler/CombatStore';
import { GAME_ACTIONS, GameData, Player, checkPlayerTrait, getAsceanTraits, nameCheck } from '../components/GameCompiler/GameStore';
import Typewriter from '../components/GameCompiler/Typewriter';
import dialogWindow from '../game/images/dialog_window.png';

interface DialogOptionProps {
    option: DialogNodeOption;
    onClick: (nextNodeId: string | null) => void;
    actions: { [key: string]: Function };
    setPlayerResponses: React.Dispatch<React.SetStateAction<string[]>>;
    setKeywordResponses: React.Dispatch<React.SetStateAction<string[]>>;
    setShowDialogOptions: React.Dispatch<React.SetStateAction<boolean>>;
    showDialogOptions: boolean;
};

const DialogOption = ({ option, onClick, actions, setPlayerResponses, setKeywordResponses, setShowDialogOptions, showDialogOptions }: DialogOptionProps) => {
    const hollowClick = () => console.log("Hollow Click");
    const handleClick = async () => {
        setPlayerResponses((prev) => [...prev, option.text]);
        if (option?.keywords && option.keywords.length > 0) {
            setKeywordResponses((prev) => [...prev, ...option.keywords || []]);
        };
          
        if (option.action && typeof option.action === 'string') {
            const actionName = option.action.trim();
            const actionFunction = actions[actionName];
            if (actionFunction) {
                actionFunction();
                // return;
            };
        };
        onClick(option.next);
        setShowDialogOptions(false);
    };

    return (
      <div>
      <Button variant='' onClick={handleClick} className='dialog-buttons inner' data-function-name='handleClick'>
        { showDialogOptions && (
            <Typewriter stringText={option.text} styling={{ overflowY: 'auto' }} performAction={hollowClick} />
        ) }
      </Button>
      </div>
    );
};

interface DialogTreeProps {
    ascean: Player;
    enemy: any;
    dialogNodes: DialogNode[];
    state: any;
    gameState: GameData;
    gameDispatch: React.Dispatch<any>;
    actions: any;
    setPlayerResponses: React.Dispatch<React.SetStateAction<string[]>>;
    setKeywordResponses: React.Dispatch<React.SetStateAction<string[]>>;
};

const DialogTree = ({ ascean, enemy, dialogNodes, gameState, gameDispatch, state, actions, setPlayerResponses, setKeywordResponses }: DialogTreeProps) => {
    const [currentNodeIndex, setCurrentNodeIndex] = useState(gameState?.currentNodeIndex || 0);
    const [showDialogOptions, setShowDialogOptions] = useState(false);

    useEffect(() => {
        setCurrentNodeIndex(gameState?.currentNodeIndex || 0);
    }, [gameState?.currentNodeIndex]);
    
    useEffect(() => {
        gameDispatch({
            type: GAME_ACTIONS.SET_CURRENT_DIALOG_NODE,
            payload: dialogNodes?.[currentNodeIndex]
        });
        gameDispatch({
            type: GAME_ACTIONS.SET_RENDERING,
            payload: {
                options: dialogNodes?.[currentNodeIndex]?.options,
                text: dialogNodes?.[currentNodeIndex]?.text
            },
        });

        const dialogTimeout = setTimeout(() => {
            setShowDialogOptions(true);
        }, dialogNodes?.[currentNodeIndex]?.text.split('').reduce((a: number, s: string | any[]) => a + s.length * 50, 0));

        return () => {
            clearTimeout(dialogTimeout);
        }; 
    }, [currentNodeIndex]);
  
    useEffect(() => {
        if (gameState?.currentNode) {
            let newText = gameState?.currentNode?.text;
            let newOptions: DialogNodeOption[] = [];
            if (gameState?.currentNode?.text) {
                newText = gameState?.currentNode?.text?.replace(/\${(.*?)}/g, (_, g) => eval(g));
            };
            if (gameState?.currentNode?.options) {
                newOptions = gameState?.currentNode?.options.filter(option => {
                    if (option.conditions) {
                        return option.conditions.every(condition => {
                            const { key, operator, value } = condition;
                            const optionValue = getOptionKey(ascean, state, key); // Hopefully this works!
                            switch (operator) {
                                case '>':
                                    return optionValue > value;
                                case '>=':
                                    return optionValue >= value;
                                case '<':
                                    return optionValue < value;
                                case '<=':
                                    return optionValue <= value;
                                case '=':
                                    return optionValue === value;
                                default:
                                    return false;
                            };
                        });
                    } else {
                        return true;
                    };
                }).map(option => {
                    const renderedOption = option.text.replace(/\${(.*?)}/g, (_, g) => eval(g));
                    return {
                        ...option,
                        text: renderedOption,
                    };
                });
            };
            gameDispatch({ type: GAME_ACTIONS.SET_RENDERING, payload: { text: newText, options: newOptions } });
        };
    }, [gameState.currentNode]);

    const getOptionKey = (ascean: Player, state: any, key: string) => {
        const newKey = key === 'mastery' ? ascean[key].toLowerCase() : key;
        return ascean[newKey] !== undefined ? ascean[newKey] : state[newKey];
    };
  
    const handleOptionClick = (nextNodeId: string | null) => {
        if (nextNodeId === null) {
            gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_NODE_INDEX, payload: 0 });
        } else {
            let nextNodeIndex = dialogNodes.findIndex((node: { id: string; }) => node.id === nextNodeId);
            if (nextNodeIndex === -1) nextNodeIndex = 0;
            gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_NODE_INDEX, payload: nextNodeIndex });
        };
    };
  
    if (!gameState?.currentNode) {
      return null;
    };
  
    return (
        <div> 
            <Typewriter stringText={gameState?.renderedText} styling={{ overflowY: 'auto' }} performAction={handleOptionClick} />
            {gameState?.renderedOptions?.map((option: DialogNodeOption) => (
                <DialogOption key={option.text} option={option} onClick={handleOptionClick} actions={actions} setPlayerResponses={setPlayerResponses} setKeywordResponses={setKeywordResponses} setShowDialogOptions={setShowDialogOptions} showDialogOptions={showDialogOptions} />
            ))}
            <br />
        </div>
    );
};

const DialogButtons = ({ options, setIntent }: { options: any, setIntent: any }) => {
    const filteredOptions = Object.keys(options).filter((option: any) => option !== 'defeat' && option !== 'victory' && option !== 'taunt' && option !== 'praise' && option !== 'greeting');
    const buttons = filteredOptions.map((o: any, i: number) => {
        return (
            <div key={i}>
                <Button variant='' className='dialog-buttons' onClick={() => setIntent(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }}>{o}</Button>
            </div>
        );
    });
    return <>{buttons}</>;
};

const ProvincialWhispersButtons = ({ options, handleRegion }: { options: any, handleRegion: any }) => {
    console.log(options, 'The Options');
    const buttons = Object.keys(options).map((o: any, i: number) => {
        console.log(o, 'Options in ProvincialWhispersButtons');
        return (
            <Button variant='' className='dialog-buttons' key={i} onClick={() => handleRegion(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }}>{o}</Button>
        );
    });
    return <>{buttons}</>;
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

interface StoryDialogProps {
    state: CombatData;
    dispatch: React.Dispatch<any>;
    gameState: GameData;
    gameDispatch: React.Dispatch<any>;
    deleteEquipment: (equipment: any[]) => Promise<void>;
};

export const StoryDialog = ({ state, dispatch, gameState, gameDispatch, deleteEquipment }: StoryDialogProps) => {
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [typewriterString, setTypewriterString] = useState<string>('');
    const targetRef = useRef(null);
    const [upgradeItems, setUpgradeItems] = useState<any | null>(null);
    const [playerResponses, setPlayerResponses] = useState<string[]>([]);
    const [keywordResponses, setKeywordResponses] = useState<string[]>([]);
    const [namedEnemy, setNamedEnemy] = useState<boolean>(false);
    const [traits, setTraits] = useState<any | null>(null);
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
    const [luckoutModalShow, setLuckoutModalShow] = useState<boolean>(false);
    const [persuasionModalShow, setPersuasionModalShow] = useState<boolean>(false);
    const [luckout, setLuckout] = useState<boolean>(false);
    const [luckoutTraits, setLuckoutTraits] = useState<any>([]);
    const [persuasion, setPersuasion] = useState<boolean>(false);
    const [persuasionTraits, setPersuasionTraits] = useState<any>([]);
    const [miniGame, setMiniGame] = useState<boolean>(false);
    const [miniGameTraits, setMiniGameTraits] = useState<any>([]);
    const article = ['a', 'e', 'i', 'o', 'u'].includes(state.computer?.name.charAt(0).toLowerCase()) ? 'an' : 'a';
    const [enemyArticle, setEnemyArticle] = useState<any>('')

    useEffect(() => {
        if (state.npcType !== '') return;
        checkLuckout();
        checkPersuasion();
        checkMiniGame();
        setNamedEnemy(nameCheck(state.computer?.name));
        setEnemyArticle(
            () => {
                console.log((['a', 'e', 'i', 'o', 'u'].includes(state.computer?.name.charAt(0).toLowerCase()) ? 'an' : 'a'), "Enemy Article");
                return ['a', 'e', 'i', 'o', 'u'].includes(state.computer?.name.charAt(0).toLowerCase()) ? 'an' : 'a';
            }
        );
    }, [state.computer]);

    const attemptPersuasion = async (persuasion: string) => {
        let playerPersuasion: number = 0;
        let enemyPersuasion: number = 0;
        switch (persuasion) {
            case 'Arbituous': // Ethos (Law)
                playerPersuasion = state.player.constitution + state.player.achre;
                enemyPersuasion = state.computer.constitution + state.computer.achre;
                break;
            case 'Chiomic': // Humor
                playerPersuasion = state.player.achre + state.player.kyosir;
                enemyPersuasion = state.computer.achre + state.computer.kyosir;
                break;
            case 'Kyr\'naic': // Apathy
                playerPersuasion = state.player.constitution + state.player.kyosir;
                enemyPersuasion = state.computer.constitution + state.computer.kyosir;
                break;
            case 'Lilosian': // Peace
                playerPersuasion = state.player.constitution + state.player.caeren;
                enemyPersuasion = state.computer.constitution + state.computer.caeren;
                break;
            case 'Ilian': // Heroism
                playerPersuasion = state.player.constitution + state.player.strength;
                enemyPersuasion = state.computer.constitution + state.computer.strength;
                break;
            case 'Fyeran': // Seer
                playerPersuasion = state.player.achre + state.player.caeren;
                enemyPersuasion = state.computer.achre + state.computer.caeren;
                break;
            case 'Shaorahi': // Awe
                playerPersuasion = state.player.strength + state.player.caeren;
                enemyPersuasion = state.computer.strength + state.computer.caeren;
                break;
            default:
                break;
        };
        const specialEnemies = ["Laetrois Ath'Shaorah", "Mavros Ilios", "Lorian", "King Mathyus Caderyn", "Cyrian Shyne", "Vincere", "Eugenes", "Dorien Caderyn", "Ashreu'ul", "Kreceus"];
        const persuasionTrait = persuasionTraits.find((trait: { name: string; }) => trait.name === persuasion);
        if (namedEnemy && specialEnemies.includes(state.computer.name)) {
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
                asceanID: state.player._id,
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
                setTypewriterString(`Failure. ${persuasionTrait?.persuasion?.failure.replace('{enemy.name}', state.computer.name).replace('{ascean.weapon_one.influences[0]}', 
                state.player.weapon_one.influences[0]).replace('{ascean.name}', state.player.name).replace('{enemy.weapon_one.influences[0]}', 
                state.computer.weapon_one.influences[0]).replace('{enemy.faith}', state.computer.faith)} \n\n Nevertheless, prepare for some chincanery, ${state.player.name}, and perhaps leave the pleasantries for warmer company.`);
            const statistic = {
                asceanID: state.player._id,
                name: 'persuasion',
                type: persuasion === "Kyr'naic" ? "Kyrnaic" : persuasion,
                successes: 0,
                failures: 1,
                total: 1,
            };
            const response = await asceanAPI.recordNonCombatStatistic(statistic);
            console.log(response, "Persuasion Response Recorded");
            gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
            
            dispatch({ type: ACTIONS.SET_DUEL, payload: '' });
        };
    };

    const attemptLuckout = async (luck: string) => {
        let playerLuck: number = 0;
        let enemyLuck: number = 0;
        const ascean = state.player;
        const enemy = state.computer;
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
            setTypewriterString(`Success. Your ${luck} nature was irresistible to ${namedEnemy ? '' : ` ${article}`} ${enemy.name}. What is it they say, ${luckoutTrait.luckout.description} \n\n Congratulations, ${ascean.name}, your words ensured you needn't a single strike to win the day.`);
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
            shakeScreen({ duration: 1000, intensity: 1.5 });
            if ('vibrate' in navigator) navigator.vibrate(1000);
            dispatch({
                type: ACTIONS.PLAYER_LUCKOUT,
                payload: {
                    playerLuckout: true,
                    playerTrait: luck
                }
            });
        } else {
            await checkingLoot();
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            setTypewriterString(`Failure. ${luckoutTrait?.luckout?.failure.replace('{enemy.name}', enemy.name).replace('{ascean.weapon_one.influences[0]}', ascean.weapon_one.influences[0]).replace('{ascean.name}', ascean.name).replace('{enemy.weapon_one.influences[0]}', enemy.weapon_one.influences[0]).replace('{enemy.faith}', enemy.faith)} \n\n Prepare for combat, ${ascean.name}, and may your weapon strike surer than your words.`);
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
            dispatch({
                type: ACTIONS.SET_DUEL,
                payload: ''
            });
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

    const actions = {
        getCombat: () => engageCombat(),
        getArmor: () => getLoot('armor'),
        getGeneral: () => getLoot('general'),
        getJewelry: () => getLoot('jewelry'),
        getMystic: () => getLoot('magical-weapon'),
        getTailor: () => getLoot('cloth'),
        getWeapon: () => getLoot('physical-weapon'),
        getFlask: () => refillFlask()
      };

    useEffect(() => {
        if (gameState.player.inventory.length > 2) {
            const matchedItem = canUpgrade(gameState.player.inventory);
            if (matchedItem) {
                setUpgradeItems(matchedItem);
            } else {
                setUpgradeItems(null);
            };
        };
    }, [gameState.player.inventory]);

    const engageGrappling = async () => {
        await checkingLoot();
        gameDispatch({ type: GAME_ACTIONS.LOADING_UNDERLAY, payload: true });
        gameDispatch({ type: GAME_ACTIONS.SET_MINIGAME_SEVAN, payload: true });
    };

    const getTraits = async () => {
        const response = await getAsceanTraits(state.player);
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

    const canUpgrade = (inventory: any[]) => {
        const itemGroups: Record<string, any[]> = {};
        inventory.forEach(item => {
            const key = `${item?.name}-${item?.rarity}`;
            itemGroups[key] = itemGroups[key] || [];
            itemGroups[key].push(item);
        });
        const matches = [];
        for (const key in itemGroups) {
            if (itemGroups.hasOwnProperty(key)) {
                const items = itemGroups[key];
                if (items.length >= 3) { 
                    matches.push(items[0]);
                };
            };
        };
        return matches.length > 0 ? matches : null;
    };

    const checkingLoot = async () => {
        if (gameState.merchantEquipment.length > 0) {
            await deleteEquipment(gameState.merchantEquipment);
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: [] });
        };
    };

    const handleIntent = (intent: string) => gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_INTENT, payload: intent });
    const handleRegion = (region: keyof Region) => setProvince(region);
    const engageCombat = async () => {
        await checkingLoot();
        dispatch({ type: ACTIONS.SET_DUEL, payload: '' });
    };

    const clearDuel = async () => {
        try {
            await checkingLoot();
            // await clearOpponent(state);
        } catch (err: any) {
            console.log(err.message, "Error Clearing Duel");
        };
    };

    const refillFlask = async () => {
        try {
            const response = await asceanAPI.restoreFirewater(state.player._id);
            console.log(response, 'Response Refilling Flask');
            dispatch({ type: ACTIONS.SET_EXPERIENCE, payload: response });
            gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
        } catch (err: any) {
            console.log(err, "Error Refilling Flask");
        };
    };

    const getLoot = async (type: string) => {
        if (gameState?.merchantEquipment.length > 0) await deleteEquipment(gameState?.merchantEquipment);
        try {
            let response: any;
            if (type === 'physical-weapon') {
                response = await eqpAPI.getPhysicalWeaponEquipment(state.player.level);
            } else if (type === 'magical-weapon') {
                response = await eqpAPI.getMagicalWeaponEquipment(state.player.level);
            } else if (type === 'armor') {
                response = await eqpAPI.getArmorEquipment(state.player.level);
            } else if (type === 'jewelry') {
                response = await eqpAPI.getJewelryEquipment(state.player.level);
            } else if (type === 'general') {
                response = await eqpAPI.getMerchantEquipment(state.player.level);
            } else if (type === 'cloth') {
                response = await eqpAPI.getClothEquipment(state.player.level);
            };
            console.log(response.data, 'Response!');
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: response.data })
        } catch (err) {
            console.log(err, 'Error Getting Loot!');
        };
    };

    const dialogStyle = {  
        zIndex: 9999,
    };

    return (
        <>
        <Modal show={luckoutModalShow} onHide={() => setLuckoutModalShow(false)} centered id='modal-weapon' style={{ zIndex: 9999, top: '-25%' }}>
            <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>Hush and Tendril</Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                These offer a unique opportunity to defeat your enemies without the need for combat. However, failure will result in hostile and immediate engagement. Named Enemies are 25% more difficult to defeat with this method.<br /><br />
                <div style={{ fontSize: "18px", color: "gold" }}>
                {luckoutTraits.map((trait: any, index: number) => {
                    return (
                        <div key={index}>
                            <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name), fontSize: "18px" }} 
                            onClick={() => attemptLuckout(trait.name)}>[{trait.name}] - {trait.luckout.modal.replace('{enemy.name}', state.computer.name).replace('{ascean.weapon_one.influences[0]}', state.player.weapon_one.influences[0])}</Button>
                        </div>
                    )
                })}
                </div>
                [Note: Your character build has granted this avenue of gameplay experience. There are more in other elements to discover.]<br /><br />
            </Modal.Body>
        </Modal>
        <Modal show={persuasionModalShow} onHide={() => setPersuasionModalShow(false)} centered id='modal-weapon' style={{ zIndex: 9999, top: '-25%' }}>
            <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>Correspondence</Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                These offer a unique opportunity to entreat with your enemies without the need for combat. 
                However, failure may result anywhere from stymied conversation to hostile engagement. 
                Named Enemies are 25% more difficult to persuade. Perhaps with more notoriety this can change.<br /><br />
                <div style={{ fontSize: "18px", color: "gold" }}>
                {persuasionTraits.map((trait: any, index: number) => {
                    return (
                        <div key={index}>
                        <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name), fontSize: "18px" }} onClick={() => attemptPersuasion(trait.name)}>[{trait.name}]: {trait.persuasion.modal.replace('{enemy.name}', state.computer.name).replace('{ascean.weapon_one.influences[0]}', state.player.weapon_one.influences[0])}</Button>
                    </div>
                    )
                })}
                </div>
                [Note: Your character build has granted this avenue of gameplay experience. There are more in other elements to discover.]<br /><br />
            </Modal.Body>
        </Modal>
        <div className='story-dialog' style={dialogStyle}>
            <img src={dialogWindow} alt='Dialog Window' style={{ transform: "scale(1.1)" }} />
            <div className='story-text' style={{ width: state.npcType === '' ? '62%' : '' }}> 
            <ToastAlert error={error} setError={setError} />
            <p style={{ color: 'gold', fontSize: '20px' }}>
            { state.npcType === '' ? (
                <>
                <img src={process.env.PUBLIC_URL + `/images/` + state.computer.origin + '-' + state.computer.sex + '.jpg'} alt={state.computer.name} 
                    style={{ width: '15%' }} className='dialog-picture' />
                {' '}{state.computer.name} (Level {state.computer.level}) {!state.computer.alive ? '[Deceased]' : ''}<br />
                </>
            ) : (
                state.npcType.split('-').reverse().join(' ')
            )}
            </p>
            { state.npcType === 'Merchant-Smith' ? (
                <>
                    "You've come for forging? I only handle chiomic quality and above. Check my rates and hand me anything you think worth's it. Elsewise I trade with the Armorer if you want to find what I've made already."
                    <br /><br />
                    Hanging on the wall is a list of prices for the various items you can forge. The prices are based on the quality. <br /><br />
                    <p style={{ color: "green", fontSize: "20px", marginBottom: "-1px", fontWeight: 700, display: 'inline' }}>Kyn'gian: 1g</p> |{' '}  
                    <p style={{ color: "blue", fontSize: "20px", marginBottom: "-1px", fontWeight: 700, display: 'inline' }}>Senic: 3g</p> |{' '}
                    <p style={{ color: "purple", fontSize: "20px", marginBottom: "-1px", fontWeight: 700, display: 'inline' }}>Kyris: 12g</p> |{' '} 
                    <p style={{ color: "darkorange", fontSize: "20px", marginBottom: "-1px", fontWeight: 700, display: 'inline' }}>Sedyrus: 60g</p>
                    <br /><br />
                    <Currency ascean={gameState.player} />
                    { upgradeItems ? (
                        upgradeItems.map((item: any, index: number) => {
                            return (
                                <div style={{ display: 'inline-block', marginRight: '5%', marginBottom: '10%' }}>
                                    <Inventory key={index} inventory={item} bag={gameState.player.inventory} gameState={gameState} gameDispatch={gameDispatch} ascean={state.player} blacksmith={true} index={index} />
                                </div>
                            )
                        })
                    ) : ( '' ) }
                    <br />
                </>
            ) : state.npcType === 'Merchant-Alchemy' ? (
                <>
                    <br />
                    { gameState.player?.firewater?.charges === 5 ?
                        <>
                        The Alchemist sways in a slight tune to the swish of your flask as he turns to you.<br /><br />
                        "If you're needing potions of amusement and might I'm setting up craft now. Seems you're set for now, come back when you're needing more."
                        </>
                    :
                        <>
                        "Hmm." The Alchemist's eyes scatter about your presence, eyeing {gameState.player?.firewater?.charges} swigs left of your Fyervas Firewater before tapping on on a pipe, 
                        its sound wrapping round and through the room to its end, a quaint, little spigot with a grated catch on the floor.<br /><br />
                        "If you're needing potions of amusement and might I'm setting up craft now. Fill up your flask meanwhile, 10s a fifth what you say? I'll need you alive for patronage."
                        <br /><br />
                        <Button variant='' className='dialog-buttons inner' style={{ color: 'blueviolet' }} onClick={refillFlask}>Walk over and refill your firewater?</Button>
                        </>
                    }
                </>
            ) : ( '' ) }
            { state.npcType === '' ? (
                <>
                <DialogTree 
                    gameState={gameState} gameDispatch={gameDispatch} state={state} ascean={state.player} enemy={gameState.opponent} dialogNodes={getNodesForEnemy(state.computer.name)} 
                    setKeywordResponses={setKeywordResponses} setPlayerResponses={setPlayerResponses} actions={actions}
                />
                { gameState.currentIntent === 'combat' ?
                    <> 
                    </>
                : gameState.currentIntent === 'challenge' ?
                <>
                    { state.enemyPersuaded ?
                        <div style={{ color: "gold" }}>
                        [Success]:{' '}
                        { namedEnemy ? (
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {state.player.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                {state.computer?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {state.player.name}. What is happening to me, what have you brought back?"<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "I'm sorry, {state.player.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in {state.computer?.name}'s eyes. "I'm sorry, {state.player.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
                                </>
                            ) : state.playerTrait === 'Shaorahi' ? (
                                <>
                                A stillness hollows {state.computer?.name}, the chant of a dead language stirs their blood without design.<br /><br />
                                </>
                            ) : state.playerTrait === 'Ilian' ? (
                                <>
                                "My, its been some time since I have witnessed a design such as yours. Careful whom you show your nature to, {state.player.name}, others may be feaful of the Black Sun."<br /><br />
                                </>
                            ) : state.playerTrait === 'Fyeran' ? (
                                <>
                                "You are not here right now, {state.player.name}. Perchance we may see us in another land, then?"<br /><br />
                                </>
                            ) : ( '' ) }
                            </>
                        ) : ( 
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {state.player.name}. May we never meet again."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                The {state.computer?.name} contorts and swirls with designs of ancient artifice and delight. They may still speak but it seems as though their mind is retracing former moments.<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "{state.player.name}, all my life as {article} {state.computer?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in the {state.computer?.name}'s eyes. "All of that glory in all those years, {state.player.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {state.player.weapon_one.influences[0]}." <br /><br />
                                </>
                            ) : state.playerTrait === 'Shaorahi' ? (
                                <>
                                An unsure unease stifles the ascent of the {state.computer.name}, their eyes a haze of murk. <br /><br />
                                </>
                            ) : state.playerTrait === 'Ilian' ? (
                                <>
                                "Nooo, you cannot be Him." Concern marks the {state.computer.name}, for whomever they believe you are, it arrests their confidence in any action. "Yet I am not to thwart naked fate, good day {state.player.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Fyeran' ? (
                                <>
                                Sweet tendrils stretch a creeping smile adorning your face, casting shades of delight for any occasion.<br /><br />
                                </>
                            ) : ( '' ) }         
                            </>
                        ) }
                            You persuaded {namedEnemy ? '' : ` the`} {state.computer?.name} to forego hostilities. You may now travel freely through this area.<br />
                        </div>
                    : state.playerTrait !== '' ?
                        <div>
                        { namedEnemy ? (
                            <>
                            { state.playerTrait === 'Arbituous' ? ( 
                                <>
                                "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {state.player.name}."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                {state.computer?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {state.player.name}. What is happening to me, what have you brought back?"<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "I'm sorry, {state.player.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in {state.computer?.name}'s eyes. "I'm sorry, {state.player.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
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
                                "Oh dear, another wandering Arbiter. I am absolutely not getting involved with you folk again. Good day, {state.player.name}. May we never meet again."<br /><br />
                                </>
                            ) : state.playerTrait === 'Chiomic' ? (
                                <>
                                The {state.computer?.name} contorts and swirls with designs of ancient artifice and delight.<br /><br />
                                </>
                            ) : state.playerTrait === "Kyr'naic" ? (
                                <>
                                "{state.player.name}, all my life as {article} {state.computer?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                </>
                            ) : state.playerTrait === 'Lilosian' ? (
                                <>
                                Tears well up in the {state.computer?.name}'s eyes. "All of that glory in all those years, {state.player.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {state.player.weapon_one.influences[0]}." <br /><br />
                                </>
                            ) : (
                                <>
                                </>
                            ) }         
                            </>
                        ) } 
                        </div>
                    : state.player_win ? 
                        <div>
                        { namedEnemy ? (
                            <>
                            "Congratulations {state.player.name}, you were fated this win. This is all I have to offer, if it pleases you." <br /><br />        
                            </>
                        ) : ( 
                            <>
                            "Appears I were wrong to treat with you in such a way, {state.player.name}. Take this if it suits you, I've no need." <br /><br />         
                            </>
                        ) } 
                        </div> 
                    : state.computer_win ? 
                        <div>
                            { namedEnemy ? (
                                <> "{state.player.name}, surely this was a jest? Come now, you disrespect me with such play. What was it that possessed you to even attempt this failure?" <br /><br /> </>
                            ) : ( 
                                <> "The {state.computer.name} are not to be trifled with."<br /><br /> </>
                            ) } 
                        </div> 
                    :
                        <div>
                            { namedEnemy ? ( 
                                <>
                                    "Greetings traveler, I am {state.computer?.name}. {state.player.name}, is it? You seem a bit dazed, can I be of some help?"<br />
                                    <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={engageCombat}>Forego pleasantries and surprise attack {state.computer.name}?</Button>
                                </> 
                            ) : ( 
                                <>
                                    {enemyArticle === 'a' ? enemyArticle?.charAt(0).toUpperCase() : enemyArticle?.charAt(0).toUpperCase() + enemyArticle?.slice(1)} {state.computer?.name} stares at you, unflinching. Eyes lightly trace about you, reacting to your movements in wait. Grip your {state.player.weapon_one.name} and get into position?<br />
                                    <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={engageCombat}>Engage in hostilities with {state.computer.name}?</Button>
                                </> 
                            ) }
                            { luckout ?
                                ( <div>
                                    <Button variant='' className='dialog-buttons inner' style={{ color: "pink" }} onClick={() => setLuckoutModalShow(true)}>[ {'>>>'} Combat Alternative(s) {'<<<'} ]</Button>
                                    {luckoutTraits.map((trait: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name) }} onClick={() => attemptLuckout(trait.name)}>[{trait.name}] - {trait.luckout.action.replace('{enemy.name}', state.computer.name).replace('{ascean.weapon_one.influences[0]}', state.player.weapon_one.influences[0])}</Button>
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
                                                <Button variant='' className='dialog-buttons inner' onClick={() => engageGrappling()}>[Testing] Surprise {state.computer.name} and initiate Se'van Grappling</Button>
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
                    } 
                </>
                : gameState.currentIntent === 'conditions' ?
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
                : gameState.currentIntent === 'farewell' ?
                    <>
                        { state.enemyPersuaded ?
                            <div style={{ color: "gold" }}>
                                [Success]:{' '}
                                { namedEnemy ? (
                                    <>
                                    { state.playerTrait === 'Arbituous' ? ( 
                                        <>
                                        "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {state.player.name}."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Chiomic' ? (
                                        <>
                                        {state.computer?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {state.player.name}. What is happening to me, what have you brought back?"<br /><br />
                                        </>
                                    ) : state.playerTrait === "Kyr'naic" ? (
                                        <>
                                        "I'm sorry, {state.player.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Lilosian' ? (
                                        <>
                                        Tears well up in {state.computer?.name}'s eyes. "I'm sorry, {state.player.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Shaorahi' ? (
                                        <>
                                        A stillness hollows {state.computer?.name}, the chant of a dead language stirs their blood without design.<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Ilian' ? (
                                        <>
                                        "My, its been some time since I have witnessed a design such as yours. Careful whom you show your nature to, {state.player.name}, others may be feaful of the Black Sun."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Fyeran' ? (
                                        <>
                                        "You are not here right now, {state.player.name}. Perchance we may see us in another land, then?"<br /><br />
                                        </>
                                    ) : ( '' ) }
                                    </>
                                ) : ( 
                                    <>
                                    { state.playerTrait === 'Arbituous' ? ( 
                                        <>
                                        "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {state.player.name}. May we never meet again."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Chiomic' ? (
                                        <>
                                        The {state.computer?.name} contorts and swirls with designs of ancient artifice and delight. They may still speak but it seems as though their mind is retracing former moments.<br /><br />
                                        </>
                                    ) : state.playerTrait === "Kyr'naic" ? (
                                        <>
                                        "{state.player.name}, all my life as {article} {state.computer?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Lilosian' ? (
                                        <>
                                        Tears well up in the {state.computer?.name}'s eyes. "All of that glory in all those years, {state.player.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {state.player.weapon_one.influences[0]}." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Shaorahi' ? (
                                        <>
                                        An unsure unease stifles the ascent of the {state.computer.name}, their eyes a haze of murk. <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Ilian' ? (
                                        <>
                                        "Nooo, you cannot be Him." Concern marks the {state.computer.name}, for whomever they believe you are, it arrests their confidence in any action. "Yet I am not to thwart naked fate, good day {state.player.name}."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Fyeran' ? (
                                        <>
                                        Sweet tendrils stretch a creeping smile adorning your face, casting shades of delight for any occasion.<br /><br />
                                        </>
                                    ) : ( '' ) }         
                                    </>
                                ) }
                                You persuaded {namedEnemy ? '' : ` the`} {state.computer?.name} to forego hostilities. You may now travel freely through this area.<br />
                                <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                                </div>
                        : state.playerTrait !== '' ?
                            <div>
                            { namedEnemy ? (
                                <>
                                    { state.playerTrait === 'Arbituous' ? ( 
                                        <>
                                        "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {state.player.name}."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Chiomic' ? (
                                        <>
                                        {state.computer?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {state.player.name}. What is happening to me, what have you brought back?"<br /><br />
                                        </>
                                    ) : state.playerTrait === "Kyr'naic" ? (
                                        <>
                                        "I'm sorry, {state.player.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Lilosian' ? (
                                        <>
                                        Tears well up in {state.computer?.name}'s eyes. "I'm sorry, {state.player.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
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
                                        "Oh dear, another wandering Arbiter. I am absolutely not getting involved with you folk again. Good day, {state.player.name}. May we never meet again."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Chiomic' ? (
                                        <>
                                        The {state.computer?.name} contorts and swirls with designs of ancient artifice and delight.<br /><br />
                                        </>
                                    ) : state.playerTrait === "Kyr'naic" ? (
                                        <>
                                        "{state.player.name}, all my life as {article} {state.computer?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Lilosian' ? (
                                        <>
                                        Tears well up in the {state.computer?.name}'s eyes. "All of that glory in all those years, {state.player.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {state.player.weapon_one.influences[0]}." <br /><br />
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    ) }         
                                </>
                            ) } 
                            <Button variant='' className='dialog-buttons inner' onClick={() => clearDuel()}>Leave {state.computer.name}'s caeren behind in contemplation of your {state.playerTrait} nature.</Button>
                            </div>          
                        : state.player_win ? (
                            <>
                                { namedEnemy ? (
                                    <> "{state.player.name}, you are truly unique in someone's design. Before you travel further, if you wish to have it, its yours."<br /><br /> </>
                                ) : ( 
                                    <> "Go now, {state.player.name}, take what you will and find those better pastures."<br /><br /> </>
                                ) }
                                <Button variant='' className='dialog-buttons inner' onClick={() => clearDuel()}>Seek those pastures and leave your lesser to their pitious nature.</Button>
                            </>
                        ) : state.computer_win ? (
                            <>
                                "If you weren't entertaining in defeat I'd have a mind to simply snuff you out here and now. Seek refuge {state.player.name}, your frailty wears on my caer."<br />
                                <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Feign scamperping away to hide your shame and wounds. There's always another chance, perhaps.</Button>
                            </>
                        ) : state.enemyPersuaded ? (
                            <>
                                You have persuaded {namedEnemy ? '' : ` ${article}`} {state.computer?.name} to forego hostilities. You may now travel freely through this area.<br />
                                <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                            </>
                        ) : (
                            <>
                                { namedEnemy ? ( 
                                    <>
                                        "I hope you find what you seek, {state.player.name}. Take care in these parts, you may never know when someone wishes to approach out of malice and nothing more. Strange denizens these times." <br/>
                                        <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Take the advice and keep moving.</Button>
                                    </>
                                ) : ( 
                                    <> 
                                        "Well, {state.player?.name}, I suppose you've got better things to do. I'll be around if you happen to find yourself in need of supply."
                                        <br />
                                        <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Depart from the trader's caravan and keep moving.</Button>
                                    </>
                                ) }
                            </>
                        ) }
                        { checkPlayerTrait("Kyn'gian", gameState) && !state.player_win && !state.computer_win ? (
                            <Button variant='' className='dialog-buttons inner' onClick={() => clearDuel()}>You remain at the edges of sight and sound, and before {state.computer.name} can react, you attempt to flee.</Button>
                        ) : ( '' ) }
                    </>
                : gameState.currentIntent === 'localLore' ?
                    <>
                        This has not been written yet.<br /><br />
                        This will entail the local lore of the region you inhabit, and the history of the area from the perspective of the enemy in question, and hopefully grant more insight into the world.
                    </>
                : gameState.currentIntent === 'localWhispers' ?
                    <>
                    </>
                : gameState.currentIntent === 'persuasion' ?
                    <>
                        At the moment this is testing the utilization of traits, in creation and evaluation. 
                        As a temporary display of its concept, you may persuade an enemy--if available, to cease hostility 
                        (This currently only affects non-named enemies, as named enemies start neutral).<br /><br />
                        { state.player_win ? (
                            <>
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path, perhaps words will work next time.</Button>
                            </>
                        ) : state.computer_win ? (
                            <>
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={() => clearDuel()}>Continue moving along your path, there's nothing left to say now.</Button>
                            </>
                        ) : persuasion && !state.enemyPersuaded ? ( 
                            <div>
                                <Button variant='' className='dialog-buttons inner' style={{ color: "pink" }} onClick={() => setPersuasionModalShow(true)}>[ {'>>>'} Persuasive Alternative {'<<<'} ]</Button>
                                {persuasionTraits.map((trait: any, index: number) => {
                                    return (
                                        <div key={index}>
                                        <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name) }} onClick={() => attemptPersuasion(trait.name)}>[{trait.name}]: {trait.persuasion.action.replace('{enemy.name}', state.computer.name).replace('{ascean.weapon_one.influences[0]}', state.player.weapon_one.influences[0])}</Button>
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
                                        "Oh, is that the right of it, Ley Law, you say? I hear still they give the Ancient Eulex round these parts. Perhaps it better we ease this tension, {state.player.name}."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Chiomic' ? (
                                        <>
                                        {state.computer?.name} looks at you with a confusion and pain emanating from every twitch of their body as its mind writhes within, thrashing and tearing at itself.. "I don't understand, {state.player.name}. What is happening to me, what have you brought back?"<br /><br />
                                        </>
                                    ) : state.playerTrait === "Kyr'naic" ? (
                                        <>
                                        "I'm sorry, {state.player.name}, I don't understand what you're saying. I don't understand anything anymore. I'm uncertain of myself and this place, here, now, with you. I don't believe that I should be here." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Lilosian' ? (
                                        <>
                                        Tears well up in {state.computer?.name}'s eyes. "I'm sorry, {state.player.name}, I'm sorry. I'm sorry for everything I've done. I'm sorry for everything I've said. I'm sorry for everything I've thought. I'm sorry for everything I've been. I'm sorry." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Shaorahi' ? (
                                        <>
                                        A stillness hollows {state.computer?.name}, the chant of a dead language stirs their blood without design.<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Ilian' ? (
                                        <>
                                        "My, its been some time since I have witnessed a design such as yours. Careful whom you show your nature to, {state.player.name}, others may be feaful of the Black Sun."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Fyeran' ? (
                                        <>
                                        "You are not here right now, {state.player.name}. Perchance we may see us in another land, then?"<br /><br />
                                        </>
                                    ) : ( '' ) }
                                </>
                            ) : ( 
                                <>
                                    { state.playerTrait === 'Arbituous' ? ( 
                                        <>
                                        "Oh dear, another wandering Arbiter. I'm absolutely not getting involved with you folk again. Good day, {state.player.name}. May we never meet again."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Chiomic' ? (
                                        <>
                                        The {state.computer?.name} contorts and swirls with designs of ancient artifice and delight. They may still speak but it seems as though their mind is retracing former moments.<br /><br />
                                        </>
                                    ) : state.playerTrait === "Kyr'naic" ? (
                                        <>
                                        "{state.player.name}, all my life as {article} {state.computer?.name} has been worthless. I am completely rid of compulsion to take one further step in this world. I am now certain of myself for the first time, and it is thanks to you." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Lilosian' ? (
                                        <>
                                        Tears well up in the {state.computer?.name}'s eyes. "All of that glory in all those years, {state.player.name}, and all this time there was something sweeter. I am so instilled with harmony, having heard your beautiful hymn of {state.player.weapon_one.influences[0]}." <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Shaorahi' ? (
                                        <>
                                        An unsure unease stifles the ascent of the {state.computer.name}, their eyes a haze of murk. <br /><br />
                                        </>
                                    ) : state.playerTrait === 'Ilian' ? (
                                        <>
                                        "Nooo, you cannot be Him." Concern marks the {state.computer.name}, for whomever they believe you are, it arrests their confidence in any action. "Yet I am not to thwart naked fate, good day {state.player.name}."<br /><br />
                                        </>
                                    ) : state.playerTrait === 'Fyeran' ? (
                                        <>
                                        Sweet tendrils stretch a creeping smile adorning your face, casting shades of delight for any occasion.<br /><br />
                                        </>
                                    ) : ( '' ) }         
                                </>
                            ) }
                            You persuaded {namedEnemy ? '' : ` the`} {state.computer?.name} to forego hostilities. You may now travel freely through this area.<br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                            </div>
                        : '' }
                    </>
                : gameState.currentIntent === 'provincialWhispers' ?
                    <>
                        { state.player_win || state.enemyPersuaded ? (
                            <>
                                "There's concern in places all over, despite what has been said about steadying tides of war amongst the more civilized. Of where are you inquiring?"<br />
                                <ProvincialWhispersButtons options={regionInformation} handleRegion={handleRegion}  />
                                <div style={{ color: 'gold' }}>
                                    "{regionInformation?.[province]}"
                                </div>
                            </>
                        ) : state.computer_win ? (
                            <>"I guess those whipspers must wait another day."</>
                        ) : ( 
                            <>"What is it you wish to hear? If you can best me I will tell you what I know in earnest."</>
                        ) }
                    </>
                : gameState.currentIntent === 'worldLore' ?
                    <>
                        This has not been written yet<br /><br />
                        This will entail the world lore of the region you inhabit, 
                        the history of the world from the perspective of the enemy in question, 
                        and hopefully grant more insight into the cultural mindset.
                        <br /><br />
                        <Button variant='' className='dialog-buttons inner' onClick={() => engageGrappling()}>Test Se'van Grappling</Button>
                    </>
                : '' }
                </>
            ) : (
                <DialogTree 
                    gameState={gameState} gameDispatch={gameDispatch} state={state} ascean={state.player} enemy={gameState.opponent} dialogNodes={getNodesForNPC(npcIds[state.npcType])} 
                    setKeywordResponses={setKeywordResponses} setPlayerResponses={setPlayerResponses} actions={actions}
                />
            ) }
            { state.npcType !== '' ? (
                <Currency ascean={gameState.player} />
            ) : ( '' ) }
            { gameState?.merchantEquipment.length > 0 ?
                <MerchantTable dispatch={dispatch} table={gameState.merchantEquipment} gameDispatch={gameDispatch} gameState={gameState} ascean={state.player} error={error} setError={setError} />
            : ( '' ) }
            </div>
            { state.npcType === '' ? (
                <div className='story-dialog-options'>
                    <DialogButtons options={gameState.dialog} setIntent={handleIntent} />
                </div>
            ) : ( '' ) }
        </div>
        </>
    );
};