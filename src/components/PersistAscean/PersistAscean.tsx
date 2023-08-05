import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Character from '../AsceanBuilder/Character';
import AttributesCreate from '../AsceanBuilder/AttributesCreation'
import Faith from '../AsceanBuilder/Faith'
import Origin from '../AsceanBuilder/Origin';
import Mastery from '../AsceanBuilder/Mastery';
import Sex from '../AsceanBuilder/Sex';
import Communal from '../AsceanBuilder/Communal';
import * as asceanAPI from '../../utils/asceanApi';
import ToastAlert from '../ToastAlert/ToastAlert';

interface Error {
    title: string;
    content: string;
};

interface AsceanProps {
    lineage: any;
};

const PersistAscean = ({ lineage }: AsceanProps) => {
    const navigate = useNavigate();
    const [originModalShow, setOriginModalShow] = React.useState<boolean>(false);
    const [error, setError] = useState<Error>({ title: '', content: '' });
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
        preference: '',
        hardcore: false,
        visibility: 'public',
        shareable: 'none',
        lineage: lineage,
    });

    const [constitutionOutput, setConstitutionOutput] = useState<number>(8)
    const [strengthOutput, setStrengthOutput] = useState<number>(8)
    const [agilityOutput, setAgilityOutput] = useState<number>(8)
    const [achreOutput, setAchreOutput] = useState<number>(8)
    const [caerenOutput, setCaerenOutput] = useState<number>(8)
    const [kyosirOutput, setkyosirOutput] = useState<number>(8)
    const conOut = document.getElementById('con-box') as HTMLOutputElement | null;
    const strOut = document.getElementById('str-box');
    const agiOut = document.getElementById('agi-box');
    const achOut = document.getElementById('ach-box');
    const caerOut = document.getElementById('caer-box');
    const kyoOut = document.getElementById('kyo-box');

    function handleSubmit(e: any) {
        e.preventDefault();
        if (asceanState.name === '') {
            setError({ title: 'Name is required', content: 'Please enter a name for your character' });
            return;
        };
        if (asceanState.description === '') {
            setError({ title: 'Description is required', content: 'Please enter a description for your character' });
            return;
        };
        async function createAscean() {
            try {
                const newAscean = await asceanAPI.persist(asceanState);
                console.log(newAscean, "New Ascean ?");
                navigate(`/`);
            } catch (err) {
                console.log(err, '%c <- You have an error in creating a character', 'color: red')
            };
        };
        createAscean(); 
    };

    useEffect(() => {
        console.log(lineage, "Lineage?")
    }, [asceanState]);

    
    useEffect(() => { 
        if (conOut !== null) {
            conOut!.innerHTML = (constitutionOutput > 9 ? ' +' + Math.floor((constitutionOutput - 10) / 2) + ' Modifier' : Math.floor((constitutionOutput - 10) / 2) + ' Modifier');
        };
    }, [constitutionOutput, conOut]);

    useEffect(() => {
        if (strOut !== null) {
            strOut!.innerHTML = (strengthOutput > 9 ? ' +' + Math.floor((strengthOutput - 10) / 2) + ' Modifier' : Math.floor((strengthOutput - 10) / 2) + ' Modifier');
        };
    }, [strengthOutput, strOut]);

    useEffect(() => {
        if (agiOut !== null) {
            agiOut!.innerHTML = (agilityOutput > 9 ? ' +' + Math.floor((agilityOutput - 10) / 2) + ' Modifier' : Math.floor((agilityOutput - 10) / 2) + ' Modifier');
        };
    }, [agilityOutput, agiOut]);

    useEffect(() => {
        if (achOut !== null) {
            achOut!.innerHTML = (achreOutput > 9 ? ' +' + Math.floor((achreOutput - 10) / 2) + ' Modifier' : Math.floor((achreOutput - 10) / 2) + ' Modifier');
        };
    }, [achreOutput, achOut]);

    useEffect(() => {
        if (caerOut !== null) {
            caerOut!.innerHTML = (caerenOutput > 9 ? ' +' + Math.floor((caerenOutput - 10) / 2) + ' Modifier' : Math.floor((caerenOutput - 10) / 2) + ' Modifier');
        };
    }, [caerenOutput, caerOut]);

    useEffect(() => {
        if (kyoOut !== null) {
            kyoOut!.innerHTML = (kyosirOutput > 9 ? ' +' + Math.floor((kyosirOutput - 10) / 2) + ' Modifier' : Math.floor((kyosirOutput - 10) / 2) + ' Modifier');
        };
    }, [kyosirOutput, kyoOut]);

    return (
        <Row className="justify-content-center my-3" style={{ overflow: "scroll", maxHeight: "70vh", border: "3px solid purple" }}>
            <ToastAlert error={error} setError={setError} />
            <h3 style={{ color: '#fdf6d8', textAlign: 'center' }}>Persist Caeren of {lineage?.name}</h3>
            <Form className="stat-block wide my-3" id="new-ascean" onSubmit={handleSubmit}>
            <hr className="orange-border" />
            <div className="section-left">
            <Character asceanState={asceanState} setAsceanState={setAsceanState} />
            <Origin asceanState={asceanState} setAsceanState={setAsceanState} originModalShow={originModalShow} setOriginModalShow={setOriginModalShow} />
            <Sex asceanState={asceanState} setAsceanState={setAsceanState} />
            <img src={process.env.PUBLIC_URL + '/images/' + asceanState.origin + '-' + asceanState.sex + '.jpg'} id="ascean-pic" /><br />
            <Faith asceanState={asceanState} setState={setAsceanState} />
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="top-stats">
            <Mastery asceanState={asceanState} setState={setAsceanState} />
            <AttributesCreate asceanState={asceanState} setAsceanState={setAsceanState} />
            <Communal editState={asceanState} setEditState={setAsceanState} />
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            
            </div>
                <button 
                    className="btn mt-4" value={asceanState} 
                    style={{ color: 'blueviolet', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px', textAlign: "center" }}
                    type="submit">Create {asceanState?.name}</button>
            </div>
            <hr className="orange-border bottom" />
            </Form>
        </Row>
    );
};

export default PersistAscean;