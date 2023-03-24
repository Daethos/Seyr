import { useEffect, useReducer, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './GameCompiler.css'
import Loading from '../Loading/Loading';
import GamePvP from '../../pages/GamePvP/GamePvP';
import Modal from 'react-bootstrap/Modal';
import PvPChatModal from './PvPChatModal';
import { ACTIONS, initialPvPData, PvPStore, PLAYER_ACTIONS, initialPlayerData, PlayerStore, PvPData, PlayerData } from '../../components/GameCompiler/PvPStore';
import { MAP_ACTIONS, MapStore, initialMapData, DIRECTIONS, MapData } from '../../components/GameCompiler/WorldStore';
import * as mapAPI from '../../utils/mapApi';

interface Props {
    state: PvPData;
    dispatch: any;
    playerState: PlayerData;
    playerDispatch: any;
    gameState: any;
    gameDispatch: any;
    user: any;
    room: any;
    ascean: any;
    opponent: any;
    socket: any;
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
    enemyPlayer: any;
    spectator: boolean;
    handleRoomReset: () => void;
}

const GameChat = ({ state, dispatch, playerState, playerDispatch, gameState, gameDispatch, user, ascean, opponent, spectator, room, socket, setShowChat, enemyPlayer, handleRoomReset }: Props) => {
    const [mapState, mapDispatch] = useReducer(MapStore, initialMapData);
    const [modalShow, setModalShow] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState<any>([]);
    const [liveGameplay, setLiveGameplay] = useState<boolean>(false);
    const [duelReady, setDuelReady] = useState<boolean>(false);

    // useEffect(() => {
    //     // if (playerState.playerOne && playerState.playerTwo && playerState.playerThree && playerState.playerFour) {
    //     if (playerState.playerOne) {
    //         generateWorld(`${playerState.playerOne.ascean.name}'s PvP World`);
    //     };
    // }, [playerState]);

    useEffect(() => { console.log(mapState, "Map") }, [mapState])

    useEffect(() => {
        socket.on("mapCreated", async (response: any) => {
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA,
                payload: response
            });
            let playerCoords = { x: 0, y: 0 };
            switch (state.playerPosition) {
                case 1:
                    playerCoords = { x: -75, y: 75 };
                    break;
                case 2:
                    playerCoords = { x: 75, y: 75 };
                    break;
                case 3:
                    playerCoords = { x: -75, y: -75 };
                    break;
                case 4:
                    playerCoords = { x: 75, y: -75 };
                    break;
                default:
                    break;
            };
            // const coords = await getAsceanCoords(gameState?.player?.coordinates?.x, gameState?.player?.coordinates?.y, response.map);

            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_COORDS,
                payload: playerCoords,
            });
            mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: false });
        });

        socket.on(`player_ready`, async (data: any) => {
            //TODO:FIXME: This is the switch to show everyone that a player is ready.

            console.log(data, 'Player Ready');
        });
    }, []);
    
    const generateWorld = async (mapName: string) => {
        mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: true });
        try {
            // const data = { name: mapName, ascean: gameState.player };
            // const response = await mapAPI.createMap(data);
            // console.log(response, 'Response Generating World Environment.');
            // mapDispatch({
            //     type: MAP_ACTIONS.SET_MAP_DATA,
            //     payload: response
            // });
            socket.emit("createMap", { name: mapName, ascean: ascean });

            // const coords = await getAsceanCoords(gameState?.player?.coordinates?.x, gameState?.player?.coordinates?.y, response.map);
            // mapDispatch({
            //     type: MAP_ACTIONS.SET_MAP_COORDS,
            //     payload: coords,
            // });
            // mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error Generating World Environment.');
        };
    };

    async function getAsceanCoords(x: number, y: number, map: any) {
        const tile = map?.[x + 100]?.[y + 100];
        return tile ?? null;
    };

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
        };
    };

    
    // TODO:FIXME: This is the button to commit you as a player to be 'ready'

    const playerReady = async () => {
        playerDispatch({})
    }

    const readyDuel = async () => {
        try {
            await socket.emit(`player_game_ready`, playerState);
        } catch (err: any) {
            console.log(err.message, 'Error Preparing To Duel')
        };
    };

    const revealAscean = async () => {
        if (!ascean) return;
        const asceanData = {
            room: room,
            author: user.username,
            message: `My character is ${ascean.name}, using their ${ascean.weapon_one.name}.`,
            time: Date.now()
        };
        await socket.emit("send_ascean", asceanData);
        setMessageList((list: any) => [...list, asceanData]);
    };

    function checkPlayer () {
        if (playerState.playerOne && playerState.playerTwo && playerState.playerThree && playerState.playerFour) {
            return true;
        } else {
            return false;
        };
    }

    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setMessageList((list: any) => [...list, data]);
        });
        socket.on(`Game Commencing`, () => {
            setLiveGameplay(true);
            console.log('Game Commencing');
        });
    }, [socket]);

    useEffect(() => {
        socket.on(`Game Commencing`, async () => {
            console.log('Setting Gameplay to Live')
            const messageData = {
                room: room,
                author: `The Seyr`,
                message: `Welcome, ${user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}, to the Ascea. Your duel is commencing in 10 seconds against a live opponent. Prepare, and good luck.`,
                time: Date.now()
            };
            await socket.emit(`send_message`, messageData);
            setTimeout(() => setLiveGameplay(true), 10000);
         });
    }, []);

    return (
        <>
        { liveGameplay ?
            <>
            <GamePvP 
                state={state} dispatch={dispatch} playerState={playerState} playerDispatch={playerDispatch} mapState={mapState} mapDispatch={mapDispatch} 
                gameState={gameState} gameDispatch={gameDispatch} user={user} spectator={spectator} ascean={ascean} opponent={opponent} 
                enemyPlayer={enemyPlayer} room={room} socket={socket} setModalShow={setModalShow} getAsceanCoords={getAsceanCoords} generateWorld={generateWorld}
            />
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
                <span style={{ float: 'left', marginLeft: 1 + '%', marginTop: -0.75 + '%' }} onClick={() => handleRoomReset()}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg> 

                </span> 
                <span style={{ marginLeft: -5 + '%', marginTop: -0.75 + '%' }}>Live Chat</span>
                </div>
                <div className='Chat-Body' id='Chat-Body'>
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
                <p className='my-2'>Room: {room} | Ascean: {ascean?.name}</p>
                </div>
                <div className="chat-footer">
                    <Form.Control as="textarea" style={{ maxHeight: 30 + 'px', width: 75 + '%' }} type="text" placeholder='Warning, no profanity filter...' value={currentMessage} onChange={(e) => { setCurrentMessage(e.target.value) }}
                    onKeyPress={(e) => { e.key === "Enter" && sendMessage() }}
                    />
                    <Button variant="outline-info" onClick={sendMessage} style={{ float: 'right', marginTop: -11.25 + '%' }}>Submit</Button>
            
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
                <p className='my-3'>Room: {room} | Ascean: {ascean?.name}</p>
            <div className="chat-footer mb-4">
                <Form.Control as="textarea" style={{ maxHeight: 30 + 'px', width: 80 + '%' }} type="text" placeholder='Warning, no profanity filter...' value={currentMessage} onChange={(e) => { setCurrentMessage(e.target.value) }}
                onKeyPress={(e) => { e.key === "Enter" && sendMessage()}} />
                <Button variant="outline-info" onClick={sendMessage} style={{ float: 'right', marginTop: -9.25 + '%' }}>Submit</Button>
            </div>
            { playerState.playerOne ? (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                        <h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'gold', fontVariant: 'small-caps' }}>
                        {playerState.playerOne.ascean.name}
                        </h3>
                        <p>Level: {playerState.playerOne.ascean.level} | {playerState.playerOne.ascean.mastery}
                        </p>
                        <span style={{ float: "right", marginTop: "-10%" }}>
                        <Button variant='' style={{ color: "gold" }} onClick={() => generateWorld(`${ascean?.name}_PVP_${Date.now()}`)} disabled={checkPlayer()}>Get Map</Button>
                        </span>
                        <span style={{ float: "left", marginTop: "-14.5%" }}>
                        <img src={process.env.PUBLIC_URL + `/images/` + playerState.playerOne.ascean.origin + '-' + playerState.playerOne.ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "15vw", borderRadius: "50%", border: "2px solid purple" }} />
                        </span>
                </div>
            ) : ( '' ) }
            { playerState.playerTwo ? (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                    <h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'purple', fontVariant: 'small-caps' }}>
                        {playerState.playerTwo.ascean.name}
                        </h3>
                        <p>Level: {playerState.playerTwo.ascean.level} | {playerState.playerTwo.ascean.mastery}</p>
                        <span style={{ float: "left", marginTop: "-14.5%" }}>
                        <img src={process.env.PUBLIC_URL + `/images/` + playerState.playerTwo.ascean.origin + '-' + playerState.playerTwo.ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "15vw", borderRadius: "50%", border: "2px solid purple" }} />
                        </span>
                </div>
            ) : ( '' ) }
            { playerState.playerThree ? (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                    <h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'blue', fontVariant: 'small-caps' }}>
                        {playerState.playerThree.ascean.name}
                        </h3>
                        <p>Level: {playerState.playerThree.ascean.level} | {playerState.playerThree.ascean.mastery}</p>
                        <span style={{ float: "left", marginTop: "-14.5%" }}>
                        <img src={process.env.PUBLIC_URL + `/images/` + playerState.playerThree.ascean.origin + '-' + playerState.playerThree.ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "15vw", borderRadius: "50%", border: "2px solid purple" }} />
                        </span>
                </div>
            ) : ( '' ) }
            { playerState.playerFour ? (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                    <h3 style={{ fontWeight: 500, fontSize: 25 + 'px', color: 'red', fontVariant: 'small-caps' }}>
                        {playerState.playerFour.ascean.name}
                        </h3>
                        <p>Level: {playerState.playerFour.ascean.level} | {playerState.playerFour.ascean.mastery}</p>
                        <span style={{ float: "left", marginTop: "-14.5%" }}>
                        <img src={process.env.PUBLIC_URL + `/images/` + playerState.playerFour.ascean.origin + '-' + playerState.playerFour.ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "15vw", borderRadius: "50%", border: "2px solid purple" }} />
                        </span>
                </div>
            ) : ( '' ) }
            </div>
            </Container>
        }
        </>
    );
};

export default GameChat;