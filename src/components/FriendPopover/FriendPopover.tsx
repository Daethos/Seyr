import React, { useEffect, useState } from 'react'
import './FriendPopover.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form'
import * as friendAPI from '../../utils/friendApi'

interface Props {
    friend: any;
    loggedUser: any
    acceptFriendRequest: any;
    declineFriendRequest: any;
}

const FriendPopover = ({ friend, loggedUser, acceptFriendRequest, declineFriendRequest }: Props) => {
    const [friendRequest, setFriendRequest] = useState<boolean>(false)
    const [friendDecline, setFriendDecline] = useState<boolean>(false)
    const [friendState, setFriendState] = useState<any>(friend)
    console.log(friendState, '<- Friend in Friend Popover')
    const friendArray = {...friend.userId.friends}
    
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log('Editing underway!')
        async function asceanVaEsai() {
            try {
                acceptFriendRequest(friendState)
            } catch (err: any) {
                console.log(err.message, '<- Error initiating Ascean Edit')
            }
        }
        asceanVaEsai();
        //getAscean();
    }

    const friendPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2"><Link to={'/' + friend?.username} style={{ textDecoration: 'none' }}>{friend!.username}</Link> <span id="popover-image"><img src={friend.userId.photoUrl} id="fren-pic" alt={friend.username}  /></span></Popover.Header>
            <Popover.Body id="popover-body" className="popover-body">
                <Form onSubmit={handleSubmit}>
                <Button variant="success" value={friendState} type="submit" onClick={acceptFriendRequest}>Accept</Button> <br /><br />
                </Form>
                <Button variant="danger" value={friend._id} type="submit" onClick={declineFriendRequest}>Decline</Button>
            </Popover.Body>
        </Popover>
    )
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={friendPopover}>
        <Button variant="outline-danger"  className="m-3 p-4 friend-popover">{friend?.username.charAt(0).toUpperCase() + friend?.username.slice(1)}</Button>
    </OverlayTrigger>
  )
}

export default FriendPopover