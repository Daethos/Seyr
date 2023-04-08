import { useEffect, useState, useReducer, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { getNpcDialog } from '../../components/GameCompiler/Dialog';
import Button from 'react-bootstrap/Button';
import InventoryBag from '../../components/GameCompiler/InventoryBag';
import { GAME_ACTIONS, GameStore, initialGameData, Enemy } from '../../components/GameCompiler/GameStore';
import { ACTIONS, CombatStore, initialCombatData, CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import { MAP_ACTIONS, MapStore, initialMapData, DIRECTIONS, debounce, getAsceanCoords, getAsceanGroupCoords } from '../../components/GameCompiler/WorldStore';
import Settings from '../../components/GameCompiler/Settings';
import Joystick from '../../components/GameCompiler/Joystick';
import Coordinates from '../../components/GameCompiler/Coordinates';
import GameplayEventModal from '../../components/GameCompiler/GameplayEventModal';
import GameplayOverlay from '../../components/GameCompiler/GameplayOverlay';
import Content from '../../components/GameCompiler/Content';
import StoryBox from '../../components/GameCompiler/StoryBox';
import CombatOverlay from '../../components/GameCompiler/CombatOverlay';
import GameMap from '../../components/GameCompiler/GameMap';
import { Bear, Wolf } from '../../components/GameCompiler/Animals';
import useGameSounds from '../../components/GameCompiler/Sounds';

export enum MapMode {
    FULL_MAP,
    QUADRANT,
    SURROUNDING_TILES,
    TIGHT,
};

interface GameProps {
    user: any;
};

const HardCoreAscea = ({ user }: GameProps) => {
    const { asceanID } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [mapState, mapDispatch] = useReducer(MapStore, initialMapData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [emergencyText, setEmergencyText] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [moveTimer, setMoveTimer] = useState<number>(6)
    const [background, setBackground] = useState<any | null>({
        background: ''
    });
    const { playOpponent, playWO, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReplay, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9, playMerchant, playDungeon, playPhenomena, playTreasure, playActionButton, playCombatRound } = useGameSounds(gameState.soundEffectVolume);
    type Direction = keyof typeof DIRECTIONS;


    const [asceanState, setAsceanState] = useState({
        ascean: gameState.player,
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
                const [gameStateResponse, combatStateResponse, settingsResponse] = await Promise.all([
                    asceanAPI.getOneAscean(asceanID),
                    asceanAPI.getAsceanStats(asceanID),
                    settingsAPI.getSettings(),
                ]);
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: gameStateResponse.data });
                dispatch({
                    type: ACTIONS.SET_PLAYER,
                    payload: combatStateResponse.data.data
                });
                setAsceanState({
                    ...asceanState,
                    'ascean': combatStateResponse.data.data.ascean,
                    'level': combatStateResponse.data.data.ascean.level,
                    'opponent': 0,
                    'experience': 0,
                    'experienceNeeded': combatStateResponse.data.data.ascean.level * 1000,
                    'mastery': combatStateResponse.data.data.ascean.mastery,
                    'faith': combatStateResponse.data.data.ascean.faith,
                });
                gameDispatch({ type: GAME_ACTIONS.SET_GAME_SETTINGS, payload: settingsResponse });
                gameDispatch({ type: GAME_ACTIONS.LOADING, payload: false });
                gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            } catch (err: any) {
                console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
            };
        };
        fetchData();
    }, [asceanID]);

    const [moveTimerDisplay, setMoveTimerDisplay] = useState<number>(moveTimer);

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

    useEffect(() => {
        if (mapState.currentTile.content === 'enemy') return;
        const timer = setTimeout(() => {
            if (moveTimer === 0 && mapState?.steps > 0) {
                mapDispatch({ type: MAP_ACTIONS.SET_MOVE_CONTENT, payload: mapState });
                setMoveTimer(gameState.moveTimer);
            }
        }, moveTimer);
        return () => clearTimeout(timer);
    }, [moveTimer, mapState]);

    const getOpponentDialog = async (enemy: string) => {
        try {
            const response = getNpcDialog(enemy);
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    const getOpponent = async () => {
        gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        try {
            let minLevel: number = 0;
            let maxLevel: number = 0;
            const chance = Math.random();
            setTimeout(() => { dispatch({ type: ACTIONS.AUTO_ENGAGE, payload: !state.gameIsLive }); }, 4000);
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
                };
            };
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
            } else if (gameState.player.level === 5) { // 5
                minLevel = 4;
                maxLevel = 6;
            } else if (gameState.player.level === 6) { // 6
                minLevel = 4;
                maxLevel = 8;
            } else if (gameState.player.level <= 8) { // 7-8
                minLevel = 6;
                maxLevel = 10;
            } else if (gameState.player.level <= 10) { // 9-10
                minLevel = 6;
                maxLevel = 12;
            } else if (gameState.player.level <= 14) { // 11-14
                minLevel = 8;
                maxLevel = 20;
            } else if (gameState.player.level <= 18) { // 15-18
                minLevel = 12;
                maxLevel = 25;
            } else if (gameState.player.level <= 20) {
                minLevel = 16;
                maxLevel = 30;
            };
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
            dispatch({
                type: ACTIONS.SET_DUEL,
                payload: ''
            });
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
        if (gameState.saveExp === false) return;
        console.log(asceanState, 'Ascean State');
        saveExperience();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: false });
        };
    }, [asceanState, gameState.saveExp]);

    const saveExperience = async () => {
        if (gameState.saveExp === false || state.player_win === false) {
            return;
        };
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
                    'experience': asceanState.experienceNeeded,
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
            if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'experience': Math.round(asceanState.experience + opponentExp),
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error Gaining Experience')
        };
    };

    useEffect(() => {
        if (gameState.itemSaved === false) return;
        console.log("Saving Item", gameState.itemSaved)
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
        };
    }, [gameState, gameState.itemSaved]);

    useEffect(() => {
        if (gameState.eqpSwap === false) return;
        console.log("Swapping Equipment", gameState.eqpSwap)
        getAsceanAndInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.EQP_SWAP, payload: false });
        };
    }, [gameState, gameState.eqpSwap]);

    useEffect(() => {
        if (gameState.removeItem === false) return;
        console.log("Removing Item", gameState.removeItem)
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.REMOVE_ITEM, payload: false });
        };
    }, [gameState, gameState.removeItem]);

    useEffect(() => {
        if (gameState.repositionInventory === false) return;
        console.log("Repositioning Inventory", gameState.repositionInventory)
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.REPOSITION_INVENTORY, payload: false });
        };
    }, [gameState, gameState.repositionInventory]);

    const deleteEquipment = async (eqp: any) => {
        try {
            const response = await eqpAPI.deleteEquipment(eqp);
            console.log(response, 'Delete Response!');
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

    const getAsceanInventory = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanInventory(asceanID);
            console.log(firstResponse, "Ascean Inventory ?");
            gameDispatch({ type: GAME_ACTIONS.SET_INVENTORY, payload: firstResponse });
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        };
    };

    const getAsceanAndInventory = async () => {
        try {
            console.log("Getting Ascean and Inventory");
            const firstResponse = await asceanAPI.getAsceanAndInventory(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_ASCEAN_AND_INVENTORY, payload: firstResponse.data });
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        };
    };

    const getOnlyInventory = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanInventory(asceanID);
            console.log(firstResponse, "Ascean Inventory ?")
            gameDispatch({ type: GAME_ACTIONS.SET_INVENTORY, payload: firstResponse });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const clearOpponent = async () => {
        try {
            if (mapState.currentTile.content === 'enemy' && state.new_computer_health <= 0) {
                mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
            };
            setTimeout(() => {
                dispatch({ type: ACTIONS.CLEAR_DUEL, payload: null });
                gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: null });
            }, 500);
        } catch (err: any) {
            console.log(err.message, 'Error Clearing Duel');
        };
    };

    const saveWorld = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.SET_SAVE_WORLD, payload: `Good luck, ${gameState.player.name}, for no Ancient bears witness to it on your journey. Ponder what you wish to do in this world, without guidance but for your hands in arms as you encounter mercenaries, knights, druids, occultists, and more \n\n The world doesn't need you, the world doesn't want you. The world's heroes are long dead since the Ancients fell. Many have sought to join these legends best they could, and in emulation have erected the Ascea, a season's long festival of athletic, intellectual, and poetic competition judged in the manner of the Ancients before; an Ascean, worthy, vying to be crowned the va'Esai and become revered across the land as 'Worthy of the Preservation of Being.' Those who are of consideration in earnest must triumph in the grand melee. \n\n Whatever you seek in this world, if you wish it so, it starts with the Ascea.`})
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
            console.log(response, 'Response Saving Ascean Coordinates');
        } catch (err: any) {
            console.log(err.message, 'Error Saving Ascean Coordinates');
        };
    };

    const generateWorld = async (mapName: string) => {
        mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: true });
        try {
            const data = { name: mapName, ascean: gameState.player };
            const response = await mapAPI.arenaMap(data);
            //TODO:FIXME: GET ARENA MAP
            console.log(response, 'Response Generating World Environment.');
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA,
                payload: response
            });
            const coords = await getAsceanCoords(0, 0, response.map);
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_COORDS,
                payload: coords,
            });
            mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error Generating World Environment.');
        };
    };

    const chanceEncounter = async (content: string) => {
        try {
            const chance = Math.floor(Math.random() * 100) + 1;
            console.log(chance, 'Chance Encounter');
            switch (content) {
                case 'weather': {
                    if (chance > 99) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                        await getTreasure();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000)
                    } else if (chance > 98) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000);
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
                default: {
                    break;
                };
            };

        } catch (err: any) {
            console.log(err.message, 'Error Encountering Chance Encounter');
        };
    };

    const handleDirectionChange = async (direction: Direction) => {
        const offset = DIRECTIONS[direction];
        if (offset) {
            const newX = mapState.currentTile.x + offset.x;
            const newY = mapState.currentTile.y + offset.y;
            if (newX >= -100 && newX <= 100 && newY >= -100 && newY <= 100) {
                const newTile = await getAsceanCoords(newX, newY, mapState.map);
                const newTiles = await getAsceanGroupCoords(newX, newY, mapState.map);
                const data = {
                    newTile: newTile,
                    oldTile: mapState.currentTile,
                    newTiles: newTiles,
                    map: mapState,
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

    const getPhenomena = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        playPhenomena();
    };

    const getWeather = async (province: string) => {
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

    const getTreasure = async () => {
        playTreasure();
        gameDispatch({ type: GAME_ACTIONS.SET_GAMEPLAY_EVENT, payload: {
            title: "Treasure!",
            description: `${gameState.player.name}, you've come across some leftover spoils or treasure, either way its yours now if you desire.`,
        } });
        await getOneLootDrop(gameState.player.level + 4);
        gameDispatch({ type: GAME_ACTIONS.SET_GAMEPLAY_MODAL, payload: true });
    };

    const handleTileContent = async (content: string) => {
        if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
        try {
            switch (content) {
                case 'enemy': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted a combatant whose reaction appears defensive.` });
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted a combatant to your presence. They appear to be approaching you now. \n\n May you be sure, ${gameState?.player?.name}.` });
                    await getOpponent();
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                    }, 3000);
                    break;
                };
                case 'phenomena': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You're unsure of what there is to witness, yet feel its tendrils beckoning. Do you wish to enter?` });
                    await getPhenomena();
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
                    }, 3000);
                    break;
                };
                default: {
                    console.log('No Content Found');
                    break;
                };
            };
        } catch (err: any) {
            console.log(err.message, 'Error Handling Tile Content');
        }
    };

    useEffect(() => {
        if (mapState?.currentTile?.content === 'nothing') {
            if (gameState.cityButton) {
                gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false });
                setBackground({
                    ...background,
                    'background': getPlayerBackground.background
                });
            };
            if (mapState.steps !== 2 && !mapState.contentMoved) {
                mapDispatch({ type: MAP_ACTIONS.SET_MOVE_CONTENT, payload: mapState });
            };
            gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: '' });
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_CONTEXT,
                payload: "You continue moving through the arena and find nothing of interest in your path, yet the combatants seem to be watching you despite their attention toward the other."
            });
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_MOVED,
                payload: false
            })
            return;
        };
        handleTileContent(mapState?.currentTile?.content);
    }, [mapState.currentTile, mapState.steps, mapState.currentTile.content]);

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
            if (roll <= 50) {
                let second = await eqpAPI.getLootDrop(level);
                gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP_TWO, payload: second.data[0] });
            } else {
                gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP_TWO, payload: null });
            };
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Loot Drop');
        };
    };

    useEffect(() => {
        if (state.highScore > gameState.player.high_score) {
            updateHighScore();
        } else {
            return;
        }
    }, [state.highScore]);

    const updateHighScore = async () => {
        try {
            await asceanAPI.highScore({
                'asceanId': gameState.player._id,
                'highScore': state.highScore
            });
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: firstResponse.data });
        } catch (err: any) {
            console.log(err.message, 'Error Updating High Score');
        };
    };

    function handleAction(action: any) {
        playActionButton();
        dispatch({
            type: ACTIONS.SET_COMBAT_ACTION,
            payload: action.target.value
        });
        setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
    };

    function handleCounter(counter: any) {
        playActionButton();
        dispatch({
            type: ACTIONS.SET_COMBAT_COUNTER,
            payload: counter.target.value
        });
        setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
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
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
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
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
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
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
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
                clearOpponent();
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

    async function handlePlayerWin(combatData: CombatData) {
        try {
            playWin();
            await gainExperience();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            setTimeout(() => {
                setTimeLeft(0);
                dispatch({
                    type: ACTIONS.PLAYER_WIN,
                    payload: combatData
                });
                if (gameState.opponent.name !== "Wolf" && gameState.opponent.name !== "Bear") {
                    getTreasure();
                };
                clearOpponent();
                mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
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
            if (response.data.player_win === true) {
                await handlePlayerWin(response.data);
            };
            if (response.data.computer_win === true) {
                await handleHardcoreDeath(response.data);
            };
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
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            const response = await gameAPI.instantAction(state);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            dispatch({
                type: ACTIONS.INSTANT_COMBAT,
                payload: response.data
            });
            if (response.data.player_win === true) {
                await handlePlayerWin(response.data);
            };
            shakeScreen();
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
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            const response = await gameAPI.consumePrayer(state);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            dispatch({
                type: ACTIONS.INITIATE_COMBAT,
                payload: response.data
            });
            if (response.data.player_win === true) {
                await handlePlayerWin(response.data);
            };
            shakeScreen();
            playReligion();
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
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
            <Loading Combat={true} />
        );
    };

    return (
        <Container fluid id="game-container" style={ background }>
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
                </>
            : '' }

            <GameConditions 
                setEmergencyText={setEmergencyText} dispatch={dispatch} state={state} soundEffects={soundEffects} vibrationTime={gameState.vibrationTime}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft} handlePlayerWin={handlePlayerWin} handleComputerWin={handleHardcoreDeath} gameState={gameState}
            />
            <Settings 
                inventory={gameState.player.inventory} ascean={gameState.player} dispatch={dispatch} currentTile={mapState.currentTile} saveAsceanCoords={saveAsceanCoords} 
                gameDispatch={gameDispatch} gameState={gameState} mapState={mapState}
            />
            { asceanState.ascean.experience === asceanState.experienceNeeded ?
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
            : 
                <>
                    <GameMap 
                        mapData={mapState} canvasRef={canvasRef} gameState={gameState} gameDispatch={gameDispatch}
                    />
                    { gameState.showInventory ?
                        <InventoryBag inventory={gameState.player.inventory} gameState={gameState} gameDispatch={gameDispatch} ascean={gameState.player} dispatch={dispatch} mapState={mapState}  />
                    : ""}
                    <StoryBox ascean={gameState.player} mapState={mapState} storyContent={gameState.storyContent} moveTimer={moveTimer} />
                    <Joystick onDirectionChange={handleDirectionChange} debouncedHandleDirectionChange={debouncedHandleDirectionChange} joystickDisabled={mapState.joystickDisabled} />
                    <Button variant='' className='inventory-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_INVENTORY, payload: !gameState.showInventory })}>Inventory</Button>   
                </>
            }
            { mapState?.currentTile ?
                <>
                <Coordinates mapState={mapState} />
                <Content mapState={mapState} />
                </>
            : '' }
            <GameplayOverlay 
                ascean={gameState.player} mapState={mapState} mapDispatch={mapDispatch} loadingOverlay={gameState.loadingOverlay}
                generateWorld={generateWorld} saveWorld={saveWorld} overlayContent={gameState.overlayContent}
                loadingContent={gameState.loadingContent} gameDispatch={gameDispatch} getAsceanCoords={getAsceanCoords}
            />
            <GameplayEventModal 
                ascean={gameState.player} show={gameState.gameplayModal} gameplayEvent={gameState.gameplayEvent} deleteEquipment={deleteEquipment} gameDispatch={gameDispatch}
                lootDrop={gameState.lootDrop} lootDropTwo={gameState.lootDropTwo} itemSaved={gameState.itemSaved} mapDispatch={mapDispatch} mapState={mapState}
             />
        </Container>
    );
};

export default HardCoreAscea;