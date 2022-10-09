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

    const conModifier = document.getElementById('con-mod');
    const strModifier = document.getElementById('str-mod');
    const agiModifier = document.getElementById('agi-mod');
    const achModifier = document.getElementById('ach-mod');
    const caerModifier = document.getElementById('caer-mod');
    const adherentID = document.getElementById('adherentID');
    const devotedID = document.getElementById('devotedID'); 

    useEffect(() => {
        console.log(asceanState.faith, '<- New Faith')
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
    const conOut = document.getElementById('con-box');
    if (conIn != null) {
        let conAttPoints = Number(conIn!.value);
        let startCon = Number(conIn!.value) + 8;
        // conIn!.value = conAttPoints;
        console.log(conAttPoints, '<- conAttPoints');
        console.log(startCon, '<-starting Constitution')
        conOut!.innerHTML = startCon + ' Points' + ' +' + Math.floor((Number(conAttPoints) - 10) / 2) + ' Modifier';
    
    }

    const conMinusButton = document.getElementById('con-minus');
    const conPlusButton = document.getElementById('con-plus');
    const strMinusButton = document.getElementById('str-minus');
    const strPlusButton = document.getElementById('str-plus');
    const dexMinusButton = document.getElementById('dex-minus');
    const dexPlusButton = document.getElementById('dex-plus');
    const achMinusButton = document.getElementById('ach-minus');
    const achPlusButton = document.getElementById('ach-plus');
    const caerMinusButton = document.getElementById('caer-minus');
    const caerPlusButton = document.getElementById('caer-plus');
    // conMinusButton!.style.display = 'none';
    // strMinusButton!.style.display = 'none';
    // dexMinusButton!.style.display = 'none';
    // achMinusButton!.style.display = 'none';
    // caerMinusButton!.style.display = 'none';

    // conMinusButton!.addEventListener('click', event => {
    //     event.preventDefault();
    //     const currentValue = Number(conIn!.value);
    //     conIn!.value = currentValue - 1;
    //     conOut.innerHTML = conIn.value + ' Points' + ' +' + Math.floor((conIn.value - 10) / 2) + ' Modifier';
    //     conAttPoints = conIn.value - 8;
    //     console.log(strAttPoints, '<- constitution attribute points');
    //     poolUpdate();
    //     poolOutput.innerHTML = pool + ' Points / 25 Points';
    //     if (conIn.value == 8) {
    //         conMinusButton.style.display = 'none';
    //     }
    //     if (pool < 25 && Number(conIn.value) < 18) {
    //         conPlusButton.style.display = 'inline-block';
    //     }
    //     if (pool < 25 && Number(strIn.value) < 18) {
    //         strPlusButton.style.display = 'inline-block';
    //     }
    //     if (pool < 25 && Number(dexIn.value) < 18) {
    //         dexPlusButton.style.display = 'inline-block';
    //     }
    //     if (pool < 25 && Number(achIn.value) < 18) {
    //         achPlusButton.style.display = 'inline-block';
    //     }
    //     if (pool < 25 && Number(caerIn.value) < 18) {
    //         caerPlusButton.style.display = 'inline-block';
    //     }
    //     if (pool >= 25) {
    //         conPlusButton.style.display = 'none';
    //         strPlusButton.style.display = 'none';
    //         dexPlusButton.style.display = 'none';
    //         achPlusButton.style.display = 'none';
    //         caerPlusButton.style.display = 'none';
    //     }
    // });

    // // Finish up the Con Plus Button by inverting the Minus Button, right? Sounds right.
    // conPlusButton!.addEventListener('click', event => {
    //     event.preventDefault();
    //     const currentValue = Number(conIn.value);
    //     conIn.value = currentValue + 1;
    //     conOut.innerHTML = conIn.value + ' Points' + ' +' + Math.floor((conIn.value - 10) / 2) + ' Modifier';
    //     conAttPoints = conIn.value - 8;
    //     console.log(Number(conIn.value), '<- conIn.value in conPlusButton event listener');
    //     console.log(strAttPoints, '<- constitution attribute points');
    //     poolUpdate();
    //     poolOutput.innerHTML = pool + ' Points / 25 Points';
    //     if (pool >= 25) {
    //         conPlusButton.style.display = 'none';
    //         strPlusButton.style.display = 'none';
    //         dexPlusButton.style.display = 'none';
    //         achPlusButton.style.display = 'none';
    //         caerPlusButton.style.display = 'none';
    //     }
    //     if (Number(conIn.value) >= 18) {
    //         conPlusButton.style.display = 'none';
    //     }
    //     if (pool >= 25 && Number(conIn.value) > 8) {
    //         conPlusButton.style.display = 'none';
    //     }
    //     if (pool >= 25 && Number(strIn.value) > 8) {
    //         strPlusButton.style.display = 'none';
    //     }
    //     if (pool >= 25 && Number(dexIn.value) > 8) {
    //         dexPlusButton.style.display = 'none';
    //     }
    //     if (pool >= 25 && Number(achIn.value) > 8) {
    //         achPlusButton.style.display = 'none';
    //     }
    //     if (pool >= 25 && Number(caerIn.value) > 8) {
    //         caerPlusButton.style.display = 'none';
    //     }
    //     if (Number(conIn.value) > 8) {
    //         conMinusButton.style.display = 'inline-block';
    //     }
    // });
    

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
                </div>
                <div className="property-line first">
                    <h4>Constitution</h4>
                    <p> Affects Defense, Magic, Health, Posture</p>
                    <InputGroup className="mb-1" style={{width: 100 + '%', display: 'flex'}}>
                    <button id="con-minus">−</button>
                        <Form.Control
                        placeholder="Constitution"
                        aria-label="Constitution"
                        aria-describedby="con-mod"
                        name="constitution"
                        value={asceanState.constitution}
                        onChange={handleChange}
                        />
                        <input 
                            id="con-slider" 
                            className="form-control-number" 
                            type="number" 
                            name="constitution" 
                            value={asceanState.constitution} 
                            min="8" max="18" placeholder="8" step="1" 
                        ></input>
                        <button id="con-plus">+</button>
                        <output className="text-info" id="con-box">{asceanState.constitution} Points</output>
                        <InputGroup.Text id="con-mod"></InputGroup.Text>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Strength</h4>
                    <p> Affects Crit Damage, Physical, Posture</p>
                    <InputGroup className="mb-1">
                    <button id="str-minus">−</button>
                        <Form.Control
                        placeholder="Strength"
                        aria-label="Strength"
                        aria-describedby="str-mod"
                        name="strength"
                        value={asceanState.strength}
                        onChange={handleChange}
                        />
                    <button id="str-plus">+</button>
                        <InputGroup.Text id="str-mod"></InputGroup.Text>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Agility</h4>
                    <p> Affects Crit Chance, Dodge, Physical, Roll</p>
                    <InputGroup className="mb-1">
                    <button id="agi-minus">−</button>
                        <Form.Control
                        placeholder="Agility"
                        aria-label="Agility"
                        aria-describedby="agi-mod"
                        name="agility"
                        value={asceanState.agility}
                        onChange={handleChange}
                        />
                    <button id="agi-plus">+</button>
                        <InputGroup.Text id="agi-mod"></InputGroup.Text>
                    </InputGroup>
                </div>
                <div className="property-line">
                    <h4>Achre</h4>
                    <p> Affects Crit Chance, Dodge, Magic, Roll</p>
                    <InputGroup className="mb-1">
                    <button id="ach-minus">−</button>
                        <Form.Control
                        placeholder="Achre"
                        aria-label="Achre"
                        aria-describedby="ach-mod"
                        name="achre"
                        value={asceanState.achre}
                        onChange={handleChange}
                        />
                    <button id="ach-plus">+</button>
                        <InputGroup.Text id="ach-mod"></InputGroup.Text>
                    </InputGroup>
                </div>
                <div className="property-line last">
                    <h4>Caeren</h4>
                    <p> Affects Crit Damage, Defense, Health, Magic, Posture</p>
                    <InputGroup className="mb-1">
                    <button id="caer-minus">−</button>
                        <Form.Control
                        placeholder="Caeren"
                        aria-label="Caeren"
                        aria-describedby="caer-mod"
                        name="caeren"
                        value={asceanState.caeren}
                        onChange={handleChange}
                        />
                        <button id="caer-plus">+</button>
                        <InputGroup.Text id="caer-mod"></InputGroup.Text>
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
                        // type="switch" 
                        isValid={asceanState.adherent}
                        name="faith"
                        id="adherentID" 
                        value='adherent' 
                        onChange={handleFaith}
                    />
                {/* <div className="form-check">
                    <input    
                        className="form-check-input" 
                        type="radio" 
                        name="adherent" 
                        id="adherentID" 
                        value={asceanState.adherent}
                        onChange={handleFaith} 
                    />
                </div> */}
                </div>
                {/* <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="exampleRadios" 
                    id="exampleRadios1" 
                    value="option1" 
                    checked 
                />
                
                </div> */}
                
                <div className="property-line first">
                    <h4>Devotion</h4>
                    <p> Worshiper of Daethos{' '}</p>
                    <FormCheck.Input
                        aria-describedby='devoted' 
                        // type="switch" 
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