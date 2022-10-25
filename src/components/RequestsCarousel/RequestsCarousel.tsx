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
    handleSubmit: any;
}

const RequestsCard = ({ loggedUser, acceptFriendRequest, declineFriendRequest, request, handleSubmit }: Props) => {
    //console.log(request, '<- REquest?')
    const [loading, setLoading] = useState<boolean>(false)

    const [requestState, setRequestState] = useState<any>(request)
    
    


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
            <Button variant="" style={{ fontWeight: 600, color: 'green', textDecoration: 'none', fontSize: 20 + 'px' }} className="btn btn-outline" value={requestState} type="submit" onClick={acceptFriendRequest}>Accept</Button>
        </Form>
        </span>
        
        <span id='banner-request-decline'>
            <Button variant="" className="btn btn-outline" style={{ fontWeight: 600, color: 'black', textDecoration: 'none', fontSize: 20 + 'px' }} value={request._id} type="submit" onClick={declineFriendRequest}>Decline</Button>
        </span>
        </Col>
        </>
    )
}

export default RequestsCard