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
import AsceanImageCard from '../../components/AsceanImageCard/AsceanImageCard'
import GameHealthBar from '../../components/GameCompiler/GameHealthBar';
import GamePlayerStats from '../../components/GameCompiler/GamePlayerStats';
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

    const [physicalDefense, setPhysicalDefense] = useState<number>(0)
    const [magicalDefense, setMagicalDefense] = useState<number>(0)
    const [physicalPosture, setPhysicalPosture] = useState<number>(0)
    const [magicalPosture, setMagicalPosture] = useState<number>(0)

    const [totalPlayerHealth, setTotalPlayerHealth] = useState<number>(0)
    const [currentPlayerHealth, setCurrentPlayerHealth] = useState<number>(0)

    const [attributes, setAttributes] = useState<any>([])
    const [playerDefense, setPlayerDefense] = useState<any>([])

    const [combatData, setCombatData] = useState<any>({
        action: '',
        player_health: currentPlayerHealth,
        weapon_one: weaponOne,
        weapon_two: weaponTwo,
        weapon_three: weaponThree,
        player_defense: playerDefense,
        player_attributes: attributes
        
    })

    useEffect(() => {
      asceanStatCompiler()
    }, [getAscean])

    useEffect(() => {
        combatDataCompiler()
    }, [getAscean])
    

    async function asceanStatCompiler() {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(asceanID)
            console.log(response.data.data.attributes, 'Response Compiling Stats')
            setWeaponOne(response.data.data.combat_weapon_one)
            setWeaponTwo(response.data.data.combat_weapon_two)
            setWeaponThree(response.data.data.combat_weapon_three)
            setPlayerDefense(response.data.data.defense)
            setAttributes(response.data.data.attributes)
            setPhysicalDefense(response.data.data.defense.physicalDefenseModifier)
            setMagicalDefense(response.data.data.defense.magicalDefenseModifier)
            setPhysicalPosture(response.data.data.defense.physicalPosture)
            setMagicalPosture(response.data.data.defense.magicalPosture)
            setTotalPlayerHealth(response.data.data.attributes.healthTotal)
            setCurrentPlayerHealth(response.data.data.attributes.healthTotal)
            setPlayerWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
            setCombatData({
                ...combatData,
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
            'action': action.target.value
        })
        console.log(combatData)
    }

    async function setWeaponOrder(weapon: any) {
        const findWeapon = combatData.weapons.filter(
            (weap: { name: any; }) => weap?.name === weapon.target.value
        );
        const findWeaponIndex = combatData.weapons.findIndex(
            (weap: { name: any; }) => weap?.name === weapon.target.value
        );
        console.log(findWeapon[0], 'Weapon!')
        const newWeaponOrder = async () => combatData?.weapons.sort((a: any, b: any) => {
            return (
                // console.log(a, b)
                a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0
            )
        })
        const response = await newWeaponOrder()
        console.log(response, '<- Response re-ordering weapons')
        setCombatData({...combatData, 'weapons': response})
        // const weaponSplice = combatData.weapons.splice(findWeaponIndex, findWeaponIndex +1)
        // let newWeaponOrder = combatData.weapons;
        // newWeaponOrder = newWeaponOrder.splice(findWeaponIndex, findWeaponIndex +1);
        // console.log(newWeaponOrder(), '<- Weapon being handled')
        // setCombatData({
        //     ...combatData,
        //     'weapon_one': findWeapon
        // })
        // console.log(combatData)
    }

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault()
        try {
            // const response = gameAPI.initiateAction(ascean._id, combatData)
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
            <GameActions combatData={combatData} weapons={combatData.weapons} setWeaponOrder={setWeaponOrder} handleAction={handleAction} handleInitiate={handleInitiate} currentWeapon={combatData.weapons[0]} currentAction={combatData.action} setCombatData={setCombatData} />
            <GameCombatText ascean={ascean} user={user} />
        </Container>
    )
}

export default GameSolo