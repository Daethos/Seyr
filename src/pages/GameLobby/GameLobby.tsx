import { useEffect, useState } from 'react'
import * as io from 'socket.io-client'
import Container from 'react-bootstrap/Container'
import SideDrawer from '../../components/Chat/SideDrawer';
import MyChats from '../../components/Chat/MyChats';
import ChatBox from '../../components/Chat/ChatBox';
import userService from "../../utils/userService";
import Notifications from '../../components/Chat/Notifications';
import * as chatAPI from '../../utils/chatMessageApi';
import { SOCKET } from '../../game/sagas/socketSaga';

let socket: any;
interface Props {
    user: any;
};

const GameLobby = ({ user }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);
    const [notification, setNotification] = useState<any>([]);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedChat, setSelectedChat] = useState<any>([]);
    const [chats, setChats] = useState<any>([]);
    const [socketConnected, setSocketConnected] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    useEffect(() => {
        socket = io.connect(SOCKET.URL, { transports: ['websocket'], reconnection: true, reconnectionDelay: 500, reconnectionAttempts: Infinity }); // 'https://ascea.herokuapp.com' || 'http://localhost:3001'
        socket.emit("setup", user);
        socket.on("Connected", () => setSocketConnected(true));

        socket.on('typing', () => setIsTyping(true));
        socket.on('stop_typing', () => setIsTyping(false));
        socket.on('message_received', () => setFetchAgain(true));
    }, [user]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await chatAPI.allMessagesNotRead();
                setNotification(res.data);
                setFetchAgain(false);
            } catch (err: any) {
                console.log(err.message, 'Error Fetching Chats');
            };
        };
        fetchChats();
    }, [fetchAgain]);

    const handleSearch = async (search: string) => {
        if (!search) return;
        try {
            setLoading(true);
            const response = await userService.searchUser(search);
            setLoading(false);
            setSearchResult(response);
        } catch (err: any) {
            console.log(err.message, 'Error Searching for Users');
        };
    };

    return (
        <Container className="Game-Lobby-Chat" fluid>
            <div className='my-3' style={{ maxWidth: '50%', marginLeft: '25%', borderBottom: '1px solid #fdf6d8' }}>
                <SideDrawer setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} loading={loading} handleSearch={handleSearch} searchResult={searchResult} />
                <Notifications user={user} notification={notification} setNotification={setNotification} setSelectedChat={setSelectedChat} />
            </div> 
            { selectedChat?._id 
                ? <ChatBox user={user} socket={socket} socketConnected={socketConnected} isTyping={isTyping} selectedChat={selectedChat} setSelectedChat={setSelectedChat} notification={notification} setNotification={setNotification} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                : <MyChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} chats={chats} setChats={setChats} fetchAgain={fetchAgain} />
            }
        </Container>
    );
};

export default GameLobby;