import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WeaponsCard from '../EquipmentCard/WeaponsCard';
import ShieldsCard from '../EquipmentCard/ShieldsCard';
import HelmetsCard from '../EquipmentCard/HelmetsCard';
import ChestsCard from '../EquipmentCard/ChestsCard';
import LegsCard from '../EquipmentCard/LegsCard';
import RingsCard from '../EquipmentCard/RingsCard';
import AmuletsCard from '../EquipmentCard/AmuletsCard';
import TrinketsCard from '../EquipmentCard/TrinketsCard';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';


interface Props {
    ascean: any;
    userProfile: boolean;
}

const SolaAscean = ({ ascean, userProfile }: Props) => {
    console.log(ascean, '<- Did you make it over?')
  return (
    <Row className="justify-content-center">
    <Col className="form-block wide">
        <hr className="orange-border" />
        <div className="section-left">
            {/* <div className="character-heading"> */}
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
            <div className="top-stats">
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
                    <h3>Attributes</h3>
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
                    <h3>Weapons & Spells</h3>
                    <div className="property-block">
                        <WeaponsCard 
                            userProfile={userProfile} 
                            weapon={ascean.weapon_one} 
                            weapon_one={ascean.weapon_one} 
                            weapon_two={ascean.weapon_two} 
                            weapon_three={ascean.weapon_three} 
                            key={ascean.weapon_one._id} 
                            index={ascean.name} 
                        />
                </div>
            </div>
            </div>
        </div>
        <div className="section-right">
            <div className="actions">
            <h3>Armor & Eccentricities</h3>
            <div className='property-block'>
            <div className='property-block'>
                <ShieldsCard 
                    userProfile={userProfile} 
                    shield={ascean.shield} 
                    key={ascean.shield._id} 
                    index={ascean.name}  
                />
                </div>
                <svg height="5" width="100%" className="tapered-rule my-2">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <HelmetsCard userProfile={userProfile} helmet={ascean.helmet} key={ascean.helmet._id} index={ascean.name} />
                
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

                <ChestsCard userProfile={userProfile} chest={ascean.chest} key={ascean.chest._id} index={ascean.name} />
        
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

        
                        <LegsCard userProfile={userProfile} leg={ascean.legs} key={ascean.legs._id} index={ascean.name} />
              
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>  

                    <AmuletsCard userProfile={userProfile} amulet={ascean.amulet} key={ascean.amulet._id} index={ascean.name} />
          
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

        
            <RingsCard userProfile={userProfile} ring={ascean.ring_one} ring_one={ascean.ring_one} ring_two={ascean.ring_two} key={ascean.ring_one._id} index={ascean.name}  />
          
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

                <TrinketsCard userProfile={userProfile} trinket={ascean.trinket} key={ascean.trinket._id} index={ascean.name} />
           
            <svg height="5" width="100%" className="tapered-rule my-2">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>


            </div>
            </div>
    
        </div>
       
    </Col>
    <button>Hello!</button> 
    </Row>
  )
}

export default SolaAscean