import './PhaserGame.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Phaser from "phaser";
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilterpipeline-plugin.js';
// @ts-ignore
import { PhaserNavMeshPlugin } from 'phaser-navmesh';
import Boot from './Boot';
import Preload from './Preload';
import Menu from './Menu';
import Play from './Play';
import StoryAscean from '../ui/StoryAscean';
import * as asceanAPI from '../../utils/asceanApi';
import * as gameAPI from '../../utils/gameApi';
import * as eqpAPI from '../../utils/equipmentApi';
import userService from "../../utils/userService";
import Button from 'react-bootstrap/Button';
import { GAME_ACTIONS, NPC } from '../../components/GameCompiler/GameStore';
import { ACTIONS, CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import useGameSounds from '../../components/GameCompiler/Sounds'; 
import CombatMouseSettings from '../ui/CombatMouseSettings';
import CombatUI from '../ui/CombatUI';
import EnemyUI from '../ui/EnemyUI';
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import screenfull from 'screenfull';
import StoryJournal from '../../components/GameCompiler/StoryJournal';
import { StatusEffect } from '../../components/GameCompiler/StatusEffects'; 
import { LootDropUI } from '../ui/LootDropUI';
import { Merchant } from '../../components/GameCompiler/NPCs';
import { getNpcDialog } from '../../components/GameCompiler/Dialog';
import { StoryDialog } from '../ui/StoryDialog';
import { getNodesForNPC, npcIds } from '../../components/GameCompiler/DialogNode';
import EventEmitter from '../phaser/EventEmitter';

export const usePhaserEvent = (event: string, callback: any) => {
    useEffect(() => {
        EventEmitter.on(event, callback);
        return () => {
            EventEmitter.off(event, callback);
        };
    }, [event, callback]);
}; 

export const useKeyEvent = (event: string, callback: any) => {
    useEffect(() => { 
        const eventListener = (event: Event) => callback(event);
        window.addEventListener(event, eventListener);
        return () => {
            window.removeEventListener(event, eventListener);
        };
    }, [event, callback]);
}; 

interface Props {
    user: any; 
    state: any;
    dispatch: any;
    gameState: any;
    gameDispatch: any;
    asceanState: any;
    setAsceanState: React.Dispatch<React.SetStateAction<any>>;
    assets: any;
};

const HostScene = ({ user,state, dispatch, gameState, gameDispatch, asceanState, setAsceanState, assets }: Props) => {
    const { asceanID } = useParams();
    const { playOpponent, playWO, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReplay, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9, playMerchant, playDungeon, playPhenomena, playTreasure, playActionButton, playCombatRound } = useGameSounds(gameState.soundEffectVolume);
    const [currentGame, setCurrentGame] = useState<any>(false);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [pauseState, setPauseState] = useState<boolean>(false);
    const [muteState, setMuteState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dialogTag, setDialogTag] = useState<boolean>(false);
    const [staminaPercentage, setStaminaPercentage] = useState<number>(100); 
    const [asceanViews, setAsceanViews] = useState<string>('Character');

    const gameRef = useRef<any>({});
    let scenes: any[] = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);
    scenes.push(Play);

    const [config, setConfig] = useState({
        type: Phaser.AUTO,
        parent: 'story-game',
        fullscreenTarget: 'story-game',
        width: 960,
        height: 640,
        scene: scenes,
        scale: { zoom: 1, },
        data: { ascean: state.player, user: user },
        physics: {
            default: 'matter',
            matter: {
                debug: true,
                gravity: { y: 0 },
            }
        }, 
        plugins: {
            global: [
                {
                    key: 'rexVirtualJoystick',
                    plugin: VirtualJoystickPlugin,
                    start: true
                },
                {
                    key: 'rexGlowFilterPipeline',
                    plugin: GlowFilterPipelinePlugin,
                    start: true
                }
            ],
            scene: [
                {
                    plugin: PhaserMatterCollisionPlugin,
                    key: 'matterCollision',
                    mapping: 'matterCollision'
                },
                {
                    key: "PhaserNavMeshPlugin",
                    plugin: PhaserNavMeshPlugin,
                    mapping: "navMeshPlugin",
                    start: true
                },
            ],
            src: [
                'VirtualJoysticks/plugin/src/Pad.js',
                'VirtualJoysticks/plugin/src/Stick.js',
                'VirtualJoysticks/plugin/src/Button.js',
                'VirtualJoysticks/plugin/src/DPad.js',
            ],
        }, 
        backgroundColor: 'transparent',
    });
 
    useEffect(() => { 
        startGame();
    }, []);

    useEffect(() => {
        updateCombatListener(state);
    }, [state]);

    useEffect(() => {
        if (staminaPercentage < 100) {
            const timer = setTimeout(() => {
                setStaminaPercentage(staminaPercentage + (state.player_attributes.stamina / 100));
                EventEmitter.emit('updated-stamina', Math.round(((staminaPercentage + (state.player_attributes.stamina / 100)) / 100) * state.player_attributes.stamina));
            }, 200 - state.player_attributes.stamina);

            return () => {
                clearTimeout(timer);
            };
        }; 
    }, [staminaPercentage]);

    const startGame = useCallback(async () => {
        try {
            setLoading(true); 
            gameRef.current = new Phaser.Game(config); 
            setTimeout(() => {
                setLoading(false);
                dispatch({ type: ACTIONS.SET_PHASER, payload: true });
            }, 1000);
        } catch (err: any) {
            console.log(err.message, 'Error Starting Game');
        };
    }, [asceanID]);

    const getAsceanLeveled = async (): Promise<void> => {
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
    
    const levelUpAscean = async (vaEsai: any): Promise<void> => {
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
                experience: response.data.experience,
                experienceNeeded: response.data.level * 1000,
                mastery: response.data.mastery,
                faith: response.data.faith,
            });
            await getAsceanLeveled();
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up');
        };
    };

    const retrieveAssets = async (): Promise<void> => {
        EventEmitter.emit('send-assets', assets);
    };

    const sendEnemyData = async (): Promise<void> => { 
        EventEmitter.emit('get-enemy', state.computer);
    };

    const sendAscean = async (): Promise<void> => {
        EventEmitter.emit('get-ascean', state.player);
    };

    const sendCombatData = async (): Promise<void> => {
        EventEmitter.emit('get-combat-data', state);
    };

    const sendGameData = async (): Promise<void> => {
        EventEmitter.emit('get-game-data', gameState);
    };

    const updateCombatTimer = async (e: number): Promise<void> => dispatch({ type: ACTIONS.SET_COMBAT_TIMER, payload: e });

    const updateEnemyAction = async (e: any): Promise<void> => {
        try {
            const { enemyID, enemy, damageType, combatStats, weapons, health, actionData, state } = e;
            let enemyData = {
                ...state,
                computer: enemy,
                computer_attributes: combatStats.attributes,
                computer_weapon_one: combatStats.combat_weapon_one,
                computer_weapon_two: combatStats.combat_weapon_two,
                computer_weapon_three: combatStats.combat_weapon_three,
                new_computer_health: health,
                current_computer_health: health,
                computer_health: combatStats.healthTotal,
                computer_defense: combatStats.defense,
                enemyID: '',
                computer_weapons: weapons,
                action: '',
                computer_action: actionData.action,
                computer_counter_guess: actionData.counter,
                computer_damage_type: damageType,
                computerEffects: [],
            };
            console.log(`%c Enemy Action: "${enemyData.computer_action} ${enemyData.computer_counter_guess}"`, 'color: red; font-size: 16px; font-weight: bold;` ');
            let response = await gameAPI.phaserAction(enemyData);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            dispatch({ type: ACTIONS.REGISTER_ENEMY_ACTIONS, payload: response.data });
            response.data.enemyID = enemyID;
            await updateCombat(response.data);
            await soundEffects(response.data);
            shakeScreen(gameState.shake);
            if (response.data.player_win === true) await handlePlayerWin(response.data);
            if (response.data.computer_win === true) await handleComputerWin(response.data);
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Updating Enemy Action');
        };
    };

    const updateState = async (e: any): Promise<void> => dispatch({ type: ACTIONS.SET_UPDATE_STATE, payload: e });
    
    const updateStateAction = async (e: CombatData): Promise<void> => {
        try {
            const state = e;
            await handleInitiate(state);
        } catch (err: any) {
            console.log(err.message, 'Error Updating State');
        };
    };

    const updateStateInvoke = async (e: CombatData): Promise<void> => {
        try {
            const state = e;
            await handleInstant(state);
        } catch (err: any) {
            console.log(err.message, 'Error Updating State');
        };
    };

    const updateStateConsume = async (e: CombatData): Promise<void> => {
        try {
            const state = e;
            await handlePrayer(state);
        } catch (err: any) {
            console.log(err.message, 'Error Updating State');
        };
    };

    const clearNonAggressiveEnemy = async (e: any): Promise<void> => {
        dispatch({ type: ACTIONS.CLEAR_NON_AGGRESSIVE_ENEMY, payload: null });
        gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: false });
    };

    const clearNpc = async (e: any): Promise<void> => {
        dispatch({ type: ACTIONS.CLEAR_NPC, payload: null });
        gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: false });
        if (gameState.merchantEquipment.length > 0) {
            await deleteEquipment(gameState.merchantEquipment);
            gameDispatch({ type: GAME_ACTIONS.SET_MERCHANT_EQUIPMENT, payload: [] });
        };
    };

    const fetchEnemy = async (e: any): Promise<void> => {
        const getOpponent = async () => {
            try { 
                let minLevel: number = 0;
                let maxLevel: number = 0; 
                if (state.player.level < 3) {
                    minLevel = 1;
                    maxLevel = 2;
                } else  if (state.player.level <= 4) { // 3-4 
                    minLevel = 2;
                    maxLevel = 4;
                } else if (state.player.level <= 6) { 
                    minLevel = 4;
                    maxLevel = 6;
                } else if (state.player.level <= 8) {
                    minLevel = 5;
                    maxLevel = 9;
                } else if (state.player.level <= 10) { // 9-10
                    minLevel = 7;
                    maxLevel = 12;
                } else if (state.player.level <= 12) {
                    minLevel = 8;
                    maxLevel = 14;
                } else if (state.player.level <= 14) { // 11-14
                    minLevel = 10;
                    maxLevel = 16;
                } else if (state.player.level <= 18) { // 15-18
                    minLevel = 12;
                    maxLevel = 18;
                } else if (state.player.level <= 20) {
                    minLevel = 16;
                    maxLevel = 20;
                };
                const enemyData = {
                    username: 'mirio',
                    minLevel: minLevel,
                    maxLevel: maxLevel
                };
                const secondResponse = await userService.getRandomEnemy(enemyData);
                const selectedOpponent = await asceanAPI.getCleanAscean(secondResponse.data.ascean._id);
                const response = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
                return {
                    game: selectedOpponent.data,
                    combat: response.data.data,
                    enemyID: e.enemyID
                };
            } catch (err: any) {
                console.log(err.message, 'Error retrieving Enemies')
            };
        };
        const opponent = await getOpponent();
        // const opponentData = new CustomEvent('enemy-fetched', {
        //     detail: opponent
        // });
        // window.dispatchEvent(opponentData);
        EventEmitter.emit('enemy-fetched', opponent);
    };

    const setupEnemy = async (e: any): Promise<void> => {
        await getOpponentDialog(e.enemy.name);
        gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: e.game });
        setAsceanState({ ...asceanState, 'opponent': e.game.level });
        dispatch({ type: ACTIONS.SET_PHASER_COMPUTER_ENEMY, payload: { enemy: e.enemy, health: e.health, enemyID: e.id, isAggressive: e.isAggressive, startedAggressive: e.startedAggressive, isDefeated: e.isDefeated, isTriumphant: e.isTriumphant } }); 
    };

    const setupNpc = async (e: any): Promise<void> => {
        gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: e.game });
        const dialog = getNodesForNPC(npcIds[e.type]);
        dispatch({ type: ACTIONS.SET_PHASER_COMPUTER_NPC, payload: { enemy: e.enemy, health: e.health, enemyID: e.id, npcType: e.type } }); 
        gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: dialog });
    };

    const getOpponentDialog = async (enemy: string): Promise<void> => {
        try {
            const response = getNpcDialog(enemy);
            if (!response) return;
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    }; 

    const fetchNpc = async (e: any): Promise<void> => { 
        try {
            const CITY_OPTIONS = {
                'Merchant-Alchemy': 'Alchemist',
                'Merchant-Armor': 'Armorer',
                'Merchant-Smith': 'Blacksmith',
                'Merchant-Jewelry': 'Jeweler',
                'Merchant-General': 'General Merchant',
                'Merchant-Tailor': 'Tailor',
                'Merchant-Mystic': 'Senarian',
                'Merchant-Weapon': 'Sevasi',
            };
            const getNPC = async () => {
                let npc: NPC = Object.assign({}, Merchant);
                npc.name = 'Traveling ' + CITY_OPTIONS[e.npcType as keyof typeof CITY_OPTIONS];
                const response = await asceanAPI.getAnimalStats(npc);
                return {
                    game: npc,
                    combat: response.data.data,
                    enemyID: e.enemyID
                };
            };
            const npc = await getNPC();
            EventEmitter.emit('npc-fetched', npc);
        } catch (err: any) {
            console.log("Error Getting an NPC");
        };
    };

    const createDialog = async (e: any) => { };

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
        if (!gameState.saveExp) return;
        saveExperience();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: false });
        };
    }, [asceanState, gameState.saveExp]); 

    useEffect(() => {
        if (!state.player_luckout) return;
        handlePlayerLuckout();
    }, [state.player_luckout]);  

    async function handlePlayerLuckout(): Promise<void> {
        try {
            playReligion();
            await getOneLootDrop(state.computer.level);
            await gainExperience(state);
            dispatch({ type: ACTIONS.RESET_LUCKOUT, payload: false });
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    const deleteEquipment = async (eqp: any): Promise<void> => {
        try {
            await eqpAPI.deleteEquipment(eqp);
        } catch (err) {
            console.log(err, 'Error!')
        };
    };

    const getAsceanAndInventory = async (): Promise<void> => {
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

    const getOnlyInventory = async (): Promise<void> => {
        try {
            const firstResponse = await asceanAPI.getAsceanInventory(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_INVENTORY, payload: firstResponse });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly');
        };
    };

    const drinkFirewater = async (): Promise<void> => {
        if (gameState.player?.firewater?.charges === 0) return;
        try {
            dispatch({ type: ACTIONS.PLAYER_REST, payload: 40 });
            const response = await asceanAPI.drinkFirewater(state.player._id);
            gameDispatch({ type: GAME_ACTIONS.SET_FIREWATER, payload: response.firewater });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err, "Error Drinking Firewater");
        };
    };

    const saveExperience = async (): Promise<void> => {
        console.log('Saving Experience!', gameState.saveExp, state.player_win);
        if (!gameState.saveExp) return;
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
                'opponent': 0,
                'opponentExp': 0,
                'experience': cleanRes.data.experience,
                'experienceNeeded': cleanRes.data.level * 1000,
                'mastery': cleanRes.data.mastery,
                'faith': cleanRes.data.faith,
            });
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error Saving Experience');
        };
    };
    
    const gainExperience = async (data: CombatData): Promise<void> => {
        try {
            let opponentExp: number = Math.round(state.computer.level * 100 * (state.computer.level / state.player.level) + state.player_attributes.rawKyosir);
            if (data.prayerData.includes('Avarice')) opponentExp = Math.round(opponentExp * 1.2);
            console.log(opponentExp, 'Opponent Exp in Gain Experience');
            if (asceanState.ascean.experience + opponentExp >= asceanState.experienceNeeded) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'currentHealth': state.new_player_health,
                    'experience': asceanState.experienceNeeded,
                    'avarice': data.prayerData.includes('Avarice') ? true : false,
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
            if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'currentHealth': state.new_player_health,
                    'experience': Math.round(asceanState.experience + opponentExp),
                    'avarice': data.prayerData.includes('Avarice') ? true : false,
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error Gaining Experience');
        };
    }; 
    
    const getOneLootDrop = async (level: number): Promise<void> => {
        try {
            let response = await eqpAPI.getLootDrop(level);
            gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROPS, payload: response.data[0] });
            let roll = Math.floor(Math.random() * 100) + 1;
            if (roll <= 25) {
                let second = await eqpAPI.getLootDrop(level);
                gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROPS, payload: second.data[0] });
                EventEmitter.emit('enemyLootDrop', { enemyID: state.enemyID, drops: [response.data[0], second.data[0]] });
            } else {
                EventEmitter.emit('enemyLootDrop', { enemyID: state.enemyID, drops: response.data });
            };
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
            // if (gameState.player.tutorial.firstLoot === true) await checkTutorial('firstLoot', gameState.player);
        } catch (err: any) {
            console.log(err.message, 'Error Getting Loot Drop');
        };
    };

    async function soundEffects(effects: CombatData): Promise<void> {
        try {
            if (effects.realized_player_damage > 0) {
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
                    Pierce: (weapons: any[]) => (weapons[0].type === "Bow" || weapons[0].type === "Greatbow") ? playBow() : playPierce(),
                    Slash: playSlash,
                    Blunt: playBlunt,
                };
            
                const { player_damage_type, weapons } = effects;
                const soundEffectFn = soundEffectMap[player_damage_type as keyof typeof soundEffectMap];
                if (soundEffectFn) {
                    soundEffectFn(weapons);
                };
            };
            if (effects.realized_computer_damage > 0) {
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
                    Pierce: (computer_weapons: any[]) => (computer_weapons[0].type === "Bow" || computer_weapons[0].type === 'Greatbow') ? playBow() : playPierce(),
                    Slash: playSlash,
                    Blunt: playBlunt,
                };
            
                const { computer_damage_type, computer_weapons } = effects;
                const soundEffectFn = soundEffectMap[computer_damage_type as keyof typeof soundEffectMap];
                if (soundEffectFn) {
                    soundEffectFn(computer_weapons);
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
        } catch (err: any) {
            console.log(err.message, 'Error Setting Sound Effects')
        };
    };

    async function handlePlayerWin(combatData: CombatData): Promise<void> {
        try {
            playReligion();
            await gainExperience(combatData);
            const statistic = {
                asceanID: combatData.player._id,
                wins: 1,
                losses: 0,
                total: 1,
                actionData: combatData.actionData,
                typeAttackData: combatData.typeAttackData,
                typeDamageData: combatData.typeDamageData,
                totalDamageData: combatData.totalDamageData,
                prayerData: combatData.prayerData,
                deityData: combatData.deityData,

            };
            const response = await asceanAPI.recordCombatStatistic(statistic);
            console.log(response, "Player Win Response Recorded");
            gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            await getOneLootDrop(combatData.computer.level);
            setTimeout(() => {
                dispatch({ type: ACTIONS.PLAYER_WIN, payload: combatData });
                gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleComputerWin(combatData: CombatData): Promise<void> {
        try {
            const statistic = {
                asceanID: combatData.player._id,
                wins: 0,
                losses: 1,
                total: 1,
                actionData: combatData.actionData,
                typeAttackData: combatData.typeAttackData,
                typeDamageData: combatData.typeDamageData,
                totalDamageData: combatData.totalDamageData,
                prayerData: combatData.prayerData,
                deityData: combatData.deityData,
            };
            const response = await asceanAPI.recordCombatStatistic(statistic);
            console.log(response, "Player Loss Response Recorded");
            gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
            await asceanAPI.asceanHealth({ health: combatData.new_player_health, id: asceanID });
            playDeath();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You have lost the battle to ${gameState?.opponent?.name}, yet still there is always Achre for you to gain.` })
            setTimeout(() => {
                dispatch({ type: ACTIONS.COMPUTER_WIN, payload: combatData });
                gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleEffectTick(state: CombatData, effect: StatusEffect, effectTimer: number): Promise<void> {
        try {
            const data = { combatData: state, effect, effectTimer };
            const response = await gameAPI.effectTick(data);
            console.log(response, "Response From Effect Tick");
            dispatch({ type: ACTIONS.EFFECT_RESPONSE, payload: response.data });
            if (response.data.player_win === true) await handlePlayerWin(response.data);
            if (response.data.computer_win === true) await handleComputerWin(response.data);
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
            }, 1500);
        } catch (err: any) {
            console.log(err, "Error In Effect Tick");
        };
    };

    async function handleInitiate(combatData: CombatData): Promise<void> {
        try { 
            console.log(`%c Player: Action - ${combatData.action} Counter -${combatData.counter_guess} | Computer: Action - ${combatData.computer_action} Counter -${combatData.computer_counter_guess}`, 'color: green; font-size: 16px; font-weight: bold;` ')
            const response = await gameAPI.phaserAction(combatData);
            console.log(response.data, "Initiate Response")
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            await updateCombat(response.data);
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

    async function handleInstant(state: CombatData): Promise<void> {
        try {
            gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: true });
            const response = await gameAPI.instantAction(state);
            console.log(response.data, "Instant Response");
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            await updateCombat(response.data);
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

    async function handlePrayer(state: CombatData): Promise<void> {
        try {
            if (state.prayerSacrifice === '') return;
            const response = await gameAPI.consumePrayer(state);
            console.log(response.data, "Prayer Response");
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            await updateCombat(response.data);
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

    async function setWeaponOrder(weapon: any): Promise<void> {
        try {
            const findWeapon = state.weapons.filter((weap: { name: any; }) => weap?.name === weapon.target.value);
            const newWeaponOrder = async () => state?.weapons.sort((a: any, b: any) => {
                return ( a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0 )
            });
            const response = await newWeaponOrder();
            playWO();
            dispatch({ type: ACTIONS.SET_WEAPON_ORDER, payload: response });
        } catch (err: any) {
            console.log(err.message, 'Error Setting Weapon Order');
        };
    };

    async function setDamageType(damageType: any): Promise<void> {
        try {    
            playWO();
            dispatch({ type: ACTIONS.SET_DAMAGE_TYPE, payload: damageType.target.value });
        } catch (err: any) {
            console.log(err.message, 'Error Setting Damage Type');
        };
    };

    async function setPrayerBlessing(prayer: any): Promise<void> {
        try {
            playWO();
            dispatch({ type: ACTIONS.SET_PRAYER_BLESSING, payload: prayer.target.value });
        } catch (err: any) {
            console.log(err.message, 'Error Setting Prayer');
        };
    }; 

    const updateCombatListener = async (combatData: CombatData): Promise<void> => {
        try {
            EventEmitter.emit('update-combat-data', combatData);
        } catch (err: any) {
            console.log(err.message, 'Error Updating Combat Listener');
        };
    };

    const updateCombat = async (combatData: CombatData): Promise<void> => {
        try {
            EventEmitter.emit('update-combat', combatData);
        } catch (err: any) {
            console.log(err.message, 'Error Updating Combat Listener');
        };
    };

    const resizeGame = () => {
        let game_ratio = 960 / 640;
        let canvas = document.getElementsByTagName('canvas')[0];
        let newWidth = window.innerWidth;
        let newHeight = newWidth / game_ratio;
        if (newHeight > window.innerHeight) {
            newHeight = window.innerHeight;
            newWidth = newHeight * game_ratio;
        }; 
        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';
    };

    const toggleCombatHud = (e: { preventDefault: () => void; key: string; keyCode: number }) => {
        e.preventDefault();
        if (e.key === 'v' || e.key === 'V') gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: !gameState.showDialog });
        if (e.key === 'c' || e.key === 'C') setShowPlayer((prev: boolean) => !prev);
        if (e.key === 'x' || e.key === 'X') {
            setAsceanViews((prev: string) => {
                switch (prev) {
                    case 'Character':
                        return 'Inventory';
                    case 'Inventory':
                        return 'Settings';
                    case 'Settings':
                        return 'Character';
                    default:
                        return 'Character';
                };
            });
        };
        if (e.key === ' ' || e.keyCode === 32) togglePause();
    };

    const toggleFullscreen = () => screenfull.toggle();

    const toggleMute = () => {
        const mute = () => {
            let scene = gameRef.current.scene.getScene('Play');
            console.log(scene, 'What is this Scene I made?')
            scene.sound.setMute();
        };
        const unmute = () => {
            let scene = gameRef.current.scene.getScene('Play');
            scene.sound.setMute(false);
        };
        if (!muteState) {
            mute();
            setMuteState(true);
        } else {
            unmute();
            setMuteState(false);
        };
    };

    const togglePause = () => {
        const pause = () => {
            let scene = gameRef.current.scene.getScene('Play');
            scene.pause();
        };
        const resume = () => {
            let scene = gameRef.current.scene.getScene('Play');
            scene.resume();
        };
        if (!pauseState) {
            pause();
            setPauseState(true);
        } else {
            resume();
            setPauseState(false);
        };
    }; 

    const combatEngaged = async (e: boolean) => {
        try {
            if (e) {
                dispatch({ type: ACTIONS.SET_DUEL, payload: true });
            } else {
                dispatch({ type: ACTIONS.CLEAR_DUEL, payload: false });
            };
        } catch (err: any) {
            console.log(err, "Error Handling Dialog Middleware");
        }; 
    };

    const launchGame = async (e: boolean) => setCurrentGame(e);
    const updateStamina = async (e: number) => setStaminaPercentage((prevPercentage: number) => prevPercentage - e <= 0 ? 0 : prevPercentage - e);
    const updateStalwart = async (e: boolean) => dispatch({ type: ACTIONS.SET_STALWART, payload: e });
    const interactingLoot = async (e: boolean) => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_LOOT, payload: e }); 
    const showDialog = async (e: boolean) => setDialogTag(e);

    // usePhaserEvent('resize', resizeGame);
    usePhaserEvent('retrieve-assets', retrieveAssets);
    usePhaserEvent('clear-non-aggressive-enemy', clearNonAggressiveEnemy);
    usePhaserEvent('clear-npc', clearNpc);
    usePhaserEvent('fetch-enemy', fetchEnemy);
    usePhaserEvent('fetch-npc', fetchNpc);
    usePhaserEvent('setup-enemy', setupEnemy);
    usePhaserEvent('setup-npc', setupNpc);
    usePhaserEvent('request-ascean', sendAscean);
    usePhaserEvent('request-enemy', sendEnemyData);
    usePhaserEvent('request-combat-data', sendCombatData);
    usePhaserEvent('request-game-data', sendGameData);
    usePhaserEvent('dialog-box', createDialog);
    usePhaserEvent('show-dialog', showDialog);
    usePhaserEvent('interacting-loot', interactingLoot);
    useKeyEvent('keydown', toggleCombatHud);
    usePhaserEvent('launch-game', launchGame);
    usePhaserEvent('combat-engaged', combatEngaged);
    usePhaserEvent('drink-firewater', drinkFirewater);
    usePhaserEvent('update-stalwart', updateStalwart);
    usePhaserEvent('update-stamina', updateStamina);
    usePhaserEvent('update-state', updateState);
    usePhaserEvent('update-state-action', updateStateAction);
    usePhaserEvent('update-state-invoke', updateStateInvoke);
    usePhaserEvent('update-state-consume', updateStateConsume);
    usePhaserEvent('update-combat-timer', updateCombatTimer);
    usePhaserEvent('update-enemy-action', updateEnemyAction);

    return (
        <div style={{ position: "relative", maxWidth: '960px', maxHeight: '643px', margin: '0 auto', border: currentGame ? "" : "3px solid #fdf6d8" }}>
            { currentGame ? ( <>
                <div id='ui-hud'>
                    <Button variant='outline' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                        <h3 style={{ fontSize: '12px', textAlign: 'center' }}>{state.player.name}</h3>
                    </Button>
                    { gameState.player.journal.entries.length > 0 ?
                        <StoryJournal quests={gameState.player.quests} dispatch={dispatch} gameDispatch={gameDispatch} ascean={gameState.player} />
                    : '' }
                    { dialogTag ? (
                        <Button variant='' className='ascean-ui' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: !gameState.showDialog })}>
                            <h3 style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps', fontSize: '12px', textAlign: 'center' }}>Dialog!</h3>
                        </Button>
                    ) : ( '' ) }
                </div>
                <CombatMouseSettings state={state} damageType={state.weapons[0].damage_type} setDamageType={setDamageType} setPrayerBlessing={setPrayerBlessing} setWeaponOrder={setWeaponOrder} weapons={state.weapons.filter((weapon: any) => weapon.name !== 'Empty Weapon Slot')} />
                { showPlayer ? (  
                    <StoryAscean asceanViews={asceanViews} gameState={gameState} gameDispatch={gameDispatch} ascean={state.player} damaged={state.playerDamaged} state={state} dispatch={dispatch} loading={loading} asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
                ) : ( 
                    <div style={{ position: "absolute", zIndex: 1 }}>
                        <CombatUI state={state} dispatch={dispatch} handleCallback={handleEffectTick} gameState={gameState} gameDispatch={gameDispatch} staminaPercentage={staminaPercentage} setStaminaPercentage={setStaminaPercentage} pauseState={pauseState} />
                        { state.combatEngaged ? (
                            <>
                            <div style={{ position: "absolute", top: "415px", left: "250px", zIndex: 0 }}>
                            <GameCombatText 
                                emergencyText={['']} combatRoundText={state.combatRound} story={true} combatTimer={state.combatTimer}
                                playerCombatText={state.player_action_description} computerCombatText={state.computer_action_description} 
                                playerActionText={state.player_start_description} computerActionText={state.computer_start_description}
                                playerDeathText={state.player_death_description} computerDeathText={state.computer_death_description}
                                playerSpecialText={state.player_special_description} computerSpecialText={state.computer_special_description}
                                playerReligiousText={state.player_influence_description} computerReligiousText={state.computer_influence_description}
                                playerReligiousTextTwo={state.player_influence_description_two} computerReligiousTextTwo={state.computer_influence_description_two}
                                />
                            </div>
                            </>
                        ) : ( '' ) }
                        { state.computer ? (
                            <EnemyUI state={state} dispatch={dispatch} pauseState={pauseState} handleCallback={handleEffectTick} />
                        ) : ( '' ) }
                    </div>
                ) }
                { gameState.showDialog && gameState.opponent && dialogTag ?    
                    <StoryDialog state={state} dispatch={dispatch} gameState={gameState} gameDispatch={gameDispatch} deleteEquipment={deleteEquipment} />
                : ( '' )}
                { gameState?.lootDrops.length > 0 && gameState.showLootOne ? (
                    <LootDropUI gameState={gameState} gameDispatch={gameDispatch} state={state} />   
                ) : ( '' ) }
            </> ) : ( '' ) }
            <div id='story-game' style={{ textAlign: 'center' }} ref={gameRef}></div>
        </div>
    );
};

export default HostScene;