import React, { useState, useEffect, useRef } from 'react'
import * as asceanAPI from '../utils/asceanApi';
import * as eqpAPI from '../utils/equipmentApi';
import ToastAlert from '../components/ToastAlert/ToastAlert';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import MerchantTable from '../components/GameCompiler/MerchantTable';
import Inventory from '../components/GameCompiler/Inventory';
import { DialogNode, getNodesForNPC, npcIds, DialogNodeOption } from '../components/GameCompiler/DialogNode';
import Currency from '../components/GameCompiler/Currency';
import { ACTIONS, CombatData } from '../components/GameCompiler/CombatStore';
import { GAME_ACTIONS, GameData, Player } from '../components/GameCompiler/GameStore';
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

interface StoryDialogProps {
    state: CombatData;
    dispatch: React.Dispatch<any>;
    gameState: GameData;
    gameDispatch: React.Dispatch<any>;
    deleteEquipment: (equipment: any[]) => Promise<void>;
};

export const StoryDialog = ({ state, dispatch, gameState, gameDispatch, deleteEquipment }: StoryDialogProps) => {
    const [error, setError] = useState<any>({ title: '', content: '' });
    const targetRef = useRef(null);
    const [upgradeItems, setUpgradeItems] = useState<any | null>(null);
    const [playerResponses, setPlayerResponses] = useState<string[]>([]);
    const [keywordResponses, setKeywordResponses] = useState<string[]>([]);
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

    const engageCombat = async () => {
        await checkingLoot();
        dispatch({ type: ACTIONS.SET_DUEL, payload: '' });
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
        <div className='story-dialog' style={dialogStyle}>
            <img src={dialogWindow} alt='Dialog Window' style={{ transform: "scale(1.1)" }} />
            <div className='story-text'> 
            { state.npcType === 'Merchant-Smith' ? (
                <>
                    <br />
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
            <DialogTree 
                gameState={gameState} gameDispatch={gameDispatch} state={state} ascean={state.player} enemy={gameState.opponent} dialogNodes={getNodesForNPC(npcIds[state.npcType])} 
                setKeywordResponses={setKeywordResponses} setPlayerResponses={setPlayerResponses} actions={actions}
            />
            <Currency ascean={gameState.player} />
            { gameState?.merchantEquipment.length > 0 ?
                <MerchantTable dispatch={dispatch} table={gameState.merchantEquipment} gameDispatch={gameDispatch} gameState={gameState} ascean={state.player} error={error} setError={setError} />
            : ( '' ) }
            </div>
            {/* <div className='dialog-options'>
                <DialogButtons options={gameState.dialog} setIntent={handleIntent} />
            </div> */}
        </div>
    );
};