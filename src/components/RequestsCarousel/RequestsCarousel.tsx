import React, { useEffect, useState } from 'react';
import './RequestsCarousel.css'
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
    // handleSubmit: any;
}

const RequestsCard = ({ loggedUser, acceptFriendRequest, declineFriendRequest, request }: Props) => {
    //console.log(request, '<- REquest?')
    const [loading, setLoading] = useState<boolean>(false)

    // const [requestState, setRequestState] = useState<any>(request)
    
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log('')
        async function asceanVaEsai() {
            try {
                acceptFriendRequest(request)
            } catch (err: any) {
                console.log(err.message, '<- Error initiating Ascean Edit')
            }
        }
        asceanVaEsai();
    }


    if (loading) {
        return (
        <>
            <Loading NavBar={true} />
        </>
        );
      }

    return (
        <>
        
        <Col className="stat-block wide d-block w-100 my-1" id="request-banner">
        {/* <span id='banner-request-pic'> */}
            <Link to={`/${request?.userId?.username}`} ><img src={request.userId.photoUrl} alt={request.userId.username} id="request-pic" className=''/></Link>
        {/* </span> */}
            {/* <h1 className='text-warning' style={{ fontSize: '', color: '' }} id='ascean-name'>{request.username}</h1>
            <h2 className="text-white" id="ascean-bio">{request.userId.bio}</h2> */}
        <span id='banner-request-accept'>
        <Form onSubmit={handleSubmit}>
            <Button variant="" className="btn btn-outline req-button" style={{ fontWeight: 600, color: 'green', textDecoration: 'none', fontSize: 20 + 'px' }} value={request} type="submit" onClick={acceptFriendRequest}>Accept</Button>
        </Form>
        </span>
        
        <span id='banner-request-decline'>
            <Button variant="" className="btn btn-outline req-button" style={{ fontWeight: 600, color: 'red', textDecoration: 'none', fontSize: 20 + 'px' }} value={request._id} type="submit" onClick={declineFriendRequest}>Decline</Button>
        </span>
        </Col>
        </>
    )
}

export default RequestsCard