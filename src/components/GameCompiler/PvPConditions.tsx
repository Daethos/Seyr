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
}

const PvPConditions = ({ combatData, socket, setCombatData, setDodgeStatus, playReligion, playWin, playBlunt, playSlash, playWild, playPierce, playDaethic, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, gameIsLive, setGameIsLive, playCounter, playRoll, playDeath, setEmergencyText, setPlayerWin, setComputerWin, setWinStreak, setLoseStreak, setCurrentPlayerHealth, setCurrentComputerHealth, playerWin, computerWin, winStreak, loseStreak, highScore, setHighScore, getOpponent, resetAscean }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!gameIsLive) {
            return
        }
        const interval = setInterval(() => {
            autoAttack(combatData)
        }, 6000);
      
        return () => clearInterval(interval);
      }, [combatData, gameIsLive]);

      

    const autoEngage = () => {
        setGameIsLive(liveGameplay => !liveGameplay)
    }

    useEffect(() => {
        if (gameIsLive) {
            setEmergencyText(['Auto Action Commencing'])
        }
        if (!gameIsLive) {
            setEmergencyText(['Auto Action Disengaging'])
        }
      }, [gameIsLive])

    // useEffect(() => {
    //     socket.on(`combat_response`, (response: any) => {
    //         console.log('Combat Response!')
    //         statusUpdate(response)
    //     })
    // }, [socket])

    // const statusUpdate = async (response: any) => {
    //     try {
    //         setLoading(true)

    //         console.log(response, 'Response Auto Engaging')
    //         setCombatData({...response, 'action': ''})
    //         setCurrentPlayerHealth(response.new_player_one_health)
    //         setCurrentComputerHealth(response.new_player_two_health)
    //         setPlayerWin(response.player_one_win)
    //         setComputerWin(response.player_two_win)
    //         if (response.player_one_critical_success === true) {
    //             if (response.player_one_weapons[0].damage_type[0] === 'Spooky' || response.player_one_weapons[0].damage_type[0] === 'Righteous') {
    //                 playDaethic()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Wild') {
    //                 playWild()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Earth') {
    //                 playEarth()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Fire') {
    //                 playFire()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Frost') {
    //                 playFrost()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Lightning') {
    //                 playLightning()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Sorcery') {
    //                 playSorcery()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Wind') {
    //                 playWind()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Pierce' && response.player_one_weapons[0].type !== 'Bow') {
    //                 playPierce()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Blunt') {
    //                 playBlunt()
    //             }
    //             if (response.player_one_weapons[0].damage_type[0] === 'Slash') {
    //                 playSlash()
    //             }
    //             if (response.player_one_weapons[0].type === 'Bow') {
    //                 playBow()
    //             }
    //         }
    //         if (response.player_one_religious_success === true) {
    //             playReligion()
    //         }
    //         if (response.player_one_roll_success === true || response.player_two_roll_success === true) {
    //             playRoll()
    //         }
    //         if (response.player_one_counter_success === true || response.player_two_counter_success === true) {
    //             playCounter()
    //         }
    //         if (response.player_one_win === true) {
    //             playWin()
    //             setWinStreak((winStreak) => winStreak + 1)
    //             if (winStreak + 1 > highScore) {
    //                 setHighScore((score) => score + 1)
    //             }
    //             setLoseStreak(0)
    //             setGameIsLive(false)
    //             setDodgeStatus(false)
    //         }
    //         if (response.player_two_win === true) {
    //             playDeath()
    //             setLoseStreak((loseStreak) => loseStreak + 1)
    //             setWinStreak(0)
    //             setGameIsLive(false)
    //             setDodgeStatus(false)
    //         }

    //         setTimeout(() => setLoading(false), 1000)
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Updating Status')
    //     }
    // }

    const autoAttack = async (combatData: any) => {
        setLoading(true)
        try {
            setEmergencyText([`Auto Engagement Response`])
            // const response = await gameAPI.pvpAction(combatData)
            await socket.emit(`send_combatData`, combatData)
            // console.log(combatData, 'Response Auto Engaging')
            // setCombatData({...combatData, 'action': ''})
            // setCurrentPlayerHealth(combatData.new_player_one_health)
            // setCurrentComputerHealth(combatData.new_player_two_health)
            // setPlayerWin(combatData.player_one_win)
            // setComputerWin(combatData.player_two_win)
            // if (combatData.player_one_critical_success === true) {
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Spooky' || combatData.player_one_weapons[0].damage_type[0] === 'Righteous') {
            //         playDaethic()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Wild') {
            //         playWild()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Earth') {
            //         playEarth()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Fire') {
            //         playFire()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Frost') {
            //         playFrost()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Lightning') {
            //         playLightning()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Sorcery') {
            //         playSorcery()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Wind') {
            //         playWind()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Pierce' && combatData.player_one_weapons[0].type !== 'Bow') {
            //         playPierce()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Blunt') {
            //         playBlunt()
            //     }
            //     if (combatData.player_one_weapons[0].damage_type[0] === 'Slash') {
            //         playSlash()
            //     }
            //     if (combatData.player_one_weapons[0].type === 'Bow') {
            //         playBow()
            //     }
            // }
            // if (combatData.player_one_religious_success === true) {
            //     playReligion()
            // }
            // if (combatData.player_one_roll_success === true || combatData.player_two_roll_success === true) {
            //     playRoll()
            // }
            // if (combatData.player_one_counter_success === true || combatData.player_two_counter_success === true) {
            //     playCounter()
            // }
            // if (combatData.player_one_win === true) {
            //     playWin()
            //     setWinStreak((winStreak) => winStreak + 1)
            //     if (winStreak + 1 > highScore) {
            //         setHighScore((score) => score + 1)
            //     }
            //     setLoseStreak(0)
            //     setGameIsLive(false)
            //     setDodgeStatus(false)
            // }
            // if (combatData.player_two_win === true) {
            //     playDeath()
            //     setLoseStreak((loseStreak) => loseStreak + 1)
            //     setWinStreak(0)
            //     setGameIsLive(false)
            //     setDodgeStatus(false)
            // }
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
    You Win. Hot Streak: {winStreak} Hi-Score ({highScore})<br /> 
    {/* <button className='btn text-success' onClick={getOpponent}>Continue Dueling</button>  */}
    <button className='btn text-info' onClick={resetAscean} >Fresh Duel</button></div> : ''}
    {computerWin ? <div className="win-condition">
    You Lose. Cold Streak: {loseStreak} Hi-Score ({highScore})<br /> 
    <button className='btn text-info' onClick={resetAscean} >Fresh Duel?</button></div> : ''}
    {/* { playerWin || computerWin ? '' : 
    
    <button className="btn" id='auto-engage' onClick={autoEngage}>
        {!gameIsLive ? `Auto Engage` : `Disengage`}
    </button>
    
    } */}
    </>
  )
}

export default PvPConditions