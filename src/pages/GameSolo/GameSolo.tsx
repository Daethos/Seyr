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
    const [combatInitiated, setCombatInitiated] = useState<boolean>(false)
    const [actionStatus, setActionStatus] = useState<boolean>(false)
    const [winStreak, setWinStreak] = useState<number>(0)
    const [loseStreak, setLoseStreak] = useState<number>(0)
    const [emergencyText, setEmergencyText] = useState<any[]>([])
    const [playerWin, setPlayerWin] = useState<boolean>(false)
    const [computerWin, setComputerWin] = useState<boolean>(false)
    const [gameIsLive, setGameIsLive] = useState<boolean>(true)
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

    const getAscean = useCallback(async () => {
        setLoading(true);
        try {
            const response = await asceanAPI.getOneAscean(asceanID);
            setAscean(response.data);
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        }
    }, [asceanID])

    useEffect(() => {
        getAscean();
        getOpponent();
    }, [asceanID, getAscean])

    const [weaponOne, setWeaponOne] = useState<any>({})
    const [weaponTwo, setWeaponTwo] = useState<any>({})
    const [weaponThree, setWeaponThree] = useState<any>({})
    const [playerWeapons, setPlayerWeapons] = useState<any>([])
    const [dodgeStatus, setDodgeStatus] = useState<boolean>(false)

    const [totalPlayerHealth, setTotalPlayerHealth] = useState<number>(0)
    const [currentPlayerHealth, setCurrentPlayerHealth] = useState<number>(0)

    const [attributes, setAttributes] = useState<any>([])
    const [playerDefense, setPlayerDefense] = useState<any>([])

    const [computerWeapons, setComputerWeapons] = useState<any>({})
    const [computerWeaponOne, setComputerWeaponOne] = useState<object>({})
    const [computerWeaponTwo, setComputerWeaponTwo] = useState<object>({})
    const [computerWeaponThree, setComputerWeaponThree] = useState<object>({})

    const [computerAttributes, setComputerAttributes] = useState<any>([])
    const [computerDefense, setComputerDefense] = useState<any>([])
    const [currentComputerHealth, setCurrentComputerHealth] = useState<number>(0)
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
        computer_health: 0,
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
        roll_success: false,
        counter_success: false,
        computer_roll_success: false,
        computer_counter_success: false,
        player_win: false,
        computer_win: false,
        critical_success: false,
        computer_critical_success: false
    })

    useEffect(() => {
        opponentStatCompiler()
    }, [opponent])

    useEffect(() => {
        opponentDataCompiler();
      }, [opponent])
      

    const getOpponent = async () => {
        setLoading(true)
        try {
            const response = await userService.getProfile('daethos');
            const randomOpponent = Math.floor(Math.random() * response.data.ascean.length);
            setOpponent(response.data.ascean[randomOpponent]);
            console.log(response.data.ascean[randomOpponent], '<- New Opponent');
            setComputerWin(false);
            setPlayerWin(false);
            setGameIsLive(true);
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
        } catch (err: any) {
            console.log(err.message, 'Error compiling combat data')
        }
    }


    useEffect(() => {
      asceanStatCompiler()
    }, [getAscean]) // Says to remove it?
    useEffect(() => {
        combatDataCompiler()
    }, [getAscean])
    

    async function asceanStatCompiler() {
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
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Compiling Ascean Stats')
        }
    }

    async function combatDataCompiler() {
        setLoading(true)
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
        } catch (err: any) {
            console.log(err.message, 'Error compiling combat data')
        }
    }

    useEffect(() => {
      console.log(combatData)
    }, [combatData])
    

    function handleAction(action: any) {
        console.log(action.target.value, '<- Action being handled')
        setCombatData({
            ...combatData,
            'action': action.target.value,
            'counter_guess': ''
        })
    }

    function handleCounter(counter: any) {
        console.log(counter.target.value, 'New Counter')
        setCombatData({
            ...combatData,
            'action': 'counter',
            'counter_guess': counter.target.value
        })
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
            const response = await gameAPI.initiateAction(combatData)
            setCombatInitiated(true)
            setActionStatus(true)
            console.log(response.data, 'Response Initiating Combat')
            setCombatData(response.data) // Guessing the variable, something along those lines. Should be all that's needed to update
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
            if (response.data.roll_success === true || response.data.computer_roll_success === true) {
                playRoll()
            }
            if (response.data.counter_success === true || response.data.computer_counter_success === true) {
                playCounter()
            }
            if (response.data.player_win === true) {
                playWin()
                setWinStreak(winStreak + 1)
                setLoseStreak(0)
                setGameIsLive(false)
            }
            if (response.data.computer_win === true) {
                playDeath()
                setLoseStreak(loseStreak + 1)
                setWinStreak(0)
                setGameIsLive(false)
            }
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        }
    }

    const resetAscean = async () => {
        try {
            getOpponent();
            setCombatData({
                ...combatData,
                'current_player_health': totalPlayerHealth,
                'new_player_health': totalPlayerHealth,
                'player_win': false,
                'computer_win': false
            });
            setCurrentPlayerHealth(totalPlayerHealth);
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

    if (loading) {
        return (
            <Loading Combat={true} />
        )
    }

    return (
        <Container fluid id="game-container">
            <GameAnimations 
                sleep={sleep} playerCritical={combatData.critical_success} computerCritical={combatData.computer_critical_success}
                combatInitiated={combatInitiated} setCombatInitiated={setCombatInitiated} 
                playerAction={combatData.player_action} computerAction={combatData.computer_action} 
                playerDamageTotal={combatData.realized_player_damage} computerDamageTotal={combatData.realized_computer_damage} 
            />
            <GameAscean ascean={opponent} player={false} combatData={combatData} currentPlayerHealth={currentComputerHealth} />
            <GameConditions 
                combatData ={combatData} setCombatData={setCombatData} setEmergencyText={setEmergencyText}
                setCurrentPlayerHealth={setCurrentPlayerHealth} setCurrentComputerHealth={setCurrentComputerHealth}
                setPlayerWin={setPlayerWin} setComputerWin={setComputerWin}
                setWinStreak={setWinStreak} setLoseStreak={setLoseStreak} playDeath={playDeath}
                playerWin={playerWin} computerWin={computerWin} playCounter={playCounter} playRoll={playRoll}
                winStreak={winStreak} loseStreak={loseStreak} setGameIsLive={setGameIsLive}
                getOpponent={getOpponent} resetAscean={resetAscean} gameIsLive={gameIsLive}
                playDaethic={playDaethic} playEarth={playEarth} playFire={playFire} playBow={playBow} playFrost={playFrost}
                playLightning={playLightning} playSorcery={playSorcery} playWind={playWind} playPierce={playPierce}
                playSlash={playSlash} playBlunt={playBlunt} playWin={playWin} playWild={playWild}
            />

            <GameAscean ascean={ascean} player={true} combatData={combatData} currentPlayerHealth={currentPlayerHealth} />
            { playerWin || computerWin ? '' :
            <GameActions 
                setDodgeStatus={setDodgeStatus} actionStatus={actionStatus} setActionStatus={setActionStatus} 
                combatData={combatData} sleep={sleep} dodgeStatus={dodgeStatus} 
                weapons={combatData.weapons} setWeaponOrder={setWeaponOrder} 
                handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} 
                currentWeapon={combatData.weapons[0]} currentAction={combatData.action} currentCounter={combatData.counter_guess} 
                setCombatData={setCombatData} 
            />
            }
            <GameCombatText 
                ascean={ascean} user={user} combatData={combatData} emergencyText={emergencyText}
                playerAction={combatData.player_action} computerAction={combatData.computer_action} 
                playerCombatText={combatData.player_action_description} computerCombatText={combatData.computer_action_description} 
                playerActionText={combatData.player_start_description} computerActionText={combatData.computer_start_description}
                playerSpecialText={combatData.player_special_description} computerSpecialText={combatData.computer_special_description}
            />
        </Container>
    )
}

export default GameSolo