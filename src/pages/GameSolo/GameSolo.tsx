import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import './GameSolo.css'
import * as asceanAPI from '../../utils/asceanApi';  
import userService from "../../utils/userService";
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import * as gameAPI from '../../utils/gameApi'
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import GameAscean from '../../components/GameCompiler/GameAscean';
import GameActions from '../../components/GameCompiler/GameActions';
import GameAnimations from '../../components/GameCompiler/GameAnimations';
import GameConditions from '../../components/GameCompiler/GameConditions';
import useSound from 'use-sound'

interface GameProps {
    user: any;
}

const GameSolo = ({ user }: GameProps) => {
    const [ascean, setAscean] = useState<any>({})
    const [opponent, setOpponent] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false)
    const [combatInitiated, setCombatInitiated] = useState<boolean>(false)
    const [actionStatus, setActionStatus] = useState<boolean>(false)
    const [highScore, setHighScore] = useState<number>(0)
    const [winStreak, setWinStreak] = useState<number>(0)
    const [loseStreak, setLoseStreak] = useState<number>(0)
    const [emergencyText, setEmergencyText] = useState<any[]>([])
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const [playerWin, setPlayerWin] = useState<boolean>(false)
    const [computerWin, setComputerWin] = useState<boolean>(false)

    const [gameIsLive, setGameIsLive] = useState<boolean>(false)
    const [undefined, setUndefined] = useState<boolean>(false)
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

    const { asceanID } = useParams();

    const [weaponOne, setWeaponOne] = useState<any>({})
    const [weaponTwo, setWeaponTwo] = useState<any>({})
    const [weaponThree, setWeaponThree] = useState<any>({})
    const [playerWeapons, setPlayerWeapons] = useState<any>([])
    const [dodgeStatus, setDodgeStatus] = useState<boolean>(false)

    const [totalPlayerHealth, setTotalPlayerHealth] = useState<number>(0)
    const [currentPlayerHealth, setCurrentPlayerHealth] = useState<number>(-5)

    const [attributes, setAttributes] = useState<any>([])
    const [playerDefense, setPlayerDefense] = useState<any>([])

    const [computerWeapons, setComputerWeapons] = useState<any>({})
    const [computerWeaponOne, setComputerWeaponOne] = useState<object>({})
    const [computerWeaponTwo, setComputerWeaponTwo] = useState<object>({})
    const [computerWeaponThree, setComputerWeaponThree] = useState<object>({})

    const [computerAttributes, setComputerAttributes] = useState<any>([])
    const [computerDefense, setComputerDefense] = useState<any>([])
    const [currentComputerHealth, setCurrentComputerHealth] = useState<number>(-5)
    const [totalComputerHealth, setTotalComputerHealth] = useState<number>(0)

    const [combatData, setCombatData] = useState<any>({
        player: ascean,
        action: '',
        player_action: '',
        counter_guess: '',
        player_health: currentPlayerHealth,
        weapons: [],
        weapon_one: weaponOne,
        weapon_two: weaponTwo,
        weapon_three: weaponThree,
        player_defense: playerDefense,
        player_attributes: attributes,
        computer: '',
        computer_health: currentComputerHealth,
        computer_action: '',
        computer_counter_guess: '',
        computer_weapons: [],
        computer_weapon_one: computerWeaponOne,
        computer_weapon_two: computerWeaponTwo,
        computer_weapon_three: computerWeaponThree,
        computer_defense: computerDefense,
        computer_attributes: computerAttributes,
        player_start_description: '',
        computer_start_description: '',
        player_special_description: '',
        computer_special_description: '',
        player_action_description: '',
        computer_action_description: '',
        player_influence_description: '',
        computer_influence_description: '',
        player_influence_description_two: '',
        computer_influence_description_two: '',
        player_death_description: '',
        computer_death_description: '',

        current_player_health: currentPlayerHealth,
        current_computer_health: currentComputerHealth,
        new_player_health: currentPlayerHealth,
        new_computer_health: currentComputerHealth,
        attack_weight: 0,
        counter_weight: 0,
        dodge_weight: 0,
        posture_weight: 0,
        roll_weight: 0,
        counter_attack_weight: 0,
        counter_counter_weight: 0,
        counter_dodge_weight: 0,
        counter_posture_weight: 0,
        counter_roll_weight: 0,
        religious_success: false,
        computer_religious_success: false,
        dual_wielding: false,
        computer_dual_wielding: false,
        roll_success: false,
        counter_success: false,
        computer_roll_success: false,
        computer_counter_success: false,
        player_win: false,
        computer_win: false,
        critical_success: false,
        computer_critical_success: false
    })

    const getAscean = useCallback(async () => {
        console.log('1?')
        setLoadingAscean(true)
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);

            const response = await asceanAPI.getAsceanStats(asceanID)
            console.log(response.data.data, 'Response Compiling Stats')
            setWeaponOne(response.data.data.combat_weapon_one)
            setWeaponTwo(response.data.data.combat_weapon_two)
            setWeaponThree(response.data.data.combat_weapon_three)
            setPlayerDefense(response.data.data.defense)
            setAttributes(response.data.data.attributes)
            setTotalPlayerHealth(response.data.data.attributes.healthTotal)
            setCurrentPlayerHealth(response.data.data.attributes.healthTotal)
            setPlayerWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
            // setCombatData({
            //     ...combatData,
            //     'player': response.data.data.ascean,
            //     'player_health': response.data.data.attributes.healthTotal,
            //     'current_player_health': response.data.data.attributes.healthTotal,
            //     'new_player_health': response.data.data.attributes.healthTotal,
            //     'weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
            //     'weapon_one': response.data.data.combat_weapon_one,
            //     'weapon_two': response.data.data.combat_weapon_two,
            //     'weapon_three': response.data.data.combat_weapon_three,
            //     'player_defense': response.data.data.defense,
            //     'player_attributes': response.data.data.attributes
            // })
            setLoadingAscean(false)

            setLoading(true)
            const secondResponse = await userService.getProfile('mirio');
            const randomOpponent = Math.floor(Math.random() * secondResponse.data.ascean.length);
            setOpponent(secondResponse.data.ascean[randomOpponent]);
            // console.log(secondResponse.data.ascean[randomOpponent], '<- New Opponent');
            const opponentResponse = await asceanAPI.getAsceanStats(secondResponse.data.ascean[randomOpponent]._id)
            // console.log(response.data.data, 'Response Compiling Stats')
            setComputerDefense(opponentResponse.data.data.defense)
            setComputerAttributes(opponentResponse.data.data.attributes)
            setTotalComputerHealth(opponentResponse.data.data.attributes.healthTotal)
            setCurrentComputerHealth(opponentResponse.data.data.attributes.healthTotal)
            setComputerWeapons([opponentResponse.data.data.combat_weapon_one, opponentResponse.data.data.combat_weapon_two, opponentResponse.data.data.combat_weapon_three])
            setCombatData({
                ...combatData,

                'player': response.data.data.ascean,
                'player_health': response.data.data.attributes.healthTotal,
                'current_player_health': response.data.data.attributes.healthTotal,
                'new_player_health': response.data.data.attributes.healthTotal,
                'weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
                'weapon_one': response.data.data.combat_weapon_one,
                'weapon_two': response.data.data.combat_weapon_two,
                'weapon_three': response.data.data.combat_weapon_three,
                'player_defense': response.data.data.defense,
                'player_attributes': response.data.data.attributes,

                'computer': opponentResponse.data.data.ascean,
                'computer_health': opponentResponse.data.data.attributes.healthTotal,
                'current_computer_health': opponentResponse.data.data.attributes.healthTotal,
                'new_computer_health': opponentResponse.data.data.attributes.healthTotal,
                'computer_weapons': [opponentResponse.data.data.combat_weapon_one, opponentResponse.data.data.combat_weapon_two, opponentResponse.data.data.combat_weapon_three],
                'computer_weapon_one': opponentResponse.data.data.combat_weapon_one,
                'computer_weapon_two': opponentResponse.data.data.combat_weapon_two,
                'computer_weapon_three': opponentResponse.data.data.combat_weapon_three,
                'computer_defense': opponentResponse.data.data.defense,
                'computer_attributes': opponentResponse.data.data.attributes
            })
            setComputerWin(false);
            setPlayerWin(false);
            setGameIsLive(true);
            playOpponent()

            setLoading(false)
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        }
    }, [asceanID])

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean])

    // useEffect(() => {
    //     getOpponent();
    // }, [getAscean])

    useEffect(() => {
        console.log(combatData, 'Update')
    }, [combatData])


    // useEffect(() => {
    //     opponentStatCompiler()
    // }, [opponent, undefinedComputer])

    // useEffect(() => {
    //     opponentDataCompiler();
    //   }, [opponent])
      

    const getOpponent = async () => {
        console.log('2?')
        setLoading(true)
        try {
            const firstResponse = await userService.getProfile('daethos');
            const randomOpponent = Math.floor(Math.random() * firstResponse.data.ascean.length);
            setOpponent(firstResponse.data.ascean[randomOpponent]);
            // console.log(firstResponse.data.ascean[randomOpponent], '<- New Opponent');
            const response = await asceanAPI.getAsceanStats(firstResponse.data.ascean[randomOpponent]._id)
            console.log(response.data.data, 'Response Compiling Stats For Opponent')
            setComputerDefense(response.data.data.defense)
            setComputerAttributes(response.data.data.attributes)
            setTotalComputerHealth(response.data.data.attributes.healthTotal)
            setCurrentComputerHealth(response.data.data.attributes.healthTotal)
            setComputerWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
            setCombatData({
                ...combatData,
                'computer': response.data.data.ascean,
                'computer_health': response.data.data.attributes.healthTotal,
                'current_computer_health': response.data.data.attributes.healthTotal,
                'new_computer_health': response.data.data.attributes.healthTotal,
                'computer_weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
                'computer_weapon_one': response.data.data.combat_weapon_one,
                'computer_weapon_two': response.data.data.combat_weapon_two,
                'computer_weapon_three': response.data.data.combat_weapon_three,
                'computer_defense': response.data.data.defense,
                'computer_attributes': response.data.data.attributes
            })
            setComputerWin(false);
            setPlayerWin(false);
            setGameIsLive(true);
            playOpponent()
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        }
    }

    const opponentStatCompiler = async () => {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(opponent._id)
            // console.log(response.data.data, 'Response Compiling Stats')
            setComputerDefense(response.data.data.defense)
            setComputerAttributes(response.data.data.attributes)
            setTotalComputerHealth(response.data.data.attributes.healthTotal)
            setCurrentComputerHealth(response.data.data.attributes.healthTotal)
            setComputerWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
            setCombatData({
                ...combatData,
                'computer': response.data.data.ascean,
                'computer_health': response.data.data.attributes.healthTotal,
                'current_computer_health': response.data.data.attributes.healthTotal,
                'new_computer_health': response.data.data.attributes.healthTotal,
                'computer_weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
                'computer_weapon_one': response.data.data.combat_weapon_one,
                'computer_weapon_two': response.data.data.combat_weapon_two,
                'computer_weapon_three': response.data.data.combat_weapon_three,
                'computer_defense': response.data.data.defense,
                'computer_attributes': response.data.data.attributes
            })
            setUndefinedComputer(false)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Compiling Ascean Stats')
        }
    }

    async function opponentDataCompiler() {
        setLoading(true)
        try {
            setCombatData({
                ...combatData,
                'computer_health': currentComputerHealth,
                'current_computer_health': currentComputerHealth,
                'new_computer_health': currentComputerHealth,
                'computer_weapons': [computerWeaponOne, computerWeaponTwo, computerWeaponThree],
                'computer_weapon_one': computerWeaponOne,
                'computer_weapon_two': computerWeaponTwo,
                'computer_weapon_three': computerWeaponThree,
                'computer_defense': computerDefense,
                'computer_attributes': computerAttributes
            })
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error compiling combat data')
        }
    }

    // useEffect(() => {
    //   asceanStatCompiler()
    // }, [getAscean]) // Says to remove it?

    const asceanStatCompiler = async () => {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(asceanID)
            // console.log(response.data.data, 'Response Compiling Stats')
            setWeaponOne(response.data.data.combat_weapon_one)
            setWeaponTwo(response.data.data.combat_weapon_two)
            setWeaponThree(response.data.data.combat_weapon_three)
            setPlayerDefense(response.data.data.defense)
            setAttributes(response.data.data.attributes)
            setTotalPlayerHealth(response.data.data.attributes.healthTotal)
            setCurrentPlayerHealth(response.data.data.attributes.healthTotal)
            setPlayerWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
            setCombatData({
                ...combatData,
                'player': response.data.data.ascean,
                'player_health': response.data.data.attributes.healthTotal,
                'current_player_health': response.data.data.attributes.healthTotal,
                'new_player_health': response.data.data.attributes.healthTotal,
                'weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
                'weapon_one': response.data.data.combat_weapon_one,
                'weapon_two': response.data.data.combat_weapon_two,
                'weapon_three': response.data.data.combat_weapon_three,
                'player_defense': response.data.data.defense,
                'player_attributes': response.data.data.attributes
            })
            // setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Compiling Ascean Stats')
        }
    }
    
    // useEffect(() => {
    //     console.log('3?')
    //     combatDataCompiler()
    // }, [getAscean, undefined])

    const combatDataCompiler = async () => {
        // setLoadingAscean(true)
        try {
            setCombatData({
                ...combatData,
                'player_health': currentPlayerHealth,
                'current_player_health': currentPlayerHealth,
                'new_player_health': currentPlayerHealth,
                'weapons': [weaponOne, weaponTwo, weaponThree],
                'weapon_one': weaponOne,
                'weapon_two': weaponTwo,
                'weapon_three': weaponThree,
                'player_defense': playerDefense,
                'player_attributes': attributes
            })
            setGameIsLive(true)
            setUndefined(false)
            setLoadingAscean(false)
        } catch (err: any) {
            console.log(err.message, 'Error compiling combat data')
        }
    }

    
    useEffect(() => {
        if (highScore > ascean.high_score) {
            console.log('Congratulations on the New High Score, Sir!')
            updateHighScore();
        } else {
            return
        }
    }, [highScore])

    const updateHighScore = async () => {
        setLoadingAscean(true)
        try {
            const response = await asceanAPI.highScore({
                asceanId: ascean._id,
                highScore: highScore
            })
            // console.log(response.data, 'Response Updating High Score')
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
            // setAscean(response.data)
            // getAscean()
            setLoadingAscean(false)
        } catch (err: any) {
            console.log(err.message, 'Error Updating High Score')
        }
    }

    function handleAction(action: any) {
        // console.log(action.target.value, '<- Action being handled')
        setCombatData({
            ...combatData,
            'action': action.target.value,
            'counter_guess': ''
        })
        setTimeLeft(10)
    }

    function handleCounter(counter: any) {
        // console.log(counter.target.value, 'New Counter')
        setCombatData({
            ...combatData,
            'action': 'counter',
            'counter_guess': counter.target.value
        })
        setTimeLeft(10)
    }

    async function setWeaponOrder(weapon: any) {
        const findWeapon = combatData.weapons.filter(
            (weap: { name: any; }) => weap?.name === weapon.target.value
        );
        const newWeaponOrder = async () => combatData?.weapons.sort((a: any, b: any) => {
            return (
                a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0
            )
        })
        const response = await newWeaponOrder();
        playWO()
        // console.log(response, '<- Response re-ordering weapons')
        setCombatData({...combatData, 'weapons': response})
        setTimeLeft(10)
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
            // console.log(combatData.action, 'Combat Action Being Initiated')
            setEmergencyText([``])
            setTimeLeft(10)
            const response = await gameAPI.initiateAction(combatData)
            setCombatInitiated(true)
            setActionStatus(true)
            console.log(response.data, 'Response Initiating Combat')
            setCombatData({...response.data, 'action': ''}) // Guessing the variable, something along those lines. Should be all that's needed to update
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
                setWinStreak(winStreak + 1)
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
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        }
    }

    const resetAscean = async () => {
        try {
            // await getOpponent();
            setCombatData({
                ...combatData,
                'player_defense': playerDefense,
                'player_attributes': attributes,
                'current_player_health': totalPlayerHealth,
                'new_player_health': totalPlayerHealth,
                'current_computer_health': totalComputerHealth,
                'new_computer_health': totalComputerHealth,
                'weapons': [weaponOne, weaponTwo, weaponThree],
                'player_win': false,
                'computer_win': false
            });
            setCurrentPlayerHealth(totalPlayerHealth);
            setCurrentComputerHealth(totalComputerHealth);
            setComputerWin(false);
            setPlayerWin(false);
            setGameIsLive(true);
            setWinStreak(0);
            playReplay()
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        }
    }

    function sleep(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    if (loading || loadingAscean) {
        return (
            <Loading Combat={true} />
        )
    }

    // if (loadingAscean) {
    //     return (
    //         <Loading Combat={true} />
    //     )
    // }

    return (
        <Container fluid id="game-container">
            <GameAnimations 
                sleep={sleep} playerCritical={combatData.critical_success} computerCritical={combatData.computer_critical_success}
                combatInitiated={combatInitiated} setCombatInitiated={setCombatInitiated} 
                playerAction={combatData.player_action} computerAction={combatData.computer_action} 
                playerDamageTotal={combatData.realized_player_damage} computerDamageTotal={combatData.realized_computer_damage} 
                roll_success={combatData.roll_success} computer_roll_success={combatData.computer_roll_success}
                counterSuccess={combatData.counter_success} computerCounterSuccess={combatData.computer_counter_success}
            />
            {/* { combatData?.computer_attributes?.healthTotal && currentComputerHealth >= 0 ? */}
                <GameAscean ascean={opponent} totalPlayerHealth={totalComputerHealth} loading={loadingAscean} opponentStatCompiler={opponentStatCompiler} undefined={undefined} setUndefined={setUndefined} undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} combatDataCompiler={combatDataCompiler} player={false} combatData={combatData} currentPlayerHealth={currentComputerHealth} />
                {/* : <>{opponentStatCompiler}</>
            } */}
            <GameConditions 
                combatData ={combatData} setCombatData={setCombatData} setEmergencyText={setEmergencyText}
                setCurrentPlayerHealth={setCurrentPlayerHealth} setCurrentComputerHealth={setCurrentComputerHealth}
                setPlayerWin={setPlayerWin} setComputerWin={setComputerWin}
                setWinStreak={setWinStreak} setLoseStreak={setLoseStreak} playDeath={playDeath}
                playerWin={playerWin} computerWin={computerWin} playCounter={playCounter} playRoll={playRoll}
                winStreak={winStreak} loseStreak={loseStreak} setGameIsLive={setGameIsLive} highScore={highScore}
                getOpponent={getOpponent} resetAscean={resetAscean} gameIsLive={gameIsLive} setHighScore={setHighScore}
                playDaethic={playDaethic} playEarth={playEarth} playFire={playFire} playBow={playBow} playFrost={playFrost}
                playLightning={playLightning} playSorcery={playSorcery} playWind={playWind} playPierce={playPierce}
                playSlash={playSlash} playBlunt={playBlunt} playWin={playWin} playWild={playWild}
                playReligion={playReligion} setDodgeStatus={setDodgeStatus} timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            />

            {/* { combatData?.player_attributes?.healthTotal && currentPlayerHealth >= 0 ? */}
                <GameAscean ascean={ascean} player={true} totalPlayerHealth={totalPlayerHealth} opponentStatCompiler={opponentStatCompiler} combatData={combatData} undefined={undefined} setUndefined={setUndefined} undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} combatDataCompiler={combatDataCompiler} currentPlayerHealth={currentPlayerHealth} loading={loadingAscean} />
                {/* : <>{combatDataCompiler}</>
            } */}
            
            { playerWin || computerWin ? '' : combatData?.weapons ?
            <GameActions 
                setDodgeStatus={setDodgeStatus} actionStatus={actionStatus} setActionStatus={setActionStatus} 
                combatData={combatData} sleep={sleep} dodgeStatus={dodgeStatus} 
                weapons={combatData.weapons} setWeaponOrder={setWeaponOrder} 
                handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} 
                currentWeapon={combatData.weapons[0]} currentAction={combatData.action} currentCounter={combatData.counter_guess} 
                setCombatData={setCombatData} setEmergencyText={setEmergencyText} timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            /> : <Loading Combat={true} />
            }
            <GameCombatText 
                ascean={ascean} user={user} combatData={combatData} emergencyText={emergencyText}
                playerAction={combatData.player_action} computerAction={combatData.computer_action} 
                playerCombatText={combatData.player_action_description} computerCombatText={combatData.computer_action_description} 
                playerActionText={combatData.player_start_description} computerActionText={combatData.computer_start_description}
                playerDeathText={combatData.player_death_description} computerDeathText={combatData.computer_death_description}
                playerSpecialText={combatData.player_special_description} computerSpecialText={combatData.computer_special_description}
                playerReligiousText={combatData.player_influence_description} computerReligiousText={combatData.computer_influence_description}
                playerReligiousTextTwo={combatData.player_influence_description_two} computerReligiousTextTwo={combatData.computer_influence_description_two}
            />
        </Container>
    )
}

export default GameSolo