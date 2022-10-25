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
        setRelayStatus(false);
    }
    return (
        <>
        <Nav.Link className="text-info btn btn-lg btn-outline-black link-header">
            <button onClick={handleShow} className="text-info btn btn-lg btn-outline-black link-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
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