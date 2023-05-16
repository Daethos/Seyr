import { useEffect, useState, useReducer, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GameSolo.css';
import * as asceanAPI from '../../utils/asceanApi';  
import * as eqpAPI from '../../utils/equipmentApi';
import * as gameAPI from '../../utils/gameApi'
import * as mapAPI from '../../utils/mapApi';
import * as settingsAPI from '../../utils/settingsApi';
import userService from "../../utils/userService";
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import GameAscean from '../../components/GameCompiler/GameAscean';
import GameActions from '../../components/GameCompiler/GameActions';
import GameAnimations from '../../components/GameCompiler/GameAnimations';
import GameConditions from '../../components/GameCompiler/GameConditions';
import LevelUpModal from '../../game/LevelUpModal';
import { getNpcDialog, getMerchantDialog } from '../../components/GameCompiler/Dialog';
import DialogBox from '../../game/DialogBox';
import Button from 'react-bootstrap/Button';
import InventoryBag from '../../components/GameCompiler/InventoryBag';
import { GAME_ACTIONS, GameStore, initialGameData, Enemy, Player, NPC, getAsceanTraits, checkPlayerTrait } from '../../components/GameCompiler/GameStore';
import { ACTIONS, CombatStore, initialCombatData, CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import { MAP_ACTIONS, MapStore, initialMapData, DIRECTIONS, MapData, debounce, getAsceanCoords, getAsceanGroupCoords } from '../../components/GameCompiler/WorldStore';
import Settings from '../../components/GameCompiler/Settings';
import Joystick from '../../components/GameCompiler/Joystick';
import GameplayEventModal from '../../components/GameCompiler/GameplayEventModal';
import GameplayOverlay from '../../components/GameCompiler/GameplayOverlay';
import CityBox from '../../components/GameCompiler/CityBox';
import StoryBox from '../../components/GameCompiler/StoryBox';
import CombatOverlay from '../../components/GameCompiler/CombatOverlay';
import GameMap from '../../components/GameCompiler/GameMap';
import { Bear, Wolf } from '../../components/GameCompiler/Animals';
import { Merchant } from '../../components/GameCompiler/NPCs';
import Journal from '../../components/GameCompiler/Journal';
import useGameSounds from '../../components/GameCompiler/Sounds';
import GameplayUnderlay from '../../components/GameCompiler/GameplayUnderlay';
import Tutorial from '../../components/GameCompiler/Tutorial';
import { User } from '../App/App';
import GameplayDeity from '../../components/GameCompiler/GameplayDeity';

export enum MapMode {
    FULL_MAP,
    QUADRANT,
    SURROUNDING_TILES,
    TIGHT,
};

interface GameProps {
    user: User;
};

const GameSolo = ({ user }: GameProps) => {
    const { asceanID } = useParams();
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [mapState, mapDispatch] = useReducer(MapStore, initialMapData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    type Direction = keyof typeof DIRECTIONS;
    const navigate = useNavigate();
    const { playOpponent, playWO, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReplay, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9, playMerchant, playDungeon, playPhenomena, playTreasure, playActionButton, playCombatRound } = useGameSounds(gameState.soundEffectVolume);
    const [background, setBackground] = useState<any | null>({ background: '' });
    const [emergencyText, setEmergencyText] = useState<any[]>([]);
    const [moveTimer, setMoveTimer] = useState<number>(gameState.moveTimer);
    const [moveTimerDisplay, setMoveTimerDisplay] = useState<number>(moveTimer);
    const [timeLeft, setTimeLeft] = useState<number>(gameState.timeLeft);
    const [tutorialContent, setTutorialContent] = useState<any | null>(null);
    const [asceanState, setAsceanState] = useState({
        ascean: gameState.player,
        currentHealth: 0,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        level: gameState.player.level,
        opponent: 0,
        opponentExp: 0,
        experience: gameState.player.experience,
        experienceNeeded: gameState.player.level * 1000,
        mastery: gameState.player.mastery,
        faith: gameState.player.faith,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gameStateResponse, combatStateResponse, mapStateResponse, gameSettingResponse] = await Promise.all([
                    asceanAPI.getOneAscean(asceanID),
                    asceanAPI.getAsceanStats(asceanID),
                    mapAPI.getMap(asceanID),
                    settingsAPI.getSettings(),
                ]);
                console.log(gameStateResponse, "Game State Response")
                const traitResponse = await getAsceanTraits(gameStateResponse.data);
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: gameStateResponse.data });
                dispatch({
                    type: ACTIONS.SET_PLAYER,
                    payload: combatStateResponse.data.data
                });
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_TRAITS, payload: traitResponse });
                setAsceanState({
                    ...asceanState,
                    'ascean': combatStateResponse.data.data.ascean,
                    'currentHealth': combatStateResponse.data.data.ascean.health.current === -10 ? combatStateResponse.data.data.attributes.healthTotal : combatStateResponse.data.data.ascean.health.current,
                    'level': combatStateResponse.data.data.ascean.level,
                    'opponent': 0,
                    'experience': 0,
                    'experienceNeeded': combatStateResponse.data.data.ascean.level * 1000,
                    'mastery': combatStateResponse.data.data.ascean.mastery,
                    'faith': combatStateResponse.data.data.ascean.faith,
                });
                gameDispatch({ type: GAME_ACTIONS.SET_GAME_SETTINGS, payload: gameSettingResponse });
                if (gameStateResponse.data.tutorial.firstBoot === true) {
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                }; // Extra Code Temporary
                if (mapStateResponse) {
                    await loadMap(gameStateResponse.data, mapStateResponse);
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.SET_UNDERLAY_CONTENT, payload: `${gameStateResponse.data.name}, welcome back! I wish you all the luck in your journey. \n\n You are currently level ${gameStateResponse.data.level} with ${gameStateResponse.data.experience} / ${gameStateResponse.data.level * 1000} experience. \n\n Your current wealth stands: ${gameStateResponse.data.currency.gold}g, ${gameStateResponse.data.currency.silver}s. \n\n The cohesion of your identity is that you are ${traitResponse.primary.name}, ${traitResponse.secondary.name}, and ${traitResponse.tertiary.name}; ${gameStateResponse.data.faith} to ${gameStateResponse.data.weapon_one.influences[0]}.` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_UNDERLAY, payload: true });
                    }, 3000);
                };
                gameDispatch({ type: GAME_ACTIONS.LOADING, payload: false });
            } catch (err: any) {
                console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
            };
        };
        fetchData();
    }, [asceanID]);


    useEffect(() => {
        if (!moveTimerDisplay) return;
        const intervalId = setInterval(() => {
            setMoveTimer((moveTimer) => moveTimer - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [moveTimerDisplay]);

    useEffect(() => {
        setMoveTimerDisplay(moveTimer);
    }, [moveTimer]);

    const useMoveTimerEffect = (mapState: MapData) => {
        useEffect(() => {
            if (moveTimer !== 0 || moveTimer === gameState.moveTimer) return;
            if (mapState.currentTile.content === 'enemy' || gameState?.opponent) return; 
            const timer = setTimeout(() => {
                if (moveTimer === 0 && mapState?.steps > 0) {
                    mapDispatch({ type: MAP_ACTIONS.SET_MOVE_CONTENT, payload: mapState });
                    setMoveTimer(gameState.moveTimer);
                };
            }, moveTimer);
            return () => clearTimeout(timer);
        }, [moveTimer, mapState]);
    };
    useMoveTimerEffect(mapState);

    const useMoveContentEffect = (mapState: MapData) => {
        useEffect(() => {
            if (mapState.currentTile.content !== 'nothing' && mapState?.lastTile) {
                handleTileContent(mapState.currentTile.content, mapState.lastTile.content);
            };
        }, [mapState.currentTile, mapState.currentTile.content]);
    };
    useMoveContentEffect(mapState);

    const usePlayerMovementEffect = (mapState: MapData, mapDispatch: (arg0: { type: string; payload: string | boolean | MapData; }) => void) => {
        useEffect(() => {
            if (mapState?.currentTile?.content === 'nothing') {
                if (gameState.cityButton) {
                    gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false });
                    setBackground({
                        ...background,
                        'background': getPlayerBackground.background
                    });
                };
                if (mapState.steps % 3 === 0 && !mapState.contentMoved) mapDispatch({ type: MAP_ACTIONS.SET_MOVE_CONTENT, payload: mapState }); 
                gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: '' });
                mapDispatch({ type: MAP_ACTIONS.SET_MAP_CONTEXT, payload: "You continue moving through your surroundings and find nothing of interest in your path, yet the world itself seems to be watching you." });
                mapDispatch({ type: MAP_ACTIONS.SET_MAP_MOVED, payload: false }); 
            };
            if (checkPlayerTrait("Kyn'gian", gameState) && mapState.steps % 10 === 0) {
                mapDispatch({ type: MAP_ACTIONS.SET_MAP_CONTEXT, payload: "The blood of the Tshios course through your veins." });
                dispatch({ type: ACTIONS.PLAYER_REST, payload: 1 });
            };
            if (checkPlayerTrait("Shrygeian", gameState) && mapState.steps % 10 === 0) {
                const chance = Math.floor(Math.random() * 101);
                if (chance <= 10) {
                    mapDispatch({ type: MAP_ACTIONS.SET_MAP_CONTEXT, payload: "The blood of Shrygei runs through your veins, you are able to sing life into the land." });
                    getTreasure();
                };                
            };
            if (mapState.steps > 150 && gameState.player.tutorial.firstPhenomena === true) checkTutorial('firstPhenomena', gameState.player);
        }, [mapState.steps]);
    };
    usePlayerMovementEffect(mapState, mapDispatch);

    const handleDirectionChange = async (direction: Direction, mapData: MapData) => {
        if (mapData.joystickDisabled) return;
        const offset = DIRECTIONS[direction];
        if (offset) {
            const newX = mapData.currentTile.x + offset.x;
            const newY = mapData.currentTile.y + offset.y;
            if (newX >= -100 && newX <= 100 && newY >= -100 && newY <= 100) {
                const newTile = await getAsceanCoords(newX, newY, mapData.map);
                if (newTile.content === 'enemy' || newTile.content === 'npc') mapDispatch({ type: MAP_ACTIONS.SET_JOYSTICK_DISABLED, payload: true });
                const newTiles = await getAsceanGroupCoords(newX, newY, mapData.map);
                const data = {
                    newTile: newTile,
                    oldTile: mapData.currentTile,
                    newTiles: newTiles,
                    map: mapData,
                };
                mapDispatch({
                    type: MAP_ACTIONS.SET_NEW_MAP_COORDS,
                    payload: data,
                });
                const options = [playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9];
                const random = Math.floor(Math.random() * options.length);
                options[random]();
                if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            };
        };
    };
    
    const debouncedHandleDirectionChange = debounce(handleDirectionChange, gameState.joystickSpeed);

    const checkTutorial = async (tutorial: string, player: Player) => {
        console.log(tutorial, '<- Tutorial Check');
        switch (tutorial) {
            case 'firstCity':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstCity={true} />);
            case 'firstCombat':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstCombat={true} />);
            case 'firstQuest':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstQuest={true} />);
            case 'firstShop':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstShop={true} />);
            case 'firstInventory':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstInventory={true} />);
            case 'firstLoot':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstLoot={true} />);
            case 'firstMovement':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstMovement={true} />);
            case 'firstDeath':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstDeath={true} />);
            case 'firstLevelUp':
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstLevelUp={true} />);
            case 'firstPhenomena':
                shakeScreen({ duration: 1000, intensity: 1 });
                playReligion();
                return setTutorialContent(<Tutorial setTutorialContent={setTutorialContent} player={player} gameDispatch={gameDispatch} firstPhenomena={true} />);
            default:
                return null;
        };
    };

    const handleInventoryMiddleware = async () => {
        try {
            if (gameState?.player?.tutorial?.firstInventory && gameState?.player?.inventory?.length > 0) await checkTutorial('firstInventory', gameState.player);
            gameDispatch({ type: GAME_ACTIONS.SET_SHOW_INVENTORY, payload: !gameState.showInventory });
        } catch (err: any) {
            console.log(err, "Error Handling Dialog Middleware");
        };
    };

    const loadMap = async (ascean: Player, map: MapData) => {
        const article = ['a', 'e', 'i', 'o', 'u'].includes(map.currentTile.content.charAt(0).toLowerCase()) ? 'an' : 'a';
        try {
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            mapDispatch({ type: MAP_ACTIONS.SET_MAP_DATA, payload: map }); 
            gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Loading ${map.name}. \n\n Currently, your coordinates are X: ${map.currentTile?.x}, Y: ${map.currentTile?.y}, experiencing ${map.currentTile?.content === 'nothing' || map.currentTile?.content === 'weather' ? map.currentTile?.content : `${article} ${map.currentTile?.content}`}. \n\n Enjoy your journey, ${ascean.name}.` });
            const coords = await getAsceanCoords(map.currentTile.x, map.currentTile.y, map.map);
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_COORDS,
                payload: coords,
            });
            setTimeout(() => { gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: false }); }, 3000);
        } catch (err: any) {
            console.log(err.message, "Error loading Map");
        };
    };

    const saveWorld = async () => {
        try {
            const response = await mapAPI.saveNewMap(mapState);
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA,
                payload: response
            });
            gameDispatch({ type: GAME_ACTIONS.SET_SAVE_WORLD, payload: `Good luck, ${gameState.player.name}, for no Ancient bears witness to it on your journey. Ponder what you wish to do in this world, without guidance but for your hands in arms. \n\n Enemies needn't stay such a way, yet a Good Lorian is a rare sight. Be whom you wish and do what you will, live and yearn for wonder in the ley, or scour cities if you have the coin. Pillage and strip ruins of their refuse, clear caves and dungeons of reclusive mercenaries, knights, druids, occultists, and more. \n\n The world doesn't need you, the world doesn't want you. The world's heroes are long dead since the Ancients fell. Many have sought to join these legends best they could, and in emulation have erected the Ascea, a season's long festival of athletic, intellectual, and poetic competition judged in the manner of the Ancients before; an Ascean, worthy, vying to be crowned the va'Esai and become revered across the land as 'Worthy of the Preservation of Being.' \n\n Whatever you seek in this world, if you wish it so, it starts with the Ascea.`})
            setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.WORLD_SAVED, payload: true });
            }, 60000);
        } catch (err: any) {
            console.log(err.message, 'Error Saving World');
        };
    };

    const saveAsceanCoords = async (x: number, y: number) => {
        try {
            const data = {
                ascean: gameState.player._id, 
                coordinates: { x: x, y: y },
                map: mapState
            };
            gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            gameDispatch({ 
                type: GAME_ACTIONS.SET_OVERLAY_CONTENT, 
                payload: `Saving Coordinates X: ${data.coordinates.x}, Y: ${data.coordinates.y}. \n\n Saving Map: ${data.map.name}. \n\n Enjoy your journey, ${gameState?.player?.name}` });
            const response = await asceanAPI.saveCoords(data);
            setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
            }, 2000);
        } catch (err: any) {
            console.log(err.message, 'Error Saving Ascean Coordinates');
        };
    };

    const generateWorld = async (mapName: string) => {
        mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: true });
        try {
            const data = { name: mapName, ascean: gameState.player };
            const response = await mapAPI.createMap(data);
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA,
                payload: response
            });
            const coords = await getAsceanCoords(gameState?.player?.coordinates?.x, gameState?.player?.coordinates?.y, response.map);
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_COORDS,
                payload: coords,
            });
            mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error Generating World Environment.');
        };
    };

    const getOpponentDialog = async (enemy: string) => {
        try {
            const response = getNpcDialog(enemy);
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    const getNPCDialog = async (enemy: string) => {
        try {
            const response = getMerchantDialog(enemy);
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    const getOpponent = async () => {
        gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        try {
            if (gameState.player.tutorial.firstCombat === true) {
                const wolf: Enemy = Object.assign({}, Wolf);
                    gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: wolf });
                    const response = await asceanAPI.getAnimalStats(wolf);
                    setAsceanState({
                        ...asceanState,
                        'opponent': wolf.level,
                    });
                    dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
                    setTimeout(() => {
                        dispatch({
                            type: ACTIONS.SET_DUEL,
                            payload: ''
                        });
                        playOpponent();
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                        checkTutorial('firstCombat', gameState.player);
                    }, 2000);
                    return;
            };
            let minLevel: number = 0;
            let maxLevel: number = 0;
            const chance = Math.random();
            if (gameState.player.level === 1) {
                if (chance > 0.5) {
                    const wolf: Enemy = Object.assign({}, Wolf);
                    gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: wolf });
                    const response = await asceanAPI.getAnimalStats(wolf);
                    setAsceanState({
                        ...asceanState,
                        'opponent': wolf.level,
                    });
                    dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
                    setTimeout(() => {
                        dispatch({
                            type: ACTIONS.SET_DUEL,
                            payload: ''
                        });
                        playOpponent();
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                    }, 2000);
                    return;
                }
            }
            if (gameState.player.level === 2) {
                if (chance > 0.67) {
                    const wolf: Enemy = Object.assign({}, Wolf);
                    gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: wolf });
                    const response = await asceanAPI.getAnimalStats(wolf);
                    setAsceanState({
                        ...asceanState,
                        'opponent': wolf.level,
                    });
                    dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
                    setTimeout(() => {
                        dispatch({
                            type: ACTIONS.SET_DUEL,
                            payload: ''
                        });
                        playOpponent();
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                    }, 2000);
                    return;
                }
            }
            if (gameState.player.level < 3) {
                minLevel = 1;
                maxLevel = 2;
            } else  if (gameState.player.level <= 4) { // 3-4
                if (gameState.player.level === 3) {
                    if (chance > 0.5) {
                        const bear: Enemy = Object.assign({}, Bear);
                        gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: bear });
                        const response = await asceanAPI.getAnimalStats(bear);
                        setAsceanState({
                            ...asceanState,
                            'opponent': bear.level,
                        });
                        dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
                        setTimeout(() => {
                            dispatch({
                                type: ACTIONS.SET_DUEL,
                                payload: ''
                            });
                            playOpponent();
                            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                        }, 2000);
                        return;
                    };
                };
                if (gameState.player.level === 4) {
                    if (chance > 0.67) {
                        const bear: Enemy = Object.assign({}, Bear);
                        gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: bear });
                        const response = await asceanAPI.getAnimalStats(bear);
                        setAsceanState({
                            ...asceanState,
                            'opponent': bear.level,
                        });
                        dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
                        setTimeout(() => {
                            dispatch({
                                type: ACTIONS.SET_DUEL,
                                payload: ''
                            });
                            playOpponent();
                            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                        }, 2000);
                        return;
                    };
                };
                minLevel = 2;
                maxLevel = 4;
            } else if (gameState.player.level === 5) { 
                minLevel = 4;
                maxLevel = 6;
            } else if (gameState.player.level === 6) {
                minLevel = 4;
                maxLevel = 8;
            } else if (gameState.player.level === 7) {
                minLevel = 5;
                maxLevel = 9;
            } else if (gameState.player.level === 8) {
                minLevel = 6;
                maxLevel = 10;
            } else if (gameState.player.level <= 10) { // 9-10
                minLevel = 7;
                maxLevel = 12;
            } else if (gameState.player.level <= 14) { // 11-14
                minLevel = 8;
                maxLevel = 16;
            } else if (gameState.player.level <= 18) { // 15-18
                minLevel = 12;
                maxLevel = 18;
            } else if (gameState.player.level <= 20) {
                minLevel = 16;
                maxLevel = 20;
            }
            const enemyData = {
                username: 'mirio',
                minLevel: minLevel,
                maxLevel: maxLevel
            };
            const secondResponse = await userService.getRandomEnemy(enemyData);
            const selectedOpponent = await asceanAPI.getCleanAscean(secondResponse.data.ascean._id);
            const response = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: selectedOpponent.data })
            setAsceanState({
                ...asceanState,
                'opponent': selectedOpponent.data.level,
            });
            dispatch({
                type: ACTIONS.SET_NEW_COMPUTER,
                payload: response.data.data
            });
            playOpponent();
            await getOpponentDialog(selectedOpponent.data.name);
            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
            if (!gameState?.showDialog && mapState?.currentTile?.content !== 'city') {
                gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        };
    };

    const getDeadAscean = async () => {
        gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        try {
            const enemyData = {
                username: user.username,
                minLevel: 4,
                maxLevel: 20
            };
            const secondResponse = await userService.getRandomDeadEnemy(enemyData);
            const selectedOpponent = await asceanAPI.getCleanAscean(secondResponse.data.ascean._id);
            const response = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: selectedOpponent.data });
            setAsceanState({
                ...asceanState,
                'opponent': selectedOpponent.data.level,
            });
            dispatch({
                type: ACTIONS.SET_NEW_COMPUTER,
                payload: response.data.data
            });
            shakeScreen(gameState.shake);
            playOpponent();
            await getOpponentDialog(selectedOpponent.data.name);
            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
            if (!gameState?.showDialog && mapState?.currentTile?.content !== 'city') {
                gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        };
    };

    const levelUpAscean = async (vaEsai: any) => {
        try {
            let response = await asceanAPI.levelUp(vaEsai);
            setAsceanState({
                ...asceanState,
                ascean: response.data,
                currentHealth: response.data.health.current,
                constitution: 0,
                strength: 0,
                agility: 0,
                achre: 0,
                caeren: 0,
                kyosir: 0,
                level: response.data.level,
                experience: 0,
                experienceNeeded: response.data.level * 1000,
                mastery: response.data.mastery,
                faith: response.data.faith,
            });
            await getAsceanLeveled();
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up')
        };
    };

    useEffect(() => {
        if (!gameState.saveExp) return;
        saveExperience();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: false });
        };
    }, [asceanState, gameState.saveExp]);

    const saveExperience = async () => {
        if (!gameState.saveExp || !state.player_win) return;
        try {
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You reflect on the moments of your duel with ${gameState.opponent.name} as you count your pouch of winnings.` });
            const response = await asceanAPI.saveExperience(asceanState);
            if (response.data.gold > 0 && response.data.silver > 0) {
                gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.gold} gold and ${response.data.silver} silver.`] });
            } else if (response.data.gold > 0 && response.data.silver === 0) { 
                gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.gold} gold.`] });
            } else if (response.data.gold === 0 && response.data.silver > 0) {
                gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.silver} silver.`] });
            } else {
                gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points.`] });
            };
            const cleanRes = await asceanAPI.getCleanAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: cleanRes.data });
            dispatch({
                type: ACTIONS.SAVE_EXPERIENCE,
                payload: cleanRes.data
            });
            setAsceanState({
                ...asceanState,
                'ascean': cleanRes.data,
                'currentHealth': cleanRes.data.health.current,
                'constitution': 0,
                'strength': 0,
                'agility': 0,
                'achre': 0,
                'caeren': 0,
                'kyosir': 0,
                'level': cleanRes.data.level,
                'opponent': gameState.opponent.level,
                'experience': 0,
                'experienceNeeded': cleanRes.data.level * 1000,
                'mastery': cleanRes.data.mastery,
                'faith': cleanRes.data.faith,
            });
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: false });
            if (cleanRes.data.level === 1 && cleanRes.data.experience === 1000 && cleanRes.data.tutorial.firstLevelUp) {
                setTimeout(() => {
                    checkTutorial('firstLevelUp', cleanRes.data);
                }, 5000);
            };
        } catch (err: any) {
            console.log(err.message, 'Error Saving Experience');
        };
    };

    const gainExperience = async () => {
        try {
            let opponentExp: number = Math.round(state.computer.level * 100 * (state.computer.level / state.player.level) + state.player_attributes.rawKyosir);
            if (asceanState.ascean.experience + opponentExp >= asceanState.experienceNeeded) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'currentHealth': state.new_player_health,
                    'experience': asceanState.experienceNeeded,
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
            if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'currentHealth': state.new_player_health,
                    'experience': Math.round(asceanState.experience + opponentExp),
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error Gaining Experience')
        };
    };

    useEffect(() => {
        if (!state.playerGrapplingWin) return;
        handlePlayerGrapplingWin();
        setTimeout(() => {
            gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            dispatch({ type: ACTIONS.RESET_GRAPPLING_WIN, payload: false });
        }, 6000);
    }, [state.playerGrapplingWin]);

    useEffect(() => {
        if (!state.player_luckout)
        handlePlayerLuckout();
        setTimeout(() => {
            gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            dispatch({ type: ACTIONS.RESET_LUCKOUT, payload: false });
        }, 6000);
    }, [state.player_luckout]);   

    useEffect(() => {
        if (!gameState.playerBlessed) return;
        getAsceanOnly();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_BLESSING, payload: false });
        };
    }, [gameState, gameState.playerBlessed]);

    useEffect(() => {
        if (!gameState.itemSaved) return;
        getOnlyInventory();
        return () => gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
    }, [gameState, gameState.itemSaved]);

    useEffect(() => {
        if (!gameState.eqpSwap) return;
        getAsceanAndInventory();
        return () => gameDispatch({ type: GAME_ACTIONS.EQP_SWAP, payload: false });
    }, [gameState, gameState.eqpSwap]);

    useEffect(() => {
        if (!gameState.removeItem) return;
        getOnlyInventory();
        return () => gameDispatch({ type: GAME_ACTIONS.REMOVE_ITEM, payload: false });
    }, [gameState, gameState.removeItem]);

    useEffect(() => {
        if (!gameState.repositionInventory) return;
        getOnlyInventory();
        return () => gameDispatch({ type: GAME_ACTIONS.REPOSITION_INVENTORY, payload: false });
    }, [gameState, gameState.repositionInventory]);

    useEffect(() => {
        if (!gameState.purchasingItem) return;
        getOnlyInventory();
        return () => gameDispatch({ type: GAME_ACTIONS.SET_PURCHASING_ITEM, payload: false });
    }, [gameState, gameState.purchasingItem]);

    useEffect(() => {
        if (!gameState.saveQuest) return;
        getAsceanQuests();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SAVE_QUEST, payload: false });
        };
    }, [gameState.saveQuest]);

    const deleteEquipment = async (eqp: any) => {
        try {
            await eqpAPI.deleteEquipment(eqp);
        } catch (err) {
            console.log(err, 'Error!')
        };
    };

    const getAsceanLeveled = async () => {
        try {
            const firstResponse = await asceanAPI.getCleanAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_LEVEL_UP, payload: firstResponse.data });
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_LEVEL_UP,
                payload: response.data.data
             });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Leveled');
        };
    };

    const getAsceanQuests = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanQuests(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_QUESTS, payload: firstResponse });
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const getAsceanOnly = async () => {
        try {
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const getAsceanAndInventory = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanAndInventory(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_ASCEAN_AND_INVENTORY, payload: firstResponse.data });
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const getOnlyInventory = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanInventory(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_INVENTORY, payload: firstResponse });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const clearOpponent = async (data: CombatData) => {
        try {
            if (gameState.showDialog) gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: false });
            if (mapState.currentTile.content === 'enemy' && data.new_computer_health <= 0) mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
            if (mapState.currentTile.content !== 'city') gameDispatch({ type: GAME_ACTIONS.SET_SHOW_MAP, payload: true });
            setMoveTimer(gameState.moveTimer);
            setTimeout(() => {
                dispatch({ type: ACTIONS.CLEAR_DUEL, payload: null });
                gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: null });
                mapDispatch({ type: MAP_ACTIONS.SET_JOYSTICK_DISABLED, payload: false });
            }, 500);
        } catch (err: any) {
            console.log(err.message, 'Error Clearing Duel');
        };
    };

    const chanceEncounter = async (content: string) => {
        try {
            const chance = Math.floor(Math.random() * 100) + 1;
            console.log(chance, 'Chance Encounter');
            switch (content) {
                case 'cave': {
                    if (chance > 99) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                        await getTreasure();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000)
                    } else if (chance > 98) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000);
                    };
                    break;
                };
                case 'dungeon': {
                    if (chance > 95) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000);
                    };
                    break;
                };
                case 'ruins': {
                    if (chance > 97) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000);
                    } else if (chance > 95) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You spy a traveling merchant peddling wares. He approaches cautious yet peaceful.` })
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You spy a traveling merchant roaming about the land, possibly peddling some wares wares. \n\n He approaches cautious yet peaceful, hailing you down.` })
                        await getNPC();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000);
                    };
                    break;
                };
                case 'weather': {
                    if (chance > 99) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                        await getTreasure();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000)
                    } else if (chance > 98) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000);
                    } else if (chance > 97) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You spy a traveling merchant peddling wares. He approaches cautious yet peaceful.` })
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You spy a traveling merchant roaming about the land, possibly peddling some wares wares. \n\n He approaches cautious yet peaceful, hailing you down.` })
                        await getNPC();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000);
                    } else {
                        if (gameState.storyContent !== '') {
                            gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: '' });
                        }
                        mapDispatch({
                            type: MAP_ACTIONS.SET_MAP_CONTEXT,
                            payload: "You continue moving through your surroundings and find nothing of interest in your path, yet the world itself seems to be watching you."
                        });
                    };
                    break;
                };
                case 'wonder': {
                    if (chance > 97) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                        await getTreasure();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000)
                    };
                    break;
                };
                default: {
                    break;
                };
            };

        } catch (err: any) {
            console.log(err.message, 'Error Encountering Chance Encounter');
        };
    };

    const getPhenomena = async () => {
        try {
            if (gameState.cityButton) {
                gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
            };
            playPhenomena();
        } catch (err: any) {
            console.log(err.message, 'Error Encountering Phenomena');
        };
    };

    const interactPhenomena = async () => {
        try {
            // if (gameState?.player.level > gameState?.player?.statistics?.relationships?.deity?.behaviors.length) {
            //     const chance = Math.floor(Math.random() * 101);
            //     if (chance > 0) {
            //         gameDispatch({ type: GAME_ACTIONS.LOADING_DEITY, payload: true });
            //         return;
            //     };
            // };
            const fyeran: number = checkPlayerTrait('Fyeran', gameState) ? 10 : 0;
            const caeren = state?.player_attributes?.totalCaeren + fyeran;
            const level = gameState?.player?.level;
            const initialIntensity = level * caeren / 10;
            const maxIntensity = level * caeren;
            const healCurse = async () => {
                const chance = Math.floor(Math.random() * 101) + fyeran;
                if (chance > 33) {
                    dispatch({ type: ACTIONS.PLAYER_REST, payload: initialIntensity });
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You heal for ${Math.round(initialIntensity * 0.01 * state?.player_health)}, a small respite from the harsh tones of your surroundings.` });
                } else {
                    dispatch({ type: ACTIONS.PLAYER_REST, payload: -initialIntensity });
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You snap back in pain, its sensation coursing through you for ${Math.round(initialIntensity * 0.01 * state?.player_health)}.` });
                };
            };

            const trickster = async (ascean: Player) => {
                const chance = Math.floor(Math.random() * 101) + fyeran;
                if (chance + level > 75) {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `A light pool of caeren juts out into you, increasing your experience by ${maxIntensity + ascean.kyosir}.` });
                    const response = await asceanAPI.setExperience({ asceanID, experience: (maxIntensity + ascean.kyosir) });
                    dispatch({ type: ACTIONS.SET_EXPERIENCE, payload: response });
                    gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
                } else if (chance + level > 50) {
                    await getTreasure();
                } else if (chance + level > 25) {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `The faint stain of Kyosir billows from its writhing tendrils and you suddenly feel lighter to the tune of ${maxIntensity}s.` });
                    const response = await asceanAPI.setCurrency({ asceanID, currency: maxIntensity });
                    dispatch({ type: ACTIONS.SET_CURRENCY, payload: response.currency });
                    gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_CURRENCY, payload: response.currency });
                } else {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `A murky pool of caeren juts out to leech you, decreasing your experience by ${maxIntensity - ascean.kyosir}.` });
                    const response = await asceanAPI.setExperience({ asceanID, experience: -(maxIntensity - ascean.kyosir) });
                    dispatch({ type: ACTIONS.SET_EXPERIENCE, payload: response });
                    gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
                };
            };

            const returnPhenomena = async () => {
                const chance = Math.floor(Math.random() * 101) + fyeran;
                if (chance + level < 40) {
                    await healCurse();
                } else if (chance + level < 80) {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You're unsure of what there is to witness, yet feel its tendrils beckoning. Do you wish to enter? \n\n Chance To: Heal, Damage, Gain Exp, Lose Exp, Gain Treasure, Wealth, Encounter Dead Ascean` });
                    await trickster(gameState.player);
                } else {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You're unsure of what there is to witness, yet feel its tendrils beckoning. Do you wish to enter? \n\n Chance To: Heal, Damage, Gain Exp, Lose Exp, Gain Treasure, Wealth, Encounter Dead Ascean` });
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You're unsure of what you're witnessing materialize yet its form becomes unmistakeningly clear, instintively you reach for your ${state?.weapons[0].name}. \n\n Luck be to you, ${gameState?.player?.name}.` });
                    await getDeadAscean();
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                    }, 3000);
                };
            };
            
            switch (caeren) {
                case caeren < 20:
                    await returnPhenomena();
                    break;
                case caeren < 30:
                    await healCurse();
                    await returnPhenomena();
                    break;
                case caeren < 40:
                    await healCurse();
                    await returnPhenomena();
                    break;
                case caeren < 50:
                    await returnPhenomena();
                    break;
                case caeren < 60:
                    await returnPhenomena();
                    break;
                case caeren < 70:
                    await returnPhenomena();
                    break;
                default:
                    await returnPhenomena();
                    break;
            };

            mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
        } catch (err: any) {
            console.log(err, "Error Interacting With Phenomena");
        };
    };

    const getWeather = async (province: string) => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        }
        switch (province) {
            case 'Alluring Isles': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Increment jungle weighs your steps, succumbing to the dense and undisturbed natural wonder. -10% Roll, Critical Strike. +10% Elemental, Ranged Damage."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Alluring Isles"
                })
                break;
            };
            case 'Astralands': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Lightning strikes surround a swirl of heavy, bleeding clouds. +10% Critical Strikes, +10% Magic Damage."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Astralands"
                })
                break;
            };
            case 'Fangs': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Soft, frothing fog surrounds the area. -10% Elemental, Ranged Damage. +5% Roll. +10% Melee Damage."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Fangs"
                })
                break;
            };
            case 'Firelands': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "It's bright and sunny, just absolute beautiful weather. Couldn't ask for a better day for a stroll into the wilderness. +10% Damage, +25% Critical Damage. You cannot dodge."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Firelands"
                })
                break;
            };
            case 'Kingdom': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Snowfall gathers and the winds greet you with shrill smiles. +10% Ancient, Physical Damage. -5% Roll."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Kingdom"
                })
                break;
            };
            case 'Licivitas': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Slick weather draws palpable breaths as you embark across the plains. A calm gives glimpses of the land of hush and tendril. +10% Ancient, Daethic Damage."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Licivitas"
                })
                break;
            };
            case 'Sedyrus': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Despite your settings, monsoons quench the root of these lands for months wtih a single flash of its reverence. +10% Ancient, Elemental Damage. +10% Critical Damage. -5% Roll. You cannot dodge."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Sedyrus"
                })
                break;
            };
            case 'Soverains': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Strange airs pervade and grant a sense of shifting winds, its swirl caressing. +10% Magic Damage. +5% Roll."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Soverains"
                })
                break;
            };
        };
        await chanceEncounter('weather');
    };

    const getNPC = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        try {
            playMerchant();
            const npc: NPC = Object.assign({}, Merchant);
            gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: npc });
            const response = await asceanAPI.getAnimalStats(npc);
            // const dialog = getNodesForNPC(npcIds[npc.dialogId]);
            // console.log(dialog, "Merchant Dialog ??")
            dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
            await getNPCDialog(npc.name);
            gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_INTENT, payload: 'services' });
            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
            if (!gameState.showDialog && mapState?.currentTile?.content !== 'city') {
                gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
            }
        } catch (err: any) {
            console.log("Error Getting an NPC");
        };
    };

    const getWonder = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        await chanceEncounter('wonder');
    };

    const getTreasure = async () => {
        playTreasure();
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        gameDispatch({ type: GAME_ACTIONS.SET_GAMEPLAY_EVENT, payload: {
            title: "Treasure!",
            description: `${gameState.player.name}, you've come across some leftover spoils or treasure, either way its yours now if you desire.`,
        } });
        await getOneLootDrop(gameState.player.level + 4);
        gameDispatch({ type: GAME_ACTIONS.SET_GAMEPLAY_MODAL, payload: true });
    };

    const getLandmark = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
    };

    const getHazard = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        chanceEncounter('hazard');
    };

    const getCave = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        await chanceEncounter('cave');
    };

    const getRuins = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        await chanceEncounter('ruins');
    };

    const getDungeon = async () => {
        playDungeon();
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        await chanceEncounter('dungeon');
        // This will be a probabilistic roll of random dungeons that affect gameplay, similar to environmental effects. May last for some time.
    };

    const getCity = async () => {
        if (gameState?.player?.tutorial.firstCity === true) await checkTutorial('firstCity', gameState.player);
        setBackground({
            ...background,
            'background': getCityBackground.background
        });
        gameDispatch({ type: GAME_ACTIONS.SET_ENTER_CITY, payload: `You walk up to the edges of an open city, some structure of wall exists but is overall porous. Here, you may find services to aid and replenish your journey.`});
    };

    const handleTileContent = async (content: string, lastContent: string) => {
        if (lastContent === 'city' && content !== 'city') {
            setBackground({
                ...background,
                'background': getPlayerBackground.background
            });
        };
        if (content === 'city' && lastContent === 'city') {
            if (mapState.steps % 3 === 0) {
                mapDispatch({ type: MAP_ACTIONS.SET_MOVE_CONTENT, payload: mapState });
            };
            return;
        };
        if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
        try {
            switch (content) {
                case 'enemy': {
                    shakeScreen({ duration: 750, intensity: 1.5 });
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted a stranger whose reaction appears defensive.` });
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted a stranger to your presence. They appear to be approaching you now. \n\n May you be fyers, ${gameState?.player?.name}.` });
                    await getOpponent();
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                    }, 2000);
                    break;
                };
                case 'npc': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You approach a traveling merchant peddling wares.` })
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You approach a traveling merchant roaming about the land, possibly peddling some wares wares. \n\n He approaches cautious yet peaceful as you him down.` })
                    await getNPC();
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                    }, 2000);
                    break;
                };
                case 'phenomena': {
                    shakeScreen(gameState.shake);
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You're unsure of what there is to witness, yet feel its tendrils beckoning. Do you wish to enter? \n\n Chance To: Heal, Damage, Gain Exp, Lose Exp, Gain Treasure, Wealth, Encounter Dead Ascean` });
                    await getPhenomena();
                    break;
                };
                case 'wonder': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Natural wonders of the world environment, may grant boons or blessings when encountered, or perhaps be where enemies or npc's congregate \n\n [Note: This currently does not exist.]` });
                    await getWonder(); 
                    break;
                };
                case 'ruins': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Decay of civilizations from the past, may have scavengers or treasure probabilistically determined \n\n [Note: This currently does not exist.]` });
                    await getRuins();
                    break;
                };
                case 'cave': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Caves appear abundant, with many adventurers seeking untold stories that lay waiting to be discovered. Curious why there aren't more folk interested \n\n [Note: This currently does not exist.]` });
                    await getCave();
                    break;
                };
                case 'weather': {
                    await getWeather(mapState.province);
                    break;
                };
                case 'treasure': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                    await getTreasure();
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                    }, 2000);
                    break;
                };
                case 'landmark': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Man-made landmarks, may have treasure, enemies, or npc's congregating \n\n [Note: This currently does not exist.]` });
                    await getLandmark();
                    break;
                };
                case 'hazard': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Natural hazards of the environment that when encountered, cause harmful effects akin to curses \n\n [Note: This currently does not exist.]` });
                    await getHazard();
                    break;
                };
                case 'dungeon': {
                    shakeScreen(gameState.shake);
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Dungeons may refer to old, abandoned settlements sunk into this world. There may also be another reason \n\n [Note: This currently does not exist.]` });
                    await getDungeon();
                    break;
                };
                case 'city': {
                    await getCity();
                    break;
                };
                default: {
                    console.log('No Content Found');
                    break;
                };
            };
        } catch (err: any) {
            console.log(err.message, 'Error Handling Tile Content');
        };
    };

    useEffect(() => {
        if (gameState.lootRoll === false || state.player_win === false) return;
        getOneLootDrop(state.computer.level);
        return () => {
            gameDispatch({ type: GAME_ACTIONS.LOOT_ROLL, payload: false });
        };
    }, [gameState.lootRoll, state.player_win]);
    
    const getOneLootDrop = async (level: number) => {
        try {
            let response = await eqpAPI.getLootDrop(level);
            gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP, payload: response.data[0] });
            let roll = Math.floor(Math.random() * 100) + 1;
            if (roll <= 25) {
                let second = await eqpAPI.getLootDrop(level);
                gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP_TWO, payload: second.data[0] });
            } else {
                gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP_TWO, payload: null });
            };
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
            if (gameState.player.tutorial.firstLoot === true) await checkTutorial('firstLoot', gameState.player);
        } catch (err: any) {
            console.log(err.message, 'Error Getting Loot Drop');
        };
    };

    function handleAction(action: any) {
        playActionButton();
        dispatch({
            type: ACTIONS.SET_COMBAT_ACTION,
            payload: action.target.value
        });
        setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
    };

    function handleCounter(counter: any) {
        playActionButton();
        dispatch({
            type: ACTIONS.SET_COMBAT_COUNTER,
            payload: counter.target.value
        });
        setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
    };

    async function setWeaponOrder(weapon: any) {
        try {
            const findWeapon = state.weapons.filter((weap: { name: any; }) => weap?.name === weapon.target.value);
            const newWeaponOrder = async () => state?.weapons.sort((a: any, b: any) => {
                return ( a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0 )
            });
            const response = await newWeaponOrder();
            playWO();
            dispatch({
                type: ACTIONS.SET_WEAPON_ORDER,
                payload: response
            });
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Weapon Order');
        };
    };

    async function setDamageType(damageType: any) {
        try {    
            playWO();
            dispatch({
                type: ACTIONS.SET_DAMAGE_TYPE,
                payload: damageType.target.value
            });
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Damage Type');
        };
    };

    async function setPrayerBlessing(prayer: any) {
        try {
            playWO();
            dispatch({
                type: ACTIONS.SET_PRAYER_BLESSING,
                payload: prayer.target.value
            });
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Prayer');
        };
    };
      
    async function soundEffects(effects: CombatData) {
        try {
            if (effects.critical_success === true) {
                const soundEffectMap = {
                    Spooky: playDaethic,
                    Righteous: playDaethic,
                    Wild: playWild,
                    Earth: playEarth,
                    Fire: playFire,
                    Frost: playFrost,
                    Lightning: playLightning,
                    Sorcery: playSorcery,
                    Wind: playWind,
                    Pierce: (weapons: any[]) =>
                      weapons[0].type === "Bow" ? playBow() : playPierce(),
                    Slash: playSlash,
                    Blunt: playBlunt,
                };
            
                const { player_damage_type, weapons } = effects;
                const soundEffectFn = soundEffectMap[player_damage_type as keyof typeof soundEffectMap];
                if (soundEffectFn) {
                    soundEffectFn(weapons);
                };
            };
            if (effects.religious_success === true) {
                playReligion();
            };
            if (effects.roll_success === true || effects.computer_roll_success === true) {
                playRoll();
            };
            if (effects.counter_success === true || effects.computer_counter_success === true) {
                playCounter();
            };
            setTimeout(() => {
                if (effects.player_win !== true && effects.computer_win !== true) {
                    playCombatRound();
                };
            }, 500);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Sound Effects')
        };
    };

    async function handleHardcoreDeath(data: CombatData) {
        try {
            playDeath();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You have died in battle to ${gameState?.opponent?.name}, yet there is another way for those with the fortitude.` });
            const response = await asceanAPI.kill(asceanID);
            setTimeout(() => {
                setTimeLeft(0);
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: response });
                dispatch({
                    type: ACTIONS.COMPUTER_WIN,
                    payload: data
                });
                clearOpponent(data);
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
                if (gameState?.player?.level > 3) {
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                } else {
                    navigate('/');
                };
            }, 6000);
        } catch (err: any) {
            console.log(err, "Error Handling Hardcore Death");
        };
    };

    async function handlePlayerGrapplingWin() {
        try {
            if (mapState?.currentTile?.content === 'city') {
                playWin();
            } else {
                playReligion();
            };
            gameDispatch({ type: GAME_ACTIONS.LOOT_ROLL, payload: true });
            await gainExperience();
        } catch (err: any) {
            console.log(err, "Error Handling Player Grappling Win");
        };
    };

    async function handlePlayerLuckout() {
        try {
            if (mapState?.currentTile?.content === 'city') {
                playWin();
            } else {
                playReligion();
            };
            gameDispatch({ type: GAME_ACTIONS.LOOT_ROLL, payload: true });
            await gainExperience();
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handlePlayerWin(combatData: CombatData) {
        try {
            if (mapState?.currentTile?.content === 'city') {
                playWin();
            } else {
                playReligion();
                await gainExperience();
            };
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            setTimeout(() => {
                setTimeLeft(0);
                dispatch({ type: ACTIONS.PLAYER_WIN, payload: combatData });
                if (mapState?.currentTile?.content !== 'city' && gameState.opponent.name !== "Wolf" && gameState.opponent.name !== "Bear") gameDispatch({ type: GAME_ACTIONS.LOOT_ROLL, payload: true });
                gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
                if (gameState.opponent.name === "Wolf" || gameState.opponent.name === "Bear") clearOpponent(combatData);
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleComputerWin(combatData: CombatData) {
        if (gameState?.player?.hardcore === true) {
            await handleHardcoreDeath(combatData);
            return;
        };
        try {
            await asceanAPI.asceanHealth({ health: combatData.new_player_health, id: asceanID });
            playDeath();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You have lost the battle to ${gameState?.opponent?.name}, yet still there is always Achre for you to gain.` })
            setTimeout(() => {
                setTimeLeft(0);
                dispatch({ type: ACTIONS.COMPUTER_WIN, payload: combatData });
                gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
                if (gameState.opponent.name === "Wolf" || gameState.opponent.name === "Bear") clearOpponent(combatData);
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
                if (gameState?.player?.tutorial?.firstDeath) checkTutorial('firstDeath', gameState.player);
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleInitiate(combatData: CombatData) {
        try {
            if (combatData.action === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose An Action!\n`]);
                return;
            };
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
            const response = await gameAPI.initiateAction(combatData);
            console.log(response.data, "Initiate Response")
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            dispatch({ type: ACTIONS.INITIATE_COMBAT, payload: response.data });
            await soundEffects(response.data);
            shakeScreen(gameState.shake);
            if (response.data.player_win === true) await handlePlayerWin(response.data);
            if (response.data.computer_win === true) await handleComputerWin(response.data);
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Combat')
        };
    };

    async function handleInstant(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            setEmergencyText([``]);
            gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: true });
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
            const response = await gameAPI.instantAction(state);
            console.log(response.data, "Instant Response");
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            dispatch({ type: ACTIONS.INSTANT_COMBAT, payload: response.data });
            if (response.data.player_win === true) await handlePlayerWin(response.data);
            shakeScreen(gameState.shake);
            playReligion();
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Insant Action')
        };
    };

    async function handlePrayer(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            if (state.prayerSacrifice === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose A Prayer to Sacrifice!\n`]);
                return;
            };
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
            const response = await gameAPI.consumePrayer(state);
            console.log(response.data, "Prayer Response");
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            dispatch({ type: ACTIONS.CONSUME_PRAYER, payload: response.data });
            if (response.data.player_win === true) await handlePlayerWin(response.data);
            shakeScreen(gameState.shake);
            playReligion();
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        };
    };

    const resetAscean = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.CHECK_LOOT, payload: true });
            if (state.current_player_health <= 0 || state.new_player_health <= 0) {
                dispatch({
                    type: ACTIONS.RESET_COMPUTER,
                    payload: state
                });
            } else {
                dispatch({
                    type: ACTIONS.RESET_COMPUTER,
                    payload: state,
                });
            };
            playReplay();
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        };
    };

    useEffect(() => {
        if (gameState?.player?.origin && background.background === '') {
            setBackground({
                ...background,
                'background': getPlayerBackground.background
            });
        };
    }, [gameState?.player]);
    
    const getPlayerBackground = {
        background: "url(" + getBackgroundStyle(gameState?.player.origin) + ")",
    };

    const getCityBackground = {
        background: "url(" + process.env.PUBLIC_URL + `/images/city_2.jpg` + ")",
    };	

    function getBackgroundStyle(origin: string) {
        const num = Math.floor(Math.random() * 3) + 1;
        switch (origin) {
            case 'Ashtre':
                return process.env.PUBLIC_URL + `/images/astralands_${num}.jpg`;
            case 'Fyers':
                return process.env.PUBLIC_URL + `/images/firelands_${num}.jpg`;
            case "Li'ivi":
                return process.env.PUBLIC_URL + `/images/licivitas_${num}.jpg`;
            case "Notheo":
                return process.env.PUBLIC_URL + `/images/kingdom_${num}.jpg`;
            case "Nothos":
                return process.env.PUBLIC_URL + `/images/soverains_${num}.jpg`;
            case "Quor'eite":
                return process.env.PUBLIC_URL + `/images/sedyrus_${num}.jpg`;
            case 'Sedyreal':
                return process.env.PUBLIC_URL + `/images/sedyrus_${num}.jpg`;
        };
    };

    if (gameState.loading || gameState.loadingAscean) {
        return (
            <Loading Chat={true} />
        );
    };

    return (
        <Container fluid id="game-container" style={background}>
            { gameState.opponent ?
                <>
                <GameAscean state={state} ascean={gameState.opponent} damage={state.computerDamaged} totalPlayerHealth={state.computer_health} loading={gameState.loadingOpponent} player={false} currentPlayerHealth={state.new_computer_health} />
                <CombatOverlay 
                    ascean={gameState.player} enemy={gameState.opponent} playerWin={state.player_win} computerWin={state.computer_win} playerCritical={state.critical_success} computerCritical={state.computer_critical_success}
                    playerAction={state.player_action} computerAction={state.computer_action} playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_computer_damage} 
                    rollSuccess={state.roll_success} computerRollSuccess={state.computer_roll_success} counterSuccess={state.counter_success} computerCounterSuccess={state.computer_counter_success}
                    loadingCombatOverlay={gameState.loadingCombatOverlay} combatResolved={gameState.combatResolved} combatOverlayText={gameState.combatOverlayText} gameDispatch={gameDispatch} combatEngaged={state.combatEngaged}
                    playerLuckout={state.player_luckout}
                />
                <GameCombatText 
                    emergencyText={emergencyText} combatRoundText={state.combatRound}
                    playerCombatText={state.player_action_description} computerCombatText={state.computer_action_description} 
                    playerActionText={state.player_start_description} computerActionText={state.computer_start_description}
                    playerDeathText={state.player_death_description} computerDeathText={state.computer_death_description}
                    playerSpecialText={state.player_special_description} computerSpecialText={state.computer_special_description}
                    playerReligiousText={state.player_influence_description} computerReligiousText={state.computer_influence_description}
                    playerReligiousTextTwo={state.player_influence_description_two} computerReligiousTextTwo={state.computer_influence_description_two}
                />
                </>
            : '' }
            <GameConditions 
                setEmergencyText={setEmergencyText} dispatch={dispatch} state={state} soundEffects={soundEffects} vibrationTime={gameState.vibrationTime}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft} handlePlayerWin={handlePlayerWin} handleComputerWin={handleComputerWin} gameState={gameState}
            />
            <Settings 
                inventory={gameState.player.inventory} ascean={gameState.player} dispatch={dispatch} currentTile={mapState.currentTile} saveAsceanCoords={saveAsceanCoords} 
                gameDispatch={gameDispatch} gameState={gameState} mapState={mapState}
            />
            { asceanState.ascean.experience >= asceanState.experienceNeeded ?
                <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
            : '' }
            <GameAscean state={state} ascean={gameState.player} player={true} damage={state.playerDamaged} totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} loading={gameState.loadingAscean} />
            { state.combatEngaged ? 
                <>
                    <GameAnimations 
                        playerCritical={state.critical_success} computerCritical={state.computer_critical_success}
                        playerAction={state.player_action} computerAction={state.computer_action} 
                        playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_computer_damage} 
                        rollSuccess={state.roll_success} computerRollSuccess={state.computer_roll_success} combatRound={state.combatRound}
                        counterSuccess={state.counter_success} computerCounterSuccess={state.computer_counter_success} combatEngaged={state.combatEngaged}
                    />
                    <GameActions 
                        setDamageType={setDamageType} dispatch={dispatch} state={state} handleInstant={handleInstant} handlePrayer={handlePrayer}
                        setPrayerBlessing={setPrayerBlessing} weapons={state.weapons} damageType={state.weapons[0].damage_type} setWeaponOrder={setWeaponOrder}
                        handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} gameState={gameState} gameDispatch={gameDispatch}
                        currentWeapon={state.weapons[0]} currentDamageType={state.player_damage_type} currentAction={state.action} currentCounter={state.counter_guess} 
                    /> 

                </>
            : 
                <>
                    <GameMap mapData={mapState} canvasRef={canvasRef} gameDispatch={gameDispatch} gameState={gameState} />
                    { gameState.player.journal.entries.length > 0 ?
                        <Journal quests={gameState.player.quests} dispatch={dispatch} gameDispatch={gameDispatch} mapState={mapState} mapDispatch={mapDispatch} ascean={gameState.player}   />
                    : '' }
                    { gameState.showDialog && gameState.opponent ?    
                        <DialogBox 
                            npc={gameState?.opponent?.name} dialog={gameState.dialog} dispatch={dispatch} state={state} deleteEquipment={deleteEquipment} currentIntent={gameState.currentIntent}
                            playerWin={state.player_win} computerWin={state.computer_win} ascean={gameState.player} enemy={gameState.opponent} itemSaved={gameState.itemSaved}
                            winStreak={state.winStreak} loseStreak={state.loseStreak} highScore={state.highScore} lootDropTwo={gameState.lootDropTwo} mapState={mapState} mapDispatch={mapDispatch}
                            resetAscean={resetAscean} getOpponent={getOpponent} lootDrop={gameState.lootDrop} merchantEquipment={gameState.merchantEquipment} clearOpponent={clearOpponent}
                            gameDispatch={gameDispatch} gameState={gameState}
                        />
                    : '' }
                    { gameState.showInventory ?
                        <InventoryBag inventory={gameState.player.inventory} gameState={gameState} gameDispatch={gameDispatch} ascean={gameState.player} dispatch={dispatch} mapState={mapState}  />
                    : ""}
                    { gameState.opponent && mapState?.currentTile?.content !== 'city' ?
                        <Button variant='' className='dialog-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: !gameState.showDialog })}>Dialog</Button>
                    : 
                        <>
                        <StoryBox ascean={gameState.player} mapState={mapState} storyContent={gameState.storyContent} moveTimer={moveTimer} interactPhenomena={interactPhenomena} />
                        <Joystick onDirectionChange={handleDirectionChange} debouncedHandleDirectionChange={debouncedHandleDirectionChange} joystickDisabled={mapState.joystickDisabled} mapState={mapState} />
                        <Button variant='' className='inventory-button' onClick={handleInventoryMiddleware}>Inventory</Button>   
                        </>
                    }
                    { gameState.showCity ?
                        <CityBox 
                            state={state} dispatch={dispatch} ascean={gameState.player} mapState={mapState} enemy={gameState.opponent} merchantEquipment={gameState.merchantEquipment}
                            inventory={gameState.player.inventory} getOpponent={getOpponent} resetAscean={resetAscean} deleteEquipment={deleteEquipment}
                            cityOption={gameState.cityOption} clearOpponent={clearOpponent} gameDispatch={gameDispatch} gameState={gameState}
                        />
                    : '' }
                    { gameState.cityButton || mapState?.currentTile?.content === 'city' ?
                        <Button variant='' className='city-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_CITY, payload: !gameState.showCity })}>City</Button>
                    : '' }
                </>
            }
            <GameplayDeity 
                ascean={gameState.player} mapState={mapState} mapDispatch={mapDispatch} state={state} dispatch={dispatch} gameState={gameState} gameDispatch={gameDispatch} loadingDeity={gameState.loadingDeity}    
            />
            <GameplayOverlay 
                ascean={gameState.player} mapState={mapState} mapDispatch={mapDispatch} loadingOverlay={gameState.loadingOverlay}
                generateWorld={generateWorld} saveWorld={saveWorld} overlayContent={gameState.overlayContent}
                loadingContent={gameState.loadingContent} gameDispatch={gameDispatch} getAsceanCoords={getAsceanCoords}
            />
            <GameplayUnderlay 
                ascean={gameState.player} enemy={gameState.opponent} mapState={mapState} mapDispatch={mapDispatch} state={state} dispatch={dispatch} gameState={gameState} gameDispatch={gameDispatch} loadingUnderlay={gameState.loadingUnderlay}    
            />
            { tutorialContent ? tutorialContent : '' }
            <GameplayEventModal 
                ascean={gameState.player} show={gameState.gameplayModal} gameplayEvent={gameState.gameplayEvent} deleteEquipment={deleteEquipment} gameDispatch={gameDispatch}
                lootDrop={gameState.lootDrop} lootDropTwo={gameState.lootDropTwo} itemSaved={gameState.itemSaved} mapDispatch={mapDispatch} mapState={mapState}
             />
        </Container>
    );
};

export default GameSolo;