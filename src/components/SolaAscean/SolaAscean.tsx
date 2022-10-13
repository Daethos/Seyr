import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FeelingsCard from '../FeelingsCard/FeelingsCard'
import CreateAscean from '../../components/CreateAscean/CreateAscean'


interface Props {
    ascean: any;
    setAscean?: React.Dispatch<any>;
    userProfile?: boolean;
    deleteAscean?: any;
    communityFeed?: boolean;
    addFeeling?: any;
    removeFeeling?: any;
    loggedUser?: any;
    profilePage?: boolean;
    handleAsceanCreate?: any;
}

const SolaAscean = ({ ascean, setAscean, userProfile, deleteAscean, communityFeed, addFeeling, loggedUser, removeFeeling, profilePage, handleAsceanCreate }: Props) => {

  return (
    <React.Fragment>
    <Row className="justify-content-center my-5">
    <Col className="stat-block wide">
    <hr className="orange-border" />
        <div className="section-left">
            {/* <div className="character-heading"> */}
            {
                communityFeed
                ?
                <div className="actions">
                    <Link to={`/${ascean.user.username}`} style={{ textDecoration: 'none' }}>
                        <h3>
                            <img 
                                src={ascean.user.photoUrl ? ascean.user.photoUrl : ''} 
                                alt={ascean.user.username ? ascean.user.username : ''} 
                                id="community-pic"
                            />
                            {
                                ascean.user.username
                                ? ascean.user.username
                                : ''
                            } 
                        </h3>
                    </Link>
                </div>
                : ''
            }
            <div className="actions">
                <h3>Character</h3>
            </div>
            <div className="creature-heading">
                    <h1>{ascean.name}</h1>
                    <h2>{ascean.description}</h2>
            </div>
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            {/* <AsceanImageCard
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
            <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg> */}
            <div className="top-stats">
            <div className="actions">
                <h3>Attributes & Statistics</h3>
            </div>
            <div className="abilities">
            <div className="ability-strength">
                <h4>CON</h4>
                    <p className="" id="con-box">{ascean.constitution}</p>
            </div>
            <div className="ability-dexterity">
                <h4>STR</h4>
                <p className="" id="str-box">{ascean.strength}</p>
            </div>
            <div className="ability-constitution">
                <h4>AGI</h4>
                <p className=""  id="agi-box">{ascean.agility}</p>
                
            </div>
            <div className="ability-intelligence">
                <h4>Achr</h4>
                <p className="" id="ach-box">{ascean.achre}</p>
                
            </div>
            <div className="ability-wisdom">
                <h4>CAER</h4>
                <p className="" id="caer-box">{ascean.caeren}</p>
            </div>
            </div>
            {/* <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg> */}
            {/* FIXME: Check in the morning, ES Lint is complaining! */}
            <div className="actions"><h3> </h3></div>
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
                <p id="phys-dam"> {ascean.weapon_one.physical_damage} [{ascean.weapon_one.damage_type}], {ascean.weapon_two.physical_damage} [{ascean.weapon_two.damage_type}], {ascean.weapon_three.physical_damage} [{ascean.weapon_three.damage_type}]</p>
            </div>
            <div className="property-line">
                <h4>Magical Damage</h4>
                <p id="magi-dam"> {ascean.weapon_one.magical_damage} [{ascean.weapon_one.damage_type}], {ascean.weapon_two.magical_damage} [{ascean.weapon_two.damage_type}], {ascean.weapon_three.magical_damage} [{ascean.weapon_three.damage_type}]</p>
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
            <div className="actions">
                <h3>Faith</h3>
            </div>
            <div className="property-line first">
                <h4>Adherence ?{' '}</h4>
                <p id="adherence"> {' '}
                {
                    ascean.faith === 'adherent'
                    ? 'You bet your ass'
                    : 'No fucking way man'
                }
                </p>
                
            </div>
            <div className="property-line first">
                <h4>Devotion ?{' '}</h4>
                <p>{' '}
                {
                    ascean.faith === 'devoted'
                    ? 'You bet your ass'
                    : 'No fucking way man'
                }</p>
                
            </div>
            <div className="actions">
            <div className="property-block">
            </div>
            </div>
            </div>
        </div>
        <div className="section-right">
            {
                communityFeed
                ? <FeelingsCard loggedUser={loggedUser} addFeeling={addFeeling} removeFeeling={removeFeeling} ascean={ascean} key={ascean._id} />
                : ''
            }
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
            <div className='property-block'>
            </div>
            </div>
            
        </div>
        {
            userProfile
            ? <>
            <Link to={{ pathname: `/edit/${ascean._id}` }}>
                <button 
                className="btn" 
                value={ascean._id} 
                style={{ color: 'blue', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}>
                    Update {ascean.name}
                </button>
            </Link>
            
            <button 
                className="btn" 
                value={ascean._id} 
                onClick={deleteAscean}
                style={{ color: 'red', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}>
                    Delete {ascean.name}
            </button>
            
            </>
            : ''
        }
        {
            communityFeed
            ? <CreateAscean ascean={ascean} setAscean={setAscean} handleAsceanCreate={handleAsceanCreate} key={ascean._id} />
            : ''
        }
         <hr className='orange-border bottom' />
    </Col>
    
    </Row>
    </React.Fragment>
  )
}

export default SolaAscean