import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import './GamePvP.css'
import * as asceanAPI from '../../utils/asceanApi';  
import userService from "../../utils/userService";
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import * as gameAPI from '../../utils/gameApi'
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import GameAscean from '../../components/GameCompiler/GameAscean';
import GameActions from '../../components/GameCompiler/GameActions';
import GameAnimations from '../../components/GameCompiler/GameAnimations';
import useSound from 'use-sound'
import PvPAscean from '../../components/GameCompiler/PvPAscean';
import PvPConditions from '../../components/GameCompiler/PvPConditions';
import PvPCombatText from '../../components/GameCompiler/PvPCombatText';
import PvPActions from '../../components/GameCompiler/PvPActions';
import PVPAnimations from '../../components/GameCompiler/PvPAnimations';

interface GameProps {
    user: any;
    ascean: any;
    opponent: any;
    room: any;
    socket: any;
    combatData: any;
    setCombatData: any;
    setModalShow: any;
    enemyPlayer: any;
    yourData: any;
    enemyData: any;
    spectator: boolean;
}

const GamePvP = ({ user, ascean, opponent, spectator, room, socket, combatData, setCombatData, setModalShow, enemyPlayer, yourData, enemyData }: GameProps) => {
    // const [ascean, setAscean] = useState<any>({})
    // const [opponent, setOpponent] = useState<any>({})
    const [loading, setLoading] = useState(false);
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false)
    const [combatInitiated, setCombatInitiated] = useState<boolean>(false)
    const [actionStatus, setActionStatus] = useState<boolean>(false)
    const [highScore, setHighScore] = useState<number>(0)
    const [winStreak, setWinStreak] = useState<number>(0)
    const [loseStreak, setLoseStreak] = useState<number>(0)
    const [emergencyText, setEmergencyText] = useState<any[]>([])
    const [freshCombatData, setFreshCombatData] = useState<any>(combatData)
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const [playerWin, setPlayerWin] = useState<boolean>(false)
    const [computerWin, setComputerWin] = useState<boolean>(false)

    const [gameIsLive, setGameIsLive] = useState<boolean>(true)
    const [undefinedStats, setUndefinedStats] = useState<boolean>(false)
    const [undefinedComputer, setUndefinedComputer] = useState<boolean>(false)

    const opponentSfx = process.env.PUBLIC_URL + `/sounds/opponent.mp3`
    const [playOpponent] = useSound(opponentSfx, { volume: 0.5 })

    const weaponOrderSfx = process.env.PUBLIC_URL + `/sounds/weapon-order.mp3`
    const [playWO] = useSound(weaponOrderSfx, { volume: 0.5 })
    const counterSfx = process.env.PUBLIC_URL + `/sounds/counter-success.mp3`
    const [playCounter] = useSound(counterSfx, { volume: 0.5 })
    const rollSfx = process.env.PUBLIC_URL + `/sounds/roll-success.mp3`
    const [playRoll] = useSound(rollSfx, { volume: 0.5 })

    const pierceSfx = process.env.PUBLIC_URL + `/sounds/sword-stab.mp3`;
    const [playPierce] = useSound(pierceSfx, { volume: 0.5 });

    const slashSfx = process.env.PUBLIC_URL + `/sounds/slash-attack.mp3`;
    const [playSlash] = useSound(slashSfx, { volume: 0.5 });

    const bluntSfx = process.env.PUBLIC_URL + `/sounds/blunt-attack.mp3`;
    const [playBlunt] = useSound(bluntSfx, { volume: 0.5 });

    const deathSfx = process.env.PUBLIC_URL + `/sounds/death-sound.mp3`
    const [playDeath] = useSound(deathSfx, { volume: 0.5 })

    const winSfx = process.env.PUBLIC_URL + `/sounds/win-sound.mp3`
    const [playWin] = useSound(winSfx, { volume: 0.5 })

    const replaySfx = process.env.PUBLIC_URL + `/sounds/replay-sound.mp3`
    const [playReplay] = useSound(replaySfx, { volume: 0.5 })

    const religiousSfx = process.env.PUBLIC_URL + `/sounds/religious.mp3`
    const [playReligion] = useSound(religiousSfx, { volume: 0.5 })

    const daethicSfx = process.env.PUBLIC_URL + `/sounds/daethic-magic.mp3`
    const [playDaethic] = useSound(daethicSfx, { volume: 0.5 })

    const wildSfx = process.env.PUBLIC_URL + `/sounds/wild-magic.mp3`
    const [playWild] = useSound(wildSfx, { volume: 0.5 })

    const earthSfx = process.env.PUBLIC_URL + `/sounds/earth-magic.mp3`
    const [playEarth] = useSound(earthSfx, { volume: 0.5 })

    const fireSfx = process.env.PUBLIC_URL + `/sounds/fire-magic.mp3`
    const [playFire] = useSound(fireSfx, { volume: 0.5 })

    const bowSfx = process.env.PUBLIC_URL + `/sounds/bow-attack.mp3`
    const [playBow] = useSound(bowSfx, { volume: 0.5 })

    const frostSfx = process.env.PUBLIC_URL + `/sounds/frost-magic.mp3`
    const [playFrost] = useSound(frostSfx, { volume: 0.5 })

    const lightningSfx = process.env.PUBLIC_URL + `/sounds/lightning-magic.mp3`
    const [playLightning] = useSound(lightningSfx, { volume: 0.5 })

    const sorcerySfx = process.env.PUBLIC_URL + `/sounds/sorcery-magic.mp3`
    const [playSorcery] = useSound(sorcerySfx, { volume: 0.5 })

    const windSfx = process.env.PUBLIC_URL + `/sounds/wind-magic.mp3`
    const [playWind] = useSound(windSfx, { volume: 0.5 })


    const [dodgeStatus, setDodgeStatus] = useState<boolean>(false)

    const [totalPlayerOneHealth, setTotalPlayerOneHealth] = useState<number>(combatData?.player_one_attributes?.healthTotal)
    const [currentPlayerOneHealth, setCurrentPlayerOneHealth] = useState<number>(combatData?.current_player_one_health)

    const [totalPlayerTwoHealth, setTotalPlayerTwoHealth] = useState<number>(combatData?.player_two_attributes?.healthTotal)
    const [currentPlayerTwoHealth, setCurrentPlayerTwoHealth] = useState<number>(combatData?.current_player_two_health)

    function handleAction(action: any) {
        console.log(action.target.value, '<- Action being handled')
        if (yourData.player === 1) {
            setCombatData({
                ...combatData,
                'action': action.target.value,
                'player_one_counter_guess': ''
            })
            setTimeLeft(10)
        } else {
            setCombatData({
                ...combatData,
                'action_two': action.target.value,
                'player_two_counter_guess': ''
            })
        }
    }

    function handleCounter(counter: any) {
        console.log(counter.target.value, 'New Counter')
        if (yourData.player === 1) {
            setCombatData({
                ...combatData,
                'action': 'counter',
                'player_one_counter_guess': counter.target.value
            })
            setTimeLeft(10)
        } else {
            setCombatData({
                ...combatData,
                'action_two': 'counter',
                'player_two_counter_guess': counter.target.value
            })
        }
    }

    async function setWeaponOrder(weapon: any) {
        let weapons: any[];
        if (yourData.player === 1) {
            weapons = combatData.player_one_weapons
        } else {
            weapons = combatData.player_two_weapons
        }
        const findWeapon = weapons.filter(
            (weap: { name: any; }) => weap?.name === weapon.target.value
        );
        const newWeaponOrder = async () => weapons.sort((a: any, b: any) => {
            return (
                a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0
            )
        })
        const response = await newWeaponOrder();
        playWO()
        // console.log(response, '<- Response re-ordering weapons')
        if (yourData.player === 1) {
            setCombatData({...combatData, 'player_one_weapons': response})
            setTimeLeft(10)
        } else {
            setCombatData({...combatData, 'player_two_weapons': response})
        }
    }

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault()
        if (yourData.player === 1) {
            if (combatData.action === 'dodge') { 
                setDodgeStatus(true) 
            }
            if (combatData.action === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose An Action!\n`])
                return
            }
        } else {
            if (combatData.action_two === 'dodge') { 
                setDodgeStatus(true) 
            }
            if (combatData.action_two === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose An Action!\n`])
                return
            }
        }
        try {
            setEmergencyText([``])
            setTimeLeft(10)
            await socket.emit(`initiated`, combatData)
            console.log(combatData, 'Socket Emit Combat Data')
            setCombatInitiated(true)
            setActionStatus(true)
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        }
    }

    const resetAscean = async () => {
        try {
            await socket.emit(`request_reduel`, combatData)
           
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        }
    }

    // TODO:FIXME: Send it via like an auto-engage to update both peoples combatData to check for both player's initiation of actions

    useEffect(() => {
        socket.on(`combat_response`, (response: any) => {
            console.log('Combat Response!')
            statusUpdate(response)
        })
    }, [])

    const [reduelRequest, setReduelRequest] = useState<boolean>(false)

    useEffect(() => {
        socket.on(`reduel_requested`, async (newData: any) => {
            setCombatData(newData)
            if (newData.player_one_reduel === true || newData.player_two_reduel === true) {
                setReduelRequest(true)
            }
        })
    })

    useEffect(() => {
        socket.on(`reset_duel`, async () => {
            console.log('Duel Resetting')
            await resetCombat()
        })
    }, [])

    const resetCombat = async () => {
        try {
            setLoading(true)
            setCurrentPlayerOneHealth(totalPlayerOneHealth);
            setCurrentPlayerTwoHealth(totalPlayerTwoHealth)
            setComputerWin(false);
            setPlayerWin(false);
            setGameIsLive(true);
            setReduelRequest(false);
            setCombatData(freshCombatData)
            setTimeout(() => setLoading(false), 3000)
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Combat')
        }
    }

    useEffect(() => {
        socket.on(`soft_response`, (response: any) => {
            console.log(`Soft Response`)
            softUpdate(response)
        })
    })

    const softUpdate = async (response: any) => {
        try {
            setLoading(true)
            setTimeLeft(10)
            setCombatData({...response})
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error Performing Soft Update')
        }
    }

    const statusUpdate = async (response: any) => {
        try {
            setLoading(true)

            console.log(response, 'Response Auto Engaging')
            setCombatData({...response, 'action': '', 'action_two': '', 'player_one_counter_guess': '', 'player_two_counter_guess': ''})
            setCurrentPlayerOneHealth(response.new_player_one_health)
            setCurrentPlayerTwoHealth(response.new_player_two_health)
            setPlayerWin(yourData.player === 1 ? response.player_one_win : response.player_two_win)
            setComputerWin(enemyData.player === 2 ? response.player_two_win : response.player_one_win)
            if (yourData.player === 1) {
                if (response.player_one_critical_success === true) {
                    if (response.player_one_weapons[0].damage_type[0] === 'Spooky' || response.player_one_weapons[0].damage_type[0] === 'Righteous') {
                        playDaethic()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Wild') {
                        playWild()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Earth') {
                        playEarth()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Fire') {
                        playFire()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Frost') {
                        playFrost()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Lightning') {
                        playLightning()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Sorcery') {
                        playSorcery()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Wind') {
                        playWind()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Pierce' && response.player_one_weapons[0].type !== 'Bow') {
                        playPierce()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Blunt') {
                        playBlunt()
                    }
                    if (response.player_one_weapons[0].damage_type[0] === 'Slash') {
                        playSlash()
                    }
                    if (response.player_one_weapons[0].type === 'Bow') {
                        playBow()
                    }
                }
                if (response.player_one_religious_success === true) {
                    playReligion()
                }
                if (response.player_one_win === true) {
                    playWin()
                    setWinStreak((winStreak) => winStreak + 1)
                    if (winStreak + 1 > highScore) {
                        setHighScore((score) => score + 1)
                    }
                    setLoseStreak(0)
                    setGameIsLive(false)
                    setDodgeStatus(false)
                }
                if (response.player_two_win === true) {
                    playDeath()
                    setLoseStreak((loseStreak) => loseStreak + 1)
                    setWinStreak(0)
                    setGameIsLive(false)
                    setDodgeStatus(false)
                }
            } else {
                if (response.player_two_critical_success === true) {
                    if (response.player_two_weapons[0].damage_type[0] === 'Spooky' || response.player_two_weapons[0].damage_type[0] === 'Righteous') {
                        playDaethic()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Wild') {
                        playWild()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Earth') {
                        playEarth()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Fire') {
                        playFire()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Frost') {
                        playFrost()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Lightning') {
                        playLightning()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Sorcery') {
                        playSorcery()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Wind') {
                        playWind()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Pierce' && response.player_two_weapons[0].type !== 'Bow') {
                        playPierce()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Blunt') {
                        playBlunt()
                    }
                    if (response.player_two_weapons[0].damage_type[0] === 'Slash') {
                        playSlash()
                    }
                    if (response.player_two_weapons[0].type === 'Bow') {
                        playBow()
                    }
                }
                if (response.player_two_religious_success === true) {
                    playReligion()
                }
                if (response.player_two_win === true) {
                    playWin()
                    setWinStreak((winStreak) => winStreak + 1)
                    if (winStreak + 1 > highScore) {
                        setHighScore((score) => score + 1)
                    }
                    setLoseStreak(0)

                    setGameIsLive(false)
                    setDodgeStatus(false)
                }
                if (response.player_one_win === true) {
                    playDeath()
                    setLoseStreak((loseStreak) => loseStreak + 1)
                    setWinStreak(0)
                    
                    setGameIsLive(false)
                    setDodgeStatus(false)
                }
            }


            if (response.player_one_roll_success === true || response.player_two_roll_success === true) {
                playRoll()
            }
            if (response.player_one_counter_success === true || response.player_two_counter_success === true) {
                playCounter()
            }
            setLoading(false)
            // setTimeout(() => setLoading(false), 500)
        } catch (err: any) {
            console.log(err.message, 'Error Updating Status')
        }
    }

    function sleep(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    if (loading) {
        return (
            <Loading Combat={true} />
        )
    }

    if (loadingAscean) {
        return (
            <Loading Combat={true} />
        )
    }

    return (
        <Container fluid id="game-container" >
            <PVPAnimations 
                sleep={sleep} 
                playerCritical={yourData.player === 1 ? combatData.player_one_critical_success : combatData.player_two_critical_success} 
                computerCritical={enemyData.player === 2 ? combatData.player_two_critical_success : combatData.player_one_critical_success}
                combatInitiated={combatInitiated} setCombatInitiated={setCombatInitiated} 
                playerAction={yourData.player === 1 ? combatData.player_one_action : combatData.player_two_action} 

                computerAction={enemyData.player === 2 ? combatData.player_two_action : combatData.player_one_action} 
                playerDamageTotal={yourData.player === 1 ? combatData.realized_player_one_damage : combatData.realized_player_two_damage} 

                computerDamageTotal={enemyData.player === 2 ? combatData.realized_player_two_damage : combatData.realized_player_one_damage} 
                roll_success={yourData.player === 1 ? combatData.player_one_roll_success : combatData.player_two_roll_success} 

                computer_roll_success={enemyData.player === 2 ? combatData.player_two_roll_success : combatData.player_one_counter_success}
                counterSuccess={yourData.player === 1 ? combatData.player_one_counter_success : combatData.player_two_counter_success} 

                computerCounterSuccess={enemyData.player === 2 ? combatData.player_two_counter_success : combatData.player_one_counter_success}
            />
            {/* { combatData?.player_two_attributes?.healthTotal && currentPlayerTwoHealth >= 0 ? */}
                <PvPAscean ascean={enemyData.ascean} PvP={true} 
                    loading={loadingAscean} yourData={yourData} enemyData={enemyData}
                    undefined={undefinedStats} setUndefined={setUndefinedStats} 
                    undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} 
                    player={false} combatData={combatData} currentPlayerHealth={enemyData.player === 2 ? currentPlayerTwoHealth : currentPlayerOneHealth} />
            {/*     : <>{() => setUndefinedStats(false)}</>
            } */}
            <PvPConditions 
                combatData ={combatData} setCombatData={setCombatData} setEmergencyText={setEmergencyText} reduelRequest={reduelRequest}
                setCurrentPlayerHealth={yourData.player === 1 ? setCurrentPlayerOneHealth : setCurrentPlayerTwoHealth} 
                setCurrentComputerHealth={enemyData.player === 2 ? setCurrentPlayerTwoHealth : setCurrentPlayerOneHealth}
                setPlayerWin={setPlayerWin} setComputerWin={setComputerWin} yourData={yourData} enemyData={enemyData}
                setWinStreak={setWinStreak} setLoseStreak={setLoseStreak} playDeath={playDeath}
                playerWin={playerWin} computerWin={computerWin} playCounter={playCounter} playRoll={playRoll}
                winStreak={winStreak} loseStreak={loseStreak} setGameIsLive={setGameIsLive} highScore={highScore}
                resetAscean={resetAscean} gameIsLive={gameIsLive} setHighScore={setHighScore}
                playDaethic={playDaethic} playEarth={playEarth} playFire={playFire} playBow={playBow} playFrost={playFrost}
                playLightning={playLightning} playSorcery={playSorcery} playWind={playWind} playPierce={playPierce}
                playSlash={playSlash} playBlunt={playBlunt} playWin={playWin} playWild={playWild}
                playReligion={playReligion} setDodgeStatus={setDodgeStatus} socket={socket} freshCombatData={freshCombatData} setFreshCombatData={setFreshCombatData}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            />

            {/* { combatData?.player_one_attributes?.healthTotal && currentPlayerOneHealth >= 0 ? */}
                <PvPAscean ascean={ascean} PvP={true} player={true} yourData={yourData} enemyData={enemyData}
                    combatData={combatData} undefined={undefinedStats} 
                    setUndefined={setUndefinedStats} undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} 
                    currentPlayerHealth={yourData.player === 1 ? currentPlayerOneHealth : currentPlayerTwoHealth} loading={loadingAscean} />
                {/* : <>{() => setUndefinedStats(false)}</>
            } */}
            <span style={{ float: 'right' }} id='chat-button'>
                <Button variant='outline-danger'
                    style={{ color: '#fdf6d8', borderRadius: 50 + '%',
                        marginTop: 42.5 + 'vh', 
                        marginLeft: 45 + 'vw',
                        border: 1.5 + 'px' + ' solid ' + 'red' 
                    }} 
                    onClick={() => setModalShow(true)}
                    >
                        {
                            spectator 
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile-upside-down" viewBox="0 0 16 16">
                                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0-1a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
                                <path d="M4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5z"/>
                            </svg>
                            : 
                            <img src={enemyData.user.photoUrl} alt={enemyData.user.username} style={{ width: 40 + 'px', height: 40 + 'px', borderRadius: 50 + '%' }} />
                        }
                </Button>
            </span>
            { playerWin || computerWin ? '' : combatData?.player_one_weapons?.[0]?.name ?
            <PvPActions 
                setDodgeStatus={setDodgeStatus} actionStatus={actionStatus} setActionStatus={setActionStatus} PvP={true}
                combatData={combatData} sleep={sleep} dodgeStatus={dodgeStatus} yourData={yourData} enemyData={enemyData}
                weapons={yourData.player === 1 ? combatData.player_one_weapons : combatData.player_two_weapons} setWeaponOrder={setWeaponOrder} 
                handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} 
                currentWeapon={yourData.player === 1 ? combatData.player_one_weapons[0] : combatData.player_two_weapons[0]} 
                currentAction={yourData.player === 1 ? combatData.player_one_action : combatData.player_two_action} 
                currentCounter={yourData.player === 1 ? combatData.player_one_counter_guess : combatData.player_two_counter_guess} 
                setCombatData={setCombatData} setEmergencyText={setEmergencyText}
            /> : <Loading Combat={true} />
            }
            <PvPCombatText 
                ascean={ascean} user={user} combatData={combatData} emergencyText={emergencyText} 
                playerAction={yourData.player === 1 ? combatData.player_one_action : combatData.player_two_action} 
                computerAction={enemyData.player === 2 ? combatData.player_two_action : combatData.player_one_action} 

                playerCombatText={combatData.player_one_action_description} computerCombatText={combatData.player_two_action_description} 
                playerActionText={combatData.player_one_start_description} computerActionText={combatData.player_two_start_description}
                playerSpecialText={combatData.player_one_special_description} computerSpecialText={combatData.player_two_special_description}
                playerReligiousText={combatData.player_one_influence_description} computerReligiousText={combatData.player_two_influence_description}
                playerReligiousTextTwo={combatData.player_one_influence_description_two} computerReligiousTextTwo={combatData.player_two_influence_description_two}
            />
        </Container>
    )
}

export default GamePvP