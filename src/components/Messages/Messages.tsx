import { useEffect, useState, useRef } from 'react'
import './Messages.css'
import Col from 'react-bootstrap/Col';
import Loading from '../Loading/Loading';
import * as messageAPI from '../../utils/messageApi'
import FormMessage from '../../components/Messages/FormMessage';
import UserMessageCard from './UserMessageCard';
import FriendMessageCard from './FriendMessageCard';
import NewLine from './NewLine';

interface Props {
    user: any;
    userMessages: any;
    friend: any
    friendMessages: any;
    friendID: any;
}

const Messages = ({ user, userMessages, friend, friendMessages, friendID }: Props) => {
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
            //setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, '<- Error getting DMs')
        }
    }

    useEffect(() => {getDMs()}, [])

    useEffect(() => {
        sortDMs()
      }, [getDMs])

      async function updateDMs() {
        //setLoading(true);
        try {
          const response = await messageAPI.getPersonalMessages(user._id, friendID)
          console.log(response, '<- Response Updating Messages')
          setUsersMessages(response.data.user.messages)
          setFriendsMessages(response.data.friend.messages)
          setDMstate([...response.data.user.messages,
            ...response.data.friend.messages])
          //setLoading(false)
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

    useEffect(() => {
        sortUpdatedDMs()
      }, [updateDMs])

    async function sortUpdatedDMs() {
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

    useEffect(() => {
        const interval = setInterval(() => {
            updateDMs()
        }, 10000);
        return () => clearInterval(interval);
      }, []);
    
      function handleChange(e: { target: { name: any; value: any; }; }) {
        console.log('Name:', e.target.name, 'Value:', e.target.value)
        setMessageDraft({
            ...messageDraft,
            [e.target.name]: e.target.value,
        })
    }
    
    async function handleSubmit(e: any) {
      e.preventDefault(); // this stop the browser from submitting the form!
      console.log(messageDraft, '<- New Message Being Created!')
      setLoading(true)
      try {
        const response = await messageAPI.createMessage(user._id, friend._id, messageDraft);
        console.log(response, '<- Response creating message')
        setMessaging(true)
        setMessageDraft({message: ''})
        setLoading(false)
      } catch (err: any) {
        setLoading(false)
        console.log(err.message, '<- Error Creating Message');
      }
    }

    if (loading) {
        return (
        <>
            <Loading Chat={true} />
        </>
        );
    }
    if (messaging) {
        updateDMs()
        setMessaging(false)
      }
  return (
    <>
    <Col className="stat-block wide" id="message-card" style={{ overflowX: 'auto' }}>
        <div className="property-line">
            <h4 className="texts">
                {
                    sortedDMs
                    ? 
                        sortedDMs.map((message: any, index: number) => {
                            return (
                                <>
                                    {/* <div className="section-left">  */}

                                    <FriendMessageCard friend={friend} message={message} key={index} />
                                    <NewLine spaceCount={1} />

                                    {/* </div> */}

                                    {/* <div className="section-right"> */}

                                    <UserMessageCard user={user} message={message} key={index} />
                                    <NewLine spaceCount={1} />

                                    {/* </div> */}
                                </>
                            )
                        })
                    : ''
                }
                
            </h4>
        </div>
        <div ref={bottomRef} />
    </Col>
        <FormMessage user={user} friendProfile={friend} messageDraft={messageDraft} friendID={friendID} handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  )
}

export default Messages