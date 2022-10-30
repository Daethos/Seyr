import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
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
            //console.log(response.data.data.attributes, 'Response Compiling Stats')
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
        <Container fluid>
            <h1 className='text-white' style={{ textAlign: 'center' }}>Work in Progress! In the meantime, checkout {ascean.name}!</h1>
            

            <div className="game-block">
                <div className="actions">
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', marginTop: 5 + 'px' }} className='mb-2'>{ascean.name}</h3>
                <GameHealthBar totalPlayerHealth={totalPlayerHealth} currentPlayerHealth={currentPlayerHealth} />
                </div>
                <AsceanImageCard
                    weapon_one={weaponOne}
                    weapon_two={weaponTwo}
                    weapon_three={weaponThree}
                    shield={ascean.shield}
                    helmet={ascean.helmet}
                    chest={ascean.chest}
                    legs={ascean.legs}
                    amulet={ascean.amulet}
                    ring_one={ascean.ring_one}
                    ring_two={ascean.ring_two}
                    trinket={ascean.trinket}
                    gameDisplay={true}
                    key={ascean._id}
                />
                <div className="actions">
                <GamePlayerStats attributes={attributes} magicalDefense={magicalDefense} magicalPosture={magicalPosture} physicalDefense={physicalDefense} physicalPosture={physicalPosture} />
                </div>
            </div>
                <div className="action-buttons">
                    <button value='attack' onClick={handleAction} className='btn btn-outline' id='action-button'>Attack</button>
                    <button value='dodge' onClick={handleAction} className='btn btn-outline' id='action-button'>Dodge</button>
                    <button value='parry' onClick={handleAction} className='btn btn-outline' id='action-button'>Parry</button>
                    <button value='posture' onClick={handleAction} className='btn btn-outline' id='action-button'>Posture</button>
                    <button value='roll' onClick={handleAction} className='btn btn-outline' id='action-button'>Roll</button>
                        <Form onSubmit={handleInitiate} style={{ float: 'right' }}>                
                        <button value='initiate' type='submit' className='btn btn-outline text-info' id='action-button'>Initiate</button>
                        </Form>
                </div>
                <GameCombatText ascean={ascean} user={user} />
        </Container>
    )
}

export default GameSolo