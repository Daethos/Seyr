import { useState } from 'react';
import './RequestsCarousel.css';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Loading from '../Loading/Loading';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface Props {
    loggedUser: any;
    acceptFriendRequest: (friend: object) => Promise<void>;
    declineFriendRequest: (friend: any) => Promise<void>;
    request: any;
};

const RequestsCard = ({ loggedUser, acceptFriendRequest, declineFriendRequest, request }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        async function asceanVaEsai() {
            try {
                acceptFriendRequest(request);
            } catch (err: any) {
                console.log(err.message, '<- Error initiating Ascean Edit');
            };
        };
        asceanVaEsai();
    };


    if (loading) {
        return (
            <Loading NavBar={true} />
        );
    };

    return (
        <>
        <Col className="stat-block wide d-block w-100 my-1" id="request-banner">
            <Link to={`/${request?.userId?.username}`} ><img src={request.userId.photoUrl} alt={request.userId.username} id="request-pic" className=''/></Link>
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
    );
};

export default RequestsCard;