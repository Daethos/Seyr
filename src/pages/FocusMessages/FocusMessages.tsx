import React, { useEffect, useState, useCallback } from 'react'
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
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      console.log(err.message, '<- Error Retrieving Messages')
    }
  }

  function handleChange(e: { target: { name: any; value: any; }; }) {
    console.log('Name:', e.target.name, 'Value:', e.target.value)
    setMessageDraft({
        ...messageDraft,
        [e.target.name]: e.target.value,
    })
}

async function handleSubmit(e: { preventDefault: () => void; }) {
  e.preventDefault(); // this stop the browser from submitting the form!
  console.log(messageDraft, '<- New Message Being Created!')
  setLoading(true)
  try {
    const response = await messageAPI.createMessage(user._id, friendProfile._id, messageDraft);
    console.log(response, '<- Response creating message')
    // setUserMessages([response.data.user.messages, ...userMessages])
    // setFriendMessages([response.data.friend.messages, ...friendMessages])
    // await updateMessages()
    setLoading(false)
    setMessaging(true)
  } catch (err: any) {
    setLoading(false)
    console.log(err.message, '<- Error Creating Message');
  }
}

  if (loading) {
      return (
      <>
          <Loading />
      </>
      );
  }

  if (messaging) {
    updateMessages()
    setMessaging(false)
  }
  return (
    <Container fluid>
      

        {/* {
          messages.length > 0
          ? ''
          : <Row className='justify-content-center my-5'><Col className='text-white'>'No Messages Yet!'</Col></Row>
        } */}
        <Row className='justify-content-center my-5'>
        <Col className="stat-block wide" style={{ overflowX: 'auto' }}>
        <>
        <hr className="orange-border" />
        <div className="creature-heading">
        <span id='nav-pic' style={{ float: 'left' }}>
            <Link to={`/${friendProfile.username}`} style={{ textDecoration: 'none' }}><img src={friendProfile.photoUrl} alt="" id="nav-pic" className=''/></Link>
        </span>
        <h1>{friendProfile.username}</h1>
        <h2>{friendProfile.bio}</h2>
        </div>
        <Messages user={user} userMessages={userMessages} friendMessages={friendMessages} friend={friendProfile} />

        <div className="actions"><h3> </h3></div>
        <span className="user-pic" style={{ float: 'left' }}><button onClick={() => updateMessages()} style={{ fontSize: 25 + 'px' }} className='btn btn-lg'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-recycle" viewBox="0 0 16 16">
          <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
        </svg></button></span>
        <span className="user-pic" style={{ float: 'right' }}><img src={user.photoUrl} id='nav-pic' /></span>
        </>
    </Col>
        </Row>
    <Row className='justify-content-center my-5'>

    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          className='stat-block wide'
          name='message'
          placeholder='What is on your mind?'
          aria-label="Large"
          value={messageDraft.message}
          onChange={handleChange}
        />
      </InputGroup>
    </Form>
    </Row>
    </Container>
  )
}

export default FocusMessages