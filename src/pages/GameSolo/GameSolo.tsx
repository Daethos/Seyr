import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import './GameSolo.css'
import * as asceanAPI from '../../utils/asceanApi';  
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as gameAPI from '../../utils/gameApi'
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import GameAscean from '../../components/GameCompiler/GameAscean';
import GameActions from '../../components/GameCompiler/GameActions';

interface GameProps {
    user: any;
}

const GameSolo = ({ user }: GameProps) => {
    const [ascean, setAscean] = useState<any>({})
    const [loading, setLoading] = useState(true);
    
    const [combatText, setCombatText] = useState<any>([])
    const { asceanID } = useParams();

    const getAscean = useCallback(async () => {
        setLoading(true);
        try {
            const response = await asceanAPI.getOneAscean(asceanID);
            // console.log(response, '<- Response in Getting an Ascean to Edit')
            setAscean(response.data);
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        }
    }, [asceanID])

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean])

    const [weaponOne, setWeaponOne] = useState<any>({})
    const [weaponTwo, setWeaponTwo] = useState<any>({})
    const [weaponThree, setWeaponThree] = useState<any>({})
    const [playerWeapons, setPlayerWeapons] = useState<any>([])

    const [totalPlayerHealth, setTotalPlayerHealth] = useState<number>(0)
    const [currentPlayerHealth, setCurrentPlayerHealth] = useState<number>(0)

    const [attributes, setAttributes] = useState<any>([])
    const [playerDefense, setPlayerDefense] = useState<any>([])

    const [combatData, setCombatData] = useState<any>({
        player: ascean,
        player_health: currentPlayerHealth,
        action: '',
        counter_guess: '',
        weapon_one: weaponOne,
        weapon_two: weaponTwo,
        weapon_three: weaponThree,
        player_defense: playerDefense,
        player_attributes: attributes,
        computer: '',
        computer_health: 0,
        computer_defense: '',
        computer_action: '',
        computer_counter_guess: '',
        computer_weapons: [],
        new_player_health: currentPlayerHealth,
        new_computer_health: 0
    })

    // UseEffect -> Enemy Function Getter
    // Function -> Get Computer Enemy
    // Essentially reverse engineer everything done for player, for the computer.

    useEffect(() => {
      asceanStatCompiler()
    }, [getAscean]) // Says to remove it?
    // TODO: FIXME: Check if removing it affects refreh at all or it's good without those dependencies TODO: FIXME:
    useEffect(() => {
        combatDataCompiler()
    }, [getAscean])
    

    async function asceanStatCompiler() {
        setLoading(true)
        try {
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
            setCombatData({
                ...combatData,
                'player': response.data.data.ascean,
                'player_health': response.data.data.attributes.healthTotal,
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
        try {
            setCombatData({
                ...combatData,
                'player_health': currentPlayerHealth,
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

    function handleAction(action: any) {
        console.log(action.target.value, '<- Action being handled')
        setCombatData({
            ...combatData,
            'action': action.target.value,
            'counter_guess': ''
        })
        console.log(combatData)
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
        const response = await newWeaponOrder()
        console.log(response, '<- Response re-ordering weapons')
        setCombatData({...combatData, 'weapons': response})
    }

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault()
        try {
            setCurrentPlayerHealth(currentPlayerHealth - 1)
            const response = await gameAPI.initiateAction(combatData)
            console.log(response, 'Response Initiating Combat')
            // setCombatData(response.data) // Guessing the variable, something along those lines. Should be all that's needed to update
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        }
    }

    if (loading) {
        return (
        <>
            <Loading />
        </>
        );
    }
    return (
        <Container fluid id="game-container">
            
            <GameAscean ascean={ascean} combatData={combatData} currentPlayerHealth={currentPlayerHealth} />
            <GameActions combatData={combatData} weapons={combatData.weapons} setWeaponOrder={setWeaponOrder} handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} currentWeapon={combatData.weapons[0]} currentAction={combatData.action} currentCounter={combatData.counter_guess} setCombatData={setCombatData} />
            <GameCombatText ascean={ascean} user={user} />
        </Container>
    )
}

export default GameSolo