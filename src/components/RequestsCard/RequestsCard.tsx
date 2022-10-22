import React, { useEffect, useState } from 'react';
import './RequestsCard.css'
import * as friendAPI from '../../utils/friendApi';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Loading from '../Loading/Loading'
import RequestPopover from '../RequestPopover/RequestPopover';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

interface Props {
    loggedUser: any;
    acceptFriendRequest: (friend: object) => Promise<void>;
    declineFriendRequest: (friend: any) => Promise<void>;
    request: any;
}

const RequestsCard = ({ loggedUser, acceptFriendRequest, declineFriendRequest, request }: Props) => {
    //console.log(request, '<- REquest?')
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)

    const [requestState, setRequestState] = useState<any>(request)
    
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log('Editing underway!')
        async function asceanVaEsai() {
            try {
                acceptFriendRequest(requestState)
            } catch (err: any) {
                console.log(err.message, '<- Error initiating Ascean Edit')
            }
        }
        asceanVaEsai();
    }

    const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
        setIndex(selectedIndex);
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <>
        <Carousel activeIndex={index} onSelect={handleSelect} className="" indicators={false}>
        <Col className="stat-block wide my-1" id="ascean-banner">
        
            
        
        <div className="creature-heading" id='banner-ascean-pic'>
        <span id='banner-request-pic'>
            <Link to={`/${request?.userId?.username}`} ><img src={request.userId.photoUrl} alt="" id="request-pic" className='my-1'/></Link>
        </span>
            {/* <h1 className='text-warning' style={{ fontSize: '', color: '' }} id='ascean-name'>{request.username}</h1>
            <h2 className="text-white" id="ascean-bio">{request.userId.bio}</h2> */}
        <span id='banner-request-accept'>
        <Form onSubmit={handleSubmit}>
            <Button variant="outline-success" size="lg" style={{ textDecoration: 'none' }} className="" value={requestState} type="submit" onClick={acceptFriendRequest}>Accept</Button>
        </Form>
        </span>
        
        <span id='banner-request-decline'>
            <Button variant="outline-warning" size="lg" value={request._id} type="submit" onClick={declineFriendRequest}>Decline</Button>
        </span>
        </div>
                
        </Col>
        </Carousel>
        </>
    )
}

export default RequestsCard