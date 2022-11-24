import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './GameCompiler.css'
import Loading from '../Loading/Loading';
import GamePvP from '../../pages/GamePvP/GamePvP';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PvPChatModal from './PvPChatModal';

interface Props {
    user: any;
    room: any;
    ascean: any;
    opponent: any;
    socket: any;
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
    combatData: any;
    setCombatData: any;
    enemyPlayer: any;
    yourData: any;
    enemyData: any;
    spectator: boolean;
}

const GameChat = ({ user, ascean, opponent, spectator, room, socket, setShowChat, combatData, setCombatData, enemyPlayer, yourData, enemyData }: Props) => {
    const [modalShow, setModalShow] = useState(false)
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState<any>([])
    const [liveGameplay, setLiveGameplay] = useState<boolean>(false)

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: user.username,
                message: currentMessage,
                time: Date.now()
                    // new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list: any) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    const revealAscean = async () => {
        if (!ascean) {
            return
        }
        const asceanData = {
            room: room,
            author: user.username,
            message: `My character is ${ascean.name}, using their ${ascean.weapon_one.name}.`,
            time: Date.now()
        }
        await socket.emit("send_ascean", asceanData);
        setMessageList((list: any) => [...list, asceanData]);
    }

    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setMessageList((list: any) => [...list, data]);
        })
        // socket.on(`Game Commencing`, () => {
        //     setLiveGameplay(true)
        //     console.log('Game Commencing')
        // })
    }, [socket])

    useEffect(() => {
      socket.on(`Game Commencing`, async () => {
        // if (ascean && opponent) {
            console.log('Setting Gameplay to Live')
            const messageData = {
                room: room,
                author: `The Seyr`,
                message: `Duel commencing in 6 seconds, prepare.`,
                time: Date.now()
            }
            await socket.emit(`send_message`, messageData);
            // setLiveGameplay(true)
            setTimeout(() => setLiveGameplay(true), 6000)
        // }
      })
    }, [])

    

    return (
        <>
        {
            liveGameplay
            ?
            <>
            <GamePvP user={user} spectator={spectator} ascean={ascean} opponent={opponent} yourData={yourData} enemyData={enemyData} enemyPlayer={enemyPlayer} room={room} socket={socket} combatData={combatData} setCombatData={setCombatData} setModalShow={setModalShow} />
            {/* <PvPChatModal messageList={messageList} user={user} setShowChat={setShowChat} room={room} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} sendMessage={sendMessage} /> */}

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
                    {
                        messageList.map((message: any, index: number) => {

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
                        })
                    }
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
                
                    </div>
                    </div>
                </Container>
                </Modal.Body>
                </Modal>

            </>
        :
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
                {
                    messageList.map((message: any, index: number) => {
                        // console.log(messageList)
                        return (
                            <div className="message" key={index} id={user.username === message.author ? "you" : "other"}>
                                <div>
                                <div className='message-content'>
                                    <p>{message.message}</p>
                                    {/* <p>{}</p> */}
                                </div>
                                <div className='message-meta'>
                                    <p id=''>{message.author.charAt(0).toUpperCase() + message.author.slice(1)} [{formatDistanceToNow(new Date(message.time), { addSuffix: true })}]</p>
                                </div>
                                </div>

                            </div>
                        )
                    })
                }
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
        }
        </>
  )
}

export default GameChat