import { RefAttributes, useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as chatAPI from "../../utils/chatApi";
import Loading from '../../components/Loading/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';
import userService from "../../utils/userService";
import UserListItem from './UserListItem';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import * as chatLogic from '../../config/chatLogics'
import Modal from 'react-bootstrap/Modal';
import GroupChatModal from './GroupChatModal';


interface Props {
    selectedChat: any;
    setSelectedChat: React.Dispatch<React.SetStateAction<never[]>>;
    user: any
    chats: any;
    setChats: any;
    fetchAgain: boolean;
    error: any;
    setError: any;
}

const MyChats = ({ selectedChat, setSelectedChat, user, chats, setChats, fetchAgain, error, setError }: Props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalShow, setModalShow] = useState(false)

    const fetchChats = async () => {
        try {
            const response = await chatAPI.fetchChat()
            console.log(response.data)
            setChats(response.data)
        } catch (err: any) {
            console.log(err.message, 'Error Fetching Chats')
        }
    }

    useEffect(() => {
        fetchChats();
    }, [fetchAgain])

    useEffect(() => {
        handleClose()
    }, [selectedChat])

    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
        <Tooltip id="button-tooltip" {...props}>
          Your Current Chat Groups
        </Tooltip>
    );

    

    return (
        <>
            <GroupChatModal user={user} chats={chats} setChats={setChats} />
            {
            chats 
            ? (
                chats?.map((chat: any, index: number) => {
                    // console.log(chat, 'chat found in Search')
                    return (
                        <div className="friend-block my-2" key={index}>
                            <span id='friend-card'>
                                <h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'purple', fontVariant: 'small-caps', marginTop: 7.5 + 'px'}}>
                                    <Button variant="" style={{ color: '#fdf6d8' }} size="lg" onClick={() => setSelectedChat(chat)} key={index}>
                                        <h3>
                                            { !chat.isGroupChat
                                            ? <>
                                                <img 
                                                    src={chatLogic.getSenderPhoto(user, chat.users)} 
                                                    alt={chatLogic.getSender(user, chat.users)} 
                                                    style={{ 
                                                        width: 35 + 'px', 
                                                        height: 35 + 'px', 
                                                        borderRadius: 50 + '%', 
                                                        float: 'left',
                                                        // marginRight: 5 + '%' 
                                                    }}
                                                /> {' '}{chatLogic.getSender(user, chat.users)} </>
                                            : 
                                            <>
                                            <img
                                                src={user.photoUrl}
                                                alt={user.username}
                                                style={{ 
                                                    width: 35 + 'px', 
                                                    height: 35 + 'px', 
                                                    borderRadius: 50 + '%', 
                                                    float: 'left',
                                                    // marginLeft: -25 + '%' 
                                                }}
                                            /> {chat.chatName}
                                            </>
                                            }
                                        </h3>
                                        {chat.latestMessages && (
                                            <p style={{ fontSize: 14 + 'px' }}>
                                            <b>
                                            {chat.latestMessages.sender.username.charAt(0).toUpperCase() + chat.latestMessages.sender.username.slice(1)} : {' '}
                                            </b>
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
            ) : (
            <Loading Combat={true} />
            )}
        </>
    )
}

export default MyChats