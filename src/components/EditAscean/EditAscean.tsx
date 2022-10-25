import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import * as asceanAPI from '../../utils/asceanApi';  
import Loading from '../Loading/Loading'; 
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as equipmentAPI from '../../utils/equipmentApi';
import Character from '../AsceanBuilder/Character';
import AttributesEdit from '../AsceanBuilder/AttributesEdit'
import Faith from '../AsceanBuilder/Faith'
import WeaponsEdit from '../AsceanBuilder/WeaponsEdit'
import Shields from '../AsceanBuilder/Shields'
import Armor from '../AsceanBuilder/Armor'
import Communal from '../AsceanBuilder/Communal'
import Origin from '../AsceanBuilder/Origin';
import Mastery from '../AsceanBuilder/Mastery';
import Sex from '../AsceanBuilder/Sex';

interface Props {
    editAscean: (vaEsai: Object) => Promise<void>;
}

const EditAscean = ({ editAscean }: Props) => {
    const [ascean, setAscean] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const { asceanID } = useParams();
    const [weapons, setWeapons] = useState<object[]>([]);
    const [shields, setShields] = useState<object[]>([]);
    const [helmets, setHelmets] = useState<object[]>([]);
    const [chests, setChests] = useState<object[]>([]);
    const [legs, setLegs] = useState<object[]>([]);
    const [rings, setRings] = useState<object[]>([]);
    const [amulets, setAmulets] = useState<object[]>([]);
    const [trinkets, setTrinkets] = useState<object[]>([]);
    const [originModalShow, setOriginModalShow] = React.useState<boolean>(false)
    const [weaponModalShow, setWeaponModalShow] = React.useState<boolean>(false)
    const [shieldModalShow, setShieldModalShow] = React.useState<boolean>(false)
    const [helmetModalShow, setHelmetModalShow] = React.useState<boolean>(false)
    const [chestModalShow, setChestModalShow] = React.useState<boolean>(false)
    const [legsModalShow, setLegsModalShow] = React.useState<boolean>(false)
    const [amuletModalShow, setAmuletModalShow] = React.useState<boolean>(false)
    const [ringsModalShow, setRingsModalShow] = React.useState<boolean>(false)
    const [trinketModalShow, setTrinketModalShow] = React.useState<boolean>(false)
    const [editState, setEditState] = useState<any>({})
    const [constitutionOutput, setConstitutionOutput] = useState<number>(8)
    const [strengthOutput, setStrengthOutput] = useState<number>(8)
    const [agilityOutput, setAgilityOutput] = useState<number>(8)
    const [achreOutput, setAchreOutput] = useState<number>(8)
    const [caerenOutput, setCaerenOutput] = useState<number>(8)
    const [kyosirOutput, setkyosirOutput] = useState<number>(8)


    

    const getAscean = useCallback(async () => {
        setLoading(true);
        try {
            const response = await asceanAPI.getOneAscean(asceanID);
            console.log(response, '<- Response in Getting an Ascean to Edit')
            setAscean(response.data);
            setEditState(response.data);
            setConstitutionOutput(response.data.constitution)
            setStrengthOutput(response.data.strength)
            setAgilityOutput(response.data.agility)
            setAchreOutput(response.data.achre)
            setCaerenOutput(response.data.caeren)
            setkyosirOutput(response.data.kyosir)
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        }
    }, [asceanID])

    useEffect(() => {
        getAscean();
      }, [asceanID, getAscean])

    useEffect(() => {
        getAllEquipment();
    }, [])
    async function getAllEquipment() {
        setLoading(true);
        try {
            const response = await equipmentAPI.index();
            setWeapons(response.data.weapons);
            setShields(response.data.shields);
            setHelmets(response.data.helmets);
            setChests(response.data.chests);
            setLegs(response.data.legs);
            setRings(response.data.rings);
            setAmulets(response.data.amulets);
            setTrinkets(response.data.trinkets);
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, '<- Error in Equipment Function')
            setLoading(false);
        }
    }
   
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log('Editing underway!')
        async function asceanVaEsai() {
            try {
                editAscean(editState)
            } catch (err: any) {
                console.log(err.message, '<- Error initiating Ascean Edit')
            }
        }
        asceanVaEsai();
        getAscean();
    }


    if (loading) {
        return (
        <>
            <Loading />
        </>
        );
    }

    return (
        <Row className="justify-content-center my-5">
        <Form className="stat-block wide my-5" id="new-ascean" onSubmit={handleSubmit}>
        <hr className="orange-border" />
        <div className="section-left">
            <Character asceanState={editState} setAsceanState={setEditState} key={ascean._id} />
            <Sex asceanState={editState} setAsceanState={setEditState} />
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="actions">
                <h3>Statistics</h3>
            </div>
            <div className="property-line first">
                <h4>Experience</h4>
                <p> {ascean.experience}</p>
            </div>
            <div className="property-line">
                <h4>Level</h4>
                <p> {ascean.level}</p>
            </div>

            <div className="top-stats">
            <AttributesEdit editState={editState} setEditState={setEditState} key={ascean._id} />
            <svg height="5" width="100%" className="tapered-rule mt-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <Mastery asceanState={editState} setAsceanState={setEditState} />
            <Faith asceanState={editState} setAsceanState={setEditState} />
            <Origin asceanState={editState} setAsceanState={setEditState} originModalShow={originModalShow} setOriginModalShow={setOriginModalShow} />
            <img src={process.env.PUBLIC_URL + '/images/' + editState.origin + '-' + editState.sex + '.jpg'} id="ascean-pic" />
            
            </div>
        </div>
        <div className="section-right">

        <div className="actions">
                <h3>Eccentricities & Equipment</h3>
            <div className='property-block'>
                {
                    ascean
                    ? 
                <AsceanImageCard
                    weapon_one={ascean?.weapon_one}
                    weapon_two={ascean?.weapon_two}
                    weapon_three={ascean?.weapon_three}
                    shield={ascean?.shield}
                    helmet={ascean?.helmet}
                    chest={ascean?.chest}
                    legs={ascean?.legs}
                    amulet={ascean?.amulet}
                    ring_one={ascean?.ring_one}
                    ring_two={ascean?.ring_two}
                    trinket={ascean?.trinket}
                    key={ascean._id}
                />
                    : ''
                }
            
            </div>
            {/* <AsceanStatCompiler communityFeed={false} communityFocus={false} ascean={ascean} key={ascean._id} /> */}
        </div>
        <WeaponsEdit editState={editState} setEditState={setEditState} weapons={weapons} weaponModalShow={weaponModalShow} setWeaponModalShow={setWeaponModalShow} />
            <div className="actions">
            <h3>Armor & Eccentricities</h3>
            <div className='property-block'>
            <Shields asceanState={editState} setAsceanState={setEditState} shields={shields} shieldModalShow={shieldModalShow} setShieldModalShow={setShieldModalShow} />
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <Armor
                asceanState={editState}
                setAsceanState={setEditState}
                helmets={helmets}
                chests={chests}
                legs={legs}
                amulets={amulets}
                rings={rings}
                trinkets={trinkets}
                helmetModalShow={helmetModalShow}
                setHelmetModalShow={setHelmetModalShow}
                chestModalShow={chestModalShow}
                setChestModalShow={setChestModalShow}
                legsModalShow={legsModalShow}
                setLegsModalShow={setLegsModalShow}
                amuletModalShow={amuletModalShow}
                setAmuletModalShow={setAmuletModalShow}
                ringsModalShow={ringsModalShow}
                setRingsModalShow={setRingsModalShow}
                trinketModalShow={trinketModalShow}
                setTrinketModalShow={setTrinketModalShow}
            />
            <Communal editState={editState} setEditState={setEditState} />

{/* ================= Submit to Update Ascean ================== */}
            </div>
            </div>
        </div>
        <button 
            className="btn" 
            value={editState} 
            style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            type="submit">
                Update {ascean.name}
        </button>
        <hr className="orange-border bottom" />
    </Form>
    </Row>
    )

}

export default EditAscean