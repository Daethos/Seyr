import { useState, useEffect, useRef, useCallback } from 'react'
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
import * as eqpAPI from '../../utils/equipmentApi';
import { Equipment, Player } from '../../components/GameCompiler/GameStore';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import useGameSounds from '../../components/GameCompiler/Sounds'; 
import CombatMouseSettings from '../ui/CombatMouseSettings';
import CombatUI from '../ui/CombatUI';
import EnemyUI from '../ui/EnemyUI';
import { LootDropUI } from '../ui/LootDropUI';
import { StoryDialog } from '../ui/StoryDialog';
import EventEmitter from '../phaser/EventEmitter';
import { useDispatch, useSelector } from 'react-redux';
import { clearNpc, getCombatTimerFetch, setRest, setToggleDamaged } from '../reducers/combatState';
import { setShowDialog, setMerchantEquipment, setShowLoot } from '../reducers/gameState';
import PhaserCombatText from '../ui/PhaserCombatText';
import { checkTraits } from '../../components/GameCompiler/PlayerTraits';
import { fetchEnemy, fetchNpc } from '../../components/GameCompiler/EnemyConcerns';
import { useKeyEvent, usePhaserEvent } from '../../pages/Story/Story';
import SmallHud from '../ui/SmallHud';

interface Props {
    ascean: Player;
    assets: never[];
};

const HostScene = ({ assets, ascean }: Props) => {
    const dispatch = useDispatch();
    const combatState = useSelector((state: any) => state.combat);
    const gameState = useSelector((state: any) => state.game);
    const stamina = useSelector((state: any) => state.combat.playerAttributes.stamina);
    const { playDeath, playReligion, playCounter, playRoll, playPierce, playSlash, playBlunt, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind } = useGameSounds(gameState.soundEffectVolume);
    const [currentGame, setCurrentGame] = useState<any>(false);
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [pauseState, setPauseState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [dialogTag, setDialogTag] = useState<boolean>(false);
    const [staminaPercentage, setStaminaPercentage] = useState<number>(100); 
    const [asceanViews, setAsceanViews] = useState<string>('Character');
    const [gameTimer, setGameTimer] = useState<number>(0);
    const gameRef = useRef<any>({});
    let scenes: any[] = [];
    scenes.push(Boot);
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
        physics: {
            default: 'matter',
            matter: {
                // debug: true,
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
    };
 
    useEffect(() => { 
        const startGame = async () => {
            try {
                setLoading(true); 
                gameRef.current = new Phaser.Game(config); 
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (err: any) {
                console.log(err.message, 'Error Starting Game');
            };
        };
        startGame();
    }, []);

    useEffect(() => {
        updateCombatListener(combatState);
    }, [combatState]);

    const handleTimerTick = useCallback(() => {
        setGameTimer((timer) => timer + 1);
    }, []);

    const handleStaminaUpdate = useCallback(async () => {
        if (checkTraits("Kyn'gian", gameState.traits) && gameTimer % 10 === 0) {
            setStaminaPercentage((percentage) => percentage + (stamina / 100));
            EventEmitter.emit('updated-stamina', Math.round(((staminaPercentage + (stamina / 100)) / 100) * stamina));
            dispatch(setRest(1));
        };
    }, [gameState.traits, gameTimer, dispatch, stamina, staminaPercentage]);
     
    useEffect(() => {
        if (gameRef.current) {
            let scene = gameRef.current.scene.getScene('Play');
            if (scene && !pauseState) {
                const timerInterval = setTimeout(handleTimerTick, 1000);
                return () => {
                    handleStaminaUpdate();
                    clearTimeout(timerInterval);
                };
            };
        };
    }, [currentGame, pauseState]); 

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
    }, [stamina, staminaPercentage]);

    const updateCombatListener = (data: CombatData) => EventEmitter.emit('update-combat-data', data); // Was Async
    const retrieveAssets = async () => EventEmitter.emit('send-assets', assets);
    const sendEnemyData = async () => EventEmitter.emit('get-enemy', combatState.computer);
    const sendAscean = async () => EventEmitter.emit('get-ascean', combatState.player);
    const sendDispatch = async () => EventEmitter.emit('get-dispatch', dispatch);
    const sendCombatData = async () => EventEmitter.emit('get-combat-data', combatState);
    const sendGameData = async () => EventEmitter.emit('get-game-data', gameState);
    const updateCombatTimer = async (e: number) => dispatch(getCombatTimerFetch(e)); 
    const deleteEquipment = async (eqp: any): Promise<void> => await eqpAPI.deleteEquipment(eqp);

    const clearNPC = async (): Promise<void> => {
        dispatch(clearNpc()); 
        if (gameState.merchantEquipment.length > 0) {
            await deleteEquipment(gameState.merchantEquipment);
            dispatch(setMerchantEquipment([])); 
        };
    };

    const soundEffects = async (sfx: CombatData): Promise<void> => {
        try {
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
                Pierce: (weapon: Equipment) => (weapon.type === "Bow" || weapon.type === "Greatbow") ? playBow() : playPierce(),
                Slash: playSlash,
                Blunt: playBlunt,
            };
            if (sfx.computerDamaged) {
                const { playerDamageType } = sfx;
                const soundEffectFn = soundEffectMap[playerDamageType as keyof typeof soundEffectMap];
                if (soundEffectFn) soundEffectFn(sfx.weapons[0]);
            };
            if (sfx.playerDamaged) {
                const { computerDamageType } = sfx;
                const soundEffectFn = soundEffectMap[computerDamageType as keyof typeof soundEffectMap];
                if (soundEffectFn) soundEffectFn(sfx.computerWeapons[0]);
            };
            if (sfx.religiousSuccess === true) playReligion();
            if (sfx.rollSuccess === true || sfx.computerRollSuccess === true) playRoll();
            if (sfx.counterSuccess === true || sfx.computerCounterSuccess === true) playCounter();
            if (sfx.playerWin) playReligion();
            if (sfx.computerWin) playDeath();

            dispatch(setToggleDamaged(false));
        } catch (err: any) {
            console.log(err.message, 'Error Setting Sound Effects');
        };
    };

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

    const togglePause = (): void => {
        const pause = () => gameRef.current.scene.getScene('Play').pause();
        const resume = () => gameRef.current.scene.getScene('Play').resume();
        if (!pauseState) {
            pause();
            setPauseState(true);
        } else {
            resume();
            setPauseState(false);
        };
    }; 

    const launchGame = async (e: boolean): Promise<void> => setCurrentGame(e);
    const updateStamina = async (e: number): Promise<void> => setStaminaPercentage((prevPercentage: number) => prevPercentage - e <= 0 ? 0 : prevPercentage - e);
    const interactingLoot = async (e: boolean): Promise<{payload: any; type: "game/setShowLoot";}> => dispatch(setShowLoot(e)); 
    const showDialog = async (e: boolean): Promise<void> => setDialogTag(e);

    useKeyEvent('keydown', toggleCombatHud);
    usePhaserEvent('retrieve-assets', retrieveAssets);
    usePhaserEvent('clear-npc', clearNPC);
    usePhaserEvent('fetch-enemy', fetchEnemy);
    usePhaserEvent('fetch-npc', fetchNpc);
    usePhaserEvent('request-dispatch', sendDispatch);
    usePhaserEvent('request-ascean', sendAscean);
    usePhaserEvent('request-enemy', sendEnemyData);
    usePhaserEvent('request-combat-data', sendCombatData);
    usePhaserEvent('request-game-data', sendGameData); 
    usePhaserEvent('show-dialog', showDialog);
    usePhaserEvent('interacting-loot', interactingLoot);
    usePhaserEvent('launch-game', launchGame);
    usePhaserEvent('update-stamina', updateStamina);
    usePhaserEvent('update-combat-timer', updateCombatTimer);
    usePhaserEvent('update-sound', soundEffects);
 
    return (
        <div className='story-div' style={{ border: currentGame ? '' : '3px solid #fdf6d8' }}>
            { currentGame ? ( 
                <> 
                <SmallHud ascean={ascean} setShowPlayer={setShowPlayer} dialogTag={dialogTag} />
                <CombatMouseSettings damageType={combatState.weapons[0].damage_type} weapons={combatState.weapons.filter((weapon: Equipment) => weapon?.name !== 'Empty Weapon Slot')} />
                { showPlayer ? (  
                    <StoryAscean ascean={ascean} asceanViews={asceanViews} loading={loading} />
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
                    <StoryDialog state={combatState} deleteEquipment={deleteEquipment} />
                : ( '' )}
                { gameState?.lootDrops.length > 0 && gameState?.showLoot ? (
                    <LootDropUI gameState={gameState} />   
                ) : ( '' ) }
                </> 
            ) : ( '' ) }
            <div id='story-game' style={{ textAlign: 'center' }} ref={gameRef}></div>
        </div>
    );
};

export default HostScene;