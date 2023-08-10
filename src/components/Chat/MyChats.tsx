import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import * as chatAPI from "../../utils/chatApi";
import Loading from '../../components/Loading/Loading';
import * as chatLogic from '../../config/chatLogics'
import GroupChatModal from './GroupChatModal';

interface Props {
    selectedChat: any;
    setSelectedChat: React.Dispatch<React.SetStateAction<never[]>>;
    user: any
    chats: any;
    setChats: any;
    fetchAgain: boolean;
};

const MyChats = ({ selectedChat, setSelectedChat, user, chats, setChats, fetchAgain }: Props) => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);

    const fetchChats = async (): Promise<void> => {
        try {
            const response = await chatAPI.fetchChat();
            setChats(response.data);
        } catch (err: any) {
            console.log(err.message, 'Error Fetching Chats')
        };
    };

    useEffect(() => {
        fetchChats();
    }, [fetchAgain]);

    useEffect(() => {
        handleClose();
    }, [selectedChat]);

    const getLastMessageColor = (latestMessages: any, userId: any) => {
        if (!latestMessages) return;
        if (latestMessages.sender._id === userId) {
            return '#fdf6d8';
        } else if (!latestMessages.readBy.includes(userId)) {
            return 'gold';
        } else {
            return '#fdf6d8';
        };
    };

    return (
        <>
        <GroupChatModal user={user} chats={chats} setChats={setChats} />
        { chats ?  ( chats?.map((chat: any, index: number) => {
            return (
                <div className="friend-block my-2" key={index}>
                    <h3 style={{ fontWeight: 500, fontSize: '25px', color: '#fdf6d8', fontVariant: 'small-caps' }}>
                        <Button variant="" className='chat-friend-button' size="lg" onClick={() => setSelectedChat(chat)} key={index}>
                        <h3 style={{ color: 'gold' }}>
                        { !chat.isGroupChat ? (
                            <> 
                            <img src={chatLogic.getSenderPhoto(user, chat.users)} alt={chatLogic.getSender(user, chat.users)} className='chat-image' />{' '}
                            {chatLogic.getSender(user, chat.users)}
                            </>
                        ) : (
                            <> 
                            <img src={user.photoUrl} alt={user.username} className='chat-image' />{' '}
                            {chat.chatName} 
                            </>
                        ) }
                        </h3>
                        {chat.latestMessages && (
                            <p style={{ fontSize: '14px', color: getLastMessageColor(chat.latestMessages, user._id) }}>
                            <b>{chat.latestMessages.sender.username.charAt(0).toUpperCase() + chat.latestMessages.sender.username.slice(1)} : {' '}</b>
                            { chat.latestMessages.content.length > 50
                                ? chat.latestMessages.content.substring(0, 51) + '...'
                                : chat.latestMessages.content
                            } 
                            </p>
                        )}
                        </Button>
                    </h3>
                </div>
            )})
        ) : ( <Loading Combat={true} /> )}
        </>
    );
};

export default MyChats;