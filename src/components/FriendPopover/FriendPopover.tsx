import React, { useEffect, useState } from 'react'
import './FriendPopover.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as friendAPI from '../../utils/friendApi'

interface Props {
    friend: any;
    loggedUser: any
    sendFriendRequest: any;
    declineFriendRequest: any;
}

const FriendPopover = ({ friend, loggedUser, sendFriendRequest, declineFriendRequest }: Props) => {
    const [friendRequest, setFriendRequest] = useState<boolean>(false)
    const [friendDecline, setFriendDecline] = useState<boolean>(false)


    const friendPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2"><Link to={'/' + friend?.username}>{friend!.username}</Link> <span id="popover-image"><img src={friend.userId.photoUrl} id="fren-pic" alt={friend.username}  /></span></Popover.Header>
            <Popover.Body id="popover-body" className="popover-body">
                <Button variant="success" value={friend} onClick={sendFriendRequest}>Accept</Button> <br /><br />
                <Button variant="danger" value={friend._id} onClick={declineFriendRequest}>Decline</Button>
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