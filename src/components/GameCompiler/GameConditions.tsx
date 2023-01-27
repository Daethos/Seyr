import { Socket } from 'dgram';
import { useEffect, useState } from 'react'
import * as gameAPI from '../../utils/gameApi'
import Loading from '../Loading/Loading';
import { ACTIONS } from './CombatStore';


interface Props {
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    playCounter: Function;
    playRoll: Function;
    playDeath: Function;
    playDaethic: Function;
    playEarth: Function;
    playFire: Function;
    playBow: Function;
    playFrost: Function;
    playLightning: Function;
    playSorcery: Function;
    playWind: Function;
    playPierce: Function;
    playWin: Function;
    playBlunt: Function;
    playSlash: Function;
    playWild: Function;
    playReligion: Function;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    gainExperience: any;
    setLootRoll: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: any;
    state: any;
}

const GameConditions = ({ state, dispatch, timeLeft, setTimeLeft, gainExperience, setLootRoll, playReligion, playWin, playBlunt, playSlash, playWild, playPierce, playDaethic, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playCounter, playRoll, playDeath, setEmergencyText }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!timeLeft) return;
        const intervalId = setInterval(() => {
            setEmergencyText([`Auto Engage In ${timeLeft - 1} Second(s)`]);
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        if (!state.gameIsLive) return;
        const interval = setInterval(async () => {
            autoAttack(state);
        }, 10000);
        return () => clearInterval(interval);
      }, [state, state.gameIsLive]);

      

    const autoEngage = () => {
        // setGameIsLive((liveGameplay) => !liveGameplay);
        dispatch({ type: ACTIONS.AUTO_ENGAGE, payload: !state.gameIsLive });
    }
    useEffect(() => {
        if (state.gameIsLive) {
            setEmergencyText(['Auto Action Commencing']);
        }
        if (!state.gameIsLive) {
            setEmergencyText(['Auto Action Disengaging']);
        }
      }, [state.gameIsLive])

    const autoAttack = async (combatData: any) => {
        setLoading(true);
        setTimeLeft(10);
        try {
            setEmergencyText([`Auto Engagement Response`]);
            const response = await gameAPI.initiateAction(combatData);
            console.log(response.data, 'Response Auto Engaging');
            // setCombatData({...response.data, 'action': ''}); // Turns into Dispatch via useReducer
            dispatch({ type: ACTIONS.INITIATE_COMBAT, payload: response.data });
            // setCurrentPlayerHealth(response.data.new_player_health);
            // setCurrentComputerHealth(response.data.new_computer_health);
            // setPlayerWin(response.data.player_win);
            // setComputerWin(response.data.computer_win);
            if (response.data.critical_success === true) {
                if (response.data.player_damage_type === 'Spooky' || response.data.player_damage_type === 'Righteous') {
                    playDaethic();
                }
                if (response.data.player_damage_type === 'Wild') {
                    playWild();
                }
                if (response.data.player_damage_type === 'Earth') {
                    playEarth();
                }
                if (response.data.player_damage_type === 'Fire') {
                    playFire();
                }
                if (response.data.player_damage_type === 'Frost') {
                    playFrost();
                }
                if (response.data.player_damage_type === 'Lightning') {
                    playLightning();
                }
                if (response.data.player_damage_type === 'Sorcery') {
                    playSorcery();
                }
                if (response.data.player_damage_type === 'Wind') {
                    playWind();
                }
                if (response.data.player_damage_type === 'Pierce' && response.data.weapons[0].type !== 'Bow') {
                    playPierce();
                }
                if (response.data.player_damage_type === 'Blunt') {
                    playBlunt();
                }
                if (response.data.player_damage_type === 'Slash') {
                    playSlash();
                }
                if (response.data.weapons[0].type === 'Bow') {
                    playBow();
                }
            }
            if (response.data.religious_success === true) {
                playReligion();
            }
            if (response.data.roll_success === true || response.data.computer_roll_success === true) {
                playRoll();
            }
            if (response.data.counter_success === true || response.data.computer_counter_success === true) {
                playCounter();
            }
            if (response.data.player_win === true) {
                playWin();
                gainExperience();
                // setWinStreak((winStreak) => winStreak + 1);
                // if (winStreak + 1 > highScore) {
                //     setHighScore((score) => score + 1);
                // }
                // setLoseStreak(0);
                // setGameIsLive(false);
                // setCombatEngaged(false);
                // setDodgeStatus(false);
                setLootRoll(true);
                setTimeLeft(0);
                dispatch({
                    type: ACTIONS.PLAYER_WIN,
                    payload: response.data
                });
            }
            if (response.data.computer_win === true) {
                playDeath();
                // setLoseStreak((loseStreak) => loseStreak + 1);
                // setWinStreak(0);
                // setGameIsLive(false);
                // setCombatEngaged(false);
                // setDodgeStatus(false);
                dispatch({
                    type: ACTIONS.COMPUTER_WIN,
                    payload: response.data
                });
            }
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, 'Error Initiating Action');
        }
    }

    if (loading) {
        return (
            <Loading Combat={true} />
        )
    }

  return (
    <>            
    {/* {playerWin ? <div className="win-condition" id='win-condition'>
    You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
    <button className='btn text-success' onClick={getOpponent}>Continue Dueling</button> 
    <button className='btn text-info' onClick={resetAscean}>Fresh Duel</button></div> : ''}
    {computerWin ? <div className="win-condition" id='win-condition'>
    You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
    <button className='btn text-info' onClick={resetAscean}>Fresh Duel?</button></div> : ''} */}
    { state.player_win || state.computer_win || !state.combatEngaged ? '' : 
    
    <button className="btn" id='auto-engage' onClick={autoEngage}>
        {!state.gameIsLive ? `Auto Engage` : `Disengage`}
    </button>
    
    }
    </>
  )
}

export default GameConditions