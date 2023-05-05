import { useEffect, useState } from 'react'
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
}

const MyChats = ({ selectedChat, setSelectedChat, user, chats, setChats, fetchAgain }: Props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const fetchChats = async () => {
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
        handleClose()
    }, [selectedChat]);

    const getLastMessageColor = (latestMessages: any, userId: any) => {
        if (!latestMessages) return;
        if (latestMessages.sender._id === userId) {
            return 'green';
        } else if (!latestMessages.readBy.includes(userId)) {
            return 'gold';
        } else {
            return '#fdf6d8';
        };
    };

    return (
        <>
        <GroupChatModal user={user} chats={chats} setChats={setChats} />
        { chats ? 
            ( chats?.map((chat: any, index: number) => {
                return (
                    <div className="friend-block my-2" key={index}>
                    <span id='friend-card'>
                        <h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'purple', fontVariant: 'small-caps', marginTop: 7.5 + 'px'}}>
                            <Button variant="" style={{ color: '#fdf6d8' }} size="lg" onClick={() => setSelectedChat(chat)} key={index}>
                            <h3>
                            { !chat.isGroupChat ? 
                                <> 
                                <img 
                                    src={chatLogic.getSenderPhoto(user, chat.users)} 
                                    alt={chatLogic.getSender(user, chat.users)} 
                                    style={{ 
                                        width: '35px', 
                                        height: '35px', 
                                        borderRadius: 50 + '%', 
                                        float: 'left',
                                    }}
                                />{' '}
                                {chatLogic.getSender(user, chat.users)}
                                </>
                            : 
                            <> 
                            <img
                                src={user.photoUrl}
                                alt={user.username}
                                style={{ 
                                    width: '35px', 
                                    height: '35px', 
                                    borderRadius: 50 + '%', 
                                    float: 'left',
                                }}
                            />{' '}
                            {chat.chatName} 
                            </>
                            }
                            </h3>
                            {chat.latestMessages && (
                                <p style={{ fontSize: 14 + 'px', color: getLastMessageColor(chat.latestMessages, user._id) }}>
                                <b>{chat.latestMessages.sender.username.charAt(0).toUpperCase() + chat.latestMessages.sender.username.slice(1)} : {' '}</b>
                                { chat.latestMessages.content.length > 50
                                    ? chat.latestMessages.content.substring(0, 51) + '...'
                                    : chat.latestMessages.content
                                } 
                                </p>
                            )}
                            </Button>
                        </h3>
                    </span>
                    </div>
                )
            })
        ) : ( <Loading Combat={true} /> )}
        </>
    )
}

export default MyChats