import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import * as chatLogic from '../../config/chatLogics'
import Modal from 'react-bootstrap/Modal';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import Loading from '../Loading/Loading';
import Form from 'react-bootstrap/Form'
import * as messageAPI from '../../utils/chatMessageApi';
import * as chatAPI from '../../utils/chatMessageApi';
import ScrollableChat from './ScrollableChat';

let selectedChatCompare: { _id: any };

interface Props {
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
    selectedChat: any;
    setSelectedChat: any;
    notification: any[];
    setNotification: React.Dispatch<React.SetStateAction<any[]>>;
    socketConnected: boolean;
    isTyping: boolean;
    socket: any;
};

const SingleChat = ({ fetchAgain, setFetchAgain, user, selectedChat, setSelectedChat, notification, setNotification, socketConnected, isTyping, socket  }: Props) => {
    const [messages, setMessages] = useState<any>([]);
    const [newMessage, setNewMessage] = useState("");
    const [typing, setTyping] = useState<boolean>(false);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMessages = async () => {
        if (!selectedChat)  return;
        try {
            const response = await messageAPI.allMessages(selectedChat._id);
            setMessages(response.data);
            const mark = await chatAPI.markAsRead(selectedChat._id);
            console.log(response.data, notification, "Notifications in Selected Chat ?")
            console.log(mark, "Marked As Read?")
            setNotification(notification.filter((n: any) => n.chat._id !== selectedChat._id));
            socket.emit("join_chat", selectedChat._id);
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error Fetching Messages')
        };
    };

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);
    
    useEffect(() => {
        socket.on('message_received', (newMessageReceived: { chat: { _id: any } }) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                };
            } else {
                setMessages([...messages, newMessageReceived]);
            };
        });
    });


    const sendMessage = async () => {
        socket.emit('stop_typing', selectedChat._id);
        try {
            setLoading(true);
            const response = await messageAPI.sendMessage({
                content: newMessage,
                chatId: selectedChat._id
            });
            console.log(response.data, 'New Message Response in Send Message');
            setNewMessage("");
            socket.emit('new_message', response.data);
            setMessages([...messages, response.data]);
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error Sending a Message');
        };
    };

    const typingHandler = async (e: any) => {
        setNewMessage(e.target.value);
        if (!socketConnected) return;
        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        };
        let lastTypingTime = new Date().getTime()
        let timerLength = 3000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit('stop_typing', selectedChat._id);
                setTyping(false);
            };
        }, timerLength);
    };

    return (
        <>
        { selectedChat ? (
                <>
                <h3 style={{ justifyContent: 'space-between' }}>
                <Button variant='' style={{ color: '#fdf6d8', float: 'left' }} 
                onClick={() => setSelectedChat("")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>   
                </Button>
                {
                    selectedChat?.users?.length > 0
                    ? !selectedChat.isGroupChat
                        ? <>{chatLogic.getSender(user, selectedChat?.users)}</>
                        : <>{selectedChat.chatName}</>
                    : ''
                }
                <Button variant='' style={{ color: '#fdf6d8', float: 'right' }} onClick={() => setModalShow(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
                </Button>
                <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                    <Modal.Body>
                        { selectedChat?.users?.length > 0 ?
                            !selectedChat?.isGroupChat ? (
                                <>
                                <ProfileModal user={chatLogic.getSenderFull(user, selectedChat?.users)} />
                                </>
                        ) : (
                                <UpdateGroupChatModal user={user} selectedChat={selectedChat} setSelectedChat={setSelectedChat} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
                        ) : ( '' ) }
                    </Modal.Body>
                </Modal>
                </h3>
                <div className='Chat-Window'>
                    <div className='Chat-Header my-2'>Live Chat</div>
                    <ScrollableChat user={user} messages={messages} isTyping={isTyping} />
                <div className="chat-footer mt-3">
                    <Form.Control 
                        as="textarea" style={{ maxHeight: 42 + 'px', width: 76 + '%', background: 'black', color: '#fdf6d8', border: 2 + 'px' + ' solid ' + 'purple' }} 
                        type="text" placeholder='Warning, no profanity filter ^_^' 
                        value={newMessage} onChange={typingHandler} required
                        onKeyPress={(e) => { e.key === "Enter" && sendMessage() }}
                    />
                { loading 
                    ? <Loading Modal={true} />
                    : <Button variant="" style={{ float: 'right', background: 'black', fontSize: 18 + 'px', marginLeft: 5 + 'px', marginTop: -10.5 + '%', color: 'red', border: 2 + 'px' + ' solid ' + 'red' }} onClick={sendMessage}>Submit</Button>
                }
                </div>
                </div>
                </>
                ) : (
                    ''
                )
            }
        </>
    )
}

export default SingleChat