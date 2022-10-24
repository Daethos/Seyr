import React, { useEffect, useState, useCallback } from 'react'
import './FocusMessages.css'
import * as messageAPI from '../../utils/messageApi'
import Loading from '../../components/Loading/Loading'; 
import * as friendAPI from '../../utils/friendApi' 
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Messages from '../../components/Messages/Messages';
import FormMessage from '../../components/Messages/FormMessage';

interface Props {
  user: any;
}

const FocusMessages = ({ user }: Props) => {
  const [loading, setLoading] = useState(true);
  const [messaging, setMessaging] = useState<boolean>(false)
  const [friendProfile, setFriendProfile] = useState<any>([])
  const [userMessages, setUserMessages] = useState<any>([])
  const [friendMessages, setFriendMessages] = useState<any>([])
  const [messageDraft, setMessageDraft] = useState({
    message: ''
  })
  const { friendID } = useParams();
  const button = document.getElementById('chat-input');
  button?.addEventListener('click', function handleClick(e) {
    e.preventDefault();

  })

  const getFriend = useCallback(async () => {
    setLoading(true);
        try {
            const response = await friendAPI.getOneFriend(friendID);
            console.log(response, ' <- the response in getting one friend')
            setFriendProfile(response.data.user)
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message);
        }
   }, [friendID])

  useEffect(() => {
      getFriend()
  }, [friendID, getFriend])

  const getMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await messageAPI.getPersonalMessages(user._id, friendID)
      console.log(response, '<- Response Retrieving Messages')
      setUserMessages(response.data.user.messages)
      setFriendMessages(response.data.friend.messages)
    } catch (err: any) {
      setLoading(false)
      console.log(err.message, '<- Error Retrieving Messages')
    }
  }, [friendID])

  useEffect(() => {getMessages()}, [friendID, getMessages])

  async function updateMessages() {
    setLoading(true);
    try {
      const response = await messageAPI.getPersonalMessages(user._id, friendID)
      console.log(response, '<- Response Updating Messages')
      setUserMessages(response.data.user.messages)
      setFriendMessages(response.data.friend.messages)
      //setLoading(false)
    } catch (err: any) {
      setLoading(false)
      console.log(err.message, '<- Error Retrieving Messages')
    }
  }

  if (loading) {
      return (
      <>
          <Loading Messages={true} />
      </>
      );
  }

  if (messaging) {
    updateMessages()
    setMessaging(false)
  }
  return (
    <Container fluid>
        <Row className='justify-content-center mt-3'>
        <Col className="stat-block wide" id="message-block">
        <>
        <hr className="orange-border" />
        <div className="creature-heading">
        <span id='nav-pic' style={{ float: 'left' }}>
            <Link to={`/${friendProfile.username}`} style={{ textDecoration: 'none' }}><img src={friendProfile.photoUrl} alt="" id="chat-pic" className=''/></Link>
        </span>
        <span className="user-pic" style={{ float: 'right' }}><img src={user.photoUrl} id='chat-pic' /></span>
        <h1>{friendProfile.username}</h1>
        <h2>{friendProfile.bio}</h2>
        
        </div>
        <Messages user={user} userMessages={userMessages} friendMessages={friendMessages} friendID={friendID} friend={friendProfile} />

        </>
    </Col>
        </Row>
    </Container>
  )
}

export default FocusMessages