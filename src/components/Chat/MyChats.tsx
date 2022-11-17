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
}

const MyChats = ({ selectedChat, setSelectedChat, user, chats, setChats, fetchAgain }: Props) => {
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
        {/* <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
        </OverlayTrigger> */}
            <Button variant="" onClick={handleShow} style={{ color: '#fdf6d8' }}>
                My Chats {' '}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat mb-1" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                </svg>
            </Button>

        <Offcanvas show={show} onHide={handleClose} id="offcanvas">
        <Offcanvas.Header closeButton closeVariant='white'>
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
            <h3 className='mb-4'>
                My Chats
                <GroupChatModal user={user} chats={chats} setChats={setChats} />
            {/* <span style={{ float: 'right' }}>
                <Button variant='' style={{ color: '#fdf6d8', marginTop: -10 + 'px' }} onClick={() => setModalShow(true)}>
                    <h6>New Group {' '}
                        <b style={{ fontSize: 25 + 'px' }}>&#43;</b>
                    </h6>
                </Button>    
                <Modal 
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    centered
                    id="modal-weapon"
                >
                <Modal.Body id="modal-weapon">
                    Form for Create New Group Here
                </Modal.Body>
                </Modal>
            </span> */}
            </h3>
            {
            chats 
            ? (
                chats?.map((chat: any, index: number) => {
                    // console.log(chat, 'chat found in Search')
                    return (
                        <div className="friend-block my-4" key={index}>
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
        </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}

export default MyChats