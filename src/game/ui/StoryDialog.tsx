import React, { useState, useEffect } from 'react'
import * as eqpAPI from '../../utils/equipmentApi';
import ToastAlert from '../../components/ToastAlert/ToastAlert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MerchantTable from '../../components/GameCompiler/MerchantTable';
import Inventory from '../../components/GameCompiler/Inventory';
import { DialogNode, getNodesForNPC, npcIds, DialogNodeOption, getNodesForEnemy } from '../../components/GameCompiler/DialogNode';
import Currency from '../../components/GameCompiler/Currency';
import { CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import { GameData, Player, nameCheck } from '../../components/GameCompiler/GameStore';
import Typewriter from '../../components/GameCompiler/Typewriter';
import dialogWindow from '../images/dialog_window.png';
import EventEmitter from '../phaser/EventEmitter';
import { useDispatch, useSelector } from 'react-redux';
import { getReplenishFirewaterFetch, setCurrentDialogNode, setCurrentIntent, setMerchantEquipment, setRendering, setShowDialog } from '../reducers/gameState';
import { getLuckoutFetch, getPersuasionFetch, setPhaserAggression } from '../reducers/combatState';
import { ProvincialWhispersButtons, Region, regionInformation } from '../../components/GameCompiler/Regions';
import { LuckoutModal, PersuasionModal, checkTraits, traitStyle } from '../../components/GameCompiler/PlayerTraits';

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
    dispatch: React.Dispatch<any>;
    actions: any;
    setPlayerResponses: React.Dispatch<React.SetStateAction<string[]>>;
    setKeywordResponses: React.Dispatch<React.SetStateAction<string[]>>;
};

const DialogTree = ({ ascean, enemy, dialogNodes, gameState, state, actions, setPlayerResponses, setKeywordResponses, dispatch }: DialogTreeProps) => {
    const [currentNodeIndex, setCurrentNodeIndex] = useState(gameState?.currentNodeIndex || 0);
    const [showDialogOptions, setShowDialogOptions] = useState(false);

    useEffect(() => {
        console.log("Current Node Index: ", gameState?.currentNodeIndex, dialogNodes, "Current Node: ", gameState?.currentNode);
        setCurrentNodeIndex(gameState?.currentNodeIndex || 0);
    }, [gameState?.currentNodeIndex]);
    
    useEffect(() => {
        dispatch(setCurrentDialogNode(dialogNodes?.[currentNodeIndex]));
        dispatch(setRendering({ options: dialogNodes?.[currentNodeIndex]?.options, text: dialogNodes?.[currentNodeIndex]?.text }));
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
            dispatch(setRendering({ text: newText, options: newOptions }));
            console.log("New Text: ", newText, "New Options: ", newOptions);
        };
    }, [gameState.currentNode]);

    const getOptionKey = (ascean: Player, state: any, key: string) => {
        const newKey = key === 'mastery' ? ascean[key].toLowerCase() : key;
        return ascean[newKey] !== undefined ? ascean[newKey] : state[newKey];
    };
  
    const handleOptionClick = (nextNodeId: string | null) => {
        if (nextNodeId === null) {
            dispatch(setCurrentNodeIndex(0));
        } else {
            let nextNodeIndex = dialogNodes.findIndex((node: { id: string; }) => node.id === nextNodeId);
            if (nextNodeIndex === -1) nextNodeIndex = 0;
            dispatch(setCurrentNodeIndex(nextNodeIndex));
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
    const filteredOptions = Object.keys(options);
    const buttons = filteredOptions.map((o: any, i: number) => {
        switch (o) {
            case 'localLore':
                o = 'Local Lore';
                break;
            case 'provincialWhispers':
                o = 'Provincial Whispers';
                break;
            case 'worldLore':
                o = 'World Lore';
                break;
            case 'localWhispers':
                o = 'Local Whispers';
                break;
            default:
                break;
        };
        return (
            <div key={i}>
                <Button variant='' className='dialog-buttons' onClick={() => setIntent(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }}>{o}</Button>
            </div>
        );
    });
    return <>{buttons}</>;
};

interface StoryDialogProps {
    deleteEquipment: (equipment: any[]) => Promise<void>;
    handlePlayerLuckout: () => Promise<void>;
    state: CombatData;
};

export const StoryDialog = ({ deleteEquipment, handlePlayerLuckout, state }: StoryDialogProps) => {
    const dispatch = useDispatch();
    const gameState = useSelector((state: any) => state.game);
    const influence = useSelector((state: any) => state.combat.weapons[0].influences[0]);
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [persuasionString, setPersuasionString] = useState<string>('');
    const [luckoutString, setLuckoutString] = useState<string>('');
    const [upgradeItems, setUpgradeItems] = useState<any | null>(null);
    const [namedEnemy, setNamedEnemy] = useState<boolean>(false);
    const [playerResponses, setPlayerResponses] = useState<string[]>([]);
    const [keywordResponses, setKeywordResponses] = useState<string[]>([]);

    const [province, setProvince] = useState<keyof typeof regionInformation>('Astralands');
    const [luckoutModalShow, setLuckoutModalShow] = useState<boolean>(false);
    const [persuasionModalShow, setPersuasionModalShow] = useState<boolean>(false);
    const [luckout, setLuckout] = useState<boolean>(false);
    const [luckoutTraits, setLuckoutTraits] = useState<any>([]);
    const [persuasion, setPersuasion] = useState<boolean>(false);
    const [persuasionTraits, setPersuasionTraits] = useState<any>([]);
    const [miniGame, setMiniGame] = useState<boolean>(false);
    const [miniGameTraits, setMiniGameTraits] = useState<any>([]);
    const [enemyArticle, setEnemyArticle] = useState<any>('');

    useEffect(() => { 
        checkLuckout();
        checkPersuasion();
        // checkMiniGame();
        setNamedEnemy(nameCheck(state?.computer?.name));
        setEnemyArticle(() => {
            return ['a', 'e', 'i', 'o', 'u'].includes(state?.computer?.name.charAt(0).toLowerCase()) ? 'an' : 'a';
        });
    }, [state?.computer]);

    const hollowClick = () => console.log('Hollow Click');

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
        console.log(persuasionTrait, playerPersuasion, enemyPersuasion, "Persuasion");
        if (playerPersuasion >= enemyPersuasion) {
            dispatch(getPersuasionFetch({ persuasion, id: state.player._id, persuaded: true }));
            const num = Math.floor(Math.random() * 2); 
            setPersuasionString(`${persuasionTrait?.persuasion.success[num].replace('{enemy.name}', state.computer.name).replace('{ascean.weapon_one.influences[0]}', influence).replace('{ascean.name}', state.player.name).replace('{enemy.weapon_one.influences[0]}', state.computer.weapon_one.influences[0]).replace('{enemy.faith}', state.computer.faith)}`);
        } else {
            await checkingLoot();
            dispatch(getPersuasionFetch({ persuasion, id: state.player._id, persuaded: false }));
            setPersuasionString(`Failure. ${persuasionTrait?.persuasion?.failure.replace('{enemy.name}', state.computer.name).replace('{ascean.weapon_one.influences[0]}', influence).replace('{ascean.name}', state.player.name).replace('{enemy.weapon_one.influences[0]}', state.computer.weapon_one.influences[0]).replace('{enemy.faith}', state.computer.faith)} \n\n Nevertheless, prepare for some chincanery, ${state.player.name}, and perhaps leave the pleasantries for warmer company.`);
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
            dispatch(getLuckoutFetch({ luck, id: state.player._id, luckedOut: true }));
            const num = Math.floor(Math.random() * 2);
            setLuckoutString(`${luckoutTrait?.luckout?.success[num].replace('{enemy.name}', enemy.name).replace('{ascean.weapon_one.influences[0]}', influence).replace('{ascean.name}', ascean.name).replace('{enemy.weapon_one.influences[0]}', enemy.weapon_one.influences[0]).replace('{enemy.faith}', enemy.faith)}`);
            await handlePlayerLuckout();
            shakeScreen({ duration: 1000, intensity: 1.5 });
            if ('vibrate' in navigator) navigator.vibrate(1000);
        } else {
            dispatch(getLuckoutFetch({ luck, id: state.player._id, luckedOut: false }));
            await checkingLoot();
            setLuckoutString(`${luckoutTrait?.luckout?.failure.replace('{enemy.name}', enemy.name).replace('{ascean.weapon_one.influences[0]}', influence).replace('{ascean.name}', ascean.name).replace('{enemy.weapon_one.influences[0]}', enemy.weapon_one.influences[0]).replace('{enemy.faith}', enemy.faith)} \n\n Prepare for combat, ${ascean.name}, and may your weapon strike surer than your words.`);
        };
    };

    const checkLuckout = async () => {
        const traits = {
            primary: gameState?.traits?.primary,
            secondary: gameState?.traits?.secondary,
            tertiary: gameState?.traits?.tertiary,
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
        // dispatch TODO:FIXME: getGrapplingFetch({ id: state.player._id, grappling: true });
    }; 

    const checkPersuasion = async () => {
        const traits = {
            primary: gameState?.traits?.primary,
            secondary: gameState?.traits?.secondary,
            tertiary: gameState?.traits?.tertiary,
        };
        const pTraits = ['Ilian', 'Lilosian', 'Arbituous', "Kyr'naic", 'Chiomic', 'Fyeran', 'Shaorahi', 'Tashaeral'];
        const mTraits = Object.values(traits).filter(trait => pTraits.includes(trait.name));
        if (mTraits.length === 0) {
            setPersuasion(false);
            return;
        };
        setPersuasion(true);
        setPersuasionTraits(mTraits);
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
        const groups: Record<string, any[]> = {};
        inventory.forEach(item => {
            const key = `${item?.name}-${item?.rarity}`;
            groups[key] = groups[key] || [];
            groups[key].push(item);
        });
        const matches = [];
        for (const key in groups) {
            if (groups.hasOwnProperty(key)) {
                const items = groups[key];
                if (items.length >= 3) { 
                    matches.push(items[0]);
                };
            };
        };
        return matches.length > 0 ? matches : null;
    };

    const checkingLoot = async (): Promise<void> => {
        if (gameState.merchantEquipment.length > 0) {
            await deleteEquipment(gameState.merchantEquipment);
            dispatch(setMerchantEquipment([]));
        };
    };

    const handleIntent = (intent: string): void => {
        let clean: string = '';
        switch (intent) {
            case 'Local Lore':
                clean = 'localLore';
                break;
            case 'Provincial Whispers':
                clean = 'provincialWhispers';
                break;
            case 'World Lore':
                clean = 'worldLore ';
                break;
            case 'Local Whispers':
                clean = 'localWhispers';
                break;
            default:
                clean = intent;
                break;
        };
        dispatch(setCurrentIntent(clean));
    };
    const handleRegion = (region: keyof Region): void => setProvince(region);

    const engageCombat = async (): Promise<void> => {
        await checkingLoot();
        console.log("engageCombat in StoryDialog.tsx");
        dispatch(setPhaserAggression(true));
        EventEmitter.emit('aggressive-enemy', { id: state.enemyID, isAggressive: true });
        dispatch(setShowDialog(false));
    };

    const clearDuel = async () => dispatch(setShowDialog(false));
    const refillFlask = async () => dispatch(getReplenishFirewaterFetch(state.player._id));

    const getLoot = async (type: string) => {
        if (gameState?.merchantEquipment.length > 0) await deleteEquipment(gameState?.merchantEquipment);
        try {
            let res: any;
            if (type === 'physical-weapon') {
                res = await eqpAPI.getPhysicalWeaponEquipment(state.player.level);
            } else if (type === 'magical-weapon') {
                res = await eqpAPI.getMagicalWeaponEquipment(state.player.level);
            } else if (type === 'armor') {
                res = await eqpAPI.getArmorEquipment(state.player.level);
            } else if (type === 'jewelry') {
                res = await eqpAPI.getJewelryEquipment(state.player.level);
            } else if (type === 'general') {
                res = await eqpAPI.getMerchantEquipment(state.player.level);
            } else if (type === 'cloth') {
                res = await eqpAPI.getClothEquipment(state.player.level);
            };
            console.log(res.data, 'Res!');
            dispatch(setMerchantEquipment(res.data));
        } catch (err) {
            console.log(err, 'Error Getting Loot!');
        };
    };

    const capitalize = (word: string) => word === 'a' ? word?.charAt(0).toUpperCase() : word?.charAt(0).toUpperCase() + word?.slice(1);

    return (
        <>
        <Modal show={luckoutModalShow} onHide={() => setLuckoutModalShow(false)} centered id='modal-weapon' style={{ zIndex: 9999, top: '-25%' }}>
            <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>Hush and Tendril</Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                These offer a unique opportunity to defeat your enemies without the need for combat. However, failure will result in hostile and immediate engagement.<br /><br />
                <div style={{ fontSize: "18px", color: "gold" }}>
                {luckoutTraits.map((trait: any, index: number) => {
                    return (
                        <div key={index}>
                            <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name), fontSize: "18px" }} onClick={() => attemptLuckout(trait.name)}>[{trait.name}] - {trait.luckout.modal.replace('{enemy.name}', state?.computer?.name).replace('{ascean.weapon_one.influences[0]}', influence)}</Button>
                        </div>
                    )
                })}
                </div>
                [Note: Your decisions has granted this avenue of gameplay experience. There are more to discover.]<br /><br />
            </Modal.Body>
        </Modal>
        <Modal show={persuasionModalShow} onHide={() => setPersuasionModalShow(false)} centered id='modal-weapon' style={{ zIndex: 9999, top: '-25%' }}>
            <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: "20px", color: "gold" }}>Correspondence</Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
                These offer a unique opportunity to entreat with your enemies without the need for combat. 
                However, failure may result anywhere from stymied conversation to hostile engagement. Perhaps with more notoriety this can change.<br /><br />
                <div style={{ fontSize: "18px", color: "gold" }}>
                {persuasionTraits.map((trait: any, index: number) => {
                    return (
                        <div key={index}>
                            <Button variant='' className='dialog-buttons inner' style={{ color: traitStyle(trait.name), fontSize: "18px" }} onClick={() => attemptPersuasion(trait.name)}>[{trait.name}]: {trait.persuasion.modal.replace('{enemy.name}', state?.computer?.name).replace('{ascean.weapon_one.influences[0]}', influence)}</Button>
                        </div>
                    )
                })}
                </div>
                [Note: Your decisions has granted this avenue of gameplay experience. There are more to discover.]<br /><br />
            </Modal.Body>
        </Modal>
        <div className='story-dialog'>
            <img src={dialogWindow} alt='Dialog Window' style={{ transform: "scale(1.1)" }} />
            <div className='story-text' style={{ width: state.isEnemy ? '62%' : '' }}> 
            <ToastAlert error={error} setError={setError} />
            <div style={{ color: 'gold', fontSize: '18px', marginBottom: "5%" }}>
                <div style={{ display: 'inline' }}>
                    <img src={process.env.PUBLIC_URL + `/images/` + state?.computer?.origin + '-' + state?.computer?.sex + '.jpg'} alt={state?.computer?.name} style={{ width: '15%' }} className='dialog-picture' />
                    {' '}<div style={{ display: 'inline' }}>{state?.computer?.name} <p style={{ display: 'inline', fontSize: '12px' }}>[Level {state?.computer?.level}] {!state?.computer?.alive ? '[Deceased]' : ''}</p><br /></div>
                </div>
            </div>
            { state.npcType === 'Merchant-Smith' ? (
                <>
                    <Typewriter stringText={`"You've come for forging? I only handle chiomic quality and above. Check my rates and hand me anything you think worth's it. Elsewise I trade with the Armorer if you want to find what I've made already."
                        <br /><br /> ^500
                        Hanging on the wall is a list of prices for the various items you can forge. The prices are based on the quality. <br /><br />
                        <p className='greenMarkup'>Kyn'gian: 1g</p> |  
                        <p className='blueMarkup'>Senic: 3g</p> | 
                        <p className='purpleMarkup'>Kyris: 12g</p> |  
                        <p className='darkorangeMarkup'>Sedyrus: 60g</p>
                        <br /><br />`} 
                    styling={{ overflow: 'auto' }} performAction={hollowClick} />
                    <Currency ascean={gameState.player} />
                    { upgradeItems ? (
                        upgradeItems.map((item: any, index: number) => {
                            return (
                                <div key={index} style={{ display: 'inline-block', marginRight: '5%', marginBottom: '10%' }}>
                                    <Inventory inventory={item} bag={gameState.player.inventory} ascean={state.player} blacksmith={true} index={index} />
                                </div>
                            )
                        })
                    ) : ( '' ) }
                    <br />
                </>
            ) : state.npcType === 'Merchant-Alchemy' ? (
                <> 
                    { gameState.player?.firewater?.charges === 5 ? (
                        <Typewriter stringText={`The Alchemist sways in a slight tune to the swish of your flask as he turns to you. <br /><br /> ^500 "If you're needing potions of amusement and might I'm setting up craft now. Seems you're set for now, come back when you're needing more."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                    ) : (
                        <>
                            <Typewriter stringText={`The Alchemist's eyes scatter about your presence, eyeing ${gameState.player?.firewater?.charges} swigs left of your Fyervas Firewater before tapping on on a pipe, its sound wrapping round and through the room to its end, a quaint, little spigot with a grated catch on the floor.<br /><br /> ^500 "If you're needing potions of amusement and might I'm setting up craft now. Fill up your flask meanwhile, 10s a fifth what you say? I'll need you alive for patronage."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            <br />
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'blueviolet' }} onClick={refillFlask}>Walk over and refill your firewater?</Button>
                        </>
                    ) }
                </>
            ) : ( '' ) }
            { state.isEnemy ? (
                <>
                    <DialogTree 
                        gameState={gameState} state={state} ascean={state.player} enemy={state.computer} dialogNodes={getNodesForEnemy(state?.computer?.name)} 
                        setKeywordResponses={setKeywordResponses} setPlayerResponses={setPlayerResponses} actions={actions} dispatch={dispatch}
                    />
                { gameState.currentIntent === 'challenge' ? (
                    <>
                    { state.persuasionScenario ? (
                        <div style={{ color: "gold" }}>
                            <Typewriter stringText={persuasionString} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            <br />
                            { state.enemyPersuaded ? (
                                <>
                                    <p style={{ color: '#fdf6d8' }}>
                                    You persuaded {namedEnemy ? '' : ` the`} {state?.computer?.name} to forego hostilities. You may now travel freely through this area.
                                    </p>
                                    <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                                </>
                            ) : ( '' ) }
                        </div>
                    ) : state.luckoutScenario ? (
                        <div style={{ color: "gold" }}>
                            <Typewriter stringText={luckoutString} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            <br />
                            { state.player_luckout ? (
                                <>
                                    <p style={{ color: '#fdf6d8' }}>
                                    You lucked out against {namedEnemy ? '' : ` the`} {state.computer?.name} to forego hostilities. You may now travel freely through this area.
                                    </p>
                                    <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                                </>
                            ) : ( '' ) }    
                        </div>   
                    ) : state.player_win ? (
                        <div>
                            { namedEnemy ? (
                                <Typewriter stringText={`"Congratulations ${state.player.name}, you were fated this win. This is all I have to offer, if it pleases you."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            ) : ( 
                                <Typewriter stringText={`"Appears I were wrong to treat with you in such a way, ${state.player.name}. Take this if it suits you, I've no need."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            ) } 
                        </div> 
                    ) : state.computer_win ? (
                        <div>
                            { namedEnemy ? (
                                <Typewriter stringText={`"${state.player.name}, surely this was a jest? Come now, you disrespect me with such play. What was it that possessed you to even attempt this failure?"`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            ) : ( 
                                <Typewriter stringText={`"The ${state.computer.name} are not to be trifled with."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            ) } 
                        </div> 
                    ) : (
                        <div>
                            { namedEnemy ? ( 
                                <>
                                    <Typewriter stringText={`"Greetings traveler, I am ${state?.computer?.name}. ${state.player.name}, is it? You seem a bit dazed, can I be of some help?"`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                    <br />
                                    <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={engageCombat}>Forego pleasantries and surprise attack {state?.computer?.name}?</Button>
                                </> 
                            ) : ( 
                                <>
                                    <Typewriter stringText={`${capitalize(enemyArticle)} ${state?.computer?.name} stares at you, unflinching. Eyes lightly trace about you, reacting to your movements in wait. Grip your ${state.weapons[0].name} and get into position?`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                    <br />
                                    <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={engageCombat}>Engage in hostilities with {state?.computer?.name}?</Button>
                                </> 
                            ) }
                            { luckout ? ( 
                                <LuckoutModal traits={luckoutTraits} callback={attemptLuckout} name={state.computer.name} influence={influence} /> 
                            ) : ('') }
                            { miniGame ? (
                                miniGameTraits.map((trait: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            {trait.name === "Se'van" ? (
                                                <Button variant='' className='dialog-buttons inner' onClick={() => engageGrappling()}>[Testing] Surprise {state?.computer?.name} and initiate Se'van Grappling</Button>
                                            ) : trait.name === "Cambiren" ? (
                                                <Button variant='' className='dialog-buttons inner' >[WIP] Cambiren Combat</Button>
                                            ) : trait.name === "Tshaeral" ? (
                                                <Button variant='' className='dialog-buttons inner' >[WIP] Tshaeral Combat</Button>
                                            ) : trait.name === "Shrygeian" ? (
                                                <Button variant='' className='dialog-buttons inner' >[WIP] Shrygeian Combat</Button>
                                            ) : ('')}
                                        </div>
                                    )
                                })
                            ) : ('') }
                        </div>
                    ) } 
                    </>
                ) : gameState.currentIntent === 'conditions' ? (
                    <Typewriter stringText={"This portion has not yet been written. Here you will be able to evaluate the conditions you have with said individual; disposition and the like."} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                ) : gameState.currentIntent === 'farewell' ? (
                    <>
                        { state.persuasionScenario ? (
                            <div style={{ color: "gold" }}>
                                <Typewriter stringText={persuasionString} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                <br />
                                { state.enemyPersuaded ? (
                                    <>
                                        <p style={{ color: '#fdf6d8' }}>
                                        You persuaded {namedEnemy ? '' : ` the`} {state?.computer?.name} to forego hostilities. You may now travel freely through this area.
                                        </p>
                                        <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                                    </>
                                ) : ( '' ) }
                            </div>
                        ) : state.luckoutScenario ? (
                            <div style={{ color: "gold" }}>
                                <Typewriter stringText={luckoutString} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                <br />
                                { state.player_luckout ? (
                                    <>
                                        <p style={{ color: '#fdf6d8' }}>
                                        You lucked out against {namedEnemy ? '' : ` the`} {state?.computer?.name} to forego hostilities. You may now travel freely through this area.
                                        </p>
                                        <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                                    </>
                                ) : ( '' ) }    
                            </div>   
                        ) : state.player_win ? (
                            <>
                                { namedEnemy ? (
                                    <Typewriter stringText={`"${state.player.name}, you are truly unique in someone's design. Before you travel further, if you wish to have it, its yours."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                ) : ( 
                                    <Typewriter stringText={`"Go now, ${state.player.name}, take what you will and find those better pastures."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                ) }
                                <br />
                                <Button variant='' className='dialog-buttons inner' onClick={() => clearDuel()}>Seek those pastures and leave your lesser to their pitious nature.</Button>
                            </>
                        ) : state.computer_win ? (
                            <>
                                <Typewriter stringText={`"If you weren't entertaining in defeat I'd have a mind to simply snuff you out here and now. Seek refuge, ${state.player.name}, your frailty wears on my caer."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Feign scamperping away to hide your shame and wounds. There's always another chance, perhaps.</Button>
                            </>
                        ) : (
                            <>
                            { namedEnemy ? ( 
                                <Typewriter stringText={`"I hope you find what you seek, ${state.player.name}. Take care in these parts, you may never know when someone wishes to approach out of malice and nothing more. Strange denizens these times."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            ) : ( 
                                <Typewriter stringText={`The ${state?.computer?.name}'s mild flicker of thought betrays their stance, lighter and relaxed.`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                            ) }
                                <br />
                                <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Keep moving.</Button>
                            </>
                        ) }
                        { checkTraits("Kyn'gian", gameState.traits) && !state.player_win && !state.computer_win ? (
                            <Button variant='' className='dialog-buttons inner' onClick={() => clearDuel()}>You remain at the edges of sight and sound, and before {state?.computer?.name} can react, you attempt to flee.</Button>
                        ) : ( '' ) }
                    </>
                ) : gameState.currentIntent === 'localLore' ? (
                    <Typewriter stringText={`This will entail the local lore of the region you inhabit, and the history of the area from the perspective of the enemy in question, and hopefully grant more insight into the world.`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                ) : gameState.currentIntent === 'localWhispers' ? (
                    <Typewriter stringText={`Local Whispers will provide localized intrigue to the region you're inhabiting and the actual details of the map itself.`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                ) : gameState.currentIntent === 'persuasion' ? (
                    <>
                        { state.player_win ? (
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path, perhaps words will work next time.</Button>
                        ) : state.computer_win ? (
                            <Button variant='' className='dialog-buttons inner' style={{ color: 'red' }} onClick={() => clearDuel()}>Continue moving along your path, there's nothing left to say now.</Button>
                        ) : persuasion && !state.persuasionScenario ? ( 
                            <PersuasionModal traits={persuasionTraits} callback={attemptPersuasion} name={state.computer.name} influence={influence} /> 
                        ) : ('') }
                        { state.persuasionScenario ? (
                            <div style={{ color: "gold" }}>
                                <Typewriter stringText={persuasionString} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                <br />
                                { state.enemyPersuaded ? (
                                    <>
                                        <p style={{ color: '#fdf6d8' }}>
                                        You persuaded {namedEnemy ? '' : ` the`} {state?.computer?.name} to forego hostilities. You may now travel freely through this area.
                                        </p>
                                        <Button variant='' className='dialog-buttons inner' style={{ color: 'teal' }} onClick={() => clearDuel()}>Continue moving along your path.</Button>
                                    </>
                                ) : ( '' ) }
                            </div>
                        ) : ( '' ) }
                    </>
                ) : gameState.currentIntent === 'provincialWhispers' ? (
                    <>
                        { state.player_win || state.enemyPersuaded ? (
                            <>
                                <Typewriter stringText={`"There's concern in places all over, despite what has been said about steadying tides of war amongst the more civilized. Of where are you inquiring?"`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                <br />
                                <div style={{ color: 'gold' }}>
                                    <Typewriter stringText={regionInformation?.[province]} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                                </div><br />
                                <ProvincialWhispersButtons options={regionInformation} handleRegion={handleRegion}  />
                            </>
                        ) : state.computer_win ? (
                            <Typewriter stringText={`"I guess those whipspers must wait another day."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                        ) : ( 
                            <Typewriter stringText={`"What is it you wish to hear? If you can best me I will tell you what I know in earnest."`} styling={{ overflow: 'auto' }} performAction={hollowClick} />                            
                        ) }
                    </>
                ) : gameState.currentIntent === 'worldLore' ? (
                        <Typewriter stringText={"This will entail the world lore of the region you inhabit, the history of the world from the perspective of the enemy in question, and hopefully grant more insight into the cultural mindset."} styling={{ overflow: 'auto' }} performAction={hollowClick} />
                ) : ( '' ) }
                </>
            ) : state.npcType !== 'Merchant-Alchemy' && state.npcType !== 'Merchant-Smith' ? (
                <DialogTree 
                    gameState={gameState} state={state} ascean={state.player} enemy={state.computer} dialogNodes={getNodesForNPC(npcIds[state.npcType])} 
                    setKeywordResponses={setKeywordResponses} setPlayerResponses={setPlayerResponses} actions={actions} dispatch={dispatch}
                />
            ) : ( '' ) } 
            { gameState?.merchantEquipment.length > 0 ? (
                <MerchantTable dispatch={dispatch} table={gameState.merchantEquipment} gameState={gameState} ascean={state.player} error={error} setError={setError} />
            ) : ( '' ) }
            { state.npcType !== '' ? (
                <Currency ascean={gameState.player} />
            ) : ( '' ) }
            </div>
            { state.isEnemy ? (
                <div className='story-dialog-options'>
                    <DialogButtons options={gameState.dialog} setIntent={handleIntent} />
                </div>
            ) : ( '' ) }
        </div>
        </>
    );
};