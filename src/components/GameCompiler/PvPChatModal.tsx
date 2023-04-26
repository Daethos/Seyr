import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ScrollToBottom from 'react-scroll-to-bottom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Props {
    messageList: any;
    user: any;
    setShowChat: any;
    room: string;
    setCurrentMessage: any;
    currentMessage: string;
    sendMessage: () => Promise<void>;
};

const PvPChatModal = ({ messageList, user, setShowChat, room, currentMessage, setCurrentMessage, sendMessage }: Props) => {
    const [modalShow, setModalShow] = useState(false)
    return (
        <>
        <span style={{ float: 'right' }} id='chat-button'>
        <Button variant='outline-danger'
            style={{ color: '#fdf6d8', borderRadius: 50 + '%',
                // marginTop: -7 + 'vh',
                // marginTop: 55 + 'vh', marginRight: 35 + 'vw',
                border: 1.5 + 'px' + ' solid ' + 'red' 
            }} 
            onClick={() => setModalShow(true)}
        >
            <img src={user.photoUrl} alt={user.username} style={{ width: 40 + 'px', height: 40 + 'px', borderRadius: 50 + '%' }} />
        </Button>

        <Modal 
            show={modalShow}
            onHide={() => setModalShow(false)}
            centered
            id="modal-weapon"
        >
        <Modal.Body id="modal-weapon">
        <Container className="Game-Lobby-Chat" style={{ overflow: 'auto' }}>
            <div className='Chat-Window' id='pvp-chat' style={{ overflow: 'auto' }}>
            <div className='Chat-Header my-2' style={{ width: 100 + '%' }}>
            <span style={{ float: 'left', marginLeft: 1 + '%', marginTop: -0.75 + '%' }} onClick={() => setShowChat(false)}>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg> 

            </span> 
            <span style={{ marginLeft: -5 + '%', marginTop: -0.75 + '%' }}>Live Chat</span>
            </div>
            <div className='Chat-Body'>
            <ScrollToBottom className="message-container">
            { messageList.map((message: any, index: number) => {
                return (
                    <div className="message" key={index} id={user.username === message.author ? "you" : "other"}>
                        <div>
                        <div className='message-content'>
                            <p>{message.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id=''>{message.author.charAt(0).toUpperCase() + message.author.slice(1)} [{formatDistanceToNow(new Date(message.time), { addSuffix: true })}]</p>
                        </div>
                        </div>

                    </div>
                )
            }) }
            </ScrollToBottom>
            </div>
            <div>
                <p className='text-white my-1'>Room: {room}</p>
            </div>
            <div className="chat-footer">
                <Form.Control as="textarea" style={{ maxHeight: 30 + 'px', width: 80 + '%' }} type="text" placeholder='Warning, no profanity filter...' value={currentMessage} onChange={(e) => { setCurrentMessage(e.target.value) }}
                onKeyPress={(e) => { e.key === "Enter" && sendMessage() }}
                />
                <Button variant="outline-info" onClick={sendMessage} style={{ float: 'right', marginTop: -9.25 + '%' }}>Submit</Button>
                {/* <Button variant='outline-danger' size='lg' className='my-3' onClick={sendAscean}>Reveal Ascean</Button> */}
            </div>
            </div>
        </Container>
        </Modal.Body>
        </Modal>
    </span>
        </>
    )
}

export default PvPChatModal