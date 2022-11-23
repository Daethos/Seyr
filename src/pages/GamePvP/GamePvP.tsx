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
}

const GamePvP = ({ user, ascean, opponent, room, socket, combatData, setCombatData, setModalShow, enemyPlayer }: GameProps) => {
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

    // const [playerOneWeaponOne, setPlayerOneWeaponOne] = useState<any>({})
    // const [playerOneWeaponTwo, setPlayerOneWeaponTwo] = useState<any>({})
    // const [playerOneWeaponThree, setPlayerOneWeaponThree] = useState<any>({})
    // const [playerOneWeapons, setPlayerOneWeapons] = useState<any>([])
    // const [dodgeStatus, setDodgeStatus] = useState<boolean>(false)

    // const [totalPlayerOneHealth, setTotalPlayerOneHealth] = useState<number>(0)
    // const [currentPlayerOneHealth, setCurrentPlayerOneHealth] = useState<number>(-5)

    // const [playerOneAttributes, setPlayerOneAttributes] = useState<any>([])
    // const [playerOneDefense, setPlayerOneDefense] = useState<any>([])

    // const [playerTwoWeaponOne, setPlayerTwoWeaponOne] = useState<any>({})
    // const [playerTwoWeaponTwo, setPlayerTwoWeaponTwo] = useState<any>({})
    // const [playerTwoWeaponThree, setPlayerTwoWeaponThree] = useState<any>({})
    // const [playerTwoWeapons, setPlayerTwoWeapons] = useState<any>({})

    // const [playerTwoAttributes, setPlayerTwoAttributes] = useState<any>([])
    // const [playerTwoDefense, setPlayerTwoDefense] = useState<any>([])
    // const [totalPlayerTwoHealth, setTotalPlayerTwoHealth] = useState<number>(-5)
    // const [currentPlayerTwoHealth, setCurrentPlayerTwoHealth] = useState<number>(0)

    const [playerOneWeaponOne, setPlayerOneWeaponOne] = useState<any>(combatData.player_one_weapon_one[0])
    const [playerOneWeaponTwo, setPlayerOneWeaponTwo] = useState<any>(combatData.player_one_weapon_one[1])
    const [playerOneWeaponThree, setPlayerOneWeaponThree] = useState<any>(combatData.player_one_weapon_one[2])
    const [playerOneWeapons, setPlayerOneWeapons] = useState<any>(combatData.player_one_weapons)
    const [dodgeStatus, setDodgeStatus] = useState<boolean>(false)

    const [totalPlayerOneHealth, setTotalPlayerOneHealth] = useState<number>(combatData.player_one_attributes.healthTotal)
    const [currentPlayerOneHealth, setCurrentPlayerOneHealth] = useState<number>(combatData.current_player_one_health)

    const [playerOneAttributes, setPlayerOneAttributes] = useState<any>(combatData.player_one_attributes)
    const [playerOneDefense, setPlayerOneDefense] = useState<any>(combatData.player_one_defense)

    const [playerTwoWeaponOne, setPlayerTwoWeaponOne] = useState<any>(combatData.player_two_weapons[0])
    const [playerTwoWeaponTwo, setPlayerTwoWeaponTwo] = useState<any>(combatData.player_two_weapons[1])
    const [playerTwoWeaponThree, setPlayerTwoWeaponThree] = useState<any>(combatData.player_two_weapons[2])
    const [playerTwoWeapons, setPlayerTwoWeapons] = useState<any>(combatData.player_two_weapons)

    const [playerTwoAttributes, setPlayerTwoAttributes] = useState<any>(combatData.player_two_attributes)
    const [playerTwoDefense, setPlayerTwoDefense] = useState<any>(combatData.player_two_defense)
    const [totalPlayerTwoHealth, setTotalPlayerTwoHealth] = useState<number>(combatData.player_two_attributes.healthTotal)
    const [currentPlayerTwoHealth, setCurrentPlayerTwoHealth] = useState<number>(combatData.current_player_two_health)


    // const [combatData, setCombatData] = useState<any>({
    //     room: room,
    //     action: '',
    //     player_one: ascean,
    //     player_one_action: '',
    //     player_one_counter_guess: '',
    //     player_one_health: currentPlayerOneHealth,
    //     player_one_weapons: [],
    //     player_one_weapon_one: playerOneWeaponOne,
    //     player_one_weapon_two: playerOneWeaponTwo,
    //     player_one_weapon_three: playerOneWeaponThree,
    //     player_one_defense: playerOneDefense,
    //     player_one_attributes: playerOneAttributes,
    //     current_player_one_health: currentPlayerOneHealth,
    //     new_player_one_health: currentPlayerOneHealth,

    //     player_one_religious_success: false,
    //     player_one_dual_wielding: false,
    //     player_one_critical_success: false,
    //     player_one_counter_success: false,
    //     player_one_roll_success: false,
    //     player_one_win: false,

    //     player_one_start_description: '',
    //     player_one_special_description: '',
    //     player_one_action_description: '',
    //     player_one_influence_description: '',
    //     player_one_influence_description_two: '',


    //     player_two: opponent,
    //     player_two_health: 0,
    //     player_two_action: '',
    //     player_two_counter_guess: '',
    //     player_two_weapons: [],
    //     player_two_weapon_one: playerTwoWeaponOne,
    //     player_two_weapon_two: playerTwoWeaponTwo,
    //     player_two_weapon_three: playerTwoWeaponThree,
    //     player_two_defense: playerTwoDefense,
    //     player_two_attributes: playerTwoAttributes,
    //     player_two_start_description: '',
    //     player_two_special_description: '',
    //     player_two_action_description: '',
    //     player_two_influence_description: '',
    //     player_two_influence_description_two: '',

    //     current_player_two_health: currentPlayerTwoHealth,
    //     new_player_two_health: currentPlayerTwoHealth,

    //     player_two_critical_success: false,
    //     player_two_dual_wielding: false,
    //     player_two_roll_success: false,
    //     player_two_counter_success: false,
    //     player_two_win: false,
    // })

    // useEffect(() => {
    //     opponentStatCompiler()
    // }, [opponent])

    // useEffect(() => {
    //     opponentDataCompiler();
    //   }, [opponent])

    // useEffect(() => {
    //     socket.on('receive_opponent', (data: { ascean: any; }) => {
    //         setOpponent(data.ascean)
    //     })
    // }, [])

    // const opponentStatCompiler = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await asceanAPI.getAsceanStats(opponent._id)
    //         // console.log(response.data.data, 'Response Compiling Stats')
    //         setPlayerTwoDefense(response.data.data.defense)
    //         setPlayerTwoAttributes(response.data.data.attributes)
    //         setTotalPlayerTwoHealth(response.data.data.attributes.healthTotal)
    //         setCurrentPlayerTwoHealth(response.data.data.attributes.healthTotal)
    //         setPlayerTwoWeaponOne(response.data.data.combat_weapon_one)
    //         setPlayerTwoWeaponTwo(response.data.data.combat_weapon_two)
    //         setPlayerTwoWeaponThree(response.data.data.combat_weapon_three)
    //         setPlayerTwoWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
    //         setCombatData({
    //             ...combatData,
    //             'player_two': response.data.data.ascean,
    //             'player_two_health': response.data.data.attributes.healthTotal,
    //             'current_player_two_health': response.data.data.attributes.healthTotal,
    //             'new_player_two_health': response.data.data.attributes.healthTotal,
    //             'player_two_weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
    //             'player_two_weapon_one': response.data.data.combat_weapon_one,
    //             'player_two_weapon_two': response.data.data.combat_weapon_two,
    //             'player_two_weapon_three': response.data.data.combat_weapon_three,
    //             'player_two_defense': response.data.data.defense,
    //             'player_two_attributes': response.data.data.attributes
    //         })
    //         setUndefinedComputer(false)
    //         setTimeout(() => setLoading(false), 3000);
    //         // setLoading(false)
    //     } catch (err: any) {
    //         setLoading(false)
    //         console.log(err.message, 'Error Compiling Ascean Stats')
    //     }
    // }

    // useEffect(() => {
    //   asceanStatCompiler()
    // }, [opponent, undefinedStats]) // Says to remove it?

    // const asceanStatCompiler = async () => {
    //     setLoadingAscean(true)
    //     try {
    //         const response = await asceanAPI.getAsceanStats(ascean._id)
    //         const response_two = await asceanAPI.getAsceanStats(opponent._id)
    //         // console.log(response.data.data, 'Response Compiling Stats')
    //         setPlayerOneDefense(response.data.data.defense)
    //         setPlayerOneAttributes(response.data.data.attributes)
    //         setTotalPlayerOneHealth(response.data.data.attributes.healthTotal)
    //         setCurrentPlayerOneHealth(response.data.data.attributes.healthTotal)
    //         setPlayerOneWeaponOne(response.data.data.combat_weapon_one)
    //         setPlayerOneWeaponTwo(response.data.data.combat_weapon_two)
    //         setPlayerOneWeaponThree(response.data.data.combat_weapon_three)
    //         setPlayerOneWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
    //         setCombatData({
    //             ...combatData,
    //             'player_one': response.data.data.ascean,
    //             'player_one_health': response.data.data.attributes.healthTotal,
    //             'current_player_one_health': response.data.data.attributes.healthTotal,
    //             'new_player_one_health': response.data.data.attributes.healthTotal,
    //             'player_one_weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
    //             'player_one_weapon_one': response.data.data.combat_weapon_one,
    //             'player_one_weapon_two': response.data.data.combat_weapon_two,
    //             'player_one_weapon_three': response.data.data.combat_weapon_three,
    //             'player_one_defense': response.data.data.defense,
    //             'player_one_attributes': response.data.data.attributes
    //         })


    //         // console.log(response_two.data.data, 'Response_two Compiling Stats')
    //         setPlayerTwoDefense(response_two.data.data.defense)
    //         setPlayerTwoAttributes(response_two.data.data.attributes)
    //         setTotalPlayerTwoHealth(response_two.data.data.attributes.healthTotal)
    //         setCurrentPlayerTwoHealth(response_two.data.data.attributes.healthTotal)
    //         setPlayerTwoWeaponOne(response_two.data.data.combat_weapon_one)
    //         setPlayerTwoWeaponTwo(response_two.data.data.combat_weapon_two)
    //         setPlayerTwoWeaponThree(response_two.data.data.combat_weapon_three)
    //         setPlayerTwoWeapons([response_two.data.data.combat_weapon_one, response_two.data.data.combat_weapon_two, response_two.data.data.combat_weapon_three])
    //         setCombatData({
    //             ...combatData,
    //             'player_two': response_two.data.data.ascean,
    //             'player_two_health': response_two.data.data.attributes.healthTotal,
    //             'current_player_two_health': response_two.data.data.attributes.healthTotal,
    //             'new_player_two_health': response_two.data.data.attributes.healthTotal,
    //             'player_two_weapons': [response_two.data.data.combat_weapon_one, response_two.data.data.combat_weapon_two, response_two.data.data.combat_weapon_three],
    //             'player_two_weapon_one': response_two.data.data.combat_weapon_one,
    //             'player_two_weapon_two': response_two.data.data.combat_weapon_two,
    //             'player_two_weapon_three': response_two.data.data.combat_weapon_three,
    //             'player_two_defense': response_two.data.data.defense,
    //             'player_two_attributes': response_two.data.data.attributes
    //         })


    //         setTimeout(() => {
    //             setLoadingAscean(false)
    //             setLoading(false)
    //         }, 3000);
    //         // setTimeout(() => setLoading(false), 5000)
    //         // setLoadingAscean(false)
    //         // setLoading(false)
    //     } catch (err: any) {
    //         setLoading(false)
    //         console.log(err.message, 'Error Compiling Ascean Stats')
    //     }
    // }
    
    // useEffect(() => {
    //     combatDataCompiler()
    // }, [])

    // const combatDataCompiler = async () => {
    //     setLoadingAscean(true)
    //     try {
    //         setCombatData({
    //             ...combatData,
    //             'player_one_health': currentPlayerOneHealth,
    //             'current_player_one_health': currentPlayerOneHealth,
    //             'new_player_one_health': currentPlayerOneHealth,
    //             'player_one_weapons': [playerOneWeaponOne, playerOneWeaponTwo, playerOneWeaponThree],
    //             'player_one_weapon_one': playerOneWeaponOne,
    //             'player_one_weapon_two': playerOneWeaponTwo,
    //             'player_one_weapon_three': playerOneWeaponThree,
    //             'player_one_defense': playerOneDefense,
    //             'player_one_attributes': playerOneAttributes
    //         })
    //         setUndefined(false)
    //         setTimeout(() => setLoadingAscean(false), 3000);
    //         // setLoadingAscean(false)
    //     } catch (err: any) {
    //         console.log(err.message, 'Error compiling combat data')
    //     }
    // }
    
    // useEffect(() => {
    //     if (highScore > ascean.high_score) {
    //         console.log('Congratulations on the New High Score, Sir!')
    //         updateHighScore();
    //     } else {
    //         return
    //     }
    // }, [highScore])

    // const updateHighScore = async () => {
    //     setLoadingAscean(true)
    //     try {
    //         const response = await asceanAPI.highScore({
    //             asceanId: ascean._id,
    //             highScore: highScore
    //         })
    //         console.log(response.data, 'Response Updating High Score')
    //         setAscean(response.data)
    //         getAscean()
    //         setLoadingAscean(false)
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Updating High Score')
    //     }
    // }

    function handleAction(action: any) {
        console.log(action.target.value, '<- Action being handled')
        setCombatData({
            ...combatData,
            'action': action.target.value,
            'player_one_counter_guess': ''
        })
    }

    function handleCounter(counter: any) {
        console.log(counter.target.value, 'New Counter')
        setCombatData({
            ...combatData,
            'action': 'counter',
            'player_one_counter_guess': counter.target.value
        })
    }

    async function setWeaponOrder(weapon: any) {
        const findWeapon = combatData.player_one_weapons.filter(
            (weap: { name: any; }) => weap?.name === weapon.target.value
        );
        const newWeaponOrder = async () => combatData?.player_one_weapons.sort((a: any, b: any) => {
            return (
                a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0
            )
        })
        const response = await newWeaponOrder();
        playWO()
        // console.log(response, '<- Response re-ordering weapons')
        setCombatData({...combatData, 'player_one_weapons': response})
    }

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault()
        if (combatData.action === 'dodge') { 
            setDodgeStatus(true) 
        }
        if (combatData.action === '') {
            setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose An Action!\n`
        ])
            return
        }
        try {
            console.log(combatData.action, 'Combat Action Being Initiated')
            setEmergencyText([``])
            await socket.emit(`send_combatData`, combatData)
            console.log(combatData, 'Socket Emit Combat Data')
            // const response = await gameAPI.initiateAction(combatData)
            setCombatInitiated(true)
            setActionStatus(true)
            // console.log(combatData, 'Response Initiating Combat')
            // setCombatData({...combatData, 'action': ''}) // Guessing the variable, something along those lines. Should be all that's needed to update
            // setCurrentPlayerOneHealth(combatData.new_player_one_health)
            // setCurrentPlayerTwoHealth(combatData.new_player_two_health)
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
            //     setWinStreak(winStreak + 1)
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
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        }
    }

    const resetAscean = async () => {
        try {
            // getOpponent();
            setCombatData({
                ...combatData,
                'current_player_one_health': totalPlayerOneHealth,
                'new_player_one_health': totalPlayerOneHealth,
                'current_player_two_health': totalPlayerOneHealth,
                'new_player_two_health': totalPlayerOneHealth,
                'player_one_weapons': [playerOneWeaponOne, playerOneWeaponTwo, playerOneWeaponThree],
                'player_one_win': false,
                'player_two_win': false
            });
            setCurrentPlayerOneHealth(totalPlayerOneHealth);
            setCurrentPlayerTwoHealth(totalPlayerTwoHealth)
            setComputerWin(false);
            setPlayerWin(false);
            setGameIsLive(true);
            setWinStreak(0);
            playReplay()
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        }
    }

    useEffect(() => {
        socket.on(`combat_response`, (response: any) => {
            console.log('Combat Response!')
            statusUpdate(response)
        })
    }, [socket])

    const statusUpdate = async (response: any) => {
        try {
            setLoading(true)

            console.log(response, 'Response Auto Engaging')
            setCombatData({...response, 'action': ''})
            setCurrentPlayerOneHealth(response.new_player_one_health)
            setCurrentPlayerTwoHealth(response.new_player_two_health)
            setPlayerWin(response.player_one_win)
            setComputerWin(response.player_two_win)
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
            if (response.player_one_roll_success === true || response.player_two_roll_success === true) {
                playRoll()
            }
            if (response.player_one_counter_success === true || response.player_two_counter_success === true) {
                playCounter()
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
            <GameAnimations 
                sleep={sleep} playerCritical={combatData.player_one_critical_success} computerCritical={combatData.player_two_critical_success}
                combatInitiated={combatInitiated} setCombatInitiated={setCombatInitiated} 
                playerAction={combatData.player_one_action} computerAction={combatData.player_two_action} 
                playerDamageTotal={combatData.realized_player_one_damage} computerDamageTotal={combatData.realized_player_two_damage} 
                roll_success={combatData.player_one_roll_success} computer_roll_success={combatData.player_two_roll_success}
                counterSuccess={combatData.player_one_counter_success} computerCounterSuccess={combatData.player_two_counter_success}
            />
            { combatData?.player_two_attributes?.healthTotal && currentPlayerTwoHealth >= 0 ?
                <PvPAscean ascean={opponent} PvP={true} 
                    loading={loadingAscean} 
                    undefined={undefinedStats} setUndefined={setUndefinedStats} 
                    undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} 
                    player={false} combatData={combatData} currentPlayerHealth={currentPlayerTwoHealth} />
                : <>{() => setUndefinedStats(false)}</>
            }
            <PvPConditions 
                combatData ={combatData} setCombatData={setCombatData} setEmergencyText={setEmergencyText}
                setCurrentPlayerHealth={setCurrentPlayerOneHealth} setCurrentComputerHealth={setCurrentPlayerTwoHealth}
                setPlayerWin={setPlayerWin} setComputerWin={setComputerWin}
                setWinStreak={setWinStreak} setLoseStreak={setLoseStreak} playDeath={playDeath}
                playerWin={playerWin} computerWin={computerWin} playCounter={playCounter} playRoll={playRoll}
                winStreak={winStreak} loseStreak={loseStreak} setGameIsLive={setGameIsLive} highScore={highScore}
                resetAscean={resetAscean} gameIsLive={gameIsLive} setHighScore={setHighScore}
                playDaethic={playDaethic} playEarth={playEarth} playFire={playFire} playBow={playBow} playFrost={playFrost}
                playLightning={playLightning} playSorcery={playSorcery} playWind={playWind} playPierce={playPierce}
                playSlash={playSlash} playBlunt={playBlunt} playWin={playWin} playWild={playWild}
                playReligion={playReligion} setDodgeStatus={setDodgeStatus} socket={socket}
            />

            { combatData?.player_one_attributes?.healthTotal && currentPlayerOneHealth >= 0 ?
                <PvPAscean ascean={ascean} PvP={true} player={true} 
                    combatData={combatData} undefined={undefinedStats} 
                    setUndefined={setUndefinedStats} undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} 
                    currentPlayerHealth={currentPlayerOneHealth} loading={loadingAscean} />
                : <>{() => setUndefinedStats(false)}</>
            }
            <span style={{ float: 'right' }} id='chat-button'>
                <Button variant='outline-danger'
                    style={{ color: '#fdf6d8', borderRadius: 50 + '%',
                        marginTop: 42.5 + 'vh', 
                        marginLeft: 45 + 'vw',
                        border: 1.5 + 'px' + ' solid ' + 'red' 
                    }} 
                    onClick={() => setModalShow(true)}
                    >
                    <img src={enemyPlayer.photoUrl} alt={enemyPlayer.username} style={{ width: 40 + 'px', height: 40 + 'px', borderRadius: 50 + '%' }} />
                </Button>
            </span>
            { playerWin || computerWin ? '' : combatData?.player_one_weapons?.[0]?.name ?
            <GameActions 
                setDodgeStatus={setDodgeStatus} actionStatus={actionStatus} setActionStatus={setActionStatus} PvP={true}
                combatData={combatData} sleep={sleep} dodgeStatus={dodgeStatus} 
                weapons={combatData.player_one_weapons} setWeaponOrder={setWeaponOrder} 
                handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} 
                currentWeapon={combatData.player_one_weapons[0]} currentAction={combatData.player_one_action} currentCounter={combatData.player_one_counter_guess} 
                setCombatData={setCombatData} setEmergencyText={setEmergencyText}
            /> : <Loading Combat={true} />
            }
            <PvPCombatText 
                ascean={ascean} user={user} combatData={combatData} emergencyText={emergencyText} 
                playerAction={combatData.player_one_action} computerAction={combatData.player_two_action} 
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