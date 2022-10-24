import React, { useEffect, useState } from 'react'
import './Messages.css'
import { Col } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import Direct from './Direct';
import MessagesCard from './MessagesCard';

interface Props {
    user: any;
    userMessages: any;
    friend: any
    friendMessages: any;
}

const Messages = ({ user, userMessages, friend, friendMessages }: Props) => {
    const [friendsMessages, setFriendsMessages] = useState<any>([])
    const [usersMessages, setUsersMessages] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [DMstate, setDMstate] = useState<any>([])
    const [sortedDMs, setSortedDMs] = useState<any>([])
    
    const cleanFriendMessages = async () => userMessages.filter((message: any, index: number) => message.username === friend.username)

    const cleanUserMessages = async () => friendMessages.filter((message: any, index: number) => message.username === user.username)

    async function getDMs() {
        setLoading(true)
        try {
            const response = await cleanFriendMessages()
            const data = await cleanUserMessages()
            console.log(response, '<- Response getting DMs')
            console.log(data, '<- Data getting DMs')
            setFriendsMessages(response)
            setUsersMessages(data)
            setDMstate([...response,
                ...data])
        } catch (err: any) {
            console.log(err.message, '<- Error getting DMs')
        }
    }

    useEffect(() => {getDMs()}, [])

    useEffect(() => {
        sortDMs()
      }, [getDMs])
      
  
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
        setLoading(true)
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
        <Loading />
    }
    //message.createdAt.substring(5, 10) + ' ' + 
    //message.createdAt.substring(5, 10) + ' ' + 
  return (
    <Col className="stat-block wide" id="message-card">
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
    </Col>
  )
}

export default Messages