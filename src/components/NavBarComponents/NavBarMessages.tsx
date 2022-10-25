import React, { useEffect, useState } from 'react';
import * as friendAPI from '../../utils/friendApi';
import Loading from '../Loading/Loading';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FriendsList from '../FriendsList/FriendsList';

interface Props {
    user: any;
    relayStatus: boolean;
    setRelayStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBarMessages = ({ user, relayStatus, setRelayStatus }: Props) => {
    const [friendMessenger, setFriendMessenger] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        friends();
      }, [])
    
    async function friends() {
        setLoading(true);
        try {
            const response = await friendAPI.getAllFriends(user._id)
            setFriendMessenger(response.data.user.friends)
            setRelayStatus(false);
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error Fetch Friends in Friend Card')
        }
    }
    
    if (loading) {
        return (
            <>
                <Loading NavBar={true} />
            </>
        );
    }

    if (relayStatus) {
        friends();
    }

    return (
        <>
        <Nav.Link className="text-info btn btn-lg btn-outline-black link-header">
            <button onClick={handleShow} className="text-info btn btn-lg btn-outline-black link-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            </svg>
            </button>

        <Offcanvas show={show} onHide={handleClose} id="offcanvas">
            <Offcanvas.Header closeVariant='white' closeButton>
            <Offcanvas.Title className='text-white'>Direct Messages</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            {
            friendMessenger
            ?
            friendMessenger.map((friend: any, index: number) => {
                return (
                    <FriendsList user={user} friend={friend} handleClose={handleClose} key={index} />
                )
            })
            : ''
            }
            </Offcanvas.Body>
        </Offcanvas>
        </Nav.Link>
        </>
    )
}

export default NavBarMessages