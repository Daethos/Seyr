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
    handleSocketEvent: (event: string, callback: Function) => void;
}

const GameChat = ({ state, dispatch, playerState, playerDispatch, gameState, gameDispatch, user, ascean, opponent, spectator, room, socket, setShowChat, enemyPlayer, handleRoomReset, handleSocketEvent }: Props) => {
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

    useEffect(() => {
        console.log(state, "State in GameChat")
    }, [state]);

    useEffect(() => { console.log(mapState, "Map in GameChat") }, [mapState]);

    // TODO:FIXME: state.playerPosition doesn't work as it updates to the number of the last joined player, so it'll go from 1 to 4 eventually  TODO:FIXME:
    useEffect(() => {
        const mapCreatedCallback = async (response: any) => {
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA,
                payload: response
            });
            const messageData = {
                room: room,
                author: user.username,
                message: `Received created map with variables: City: ${response.contentCounts.city}, Enemy: ${response.contentCounts.enemy}, Treasure: ${response.contentCounts.treasure}.`,
                time: Date.now()
            };
            await socket.emit("send_message", messageData);
            setMessageList((list: any) => [...list, messageData]);
            await setCoordinates(playerState, response);
            await socket.emit('commenceGame');
        };
        handleSocketEvent("mapCreated", mapCreatedCallback);

        const playerReadyCallback = async (data: any) => {
            console.log(data, 'Player Ready');
            //TODO:FIXME: This is the switch to show everyone that a player is ready.
            if (data._id === playerState?.playerOne?.user?._id) {
                playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_ONE_READY, payload: true });
            } else if (data._id === playerState?.playerTwo?.user?._id) {
                playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_TWO_READY, payload: true });
            } else if (data._id === playerState?.playerThree?.user?._id) {
                playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_THREE_READY, payload: true });
            } else if (data._id === playerState?.playerFour?.user?._id) {
                playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_FOUR_READY, payload: true });
            };
        };
        handleSocketEvent("player_ready", playerReadyCallback);

        const gameCommencingCallback = async () => {
            console.log('Setting Gameplay to Live')
            const messageData = {
                room: room,
                author: `The Seyr`,
                message: `Welcome, ${user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}, to the Ascea. Your duel is commencing in 10 seconds against a live opponent. Prepare, and good luck.`,
                time: Date.now()
            };
            await socket.emit(`send_message`, messageData);
            setTimeout(() => setLiveGameplay(true), 10000);
        };
        handleSocketEvent(`Game Commencing`, gameCommencingCallback);

        const receiveMessageCallback = async (data: any) => {
            setMessageList((list: any) => [...list, data]);
        };
        handleSocketEvent(`receive_message`, receiveMessageCallback);

        return () => {
            if (socket) {
                socket.off("mapCreated");
                socket.off(`player_ready`);
                socket.off(`Game Commencing`);
                socket.off(`receive_message`);
            };
        };
    }, [socket, playerState]);
    
    // May make this a server side function to limit issues with client side data
    const generateWorld = async (mapName: string) => {
        try {
            socket.emit("createMap", { name: mapName, ascean: ascean });
        } catch (err: any) {
            console.log(err.message, 'Error Generating World Environment.');
        };
    };

    const setCoordinates = async (players: any, map: any) => {
        try {
            console.log(players, "Players ?")
            let playerCoords = { x: 0, y: 0 };
            console.log(players?.playerOne?.ascean, ascean?._id, "Player One ?");
            console.log(players?.playerTwo?.ascean, ascean?._id, "Player Two ?");
            console.log(players?.playerThree?.ascean, ascean?._id, "Player Three ?");
            console.log(players?.playerFour?.ascean, ascean?._id, "Player Four ?");
            if (players?.playerOne?.ascean._id === ascean._id) {
                playerCoords = { x: -75, y: 75 };
            } else if (players?.playerTwo?.ascean?._id === ascean?._id) {
                playerCoords = { x: 75, y: 75 };
            } else if (players?.playerThree?.ascean?._id === ascean?._id) {
                playerCoords = { x: -75, y: -75 };
            } else if (players?.playerFour?.ascean?._id === ascean?._id) {
                playerCoords = { x: 75, y: -75 };
            };
            console.log(mapState, "Map State in Set Coordinates");
            const coords = await getAsceanCoords(playerCoords.x, playerCoords.y, map.map);
            console.log(coords, "Coords in Set Coordinates");
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_COORDS,
                payload: coords,
            });
        } catch (err: any) {
            console.log(err.message, 'Error Setting Coordinates');
        };
    };

    async function getAsceanCoords(x: number, y: number, map: any) {
        console.log(x, y, map, "X, Y, Map");
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
            };
            await socket.emit("send_message", messageData);
            setMessageList((list: any) => [...list, messageData]);
            setCurrentMessage("");
        };
    };

    
    // TODO:FIXME: This is the button to commit you as a player to be 'ready'

    const playerReady = async () => {
        // playerDispatch({})
        try { 
            await socket.emit(`player_game_ready`, user);
        } catch (err: any) { 
            console.log(err.message, 'Error With Player Ready') };
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
    }, [socket]);


    return (
        <>
        { liveGameplay ?
            <>
            <GamePvP 
                state={state} dispatch={dispatch} playerState={playerState} playerDispatch={playerDispatch} mapState={mapState} mapDispatch={mapDispatch} 
                gameState={gameState} gameDispatch={gameDispatch} user={user} spectator={spectator} ascean={ascean} 
                room={room} socket={socket} setModalShow={setModalShow} getAsceanCoords={getAsceanCoords} generateWorld={generateWorld}
                handleSocketEvent={handleSocketEvent}
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
                        { ascean._id === playerState.playerOne.ascean._id ? (
                            <span style={{ float: "right", marginTop: "-10%" }}>
                                <Button variant='' style={{ color: "gold" }} onClick={() => generateWorld(`${ascean?.name}_PVP_${Date.now()}`)} disabled={checkPlayer()}>Get Map</Button>
                            </span>
                        ) : ( '' ) }
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