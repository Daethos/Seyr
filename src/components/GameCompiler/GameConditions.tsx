import { Socket } from 'dgram';
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
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const GameConditions = ({ combatData, setCombatData, timeLeft, setTimeLeft, setDodgeStatus, playReligion, playWin, playBlunt, playSlash, playWild, playPierce, playDaethic, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, gameIsLive, setGameIsLive, playCounter, playRoll, playDeath, setEmergencyText, setPlayerWin, setComputerWin, setWinStreak, setLoseStreak, setCurrentPlayerHealth, setCurrentComputerHealth, playerWin, computerWin, winStreak, loseStreak, highScore, setHighScore, getOpponent, resetAscean }: Props) => {
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

    const autoAttack = async (combatData: any) => {
        setLoading(true)
        setTimeLeft(10)
        try {
            setEmergencyText([`Auto Engagement Response`])
            const response = await gameAPI.initiateAction(combatData)
            console.log(response.data, 'Response Auto Engaging')
            setCombatData({...response.data, 'action': ''})
            setCurrentPlayerHealth(response.data.new_player_health)
            setCurrentComputerHealth(response.data.new_computer_health)
            setPlayerWin(response.data.player_win)
            setComputerWin(response.data.computer_win)
            if (response.data.critical_success === true) {
                if (response.data.weapons[0].damage_type[0] === 'Spooky' || response.data.weapons[0].damage_type[0] === 'Righteous') {
                    playDaethic()
                }
                if (response.data.weapons[0].damage_type[0] === 'Wild') {
                    playWild()
                }
                if (response.data.weapons[0].damage_type[0] === 'Earth') {
                    playEarth()
                }
                if (response.data.weapons[0].damage_type[0] === 'Fire') {
                    playFire()
                }
                if (response.data.weapons[0].damage_type[0] === 'Frost') {
                    playFrost()
                }
                if (response.data.weapons[0].damage_type[0] === 'Lightning') {
                    playLightning()
                }
                if (response.data.weapons[0].damage_type[0] === 'Sorcery') {
                    playSorcery()
                }
                if (response.data.weapons[0].damage_type[0] === 'Wind') {
                    playWind()
                }
                if (response.data.weapons[0].damage_type[0] === 'Pierce' && response.data.weapons[0].type !== 'Bow') {
                    playPierce()
                }
                if (response.data.weapons[0].damage_type[0] === 'Blunt') {
                    playBlunt()
                }
                if (response.data.weapons[0].damage_type[0] === 'Slash') {
                    playSlash()
                }
                if (response.data.weapons[0].type === 'Bow') {
                    playBow()
                }
            }
            if (response.data.religious_success === true) {
                playReligion()
            }
            if (response.data.roll_success === true || response.data.computer_roll_success === true) {
                playRoll()
            }
            if (response.data.counter_success === true || response.data.computer_counter_success === true) {
                playCounter()
            }
            if (response.data.player_win === true) {
                playWin()
                setWinStreak((winStreak) => winStreak + 1)
                if (winStreak + 1 > highScore) {
                    setHighScore((score) => score + 1)
                }
                setLoseStreak(0)
                setGameIsLive(false)
                setDodgeStatus(false)
            }
            if (response.data.computer_win === true) {
                playDeath()
                setLoseStreak((loseStreak) => loseStreak + 1)
                setWinStreak(0)
                setGameIsLive(false)
                setDodgeStatus(false)
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
    {playerWin ? <div className="win-condition" id='win-condition'>
    You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
    <button className='btn text-success' onClick={getOpponent}>Continue Dueling</button> 
    <button className='btn text-info' onClick={resetAscean} >Fresh Duel</button></div> : ''}
    {computerWin ? <div className="win-condition" id='win-condition'>
    You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
    <button className='btn text-info' onClick={resetAscean} >Fresh Duel?</button></div> : ''}
    { playerWin || computerWin ? '' : 
    
    <button className="btn" id='auto-engage' onClick={autoEngage}>
        {!gameIsLive ? `Auto Engage` : `Disengage`}
    </button>
    
    }
    </>
  )
}

export default GameConditions