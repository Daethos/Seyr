import React, { useState, useEffect } from 'react'
import './NewAscean.css';
import * as equipmentAPI from '../../utils/equipmentApi';
import WeaponsCard from '../EquipmentCard/WeaponsCard';
import ShieldsCard from '../EquipmentCard/ShieldsCard';
import Loading from "../Loading/Loading";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup';
import FormCheck from 'react-bootstrap/FormCheck'
import { format } from 'path';

interface AsceanProps {
    loggedUser: any;
    setUser: React.Dispatch<any>;
}

const NewAscean = ({ loggedUser, setUser }: AsceanProps) => {

    const [equipment, setEquipment] = useState<any[]>([]);
    const [weapons, setWeapons] = useState<any[]>([]);
    const [shields, setShields] = useState<any[]>([]);
    const [helmets, setHelmets] = useState<any[]>([]);
    const [chests, setChests] = useState<any[]>([]);
    const [legs, setLegs] = useState<any[]>([]);
    const [rings, setRings] = useState<any[]>([]);
    const [amulets, setAmulets] = useState<any[]>([]);
    const [trinkets, setTrinkets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [adherenceChecked, setAdherenceChecked] = useState<boolean>(false);
    const [devotionChecked, setDevotionChecked] = useState<boolean>(false);
    const [weaponModalShow, setWeaponModalShow] = React.useState<boolean>(false)
    const [shieldModalShow, setShieldModalShow] = React.useState<boolean>(false)
    const [asceanState, setAsceanState] = useState<any>({
        name: '',
        description: '',
        constitution: 8,
        strength: 8,
        agility: 8,
        achre: 8,
        caeren: 8,
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

    const adherentID = document.getElementById('adherentID');
    const devotedID = document.getElementById('devotedID'); 

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
    

    // New Character Use Effect
    useEffect(() => {
        console.log(asceanState, '<- New Statistics')
    }, [asceanState])

    function handleChange(e: { target: { name: any; value: any; }; }) {
        console.log('Name:', e.target.name, 'Value:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
    }
    
    function handleFaith(e: { target: { name: any; value: any; checked: boolean; }; }) {
        console.log(e.target.name, '(', e.target.value, ')')
        console.log(e.target.checked, '<- Checked?')
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        if (e.target.value === 'adherent' && e.target.checked === true) {
            devotedID!.style.display = 'none';
            setAsceanState({
                ...asceanState,
                [e.target.name]: e.target.value,
            })
        }
        if (e.target.value === 'adherent' && e.target.checked === false) {
            devotedID!.style.display = 'inline-block';
            setAsceanState({
                ...asceanState,
                [e.target.name]: 'none',
            })
        }
        if (e.target.value === 'devoted' && e.target.checked === true) {
            adherentID!.style.display = 'none';
            setAsceanState({
                ...asceanState,
                [e.target.name]: e.target.value,
            })
        }
        if (e.target.value === 'devoted' && e.target.checked === false) {
            adherentID!.style.display = 'inline-block';
            setAsceanState({
                ...asceanState,
                [e.target.name]: 'none',
            })
        }
        console.log(asceanState)
    }

    const conIn = document.getElementById('con-slider') as HTMLInputElement | null;
    const conOut = document.getElementById('con-box') as HTMLOutputElement | null;
    
    useEffect(() => { 
        console.log(constitutionOutput, '<- New Constitution Point Total');
        if (conOut !== null) {
            conOut!.innerHTML = (constitutionOutput > 9 ? ' +' + Math.floor((constitutionOutput - 10) / 2) + ' Modifier' : Math.floor((constitutionOutput - 10) / 2) + ' Modifier');
        }
    }, [constitutionOutput])

    const strIn = document.getElementById('str-slider')
    const strOut = document.getElementById('str-box');
    
    useEffect(() => {
        console.log(strengthOutput, '<- New Strength Point Total');
        if (strOut !== null) {
            strOut!.innerHTML = (strengthOutput > 9 ? ' +' + Math.floor((strengthOutput - 10) / 2) + ' Modifier' : Math.floor((strengthOutput - 10) / 2) + ' Modifier');
        }
    }, [strengthOutput])

    if (conMinusButton !== null) {
        conMinusButton!.style.display = 'none';
    }
    if (strMinusButton !== null) {
        strMinusButton!.style.display = 'none';
    }
    if (agiMinusButton !== null) {
        agiMinusButton!.style.display = 'none';
    }
    if (achMinusButton !== null) {
        achMinusButton!.style.display = 'none';
    }
    if (caerMinusButton !== null) {
        caerMinusButton!.style.display = 'none';
    }
    // Pool Total Use Effect
    useEffect(() => {
        if (poolOutput != null) {
            poolOutput!.innerHTML = poolTotal + ' Points / 25 Points';
        }
        if (poolTotal >= 25) {
            conPlusButton!.style.display = 'none';
            strPlusButton!.style.display = 'none';
            agiPlusButton!.style.display = 'none';
            achPlusButton!.style.display = 'none';
            caerPlusButton!.style.display = 'none';
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
    }, [poolTotal])

    function handleConMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setConstitutionOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleConPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setConstitutionOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }

    function handleStrMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setStrengthOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleStrPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setStrengthOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }

    function handleAgiMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setAgilityOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleAgiPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setAgilityOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }
   
    function handleAchreMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setAchreOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleAchrePlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setAchreOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }
    
    function handleCaerenMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setCaerenOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleCaerenPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setCaerenOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }

    return (
    <Form className="form-block wide">
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
                        value={asceanState.name}
                        onChange={handleChange} 
                    />
                </h4>
                </div>
                <div className="property-line last">
                <h4>Description 
                    <Form.Control 
                        name="description" 
                        placeholder="What are they like?"
                        value={asceanState.description}
                        onChange={handleChange} 
                    />
                </h4>
                </div>
            </div>
            <svg height="5" width="100%" className="tapered-rule">
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
                    <button id="con-minus" onClick={handleConMinus} name="constitution" value={asceanState.constitution}>−</button>
                        <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="constitution" 
                            value={asceanState.constitution} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                        <button id="con-plus" onClick={handleConPlus} name="constitution" value={asceanState.constitution}>+</button>
                        <h4 className="" style={{ marginLeft: 15 + '%' }} id="con-box">
                        </h4>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Strength</h4>
                    <p> Crit Damage, Physical, Posture</p>
                    <InputGroup className="mb-1">
                    <button id="str-minus" onClick={handleStrMinus} name="strength" value={asceanState.strength}>−</button>
                    <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="strength" 
                            value={asceanState.strength} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                    <button id="str-plus" onClick={handleStrPlus} name="strength" value={asceanState.strength}>+</button>
                    <h4 className="" style={{ marginLeft: 15 + '%' }} id="str-box">
                        </h4>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Agility</h4>
                    <p> Crit Chance, Dodge, Physical, Roll</p>
                    <InputGroup className="mb-1">
                    <button id="agi-minus" onClick={handleAgiMinus} name="agility" value={asceanState.agility}>−</button>
                    <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="agility" 
                            value={asceanState.agility} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                    <button id="agi-plus" onClick={handleAgiPlus} name="agility" value={asceanState.agility}>+</button>
                    <h4 className="" style={{ marginLeft: 15 + '%' }} id="agi-box">
                        </h4>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Achre</h4>
                    <p> Spell Damage, Crit, Dodge, Magic, Roll</p>
                    <InputGroup className="mb-1">
                    <button id="ach-minus" onClick={handleAchreMinus} name="achre" value={asceanState.achre}>−</button>
                    <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="achre" 
                            value={asceanState.achre} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                    <button id="ach-plus" onClick={handleAchrePlus} name="achre" value={asceanState.achre}>+</button>
                    <h4 className="" style={{ marginLeft: 15 + '%' }} id="ach-box">
                        </h4>
                    </InputGroup>
                </div>
                <div className="property-line last">
                    <h4>Caeren</h4>
                    <p> Spell Damage, Defense, Health, Magic, Posture</p>
                    <InputGroup className="mb-1">
                    <button id="caer-minus" onClick={handleCaerenMinus} name="caeren" value={asceanState.caeren}>−</button>
                    <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="caeren" 
                            value={asceanState.caeren} 
                            min="8" max="18"
                            step="1"
                            readOnly 
                        ></input>
                        <button id="caer-plus" onClick={handleCaerenPlus} name="caeren" value={asceanState.caeren}>+</button>
                        <h4 className="" style={{ marginLeft: 15 + '%' }} id="caer-box">
                        </h4>
                    </InputGroup>
                </div>
                <svg height="5" width="100%" className="tapered-rule">
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
                        isValid={asceanState.adherent}
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
                        isValid={asceanState.devoted}
                        name="faith"
                        id="devotedID" 
                        value='devoted' 
                        onChange={handleFaith} 
                    />
                </div>
            </div>
        </div>
        
        <Col className="m-5">
        <Button variant="outline-info" size="lg" onClick={() => setWeaponModalShow(true)}>Weapons</Button>
        <Modal 
            show={weaponModalShow}
            onHide={() => setWeaponModalShow(false)}
            // size="lg"
            centered
            id="modal-weapon"
            className="justify-content-center"
        >
        <Modal.Body id="modal-weapon">
            {weapons.map((w, index) => {
                return (
                    <WeaponsCard setModalShow={setWeaponModalShow} show={weaponModalShow} weapon={w} key={w._id} index={index} onHide={() => setWeaponModalShow(false)} />
            )})}
            </Modal.Body>
        </Modal>
        <Button variant="outline-info" size="lg" onClick={() => setShieldModalShow(true)}>Shields</Button>
        <Modal 
            show={shieldModalShow}
            onHide={() => setShieldModalShow(false)}
            // size="lg"
            centered
            id="modal-weapon"
        >
        <Modal.Body id="modal-weapon">
            {shields.map((s, index) => {
                return (
                    <ShieldsCard setModalShow={setShieldModalShow} show={shieldModalShow} shield={s} key={s._id} index={index} onHide={() => setShieldModalShow(false)} />
            )})}
            </Modal.Body>
        </Modal>
        </Col>
        
    </Form>
    )
}

export default NewAscean