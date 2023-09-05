import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ScrollToBottom from 'react-scroll-to-bottom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Player } from '../../components/GameCompiler/GameStore';
import { User } from '../../pages/App/App';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMessage, setIsTyping, setMessageList } from '../reducers/phaserState';
import dialogWindow from '../images/dialog_window.png';
import { useNavigate } from 'react-router-dom';
import * as chatLogic from '../../config/chatLogics';

interface Props {
    ascean: Player;
    socket: any;
    user: User;
    handleRoomReset: () => void;
};

const MultiChat = ({ ascean, socket, user, handleRoomReset }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const phaser = useSelector((state: any) => state.phaser);
    const [modalShow, setModalShow] = useState<boolean>(false);

    function sendMessage():void {
        if (phaser.room === '' || phaser.currentMessage === '') {
            dispatch(setMessageList([...phaser.messageList, {
                room: phaser?.room,
                sender: {
                    username: 'The Ascea',
                }, 
                message: 'There is not a room you are messaging or you have not typed a message.',
                time: Date.now()
            }]));
            return;
        };
        socket.emit('stopTyping', phaser.room);
        if (phaser.currentMessage !== "") {
            const messageData = {
                room: phaser.room,
                sender: user,
                message: phaser.currentMessage,
                time: Date.now()
            };
            socket.emit("send_message", messageData);
            dispatch(setMessageList([...phaser.messageList, messageData]));
            dispatch(setCurrentMessage(''));
        };
    };

    function checkKey(e: any): void {
        if (e.keyCode === 13 || e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        };
    };

    function unwrapPlayers(): JSX.Element[] {
        const players = phaser.players;
        const playerArray = [];
        for (const player in players) {
            playerArray.push(players[player]);
        };
        return playerArray.map((player: any, index: number) => {
            return (
                <div key={index} className='friend-block my-3' style={{ fontFamily: 'Cinzel', height: '100%', width: '100%' }}>
                    <img src={player.user.photoUrl} alt={player.user.username} className='chat-image' style={{ transform: 'scale(0.8)', border: '0.075em solid gold', boxShadow: '0 0 0.75em gold' }} />
                    <Button onClick={() => navigate(`/${player.user.username}`)} variant="" size="lg" style={{ fontWeight: 500, fontSize: '25px', color: '#fdf6d8', fontVariant: 'small-caps' }}>
                        <u>{player.user.username.charAt(0).toUpperCase() + player.user.username.slice(1)}</u>
                        <p style={{ fontSize: '16px' }}>{player.user.email}</p>
                    </Button>
                </div>
        )});
    };

    function typingHandler(e: any): void {
        if (!socket.connected) return;
        dispatch(setCurrentMessage(e.target.value)); 
        socket.emit('typing', phaser.room);
        setTimeout(() => socket.emit('stopTyping', phaser.room), 3000);
    };

    const chatStyle = {
        top: window.innerHeight > 900 ? '2.5vh' : '4vh',
        marginBottom: window.innerHeight > 900 ? '2.5vh' : '4vh',
        width: '115%',
        marginLeft: '-7.5%',
    };

    return (
        <Container style={{ textAlign: 'center', color: '#fdf6d8', width: '100%' }}>
        <div className='Chat-Window'>
        <div className='Chat-Header mt-3' style={{ color: '#fdf6d8' }}>
            {phaser.room !== 'Lobby' && (
                <span style={{ float: 'left', marginLeft: '1%', marginTop: '-0.5%' }} onClick={() => handleRoomReset()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg> 
                </span>
            )}
            <span style={{ marginLeft: '-5%', marginTop: '-0.75%', color: 'gold' }}>
                Room: {phaser.room} | Ascean: {ascean?.name ? ascean.name : 'Unchosen'} 
            </span>
            <Button variant="" onClick={() => setModalShow(true)} style={{ float: 'right', color: '#fdf6d8', marginTop: '-1.25%' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
            </Button>
            
            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title style={{ color: 'gold' }}>Players: {Object.keys(phaser.players).length} Room: {phaser.room}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { unwrapPlayers() }
                </Modal.Body>
            </Modal>
        </div>
        <div className='Multichat-Body' id='Multichat-Body' style={chatStyle}>
            <ScrollToBottom className="message-container">
            { phaser?.messageList.map((message: any, index: number) => {
                return (
                    <div className="message" key={index} id={user.username === message.sender.username ? "you" : "other"}>
                    <div>
                    <div className='message-content'>
                        <p>{message.message}</p>
                    </div>
                    {((chatLogic.isSameSender(phaser.messageList, message, index, user._id)
                        || chatLogic.isLastMessage(phaser.messageList, index, user._id)) && message.sender.username !== 'The Ascea'
                        ? ( <img src={message.sender.photoUrl} alt={message.sender.username} style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                float: 'right',
                            }} />
                    ) : ( '' ))}
                    <div className='message-meta'>
                        <p>{message.sender.username.charAt(0).toUpperCase() + message.sender.username.slice(1)} [{formatDistanceToNow(new Date(message.time), { addSuffix: true })}]</p>
                    </div>
                    </div>
                    </div>
                )
            })}
            { phaser.isTyping && (
                <div style={{ float: 'left', marginLeft: '3%' }} className='mb-1'>
                    <Spinner animation="grow" size="sm" />
                    <Spinner animation="grow" size="sm" />
                    <Spinner animation="grow" size="sm" />
                </div> 
            ) }
            </ScrollToBottom>
        </div>
        <div className="chat-footer" style={{ marginTop: '5%' }}>
            <Form.Control as="textarea" style={{ maxHeight: '60px', width: '95%' }} type="text" placeholder='Warning, no profanity filter...' value={phaser.currentMessage} onChange={typingHandler} onKeyDown={checkKey} />
            <Button variant="outline-info" onClick={sendMessage} style={{ float: 'right' }}>Submit</Button>
        </div>
        </div> 
        </Container>
    );
};

export default MultiChat;