import React, { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

interface Props {
    asceanState: any;
    setAsceanState: React.Dispatch<any>;
}

const AttributesCreate = ({ asceanState, setAsceanState }: Props) => {
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
    const kyoMinusButton = document.getElementById('kyo-minus');
    const kyoPlusButton = document.getElementById('kyo-plus');

    let poolOutput = document.getElementById('pool-output') as HTMLOutputElement | null;
    const [poolTotal, setPoolTotal] = useState<number>(0);

    const [constitutionOutput, setConstitutionOutput] = useState<number>(8)
    const [strengthOutput, setStrengthOutput] = useState<number>(8)
    const [agilityOutput, setAgilityOutput] = useState<number>(8)
    const [achreOutput, setAchreOutput] = useState<number>(8)
    const [caerenOutput, setCaerenOutput] = useState<number>(8)
    const [kyosirOutput, setKyosirOutput] = useState<number>(8)

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

    useEffect(() => {
        setPoolTotal(0)
    }, [])

    // Pool Total Use Effect
    useEffect(() => {
        checkPoolTotal()
        
    }, [poolTotal])

    async function checkPoolTotal() {
        if (poolOutput != null) {
            poolOutput!.innerHTML = poolTotal + ' Points / 25 Points';
        }
        if (poolTotal >= 25) {
            conPlusButton!.style.display = 'none';
            strPlusButton!.style.display = 'none';
            agiPlusButton!.style.display = 'none';
            achPlusButton!.style.display = 'none';
            caerPlusButton!.style.display = 'none';
            kyoPlusButton!.style.display = 'none';
            conMinusButton!.style.display = 'inline-block';
            strMinusButton!.style.display = 'inline-block';
            agiMinusButton!.style.display = 'inline-block';
            achMinusButton!.style.display = 'inline-block';
            caerMinusButton!.style.display = 'inline-block';
            kyoMinusButton!.style.display = 'inline-block';
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
        if (poolTotal < 25 && kyosirOutput >= 18) {
            if (kyoPlusButton !== null) {
                kyoPlusButton!.style.display = 'none';
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
        if (poolTotal < 25 && kyosirOutput < 18) {
            if (kyoPlusButton !== null) {
                kyoPlusButton!.style.display = 'inline-block';
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
        if (poolTotal <= 25 && kyosirOutput > 8) {
            if (kyoMinusButton !== null) {
                kyoMinusButton!.style.display = 'inline-block';
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
        if (poolTotal <= 25 && kyosirOutput <= 8) {
            if (kyoMinusButton !== null) {
                kyoMinusButton!.style.display = 'none';
            }
        }
    }
    checkPoolTotal()

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

    function handleKyosirMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        console.log(e.target.name, 'Decrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setKyosirOutput(e.target.value)
        setPoolTotal(poolTotal - 1)
    }
    function handleKyosirPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        console.log(e.target.name, 'Incrementing to:', e.target.value)
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setKyosirOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    }
  return (
    <>
    <div className="actions">
                        <h3>Attributes</h3>
                        <h3 id="pool-output"></h3>
                    </div>
                    <div className="property-line first">
                        <h4>Constitution</h4>
                        <p> Increases Health, Defense, Posturing, Crit Damage</p>
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
                        <p> Increases Crit Damage, Physical Damage, Posturing</p>
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
                        <p> Increases Crit Damage, Dodge, Phys Damage, Roll</p>
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
                        <p> Increases Crit Chance, Dodge, Spell Damage, Roll</p>
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
                        <p> Increases Crit Damage, Defense, Health, Spell Damage</p>
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
                    <div className="property-line last">
                        <h4>Kyosir</h4>
                        <p> Increases Defense, Penetration</p>
                        <InputGroup className="mb-1">
                        <button id="kyo-minus" onClick={handleKyosirMinus} name="kyosir" value={asceanState.kyosir}>−</button>
                        <input 
                                id="con-slider" 
                                className="form-control-number" 
                                type="number" 
                                name="kyosir" 
                                value={asceanState.kyosir} 
                                min="8" max="18"
                                step="1"
                                readOnly 
                            ></input>
                            <button id="kyo-plus" onClick={handleKyosirPlus} name="kyosir" value={asceanState.kyosir}>+</button>
                            <h4 className="" style={{ marginLeft: 15 + '%' }} id="kyo-box">
                            </h4>
                        </InputGroup>
                    </div>
    </>
  )
}

export default AttributesCreate