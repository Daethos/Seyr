import React, { useState } from 'react'
import './NewAscean.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Character from '../AsceanBuilder/Character';
import AttributesCreate from '../AsceanBuilder/AttributesCreation'
import Faith from '../AsceanBuilder/Faith'
import Origin from '../AsceanBuilder/Origin';
import Mastery from '../AsceanBuilder/Mastery';
import Sex from '../AsceanBuilder/Sex';
import Preference from '../AsceanBuilder/Preference';
import Communal from '../AsceanBuilder/Communal';
import Hardcore from '../AsceanBuilder/Hardcore';
import { Symbols } from '../SolaAscean/SolaAscean';

interface AsceanProps {
    createSuccess: boolean;
    handleAsceanCreate: (newAscean: Object) => Promise<void>;
};

const NewAscean = ({ createSuccess, handleAsceanCreate }: AsceanProps) => {
    const [originModalShow, setOriginModalShow] = React.useState<boolean>(false);
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
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        async function createAscean() {
            try {
                handleAsceanCreate(asceanState);
            } catch (err) {
                console.log(err, '%c <- You have an error in creating a character', 'color: red')
            };
        };
        createAscean(); 
    }; 

    return (
        <Row className="justify-content-center my-3" >
            <h3 style={{ color: '#fdf6d8', textAlign: 'center' }}>New Character</h3>
        <Form className="stat-block wide my-3" id="new-ascean" onSubmit={handleSubmit} style={{ color: "gold" }}>
            <hr className="orange-border" />
            <div className="section-left" >
            <Character asceanState={asceanState} setAsceanState={setAsceanState} />
            <Origin asceanState={asceanState} setAsceanState={setAsceanState} originModalShow={originModalShow} setOriginModalShow={setOriginModalShow} />
            <Sex asceanState={asceanState} setAsceanState={setAsceanState} />
            <img src={process.env.PUBLIC_URL + '/images/' + asceanState.origin + '-' + asceanState.sex + '.jpg'} id="ascean-pic" /><br />
            <Faith asceanState={asceanState} setState={setAsceanState} />
            {Symbols.space}
            <div className="top-stats">
            <Preference asceanState={asceanState} setAsceanState={setAsceanState} />
            </div>
            </div>
            <div className='section-right'>
            <Mastery asceanState={asceanState} setState={setAsceanState} />
            <AttributesCreate asceanState={asceanState} setAsceanState={setAsceanState} />
            {/* <Communal editState={asceanState} setEditState={setAsceanState} /> */}
            {/* <Hardcore asceanState={asceanState} setAsceanState={setAsceanState} /> */}
            {Symbols.space}
            { createSuccess ? (
                <button 
                    className="btn mt-4" 
                    value={asceanState} 
                    style={{ color: 'green', fontWeight: 400, fontVariant: 'small-caps', fontSize: '28px', textDecoration: 'none', textAlign: "center" }}
                    type="submit" disabled>
                Created {asceanState.name}!</button>
            ) : ( 
                <button 
                    className="btn my-2" 
                    value={asceanState} 
                    style={{ color: 'gold', fontWeight: 600, fontVariant: 'small-caps', fontSize: '28px', width: '100%', marginLeft: "auto" }}
                    type="submit">
                Create Ascean</button>
            ) }
            </div>
            <hr className="orange-border bottom" />
        </Form>
        </Row>
    );
};

export default NewAscean;