import { useState, useEffect, useRef } from 'react'
import Phaser from "phaser"; 
import CombatMouseSettings from '../ui/CombatMouseSettings';
import CombatUI from '../ui/CombatUI';
import EnemyUI from '../ui/EnemyUI';
import EventEmitter from '../phaser/EventEmitter';
import PhaserCombatText from '../ui/PhaserCombatText';
import SmallHud from '../ui/SmallHud';
import StoryAscean from '../ui/StoryAscean';
import StoryTutorial from '../ui/StoryTutorial';
import useGameSounds from '../../components/GameCompiler/Sounds'; 
import * as eqpAPI from '../../utils/equipmentApi';
import { Equipment, Player } from '../../components/GameCompiler/GameStore';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { LootDropUI } from '../ui/LootDropUI';
import { StoryDialog } from '../ui/StoryDialog';
import { useDispatch, useSelector } from 'react-redux';
import { clearNpc, getCombatTimerFetch, setRest, setToggleDamaged } from '../reducers/combatState';
import { setShowDialog, setMerchantEquipment, setShowLoot, setGameTimer, setStaminaPercentage, setAsceanViews, setShowPlayer, setDialogTag, setPauseState, setCurrentGame, setScrollEnabled } from '../reducers/gameState';
import { checkTraits } from '../../components/GameCompiler/PlayerTraits';
import { fetchEnemy, fetchNpc } from '../../components/GameCompiler/EnemyConcerns';
import { useKeyEvent, usePhaserEvent } from '../../pages/Story/Story';
import { config } from './Config';

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
    const [loading, setLoading] = useState<boolean>(false);
    const gameRef = useRef<any>({}); 
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

    const useTimer = (timer: number, pause: boolean, ref: any, game: boolean): void => {
        useEffect(() => {
            console.log(timer, 'Timer');
            if (!ref || !game) return;
            if (!pause) {
                const timeout = setTimeout(() => {
                    dispatch(setGameTimer(timer + 1));
                }, 1000);
                return () => clearTimeout(timeout);
            };
        }, [timer, pause, ref, game]);
    };
    useTimer(gameState.gameTimer, gameState.pauseState, gameRef.current, gameState.currentGame);

    const useStamina = (staminaPercentage: number,): void => {
        useEffect(() => { 
            if (gameState.staminaPercentage < 100) {
                const timer = setTimeout(() => {
                    dispatch(setStaminaPercentage(staminaPercentage + (stamina / 100)));
                    EventEmitter.emit('updated-stamina', Math.round(((staminaPercentage + (stamina / 100)) / 100) * stamina));
                }, 200 - stamina);
                return () => clearTimeout(timer);
            };
        }, [staminaPercentage]);
    };
    useStamina(gameState.staminaPercentage); 

    const updateCombatListener = (data: CombatData): boolean => EventEmitter.emit('update-combat-data', data); // Was Async
    const retrieveAssets = async (): Promise<boolean> => EventEmitter.emit('send-assets', assets);
    const sendEnemyData = async (): Promise<boolean> => EventEmitter.emit('get-enemy', combatState.computer);
    const sendAscean = async (): Promise<boolean> => EventEmitter.emit('get-ascean', combatState.player);
    const sendDispatch = async (): Promise<boolean> => EventEmitter.emit('get-dispatch', dispatch);
    const sendCombatData = async (): Promise<boolean> => EventEmitter.emit('get-combat-data', combatState);
    const sendGameData = async (): Promise<boolean> => EventEmitter.emit('get-game-data', gameState);
    const updateCombatTimer = async (e: number) => dispatch(getCombatTimerFetch(e)); 
    const deleteEquipment = async (eqp: any): Promise<void> => await eqpAPI.deleteEquipment(eqp);

    const clearNPC = async (): Promise<void> => {
        if (gameState.merchantEquipment.length > 0) {
            await deleteEquipment(gameState.merchantEquipment);
            dispatch(setMerchantEquipment([])); 
        };
        dispatch(clearNpc()); 
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
        if (e.key === 'c' || e.key === 'C') dispatch(setShowPlayer(!gameState.showPlayer));
        if (e.key === 'x' || e.key === 'X') {
            switch (gameState.asceanViews) {
                case 'Character':
                    return dispatch(setAsceanViews('Inventory'));
                case 'Inventory':
                    return dispatch(setAsceanViews('Settings'));
                case 'Settings':
                    return dispatch(setAsceanViews('Character'));
                default:
                    break;
            }; 
        };
        if (e.key === ' ' || e.keyCode === 32) togglePause();
        if (e.key === '`') dispatch(setScrollEnabled(!gameState.scrollEnabled));
    };

    const togglePause = (): void => {
        const pause = () => gameRef.current.scene.getScene('Play').pause();
        const resume = () => gameRef.current.scene.getScene('Play').resume();
        if (!gameState.pauseState) {
            pause();
        } else {
            resume();
        };
        dispatch(setPauseState(!gameState.pauseState));
    }; 

    const launchGame = async (e: boolean) => dispatch(setCurrentGame(e));
    const updateStamina = async (e: number) => dispatch(setStaminaPercentage(gameState.staminaPercentage - e <= 0 ? 0 : gameState.staminaPercentage - e));
    const interactingLoot = async (e: boolean): Promise<{payload: any; type: "game/setShowLoot";}> => dispatch(setShowLoot(e)); 
    const showDialog = async (e: boolean) => dispatch(setDialogTag(e));

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
        <div className='story-div' style={{ border: gameState.currentGame ? '' : '3px solid #fdf6d8' }}>
            { gameState.currentGame && ( 
                <> 
                <SmallHud ascean={ascean} setShowPlayer={setShowPlayer} dialogTag={gameState.dialogTag} />
                { gameState.scrollEnabled && (
                    <CombatMouseSettings damageType={combatState.weapons[0].damage_type} weapons={combatState.weapons.filter((weapon: Equipment) => weapon?.name !== 'Empty Weapon Slot')} />
                ) }
                { gameState.showPlayer ? (  
                    <StoryAscean ascean={ascean} asceanViews={gameState.asceanViews} loading={loading} />
                ) : ( 
                    <div style={{ position: "absolute", zIndex: 1 }}>
                        <CombatUI state={combatState} staminaPercentage={gameState.staminaPercentage} pauseState={gameState.pauseState} />
                        { combatState.combatEngaged && (
                            <div style={{ position: "absolute", top: "415px", left: "250px", zIndex: 0 }}>
                                <PhaserCombatText />
                            </div>
                        ) } 
                        { combatState.computer && (
                            <EnemyUI pauseState={gameState.pauseState} />
                        ) }
                    </div>
                ) }
                { gameState.showDialog && gameState.dialogTag && (   
                    <StoryDialog state={combatState} deleteEquipment={deleteEquipment} />
                ) }
                { gameState?.lootDrops.length > 0 && gameState?.showLoot && (
                    <LootDropUI gameState={gameState} />   
                ) }
                { gameState.tutorial && ( 
                    <StoryTutorial tutorial={gameState.tutorial} dispatch={dispatch} player={ascean}  /> 
                ) }
                </> 
            ) }
            <div id='story-game' style={{ textAlign: 'center' }} ref={gameRef}></div>
        </div>
    );
};

export default HostScene;