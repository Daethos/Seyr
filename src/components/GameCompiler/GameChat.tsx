import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './GameCompiler.css'
import GamePvP from '../../pages/GamePvP/GamePvP';
import Modal from 'react-bootstrap/Modal';
import PvPChatModal from './PvPChatModal';
import { PvPData, PlayerData } from '../../components/GameCompiler/PvPStore';
import { MapData } from '../../components/GameCompiler/WorldStore';
import { Enemy, GAME_ACTIONS, NPC, Player } from '../../components/GameCompiler/GameStore';

interface Props {
    state: PvPData;
    dispatch: any;
    playerState: PlayerData;
    playerDispatch: any;
    gameState: any;
    gameDispatch: any;
    specState: PvPData;
    specDispatch: any;
    user: any;
    room: any;
    ascean: Player;
    enemy: Enemy;
    socket: any;
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
    spectator: boolean;
    handleRoomReset: () => void;
    handleSocketEvent: (event: string, callback: Function) => void;
    handlePlayerWin: (combatData: PvPData) => Promise<void>;
    handleEnemyWin: (combatData: PvPData) => Promise<void>;
    mapState: MapData;
    mapDispatch: any;
    currentMessage: string;
    setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
    messageList: any;
    setMessageList: React.Dispatch<React.SetStateAction<any>>;
    liveGameplay: boolean;
    setLiveGameplay: React.Dispatch<React.SetStateAction<boolean>>;
    instantUpdate: (response: any) => Promise<void>;
    statusUpdate: (response: any) => Promise<void>;
    softUpdate: (response: any) => Promise<void>;
    handleInitiate: (pvpState: PvPData) => Promise<void>;
    handlePvPInitiate: (pvpState: PvPData) => Promise<void>;
    handleInstant: (e: { preventDefault: () => void; }) => Promise<void>;
    handlePrayer: (e: { preventDefault: () => void; }) => Promise<void>;
    clearOpponent: () => Promise<void>;
    getAsceanCoords: (x: number, y: number, map: any) => Promise<any>;
    generateWorld: (mapName: string) => Promise<void>;
    emergencyText: any[];
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    moveTimer: number;
    setMoveTimer: React.Dispatch<React.SetStateAction<number>>;
    asceanState: any;
    setAsceanState: React.Dispatch<React.SetStateAction<any>>;
    getOpponent: (player: Player) => Promise<void>;
    getNPCDialog: (enemy: string) => Promise<void>;
    autoAttack: (combatData: PvPData) => Promise<void>;
    checkPlayerTiles: (mapData: MapData) => Promise<void>;
};

const GameChat = ({ checkPlayerTiles, state, dispatch, playerState, playerDispatch, gameState, gameDispatch, mapState, mapDispatch, specState, specDispatch, asceanState, setAsceanState, autoAttack, getOpponent, getNPCDialog, emergencyText, setEmergencyText, moveTimer, setMoveTimer, timeLeft, setTimeLeft, getAsceanCoords, generateWorld, clearOpponent, handleInitiate, handlePvPInitiate, handleInstant, handlePrayer, liveGameplay, setLiveGameplay, instantUpdate, statusUpdate, softUpdate, handlePlayerWin, handleEnemyWin, currentMessage, setCurrentMessage, messageList, setMessageList, user, ascean, enemy, spectator, room, socket, setShowChat, handleRoomReset, handleSocketEvent }: Props) => {
    const [modalShow, setModalShow] = useState(false);
    const [duelReady, setDuelReady] = useState<boolean>(false);

    useEffect(() => {
        if (mapState?.player1Tile === undefined) return;
        console.log(mapState?.player1Tile, mapState?.player2Tile, mapState?.player3Tile, mapState?.player4Tile, "Player Tiles");
        checkPlayerTiles(mapState);
    }, [mapState?.player1Tile, mapState?.player2Tile, mapState?.player3Tile, mapState?.player4Tile]);

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

    const spectatePlayer = async (spectateID: string) => {
        const data = { spectator: ascean._id, spectate: spectateID };
        try { 
            await socket.emit(`spectatePlayer`, data);
        } catch (err: any) { 
            console.log(err.message, 'Error With Spectate Player') };
    };

    function checkPlayer () {
        if (playerState.playerOne && playerState.playerTwo && playerState.playerThree && playerState.playerFour) {
            return true;
        } else {
            return false;
        };
    };

    return (
        <>
        { liveGameplay ?
            <>
            <GamePvP 
                state={state} dispatch={dispatch} playerState={playerState} playerDispatch={playerDispatch} mapState={mapState} mapDispatch={mapDispatch} 
                gameState={gameState} gameDispatch={gameDispatch} user={user} spectator={spectator} ascean={ascean} enemy={enemy} autoAttack={autoAttack}
                room={room} socket={socket} setModalShow={setModalShow} getAsceanCoords={getAsceanCoords} generateWorld={generateWorld} instantUpdate={instantUpdate}
                handleSocketEvent={handleSocketEvent} handlePlayerWin={handlePlayerWin} handleEnemyWin={handleEnemyWin} statusUpdate={statusUpdate} softUpdate={softUpdate}
                handleInitiate={handleInitiate} handlePrayer={handlePrayer} handleInstant={handleInstant} clearOpponent={clearOpponent}
                emergencyText={emergencyText} setEmergencyText={setEmergencyText} asceanState={asceanState} setAsceanState={setAsceanState}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft} moveTimer={moveTimer} setMoveTimer={setMoveTimer}  getOpponent={getOpponent} getNPCDialog={getNPCDialog}
                specState={specState} specDispatch={specDispatch} handlePvPInitiate={handlePvPInitiate}
            />
            <Modal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                centered
                id="modal-weapon"
                style={{ zIndex: 99999 }}
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
            { playerState.playerOne ? (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                    <h3 style={{ fontWeight: 500, fontSize: 20 + 'px', color: 'gold', fontVariant: 'small-caps' }}>
                    {playerState.playerOne.ascean.name}
                    </h3>
                    <p>Level: {playerState.playerOne.ascean.level} | {playerState.playerOne.ascean.mastery}
                    </p>
                    { mapState.player1Tile && mapState?.player1Tile?.content === 'enemy' ? (
                        <span style={{ float: "right", marginTop: "-10%" }}>
                            <Button variant='' style={{ color: "gold", marginTop: "-25%" }} onClick={() => spectatePlayer(playerState?.playerOne?.ascean._id)}>
                            Spectate</Button>
                        </span>
                    ) : ( '' ) }
                    <span style={{ float: "left", marginTop: "-20%" }}>
                    <img src={process.env.PUBLIC_URL + `/images/` + playerState.playerOne.ascean.origin + '-' + playerState.playerOne.ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "12.5vw", borderRadius: "50%", border: "2px solid purple" }} />
                    </span>
                </div>
            ) : ( '' ) }
            { playerState.playerTwo ? (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                    <h3 style={{ fontWeight: 500, fontSize: 20 + 'px', color: 'purple', fontVariant: 'small-caps' }}>
                    {playerState.playerTwo.ascean.name}
                    </h3>
                    <p>Level: {playerState.playerTwo.ascean.level} | {playerState.playerTwo.ascean.mastery}</p>
                    { mapState.player2Tile && mapState.player2Tile.content === 'enemy' ? (
                        <span style={{ float: "right", marginTop: "-10%" }}>
                            <Button variant='' style={{ color: "gold", marginTop: "-25%" }} onClick={() => spectatePlayer(playerState?.playerTwo?.ascean._id)}>
                            Spectate</Button>
                        </span>
                    ) : ( '' ) }
                    <span style={{ float: "left", marginTop: "-20%" }}>
                    <img src={process.env.PUBLIC_URL + `/images/` + playerState.playerTwo.ascean.origin + '-' + playerState.playerTwo.ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "12.5vw", borderRadius: "50%", border: "2px solid purple" }} />
                    </span>
                </div>
            ) : ( '' ) }
            { playerState.playerThree ? (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                    <h3 style={{ fontWeight: 500, fontSize: 20 + 'px', color: 'blue', fontVariant: 'small-caps' }}>
                    {playerState.playerThree.ascean.name}
                    </h3>
                    <p>Level: {playerState.playerThree.ascean.level} | {playerState.playerThree.ascean.mastery}</p>
                    { mapState.player3Tile && mapState.player3Tile.content === 'enemy' ? (
                        <span style={{ float: "right", marginTop: "-10%" }}>
                            <Button variant='' style={{ color: "gold", marginTop: "-25%" }} onClick={() => spectatePlayer(playerState?.playerThree?.ascean._id)}>
                            Spectate</Button>
                        </span>
                    ) : ( '' ) }
                    <span style={{ float: "left", marginTop: "-20%" }}>
                    <img src={process.env.PUBLIC_URL + `/images/` + playerState.playerThree.ascean.origin + '-' + playerState.playerThree.ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "12.5vw", borderRadius: "50%", border: "2px solid purple" }} />
                    </span>
                </div>
            ) : ( '' ) }
            { playerState.playerFour ? (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                    <h3 style={{ fontWeight: 500, fontSize: 20 + 'px', color: 'red', fontVariant: 'small-caps' }}>
                    {playerState.playerFour.ascean.name}
                    </h3>
                    <p>Level: {playerState.playerFour.ascean.level} | {playerState.playerFour.ascean.mastery}</p>
                    { mapState.player4Tile && mapState.player4Tile.content === 'enemy' ? (
                        <span style={{ float: "right", marginTop: "-10%" }}>
                            <Button variant='' style={{ color: "gold", marginTop: "-25%" }} onClick={() => spectatePlayer(playerState?.playerFour?.ascean._id)}>
                            Spectate</Button>
                        </span>
                    ) : ( '' ) }
                    <span style={{ float: "left", marginTop: "-20%" }}>
                    <img src={process.env.PUBLIC_URL + `/images/` + playerState.playerFour.ascean.origin + '-' + playerState.playerFour.ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "12.5vw", borderRadius: "50%", border: "2px solid purple" }} />
                    </span>
                </div>
            ) : ( '' ) }
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