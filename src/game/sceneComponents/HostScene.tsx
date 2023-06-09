import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Phaser from "phaser";
import '../PhaserGame.css'
import Modal from 'react-bootstrap/Modal';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilterpipeline-plugin.js';
import Boot from '../Boot';
import Preload from '../Preload';
import Menu from '../Menu';
import Play from '../Play';
import StoryAscean from '../../components/GameCompiler/StoryAscean';
import * as asceanAPI from '../../utils/asceanApi';
import * as gameAPI from '../../utils/gameApi';
import userService from "../../utils/userService";
import DialogBox from '../DialogBox';
import Button from 'react-bootstrap/Button';
import PhaserInventoryBag from '../PhaserInventoryBag';
import { GAME_ACTIONS } from '../../components/GameCompiler/GameStore';
import PhaserSettings from '../PhaserSettings';
import { ACTIONS, CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import useGameSounds from '../../components/GameCompiler/Sounds';
import StoryActions from '../StoryActions';
import CombatMouseSettings from '../CombatMouseSettings';
import CombatUI from '../CombatUI';
import EnemyUI from '../EnemyUI';
import GameCombatText from '../../components/GameCompiler/GameCombatText';

export const usePhaserEvent = (event: string, callback: any) => {
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
    gameChange: boolean;
    setGameChange: React.Dispatch<React.SetStateAction<boolean>>;
    state: any;
    dispatch: any;
    gameState: any;
    gameDispatch: any;
    asceanState: any;
    setAsceanState: React.Dispatch<React.SetStateAction<any>>;
    assets: any;
};

const HostScene = ({ user, gameChange, setGameChange, state, dispatch, gameState, gameDispatch, asceanState, setAsceanState, assets }: Props) => {
    const { asceanID } = useParams();
    const { playOpponent, playWO, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReplay, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9, playMerchant, playDungeon, playPhenomena, playTreasure, playActionButton, playCombatRound } = useGameSounds(gameState.soundEffectVolume);
    const [currentGame, setCurrentGame] = useState<any>(false);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [pauseState, setPauseState] = useState<boolean>(false);
    const [muteState, setMuteState] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const [messages, setMessages] = useState<any>([]); 
    const [loading, setLoading] = useState<boolean>(false);
    const [combatHud, setCombatHud] = useState<boolean>(false);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [worldModalShow, setWorldModalShow] = useState<boolean>(false);
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
                }
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
        // if (!state.combatEngaged) return;
        updateCombatListener(state);
    }, [state]);

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

    const retrieveAssets = async () => {
        const assetPackage = new CustomEvent('send-assets', {
            detail: assets
        });
        window.dispatchEvent(assetPackage);
    };

    const sendEnemyData = async () => { 
        const enemyData = new CustomEvent('get-enemy', {
            detail: state.computer
        });
        window.dispatchEvent(enemyData);
    };

    const sendAscean = async () => {
        const asceanData = new CustomEvent('get-ascean', {
            detail: state.player
        });
        window.dispatchEvent(asceanData);
    };

    const sendCombatData = async () => {
        const combatData = new CustomEvent('get-combat-data', {
            detail: state
        });
        window.dispatchEvent(combatData);
    };

    const sendGameData = async () => {
        const gameData = new CustomEvent('get-game-data', {
            detail: gameState
        });
        window.dispatchEvent(gameData);
    };

    const updateStateAction = async (e: { detail: any; }) => {
        try {
            const state = e.detail;
            await handleInitiate(state);
        } catch (err: any) {
            console.log(err.message, 'Error Updating State');
        };
    };

    const updateStateInvoke = async (e: { detail: any; }) => {
        try {
            const state = e.detail;
            await handleInstant(state);
        } catch (err: any) {
            console.log(err.message, 'Error Updating State');
        };
    };

    const updateStateConsume = async (e: { detail: any; }) => {
        try {
            const state = e.detail;
            await handlePrayer(state);
        } catch (err: any) {
            console.log(err.message, 'Error Updating State');
        };
    };

    const fetchEnemy = async (e: { detail: any; }) => {
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
                } else if (state.player.level === 5) { 
                    minLevel = 4;
                    maxLevel = 6;
                } else if (state.player.level === 6) {
                    minLevel = 4;
                    maxLevel = 8;
                } else if (state.player.level === 7) {
                    minLevel = 5;
                    maxLevel = 9;
                } else if (state.player.level === 8) {
                    minLevel = 6;
                    maxLevel = 10;
                } else if (state.player.level <= 10) { // 9-10
                    minLevel = 7;
                    maxLevel = 12;
                } else if (state.player.level <= 14) { // 11-14
                    minLevel = 8;
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
                    enemyID: e.detail.enemyID
                };
            } catch (err: any) {
                console.log(err.message, 'Error retrieving Enemies')
            };
        };
        const opponent = await getOpponent();
        const opponentData = new CustomEvent('enemy-fetched', {
            detail: opponent
        });
        window.dispatchEvent(opponentData);
    };

    const setupEnemy = async (e: { detail: any; }) => {
        console.log(e.detail, "This is the setup enemy function")
        gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: e.detail.game });
        setAsceanState({ ...asceanState, 'opponent': e.detail.game.level });
        dispatch({ type: ACTIONS.SET_PHASER_COMPUTER_ENEMY, payload: { enemy: e.detail.enemy, health: e.detail.health } }); 
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

    async function soundEffects(effects: CombatData) {
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
                    Pierce: (weapons: any[]) => weapons[0].type === "Bow" ? playBow() : playPierce(),
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

    async function handlePlayerWin(combatData: CombatData) {
        try {
            playReligion();
            await gainExperience();
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
            setTimeout(() => {
                dispatch({ type: ACTIONS.PLAYER_WIN, payload: combatData });
                gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleComputerWin(combatData: CombatData) {
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

    async function handleInitiate(combatData: CombatData) {
        try { 
            const response = await gameAPI.initiateAction(combatData);
            console.log(response.data, "Initiate Response")
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            await updateCombatListener(response.data);
            dispatch({ type: ACTIONS.INITIATE_COMBAT, payload: response.data });
            await soundEffects(response.data);
            shakeScreen(gameState.shake);
            if (response.data.player_win === true) await handlePlayerWin(response.data);
            if (response.data.computer_win === true) await handleComputerWin(response.data);
            // eventListener to update the Phaser Scene
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Combat')
        };
    };

    async function handleInstant(state: CombatData) {
        try {
            gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: true });
            const response = await gameAPI.instantAction(state);
            console.log(response.data, "Instant Response");
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            await updateCombatListener(response.data);
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

    async function handlePrayer(state: CombatData) {
        try {
            if (state.prayerSacrifice === '') return;
            const response = await gameAPI.consumePrayer(state);
            console.log(response.data, "Prayer Response");
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            await updateCombatListener(response.data);
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

    async function setWeaponOrder(weapon: any) {
        try {
            console.log(weapon, "Weapon In Weapon Order")
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

    async function setDamageType(damageType: any) {
        try {    
            playWO();
            dispatch({ type: ACTIONS.SET_DAMAGE_TYPE, payload: damageType.target.value });
        } catch (err: any) {
            console.log(err.message, 'Error Setting Damage Type');
        };
    };

    async function setPrayerBlessing(prayer: any) {
        try {
            playWO();
            dispatch({ type: ACTIONS.SET_PRAYER_BLESSING, payload: prayer.target.value });
        } catch (err: any) {
            console.log(err.message, 'Error Setting Prayer');
        };
    }; 

    const updateCombatListener = async (combatData: CombatData) => {
        try {
            const updateCombatData = new CustomEvent('update-combat-data', { detail: combatData });
            window.dispatchEvent(updateCombatData);
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
        if (e.key === 'v' || e.key === 'V') setCombatHud((prev: boolean) => !prev);
        if (e.key === 'c' || e.key === 'C') setShowPlayer((prev: boolean) => !prev);
        if (e.key === 'x' || e.key === 'X') handleInventoryMiddleware();
        if (e.key === ' ' || e.keyCode === 32) togglePause();
    };


    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setFullScreen(false);
        } else {
            gameRef.current.scale.startFullscreen();
            setFullScreen(true);
        };
    };

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
            console.log(scene, 'What is this Scene I made?')
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

    const handleInventoryMiddleware = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.SET_SHOW_INVENTORY, payload: !gameState.showInventory });
        } catch (err: any) {
            console.log(err, "Error Handling Dialog Middleware");
        };
    };

    const combatEngaged = async (e: { detail: any; }) => {
        try {
            if (e.detail) {
                dispatch({ type: ACTIONS.SET_DUEL, payload: true });
            } else {
                dispatch({ type: ACTIONS.CLEAR_DUEL, payload: false });
            }
        } catch (err: any) {
            console.log(err, "Error Handling Dialog Middleware");
        };
        // const combatEngaged = new CustomEvent('combat-engaged', { detail: true });
        // window.dispatchEvent(combatEngaged);
    };

    const launchGame = async (e: { detail: any; }) => setCurrentGame(e.detail);



    usePhaserEvent('retrieve-assets', retrieveAssets);
    usePhaserEvent('fetch-enemy', fetchEnemy);
    usePhaserEvent('setup-enemy', setupEnemy);

    usePhaserEvent('request-ascean', sendAscean);
    usePhaserEvent('request-enemy', sendEnemyData);
    usePhaserEvent('request-combat-data', sendCombatData);
    usePhaserEvent('request-game-data', sendGameData);
    usePhaserEvent('dialog-box', createDialog);
    usePhaserEvent('keydown', toggleCombatHud);
    // usePhaserEvent('resize', resizeGame);
    usePhaserEvent('launch-game', launchGame);
    usePhaserEvent('combat-engaged', combatEngaged);
    usePhaserEvent('update-state-action', updateStateAction);
    usePhaserEvent('update-state-invoke', updateStateInvoke);
    usePhaserEvent('update-state-consume', updateStateConsume);

    return (
        <div style={{ position: "relative", maxWidth: '960px', maxHeight: '643px', margin: '0 auto', border: currentGame ? "" : "3px solid #fdf6d8" }}>
            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => toggleFullscreen()}>
                    <h3 style={{ fontSize: '13px', textAlign: 'center', color: '' }} className=''>{ fullScreen ? 'Exit' : 'Enter' } Full Screen</h3>
                </Button>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={toggleMute}>
                    <h3 style={{ fontSize: '13px', textAlign: 'center', color: '' }} className=''>{ muteState ? 'Unmute' : 'Mute' } Game</h3>
                </Button>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => togglePause()}>
                    <h3 style={{ fontSize: '13px', textAlign: 'center', color: '' }} className=''>{ pauseState ? 'Resume' : 'Pause' } Game</h3>
                </Button>
                </Modal.Body>
            </Modal>
            <Modal show={worldModalShow} onHide={() => setWorldModalShow(false)} centered>
                <Modal.Body style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}>
                    <h3 style={{ fontSize: '13px', textAlign: 'center', color: '' }} className=''>Latency: {' '}</h3>
                    <h3 style={{ fontSize: '13px', textAlign: 'center', color: '' }} className=''>Friends: {' '}</h3>
                    <h3 style={{ fontSize: '13px', textAlign: 'center', color: '' }} className=''>Players: {' '}</h3>
                </Modal.Body>
            </Modal>
            { currentGame ? ( <>
                <div id='ui-hud'>
                    <Button variant='outline' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                        <h3 style={{ fontSize: '14px', textAlign: 'center' }} className=''>{state.player.name}</h3>
                    </Button>
                    <Button variant='outline' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps' }} className='ascean-ui' onClick={handleInventoryMiddleware}>
                        <h3 style={{ fontSize: '14px', textAlign: 'center' }} className=''>Inventory</h3>
                    </Button>
                    <PhaserSettings ascean={gameState.player} dispatch={dispatch} gameDispatch={gameDispatch} gameState={gameState} />
                </div>
                <CombatMouseSettings state={state} damageType={state.weapons[0].damage_type} setDamageType={setDamageType} setPrayerBlessing={setPrayerBlessing} setWeaponOrder={setWeaponOrder} weapons={state.weapons} />
                { combatHud ? (
                    <StoryActions state={state} dispatch={dispatch} gameState={gameState} gameDispatch={gameDispatch} handleInstant={handleInstant} handlePrayer={handlePrayer} setDamageType={setDamageType} setPrayerBlessing={setPrayerBlessing} setWeaponOrder={setWeaponOrder} />
                ) : ( '' ) }
                { showPlayer ? (  
                    <StoryAscean ascean={state.player} damaged={state.playerDamaged} state={state} dispatch={dispatch} loading={loading} asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
                ) : ( 
                    <div style={{ position: "absolute", zIndex: 1 }}>
                        <CombatUI state={state} dispatch={dispatch} gameState={gameState} gameDispatch={gameDispatch} />
                        { state.combatEngaged ? (
                            <>
                            <div style={{ position: "absolute", top: "415px", left: "250px", zIndex: 0 }}>
                            <GameCombatText 
                                emergencyText={['']} combatRoundText={state.combatRound} story={true}
                                playerCombatText={state.player_action_description} computerCombatText={state.computer_action_description} 
                                playerActionText={state.player_start_description} computerActionText={state.computer_start_description}
                                playerDeathText={state.player_death_description} computerDeathText={state.computer_death_description}
                                playerSpecialText={state.player_special_description} computerSpecialText={state.computer_special_description}
                                playerReligiousText={state.player_influence_description} computerReligiousText={state.computer_influence_description}
                                playerReligiousTextTwo={state.player_influence_description_two} computerReligiousTextTwo={state.computer_influence_description_two}
                                />
                            </div>
                            <EnemyUI state={state} dispatch={dispatch} />
                            </>
                        ) : ( '' ) }
                    </div>
                ) }
                { gameState.showInventory ? (
                    <PhaserInventoryBag inventory={gameState.player.inventory} gameState={gameState} gameDispatch={gameDispatch} ascean={gameState.player} dispatch={dispatch} />
                ) : ( '' ) }
            </> ) : ( '' ) }
            <div id='story-game' style={{ textAlign: 'center' }} ref={gameRef}></div>
        </div>
    );
};

export default HostScene;