import React, { useEffect, useRef } from 'react'
import Phaser from "phaser"; 
import CombatMouseSettings from '../ui/CombatMouseSettings';
import CombatUI from '../ui/CombatUI';
import EnemyUI from '../ui/EnemyUI';
import EventEmitter from '../phaser/EventEmitter';
import PhaserCombatText from '../ui/PhaserCombatText';
import SmallHud from '../ui/SmallHud';
import StoryAscean, { viewCycleMap } from '../ui/StoryAscean';
import StoryTutorial from '../ui/StoryTutorial';
import useGameSounds from '../../components/GameCompiler/Sounds'; 
import * as eqpAPI from '../../utils/equipmentApi';
import { Equipment } from '../../components/GameCompiler/GameStore';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { LootDropUI } from '../ui/LootDropUI';
import { StoryDialog } from '../ui/StoryDialog';
import { useDispatch, useSelector } from 'react-redux';
import { clearNpc, getCombatTimerFetch, setToggleDamaged } from '../reducers/combatState';
import { setShowDialog, setMerchantEquipment, setShowLoot, setGameTimer, setStaminaPercentage, setAsceanViews, setShowPlayer, setDialogTag, setPauseState, setCurrentGame, setScrollEnabled, setCurrentNodeIndex, setGameChange } from '../reducers/gameState';
import { fetchEnemy, fetchNpc } from '../../components/GameCompiler/EnemyConcerns';
import { useKeyEvent, usePhaserEvent } from '../../pages/Story/Story';
import { config } from './Config';
import { setPhaserGameChange } from '../reducers/phaserState';

const HostScene = () => {
    const dispatch = useDispatch();
    const gameRef = useRef<any>({}); 
    const assets = useSelector((state: any) => state.phaser.assets);
    const combatState = useSelector((state: any) => state.combat);
    const gameState = useSelector((state: any) => state.game);
    const STAMINA = useSelector((state: any) => state.combat.playerAttributes.stamina);
    const { playDeath, playReligion, playCounter, playRoll, playPierce, playSlash, playBlunt, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind } = useGameSounds(gameState.soundEffectVolume);

    useEffect(() => { 
        startGame();
    }, []);

    useEffect(() => {
        updateCombatListener(combatState);
    }, [combatState]);

    window.addEventListener('popstate', () => {
        clearGame();
    });

    const clearGame = (): void => {
        const currentGameRef = gameRef.current; // Store the reference locally

        if (currentGameRef) {
            const gameDiv = currentGameRef; // You can use currentGameRef directly
            console.log(gameDiv, 'popstate in HostScene');

            while (gameDiv.firstChild) {
                gameDiv.removeChild(gameDiv.firstChild);
            };

            dispatch(setCurrentGame(false));
            currentGameRef.destroy(true);
            gameRef.current = null;
        };
        // const gameDiv = gameRef.current;
        // console.log(gameDiv, 'popstate in HostScene');
        
        // while (gameDiv && gameDiv.firstChild) {
        //     gameDiv.removeChild(gameDiv.firstChild);
        // };
        // dispatch(setCurrentGame(false));
        
        // if (!gameRef.current) return;
        // gameRef.current.destroy(true);
        // gameRef.current = null;
    };

    const restartGame = async (): Promise<void> => {
        try {
            dispatch(setPhaserGameChange(false));
            dispatch(setCurrentGame(false)); 
            dispatch(setShowPlayer(!gameState.showPlayer));
            while (gameRef.current.firstChild) {
                gameRef.current.removeChild(gameRef.current.firstChild);
            };
            gameRef.current.destroy(true);
            gameRef.current = null;
            dispatch(setPhaserGameChange(true));
            setTimeout(() => {
                startGame();
            }, 500)
        } catch (err: any) {
            console.log(err.message, 'Error Restarting Game');
        };
    };

    const startGame = async (): Promise<Phaser.Game> => gameRef.current = new Phaser.Game(config); 
 
    const clearNPC = async (): Promise<void> => {
        if (gameState.merchantEquipment.length > 0) {
            await deleteEquipment(gameState.merchantEquipment);
            dispatch(setMerchantEquipment([])); 
        };
        dispatch(clearNpc()); 
        dispatch(setCurrentNodeIndex(0));
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

    const gameHud = (e: { preventDefault: () => void; key: string; keyCode: number; shiftKey: string; }): void => {
        e.preventDefault();
        if (e.shiftKey && (e.key === 'c' || e.key === 'C')) dispatch(setShowDialog(!gameState.showDialog)); // (e.key === 'v' || e.key === 'V')
        if (!e.shiftKey && (e.key === 'c' || e.key === 'C')) dispatch(setShowPlayer(!gameState.showPlayer));
        if (e.key === 'x' || e.key === 'X') {
            const nextView = viewCycleMap[gameState.asceanViews as keyof typeof viewCycleMap];
            if (nextView) dispatch(setAsceanViews(nextView));
        };
        if (e.key === ' ' || e.keyCode === 32) togglePause();
        if (e.key === '`') dispatch(setScrollEnabled(!gameState.scrollEnabled));
    };
    const retrieveAssets = async () => {
        EventEmitter.emit('send-assets', assets);
    };
    const togglePause = (): void => {
        const pause = () => gameRef.current.scene.getScene('Play').pause();
        const resume = () => gameRef.current.scene.getScene('Play').resume();
        if (!gameState.pauseState) { pause(); } else { resume(); };
        dispatch(setPauseState(!gameState.pauseState));
    }; 

    const deleteEquipment = async (eqp: any): Promise<void> => await eqpAPI.deleteEquipment(eqp);
    const interactingLoot = async (e: boolean): Promise<{payload: any; type: "game/setShowLoot";}> => dispatch(setShowLoot(e)); 
    const launchGame = async (e: boolean) => {
        dispatch(setCurrentGame(e));
        if (!gameState.currentGame) dispatch(setCurrentGame(e));
    } 
    const sendAscean = async (): Promise<boolean> => EventEmitter.emit('get-ascean', combatState.player);
    const sendCombatData = async (): Promise<boolean> => EventEmitter.emit('get-combat-data', combatState);
    const sendDispatch = async (): Promise<boolean> => EventEmitter.emit('get-dispatch', dispatch);
    const sendEnemyData = async (): Promise<boolean> => EventEmitter.emit('get-enemy', combatState.computer);
    const sendGameData = async (): Promise<boolean> => EventEmitter.emit('get-game-data', gameState);
    const showDialog = async (e: boolean) => dispatch(setDialogTag(e));
    const updateCombatListener = (data: CombatData): boolean => EventEmitter.emit('update-combat-data', data); // Was Async
    const updateCombatTimer = async (e: number) => dispatch(getCombatTimerFetch(e)); 
    const updateStamina = async (e: number) => dispatch(setStaminaPercentage(gameState.staminaPercentage - e <= 0 ? 0 : gameState.staminaPercentage - e));
    const useStamina = (percent: number): void => {
        useEffect(() => { 
            if (percent < 100) {
                const timer = setTimeout(() => {
                    dispatch(setStaminaPercentage(percent + (STAMINA / 100)));
                    EventEmitter.emit('updated-stamina', Math.round(((percent + (STAMINA / 100)) / 100) * STAMINA));
                }, 200 - STAMINA);
                return () => clearTimeout(timer);
            };
        }, [percent]);
    };
    const useTimer = (timer: number, pause: boolean, ref: any, game: boolean): void => {
        useEffect(() => {
            if (!ref || !game) return;
            if (!pause) {
                const timeout = setTimeout(() => {
                    dispatch(setGameTimer(timer + 1));
                }, 1000);
                return () => clearTimeout(timeout);
            };
        }, [timer, pause, ref, game]);
    };
    
    useKeyEvent('keydown', gameHud);
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
    useStamina(gameState.staminaPercentage);
    useTimer(gameState.gameTimer, gameState.pauseState, gameRef.current, gameState.currentGame); // gameRef.current
 
    return (
        <div className='story-div' style={{ border: gameState.currentGame ? '' : '3px solid #fdf6d8' }}>
            { gameState.currentGame && gameRef.current && ( 
                <> 
                <SmallHud ascean={gameState.player} dialogTag={gameState.dialogTag} />
                { gameState.scrollEnabled && (
                    <CombatMouseSettings damageType={combatState.weapons[0].damage_type} weapons={combatState.weapons.filter((weapon: Equipment) => weapon?.name !== 'Empty Weapon Slot')} />
                ) }
                { gameState.showPlayer ? (  
                    <StoryAscean ascean={gameState.player} asceanViews={gameState.asceanViews} restartGame={restartGame} />
                ) : ( 
                    <div style={{ position: "absolute", zIndex: 1 }}>
                        <CombatUI state={combatState} staminaPercentage={gameState.staminaPercentage} pauseState={gameState.pauseState} />
                        { combatState.combatEngaged && (
                            <div style={{ position: "absolute", top: "420px", left: "250px", zIndex: 0 }}>
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
                    <StoryTutorial tutorial={gameState.tutorial} dispatch={dispatch} player={gameState.player}  /> 
                ) }
                </> 
            ) }
            <div id='story-game' style={{ textAlign: 'center' }} ref={gameRef}></div>
        </div>
    );
};

export default HostScene;