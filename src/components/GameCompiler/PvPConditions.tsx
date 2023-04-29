import { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { PvPData, ACTIONS } from './PvPStore';


interface Props {
    state: PvPData;
    playerState: any;
    dispatch: any;
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    autoAttack: (data: any) => Promise<void>;
};

const PvPConditions = ({ state, playerState, dispatch, timeLeft, setTimeLeft, setEmergencyText, autoAttack }: Props) => {
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
            };
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

    // const higherPosition = (playerPosition: number, enemyPosition: number) => {
    //     console.log(playerPosition, enemyPosition, 'playerPosition, enemyPosition')
    //     if (playerPosition > enemyPosition) {
    //         return true;
    //     } else {
    //         return false;
    //     };
    // };

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <>            
        { state.player_win || state.enemy_win || !state.combatEngaged ? '' 
        // :
        //     state.enemyPosition !== -1 && higherPosition(state.playerPosition, state.enemyPosition) ? // PvP And Player is Player Higher Position
        //     <button className="btn" id='auto-engage' onClick={autoEngage}>
        //         {!state.gameIsLive ? `Auto Engage` : `Disengage`}
        //     </button>
            : state.enemyPosition === -1 ? // Computer Enemy
            <button className="btn" id='auto-engage' onClick={autoEngage}>
                {!state.gameIsLive ? `Auto Engage` : `Disengage`}
            </button>
            : '' // PvP And Player is not higher position
        }
        </>
    );
};

export default PvPConditions;