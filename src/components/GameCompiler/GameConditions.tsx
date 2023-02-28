import { useEffect, useState } from 'react'
import * as gameAPI from '../../utils/gameApi'
import Loading from '../Loading/Loading';
import { ACTIONS } from './CombatStore';
import { GAME_ACTIONS } from './GameStore';

interface Props {
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    dispatch: any;
    state: any;
    soundEffects: (effects: any) => Promise<void>;
    handlePlayerWin: (combatData: any) => Promise<void>;
    handleComputerWin: (combatData: any) => Promise<void>;
};

const GameConditions = ({ state, dispatch, soundEffects, timeLeft, setTimeLeft, setEmergencyText, handlePlayerWin, handleComputerWin }: Props) => {
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
    }, [timeLeft]);

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
        } ;
        if (!state.gameIsLive) {
            setEmergencyText(['Auto Action Disengaging']);
        };
    }, [state.gameIsLive]);

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
                await handlePlayerWin(response.data);
            };
            if (response.data.computer_win === true) {
                await handleComputerWin(response.data);
            };
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, 'Error Initiating Action');
        };
    };

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };

  return (
        <>            
        { state.player_win || state.computer_win || !state.combatEngaged ? '' : 
        <button className="btn" id='auto-engage' onClick={autoEngage}>
            {!state.gameIsLive ? `Auto Engage` : `Disengage`}
        </button>
        }
        </>
    );
};

export default GameConditions;