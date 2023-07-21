import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Phaser from "phaser";
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilter2pipeline-plugin.js';
// @ts-ignore
import { PhaserNavMeshPlugin } from 'phaser-navmesh';
import Boot from './Boot';
import Preload from './Preload';
import Menu from './Menu';
import Play from './Play';
import StoryAscean from '../ui/StoryAscean';
import * as asceanAPI from '../../utils/asceanApi';
import * as eqpAPI from '../../utils/equipmentApi';
import userService from "../../utils/userService";
import Button from 'react-bootstrap/Button';
import { NPC, Player } from '../../components/GameCompiler/GameStore';
import { CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import useGameSounds from '../../components/GameCompiler/Sounds'; 
import CombatMouseSettings from '../ui/CombatMouseSettings';
import CombatUI from '../ui/CombatUI';
import EnemyUI from '../ui/EnemyUI';
import screenfull from 'screenfull';
import StoryJournal from '../../components/GameCompiler/StoryJournal';
import { StatusEffect } from '../../components/GameCompiler/StatusEffects'; 
import { LootDropUI } from '../ui/LootDropUI';
import { Merchant } from '../../components/GameCompiler/NPCs';
import { StoryDialog } from '../ui/StoryDialog';
import EventEmitter from '../phaser/EventEmitter';
import { useDispatch, useSelector } from 'react-redux';
import { clearNonAggressiveEnemy, clearNpc, getAsceanHealthUpdateFetch, getCombatFetch, getCombatSettingFetch, getCombatStateUpdate, getCombatStatisticFetch, getCombatTimerFetch, getEffectTickFetch, getEnemyActionFetch, getEnemySetupFetch, getInitiateFetch, getNpcSetupFetch, setEnemyWin, setPlayerWin, setRest, setStalwart } from '../reducers/combatState';
import { getAsceanLevelUpFetch, getDrinkFirewaterFetch, getGainExperienceFetch, getInteractingLootFetch, getLootDropFetch, setShowDialog, setMerchantEquipment } from '../reducers/gameState';
import PhaserCombatText from '../ui/PhaserCombatText';
import useSoundEffects from '../phaser/SoundEffects';
import { checkTraits } from '../../components/GameCompiler/PlayerTraits';

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
    ascean: Player;
    assets: any;
};

const HostScene = ({ assets, ascean }: Props) => {
    const { asceanID } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const combatState = useSelector((state: any) => state.combat);
    // const ascean = useSelector((state: any) => state.game.player);
    const asceanState = useSelector((state: any) => state.game.asceanState);
    const gameState = useSelector((state: any) => state.game);
    const stamina = useSelector((state: any) => state.combat.player_attributes.stamina);
    const { playWO, playDeath, playReligion } = useGameSounds(gameState.soundEffectVolume);
    const [currentGame, setCurrentGame] = useState<any>(false);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [pauseState, setPauseState] = useState<boolean>(false);
    const [muteState, setMuteState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dialogTag, setDialogTag] = useState<boolean>(false);
    const [staminaPercentage, setStaminaPercentage] = useState<number>(100); 
    const [asceanViews, setAsceanViews] = useState<string>('Character');
    const [gameTimer, setGameTimer] = useState<number>(0);
    const gameRef = useRef<any>({});
    let scenes: any[] = [];
    const boot = new Boot({ dispatch });
    scenes.push(boot);
    scenes.push(Preload);
    scenes.push(Menu);
    scenes.push(Play);
    const config = {
        type: Phaser.AUTO,
        parent: 'story-game',
        fullscreenTarget: 'story-game',
        width: 960,
        height: 640,
        scene: scenes,
        scale: { zoom: 1 },
        data: { ascean, user, dispatch },
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
        // backgroundColor: 'transparent',
    };
 
    useEffect(() => { 
        startGame();
    }, [asceanID]);

    useEffect(() => {
        updateCombatListener(combatState);
    }, [combatState]);
    
    // useEffect(() => {
    //     if (combatState.soundEffects) {
    //     };
    // }, [combatState.soundEffects])
    
    // useSoundEffects(combatState);
    useEffect(() => {
        if (gameRef.current) {
            let scene = gameRef.current.scene.getScene('Play');
            if (scene && !pauseState) {
                const timerInterval = setTimeout(() => {
                    setGameTimer((timer: number) => (timer + 1));
                }, 1000);
                
                return () => {
                    if (checkTraits("Kyn'gian", gameState.traits) && gameTimer % 10 === 0) {
                        setStaminaPercentage(staminaPercentage + (stamina / 100));
                        EventEmitter.emit('updated-stamina', Math.round(((staminaPercentage + (stamina / 100)) / 100) * stamina));
                        dispatch(setRest(1));
                    };
                    clearTimeout(timerInterval);
                };
            };
        };
    }, [currentGame, pauseState, gameTimer]); 

    useEffect(() => {
        if (staminaPercentage < 100) {
            const timer = setTimeout(() => {
                setStaminaPercentage(staminaPercentage + (stamina / 100));
                EventEmitter.emit('updated-stamina', Math.round(((staminaPercentage + (stamina / 100)) / 100) * stamina));
            }, 200 - stamina);

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
            }, 1000);
        } catch (err: any) {
            console.log(err.message, 'Error Starting Game');
        };
    }, [asceanID]); 
    
    const levelUpAscean = async (vaEsai: any): Promise<void> => {
        try {
            console.log(vaEsai, 'Leveling Up');
            dispatch(getAsceanLevelUpFetch(vaEsai)); 
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up');
        };
    };

    const retrieveAssets = async () => EventEmitter.emit('send-assets', assets);
    const sendEnemyData = async () => EventEmitter.emit('get-enemy', combatState.computer);
    const sendAscean = async () => EventEmitter.emit('get-ascean', combatState.player);
    const sendCombatData = async () => EventEmitter.emit('get-combat-data', combatState);
    const sendGameData = async () => EventEmitter.emit('get-game-data', gameState);
    const updateCombatTimer = async (e: number) => dispatch(getCombatTimerFetch(e)); 

    const updateEnemyAction = async (e: any): Promise<void> => {
        try {
            console.log(e, 'Enemy Action');
            dispatch(getEnemyActionFetch(e)); 
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime); 
            shakeScreen(gameState.shake); 
        } catch (err: any) {
            console.log(err.message, 'Error Updating Enemy Action');
        };
    };

    const updateState = async (e: any) => dispatch(getCombatStateUpdate(e));
    const clearNAEnemy = async (e: any) => dispatch(clearNonAggressiveEnemy());

    const clearNPC = async (e: any): Promise<void> => {
        dispatch(clearNpc()); 
        if (gameState.merchantEquipment.length > 0) {
            await deleteEquipment(gameState.merchantEquipment);
            dispatch(setMerchantEquipment([])); 
        };
    };

    const getEnemyLevels = (level: number): { minLevel: number, maxLevel: number } => {
        let minLevel: number = 0;
        let maxLevel: number = 0; 
        if (level < 3) { // 1-2
            minLevel = 1;
            maxLevel = 2;
        } else  if (level <= 4) { // 3-4 
            minLevel = 2;
            maxLevel = 4;
        } else if (level <= 6) { // 5-6
            minLevel = 4;
            maxLevel = 6;
        } else if (level <= 8) { // 7-8
            minLevel = 5;
            maxLevel = 9;
        } else if (level <= 10) { // 9-10
            minLevel = 7;
            maxLevel = 12;
        } else if (level <= 12) { // 11-12
            minLevel = 8;
            maxLevel = 14;
        } else if (level <= 14) { // 13-14
            minLevel = 10;
            maxLevel = 16;
        } else if (level <= 18) { // 15-18
            minLevel = 12;
            maxLevel = 18;
        } else if (level <= 20) {
            minLevel = 16;
            maxLevel = 20;
        };
        return { minLevel, maxLevel };
    };

    const fetchEnemy = async (e: any): Promise<void> => {
        const getOpponent = async () => {
            try { 
                const { minLevel, maxLevel } = getEnemyLevels(combatState.player.level); 
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
        EventEmitter.emit('enemy-fetched', opponent);
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
    const setupEnemy = async (e: any) => dispatch(getEnemySetupFetch(e)); 
    const setupNpc = async (e: any) => dispatch(getNpcSetupFetch(e)); 

    const handlePlayerLuckout = async (): Promise<void> => {
        try {
            playReligion();
            dispatch(getGainExperienceFetch({ asceanState, combatState })); 
            dispatch(getLootDropFetch({ enemyID: combatState.enemyID, level: combatState.computer.level }));  
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

    const drinkFirewater = async () => dispatch(getDrinkFirewaterFetch(asceanID));  

    // const statFiler = (data: CombatData, win: boolean): Object => {
    //     const stat = {
    //         asceanID: data.player._id,
    //         wins: win ? 1 : 0,
    //         losses: win ? 0 : 1,
    //         total: 1,
    //         actionData: data.actionData,
    //         typeAttackData: data.typeAttackData,
    //         typeDamageData: data.typeDamageData,
    //         totalDamageData: data.totalDamageData,
    //         prayerData: data.prayerData,
    //         deityData: data.deityData,
    //     };
    //     return stat;
    // };

    // const handlePlayerWin = async (combatData: CombatData): Promise<void> => {
    //     try {
    //         playReligion();
    //         const stat = statFiler(combatData, true);
    //         dispatch(getGainExperienceFetch({ asceanState, combatState })); 
    //         dispatch(getCombatStatisticFetch(stat)) 
    //         dispatch(getLootDropFetch({ enemyID: combatState.enemyID, level: combatState.computer.level })); 
    //         setTimeout(() => {
    //             dispatch(setPlayerWin(combatData)); 
    //         }, 6000);
    //     } catch (err: any) {
    //         console.log("Error Handling Player Win");
    //     };
    // };

    // const handleComputerWin = async (combatData: CombatData): Promise<void> => {
    //     try {
    //         const stat = statFiler(combatData, false);
    //         dispatch(getCombatStatisticFetch(stat));
    //         dispatch(getAsceanHealthUpdateFetch({ health: combatData.new_player_health, id: asceanState._id }));
            
    //         playDeath();
    //         setTimeout(() => {
    //             dispatch(setEnemyWin(combatData));
    //         }, 6000);
    //     } catch (err: any) {
    //         console.log("Error Handling Player Win");
    //     };
    // };

    // const handleInitiate = async (state: CombatData): Promise<void> => {
    //     try { 
    //         console.log(`%c Player: Action - ${state.action} Counter -${state.counter_guess} | Computer: Action - ${state.computer_action} Counter -${state.computer_counter_guess}`, 'color: green; font-size: 16px; font-weight: bold;` ')
    //         dispatch(getInitiateFetch({ combatData: state, type: 'Initiate' }));
    //         if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
    //         shakeScreen(gameState.shake);
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Initiating Combat')
    //     };
    // };

    // const handleInstant = async (state: CombatData): Promise<void> => {
    //     try {
    //         console.log('Instant Invocation Dispatched');
    //         dispatch(getInitiateFetch({ combatData: state, type: 'Instant' }));
    //         if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
    //         shakeScreen(gameState.shake);
    //         playReligion();
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Initiating Insant Action')
    //     };
    // };

    // const handlePrayer = async (state: CombatData): Promise<void> => {
    //     try {
    //         if (state.prayerSacrifice === '') return;
    //         console.log('Prayer Consumption Dispatched');
    //         dispatch(getInitiateFetch({ combatData: state, type: 'Prayer' }));
    //         if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
    //         shakeScreen(gameState.shake);
    //         playReligion();
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Initiating Action')
    //     };
    // }; 

   const setDamageType = async (e: any): Promise<void> => {
        try {    
            playWO();
            dispatch(getCombatSettingFetch({ loadout: e.target.value, type: 'Damage' }));
        } catch (err: any) {
            console.log(err.message, 'Error Setting Damage Type');
        };
    };

   const setPrayerBlessing = async (e: any): Promise<void> => {
        try {
            playWO();
            dispatch(getCombatSettingFetch({ loadout: e.target.value, type: 'Prayer' }));
        } catch (err: any) {
            console.log(err.message, 'Error Setting Prayer');
        };
    }; 

    const updateCombatListener = (data: CombatData) => EventEmitter.emit('update-combat-data', data); // Was Async

    const toggleCombatHud = (e: { preventDefault: () => void; key: string; keyCode: number }) => {
        e.preventDefault();
        if (e.key === 'v' || e.key === 'V') dispatch(setShowDialog(!gameState.showDialog));
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

    // const combatEngaged = async (e: boolean) => dispatch(getCombatFetch(e)); 
    const launchGame = async (e: boolean) => setCurrentGame(e);
    const updateStamina = async (e: number) => setStaminaPercentage((prevPercentage: number) => prevPercentage - e <= 0 ? 0 : prevPercentage - e);
    const updateStalwart = async (e: boolean) =>  dispatch(setStalwart(e)); 
    const interactingLoot = async (e: boolean) => dispatch(getInteractingLootFetch(e)); 
    const showDialog = async (e: boolean) => setDialogTag(e);

    useKeyEvent('keydown', toggleCombatHud);
    usePhaserEvent('retrieve-assets', retrieveAssets);
    // usePhaserEvent('clear-non-aggressive-enemy', clearNAEnemy);
    usePhaserEvent('clear-npc', clearNPC);
    usePhaserEvent('fetch-enemy', fetchEnemy);
    usePhaserEvent('fetch-npc', fetchNpc);
    // usePhaserEvent('setup-enemy', setupEnemy);
    // usePhaserEvent('setup-npc', setupNpc);
    usePhaserEvent('request-ascean', sendAscean);
    usePhaserEvent('request-enemy', sendEnemyData);
    usePhaserEvent('request-combat-data', sendCombatData);
    usePhaserEvent('request-game-data', sendGameData); 
    usePhaserEvent('show-dialog', showDialog);
    usePhaserEvent('interacting-loot', interactingLoot);
    usePhaserEvent('launch-game', launchGame);
    // usePhaserEvent('combat-engaged', combatEngaged);
    // usePhaserEvent('drink-firewater', drinkFirewater);
    usePhaserEvent('update-stalwart', updateStalwart);
    usePhaserEvent('update-stamina', updateStamina);
    usePhaserEvent('update-state', updateState);
    // usePhaserEvent('update-state-action', handleInitiate); 
    // usePhaserEvent('update-state-invoke', handleInstant); 
    // usePhaserEvent('update-state-consume', handlePrayer); 
    usePhaserEvent('update-combat-timer', updateCombatTimer);
    usePhaserEvent('update-enemy-action', updateEnemyAction);

    return (
        <div style={{ position: "relative", maxWidth: '960px', maxHeight: '643px', margin: '0 auto', border: currentGame ? "" : "3px solid #fdf6d8" }}>
            { currentGame ? ( <>
                <div id='ui-hud'>
                    <Button variant='outline' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                        <h3 style={{ fontSize: '12px', textAlign: 'center' }}>{combatState.player.name}</h3>
                    </Button>
                    { ascean?.journal.entries.length > 0 ?
                        <StoryJournal ascean={ascean} />
                    : '' }
                    { dialogTag ? (
                        <Button variant='' className='ascean-ui' onClick={() => dispatch(setShowDialog(!gameState.showDialog))}>
                            <h3 style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps', fontSize: '12px', textAlign: 'center' }}>Dialog!</h3>
                        </Button>
                    ) : ( '' ) }
                </div>
                <CombatMouseSettings damageType={combatState.weapons[0].damage_type} setDamageType={setDamageType} setPrayerBlessing={setPrayerBlessing} weapons={combatState.weapons.filter((weapon: any) => weapon.name !== 'Empty Weapon Slot')} />
                { showPlayer ? (  
                    <StoryAscean ascean={ascean} asceanViews={asceanViews} loading={loading} levelUpAscean={levelUpAscean} />
                ) : ( 
                    <div style={{ position: "absolute", zIndex: 1 }}>
                        <CombatUI state={combatState} staminaPercentage={staminaPercentage} pauseState={pauseState} />
                        { combatState.combatEngaged ? (
                            <div style={{ position: "absolute", top: "415px", left: "250px", zIndex: 0 }}>
                                <PhaserCombatText />
                            </div>
                        ) : ( '' ) }
                        { combatState.computer ? (
                            <EnemyUI pauseState={pauseState} />
                        ) : ( '' ) }
                    </div>
                ) }
                { gameState.showDialog && dialogTag ?    
                    <StoryDialog state={combatState} deleteEquipment={deleteEquipment} handlePlayerLuckout={handlePlayerLuckout} />
                : ( '' )}
                { gameState?.lootDrops.length > 0 && gameState.showLoot ? (
                    <LootDropUI />   
                ) : ( '' ) }
            </> ) : ( '' ) }
            <div id='story-game' style={{ textAlign: 'center' }} ref={gameRef}></div>
        </div>
    );
};

export default HostScene;