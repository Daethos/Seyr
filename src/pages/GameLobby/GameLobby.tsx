import { useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi';
import Container from 'react-bootstrap/Container'
import SideDrawer from '../../components/Chat/SideDrawer';
import MyChats from '../../components/Chat/MyChats';
import ChatBox from '../../components/Chat/ChatBox';
import userService from "../../utils/userService";
import Notifications from '../../components/Chat/Notifications';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

interface Props {
    user: any;
}

const GameLobby = ({ user }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [asceanVaEsai, setAsceanVaEsai] = useState<any>([])
    const [username, setUsername] = useState<any>({})
    const [ascean, setAscean] = useState<any>({})
    const [room, setRoom] = useState<any>("")
    const [showChat, setShowChat] = useState<boolean>(false)
    const [fetchAgain, setFetchAgain] = useState<boolean>(false)
    const [notification, setNotification] = useState<any>([])
    const [searchResult, setSearchResult] = useState([])
    const [selectedChat, setSelectedChat] = useState<any>([])
    const [loadingChat, setLoadingChat] = useState(false)
    const [chats, setChats] = useState<any>([])
    const [error, setError] = useState([])

    useEffect(() => {
        getUserAscean();
    }, [])

    useEffect(() => {
        const findAscean = asceanVaEsai.filter(
            (ascean: { _id: any }) => ascean._id === username
        );
        const response = findAscean
        console.log(response[0], 'Response in Filtering Ascean')
        setAscean(response[0])
    }, [username])

    const getUserAscean = async () => {
        try {
            const response = await asceanAPI.getAllAscean();
            console.log(response.data, 'User Ascean in Game Lobby')
            setAsceanVaEsai([...response.data.reverse()])
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            console.log(err.message, 'Error Retrieving User Ascean')
        }
    }

    const handleSearch = async (search: string) => {
        if (!search) return
        try {
            setLoading(true)
            const response = await userService.searchUser(search);
            console.log(response)

            setLoading(false)
            setSearchResult(response)
        } catch (err: any) {
            console.log(err.message, 'Error Searching for Users')
        }
    }

    function handleAscean(e: any) {
        console.log(e.target.value, 'What do we have here?')
        setUsername(e.target.value)
    }

    return (
        <Container className="Game-Lobby-Chat">
            <Tabs defaultActiveKey="Chat Groups" id="justify-tab-example" className="mb-3" justify >
            <Tab eventKey="home"
            title={<SideDrawer setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} notification={notification} setNotification={setNotification} loading={loading} handleSearch={handleSearch} searchResult={searchResult} />}>
            </Tab>
            <Tab eventKey="longer-tab" 
            title={<Notifications user={user} notification={notification} setNotification={setNotification} setSelectedChat={setSelectedChat} />}>
            </Tab>
            </Tabs>
            { selectedChat?._id 
                ? <ChatBox user={user} selectedChat={selectedChat} setSelectedChat={setSelectedChat} notification={notification} setNotification={setNotification} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                : <MyChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} chats={chats} setChats={setChats} fetchAgain={fetchAgain} error={error} setError={setError} />
            }
                

            {/* { !showChat 
            ? 
            <>
            <select value={username} onChange={handleAscean}>
                <option>Ascean</option>
                {asceanVaEsai.map((ascean: any, index: number) => {
                    return (
                        <option value={ascean._id} key={index}>{ascean.name}</option>
                    )
                })}
            </select>

            <input className='my-1' type='text' placeholder='Room ID...' onChange={handleRoom} />
            <button onClick={joinRoom}> Join Room </button>
            </>
            : 
            <GameChat user={user} ascean={ascean} room={room} socket={socket} />
            } */}
        </Container>
  )
}

export default GameLobby