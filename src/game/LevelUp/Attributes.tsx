import React, { useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';

interface Props {
    asceanState: any;
    setAsceanState: React.Dispatch<any>;
};

const Attributes = ({ asceanState, setAsceanState }: Props) => {
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
    const [poolTotal, setPoolTotal] = useState<number>(4);

    const [constitutionCurrent, setConstitutionCurrent] = useState<number>(asceanState.ascean.constitution);
    const [strengthCurrent, setStrengthCurrent] = useState<number>(asceanState.ascean.strength);
    const [agilityCurrent, setAgilityCurrent] = useState<number>(asceanState.ascean.agility);
    const [achreCurrent, setAchreCurrent] = useState<number>(asceanState.ascean.achre);
    const [caerenCurrent, setCaerenCurrent] = useState<number>(asceanState.ascean.caeren);
    const [kyosirCurrent, setKyosirCurrent] = useState<number>(asceanState.ascean.kyosir);

    const [constitutionOutput, setConstitutionOutput] = useState<number>(0);
    const [strengthOutput, setStrengthOutput] = useState<number>(0);
    const [agilityOutput, setAgilityOutput] = useState<number>(0);
    const [achreOutput, setAchreOutput] = useState<number>(0);
    const [caerenOutput, setCaerenOutput] = useState<number>(0);
    const [kyosirOutput, setKyosirOutput] = useState<number>(0);

    const conOut = document.getElementById('con-box') as HTMLOutputElement | null;
    useEffect(() => { 
        console.log(constitutionOutput, '<- New Constitution Point Total');
        if (conOut !== null) {
            // conOut!.innerHTML = (constitutionCurrent > 9 ? `${constitutionCurrent} +` + Math.floor((constitutionCurrent - 10) / 2) + ' Modifier' : Math.floor((constitutionCurrent - 10) / 2) + ' Modifier');
            conOut!.innerHTML = `${constitutionCurrent}`;
        };
    }, [constitutionOutput, constitutionCurrent, conOut]);

    const strOut = document.getElementById('str-box');
    useEffect(() => {
        console.log(strengthOutput, '<- New Strength Point Total');
        if (strOut !== null) {
            strOut!.innerHTML = `${strengthCurrent}`;
            // strOut!.innerHTML = (strengthCurrent > 9 ? `${strengthCurrent} +` + Math.floor((strengthCurrent - 10) / 2) + ' Modifier' : Math.floor((strengthCurrent - 10) / 2) + ' Modifier');
        };
    }, [strengthOutput, strengthCurrent, strOut]);

    const agiOut = document.getElementById('agi-box');
    useEffect(() => {
        console.log(agilityOutput, '<- New Agility Point Total');
        if (agiOut !== null) {
            agiOut!.innerHTML = `${agilityCurrent}`;
            // agiOut!.innerHTML = (agilityCurrent > 9 ? `${agilityCurrent} +` + Math.floor((agilityCurrent - 10) / 2) + ' Modifier' : Math.floor((agilityCurrent - 10) / 2) + ' Modifier');
        };
    }, [agilityOutput, agilityCurrent, agiOut]);

    const achOut = document.getElementById('ach-box');
    useEffect(() => {
        console.log(achreOutput, '<- New Achre Point Total');
        if (achOut !== null) {
            achOut!.innerHTML = `${achreCurrent}`;
            // achOut!.innerHTML = (achreCurrent > 9 ? `${achreCurrent} +` + Math.floor((achreCurrent - 10) / 2) + ' Modifier' : Math.floor((achreCurrent - 10) / 2) + ' Modifier');
        };
    }, [achreOutput, achreCurrent, achOut]);

    const caerOut = document.getElementById('caer-box');
    useEffect(() => {
        console.log(caerenOutput, '<- New Caeren Point Total');
        if (caerOut !== null) {
            caerOut!.innerHTML = `${caerenCurrent}`;
            // caerOut!.innerHTML = (caerenCurrent > 9 ? `${caerenCurrent} +` + Math.floor((caerenCurrent - 10) / 2) + ' Modifier' : Math.floor((caerenCurrent - 10) / 2) + ' Modifier');
        };
    }, [caerenOutput, caerenCurrent, caerOut]);

    const kyoOut = document.getElementById('kyo-box');
    useEffect(() => {
        console.log(kyosirOutput, '<- New Kyosir Point Total');
        if (kyoOut !== null) {
            kyoOut!.innerHTML = `${kyosirCurrent}`;
            // kyoOut!.innerHTML = (kyosirCurrent > 9 ? `${kyosirCurrent} +` + Math.floor((kyosirCurrent - 10) / 2) + ' Modifier' : Math.floor((kyosirCurrent - 10) / 2) + ' Modifier');
        };
    }, [kyosirOutput, kyosirCurrent, kyoOut]);

    useEffect(() => {
        setPoolTotal(0)
    }, []);

    useEffect(() => {
        checkPoolTotal();
    }, [poolTotal]);

    async function checkPoolTotal() {
        if (poolOutput != null) {
            poolOutput!.innerHTML = poolTotal + ' Points / 4 Points';
        };
        if (constitutionOutput > 0) {
            conMinusButton!.style.display = 'inline-block';
        } else if (constitutionOutput <= 0) {
            if (conMinusButton !== null) conMinusButton!.style.display = 'none';
        };
        if (strengthOutput > 0) {
            strMinusButton!.style.display = 'inline-block';
        } else if (strengthOutput <= 0) {
            if (strMinusButton !== null) strMinusButton!.style.display = 'none';
        };
        if (agilityOutput > 0) {
            agiMinusButton!.style.display = 'inline-block';
        } else if (agilityOutput <= 0) {
            if (agiMinusButton !== null) agiMinusButton!.style.display = 'none';
        };
        if (achreOutput > 0) {
            achMinusButton!.style.display = 'inline-block';
        } else if (achreOutput <= 0) {
            if (achMinusButton !== null) achMinusButton!.style.display = 'none';
        };
        if (caerenOutput > 0) {
            caerMinusButton!.style.display = 'inline-block';
        } else if (caerenOutput <= 0) {
            if (caerMinusButton !== null) caerMinusButton!.style.display = 'none';
        };
        if (kyosirOutput > 0) {
            kyoMinusButton!.style.display = 'inline-block';
        } else if (kyosirOutput <= 0) {
            if (kyoMinusButton !== null) kyoMinusButton!.style.display = 'none';
        };
        if (poolTotal >= 4) {
            if (conPlusButton !== null) conPlusButton!.style.display = 'none';
            if (strPlusButton !== null) strPlusButton!.style.display = 'none';
            if (agiPlusButton !== null) agiPlusButton!.style.display = 'none';
            if (achPlusButton !== null) achPlusButton!.style.display = 'none';
            if (caerPlusButton !== null) caerPlusButton!.style.display = 'none';
            if (kyoPlusButton !== null) kyoPlusButton!.style.display = 'none';
        };
        if (poolTotal > 0 && poolTotal < 4) {
            if (conPlusButton !== null) conPlusButton!.style.display = 'inline-block';
            if (strPlusButton !== null) strPlusButton!.style.display = 'inline-block';
            if (agiPlusButton !== null) agiPlusButton!.style.display = 'inline-block';
            if (achPlusButton !== null) achPlusButton!.style.display = 'inline-block';
            if (caerPlusButton !== null) caerPlusButton!.style.display = 'inline-block';
            if (kyoPlusButton !== null) kyoPlusButton!.style.display = 'inline-block';
        };
        if (poolTotal <= 0) {
            if (conMinusButton !== null) {
                conMinusButton!.style.display = 'none';
            };
            if (strMinusButton !== null) {
                strMinusButton!.style.display = 'none';
            };
            if (agiMinusButton !== null) {
                agiMinusButton!.style.display = 'none';
            };
            if (achMinusButton !== null) {
                achMinusButton!.style.display = 'none';
            };
            if (caerMinusButton !== null) {
                caerMinusButton!.style.display = 'none';
            };
            if (kyoMinusButton !== null) {
                kyoMinusButton!.style.display = 'none';
            };
        };
    };
    checkPoolTotal();

    function handleConMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setConstitutionOutput(e.target.value);
        setConstitutionCurrent((constitutionCurrent) => (constitutionCurrent - 1));
        setPoolTotal(poolTotal - 1);
    };
    function handleConPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        })
        setConstitutionCurrent((constitutionCurrent) => (constitutionCurrent + 1));
        setConstitutionOutput(e.target.value)
        setPoolTotal(poolTotal + 1)
    };

    function handleStrMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setStrengthCurrent((strengthCurrent) => (strengthCurrent - 1));
        setStrengthOutput(e.target.value);
        setPoolTotal(poolTotal - 1);
    };
    function handleStrPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setStrengthCurrent((strengthCurrent) => (strengthCurrent + 1));
        setStrengthOutput(e.target.value);
        setPoolTotal(poolTotal + 1);
    };

    function handleAgiMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setAgilityCurrent((agilityCurrent) => (agilityCurrent - 1));
        setAgilityOutput(e.target.value);
        setPoolTotal(poolTotal - 1);
    };
    function handleAgiPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setAgilityCurrent((agilityCurrent) => (agilityCurrent + 1));
        setAgilityOutput(e.target.value);
        setPoolTotal(poolTotal + 1);
    };
   
    function handleAchreMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setAchreCurrent((achreCurrent) => (achreCurrent - 1));
        setAchreOutput(e.target.value);
        setPoolTotal(poolTotal - 1);
    };
    function handleAchrePlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setAchreCurrent((achreCurrent) => (achreCurrent + 1));
        setAchreOutput(e.target.value);
        setPoolTotal(poolTotal + 1);
    };
    
    function handleCaerenMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setCaerenCurrent((caerenCurrent) => (caerenCurrent - 1));
        setCaerenOutput(e.target.value);
        setPoolTotal(poolTotal - 1);
    };
    function handleCaerenPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setCaerenCurrent((caerenCurrent) => (caerenCurrent + 1));
        setCaerenOutput(e.target.value);
        setPoolTotal(poolTotal + 1);
    };

    function handleKyosirMinus(e: any) {
        e.preventDefault();
        e.target.value -= 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setKyosirCurrent((kyosirCurrent) => (kyosirCurrent - 1));
        setKyosirOutput(e.target.value);
        setPoolTotal(poolTotal - 1);
    };
    function handleKyosirPlus(e: any) {
        e.preventDefault();
        e.target.value = Number(e.target.value) + 1;
        setAsceanState({
            ...asceanState,
            [e.target.name]: e.target.value,
        });
        setKyosirCurrent((kyosirCurrent) => (kyosirCurrent + 1));
        setKyosirOutput(e.target.value);
        setPoolTotal(poolTotal + 1);
    };

    const attributeStyle = {
        marginLeft: "15%",
        color: "gold", 
        marginTop: "2.5%",
        fontSize: "18px",
    }

    return (
        <>
        <div className="actions">
            <h3>+4 Attribute Points</h3>
            <h3 id="pool-output"></h3>
        </div>
        <div className="property-line first">
            <h4>Constitution: </h4>
            <p style={{ color: 'white' }}> Health, Defenses, Crit Damage</p>
            <InputGroup  className="mb-1" style={{width: 100 + '%', display: 'flex'}}>
            <button id="con-minus" onClick={handleConMinus} name="constitution" value={asceanState.constitution}>−</button>
                <input 
                    style={{ width: 35 + '%', textAlign: 'center' }} 
                    id="con-slider" 
                    className="form-control-number mx-1" 
                    type="number" 
                    name="constitution" 
                    value={asceanState.constitution} 
                    min="8" max="18"
                    step="1"
                    readOnly 
                ></input>
                <button id="con-plus" onClick={handleConPlus} name="constitution" value={asceanState.constitution}>+</button>
                <h4 className="" style={attributeStyle} id="con-box">
                </h4>
            </InputGroup>
        </div>
        <div className="property-line">
            <h4>Strength: </h4>
            <p style={{ color: 'white' }}> Crit Damage, Physical Damage, Health, Defenses</p>
            <InputGroup  className="mb-1">
            <button id="str-minus" onClick={handleStrMinus} name="strength" value={asceanState.strength}>−</button>
            <input 
                    style={{ width: 35 + '%', textAlign: 'center' }} 
                    id="con-slider" 
                    className="form-control-number mx-1" 
                    type="number" 
                    name="strength" 
                    value={asceanState.strength} 
                    min="8" max="18"
                    step="1"
                    readOnly 
                ></input>
            <button id="str-plus" onClick={handleStrPlus} name="strength" value={asceanState.strength}>+</button>
            <h4 className="" style={attributeStyle} id="str-box">
                </h4>
            </InputGroup>
        </div>
        <div className="property-line">
            <h4>Agility: </h4>
            <p style={{ color: 'white' }}>Crit Damage, Dodge, Phys Damage, Roll</p>
            <InputGroup  className="mb-1">
            <button id="agi-minus" onClick={handleAgiMinus} name="agility" value={asceanState.agility}>−</button>
            <input 
                    style={{ width: 35 + '%', textAlign: 'center' }} 
                    id="con-slider" 
                    className="form-control-number mx-1" 
                    type="number" 
                    name="agility" 
                    value={asceanState.agility} 
                    min="8" max="18"
                    step="1"
                    readOnly 
                ></input>
            <button id="agi-plus" onClick={handleAgiPlus} name="agility" value={asceanState.agility}>+</button>
            <h4 className="" style={attributeStyle} id="agi-box">
                </h4>
            </InputGroup>
        </div>
        <div className="property-line">
            <h4>Achre: </h4>
            <p style={{ color: 'white' }}>Crit Chance, Dodge, Spell Damage, Roll</p>
            <InputGroup  className="mb-1">
            <button id="ach-minus" onClick={handleAchreMinus} name="achre" value={asceanState.achre}>−</button>
            <input 
                    style={{ width: 35 + '%', textAlign: 'center' }} 
                    id="con-slider" 
                    className="form-control-number mx-1" 
                    type="number" 
                    name="achre" 
                    value={asceanState.achre} 
                    min="8" max="18"
                    step="1"
                    readOnly 
                ></input>
            <button id="ach-plus" onClick={handleAchrePlus} name="achre" value={asceanState.achre}>+</button>
            <h4 className="" style={attributeStyle} id="ach-box">
                </h4>
            </InputGroup>
        </div>
        <div className="property-line last">
            <h4>Caeren: </h4>
            <p style={{ color: '#fdf6d8' }}>Crit Damage, Defenses, Health, Spell Damage</p>
            <InputGroup  className="mb-1">
            <button id="caer-minus" onClick={handleCaerenMinus} name="caeren" value={asceanState.caeren}>−</button>
            <input 
                    style={{ width: 35 + '%', textAlign: 'center' }} 
                    id="con-slider" 
                    className="form-control-number mx-1" 
                    type="number" 
                    name="caeren" 
                    value={asceanState.caeren} 
                    min="8" max="18"
                    step="1"
                    readOnly 
                ></input>
                <button id="caer-plus" onClick={handleCaerenPlus} name="caeren" value={asceanState.caeren}>+</button>
                <h4 className="" style={attributeStyle} id="caer-box">
                </h4>
            </InputGroup>
        </div>
        <div className="property-line last">
            <h4>Kyosir: </h4>
            <p style={{ color: 'white' }}>Defenses, Penetration</p>
            <InputGroup  className="mb-1">
            <button id="kyo-minus" onClick={handleKyosirMinus} name="kyosir" value={asceanState.kyosir}>−</button>
            <input 
                    style={{ width: 35 + '%', textAlign: 'center' }} 
                    id="con-slider" 
                    className="form-control-number mx-1" 
                    type="number" 
                    name="kyosir" 
                    value={asceanState.kyosir} 
                    min="8" max="18"
                    step="1"
                    readOnly 
                ></input>
                <button id="kyo-plus" onClick={handleKyosirPlus} name="kyosir" value={asceanState.kyosir}>+</button>
                <h4 className="" style={attributeStyle} id="kyo-box">
                </h4>
            </InputGroup>
        </div>
        </>
    );
};

export default Attributes;