import { useEffect, useState } from 'react'
import * as gameAPI from '../../utils/gameApi'
import Loading from '../Loading/Loading';
import { PvPData } from './PvPStore';


interface Props {
    state: PvPData;
    dispatch: any;
    playerState: any;
    playerDispatch: any;
    playerWin: boolean;
    computerWin: boolean;
    winStreak: number;
    loseStreak: number;
    highScore: number;
    resetAscean: () => Promise<void>;
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    gameIsLive: boolean;
    setGameIsLive: React.Dispatch<React.SetStateAction<boolean>>;
    socket: any;
    reduelRequest: boolean;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const PvPConditions = ({ socket, state, playerState, playerDispatch, dispatch, timeLeft, setTimeLeft, reduelRequest, gameIsLive, setGameIsLive, setEmergencyText, playerWin, computerWin, winStreak, loseStreak, highScore, resetAscean }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
      
    useEffect(() => {
        if (!timeLeft) return;
        const intervalId = setInterval(() => {
            setEmergencyText([`Auto Engage In ${timeLeft - 1} Second(s)`])
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        if (!gameIsLive) return;
        const interval = setInterval(async () => {
            autoAttack(state);
        }, 10000);
        return () => clearInterval(interval);
    }, [state, gameIsLive]);

    const autoEngage = () => {
        setGameIsLive((liveGameplay) => !liveGameplay);
    };
    useEffect(() => {
        if (gameIsLive) {
            setEmergencyText(['Auto Action Commencing']);
        };
        if (!gameIsLive) {
            setEmergencyText(['Auto Action Disengaging']);
        };
    }, [gameIsLive]);

    const autoAttack = async (data: any) => {
        if (playerState.playerOne.name !== state.player.name) {
            setTimeLeft(10);
            return;
        };
        setLoading(true);
        try {
            setEmergencyText([`Auto Engagement Response`]);
            await socket.emit(`auto_engage`, data);
            setTimeLeft(10);
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
        {playerWin ? 
            <div className="win-condition">
                You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
                { reduelRequest ? 
                    <button className='btn text-info' onClick={resetAscean} >{state?.player?.name} Requested Reduel. Click to Consent</button>
                : '' }
            </div> 
        : ''}
        { computerWin ? 
            <div className="win-condition">
                You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
                <button className='btn text-info' onClick={resetAscean} >Request Reduel With {state?.enemy?.name}?</button>
            </div> 
        : '' }
        {/* { playerWin || computerWin ? '' : 
            <button className="btn" id='auto-engage' onClick={autoEngage}>
                {!gameIsLive ? `Auto Engage` : `Disengage`}
            </button>
        } */}
        </>
    );
};

export default PvPConditions;