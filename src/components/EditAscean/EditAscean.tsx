import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import * as asceanAPI from '../../utils/asceanApi';  
import Loading from '../Loading/Loading'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup';
import FormCheck from 'react-bootstrap/FormCheck'
import * as equipmentAPI from '../../utils/equipmentApi';
import WeaponsCard from '../EquipmentCard/WeaponsCard';
import ShieldsCard from '../EquipmentCard/ShieldsCard';
import AmuletsCard from '../EquipmentCard/AmuletsCard';
import HelmetsCard from '../EquipmentCard/HelmetsCard';
import ChestsCard from '../EquipmentCard/ChestsCard';
import LegsCard from '../EquipmentCard/LegsCard';
import RingsCard from '../EquipmentCard/RingsCard';
import TrinketsCard from '../EquipmentCard/TrinketsCard';

interface Props {
    editAscean: any;
}

const EditAscean = ({ editAscean }: Props) => {
    const adherentID = document.getElementById('adherentID');
    const devotedID = document.getElementById('devotedID'); 
    const [ascean, setAscean] = useState<any>({})
    const [loading, setLoading] = useState(true);
    const { asceanID } = useParams();
    const [weapons, setWeapons] = useState<any[]>([]);
    const [shields, setShields] = useState<any[]>([]);
    const [helmets, setHelmets] = useState<any[]>([]);
    const [chests, setChests] = useState<any[]>([]);
    const [legs, setLegs] = useState<any[]>([]);
    const [rings, setRings] = useState<any[]>([]);
    const [amulets, setAmulets] = useState<any[]>([]);
    const [trinkets, setTrinkets] = useState<any[]>([]);
    const [weaponOneImage, setWeaponOneImage] = useState<any[]>([]);
    const [weaponTwoImage, setWeaponTwoImage] = useState<any[]>([]);
    const [weaponThreeImage, setWeaponThreeImage] = useState<any[]>([]);
    const [shieldImage, setShieldImage] = useState<any[]>([]);
    const [helmetImage, setHelmetImage] = useState<any[]>([]);
    const [chestImage, setChestImage] = useState<any[]>([]);
    const [legsImage, setLegsImage] = useState<any[]>([]);
    const [ringOneImage, setRingOneImage] = useState<any[]>([]);
    const [ringTwoImage, setRingTwoImage] = useState<any[]>([]);
    const [amuletImage, setAmuletImage] = useState<any[]>([]);
    const [trinketImage, setTrinketImage] = useState<any[]>([]);
    const [weaponModalShow, setWeaponModalShow] = React.useState<boolean>(false)
    const [shieldModalShow, setShieldModalShow] = React.useState<boolean>(false)
    const [helmetModalShow, setHelmetModalShow] = React.useState<boolean>(false)
    const [chestModalShow, setChestModalShow] = React.useState<boolean>(false)
    const [legsModalShow, setLegsModalShow] = React.useState<boolean>(false)
    const [amuletModalShow, setAmuletModalShow] = React.useState<boolean>(false)
    const [ringsModalShow, setRingsModalShow] = React.useState<boolean>(false)
    const [trinketModalShow, setTrinketModalShow] = React.useState<boolean>(false)
    const [editState, setEditState] = useState<any>({

    })
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
    const [poolTotal, setPoolTotal] = useState<number>(25);

    const [constitutionOutput, setConstitutionOutput] = useState<number>(8)
    const [strengthOutput, setStrengthOutput] = useState<number>(8)
    const [agilityOutput, setAgilityOutput] = useState<number>(8)
    const [achreOutput, setAchreOutput] = useState<number>(8)
    const [caerenOutput, setCaerenOutput] = useState<number>(8)

    useEffect(() => {
      getAscean();
    }, [])

    // useEffect(() => {
    //     async function getBoth() {
    //         try {
    //             getAllEquipment();
    //             getAscean();
    //         } catch (err: any) {
    //             console.log(err.message, '<- Error getting both!')
    //         }
    //     }
    //     getBoth();
    // }, [])

    async function getAscean() {
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
            setLoading(false)
            setWeaponOneImage(response.data.weapon_one)
            setWeaponTwoImage(response.data.weapon_two)
            setWeaponThreeImage(response.data.weapon_three)
            setShieldImage(response.data.shield)
            setHelmetImage(response.data.helmet)
            setChestImage(response.data.chest)
            setLegsImage(response.data.legs)
            setRingOneImage(response.data.ring_one)
            setRingTwoImage(response.data.Ring_two)
            setAmuletImage(response.data.amulet)
            setTrinketImage(response.data.trinket)
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        }
    }
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
    function handleChange(e: { target: { name: any; value: any; }; }) {
        console.log('Name:', e.target.name, 'Value:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
    }
    function handleEquipment(equipment: any) {
        console.log(equipment.target.value, '<- the Equipment value being handled?')
        console.log([equipment.target.innerText], '<- the Equipment name being handled?')
        let name = ''
        name = equipment.target.innerText;
        name = name.split('\n')[2];
        console.log(name, '<- What is the new name?')
        setEditState({
            ...editState,
            [name]: equipment.target.value,
        })
    }
    function handleFaith(e: { target: { name: any; value: any; checked: boolean; }; }) {
        console.log(e.target.name, '(', e.target.value, ')')
        console.log(e.target.checked, '<- Checked?')
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        if (e.target.value === 'adherent' && e.target.checked === true) {
            devotedID!.style.display = 'none';
            setEditState({
                ...editState,
                [e.target.name]: e.target.value,
            })
        }
        if (e.target.value === 'adherent' && e.target.checked === false) {
            devotedID!.style.display = 'inline-block';
            setEditState({
                ...editState,
                [e.target.name]: 'none',
            })
        }
        if (e.target.value === 'devoted' && e.target.checked === true) {
            adherentID!.style.display = 'none';
            setEditState({
                ...editState,
                [e.target.name]: e.target.value,
            })
        }
        if (e.target.value === 'devoted' && e.target.checked === false) {
            adherentID!.style.display = 'inline-block';
            setEditState({
                ...editState,
                [e.target.name]: 'none',
            })
        }
        console.log(editState)
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
    function handleVisibility(e: { target: { name: any; value: any; }; }) {
        const { name, value }  = e.target;
        console.log(name, value, '<- Name and Value in Visibility Handler')
        editState[name] = value;
        setEditState({...editState})
        console.log(editState)
    }
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
        console.log(agilityOutput, '<- New Strength Point Total');
        if (agiOut !== null) {
            agiOut!.innerHTML = (agilityOutput > 9 ? ' +' + Math.floor((agilityOutput - 10) / 2) + ' Modifier' : Math.floor((agilityOutput - 10) / 2) + ' Modifier');
        }
    }, [agilityOutput])

    const achOut = document.getElementById('ach-box');
    useEffect(() => {
        console.log(achreOutput, '<- New Strength Point Total');
        if (achOut !== null) {
            achOut!.innerHTML = (achreOutput > 9 ? ' +' + Math.floor((achreOutput - 10) / 2) + ' Modifier' : Math.floor((achreOutput - 10) / 2) + ' Modifier');
        }
    }, [achreOutput])

    const caerOut = document.getElementById('caer-box');
    useEffect(() => {
        console.log(caerenOutput, '<- New Strength Point Total');
        if (caerOut !== null) {
            caerOut!.innerHTML = (caerenOutput > 9 ? ' +' + Math.floor((caerenOutput - 10) / 2) + ' Modifier' : Math.floor((caerenOutput - 10) / 2) + ' Modifier');
        }
    }, [caerenOutput])

    // Pool Total Use Effect
    useEffect(() => {
        if (poolOutput != null) {
            poolOutput!.innerHTML = poolTotal + ' Points / 25 Points';
        }
        if (poolTotal >= 25) {
            if (conPlusButton != null) {
                conPlusButton!.style.display = 'none';
            }
            if (strPlusButton != null) {
                strPlusButton!.style.display = 'none';
            }
            if (agiPlusButton != null) {
                agiPlusButton!.style.display = 'none';
            }
            if (achPlusButton != null) {
                achPlusButton!.style.display = 'none';
            }
            if (caerPlusButton != null) {
                caerPlusButton!.style.display = 'none';
            }
            if (conMinusButton != null) {
                conMinusButton!.style.display = 'inline-block';
            }
            if (strMinusButton != null) {
                strMinusButton!.style.display = 'inline-block';
            }
            if (agiMinusButton != null) {
                agiMinusButton!.style.display = 'inline-block';
            }
            if (achMinusButton != null) {
                achMinusButton!.style.display = 'inline-block';
            }
            if (caerMinusButton != null) {
                caerMinusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal < 25 && constitutionOutput >= 18) {
            if (conPlusButton !== null) {
                conPlusButton!.style.display = 'none';
            }
        }
        if (poolTotal < 25 && strengthOutput >= 18) {
            if (strPlusButton !== null) {
                strPlusButton!.style.display = 'none';
            }
        }
        if (poolTotal < 25 && agilityOutput >= 18) {
            if (agiPlusButton !== null) {
                agiPlusButton!.style.display = 'none';
            }
        }
        if (poolTotal < 25 && achreOutput >= 18) {
            if (achPlusButton !== null) {
                achPlusButton!.style.display = 'none';
            }
        }
        if (poolTotal < 25 && caerenOutput >= 18) {
            if (caerPlusButton !== null) {
                caerPlusButton!.style.display = 'none';
            }
        }
        if (poolTotal < 25 && constitutionOutput < 18) {
            if (conPlusButton !== null) {
                conPlusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal < 25 && strengthOutput < 18) {
            if (strPlusButton !== null) {
                strPlusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal < 25 && agilityOutput < 18) {
            if (agiPlusButton !== null) {
                agiPlusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal < 25 && achreOutput < 18) {
            if (achPlusButton !== null) {
                achPlusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal < 25 && caerenOutput < 18) {
            if (caerPlusButton !== null) {
                caerPlusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal <= 25 && constitutionOutput > 8) {
            if (conMinusButton !== null) {
                conMinusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal <= 25 && strengthOutput > 8) {
            if (strMinusButton !== null) {
                strMinusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal <= 25 && agilityOutput > 8) {
            if (agiMinusButton !== null) {
                agiMinusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal <= 25 && achreOutput > 8) {
            if (achMinusButton !== null) {
                achMinusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal <= 25 && caerenOutput > 8) {
            if (caerMinusButton !== null) {
                caerMinusButton!.style.display = 'inline-block';
            }
        }
        if (poolTotal <= 25 && constitutionOutput <= 8) {
            if (conMinusButton !== null) {
                conMinusButton!.style.display = 'none';
            }
        }
        if (poolTotal <= 25 && strengthOutput <= 8) {
            if (strMinusButton !== null) {
                strMinusButton!.style.display = 'none';
            }
        }
        if (poolTotal <= 25 && agilityOutput <= 8) {
            if (agiMinusButton !== null) {
                agiMinusButton!.style.display = 'none';
            }
        }
        if (poolTotal <= 25 && achreOutput <= 8) {
            if (achMinusButton !== null) {
                achMinusButton!.style.display = 'none';
            }
        }
        if (poolTotal <= 25 && caerenOutput <= 8) {
            if (caerMinusButton !== null) {
                caerMinusButton!.style.display = 'none';
            }
        }
    }, [poolTotal])

    function handleConMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setConstitutionOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleConPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setConstitutionOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }

    function handleStrMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setStrengthOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleStrPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setStrengthOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }

    function handleAgiMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setAgilityOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleAgiPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setAgilityOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }
   
    function handleAchreMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setAchreOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleAchrePlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setAchreOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }
    
    function handleCaerenMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setCaerenOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleCaerenPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setEditState({
            ...editState,
            [e.target.name]: e.target.value,
        })
        setCaerenOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
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
        <Form className="stat-block wide my-5" onSubmit={handleSubmit}>
        <hr className="orange-border" />
        <div className="section-left">
            {/* <div className="character-heading"> */}
            <div className="actions">
                    <h3>Character</h3>
                    </div>
               <div className="top-stats">
               <div className="property-line first">
                <h4>Name  
                    <Form.Control 
                        name="name" 
                        placeholder="Enter Name Here"
                        value={editState.name}
                        onChange={handleChange} 
                    />
                </h4>
                </div>
                <div className="property-line last">
                <h4>Description 
                    <Form.Control 
                        name="description" 
                        placeholder="What are they like?"
                        value={editState.description}
                        onChange={handleChange} 
                    />
                </h4>
                </div>
            </div>
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
            <div className="property-line">
                <h4>Health</h4>
                <p> (Health Calculated)</p>
            </div>
            <div className="property-line">
                <h4>Physical Damage</h4>
                <p id="phys-dam"> {ascean?.weapon_one?.physical_damage} [{ascean?.weapon_one?.damage_type}], {ascean?.weapon_two?.physical_damage} [{ascean?.weapon_two?.damage_type}], {ascean?.weapon_three?.physical_damage} [{ascean?.weapon_three?.damage_type}]</p>
            </div>
            <div className="property-line">
                <h4>Magical Damage</h4>
                <p id="magi-dam"> {ascean?.weapon_one?.magical_damage} [{ascean?.weapon_one?.damage_type}], {ascean?.weapon_two?.magical_damage} [{ascean?.weapon_two?.damage_type}], {ascean?.weapon_three?.magical_damage} [{ascean?.weapon_three?.damage_type}]</p>
            </div>
            <div className="property-line">
                <h4>Physical Defense</h4>
                <p id="phys-res"> (Armor Calculated)% / (Armor Calculated)% Postured</p>
            </div>
            <div className="property-line">
                <h4>Magical Defense</h4>
                <p id="magi-res"> (Armor Calculated)% / (Armor Calculated)% Postured</p>
            </div>
            <div className="property-line">
                <h4>Critical</h4>
                <p id="magi-res"> (Crit Chance Calculated)% / (Crit Damage Calculated)x</p>
            </div>
            <svg height="5" width="100%" className="tapered-rule mt-3">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="top-stats">
            <div className="actions">
                    <h3>Attributes</h3>
                    <h3 id="pool-output"></h3>
                </div>
                <div className="property-line first">
                    <h4>Constitution</h4>
                    <p> Defense, Magic, Health, Posture</p>
                    <InputGroup className="mb-1" style={{width: 100 + '%', display: 'flex'}}>
                    <button id="con-minus" onClick={handleConMinus} name="constitution" value={editState.constitution}>−</button>
                        <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="constitution" 
                            value={editState.constitution} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                        <button id="con-plus" onClick={handleConPlus} name="constitution" value={editState.constitution}>+</button>
                        <h4 className="" style={{ marginLeft: 15 + '%' }} id="con-box">
                        </h4>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Strength</h4>
                    <p> Crit Damage, Physical, Posture</p>
                    <InputGroup className="mb-1">
                    <button id="str-minus" onClick={handleStrMinus} name="strength" value={editState.strength}>−</button>
                    <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="strength" 
                            value={editState.strength} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                    <button id="str-plus" onClick={handleStrPlus} name="strength" value={editState.strength}>+</button>
                    <h4 className="" style={{ marginLeft: 15 + '%' }} id="str-box">
                        </h4>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Agility</h4>
                    <p> Crit Chance, Dodge, Physical, Roll</p>
                    <InputGroup className="mb-1">
                    <button id="agi-minus" onClick={handleAgiMinus} name="agility" value={editState.agility}>−</button>
                    <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="agility" 
                            value={editState.agility} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                    <button id="agi-plus" onClick={handleAgiPlus} name="agility" value={editState.agility}>+</button>
                    <h4 className="" style={{ marginLeft: 15 + '%' }} id="agi-box">
                        </h4>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Achre</h4>
                    <p> Spell Damage, Crit, Dodge, Magic, Roll</p>
                    <InputGroup className="mb-1">
                    <button id="ach-minus" onClick={handleAchreMinus} name="achre" value={editState.achre}>−</button>
                    <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="achre" 
                            value={editState.achre} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                    <button id="ach-plus" onClick={handleAchrePlus} name="achre" value={editState.achre}>+</button>
                    <h4 className="" style={{ marginLeft: 15 + '%' }} id="ach-box">
                        </h4>
                    </InputGroup>
                </div>
                <div className="property-line last">
                    <h4>Caeren</h4>
                    <p> Spell Damage, Defense, Health, Magic, Posture</p>
                    <InputGroup className="mb-1">
                    <button id="caer-minus" onClick={handleCaerenMinus} name="caeren" value={editState.caeren}>−</button>
                    <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="caeren" 
                            value={editState.caeren} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                        <button id="caer-plus" onClick={handleCaerenPlus} name="caeren" value={editState.caeren}>+</button>
                        <h4 className="" style={{ marginLeft: 15 + '%' }} id="caer-box">
                        </h4>
                    </InputGroup>
                </div>
                <svg height="5" width="100%" className="tapered-rule mt-2">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="actions">
                    <h3>Faith</h3>
                </div>
                <div className="property-line first">
                    <h4>Adherence</h4>
                    <p id="adherence"> Worshiper of the Ancients{' '}</p>
                    <FormCheck.Input 
                        aria-describedby='adherence' 
                        isValid={editState.adherent}
                        name="faith"
                        id="adherentID" 
                        value='adherent' 
                        onChange={handleFaith}
                    />
                </div>
                <div className="property-line first">
                    <h4>Devotion</h4>
                    <p> Worshiper of Daethos{' '}</p>
                    <FormCheck.Input
                        aria-describedby='devoted' 
                        isValid={editState.devoted}
                        name="faith"
                        id="devotedID" 
                        value='devoted' 
                        onChange={handleFaith} 
                    />
                </div>
                
                <div className="actions">
            <h3>Weapons & Spells</h3>
            <div className="edit-eqp-button">
            <Button variant="outline" 
                className="my-2" 
                size="lg" 
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                onClick={() => setWeaponModalShow(true)}
            >Weapons & Spells</Button>
            <Col>
            <Modal show={weaponModalShow}
                onHide={() => setWeaponModalShow(false)}
                centered
                id="modal-weapon"
                >
            <Modal.Body id="modal-weapon">
                {weapons.map((w, index) => {
                    return (
                        <WeaponsCard 
                            userProfile={false} 
                            weapon={w} 
                            weapon_one={w} 
                            weapon_two={w} 
                            weapon_three={w} 
                            key={w._id} 
                            index={index} 
                        />
                )})}
                </Modal.Body>
            </Modal>
            </Col>
            </div>
            <div className="property-block">
            <Form.Select value={editState.weapon_one}  onChange={handleEquipment}>
                <option>Weapon or Spell One</option>
            {weapons.map((w) => {
                return (
                    <option value={w._id} label={w.name} key={w._id}>weapon_one</option>
                )
            })}
            </Form.Select>
            <Form.Select value={editState.weapon_two}  onChange={handleEquipment}>
                <option>Weapon or Spell Two</option>
            {weapons.map((w) => {
                return (
                    <option value={w._id} label={w.name} key={w._id}>weapon_two</option>
                )
            })}
            </Form.Select>
            <Form.Select value={editState.weapon_three}  onChange={handleEquipment}>
                <option>Weapon or Spell Three</option>
            {weapons.map((w) => {
                return (
                    <option value={w._id} label={w.name} key={w._id}>weapon_three</option>
                )
            })}
            </Form.Select>


            
            </div>
            </div>
            </div>
           
        </div>
        <div className="section-right">
        <div className="actions">
                <h3>Eccentricities & Equipment</h3>
            <div className='property-block'>
            <AsceanImageCard
                weapon_one={ascean.weapon_one}
                weapon_two={ascean.weapon_two}
                weapon_three={ascean.weapon_three}
                shield={ascean.shield}
                helmet={ascean.helmet}
                chest={ascean.chest}
                legs={ascean.legs}
                amulet={ascean.amulet}
                ring_one={ascean.ring_one}
                ring_two={ascean.ring_two}
                trinket={ascean.trinket}
            />
            </div>
        </div>
            <div className="actions">
            <h3>Armor & Eccentricities</h3>
            <div className='property-block'>
            <div className="edit-eqp-button">
            <Button variant="outline" 
                className="my-2" 
                size="lg" 
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                onClick={() => setShieldModalShow(true)}
            >Shields</Button>
            <Modal show={shieldModalShow}
                onHide={() => setShieldModalShow(false)}
                centered
                id="modal-weapon">
            <Modal.Body id="modal-weapon">
                {shields.map((s, index) => {
                    return (
                        <ShieldsCard userProfile={false} shield={s} key={s._id} index={index} />
                )})}
            </Modal.Body>
            </Modal>
            </div>
            <Form.Select value={editState.shield} onChange={handleEquipment}>
                <option>Shield Options</option>
            {shields.map((s) => {
                return (
                    <option value={s._id} label={s.name} key={s._id}>shield</option>
                )
            })}
            </Form.Select>
            
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

            {/* ============== Helmet Equipment Selection ================ */}
            <div className="edit-eqp-button">
            <Button 
                variant="outline" 
                size="lg" 
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                className="my-2" 
                onClick={() => setHelmetModalShow(true)}
            >Helmets and Hoods</Button>
            <Modal show={helmetModalShow}
                onHide={() => setHelmetModalShow(false)}
                centered
                id="modal-weapon">
            <Modal.Body id="modal-weapon">
                {helmets.map((h, index) => {
                    return (
                        <HelmetsCard userProfile={false} helmet={h} key={h._id} index={index} />
                )})}
            </Modal.Body>
            </Modal>
            </div>
            <Form.Select value={editState.helmet}  onChange={handleEquipment}>
                <option>Helmet and Hood Options</option>
            {helmets.map((h) => {
                return (
                    <option value={h._id} label={h.name} key={h._id}>helmet</option>
                )
            })}
            </Form.Select>
            
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
                        
            {/* =============== Chest Equipment Selection ====================== */}
            <div className="edit-eqp-button">
            <Button 
                variant="outline" 
                size="lg" 
                className="my-2" 
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                onClick={() => setChestModalShow(true)}
            >Cuirasses and Robes</Button>
            <Modal show={chestModalShow}
                onHide={() => setChestModalShow(false)}
                centered
                id="modal-weapon">
            <Modal.Body id="modal-weapon">
                {chests.map((c, index) => {
                    return (
                        <ChestsCard userProfile={false} chest={c} key={c._id} index={index}  />
                )})}
            </Modal.Body>
            </Modal>
            </div>
            <Form.Select value={editState.chest}  onChange={handleEquipment}>
                <option>Cuirass and Robe Options</option>
            {chests.map((c) => {
                return (
                    <option value={c._id} label={c.name} key={c._id}>chest</option>
                )
            })}
            </Form.Select>
            
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

            {/* =============== Leg Equipment Selection ====================== */}
            <div className="edit-eqp-button">
            <Button 
                variant="outline" 
                className="my-2" 
                size="lg" 
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                onClick={() => setLegsModalShow(true)}
            >Greaves and Pants</Button>
            <Modal show={legsModalShow}
                onHide={() => setLegsModalShow(false)}
                centered
                id="modal-weapon">
            <Modal.Body id="modal-weapon">
                {legs.map((l, index) => {
                    return (
                        <LegsCard userProfile={false} leg={l} key={l._id} index={index} />
                )})}
            </Modal.Body>
            </Modal>
            </div>
            <Form.Select value={editState.leg}  onChange={handleEquipment}>
                <option>Greaves and Pant Options</option>
            {legs.map((l) => {
                return (
                    <option value={l._id} label={l.name} key={l._id}>legs</option>
                )
            })}
            </Form.Select>
            
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>  

            {/* =============== Amulet Equipment Selection ===================== */}
            <div className="edit-eqp-button">
            <Button 
                variant="outline" 
                className="my-2" 
                size="lg" 
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                onClick={() => setAmuletModalShow(true)}
            >Amulets and Chokers</Button>
            <Modal show={amuletModalShow}
                onHide={() => setAmuletModalShow(false)}
                centered
                id="modal-weapon">
            <Modal.Body id="modal-weapon">
                {amulets.map((a, index) => {
                    return (
                        <AmuletsCard userProfile={false} amulet={a} key={a._id} index={index} />
                )})}
            </Modal.Body>
            </Modal>
            </div>
            <Form.Select value={editState.amulet}  onChange={handleEquipment}>
                <option>Amulet and Choker Options</option>
            {amulets.map((a) => {
                return (
                    <option value={a._id} label={a.name} key={a._id}>amulet</option>
                )
            })}
            </Form.Select>
            
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

            {/* =============== Ring Equipment Selection ========================== */}
            <div className="edit-eqp-button">
            <Button 
                variant="outline" 
                className="my-2" 
                size="lg" 
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                onClick={() => setRingsModalShow(true)}
            >Rings and Things</Button>
            <Modal show={ringsModalShow}
                onHide={() => setRingsModalShow(false)}
                centered
                id="modal-weapon">
            <Modal.Body id="modal-weapon">
                {rings.map((r, index) => {
                    return (
                        <RingsCard userProfile={false} ring={r} ring_one={r} ring_two={r} key={r._id} index={index} />
                )})}
            </Modal.Body>
            </Modal>
            </div>
            <Form.Select value={editState.ring_one}  onChange={handleEquipment}>
                <option>Ring One</option>
            {rings.map((r) => {
                return (
                    <option value={r._id} label={r.name} key={r._id}>ring_one</option>
                )
            })}
            </Form.Select>
            <Form.Select value={editState.ring_two}  onChange={handleEquipment}>
                <option>Ring Two</option>
            {rings.map((r) => {
                return (
                    <option value={r._id} label={r.name} key={r._id}>ring_two</option>
                )
            })}
            </Form.Select>
            
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

            {/* =============== Trinket Equipment Selection ======================= */}
            <div className="edit-eqp-button">
            <Button 
                variant="outline" 
                className="my-2" 
                size="lg" 
                style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
                onClick={() => setTrinketModalShow(true)}
            >Trinkets</Button>
            <Modal show={trinketModalShow}
                onHide={() => setTrinketModalShow(false)}
                centered
                id="modal-weapon">
            <Modal.Body id="modal-weapon">
                {trinkets.map((t, index) => {
                    return (
                        <TrinketsCard userProfile={false} trinket={t} key={t._id} index={index} />
                )})}
            </Modal.Body>
            </Modal>
            </div>
            <Form.Select value={editState.trinket}  onChange={handleEquipment}>
                <option>Trinket Options</option>
            {trinkets.map((t) => {
                return (
                    <option value={t._id} label={t.name} key={t._id}>trinket</option>
                )
            })}
            </Form.Select>
            
            <div className='actions'>
                <h3>Communal Visibility</h3></div>
                    <Form.Select onChange={handleVisibility} name="visibility" className="my-3">
                        <option value={editState.visibility}>Select Preference</option>
                        <option value="public" label="Public">public</option>
                        <option value="private" label="Private">private</option>
                    </Form.Select> 

{/* ================= Submit to Create Ascean ================== */}

            
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