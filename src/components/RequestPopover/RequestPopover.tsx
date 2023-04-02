import { useState } from 'react';
import './RequestPopover.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';

interface Props {
    friend: any;
    loggedUser: any
    acceptFriendRequest: (friend: object) => Promise<void>;
    declineFriendRequest: (friend: any) => Promise<void>;
};

const RequestPopover = ({ friend, loggedUser, acceptFriendRequest, declineFriendRequest }: Props) => {
    const [requestState, setRequestState] = useState<any>(friend);
    
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        async function asceanVaEsai() {
            try {
                acceptFriendRequest(requestState);
            } catch (err: any) {
                console.log(err.message, '<- Error initiating Ascean Edit');
            };
        };
        asceanVaEsai();
    };

    const friendPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2"><Link to={'/' + friend?.username} style={{ textDecoration: 'none' }}>{friend!.username}</Link> <span id="popover-image"><img src={friend.userId.photoUrl} id="fren-pic" alt={friend.username}  /></span></Popover.Header>
            <Popover.Body id="popover-body" className="popover-body">
                <Form onSubmit={handleSubmit}>
                <Button variant="success" value={requestState} type="submit" onClick={acceptFriendRequest}>Accept</Button> <br /><br />
                </Form>
                <Button variant="danger" value={friend._id} type="submit" onClick={declineFriendRequest}>Decline</Button>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={friendPopover}>
            <Button variant="outline-danger"  className="m-3 p-4 friend-popover">{friend?.username.charAt(0).toUpperCase() + friend?.username.slice(1)}</Button>
        </OverlayTrigger>
    );
};

export default RequestPopover;