import { useEffect, useState } from 'react'
import * as gameAPI from '../../utils/gameApi'
import Loading from '../Loading/Loading';


interface Props {
    playerWin: boolean;
    computerWin: boolean;
    winStreak: number;
    loseStreak: number;
    highScore: number;
    setHighScore: React.Dispatch<React.SetStateAction<number>>;
    getOpponent?: () => Promise<void>;
    resetAscean: () => Promise<void>;
    combatData: any;
    setCombatData: React.Dispatch<any>;
    setCurrentPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
    setCurrentComputerHealth: React.Dispatch<React.SetStateAction<number>>;
    setPlayerWin: React.Dispatch<React.SetStateAction<boolean>>;
    setComputerWin: React.Dispatch<React.SetStateAction<boolean>>;
    setWinStreak: React.Dispatch<React.SetStateAction<number>>;
    setLoseStreak: React.Dispatch<React.SetStateAction<number>>;
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    gameIsLive: boolean;
    setGameIsLive: React.Dispatch<React.SetStateAction<boolean>>;
    setDodgeStatus: React.Dispatch<React.SetStateAction<boolean>>;
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
    socket: any;
    freshCombatData: any;
    setFreshCombatData: any;
    reduelRequest: boolean;
    enemyData: any;
    yourData: any;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const PvPConditions = ({ combatData, socket, setCombatData, freshCombatData, setFreshCombatData, timeLeft, setTimeLeft, reduelRequest, enemyData, yourData, setDodgeStatus, playReligion, playWin, playBlunt, playSlash, playWild, playPierce, playDaethic, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, gameIsLive, setGameIsLive, playCounter, playRoll, playDeath, setEmergencyText, setPlayerWin, setComputerWin, setWinStreak, setLoseStreak, setCurrentPlayerHealth, setCurrentComputerHealth, playerWin, computerWin, winStreak, loseStreak, highScore, setHighScore, getOpponent, resetAscean }: Props) => {
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
            autoAttack(combatData)
        }, 10000);
        return () => clearInterval(interval);
      }, [combatData, gameIsLive]);

    const autoEngage = () => {
        setGameIsLive((liveGameplay) => !liveGameplay)
    }
    useEffect(() => {
        if (gameIsLive) {
            setEmergencyText(['Auto Action Commencing'])
        }
        if (!gameIsLive) {
            setEmergencyText(['Auto Action Disengaging'])
        }
      }, [gameIsLive])

    const autoAttack = async (data: any) => {
        if (yourData.player === 2) {
            setTimeLeft(10)
            return
        }
        setLoading(true)
        try {
            setEmergencyText([`Auto Engagement Response`])
            await socket.emit(`auto_engage`, data)
            setTimeLeft(10)
            setLoading(false)
            // const response = await gameAPI.pvpAction(combatData)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Initiating Action')
        }
    }

    if (loading) {
        return (
            <Loading Combat={true} />
        )
    }

  return (
    <>            
    {playerWin ? <div className="win-condition">
    You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
    {/* <button className='btn text-success' onClick={getOpponent}>Continue Dueling</button>  */}
    { reduelRequest
        ? <button className='btn text-info' onClick={resetAscean} >{enemyData?.ascean?.name} Requested Reduel. Click to Consent</button>
        : ''
    }
    </div> : ''}
    { computerWin 
        ? <div className="win-condition">
            You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
            <button className='btn text-info' onClick={resetAscean} >Request Reduel With {enemyData?.ascean?.name}?</button>
            </div> 
        : ''
    }
    {/* { playerWin || computerWin ? '' : 
    
    <button className="btn" id='auto-engage' onClick={autoEngage}>
        {!gameIsLive ? `Auto Engage` : `Disengage`}
    </button>
    
    } */}
    </>
  )
}

export default PvPConditions