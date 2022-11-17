import { RefAttributes, useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi';
import * as chatAPI from '../../utils/chatApi'
import * as chatLogic from '../../config/chatLogics'
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import * as io from 'socket.io-client'
import GameChat from '../../components/GameCompiler/GameChat';
import { ChatState } from '../../context/ChatProvider'
import SideDrawer from '../../components/Chat/SideDrawer';
import MyChats from '../../components/Chat/MyChats';
import ChatBox from '../../components/Chat/ChatBox';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';
import userService from "../../utils/userService";
import UserListItem from '../../components/Chat/UserListItem';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Toast from 'react-bootstrap/Toast';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { PopoverHeader } from 'react-bootstrap';
import Notifications from '../../components/Chat/Notifications';

let socket: any;
let selectedChatCompare;

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
    const [selectedChat, setSelectedChat] = useState([])
    const [loadingChat, setLoadingChat] = useState(false)
    const [chats, setChats] = useState<any>([])


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

    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
        <Tooltip id="button-tooltip" {...props}>
          Create or Find Current Group
        </Tooltip>
      );

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

    // const joinRoom = () => {
    //     if (username !== '' && room !== '') {
    //         console.log(`Connecting to Room: ${room}`)
    //         // console.log(socket.io)
    //         socket.emit("join_room", room)
    //         socket.on("join_room", () => {
    //             console.log('Socket working on the Front-End inside room: ' + room)
    //         })
    //         setShowChat(true)
    //     }
    // }

    // function handleRoom(e: any) {
    //     console.log(e.target.value)
    //     setRoom(e.target.value)
    // }

    function handleAscean(e: any) {
        console.log(e.target.value, 'What do we have here?')
        setUsername(e.target.value)
    }

    

    // if (loading) {
    //     return (
    //         <Loading Combat={true} />
    //     )
    // }
    return (
        <Container className="Game-Lobby-Chat">
            <SideDrawer setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} notification={notification} setNotification={setNotification} loading={loading} handleSearch={handleSearch} searchResult={searchResult} />
                
            <Notifications user={user} notification={notification} setNotification={setNotification} setSelectedChat={setSelectedChat} />

            <MyChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} chats={chats} setChats={setChats} fetchAgain={fetchAgain} />
            <ChatBox user={user} selectedChat={selectedChat} setSelectedChat={setSelectedChat} notification={notification} setNotification={setNotification} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />

            




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