import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ScrollToBottom from 'react-scroll-to-bottom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Player } from '../../components/GameCompiler/GameStore';
import { User } from '../../pages/App/App';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMessage, setMessageList } from '../reducers/phaserState';

interface Props {
    ascean: Player;
    socket: any;
    user: User;
    handleRoomReset: () => void;
};

const MultiChat = ({ ascean, socket, user, handleRoomReset }: Props) => {
    const dispatch = useDispatch();
    const phaser = useSelector((state: any) => state.phaser);

    function sendMessage():void {
        if (phaser.room === '' || phaser.currentMessage === '') {
            dispatch(setMessageList([...phaser.messageList, {
                room: phaser?.room,
                author: 'The Ascea',
                message: 'There is not a room you are messaging or you have not typed a message.',
                time: Date.now()
            }]));
            return;
        };
        if (phaser.currentMessage !== "") {
            const messageData = {
                room: phaser.room,
                author: user.username,
                message: phaser.currentMessage,
                time: Date.now()
            };
            socket.emit("send_message", messageData);
            dispatch(setMessageList([...phaser.messageList, messageData]));
            dispatch(setCurrentMessage(""));
        };
    };

    return (
        <Container className="Game-Lobby-Chat" style={{ overflow: 'auto' }}>
        <div className='Chat-Window' id='pvp-chat' style={{ overflow: 'auto' }}>
        <div className='Chat-Header my-2' style={{ width: '100%', color: '#fdf6d8' }}>
        <span style={{ float: 'left', marginLeft: '1%', marginTop: '-0.5%' }} onClick={() => handleRoomReset()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg> 
        </span> 
        <span style={{ marginLeft: '-5%', marginTop: '-0.75%' }}>Live Chat</span>
        </div>
        <div className='Chat-Body' id='Chat-Body'>
            <ScrollToBottom className="message-container">
            { phaser?.messageList?.map((message: any, index: number) => {
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
            })}
            </ScrollToBottom>
        </div>
            <p className='my-3'>Room: {phaser.room} | Ascean: {ascean?.name}</p>
        <div className="chat-footer mb-4">
            <Form.Control as="textarea" style={{ maxHeight: '60px', width: '90%' }} type="text" placeholder='Warning, no profanity filter...' value={phaser.currentMessage} onChange={(e) => { dispatch(setCurrentMessage(e.target.value)) }}
            onKeyPress={(e) => { e.key === "Enter" && sendMessage()}} />
            <Button variant="outline-info" onClick={sendMessage} style={{ float: 'right' }}>Submit</Button>
        </div>
        {/* { playerState.playerOne ? (
            <PlayerCard ascean={ascean} player={playerState.playerOne} number={1} checkPlayer={checkPlayer} generateWorld={generateWorld} /> 
        ) : ( '' ) }
        { playerState.playerTwo ? (
            <PlayerCard ascean={ascean} player={playerState.playerTwo} number={2} checkPlayer={checkPlayer} generateWorld={generateWorld} /> 
        ) : ( '' ) }
        { playerState.playerThree ? (
            <PlayerCard ascean={ascean} player={playerState.playerThree} number={3} checkPlayer={checkPlayer} generateWorld={generateWorld} /> 
        ) : ( '' ) }
        { playerState.playerFour ? (
            <PlayerCard ascean={ascean} player={playerState.playerFour} number={4} checkPlayer={checkPlayer} generateWorld={generateWorld} /> 
        ) : ( '' ) } */}
        </div>
        </Container>
    );
};

export default MultiChat;