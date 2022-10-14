import React, { useState, useEffect } from 'react'
import './NewAscean.css';
import * as equipmentAPI from '../../utils/equipmentApi';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Character from '../AsceanBuilder/Character';
import AttributesCreate from '../AsceanBuilder/AttributesCreation'
import Faith from '../AsceanBuilder/Faith'
import Weapons from '../AsceanBuilder/Weapons'
import Shields from '../AsceanBuilder/Shields'
import Armor from '../AsceanBuilder/Armor'

interface AsceanProps {
    loggedUser: any;
    setUser: React.Dispatch<any>;
    handleAsceanCreate: any;
}

const NewAscean = ({ loggedUser, setUser, handleAsceanCreate }: AsceanProps) => {

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
    // useEffect(() => {
    //     if (poolOutput != null) {
    //         poolOutput!.innerHTML = poolTotal + ' Points / 25 Points';
    //     }
    //     if (poolTotal >= 25) {
    //         conPlusButton!.style.display = 'none';
    //         strPlusButton!.style.display = 'none';
    //         agiPlusButton!.style.display = 'none';
    //         achPlusButton!.style.display = 'none';
    //         caerPlusButton!.style.display = 'none';
    //         conMinusButton!.style.display = 'inline-block';
    //         strMinusButton!.style.display = 'inline-block';
    //         agiMinusButton!.style.display = 'inline-block';
    //         achMinusButton!.style.display = 'inline-block';
    //         caerMinusButton!.style.display = 'inline-block';
    //     }
    //     if (poolTotal < 25 && constitutionOutput >= 18) {
    //         if (conPlusButton !== null) {
    //             conPlusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal < 25 && strengthOutput >= 18) {
    //         if (strPlusButton !== null) {
    //             strPlusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal < 25 && agilityOutput >= 18) {
    //         if (agiPlusButton !== null) {
    //             agiPlusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal < 25 && achreOutput >= 18) {
    //         if (achPlusButton !== null) {
    //             achPlusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal < 25 && caerenOutput >= 18) {
    //         if (caerPlusButton !== null) {
    //             caerPlusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal < 25 && constitutionOutput < 18) {
    //         if (conPlusButton !== null) {
    //             conPlusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal < 25 && strengthOutput < 18) {
    //         if (strPlusButton !== null) {
    //             strPlusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal < 25 && agilityOutput < 18) {
    //         if (agiPlusButton !== null) {
    //             agiPlusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal < 25 && achreOutput < 18) {
    //         if (achPlusButton !== null) {
    //             achPlusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal < 25 && caerenOutput < 18) {
    //         if (caerPlusButton !== null) {
    //             caerPlusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal <= 25 && constitutionOutput > 8) {
    //         if (conMinusButton !== null) {
    //             conMinusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal <= 25 && strengthOutput > 8) {
    //         if (strMinusButton !== null) {
    //             strMinusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal <= 25 && agilityOutput > 8) {
    //         if (agiMinusButton !== null) {
    //             agiMinusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal <= 25 && achreOutput > 8) {
    //         if (achMinusButton !== null) {
    //             achMinusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal <= 25 && caerenOutput > 8) {
    //         if (caerMinusButton !== null) {
    //             caerMinusButton!.style.display = 'inline-block';
    //         }
    //     }
    //     if (poolTotal <= 25 && constitutionOutput <= 8) {
    //         if (conMinusButton !== null) {
    //             conMinusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal <= 25 && strengthOutput <= 8) {
    //         if (strMinusButton !== null) {
    //             strMinusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal <= 25 && agilityOutput <= 8) {
    //         if (agiMinusButton !== null) {
    //             agiMinusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal <= 25 && achreOutput <= 8) {
    //         if (achMinusButton !== null) {
    //             achMinusButton!.style.display = 'none';
    //         }
    //     }
    //     if (poolTotal <= 25 && caerenOutput <= 8) {
    //         if (caerMinusButton !== null) {
    //             caerMinusButton!.style.display = 'none';
    //         }
    //     }
    // }, [poolTotal])

    return (
        <Row className="justify-content-center">
        <Form className="form-block wide" onSubmit={handleSubmit}>
            <hr className="orange-border" />
            <div className="section-left">
                <Character asceanState={asceanState} setAsceanState={setAsceanState} />
                <svg height="5" width="100%" className="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div className="top-stats">
                <AttributesCreate asceanState={asceanState} setAsceanState={setAsceanState} />
                <svg height="5" width="100%" className="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <Faith asceanState={asceanState} setAsceanState={setAsceanState} />
                <Weapons asceanState={asceanState} setAsceanState={setAsceanState} weapons={weapons} weaponModalShow={weaponModalShow} setWeaponModalShow={setWeaponModalShow} />
                </div>
            </div>
            <div className="section-right">
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

            <button className="btn btn-outline-success btn-lg" value={asceanState} type="submit">Create Ascean</button>
            </div>
            </div>
            </div>
            <hr className="orange-border bottom" />
        </Form>
        </Row>
    )
}

export default NewAscean