import { useEffect, useState } from 'react'
import * as io from 'socket.io-client'
import Container from 'react-bootstrap/Container'
import SideDrawer from '../../components/Chat/SideDrawer';
import MyChats from '../../components/Chat/MyChats';
import ChatBox from '../../components/Chat/ChatBox';
import userService from "../../utils/userService";
import Notifications from '../../components/Chat/Notifications';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import * as chatAPI from '../../utils/chatMessageApi';

let socket: any;
interface Props {
    user: any;
};

const GameLobby = ({ user }: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchAgain, setFetchAgain] = useState<boolean>(false);
    const [notification, setNotification] = useState<any>([]);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedChat, setSelectedChat] = useState<any>([]);
    const [chats, setChats] = useState<any>([]);
    const [socketConnected, setSocketConnected] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    useEffect(() => {
        socket = io.connect("https://ascea.herokuapp.com", { transports: ['websocket'] }) 
        // "http://localhost:3001" When Tinkering Around 
        // "https://ascea.herokuapp.com" When Deploying
        socket.emit("setup", user);
        socket.on("Connected", () => setSocketConnected(true));

        socket.on('typing', () => setIsTyping(true));
        socket.on('stop_typing', () => setIsTyping(false));
        socket.on('message_received', () => setFetchAgain(true));
    }, []);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await chatAPI.allMessagesNotRead();
                console.log(response.data);
                setNotification(response.data);
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
            console.log(response);
            setLoading(false);
            setSearchResult(response);
        } catch (err: any) {
            console.log(err.message, 'Error Searching for Users');
        };
    };

    return (
        <Container className="Game-Lobby-Chat">
            <Tabs defaultActiveKey="Chat Groups" id="justify-tab-example" className="mb-3" justify >
            <Tab eventKey="home" title={<SideDrawer setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} loading={loading} handleSearch={handleSearch} searchResult={searchResult} />}>
            </Tab>
            <Tab eventKey="longer-tab" title={<Notifications user={user} notification={notification} setNotification={setNotification} setSelectedChat={setSelectedChat} />}>
            </Tab>
            </Tabs>
            { selectedChat?._id 
                ? <ChatBox user={user} socket={socket} socketConnected={socketConnected} isTyping={isTyping} selectedChat={selectedChat} setSelectedChat={setSelectedChat} notification={notification} setNotification={setNotification} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                : <MyChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} chats={chats} setChats={setChats} fetchAgain={fetchAgain} />
            }
        </Container>
    );
};

export default GameLobby;