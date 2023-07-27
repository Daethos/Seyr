import { useEffect, useState, useReducer } from 'react'
import * as asceanAPI from '../../utils/asceanApi';  
import userService from "../../utils/userService";
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import * as gameAPI from '../../utils/gameApi'
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import GameAscean from '../../components/GameCompiler/GameAscean';
import GameActions from '../../components/GameCompiler/GameActions';
import GameAnimations from '../../components/GameCompiler/GameAnimations';
import GameConditions from '../../components/GameCompiler/GameConditions';
import Button from 'react-bootstrap/Button';
import { initialGameData, GameStore, GAME_ACTIONS } from '../../components/GameCompiler/GameStore';
import { ACTIONS, CombatData, CombatStore, initialCombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import FirstCombatModal from '../../components/GameCompiler/FirstCombatModal';
import useGameSounds from '../../components/GameCompiler/Sounds';
import CombatOverlay from '../../components/GameCompiler/CombatOverlay';

interface Props {
    guest: any;
    handleLogout: () => void;
};

const GuestGame = ({ guest, handleLogout }: Props) => {
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
    const [ascean, setAscean] = useState<any>({});
    const [opponent, setOpponent] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false);
    const [loadingOpponent, setLoadingOpponent] = useState<boolean>(false);
    const [emergencyText, setEmergencyText] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [background, setBackground] = useState<any>(null);
    const { playOpponent, playWO, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReplay, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playCombatRound } = useGameSounds(0.3);

    const getAscean = async (): Promise<void> => {
        setLoadingAscean(true);
        try {
            const guestData = {
                username: 'mirio',
                minLevel: 4,
                maxLevel: 6,
            };
            const firstResponse = await userService.getRandomEnemy(guestData);
            console.log(firstResponse, 'First Response');
            const response = await asceanAPI.getAsceanStats(firstResponse.data.ascean._id);
            console.log(response.data.data, 'Response');
            setAscean(response.data.data.ascean);
            dispatch({ type: ACTIONS.SET_GUEST, payload: response.data.data });
            let minLevel: number = 0;
            let maxLevel: number = 0;
            if (firstResponse.data.ascean.level === 4) {
                minLevel = 2;
                maxLevel = 6;
            } else {
                minLevel = 4;
                maxLevel = 8;
            };
            const enemyData = {
                username: 'mirio',
                minLevel: minLevel,
                maxLevel: maxLevel
            };
            const secondResponse = await userService.getRandomEnemy(enemyData);
            console.log(secondResponse, 'Enemy Response');
            const selectedOpponent = await asceanAPI.getOneAscean(secondResponse.data.ascean._id);
            console.log(selectedOpponent, 'Selected Opponent');
            const opponentResponse = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            console.log(opponentResponse.data.data, 'Opponent Response');
            setOpponent(selectedOpponent.data);
            dispatch({ type: ACTIONS.SET_NEW_COMPUTER_GUEST, payload: opponentResponse.data.data });
            playOpponent();
            setLoading(false);
            setLoadingAscean(false);
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit');
            setLoading(false);
        };
    };

    useEffect(() => {
        getAscean();
    }, []);

    const getNewAscean = async (): Promise<void> => {
        setLoadingAscean(true);
        try {
            const guestData = {
                username: 'mirio',
                minLevel: 4,
                maxLevel: 6,
            };
            const firstResponse = await userService.getRandomEnemy(guestData);
            console.log(firstResponse, 'First Response');
            const response = await asceanAPI.getAsceanStats(firstResponse.data.ascean._id);
            console.log(response.data.data, 'Response');
            setAscean(response.data.data.ascean);
            dispatch({ type: ACTIONS.SET_GUEST, payload: response.data.data });
            setLoadingAscean(false);
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit');
            setLoading(false);
        };
    };

    const getOpponent = async (): Promise<void> => {
        setLoadingOpponent(true);
        try {
            let minLevel: number = 0;
            let maxLevel: number = 0;
            if (ascean.level < 3) { // 1-2
                minLevel = 1;
                maxLevel = 3;
            } else if (ascean.level <= 4) { // 3-4
                minLevel = 2;
                maxLevel = 4;
            } else if (ascean.level <= 6) { // 5-6
                minLevel = 4;
                maxLevel = 8;
            } else if (ascean.level <= 8) { // 7-8
                minLevel = 4;
                maxLevel = 10;
            } else if (ascean.level <= 10) { // 9-10
                minLevel = 6;
                maxLevel = 12;
            } else if (ascean.level <= 14) { // 11-14
                minLevel = 8;
                maxLevel = 16;
            } else if (ascean.level <= 18) { // 15-18
                minLevel = 12;
                maxLevel = 18;
            } else if (ascean.level <= 20) {
                minLevel = 16;
                maxLevel = 20;
            }
            const enemyData = {
                username: 'mirio',
                minLevel: minLevel,
                maxLevel: maxLevel
            };
            const secondResponse = await userService.getRandomEnemy(enemyData);
            console.log(secondResponse, 'Enemy Response');
            const selectedOpponent = await asceanAPI.getOneAscean(secondResponse.data.ascean._id);
            console.log(selectedOpponent, 'Selected Opponent');
            const response = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            console.log(response.data.data, 'Opponent Response');
            setOpponent(selectedOpponent.data);
            dispatch({
                type: ACTIONS.SET_NEW_COMPUTER_GUEST,
                payload: response.data.data
            });
            playOpponent();
            setLoadingOpponent(false);
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies');
        };
    };

    function handleAction(action: any): void {
        dispatch({
            type: ACTIONS.SET_COMBAT_ACTION,
            payload: action.target.value
        });
        setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
    };

    function handleCounter(counter: any): void {
        dispatch({
            type: ACTIONS.SET_COMBAT_COUNTER,
            payload: counter.target.value
        });
        setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
    };

    async function setWeaponOrder(weapon: any): Promise<void> {
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

    async function setDamageType(damageType: any): Promise<void> {
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
            if (effects.criticalSuccess === true) {
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
                const { playerDamageType, weapons } = effects;
                const soundEffectFn = soundEffectMap[playerDamageType as keyof typeof soundEffectMap];
                if (soundEffectFn) soundEffectFn(weapons);
            };
            if (effects.religiousSuccess === true) playReligion();
            if (effects.rollSuccess === true || effects.computerRollSuccess === true) playRoll();
            if (effects.counterSuccess === true || effects.computerCounterSuccess === true) playCounter();
            setTimeout(() => {
                if (effects.playerWin !== true && effects.computerWin !== true) playCombatRound();
            }, 500);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Sound Effects')
        };
    };

    async function handlePlayerWin(combatData: CombatData): Promise<void> {
        try {
            playWin();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            setTimeout(() => {
                setTimeLeft(0);
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
            playDeath();
            setTimeLeft(0);
            setTimeout(() => {
                dispatch({ type: ACTIONS.COMPUTER_WIN, payload: combatData });
                gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleInitiate(combatData: CombatData): Promise<void> {
        try {
            if (combatData.action === '') {
                setEmergencyText([`You Forgot To Choose An Action!\n`]);
                return;
            };
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            const response = await gameAPI.initiateAction(combatData);
            if ('vibrate' in navigator) navigator.vibrate(150);
            console.log(response.data, 'Response Initiating Combat');
            dispatch({ type: ACTIONS.INITIATE_COMBAT, payload: response.data });
            await soundEffects(response.data);
            if (response.data.playerWin === true) await handlePlayerWin(response.data);
            if (response.data.computerWin === true) await handleComputerWin(response.data);
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        };
    };

    async function handleInstant(e: { preventDefault: () => void; }): Promise<void> {
        e.preventDefault();
        try {
            setEmergencyText([``]);
            gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: true });
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            const response = await gameAPI.instantAction(state);
            if ('vibrate' in navigator) navigator.vibrate(150);
            dispatch({ type: ACTIONS.INITIATE_COMBAT, payload: response.data });
            shakeScreen({ duration: 200, intensity: 1 });
            playReligion();
            if (response.data.playerWin === true) await handlePlayerWin(response.data);
            if (response.data.computerWin === true) await handleComputerWin(response.data);
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Insant Action')
        };
    };

    async function handlePrayer(e: { preventDefault: () => void; }): Promise<void> {
        e.preventDefault();
        try {
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            const response = await gameAPI.consumePrayer(state);
            if ('vibrate' in navigator) navigator.vibrate(150);
            dispatch({ type: ACTIONS.CONSUME_PRAYER, payload: response.data });
            shakeScreen({ duration: 200, intensity: 1 });
            playReligion();
            if (response.data.playerWin === true) await handlePlayerWin(response.data);
            if (response.data.computerWin === true) await handleComputerWin(response.data);
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action');
        };
    };

    const engageCombat = (): void => {
        dispatch({ type: ACTIONS.SET_DUEL, payload: '' });
    };

    const resetAscean = async () => {
        try {
            dispatch({ type: ACTIONS.RESET_PLAYER, payload: state });
            playReplay();
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean');
        };
    };

    useEffect(() => {
        if (ascean?.origin && background === null) {
            const getPlayerBackground = {
                background: "url(" + getBackgroundStyle(ascean.origin) + ")",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            };
            setBackground(getPlayerBackground);
        };
    }, [ascean]);

    function getBackgroundStyle(origin: string) {
        const num = Math.floor(Math.random() * 3) + 1;
        const chance = Math.floor(Math.random() * 3) + 1;
        switch (origin) {
            case 'Ashtre':
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/astralands_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/licivitas_${num}.jpg`;
                };
            case 'Fyers':
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/firelands_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/west_fangs_${num}.jpg`;
                };
            case "Li'ivi":
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/licivitas_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/west_fangs_${num}.jpg`;
                };
            case "Notheo":
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/kingdom_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/west_fangs_${num}.jpg`;
                };
            case "Nothos":
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/soverains_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/kingdom_${num}.jpg`;
                };
            case "Quor'eite":
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/sedyrus_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/licivitas_${num}.jpg`;
                };
            case 'Sedyreal':
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/sedyrus_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/firelands_${num}.jpg`;
                };
        };
    };

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <Container fluid id="game-container" style={ background }>
            <GameAnimations 
                playerCritical={state.criticalSuccess} computerCritical={state.computerCriticalSuccess}
                playerAction={state.playerAction} computerAction={state.computerAction} 
                playerDamageTotal={state.realizedPlayerDamage} computerDamageTotal={state.realizedComputerDamage} 
                rollSuccess={state.rollSuccess} computerRollSuccess={state.computerRollSuccess} combatRound={state.combatRound}
                counterSuccess={state.counterSuccess} computerCounterSuccess={state.computerCounterSuccess} combatEngaged={state.combatEngaged}
            />
            <GameAscean dispatch={dispatch} state={state} ascean={opponent} damage={state.computerDamaged} totalPlayerHealth={state.computer_health} loading={loadingOpponent} player={false} currentPlayerHealth={state.newComputerHealth} />
            <CombatOverlay 
                ascean={state.player} enemy={state.computer} playerWin={state.playerWin} computerWin={state.computerWin} playerCritical={state.criticalSuccess} computerCritical={state.computerCriticalSuccess}
                playerAction={state.playerAction} computerAction={state.computerAction} playerDamageTotal={state.realizedPlayerDamage} computerDamageTotal={state.realizedComputerDamage} 
                rollSuccess={state.rollSuccess} computerRollSuccess={state.computerRollSuccess} counterSuccess={state.counterSuccess} computerCounterSuccess={state.computerCounterSuccess}
                loadingCombatOverlay={gameState.loadingCombatOverlay} combatResolved={gameState.combatResolved} combatOverlayText={gameState.combatOverlayText} gameDispatch={gameDispatch} combatEngaged={state.combatEngaged}
                playerLuckout={state.player_luckout}
            />
            <GameConditions 
                setEmergencyText={setEmergencyText} dispatch={dispatch} state={state} soundEffects={soundEffects} vibrationTime={100} gameState={gameState}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft} handlePlayerWin={handlePlayerWin} handleComputerWin={handleComputerWin}
            />
            <Button variant='' className='settings-button' style={{ color: 'gold' }} onClick={() => handleLogout()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg> Signup</Button>
            <FirstCombatModal />
            { !state.combatEngaged ?
                state.playerWin ?
                <>
                <Button variant='' className='dialog-button' onClick={() => resetAscean()}>Duel</Button>
                <Button  variant='' className='inventory-button' onClick={() => getNewAscean()}>Re-Roll</Button>
                <Button variant='' className='combat-settings' style={{ gridColumnStart: 4, gridRowStart: 7}} onClick={() => getOpponent()}>New Opp</Button>
                </>
            : state.computerWin ?
                <>
                <Button variant='' className='dialog-button' onClick={() => resetAscean()}>Duel</Button>
                <Button variant='' className='inventory-button' onClick={() => getNewAscean()}>Re-Roll</Button>
                <Button variant='' className='combat-settings' style={{ gridColumnStart: 4, gridRowStart: 7}} onClick={() => getOpponent()}>New Opp</Button>
                </>
            :
                <>
                <Button variant='' className='combat-settings' style={{ gridColumnStart: 4, gridRowStart: 7}} onClick={() => getOpponent()}>New Opp</Button>
                <Button variant='' className='dialog-button' onClick={() => engageCombat()}>Engage</Button>
                <Button variant='' className='inventory-button' onClick={() => getNewAscean()}>Re-Roll</Button>   
                </>
            : '' }
            <GameAscean dispatch={dispatch} state={state} ascean={ascean} damage={state.playerDamaged} player={true} totalPlayerHealth={state.playerHealth} currentPlayerHealth={state.newPlayerHealth} loading={loadingAscean} />
            
            { state.playerWin || state.computerWin || !state.combatEngaged ? '' : state?.weapons ?
            <GameActions 
                setDamageType={setDamageType} dispatch={dispatch} state={state} handleInstant={handleInstant} handlePrayer={handlePrayer}
                setPrayerBlessing={setPrayerBlessing} weapons={state.weapons} damageType={state.weapons[0].damage_type} setWeaponOrder={setWeaponOrder}
                handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} gameState={gameState} gameDispatch={gameDispatch}
                currentWeapon={state.weapons[0]} currentDamageType={state.playerDamageType} currentAction={state.action} currentCounter={state.counterGuess} 
            /> : <Loading Combat={true} />
            }
            <GameCombatText 
               emergencyText={emergencyText} combatRoundText={state.combatRound}
                playerCombatText={state.playerActionDescription} computerCombatText={state.computerActionDescription} 
                playerActionText={state.playerStartDescription} computerActionText={state.computerStartDescription}
                playerDeathText={state.playerDeathDescription} computerDeathText={state.computerDeathDescription}
                playerSpecialText={state.playerSpecialDescription} computerSpecialText={state.computerSpecialDescription}
                playerReligiousText={state.playerInfluenceDescription} computerReligiousText={state.computerInfluenceDescription}
                playerReligiousTextTwo={state.playerInfluenceDescriptionTwo} computerReligiousTextTwo={state.computerInfluenceDescriptionTwo}
            />
        </Container>
    );
};

export default GuestGame;