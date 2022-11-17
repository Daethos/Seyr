import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import * as chatAPI from '../../utils/chatApi'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';
import * as chatLogic from '../../config/chatLogics'
import SingleChat from './SingleChat';


interface Props {
    selectedChat: any;
    user: any;
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedChat: any;
    notification: any[];
    setNotification: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChatBox = ({ user, selectedChat, setSelectedChat, fetchAgain, setFetchAgain, notification, setNotification }: Props) => {
    const [modalShow, setModalShow] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)



    return (
        <>
            {/* <h3 style={{ justifyContent: 'space-between' }}>
                <Button variant='' style={{ color: '#fdf6d8', float: 'left' }} onClick={() => setSelectedChat("")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
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
            </h3> */}
            <SingleChat notification={notification} setNotification={setNotification} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} user={user} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
        </>  
    )
}

export default ChatBox