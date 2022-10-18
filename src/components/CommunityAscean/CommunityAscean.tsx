import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FeelingsCard from '../FeelingsCard/FeelingsCard'
import CreateAscean from '../../components/CreateAscean/CreateAscean'
import AsceanStatCompiler from '../../components/AsceanStatCompiler/AsceanStatCompiler'
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler'


interface Props {
    ascean?: any;
    setAscean?: React.Dispatch<any>;
    userProfile?: boolean;
    communityFeed?: boolean;
    addFeeling?: any;
    removeFeeling?: any;
    loggedUser?: any;
    profilePage?: boolean;
    handleAsceanCreate?: any;
}

const CommunityAscean = ({ ascean, setAscean, userProfile, communityFeed, addFeeling, loggedUser, removeFeeling, profilePage, handleAsceanCreate }: Props) => {

  return (
    <Col className="stat-block wide" style={{ maxWidth: 24 + '%' }}>
        <>
        <hr className="orange-border" />
        <div className="creature-heading">
        <Link to={`/CommunityFeed/${ascean._id}`} style={{ textDecoration: 'none' }}><h1>{ascean.name}</h1></Link>
        <h2>{ascean.description}</h2>
        </div>
        <svg height="5" width="100%" className="tapered-rule mt-3">
            <polyline points="0,0 600,2.5 0,5"></polyline>
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
        />
        <svg height="5" width="100%" className="tapered-rule">
            <polyline points="0,0 600,2.5 0,5"></polyline>
        </svg>
        <div className="top-stats">
        <AsceanAttributeCompiler communityFeed={communityFeed} communityFocus={false} ascean={ascean} key={ascean._id} />
        <AsceanStatCompiler communityFeed={true} communityFocus={false} ascean={ascean} key={ascean._id} />
        {/* <svg height="5" width="100%" className="tapered-rule mt-3">
            <polyline points="0,0 600,2.5 0,5"></polyline>
        </svg> */}
        <div className="actions"><h3> </h3></div>
        </div>
        <hr className='orange-border bottom' />
        </>
    </Col>
  )
}

export default CommunityAscean