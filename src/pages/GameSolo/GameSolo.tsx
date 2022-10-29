import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';  
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as gameAPI from '../../utils/gameApi'
import AsceanImageCard from '../../components/AsceanImageCard/AsceanImageCard'
import GameAttributeCompiler from '../../components/GameCompiler/GameAttributeCompiler';
import GameHealthBar from '../../components/GameCompiler/GameHealthBar';
import GamePlayerStats from '../../components/GameCompiler/GamePlayerStats';

interface GameProps {
    user: any;
}

const GameSolo = ({ user }: GameProps) => {
    const [ascean, setAscean] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const { asceanID } = useParams();
    const communityFocus = false;

    const getAscean = useCallback(async () => {
        setLoading(true);
        try {
            const response = await asceanAPI.getOneAscean(asceanID);
            console.log(response, '<- Response in Getting an Ascean to Edit')
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

    const [physicalDefense, setPhysicalDefense] = useState<number>(0)
    const [magicalDefense, setMagicalDefense] = useState<number>(0)
    const [physicalPosture, setPhysicalPosture] = useState<number>(0)
    const [magicalPosture, setMagicalPosture] = useState<number>(0)

    const [totalPlayerHealth, setTotalPlayerHealth] = useState<number>(0)
    const [currentPlayerHealth, setCurrentPlayerHealth] = useState<number>(0)

    const [attributes, setAttributes] = useState<any>([])
    const [defense, setDefense] = useState<any>([])

    useEffect(() => {
      asceanStatCompiler()
    }, [getAscean])

    
    

    async function asceanStatCompiler() {
        setLoading(true)
        try {
            const response = await asceanAPI.getAsceanStats(asceanID)
            //console.log(response.data.data.attributes, 'Response Compiling Stats')
            setWeaponOne(response.data.data.combat_weapon_one)
            setWeaponTwo(response.data.data.combat_weapon_two)
            setWeaponThree(response.data.data.combat_weapon_three)
            setDefense(response.data.data.defense)
            setAttributes(response.data.data.attributes)
            setPhysicalDefense(response.data.data.defense.physicalDefenseModifier)
            setMagicalDefense(response.data.data.defense.magicalDefenseModifier)
            setPhysicalPosture(response.data.data.defense.physicalPosture)
            setMagicalPosture(response.data.data.defense.magicalPosture)
            setTotalPlayerHealth(response.data.data.attributes.healthTotal)
            setCurrentPlayerHealth(response.data.data.attributes.healthTotal)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Compiling Ascean Stats')
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
            <>
            <h1 className='text-white' style={{ textAlign: 'center' }}>Work in Progress! In the meantime, checkout {ascean.name}!</h1>
            <div className="game-block">
            <div className="actions">
            <h3 style={{ fontSize: 12 + 'px', textAlign: 'center' }}>{ascean.name}</h3>
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
            </>
        </Container>
    )
}

export default GameSolo