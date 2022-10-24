import React, { useEffect, useState, useRef } from 'react'
import './Messages.css'
import { Col } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import * as messageAPI from '../../utils/messageApi'
import Direct from './Direct';
import MessagesCard from './MessagesCard';
import FormMessage from '../../components/Messages/FormMessage';

interface Props {
    user: any;
    userMessages: any;
    friend: any
    friendMessages: any;
    friendID: any;
    handleChange: any;
    handleSubmit: any;
}

const Messages = ({ user, userMessages, friend, friendMessages, friendID, handleChange, handleSubmit }: Props) => {
    const [friendsMessages, setFriendsMessages] = useState<any>([])
    const [usersMessages, setUsersMessages] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [messaging, setMessaging] = useState<boolean>(false)
    const [DMstate, setDMstate] = useState<any>([])
    const [sortedDMs, setSortedDMs] = useState<any>([])
    const [messageDraft, setMessageDraft] = useState({
        message: ''
      })

    const bottomRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [sortedDMs]);

    const cleanFriendMessages = async () => userMessages.filter((message: any, index: number) => message.username === friend.username)

    const cleanUserMessages = async () => friendMessages.filter((message: any, index: number) => message.username === user.username)

    async function getDMs() {
        //setLoading(true)
        try {
            const response = await cleanFriendMessages()
            const data = await cleanUserMessages()
            console.log(response, '<- Response getting DMs')
            console.log(data, '<- Data getting DMs')
            setFriendsMessages(response)
            setUsersMessages(data)
            setDMstate([...response,
                ...data])
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error getting DMs')
        }
    }

    useEffect(() => {getDMs()}, [])

    useEffect(() => {
        sortDMs()
      }, [getDMs])

      async function updateMessages() {
        //setLoading(true);
        try {
          const response = await messageAPI.getPersonalMessages(user._id, friendID)
          console.log(response, '<- Response Updating Messages')
          setUsersMessages(response.data.user.messages)
          setFriendsMessages(response.data.friend.messages)
          setLoading(false)
        } catch (err: any) {
          setLoading(false)
          console.log(err.message, '<- Error Retrieving Messages')
        }
      }
      
  
    const sortingFunction = async () => DMstate?.sort((a: any, b: any) => {
        if  (a.createdAt > b.createdAt) {
            return 1
        }
        if (a.createdAt < b.createdAt) {
            return -1
        }
        return 0
    })

    async function sortDMs() {
        //setLoading(true)
        try {
            const response = await sortingFunction()
            console.log(response, '<- Response sorting DMs in Starter')
            setDMstate(response)
            setSortedDMs(response)
        } catch (err: any) {
            console.log(err.message, '<- Error sorting DMs')
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
    //message.createdAt.substring(5, 10) + ' ' + 
    //message.createdAt.substring(5, 10) + ' ' + 
  return (
    <Col className="stat-block wide" id="message-card" style={{ overflowX: 'auto' }}>
        <div className="property-line">
            <h4>
                {
                    sortedDMs
                    ? 
                        sortedDMs.map((message: any, index: number) => {
                            console.log(message, '<- The final, proper message!')
                            return (
                                <>
                                    <div className="section-left">
                                    {
                                        message.username === friend.username
                                        ? <span className="friend-message my-2">[{message.createdAt.substring(11, 16)}] {message.message}</span>
                                        : ''
                                    }
                                    </div>
                                    <div className="section-right">
                                    {
                                        message.username === user.username
                                        ? <span className="user-message my-2">[{message.createdAt.substring(11, 16)}] {message.message}</span>
                                        : ''
                                    }
                                    </div>
                                    {/* <div className="actions"><h3> </h3></div>
                                        <span className="user-pic" style={{ float: 'left' }}><button onClick={() => updateMessages()} style={{ fontSize: 25 + 'px' }} className='btn btn-lg'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-recycle" viewBox="0 0 16 16">
                                        <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                                        </svg></button></span>
                                        <span className="user-pic" style={{ float: 'right' }}><img src={user.photoUrl} id='nav-pic' /></span>
                                        
                                    <FormMessage user={user} friendProfile={friend} messageDraft={messageDraft} friendID={friendID} handleChange={handleChange} handleSubmit={handleSubmit} /> */}
                                </>
                            )
                        })
                    : ''
                }
                {/* {
                    friendsMessages
                    ? <Direct user={user} frenDMs={friendsMessages} friend={friend} usersMessages={usersMessages} key={friend._id} />
                    : <>{friend.username} has never messaged you.</>
                } */}
                
            </h4>
        </div>
        <div ref={bottomRef} />
    </Col>
  )
}

export default Messages