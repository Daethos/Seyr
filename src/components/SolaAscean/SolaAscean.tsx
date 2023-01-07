import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import AsceanStatCompiler from '../../components/AsceanStatCompiler/AsceanStatCompiler'
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler'
import Delete from '../AsceanBuilder/Delete';
import Update from '../AsceanBuilder/Update';


interface Props {
    ascean: any;
    userProfile?: boolean;
    deleteAscean?: (ascean: any) => Promise<void>;
    loggedUser?: any;
}

const SolaAscean = ({ ascean, userProfile, deleteAscean }: Props) => {

  return (
    <React.Fragment>
    <Row className="justify-content-center my-5">
    <Col className="stat-block wide">
    <hr className="orange-border" />
        <div className="section-left">
        <div className="creature-heading">
                <h1>{ascean.name}</h1>
                <h2>{ascean.description}</h2>
        </div>
        <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-pic" />
        <svg height="5" width="100%" className="tapered-rule mt-3">
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
        <AsceanAttributeCompiler ascean={ascean} key={ascean._id + 1} />
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
            key={ascean._id}
        />
        </div>
        <div className="top-stats">
            <svg height="5" width="100%" className="tapered-rule mt-3">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
        </div>
        </div>
        <div className="section-right">
            <AsceanStatCompiler communityFocus={false} ascean={ascean} key={ascean._id + 2} />
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
            </div>
            <div className="actions">
        
        </div>
        { userProfile ? 
        <>
            {/* <Update ascean={ascean} NavBar={false} /> */}
            <Delete ascean={ascean} deleteAscean={deleteAscean} />
        </>
        : '' }
         <hr className='orange-border bottom' />
    </Col>
    </Row>
    </React.Fragment>
  )
}

export default SolaAscean