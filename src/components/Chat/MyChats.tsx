import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import * as chatAPI from "../../utils/chatApi";
import Loading from '../../components/Loading/Loading';
import * as chatLogic from '../../config/chatLogics'
import GroupChatModal from './GroupChatModal';
import { User } from '../../pages/App/App';

interface Props {
    selectedChat: any;
    setSelectedChat: React.Dispatch<React.SetStateAction<never[]>>;
    user: User
    chats: any;
    setChats: any;
    fetchAgain: boolean;
};

const MyChats = ({ selectedChat, setSelectedChat, user, chats, setChats, fetchAgain }: Props) => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = (): void => setShow(false);

    const fetchChats = async (): Promise<void> => {
        try {
            const res = await chatAPI.fetchChat();
            setChats(res.data);
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

    const getLastMessageColor = (latestMessages: any, userId: any): string | undefined => {
        if (!latestMessages) return;
        if (latestMessages.sender._id === userId) {
            return '#fdf6d8';
        } else if (!latestMessages.readBy.includes(userId)) {
            return 'gold';
        } else {
            return 'green';
        };
    };

    const checkWidth = (): string => {
        const width = window.innerWidth;
        if (width < 768) {
            return '100%';
        } else {
            return '90%';
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
                        <h3 style={{ color: 'gold', width: '90%' }}>
                        { !chat.isGroupChat ? (
                            <> 
                            <img style={{ boxShadow: '0 0 0.5em ' + getLastMessageColor(chat.latestMessages, user._id), border: '0.075em solid ' + getLastMessageColor(chat.latestMessages, user._id) }} src={chatLogic.getSenderPhoto(user, chat.users)} alt={chatLogic.getSender(user, chat.users)} className='chat-image' />{' '}
                            <div className='chat-name'>{chatLogic.getSender(user, chat.users)}</div>
                            </>
                        ) : (
                            <> 
                            <img style={{ boxShadow: '0 0 0.5em ' + getLastMessageColor(chat.latestMessages, user._id), border: '0.075em solid ' + getLastMessageColor(chat.latestMessages, user._id) }} src={user.photoUrl} alt={user.username} className='chat-image' />{' '}
                            <div className='chat-name'>{chat.chatName}</div>
                            </>
                        ) }
                        </h3>
                        {chat.latestMessages && (
                            <p style={{ fontSize: '14px', color: getLastMessageColor(chat.latestMessages, user._id), width: checkWidth() }}>
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