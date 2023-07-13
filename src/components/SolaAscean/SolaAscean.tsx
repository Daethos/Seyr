import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import AsceanStatCompiler from '../../components/AsceanStatCompiler/AsceanStatCompiler'
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler'
import Delete from '../AsceanBuilder/Delete';
import Update from '../AsceanBuilder/Update';
import Play from '../AsceanBuilder/Play';
import Save from '../AsceanBuilder/Save';
import Phaser from '../AsceanBuilder/Phaser';

interface Props {
    ascean: any;
    userProfile?: boolean;
    deleteAscean?: any;
    loggedUser?: any;
    loading?: boolean;
    accordion?: string;
    handleAsceanCreate?: any;
};

const SolaAscean = ({ ascean, userProfile, deleteAscean, loading, accordion, handleAsceanCreate }: Props) => {

     return (
        <React.Fragment>
        <Row className="justify-content-center my-3">
        <Col className="stat-block wide">
        <hr className="orange-border" />
        <div className="section-left">
        { userProfile ? ( 
            <>
                <Play ascean={ascean} />
                <Phaser ascean={ascean} />
                <Update ascean={ascean} NavBar={false} />
                <Delete ascean={ascean} deleteAscean={deleteAscean} />
                <svg height="5" width="100%" className="tapered-rule mt-1">
                <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
            </>
        ) : ( '' ) }
        { accordion === 'Tight' ? (
            <>
            <div className="creature-heading">
                <h1>{ascean.name}</h1>
                <h2 className='ascean-description'>{ascean.description}</h2>
            </div>
            <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-home-pic" />
            </> 
        ) : accordion === 'Lean' ? (
            <>
                <div className="creature-heading">
                    <h1>{ascean.name}</h1>
                    <h2 className='ascean-description'>{ascean.description}</h2>
                </div>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-home-pic" /> 
                <svg height="5" width="100%" className="tapered-rule mt-2">
                <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
                <div className="property-line first">
                    <h4>Experience</h4>
                    <p> {ascean.experience} / {ascean.level * 1000}</p>
                </div>
                <div className="property-line">
                    <h4>Level</h4>
                    <p> {ascean.level}</p>
                </div>
                <div className="property-line">
                    <h4>High Score</h4>
                    <p> {ascean.high_score}</p>
                </div>
                <div className="property-line">
                    <h4>Faith</h4>
                    <p> {ascean.faith.charAt(0).toUpperCase() + ascean.faith.slice(1)}</p>
                </div>
                <div className="property-line last">
                    <h4>Mastery</h4>
                    <p> {ascean.mastery}</p>
                </div>
            </> 
        ) : accordion === 'Half' ? (
            <>
                <div className="creature-heading">
                    <h1>{ascean.name}</h1>
                    <h2 className='ascean-description'>{ascean.description}</h2>
                </div>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-home-pic" />
                <svg height="5" width="100%" className="tapered-rule mt-2">
                    <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
                <div className="property-line first">
                    <h4>Experience</h4>
                    <p> {ascean.experience} / {ascean.level * 1000}</p>
                </div>
                <div className="property-line">
                    <h4>Level</h4>
                    <p> {ascean.level}</p>
                </div>
                <div className="property-line">
                    <h4>High Score</h4>
                    <p> {ascean.high_score}</p>
                </div>
                <div className="property-line">
                    <h4>Faith</h4>
                    <p> {ascean.faith.charAt(0).toUpperCase() + ascean.faith.slice(1)}</p>
                </div>
                <div className="property-line last">
                    <h4>Mastery</h4>
                    <p> {ascean.mastery}</p>
                </div>
                <svg height="5" width="100%" className="tapered-rule mt-3">
                    <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
                <div className="actions mt-1">
                <AsceanAttributeCompiler ascean={ascean} />
                <svg height="5" width="100%" className="tapered-rule mt-3">
                    <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
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
                    loading={loading}
                />
                </div>
            </>
        ) : (
            <>
            <div className="creature-heading">
                <h1>{ascean.name}</h1>
                <h2 className='ascean-description'>{ascean.description}</h2>
            </div>
            <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-home-pic" />
                <svg height="5" width="100%" className="tapered-rule mt-2">
                    <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
                <div className="property-line first">
                    <h4>Experience</h4>
                    <p> {ascean.experience} / {ascean.level * 1000}</p>
                </div>
                <div className="property-line">
                    <h4>Level</h4>
                    <p> {ascean.level}</p>
                </div>
                <div className="property-line">
                    <h4>High Score</h4>
                    <p> {ascean.high_score}</p>
                </div>
                <div className="property-line">
                    <h4>Faith</h4>
                    <p> {ascean.faith.charAt(0).toUpperCase() + ascean.faith.slice(1)}</p>
                </div>
                <div className="property-line last">
                    <h4>Mastery</h4>
                    <p> {ascean.mastery}</p>
                </div>
                <svg height="5" width="100%" className="tapered-rule mt-3">
                    <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
                <div className="actions mt-1">
                <AsceanAttributeCompiler ascean={ascean}  />
                <svg height="5" width="100%" className="tapered-rule mt-3">
                    <polyline points="0,0 550,2.5 0,5"></polyline>
                </svg>
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
                    loading={loading}
                    />
                </div> 
                <div className="top-stats">
                    <svg height="5" width="100%" className="tapered-rule mt-3">
                        <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                </div>
                <AsceanStatCompiler communityFocus={false} ascean={ascean} />
                    { userProfile ? 
                    <>
                        <div className="actions">
                        <h3>Communal</h3>
                        </div>
                        <div className="property-line first">
                        <h4>Visible to the Community ? </h4>
                        <p>{ascean.visibility.charAt(0).toUpperCase() + ascean.visibility.slice(1)}</p>
                        </div>
                        <div className="property-line first">
                        <h4>Shareable to the Community ? </h4>
                        <p>{ascean.shareable.charAt(0).toUpperCase() + ascean.shareable.slice(1)}</p>
                        </div>
                    </>
                    : '' }
            </>
        ) }
            </div> 
            <hr className='orange-border bottom' />
        </Col>
        </Row>
        </React.Fragment>
    );
};

export default SolaAscean;