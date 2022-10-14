import React, { useState, useEffect } from 'react'
import * as equipmentAPI from '../../utils/equipmentApi';

interface Props {
    handleAsceanCreate: any;
}

const AsceanBuilder = ({ handleAsceanCreate }: Props) => {

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
    function handleChange(e: { target: { name: any; value: any; }; }) {
        console.log('Name:', e.target.name, 'Value:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
    }
    // Handles Equipment ID into asceanState
    // function handleEquipment(equipment: any) {
    //     console.log(equipment.target.value, '<- the Equipment value being handled?')
    //     console.log([equipment.target.innerText], '<- the Equipment name being handled?')
    //     let name = ''
    //     name = equipment.target.innerText;
    //     name = name.split('\n')[2];
    //     console.log(name, '<- What is the new name?')
    //     setAsceanState({
    //         ...asceanState,
    //         [name]: equipment.target.value,
    //     })
    // }
    // Handles Faith of asceanState
    // function handleFaith(e: { target: { name: any; value: any; checked: boolean; }; }) {
    //     console.log(e.target.name, '(', e.target.value, ')')
    //     console.log(e.target.checked, '<- Checked?')
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     if (e.target.value === 'adherent' && e.target.checked === true) {
    //         devotedID!.style.display = 'none';
    //         setAsceanState({
    //             ...asceanState,
    //             [e.target.name]: e.target.value,
    //         })
    //     }
    //     if (e.target.value === 'adherent' && e.target.checked === false) {
    //         devotedID!.style.display = 'inline-block';
    //         setAsceanState({
    //             ...asceanState,
    //             [e.target.name]: 'none',
    //         })
    //     }
    //     if (e.target.value === 'devoted' && e.target.checked === true) {
    //         adherentID!.style.display = 'none';
    //         setAsceanState({
    //             ...asceanState,
    //             [e.target.name]: e.target.value,
    //         })
    //     }
    //     if (e.target.value === 'devoted' && e.target.checked === false) {
    //         adherentID!.style.display = 'inline-block';
    //         setAsceanState({
    //             ...asceanState,
    //             [e.target.name]: 'none',
    //         })
    //     }
    //     console.log(asceanState)
    // }

    // const conOut = document.getElementById('con-box') as HTMLOutputElement | null;
    // useEffect(() => { 
    //     console.log(constitutionOutput, '<- New Constitution Point Total');
    //     if (conOut !== null) {
    //         conOut!.innerHTML = (constitutionOutput > 9 ? ' +' + Math.floor((constitutionOutput - 10) / 2) + ' Modifier' : Math.floor((constitutionOutput - 10) / 2) + ' Modifier');
    //     }
    // }, [constitutionOutput])

    // const strOut = document.getElementById('str-box');
    // useEffect(() => {
    //     console.log(strengthOutput, '<- New Strength Point Total');
    //     if (strOut !== null) {
    //         strOut!.innerHTML = (strengthOutput > 9 ? ' +' + Math.floor((strengthOutput - 10) / 2) + ' Modifier' : Math.floor((strengthOutput - 10) / 2) + ' Modifier');
    //     }
    // }, [strengthOutput])

    // const agiOut = document.getElementById('agi-box');
    // useEffect(() => {
    //     console.log(agilityOutput, '<- New Strength Point Total');
    //     if (agiOut !== null) {
    //         agiOut!.innerHTML = (agilityOutput > 9 ? ' +' + Math.floor((agilityOutput - 10) / 2) + ' Modifier' : Math.floor((agilityOutput - 10) / 2) + ' Modifier');
    //     }
    // }, [agilityOutput])

    // const achOut = document.getElementById('ach-box');
    // useEffect(() => {
    //     console.log(achreOutput, '<- New Strength Point Total');
    //     if (achOut !== null) {
    //         achOut!.innerHTML = (achreOutput > 9 ? ' +' + Math.floor((achreOutput - 10) / 2) + ' Modifier' : Math.floor((achreOutput - 10) / 2) + ' Modifier');
    //     }
    // }, [achreOutput])

    // const caerOut = document.getElementById('caer-box');
    // useEffect(() => {
    //     console.log(caerenOutput, '<- New Strength Point Total');
    //     if (caerOut !== null) {
    //         caerOut!.innerHTML = (caerenOutput > 9 ? ' +' + Math.floor((caerenOutput - 10) / 2) + ' Modifier' : Math.floor((caerenOutput - 10) / 2) + ' Modifier');
    //     }
    // }, [caerenOutput])

    // // Pool Total Use Effect
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

    // function handleConMinus(e: any) {
    //     e.preventDefault();
    //     e.target.value -= 1;
    //     console.log(e.target.name, 'Decrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setConstitutionOutput(e.target.value)
    //     setPoolTotal(poolTotal - 1)
    // }
    // function handleConPlus(e: any) {
    //     e.preventDefault();
    //     e.target.value = Number(e.target.value) + 1;
    //     console.log(e.target.name, 'Incrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setConstitutionOutput(e.target.value)
    //     setPoolTotal(poolTotal + 1)
    // }

    // function handleStrMinus(e: any) {
    //     e.preventDefault();
    //     e.target.value -= 1;
    //     console.log(e.target.name, 'Decrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setStrengthOutput(e.target.value)
    //     setPoolTotal(poolTotal - 1)
    // }
    // function handleStrPlus(e: any) {
    //     e.preventDefault();
    //     e.target.value = Number(e.target.value) + 1;
    //     console.log(e.target.name, 'Incrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setStrengthOutput(e.target.value)
    //     setPoolTotal(poolTotal + 1)
    // }

    // function handleAgiMinus(e: any) {
    //     e.preventDefault();
    //     e.target.value -= 1;
    //     console.log(e.target.name, 'Decrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setAgilityOutput(e.target.value)
    //     setPoolTotal(poolTotal - 1)
    // }
    // function handleAgiPlus(e: any) {
    //     e.preventDefault();
    //     e.target.value = Number(e.target.value) + 1;
    //     console.log(e.target.name, 'Incrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setAgilityOutput(e.target.value)
    //     setPoolTotal(poolTotal + 1)
    // }
   
    // function handleAchreMinus(e: any) {
    //     e.preventDefault();
    //     e.target.value -= 1;
    //     console.log(e.target.name, 'Decrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setAchreOutput(e.target.value)
    //     setPoolTotal(poolTotal - 1)
    // }
    // function handleAchrePlus(e: any) {
    //     e.preventDefault();
    //     e.target.value = Number(e.target.value) + 1;
    //     console.log(e.target.name, 'Incrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setAchreOutput(e.target.value)
    //     setPoolTotal(poolTotal + 1)
    // }
    
    // function handleCaerenMinus(e: any) {
    //     e.preventDefault();
    //     e.target.value -= 1;
    //     console.log(e.target.name, 'Decrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setCaerenOutput(e.target.value)
    //     setPoolTotal(poolTotal - 1)
    // }
    // function handleCaerenPlus(e: any) {
    //     e.preventDefault();
    //     e.target.value = Number(e.target.value) + 1;
    //     console.log(e.target.name, 'Incrementing to:', e.target.value)
    //     setAsceanState({
    //         ...asceanState,
    //         [e.target.name]: e.target.value,
    //     })
    //     setCaerenOutput(e.target.value)
    //     setPoolTotal(poolTotal + 1)
    // }
  return (
    <div>AsceanBuilder</div>
  )
}

export default AsceanBuilder