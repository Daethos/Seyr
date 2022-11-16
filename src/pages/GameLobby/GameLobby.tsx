import { RefAttributes, useEffect, useState } from 'react'
import * as asceanAPI from '../../utils/asceanApi';
import * as chatAPI from '../../utils/chatApi'
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import * as io from 'socket.io-client'
import GameChat from '../../components/GameCompiler/GameChat';
import { ChatState } from '../../context/ChatProvider'
import SideDrawer from '../../components/Chat/SideDrawer';
import MyChats from '../../components/Chat/MyChats';
import ChatBox from '../../components/Chat/ChatBox';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';
import userService from "../../utils/userService";
import UserListItem from '../../components/Chat/UserListItem';
import Offcanvas from 'react-bootstrap/Offcanvas';

let socket: any;
// const socket: any = io.connect("http://localhost:3001")
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
    const [socketConnected, setSocketConnected] = useState<boolean>(false)

    // const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [selectedChat, setSelectedChat] = useState([])
    const [loadingChat, setLoadingChat] = useState(false)
    const [chats, setChats] = useState<any>([])
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    useEffect(() => {
        socket = io.connect("http://localhost:3001")
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnected(true))
    }, [])

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
        if (!search) {
            return
        }
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

    // const accessChat = async (userId: string) => {

    //     try {
    //         setLoadingChat(true)
    //         const response = await chatAPI.accessChat(userId)
    //         console.log(response, 'Response Accessing or Creating Chat')
    //         if (!chats.find((c: { _id: any; }) => c._id === response._id)) setChats([response.data, ...chats])

    //         console.log(response.data, 'Response in Accessing Chat')
    //         setSelectedChat(response.data)
    //         setLoadingChat(false)
    //     } catch (err: any) {
    //         console.log(err.message, 'Error Accessing Chat')
    //     }
    // }

    const joinRoom = () => {
        if (username !== '' && room !== '') {
            console.log(`Connecting to Room: ${room}`)
            // console.log(socket.io)
            socket.emit("join_room", room)
            socket.on("join_room", () => {
                console.log('Socket working on the Front-End inside room: ' + room)
            })
            setShowChat(true)
        }
    }

    function handleRoom(e: any) {
        console.log(e.target.value)
        setRoom(e.target.value)
    }

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
            <SideDrawer setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} loading={loading} handleSearch={handleSearch} searchResult={searchResult} />
            <MyChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} chats={chats} setChats={setChats} />
            <ChatBox user={user} selectedChat={selectedChat} />
            




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