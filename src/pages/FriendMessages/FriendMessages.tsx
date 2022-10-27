import { useEffect, useState } from 'react';
import './FriendMessages.css'
import * as friendAPI from '../../utils/friendApi';
import Loading from '../../components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import FriendsList from '../../components/FriendsList/FriendsList';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

interface Props {
    user: any;
}

const FriendMessages = ({ user }: Props) => {
    const [friendState, setFriendState] = useState<any[]>([])
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
        setFriendState(response.data.user.friends)
        setLoading(false)
    } catch (err: any) {
        setLoading(false)
        console.log(err.message, '<- Error Fetch Friends in Friend Card')
    }
    }
    if (loading) {
    return (
    <>
        <Loading />
    </>
    );
    }
  return (
    <Container fluid>
        <Button variant="outline-info" onClick={handleShow}>
            Messages
        </Button>

        <Offcanvas show={show} onHide={handleClose} id="offcanvas">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title className='text-white'>Direct Messages</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            {
            friendState
            ?
            friendState.map((friend: any, index: number) => {
                console.log(friend, index)
                return (
                    <FriendsList user={user} handleClose={handleClose} friend={friend} key={index} />
                )
            })
            : ''
            }
            </Offcanvas.Body>
        </Offcanvas>
        
    </Container>
  )
}

export default FriendMessages