import { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import PvPConditions from '../../components/GameCompiler/PvPConditions';
import PvPActions from '../../components/GameCompiler/PvPActions';
import { ACTIONS, PvPData, PlayerData } from '../../components/GameCompiler/PvPStore';
import { Enemy, GAME_ACTIONS, NPC, Player } from '../../components/GameCompiler/GameStore';
import useGameSounds from '../../components/GameCompiler/Sounds';
import { MAP_ACTIONS, DIRECTIONS, MapData, debounce, getAsceanGroupCoords } from '../../components/GameCompiler/WorldStore';
import GameMap from '../../components/GameCompiler/GameMap';
import CombatOverlay from '../../components/GameCompiler/CombatOverlay';
import * as asceanAPI from '../../utils/asceanApi';
import * as eqpAPI from '../../utils/equipmentApi';
import * as mapAPI from '../../utils/mapApi';
import LevelUpModal from '../../components/GameCompiler/LevelUpModal';
import PvPDialogBox from '../../components/GameCompiler/PvPDialogBox';
import GameAnimations from '../../components/GameCompiler/GameAnimations';
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import InventoryBag from '../../components/GameCompiler/InventoryBag';
import StoryBox from '../../components/GameCompiler/StoryBox';
import PvPCityBox from '../../components/GameCompiler/PvPCityBox';
import Joystick from '../../components/GameCompiler/Joystick';
import GameplayOverlay from '../../components/GameCompiler/GameplayOverlay';
import GameplayEventModal from '../../components/GameCompiler/GameplayEventModal';
import { Merchant } from '../../components/GameCompiler/NPCs';
import PvPAscean from '../../components/GameCompiler/PvPAscean';
import Settings from '../../components/GameCompiler/Settings';
import SpectatorOverlay from '../../components/GameCompiler/SpectatorOverlay';
import userService from '../../utils/userService';
import { shakeScreen } from '../../components/GameCompiler/CombatStore';
import { getNpcDialog } from '../../components/GameCompiler/Dialog';
import pako from 'pako';

export enum MapMode {
    FULL_MAP,
    QUADRANT,
    SURROUNDING_TILES,
    TIGHT,
};

interface GameProps {
    state: PvPData;
    dispatch: any;
    playerState: PlayerData;
    playerDispatch: any;
    mapState: MapData;
    mapDispatch: any;
    gameState: any;
    gameDispatch: any;
    specState: PvPData;
    specDispatch: any;
    user: any;
    ascean: Player;
    enemy: Enemy;
    room: any;
    socket: any;
    setModalShow: any;
    spectator: boolean;
    getAsceanCoords: (x: number, y: number, map: any) => Promise<any>;
    generateWorld: (mapName: string) => Promise<void>;
    handleSocketEvent: (event: string, callback: Function) => void;
    instantUpdate: (response: any) => Promise<void>;
    statusUpdate: (response: any) => Promise<void>;
    softUpdate: (response: any) => Promise<void>;
    handlePlayerWin: (combatData: PvPData) => Promise<void>;
    handleEnemyWin: (combatData: PvPData) => Promise<void>;
    handleInitiate: (pvpState: PvPData) => Promise<void>;
    handlePvPInitiate: (pvpState: PvPData) => Promise<void>;
    handleInstant: (e: { preventDefault: () => void; }) => Promise<void>;
    handlePvPInstant: (e: { preventDefault: () => void; }) => Promise<void>;
    handlePrayer: (e: { preventDefault: () => void; }) => Promise<void>;
    handlePvPPrayer: (e: { preventDefault: () => void; }) => Promise<void>;
    clearOpponent: () => Promise<void>;
    emergencyText: any[];
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    moveTimer: number;
    setMoveTimer: React.Dispatch<React.SetStateAction<number>>;
    asceanState: any;
    setAsceanState: React.Dispatch<React.SetStateAction<any>>;
    getOpponent: (player: Player) => Promise<void>;
    getNPCDialog: (enemy: string) => Promise<void>;
    autoAttack: (combatData: PvPData) => Promise<void>;
};

const GamePvP = ({ handleSocketEvent, state, dispatch, playerState, playerDispatch, mapState, mapDispatch, gameState, gameDispatch, specState, specDispatch, asceanState, setAsceanState, autoAttack, getOpponent, getNPCDialog, emergencyText, setEmergencyText, moveTimer, setMoveTimer, timeLeft, setTimeLeft, clearOpponent, handleInitiate, handlePvPInitiate, handleInstant, handlePvPInstant, handlePrayer, handlePvPPrayer, instantUpdate, statusUpdate, softUpdate, handleEnemyWin, handlePlayerWin, getAsceanCoords, generateWorld, user, ascean, enemy, spectator, room, socket, setModalShow }: GameProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { playWO, playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9, playMerchant, playDungeon, playPhenomena, playTreasure, playActionButton, playOpponent } = useGameSounds(gameState.soundEffectVolume);
    type Direction = keyof typeof DIRECTIONS;
    const [background, setBackground] = useState<any | null>({
        background: ''
    });
    const [moveTimerDisplay, setMoveTimerDisplay] = useState<number>(moveTimer);

    const compressData = async (data: any) => {
        try {
            const stringifiedData = JSON.stringify(data);
            const compressedData = pako.deflate(stringifiedData, { to: 'string' });
            return compressedData;
        } catch (err: any) {
            console.log(err, "Error Compressing Data");
        };
    };

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
            if (mapState.contentMoved === true || checkPlayerTiles(mapState) || checkPvP(mapState)) return;
            const timer = setTimeout(() => {
                if (moveTimer === 0 && mapState.steps > 0 && playerState.playerOne?.user?._id === user._id) {
                    console.log("Player One Moving Content");
                    mapDispatch({ type: MAP_ACTIONS.SET_MOVE_CONTENT, payload: mapState });
                    setMoveTimer(gameState.moveTimer);
                };
            }, moveTimer);
            return () => clearTimeout(timer);
        }, [moveTimer, mapState]);
    };
    useMoveTimerEffect(mapState);

    const useContentMovedEffect = (mapState: MapData) => {
        useEffect(() => {
            if (mapState.contentMoved) {
                console.log("Player One Syncing Content");
                mapDispatch({ type: MAP_ACTIONS.SET_MAP_MOVED, payload: false });
                const movedContent = async (map: MapData) => {
                    const data = { preMovedTiles: map.preMovedTiles, postMovedTiles: map.postMovedTiles };
                    const compressedMap = await compressData(data);
                    await socket.emit('syncMapContent', compressedMap);
                };
                movedContent(mapState);
            };
        }, [mapState.contentMoved]);
    };
    useContentMovedEffect(mapState);

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
                    setBackground({ ...background, 'background': getPlayerBackground.background });
                };
                gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: '' });
                mapDispatch({ type: MAP_ACTIONS.SET_MAP_CONTEXT, payload: "You continue moving through your surroundings and find nothing of interest in your path, yet the world itself seems to be watching you." });
            };
            if (checkPlayerTrait("Kyn'gian") && mapState.steps % 10 === 0) {
                mapDispatch({ type: MAP_ACTIONS.SET_MAP_CONTEXT, payload: "The blood of the Tshios course through your veins." });
                dispatch({ type: ACTIONS.PLAYER_REST, payload: 1 });
            };
            if (checkPlayerTrait("Shrygeian") && mapState.steps % 10 === 0) {
                const chance = Math.floor(Math.random() * 101);
                if (chance > 90) {
                    mapDispatch({ type: MAP_ACTIONS.SET_MAP_CONTEXT, payload: "The blood of Shrygei runs through your veins, you are able to sing life into the land." });
                    getTreasure();
                };                
            };

        }, [mapState.steps]);
    };
    usePlayerMovementEffect(mapState, mapDispatch);

    const checkPlayerTrait = (trait: string) => {
        if (gameState.primary.name.includes(trait) || gameState.secondary.name.includes(trait) || gameState.tertiary.name.includes(trait)) return true;
        return false;
    };


    function checkPvP(mapData: MapData) {
        const players = [mapData?.player1Tile, mapData?.player2Tile, mapData?.player3Tile, mapData?.player4Tile];
        return checkPlayerPvP(players[0], players[1], players[2], players[3]);
    };

    function checkPlayerPvP(player1: any, player2: any, player3: any, player4: any) {
        if (
          (player1 && player2 && player1.x === player2.x && player1.y === player2.y) ||
          (player1 && player3 && player1.x === player3.x && player1.y === player3.y) ||
          (player1 && player4 && player1.x === player4.x && player1.y === player4.y) ||
          (player2 && player3 && player2.x === player3.x && player2.y === player3.y) ||
          (player2 && player4 && player2.x === player4.x && player2.y === player4.y) ||
          (player3 && player4 && player3.x === player4.x && player3.y === player4.y)
        ) {
          console.log("Returning True");
          return true;
        } else {
          console.log("Returning False");
          return false;
        };
    };
      

    function checkPlayerTiles(mapData: MapData) {
        const players = [mapData?.player1Tile, mapData?.player2Tile, mapData?.player3Tile, mapData?.player4Tile];
        let combat = 0;
        players.forEach((player: any) => {
            if (checkEnemies(player?.x, player?.y, mapData)) {
                combat += 1;
            };
        });
        return Boolean(combat);
    };
      
    function checkEnemies(x: number, y: number, map: MapData) {
        const tile = map?.map?.[x + 100]?.[y + 100];
        return tile?.content === 'enemy';
    };

    const saveWorld = async () => {
        try {
            const response = await mapAPI.saveNewMap(mapState);
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA,
                payload: response
            });
            gameDispatch({ type: GAME_ACTIONS.SET_SAVE_WORLD, payload: `Good luck, ${ascean.name}, for no Ancient bears witness to it on your journey. Ponder what you wish to do in this world, without guidance but for your hands in arms. \n\n Enemies needn't stay such a way, yet a Good Lorian is a rare sight. Be whom you wish and do what you will, live and yearn for wonder in the ley, or scour cities if you have the coin. Pillage and strip ruins of their refuse, clear caves and dungeons of reclusive mercenaries, knights, druids, occultists, and more. \n\n The world doesn't need you, the world doesn't want you. The world's heroes are long dead since the Ancients fell. Many have sought to join these legends best they could, and in emulation have erected the Ascea, a season's long festival of athletic, intellectual, and poetic competition judged in the manner of the Ancients before; an Ascean, worthy, vying to be crowned the va'Esai and become revered across the land as 'Worthy of the Preservation of Being.' \n\n Whatever you seek in this world, if you wish it so, it starts with the Ascea.`})
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
                ascean: ascean._id, 
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
        let weapons: any[];
        weapons = state.weapons;
        const findWeapon = weapons.filter(
            (weap: { name: any; }) => weap?.name === weapon.target.value
        );
        const newWeaponOrder = async () => weapons.sort((a: any, b: any) => {
            return (
                a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0
            );
        });
        const response = await newWeaponOrder();
        dispatch({
            type: ACTIONS.SET_WEAPON_ORDER,
            payload: response
        });
        setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
        playWO();
    }

    async function setDamageType(damageType: any) {
        dispatch({
            type: ACTIONS.SET_DAMAGE_TYPE,
            payload: damageType.target.value
        });
        setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
        playWO();
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
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You reflect on the moments of your duel with ${enemy.name} as you count your pouch of winnings.` });
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
            const cleanRes = await asceanAPI.getCleanAscean(state.player._id);
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
                'opponent': enemy.level,
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

    useEffect(() => {
        if (gameState.itemSaved === false) return;
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
        };
    }, [gameState, gameState.itemSaved]);

    useEffect(() => {
        if (gameState.eqpSwap === false) return;
        getAsceanAndInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.EQP_SWAP, payload: false });
        };
    }, [gameState, gameState.eqpSwap]);

    useEffect(() => {
        if (gameState.removeItem === false) return;
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.REMOVE_ITEM, payload: false });
        };
    }, [gameState, gameState.removeItem]);

    useEffect(() => {
        if (gameState.purchasingItem === false) return;
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SET_PURCHASING_ITEM, payload: false });

        };
    }, [gameState, gameState.purchasingItem]);

    useEffect(() => {
        if (gameState.repositionInventory === false) return;
        console.log("Repositioning Inventory", gameState.repositionInventory)
        getOnlyInventory();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.REPOSITION_INVENTORY, payload: false });
        };
    }, [gameState, gameState.repositionInventory]);

    useEffect(() => {
        if (gameState.saveQuest === false) return;
        getAsceanQuests();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SAVE_QUEST, payload: false });
        };
    }, [gameState.saveQuest]);

    const deleteEquipment = async (eqp: any) => {
        try {
            await eqpAPI.deleteEquipment(eqp);
        } catch (err) {
            console.log(err, 'Error!');
        };
    };

    const getAsceanLeveled = async () => {
        try {
            const firstResponse = await asceanAPI.getCleanAscean(ascean._id);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_LEVEL_UP, payload: firstResponse.data });
            const response = await asceanAPI.getAsceanStats(ascean._id);
            dispatch({ type: ACTIONS.SET_PLAYER_LEVEL_UP, payload: response.data.data });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Leveled');
        };
    };

    const getAsceanQuests = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanQuests(ascean._id);
            gameDispatch({ type: GAME_ACTIONS.SET_QUESTS, payload: firstResponse });
            const response = await asceanAPI.getAsceanStats(ascean._id);
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const getAsceanInventory = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanInventory(ascean._id);
            gameDispatch({ type: GAME_ACTIONS.SET_INVENTORY, payload: firstResponse });
            const response = await asceanAPI.getAsceanStats(ascean._id);
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
            const firstResponse = await asceanAPI.getAsceanAndInventory(ascean._id);
            gameDispatch({ type: GAME_ACTIONS.SET_ASCEAN_AND_INVENTORY, payload: firstResponse.data });
            const response = await asceanAPI.getAsceanStats(ascean._id);
            dispatch({ type: ACTIONS.SET_PLAYER_SLICK, payload: response.data.data });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        };
    };

    const getOnlyInventory = async () => {
        try {
            const firstResponse = await asceanAPI.getAsceanInventory(ascean._id);
            console.log(firstResponse, "Ascean Inventory ?")
            gameDispatch({ type: GAME_ACTIONS.SET_INVENTORY, payload: firstResponse });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const resetAscean = async () => {
        try {
            await socket.emit(`request_reduel`, state);
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        };
    };

    const chanceEncounter = async (content: string) => {
        try {
            const chance = Math.floor(Math.random() * 100) + 1;
            console.log(chance, 'Chance Encounter');
            switch (content) {
                case 'cave': {
                    if (chance > 98) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                        await getTreasure();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 2000)
                    } else if (chance > 96) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
                        await getOpponent(ascean);
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
                        await getOpponent(ascean);
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
                        await getOpponent(ascean);
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
                        }, 2000);
                    } else if (chance > 98) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
                        await getOpponent(ascean);
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
                        if (gameState.storyContent !== '') gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: '' }); 
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
                        }, 2000);
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
                type: ACTIONS.SET_NEW_ENEMY,
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
    
    const interactPhenomena = async () => {
        try {
            const caeren = state?.player_attributes?.totalCaeren;
            const level = gameState?.player?.level;
            const initialIntensity = level * caeren / 10;
            const maxIntensity = level * caeren;
            const healCurse = async () => {
                const chance = Math.floor(Math.random() * 101);
                if (chance > 33) {
                    dispatch({ type: ACTIONS.PLAYER_REST, payload: initialIntensity });
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You heal for ${Math.round(initialIntensity * 0.01 * state?.player_health)}, a small respite from the harsh tones of your surroundings.` });
                } else {
                    dispatch({ type: ACTIONS.PLAYER_REST, payload: -initialIntensity });
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You snap back in pain, its sensation coursing through you for ${Math.round(initialIntensity * 0.01 * state?.player_health)}.` });
                };
            };

            const trickster = async (ascean: Player) => {
                const chance = Math.floor(Math.random() * 101);
                if (chance + level > 75) {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `A light pool of caeren juts out into you, increasing your experience by ${maxIntensity + ascean.kyosir}.` });
                    const response = await asceanAPI.setExperience({ asceanID: ascean._id, experience: (maxIntensity + ascean.kyosir) });
                    dispatch({ type: ACTIONS.SET_EXPERIENCE, payload: response });
                    gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
                } else if (chance + level > 50) {
                    await getTreasure();
                } else if (chance + level > 25) {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `The faint stain of Kyosir billows from its writhing tendrils and you suddenly feel lighter to the tune of ${maxIntensity}s.` });
                    const response = await asceanAPI.setCurrency({ asceanID: ascean._id, currency: maxIntensity });
                    dispatch({ type: ACTIONS.SET_CURRENCY, payload: response.currency });
                    gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_CURRENCY, payload: response.currency });
                } else {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `A murky pool of caeren juts out to leech you, decreasing your experience by ${maxIntensity - ascean.kyosir}.` });
                    const response = await asceanAPI.setExperience({ asceanID: ascean._id, experience: -(maxIntensity - ascean.kyosir) });
                    dispatch({ type: ACTIONS.SET_EXPERIENCE, payload: response });
                    gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
                };
            };

            const returnPhenomena = async () => {
                const chance = Math.floor(Math.random() * 101);
                if (chance - level > 66) {
                    await healCurse();
                } else if (chance - level > 33) {
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
            
            await returnPhenomena();
            mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
            const compressedTile = await compressData(mapState.currentTile);
            await socket.emit('newEnvironmentTile', compressedTile);
        } catch (err: any) {
            console.log(err, "Error Interacting With Phenomena");
        };
    };

    const getPhenomena = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        playPhenomena();
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
            dispatch({ type: ACTIONS.SET_NEW_ENEMY, payload: { enemy: response.data.data, playerState: playerState } });
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
        if (gameState.cityButton) gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        gameDispatch({ type: GAME_ACTIONS.SET_GAMEPLAY_EVENT, payload: {
            title: "Treasure!",
            description: `${ascean.name}, you've come across some leftover spoils or treasure, either way its yours now if you desire.`,
        } });
        await getOneLootDrop(ascean.level + 4);
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
        if (gameState.cityButton) gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        await chanceEncounter('ruins');
    };

    const getDungeon = async () => {
        playDungeon();
        if (gameState.cityButton) gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        await chanceEncounter('dungeon');
    };

    const getCity = async () => {
        // setBackground(getCityBackground);
        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You walk up to the edges of an open city, some structure of wall exists but is overall porous. Here, you may find services to aid and replenish your journey.` });
                
        setBackground({
            ...background,
            'background': getCityBackground.background
        });
        gameDispatch({ type: GAME_ACTIONS.SET_ENTER_CITY, payload: `You're now in a local city of the province. Using the City button, you can access the city's services and shops.`});
        setTimeout(() => {
            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
        }, 4000);
    };

    const handleTileContent = async (content: string, lastContent: string) => {
        if (lastContent === 'city' && content !== 'city') {
            setBackground({
                ...background,
                'background': getPlayerBackground.background
            });
        };
        if (content === 'city' && lastContent === 'city') return;
        if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
        try {
            switch (content) {
                case 'enemy': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted a stranger whose reaction appears defensive.` });
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted a stranger to your presence. They appear to be approaching you now. \n\n May you be sure, ${gameState?.player?.name}.` });
                    await getOpponent(ascean);
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
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You're unsure of what there is to witness, yet feel its tendrils beckoning. Do you wish to enter?` });
                    await getPhenomena();
                    break;
                };
                case 'wonder': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Natural wonders of the world environment, may grant boons or blessings when encountered, or perhaps be where enemies or npc's congregate` });
                    await getWonder(); 
                    break;
                };
                case 'ruins': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Decay of civilizations from the past, may have scavengers or treasure probabilistically determined` });
                    await getRuins();
                    break;
                };
                case 'cave': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Caves appear abundant, with many adventurers seeking untold stories that lay waiting to be discovered. Curious why there aren't more folk interested` });
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
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Man-made landmarks, may have treasure, enemies, or npc's congregating` });
                    await getLandmark();
                    break;
                };
                case 'hazard': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Natural hazards of the environment that when encountered, cause harmful effects akin to curses` });
                    await getHazard();
                    break;
                };
                case 'dungeon': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Dungeons may refer to old, abandoned settlements sunk into this world. There may also be another reason` });
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

    const getOpponentDialog = async (enemy: string) => {
        try {
            const response = getNpcDialog(enemy);
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    useEffect(() => {
        if (gameState.lootRoll === false || state.player_win === false) return;
        getOneLootDrop(state.enemy.level);
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
        } catch (err: any) {
            console.log(err.message, 'Error Getting Loot Drop');
        };
    };

    const handleDirectionChange = async (direction: Direction, mapData: MapData) => {
        const offset = DIRECTIONS[direction];
        if (offset) {
            const newX = mapData.currentTile.x + offset.x;
            const newY = mapData.currentTile.y + offset.y;
            if (newX >= -100 && newX <= 100 && newY >= -100 && newY <= 100) {
                const newTile = await getAsceanCoords(newX, newY, mapData.map);
                const newTiles = await getAsceanGroupCoords(newX, newY, mapData.map);
                const data = {
                    newTile: newTile,
                    oldTile: mapData.currentTile,
                    newTiles: newTiles,
                    map: mapData,
                };
                const socketData = {
                    newTile: newTile,
                    oldTile: mapData.currentTile,
                    newTiles: newTiles,
                    player: state.playerPosition
                };
                if (newTile.content === 'enemy' || newTile.content === 'npc') mapDispatch({ type: MAP_ACTIONS.SET_JOYSTICK_DISABLED, payload: true });
                const compressedSocketData = await compressData(socketData);
                await socket.emit(`playerDirectionChange`, compressedSocketData);
                mapDispatch({ type: MAP_ACTIONS.SET_NEW_MAP_COORDS, payload: data });
                const options = [playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9];
                const random = Math.floor(Math.random() * options.length);
                options[random]();
                if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            };
        };
    };
      
    const debouncedHandleDirectionChange = debounce(handleDirectionChange, gameState.joystickSpeed);

    useEffect(() => {
        if (gameState?.player?.origin && background.background === '') {
            setBackground({
                ...background,
                'background': getPlayerBackground.background
            });
        };
    }, [gameState?.player]);
    
    const getPlayerBackground = {
        background: "url(" + getBackgroundStyle(gameState?.player?.origin) + ")",
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

    const getMarginTop = () => {
        const height = window.innerHeight;
        switch (true) {
          case height < 700:
            return "-95%";
          case height < 805:
            return "-90%";
          case height < 851:
            return "-42.5%";
          case height < 900:
            return "-45%";
          case height < 992:
            return "-45%";
          case height < 1200:
            return "-45%";
          case height < 1400:
            return "-45%";
          case height < 1600:
            return "-45%";
          case height < 1800:
            return "-45%";
          case height < 2000:
            return "-45%";
          case height >= 2000:
            return "-45%";
          default:
            return 1;
        };
    };

    const getMarginLeft = () => {
        const width = window.innerWidth;
        switch (true) {
          case width < 416:
            return "50%";
          case width < 468:
            return "45%";
          case width < 500:
            return "45%";
          case width < 592:
            return "45%";
          case width < 700:
            return "45%";
          case width < 800:
            return "45%";
          case width < 900:
            return "45%";
          case width < 1000:
            return "45%";
          case width < 1200:
            return "45%";
          case width >= 1400:
            return "45%";
          default:
            return 1;
        };
    }

    const getRow = () => {
        const height = window.innerHeight;
        switch (true) {
          case height < 700:
            return 8;
          case height < 800:
            return 8;
          case height < 900:
            return 8;
          case height < 992:
            return 8;
          case height < 1200:
            return 8;
          case height < 1400:
            return 8;
          case height < 1600:
            return 8;
          case height < 1800:
            return 8;
          case height < 2000:
            return 8;
          case height >= 2000:
            return 8;
          default:
            return 1;
        };
    }

    const chatStyle = {
        borderRadius: "50%",
        marginTop: getMarginTop(),
        marginLeft: getMarginLeft(),
        zIndex: 100,
        gridColumnStart: 1,
        gridRowStart: getRow(),
    };

    return (
        <Container fluid id="game-container" style={background}>
        { enemy ? (
            <>
            <PvPAscean 
                state={state} dispatch={dispatch} ascean={enemy} damage={state.enemyDamaged} totalPlayerHealth={state.enemy_health} loading={gameState.loadingOpponent} player={false} currentPlayerHealth={state.new_enemy_health}
            /> 
            <CombatOverlay 
                ascean={ascean} enemy={enemy} playerWin={state.player_win} computerWin={state.enemy_win} playerCritical={state.critical_success} computerCritical={state.enemy_critical_success}
                playerAction={state.player_action} computerAction={state.enemy_action} playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_enemy_damage} 
                rollSuccess={state.roll_success} computerRollSuccess={state.enemy_roll_success} counterSuccess={state.counter_success} computerCounterSuccess={state.enemy_counter_success}
                loadingCombatOverlay={gameState.loadingCombatOverlay} combatResolved={gameState.combatResolved} combatOverlayText={gameState.combatOverlayText} gameDispatch={gameDispatch} combatEngaged={state.combatEngaged}
                playerLuckout={state.player_luckout}
            />
            </>
        ) : ( '' )}
            <PvPConditions setEmergencyText={setEmergencyText} dispatch={dispatch} state={state} playerState={playerState} timeLeft={timeLeft} setTimeLeft={setTimeLeft} autoAttack={autoAttack} />
            <Settings 
                inventory={ascean.inventory} ascean={ascean} dispatch={dispatch} currentTile={mapState.currentTile} saveAsceanCoords={saveAsceanCoords} 
                gameDispatch={gameDispatch}gameState={gameState} mapState={mapState} multiplayer={true}
            />
            { asceanState.ascean.experience >= asceanState.experienceNeeded ?
                <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
            : '' }
            <PvPAscean state={state} dispatch={dispatch} ascean={ascean} player={true} damage={state.playerDamaged} totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} loading={gameState.loadingAscean} />
        { state.combatEngaged ? (
            <>
                <GameAnimations 
                    playerCritical={state.critical_success} computerCritical={state.enemy_critical_success}
                    playerAction={state.player_action} computerAction={state.enemy_action} 
                    playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_enemy_damage} 
                    rollSuccess={state.roll_success} computerRollSuccess={state.enemy_roll_success} combatRound={state.combatRound}
                    counterSuccess={state.counter_success} computerCounterSuccess={state.enemy_counter_success} combatEngaged={state.combatEngaged}
                />
                <PvPActions 
                    setDamageType={setDamageType} dispatch={dispatch} state={state} handleInstant={handleInstant} handlePrayer={handlePrayer}
                    setPrayerBlessing={setPrayerBlessing} weapons={state.weapons} damageType={state.weapons[0].damage_type} setWeaponOrder={setWeaponOrder}
                    handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} gameState={gameState} gameDispatch={gameDispatch}
                    currentWeapon={state.weapons[0]} currentDamageType={state.player_damage_type} currentAction={state.action} currentCounter={state.counter_guess}
                    handlePvPInitiate={handlePvPInitiate} handlePvPInstant={handlePvPInstant} handlePvPPrayer={handlePvPPrayer}
                /> 
                <GameCombatText 
                    emergencyText={emergencyText} combatRoundText={state.combatRound}
                    playerCombatText={state.player_action_description} computerCombatText={state.enemy_action_description} 
                    playerActionText={state.player_start_description} computerActionText={state.enemy_start_description}
                    playerDeathText={state.player_death_description} computerDeathText={state.enemy_death_description}
                    playerSpecialText={state.player_special_description} computerSpecialText={state.enemy_special_description}
                    playerReligiousText={state.player_influence_description} computerReligiousText={state.enemy_influence_description}
                    playerReligiousTextTwo={state.player_influence_description_two} computerReligiousTextTwo={state.enemy_influence_description_two}
                />
            </>
        ) : (
            <>
                <GameMap mapData={mapState} canvasRef={canvasRef} gameDispatch={gameDispatch} gameState={gameState} />
                { gameState.showDialog ?    
                    <PvPDialogBox 
                        npc={enemy?.name} dialog={gameState.dialog} dispatch={dispatch} state={state} deleteEquipment={deleteEquipment} currentIntent={gameState.currentIntent}
                        playerWin={state.player_win} enemyWin={state.enemy_win} ascean={ascean} enemy={enemy} itemSaved={gameState.itemSaved}
                        winStreak={state.winStreak} loseStreak={state.loseStreak} highScore={state.highScore} lootDropTwo={gameState.lootDropTwo} mapState={mapState} mapDispatch={mapDispatch}
                        resetAscean={resetAscean} getOpponent={getOpponent} lootDrop={gameState.lootDrop} merchantEquipment={gameState.merchantEquipment} clearOpponent={clearOpponent}
                        gameDispatch={gameDispatch} gameState={gameState}
                    />
                : '' }
                { gameState.showInventory ?
                    <InventoryBag inventory={ascean.inventory} gameState={gameState} gameDispatch={gameDispatch} ascean={ascean} dispatch={dispatch} mapState={mapState}  />
                : ""}
                { enemy && mapState?.currentTile?.content !== 'city' ?
                    <Button variant='' className='dialog-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: !gameState.showDialog })}>Dialog</Button>
                : 
                    <>
                    <StoryBox ascean={ascean} mapState={mapState} storyContent={gameState.storyContent} moveTimer={moveTimer} interactPhenomena={interactPhenomena} />
                    <Joystick mapState={mapState} onDirectionChange={handleDirectionChange} debouncedHandleDirectionChange={debouncedHandleDirectionChange} joystickDisabled={mapState.joystickDisabled} />
                    <Button variant='' className='inventory-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_INVENTORY, payload: !gameState.showInventory })}>Inventory</Button>   
                    </>
                }
                { gameState.showCity ?
                    <PvPCityBox 
                        state={state} dispatch={dispatch} ascean={ascean} mapState={mapState} enemy={enemy} merchantEquipment={gameState.merchantEquipment}
                        inventory={ascean.inventory} getOpponent={getOpponent} resetAscean={resetAscean} deleteEquipment={deleteEquipment}
                        cityOption={gameState.cityOption} clearOpponent={clearOpponent} gameDispatch={gameDispatch} gameState={gameState}
                    />
                : '' }
                { gameState.cityButton || mapState?.currentTile?.content === 'city' ?
                    <Button variant='' className='city-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_CITY, payload: !gameState.showCity })}>City</Button>
                : '' }
            </>
        )}
            <Button variant='' style={chatStyle} onClick={() => setModalShow(true)}>
            { spectator ?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile-upside-down" viewBox="0 0 16 16">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0-1a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
                    <path d="M4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5z"/>
                </svg>
            : 
                <img src={process.env.PUBLIC_URL + `/images/` + ascean.origin + '-' + ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "10vw", borderRadius: "50%", border: "2px solid purple" }} />
            }
            </Button>
            <SpectatorOverlay
                ascean={ascean} mapState={mapState} mapDispatch={mapDispatch} loadingSpectator={gameState.loadingSpectator} gameDispatch={gameDispatch} state={specState} dispatch={specDispatch} 
                emergencyText={emergencyText} setEmergencyText={setEmergencyText} playerState={playerState} gameState={gameState} setModalShow={setModalShow}
            />
            <GameplayOverlay 
                ascean={ascean} mapState={mapState} mapDispatch={mapDispatch} loadingOverlay={gameState.loadingOverlay}
                generateWorld={generateWorld} saveWorld={saveWorld} overlayContent={gameState.overlayContent}
                loadingContent={gameState.loadingContent} gameDispatch={gameDispatch} getAsceanCoords={getAsceanCoords}
            />
            <GameplayEventModal 
                ascean={ascean} show={gameState.gameplayModal} gameplayEvent={gameState.gameplayEvent} deleteEquipment={deleteEquipment} gameDispatch={gameDispatch}
                lootDrop={gameState.lootDrop} lootDropTwo={gameState.lootDropTwo} itemSaved={gameState.itemSaved} mapDispatch={mapDispatch} mapState={mapState}
             />
        </Container>
    );
};

export default GamePvP;
