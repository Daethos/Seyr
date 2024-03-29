import { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import * as asceanAPI from '../../utils/asceanApi';
import Button from 'react-bootstrap/Button';
import EnemyDialogNodes from './EnemyDialogNodes.json';
import { GAME_ACTIONS, GameData, Player } from './GameStore';
import { MapData } from './WorldStore';
import { CombatData, shakeScreen } from './CombatStore';
import useGameSounds from './Sounds';
import Typewriter from './Typewriter';
import { DialogNodeOption, DialogNode } from './DialogNode';

function checkRootId(node: DialogNode, id: string) {
    return node.rootId === id;
};

function getNodesForDeity(enemy: string, deityInfo: any): DialogNode[] {
    const nodeRange = `000${deityInfo.behaviors.length}`;
    const matchingNodes: DialogNode[] = [];
    for (const node of EnemyDialogNodes.nodes) {
        if (node.options.length === 0 || !checkRootId(node, nodeRange)) {
            continue;
        };
        const npcOptions = (node.options as any).filter((option: DialogNodeOption) => (option as DialogNodeOption)?.npcIds?.includes(enemy))
        if (npcOptions.length > 0) {
            const updatedNode = { ...node, options: npcOptions };
            matchingNodes.push(updatedNode);
        };
    };
    return matchingNodes;
};

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
    const [showDeity, setShowDeity] = useState<boolean>(true);
    const { playReligion } = useGameSounds(gameState.soundEffectVolume);
   
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
                    if (option.next === '') {
                        setShowDeity(false);
                    } else if (option.next !== '' && !showDeity) {
                        setShowDeity(true);
                    };
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
            shakeScreen(gameState?.shake);
            playReligion();
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
        <div className=''>
                <div className={`my-5 ${showDeity ? 'fade-in' : 'fade-out'}`}>
                    <img src={ascean?.faith === 'adherent' ? '/images/achreo-rising.png' : ascean?.faith === 'devoted' ? '/images/daethos-forming.png' : process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.faith} id={'godBorder-'+ascean.mastery} />
                </div>
            <Typewriter stringText={gameState?.renderedText} styling={{ overflowY: 'auto' }} performAction={handleOptionClick} />
            {gameState?.renderedOptions?.map((option: DialogNodeOption) => (
            <DialogOption key={option.text} option={option} onClick={handleOptionClick} actions={actions} setPlayerResponses={setPlayerResponses} setKeywordResponses={setKeywordResponses} setShowDialogOptions={setShowDialogOptions} showDialogOptions={showDialogOptions} />
            ))}
            <br />
        </div>
    );
};

interface DeityProps {
    ascean: Player;
    mapState: MapData;
    mapDispatch: React.Dispatch<any>;
    gameState: GameData;
    gameDispatch: React.Dispatch<any>;
    state: CombatData;
    dispatch: React.Dispatch<any>;
    loadingDeity: boolean;
  };

const GameplayDeity = ({ ascean, state, dispatch, mapState, mapDispatch, gameState, gameDispatch, loadingDeity }: DeityProps) => {
    const [playerResponses, setPlayerResponses] = useState<string[]>([]);
    const [keywordResponses, setKeywordResponses] = useState<string[]>([]);
    const [dialogNodes, setDialogNodes] = useState<DialogNode[]>([]);
    const deityRef = useRef(null); 
    const [enemy, setEnemy] = useState({
        name: '',
    });
    useEffect(() => {
        setEnemy({
            name: ascean?.statistics.relationships.deity.name === '' ? highestFaith() : ascean?.statistics.relationships.deity.name,
        });
        getDialogNodes();
    }, [ascean]); 

    const actions = {
        giveExp: () => giveExp(),
        resolveDeity: () => resolveDeity(),
    };

    const getDialogNodes = async () => {
        setDialogNodes(getNodesForDeity('Deity', ascean.statistics.relationships.deity));
    };

    const giveExp = async () => {
        const response = await asceanAPI.sacrificeExp(ascean._id);
        gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
        dispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
    };

    const resolveDeity = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.LOADING_DEITY, payload: false });
            const data = {
                asceanID: ascean._id,
                deity: enemy.name,
                entry: {
                title: 'Phenomenon',
                body: playerResponses,
                footnote: '',
                date: Date.now(),
                location: 'Peering into Phenomena',
                coordinates: { x: mapState.currentTile.x, y: mapState.currentTile.y },
                keywords: keywordResponses,
                }
            };
            console.log(data, "Data for Deity Encounter");
            const response = await asceanAPI.evaluateDeity(data);
            console.log(response, "Response from Deity Encounter");
            // gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response.statistics });
            gameDispatch({ type: GAME_ACTIONS.SET_ASCEAN_ATTRIBUTES, payload: response });
            gameDispatch({ type: GAME_ACTIONS.SET_JOURNAL, payload: response.journal });        
        } catch (err: any) {
            console.log(err, "Error Resolving Deity Encounter");
        };
    };
    const highestFaith = () => {
        const influences = [ascean?.weapon_one?.influences?.[0], ascean?.weapon_two?.influences?.[0], ascean?.weapon_three?.influences?.[0], ascean?.amulet?.influences?.[0], ascean?.trinket?.influences?.[0]];
        const faithsCount = influences.reduce((acc: any, faith: any) => {
            if (acc[faith]) acc[faith]++;
            else acc[faith] = 1;
            return acc;
        }, {});
        const faithsArray = Object.entries(faithsCount).filter((faith: any) => faith[0] !== '');
        const highestFaith = faithsArray.reduce((acc: any, faith: any) => {
            if (acc[1] < faith[1]) acc = faith;
            return acc;
        }, faithsArray[0]);
        return highestFaith[0];
    }; 
    return (
        <Overlay target={deityRef} show={loadingDeity}>
        <div className='game-underlay'
            style={{
                display: 'flex',
                alignItems: 'center',
                position: 'fixed',
                top: '17.5%',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                zIndex: 9999,
                border: "0.2em solid purple",
                color: "gold"
        }}>
            { dialogNodes.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', animation: "2s ease-in 0s fade" }}>
                <DialogTree gameState={gameState} gameDispatch={gameDispatch} state={state} ascean={ascean} enemy={enemy} dialogNodes={dialogNodes} actions={actions} setKeywordResponses={setKeywordResponses} setPlayerResponses={setPlayerResponses} />
            </div>
            ) : ( '' ) }
        </div>
      </Overlay>
    );
};

export default GameplayDeity;