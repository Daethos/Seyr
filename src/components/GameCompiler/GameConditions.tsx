import { useEffect, useState } from 'react'
import * as gameAPI from '../../utils/gameApi'
import Loading from '../Loading/Loading';
import { ACTIONS, useInterval } from './CombatStore';

interface Props {
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    playDeath: Function;
    playWin: Function;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    gainExperience?: any;
    setLootRoll: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: any;
    state: any;
    soundEffects: (effects: any) => Promise<void>;
}

const GameConditions = ({ state, dispatch, soundEffects, timeLeft, setTimeLeft, gainExperience, setLootRoll, playWin, playDeath, setEmergencyText }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [timeLeftDisplay, setTimeLeftDisplay] = useState<number>(timeLeft);

    useEffect(() => {
        if (!timeLeftDisplay) return;
        const intervalId = setInterval(() => {
            setEmergencyText([`Auto Engage In ${timeLeftDisplay - 1} Second(s)`]);
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeftDisplay]);

    useEffect(() => {
        setTimeLeftDisplay(timeLeft);
    }, [timeLeft])

    // useInterval(() => {
    //     if (state.gameIsLive && timeLeft === 0) {
    //         autoAttack(state);
    //     }
    // }, timeLeft)

    // If The useInterval above ever breaks down, this is a backup
    useEffect(() => {
        const timer = setTimeout(() => {
            if (state.gameIsLive && timeLeft === 0) {
                autoAttack(state);
            }
        }, timeLeft);
        return () => clearTimeout(timer);
    }, [timeLeft, state]);

    const autoEngage = () => {
        dispatch({ type: ACTIONS.AUTO_ENGAGE, payload: !state.gameIsLive });
    };

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
            dispatch({ type: ACTIONS.AUTO_COMBAT, payload: response.data });
            await soundEffects(response.data);
            if (response.data.player_win === true) {
                playWin();
                gainExperience();
                setLootRoll(true);
                dispatch({
                    type: ACTIONS.PLAYER_WIN,
                    payload: response.data
                });
                setTimeLeft(0);
            }
            if (response.data.computer_win === true) {
                playDeath();
                dispatch({
                    type: ACTIONS.COMPUTER_WIN,
                    payload: response.data
                });
                setTimeLeft(0);
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
    { state.player_win || state.computer_win || !state.combatEngaged ? '' : 
    <button className="btn" id='auto-engage' onClick={autoEngage}>
        {!state.gameIsLive ? `Auto Engage` : `Disengage`}
    </button>
    }
    </>
  )
}

export default GameConditions