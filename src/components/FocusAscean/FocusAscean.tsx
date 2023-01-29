import React from 'react'
import Col from 'react-bootstrap/Col';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import { Link } from "react-router-dom";
import FeelingsCard from '../FeelingsCard/FeelingsCard'
import CreateAscean from '../../components/CreateAscean/CreateAscean'
import AsceanStatCompiler from '../../components/AsceanStatCompiler/AsceanStatCompiler'
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler'

interface Props {
    ascean: any;
    setAscean: React.Dispatch<any>;
    loggedUser: any;
    handleAsceanCreate: ((newAscean: Object) => Promise<void>);
}

const FocusAscean = ({ ascean, setAscean, loggedUser, handleAsceanCreate }: Props) => {

    return (
        <React.Fragment>
        <Col className="stat-block wide">
        <hr className="orange-border" />
        <div className="section-left">
            <div className="actions">
                <Link to={`/${ascean?.user?.username}`} style={{ textDecoration: 'none' }}>
                    <h3>
                        <img 
                            src={ascean?.user?.photoUrl ? ascean?.user?.photoUrl : ''} 
                            alt={ascean?.user?.username ? ascean?.user?.username : ''} 
                            id="community-pic"
                        />
                        {ascean?.user?.username ? ascean.user.username : '' } 
                    </h3>
                </Link>
            </div>
               
            <div className="creature-heading">
                <h1>{ascean.name}</h1>
                <h2>{ascean.description}</h2>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} id="ascean-pic" />
            </div>
            <svg height="5" width="100%" className="tapered-rule mt-3">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="property-line first">
                <h4>Level</h4>
                <p> {ascean.level}</p>
            </div>
            <div className="property-line">
                <h4>High Score</h4>
                <p> {ascean.high_score}</p>
            </div>
            <div className="property-line">
                <h4>Mastery</h4>
                <p> {ascean.mastery}</p>
            </div>
            <div className="property-line">
                <h4>Adherence ?{' '}</h4>
                <p id="adherence"> {' '}
                { ascean.faith === 'adherent' ? 'You bet your ass' : 'No fucking way man' }
                </p>
            </div>
            <div className="property-line last">
                <h4>Devotion ?{' '}</h4>
                <p>{' '}
                { ascean.faith === 'devoted' ? 'You bet your ass' : 'No fucking way man' }
                </p>
            </div>
            <svg height="5" width="100%" className="tapered-rule mt-3">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div className="top-stats">
            <AsceanAttributeCompiler ascean={ascean} key={ascean._id} />

            <svg height="5" width="100%" className="tapered-rule mt-3">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            </div>
        
        </div>
        <div className="section-right">
            <FeelingsCard loggedUser={loggedUser} ascean={ascean} key={ascean._id} />
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
            <AsceanStatCompiler ascean={ascean} communityFocus={true} key={ascean._id} />
            </div>
            
        </div>
        <CreateAscean ascean={ascean} handleAsceanCreate={handleAsceanCreate} key={ascean._id} />
        <hr className='orange-border bottom' />
        </Col>
        </React.Fragment>
    )
}

export default FocusAscean