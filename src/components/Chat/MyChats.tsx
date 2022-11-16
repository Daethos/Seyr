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
import { getSender } from '../../config/chatLogics'
import Modal from 'react-bootstrap/Modal';


interface Props {
    selectedChat: any;
    setSelectedChat: any;
    user: any
    chats: any;
    setChats: any;
}

const MyChats = ({ selectedChat, setSelectedChat, user, chats, setChats }: Props) => {
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
    }, [])

    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
        <Tooltip id="button-tooltip" {...props}>
          Create or Find Current Group
        </Tooltip>
    );

    

    return (
        <>
        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <Button variant="" onClick={handleShow} style={{ color: '#fdf6d8' }}>
                
                    My Chats
                
            </Button>
        </OverlayTrigger>

        <Offcanvas show={show} onHide={handleClose} id="offcanvas">
        <Offcanvas.Header closeButton>
        <Offcanvas.Title className=''><Button variant="" onClick={handleClose} style={{ color: '#fdf6d8' }}>Chat Groups</Button></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ color: '#fdf6d8' }}>
            {/* <input 
                style={{ backgroundColor: 'black', color: '#fdf6d8', border: 1 + 'px' + ' solid ' + 'purple', width: 80 + '%' }} 
                placeholder="Search by Username or Email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => { e.key === "Enter" && handleSearch(search) }}
            />
            <Button variant="" onClick={() => handleSearch(search)} style={{ color: '#fdf6d8' }}>Go</Button> */}
            <h3>
                My Chats
            <span style={{ float: 'right' }}>
                <Button variant='' style={{ color: '#fdf6d8', marginTop: -10 + 'px' }} onClick={() => setModalShow(true)}>
                    {/* //TODO:FIXME: Make the Modal for Create Group! //TODO:FIXME: */}
                    <h6>New Group {' '}
                        <b style={{ fontSize: 25 + 'px' }}>&#43;</b>
                    </h6>
                </Button>    
            </span>
            </h3>
            {
            chats 
            ? (
                chats?.map((chat: any, index: number) => {
                    // console.log(chat, 'chat found in Search')
                    return (
                        <div className="friend-block my-3">
                            <span id='friend-card'>
                                <h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'purple', fontVariant: 'small-caps', marginTop: 7.5 + 'px'}}>
                                    <Button variant="" style={{ color: '' }} size="lg" onClick={() => setSelectedChat(chat)} key={index}>
                                        <h3>
                                            {chat.chatName}
                                        </h3>
                                        <p>
                                            { !chat.isGroupChat
                                            ? getSender(user, chat.users)
                                            : chat.chatName
                                            }
                                        </p>
                                        {chat.latestMessages && (
                                            <p>
                                            <b>
                                            {chat.latestMessages.sender.name} : 
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
        </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}

export default MyChats