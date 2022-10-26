import React, { useState, useEffect } from 'react'
import './NewAscean.css';
import * as equipmentAPI from '../../utils/equipmentApi';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Character from '../AsceanBuilder/Character';
import AttributesCreate from '../AsceanBuilder/AttributesCreation'
import Faith from '../AsceanBuilder/Faith'
import Weapons from '../AsceanBuilder/Weapons'
import Shields from '../AsceanBuilder/Shields'
import Armor from '../AsceanBuilder/Armor'
import Origin from '../AsceanBuilder/Origin';
import Mastery from '../AsceanBuilder/Mastery';
import Sex from '../AsceanBuilder/Sex';

interface AsceanProps {
    loggedUser: any;
    createSuccess: boolean;
    setUser: React.Dispatch<any>;
    handleAsceanCreate: (newAscean: Object) => Promise<void>;
}

const NewAscean = ({ loggedUser, setUser, createSuccess, handleAsceanCreate }: AsceanProps) => {

    const [equipment, setEquipment] = useState<object[]>([]);
    const [weapons, setWeapons] = useState<object[]>([]);
    const [shields, setShields] = useState<object[]>([]);
    const [helmets, setHelmets] = useState<object[]>([]);
    const [chests, setChests] = useState<object[]>([]);
    const [legs, setLegs] = useState<object[]>([]);
    const [rings, setRings] = useState<object[]>([]);
    const [amulets, setAmulets] = useState<object[]>([]);
    const [trinkets, setTrinkets] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [originModalShow, setOriginModalShow] = React.useState<boolean>(false)
    const [weaponModalShow, setWeaponModalShow] = React.useState<boolean>(false)
    const [shieldModalShow, setShieldModalShow] = React.useState<boolean>(false)
    const [helmetModalShow, setHelmetModalShow] = React.useState<boolean>(false)
    const [chestModalShow, setChestModalShow] = React.useState<boolean>(false)
    const [legsModalShow, setLegsModalShow] = React.useState<boolean>(false)
    const [amuletModalShow, setAmuletModalShow] = React.useState<boolean>(false)
    const [ringsModalShow, setRingsModalShow] = React.useState<boolean>(false)
    const [trinketModalShow, setTrinketModalShow] = React.useState<boolean>(false)
    const [asceanState, setAsceanState] = useState<any>({
        name: '',
        description: '',
        sex: 'Woman',
        origin: "Ashtre",
        constitution: 8,
        strength: 8,
        agility: 8,
        achre: 8,
        caeren: 8,
        kyosir: 8,
        mastery: 'Constitution',
        weapon_one: '',
        weapon_two: '',
        weapon_three: '',
        shield: '',
        helmet: '',
        chest: '',
        legs: '',
        ring_one: '',
        ring_two: '',
        amulet: '',
        trinket: '',
        faith: 'none',
        // adherent: false,
        // devoted: false,
    });

    const conMinusButton = document.getElementById('con-minus');
    const conPlusButton = document.getElementById('con-plus');
    const strMinusButton = document.getElementById('str-minus');
    const strPlusButton = document.getElementById('str-plus');
    const agiMinusButton = document.getElementById('agi-minus');
    const agiPlusButton = document.getElementById('agi-plus');
    const achMinusButton = document.getElementById('ach-minus');
    const achPlusButton = document.getElementById('ach-plus');
    const caerMinusButton = document.getElementById('caer-minus');
    const caerPlusButton = document.getElementById('caer-plus');

    let poolOutput = document.getElementById('pool-output') as HTMLOutputElement | null;
    const [poolTotal, setPoolTotal] = useState<number>(0);

    const [constitutionOutput, setConstitutionOutput] = useState<number>(8)
    const [strengthOutput, setStrengthOutput] = useState<number>(8)
    const [agilityOutput, setAgilityOutput] = useState<number>(8)
    const [achreOutput, setAchreOutput] = useState<number>(8)
    const [caerenOutput, setCaerenOutput] = useState<number>(8)
    const [kyosirOutput, setkyosirOutput] = useState<number>(8)

    // Equipment Function Use Effect
    useEffect(() => {
        getAllEquipment();
    }, [])
    async function getAllEquipment() {
        setLoading(true);
        try {
            const response = await equipmentAPI.index();
            console.log(response.data, 'The entire database of equipment');
            setEquipment(response.data);
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
    // The Function to Create the Character!
    function handleSubmit(e: any) {
        e.preventDefault();
        async function createAscean() {
            try {
                handleAsceanCreate(asceanState);
                } catch (err) {
                    console.log(err, '%c <- You have an error in creating a character', 'color: red')
                }
            }
            createAscean(); 
        }
    // New Character Use Effect
    useEffect(() => {
        console.log(asceanState, '<- New Statistics')
    }, [asceanState])
    // General asceanState Updating

    const conOut = document.getElementById('con-box') as HTMLOutputElement | null;
    useEffect(() => { 
        console.log(constitutionOutput, '<- New Constitution Point Total');
        if (conOut !== null) {
            conOut!.innerHTML = (constitutionOutput > 9 ? ' +' + Math.floor((constitutionOutput - 10) / 2) + ' Modifier' : Math.floor((constitutionOutput - 10) / 2) + ' Modifier');
        }
    }, [constitutionOutput])

    const strOut = document.getElementById('str-box');
    useEffect(() => {
        console.log(strengthOutput, '<- New Strength Point Total');
        if (strOut !== null) {
            strOut!.innerHTML = (strengthOutput > 9 ? ' +' + Math.floor((strengthOutput - 10) / 2) + ' Modifier' : Math.floor((strengthOutput - 10) / 2) + ' Modifier');
        }
    }, [strengthOutput])

    const agiOut = document.getElementById('agi-box');
    useEffect(() => {
        console.log(agilityOutput, '<- New Agility Point Total');
        if (agiOut !== null) {
            agiOut!.innerHTML = (agilityOutput > 9 ? ' +' + Math.floor((agilityOutput - 10) / 2) + ' Modifier' : Math.floor((agilityOutput - 10) / 2) + ' Modifier');
        }
    }, [agilityOutput])

    const achOut = document.getElementById('ach-box');
    useEffect(() => {
        console.log(achreOutput, '<- New Achre Point Total');
        if (achOut !== null) {
            achOut!.innerHTML = (achreOutput > 9 ? ' +' + Math.floor((achreOutput - 10) / 2) + ' Modifier' : Math.floor((achreOutput - 10) / 2) + ' Modifier');
        }
    }, [achreOutput])

    const caerOut = document.getElementById('caer-box');
    useEffect(() => {
        console.log(caerenOutput, '<- New Caeren Point Total');
        if (caerOut !== null) {
            caerOut!.innerHTML = (caerenOutput > 9 ? ' +' + Math.floor((caerenOutput - 10) / 2) + ' Modifier' : Math.floor((caerenOutput - 10) / 2) + ' Modifier');
        }
    }, [caerenOutput])

    const kyoOut = document.getElementById('kyo-box');
    useEffect(() => {
        console.log(kyosirOutput, '<- New Kyosir Point Total');
        if (kyoOut !== null) {
            kyoOut!.innerHTML = (kyosirOutput > 9 ? ' +' + Math.floor((kyosirOutput - 10) / 2) + ' Modifier' : Math.floor((kyosirOutput - 10) / 2) + ' Modifier');
        }
    }, [kyosirOutput])

    return (
        <Row className="justify-content-center my-5">
        <Form className="stat-block wide" id="new-ascean" onSubmit={handleSubmit}>
            <hr className="orange-border" />
            <div className="section-left">
            <Character asceanState={asceanState} setAsceanState={setAsceanState} />
            <Sex asceanState={asceanState} setAsceanState={setAsceanState} />
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="top-stats">
            <AttributesCreate asceanState={asceanState} setAsceanState={setAsceanState} />
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <Mastery asceanState={asceanState} setAsceanState={setAsceanState} />
            <Faith asceanState={asceanState} setAsceanState={setAsceanState} />
            <br />
            <div className="property-line">
            <h4>[Note: For information pertaining the following selections, click the orange buttons <svg style={{color: 'red', textAlign: 'center'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
            </svg> below to view detailed descriptions of the options! ]</h4>
            </div>
            
            <br />
            
            <Origin asceanState={asceanState} setAsceanState={setAsceanState} originModalShow={originModalShow} setOriginModalShow={setOriginModalShow} />
            <img src={process.env.PUBLIC_URL + '/images/' + asceanState.origin + '-' + asceanState.sex + '.jpg'} id="ascean-pic" />
            </div>
            </div>
            <div className="section-right">
            <Weapons asceanState={asceanState} setAsceanState={setAsceanState} weapons={weapons} weaponModalShow={weaponModalShow} setWeaponModalShow={setWeaponModalShow} />

                <div className="actions">
                <h3>Armor & Eccentricities</h3>
                <div className='property-block'>
            <Shields asceanState={asceanState} setAsceanState={setAsceanState} shields={shields} shieldModalShow={shieldModalShow} setShieldModalShow={setShieldModalShow} />
            <svg height="5" width="100%" className="tapered-rule mt-3">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <Armor
                asceanState={asceanState}
                setAsceanState={setAsceanState}
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
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
{/* ================= Submit to Create Ascean ================== */}

            </div>
            </div>
            </div>
            {
                createSuccess
                ? <button 
                className="btn mt-4" 
                value={asceanState} 
                style={{ color: 'green', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px', textDecoration: 'none' }}
                type="submit" disabled>Created {asceanState.name}!</button>
                : <button 
                className="btn mt-4" 
                value={asceanState} 
                style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                type="submit">Create Ascean</button>
            }
            

            <hr className="orange-border bottom" />
        </Form>
        </Row>
    )
}

export default NewAscean