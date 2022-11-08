import { useEffect, useState } from 'react'
import * as gameAPI from '../../utils/gameApi'
import Loading from '../Loading/Loading';


interface Props {
    playerWin: boolean;
    computerWin: boolean;
    winStreak: number;
    loseStreak: number;
    getOpponent: () => Promise<void>;
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
}

const GameConditions = ({ combatData, setCombatData, gameIsLive, setGameIsLive, setEmergencyText, setPlayerWin, setComputerWin, setWinStreak, setLoseStreak, setCurrentPlayerHealth, setCurrentComputerHealth, playerWin, computerWin, winStreak, loseStreak, getOpponent, resetAscean }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    if (gameIsLive) {
        
    }
    useEffect(() => {
        if (!gameIsLive) {
            return
        }
        const interval = setInterval(() => {
            autoAttack(combatData)
        }, 10000);
      
        return () => clearInterval(interval);
      }, [combatData]);


    const autoAttack = async (combatData: any) => {
        setLoading(true)
        try {
            setEmergencyText([`Auto Response Engaging`])
            const response = await gameAPI.initiateAction(combatData)

            console.log(response.data, 'Response Auto Engaging')
            setCombatData({...response.data, 'action': ''})
            setCurrentPlayerHealth(response.data.new_player_health)
            setCurrentComputerHealth(response.data.new_computer_health)
            setPlayerWin(response.data.player_win)
            setComputerWin(response.data.computer_win)

            if (response.data.player_win === true) {
                console.log('The Player Won!')
                setWinStreak((winStreak) => winStreak + 1)
                setLoseStreak(0)
                setGameIsLive(false)
            }
            if (response.data.computer_win === true) {
                console.log('The Computer Won!')
                setLoseStreak((loseStreak) => loseStreak + 1)
                setWinStreak(0)
                setGameIsLive(false)
            }
            setLoading(false)
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
    You Win! Hot Streak: {winStreak}!<br /> 
    <button className='btn text-success' onClick={getOpponent}>Continue Dueling</button> 
    <button className='btn text-info' onClick={resetAscean} >Fresh Duel</button></div> : ''}
    {computerWin ? <div className="win-condition">
    You Lose! Cold Streak: {loseStreak}! <br /> 
    <button className='btn text-info' onClick={resetAscean} >Fresh Duel?</button></div> : ''}
    </>
  )
}

export default GameConditions