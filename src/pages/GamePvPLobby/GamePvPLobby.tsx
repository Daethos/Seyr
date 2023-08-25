import { useCallback, useEffect, useState, useReducer } from 'react'
import * as asceanAPI from '../../utils/asceanApi';
import userService from '../../utils/userService';
import * as io from 'socket.io-client'
import Container from 'react-bootstrap/Container'
import Loading from '../../components/Loading/Loading'
import GameChat from '../../components/GameCompiler/GameChat';
import { ACTIONS, initialPvPData, PvPData, PvPStore, PLAYER_ACTIONS, initialPlayerData, PlayerStore, SpectatorStore, SPECTATOR_ACTIONS } from '../../components/GameCompiler/PvPStore';
import { GAME_ACTIONS, GameStore, initialGameData, Enemy, Player } from '../../components/GameCompiler/GameStore';
import { MAP_ACTIONS, MapStore, initialMapData, MapData } from '../../components/GameCompiler/WorldStore';
import { getAsceanTraits } from '../../components/GameCompiler/PlayerTraits';
import { compress } from '../../sagas/combatSaga';

interface Props {
    user: any;
};

const GamePvPLobby = ({ user }: Props) => {
    const [socket, setSocket] = useState<any>(null);
    const [state, dispatch] = useReducer(PvPStore, initialPvPData);
    const [playerState, playerDispatch] = useReducer(PlayerStore, initialPlayerData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
    const [mapState, mapDispatch] = useReducer(MapStore, initialMapData);
    const [specState, specDispatch] = useReducer(SpectatorStore, initialPvPData);
    const [messageList, setMessageList] = useState<any>([]);
    const [liveGameplay, setLiveGameplay] = useState<boolean>(false);
    const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
    const [ascean, setAscean] = useState<any>({});
    const [username, setUsername] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [spectator, setSpectator] = useState<boolean>(false);
    const [room, setRoom] = useState<any>("");
    const [showChat, setShowChat] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false);
    const [asceanState, setAsceanState] = useState({
        ascean: ascean,
        currentHealth: 0,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        level: ascean.level,
        opponent: 0,
        opponentExp: 0,
        experience: ascean.experience,
        experienceNeeded: ascean.level * 1000,
        mastery: ascean.mastery,
        faith: ascean.faith,
    });

    const handleSocketEvent = useCallback((event: string, callback: Function) => {
        if (socket) socket.on(event, callback);
        return () => {
            if (socket) socket.off(event, callback);
        };
    }, [socket]);

      useEffect(() => {
        // "http://localhost:3000" When Tinkering Around 
        // "https://ascea.herokuapp.com" When Deploying
        const newSocket = io.connect('http://localhost:3000', { transports: ['websocket'] });
        setSocket(newSocket);
        newSocket.emit("setup", user);
        return () => {
          newSocket.disconnect();
        };
      }, [user]);

    useEffect(() => {
        const typingCallback = () => setIsTyping(true);
        handleSocketEvent('typing', typingCallback);

        const stopTypingCallback = () => setIsTyping(false);
        handleSocketEvent('stop_typing', stopTypingCallback);

        const playerDataCallback = (player: any) => {
          if (player.user._id === user._id) dispatch({ type: ACTIONS.SET_PLAYER, payload: player.data });
        };
        handleSocketEvent('playerData', playerDataCallback);
    
         

        return () => {
          if (socket) {
                socket.off('playerData', playerDataCallback);
            };
        };
      }, [handleSocketEvent, socket, playerState, mapState, gameState, state]);

    useEffect(() => {
        getUserAscean();
    }, []);    

    useEffect(() => {
        const findAscean = asceanVaEsai.filter(
            (ascean: { _id: any }) => ascean._id === username
        );
        const response = findAscean;
        gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: response[0] });
        if (response.length === 0) return; 
        const getTraits = async (player: any) => {
            const traitResponse = await getAsceanTraits(player);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_TRAITS, payload: traitResponse });
        };
        getTraits(response[0]);
        setAsceanState({
            ...asceanState,
            ascean: response[0],
            currentHealth: response[0].health.current === -10 ? response[0].health.total : response[0].health.current,
            level: response[0].level,
            opponent: 0,
            opponentExp: 0,
            experience: response[0].experience,
            experienceNeeded: response[0].level * 1000,
            mastery: response[0].mastery,
            faith: response[0].faith,
        });
        const getInventory = async (player: any) => {
            const inventoryResponse = await asceanAPI.getAsceanInventory(player);
            gameDispatch({ type: GAME_ACTIONS.SET_INVENTORY, payload: inventoryResponse });
        }; 
        getInventory(response[0]._id);
    }, [username]);

    const getUserAscean = async () => {
        try {
            const response = await asceanAPI.getAllAscean();
            setAsceanVaEsai([...response.data.reverse()]);
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, 'Error Retrieving User Ascean');
        };
    };

    const joinRoom = async () => {
        if (username !== '' && room !== '') {
            const asceanData = {
                ascean: gameState.player,
                password: password,
                room: room,
                user: user,
                combatData: state
            };
            const compressAsceanData = await compress(asceanData);
            await socket.emit("join_room", compressAsceanData, (error: any) => {
                if (error) {
                    console.log(error, "Error Joining Room");
                    const messageData = {
                        room: room,
                        author: user.username,
                        message: `Error Joining Room: ${error}`,
                        time: Date.now()
                    };
                    setMessageList((list: any) => [...list, messageData]);
                    return;
                };
            });
            await socket.emit(`ascean`, compressAsceanData);
            setShowChat(true);
        };
    };

    function handleAscean(e: any) {
        setUsername(e.target.value);
    };

    function handleRoom(e: any) {
        setRoom(e.target.value);
    };

    function handlePassword(e: any) {
        setPassword(e.target.value);
    };

    async function handleRoomReset() {
        await socket.emit("leaveRoom");
        setShowChat(false);
    };

    if (loading || loadingAscean) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <>
        { !showChat && (
            <Container className="Game-Lobby-Chat" style={{ overflow: 'auto' }}>
            <h3 className='welcome-text mt-3'>PvP Lobby</h3>
            <h3 className='welcome-explanation'>
                Welcome one and all to the greatest spectacle this world has seen, a coliseum holding tests of triumph between the steeliest souls across
                the land, arriving in the beautiful fields of Licivitas to have a hand at capturing glory and renown, with the winner achieving the title
                known as the <br /><br /> 
                <div className='ascean'>
                'Ascean va'Esai.'
                </div>
                <br />
                <div className="game">
                Test your will against others in turn-based, rpg combat utilizing a series of weapons and skills to prove you are
                </div>
                <br />
                <div className="aenservaesai">
                'worthy of the preservation of being.'
                </div>
                <div className="aenservaesai mt-3">
                Choose a prospective Ascean to duel with, and either create or join an existing room to fight against an opponent.
                </div>
            </h3>
            <select value={username} onChange={handleAscean} style={{ width: '45%', marginRight: '10%' }}>
                <option>Ascean</option>
                {asceanVaEsai.map((ascean: Player, index: number) => {
                    return (
                        <option value={ascean._id} key={index}>{ascean.name}</option>
                    )
                })}
            </select>
            <div>
                <input className='my-1' type='text' placeholder='Room ID...' onChange={handleRoom} style={{ width: '50%' }}/>
                <input className='my-1' type='text' placeholder='Password...' onChange={handlePassword} style={{ width: '50%' }}/>
            </div>
            <button className='btn btn-outline-info my-2' onClick={joinRoom} > Join Room </button>
            { gameState?.player && (
                <div className='friend-block my-3' style={{ maxWidth: "90%", marginLeft: "5%" }}>
                    <h3 className='mt-2' style={{ fontWeight: 500, fontSize: '24px', color: '#ff0195', fontVariant: 'small-caps' }}>
                    {gameState?.player.name}
                    </h3>
                    <p>Level: {gameState?.player.level} | {gameState?.player.mastery}</p>
                    <span style={{ float: "left", marginTop: "-22%" }}>
                    <img src={process.env.PUBLIC_URL + `/images/` + gameState?.player.origin + '-' + gameState?.player.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "17.5vw", borderRadius: "50%", border: "2px solid #ff0195" }} />
                    </span>
                </div>
            ) }
            </Container>
        ) }
            {/* <GameChat 
                state={state} dispatch={dispatch} playerState={playerState} playerDispatch={playerDispatch} gameState={gameState} gameDispatch={gameDispatch} 
                user={user} ascean={gameState.player} spectator={spectator} enemy={gameState.opponent}  getOpponent={getOpponent} getNPCDialog={getNPCDialog}
                handleRoomReset={handleRoomReset} room={room} setShowChat={setShowChat} socket={socket} handleSocketEvent={handleSocketEvent}
                handlePlayerWin={handlePlayerWin} handleEnemyWin={handleEnemyWin} mapState={mapState} mapDispatch={mapDispatch} autoAttack={autoAttack}
                currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} messageList={messageList} setMessageList={setMessageList}
                liveGameplay={liveGameplay} setLiveGameplay={setLiveGameplay} statusUpdate={statusUpdate} softUpdate={softUpdate} instantUpdate={instantUpdate}
                handleInitiate={handleInitiate} handlePrayer={handlePrayer} handleInstant={handleInstant} clearOpponent={clearOpponent}
                getAsceanCoords={getAsceanCoords} generateWorld={generateWorld} emergencyText={emergencyText} setEmergencyText={setEmergencyText}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft} moveTimer={moveTimer} setMoveTimer={setMoveTimer} asceanState={asceanState} setAsceanState={setAsceanState}
                specState={specState} specDispatch={specDispatch} handlePvPInitiate={handlePvPInitiate} handlePvPPrayer={handlePvPPrayer} handlePvPInstant={handlePvPInstant}
            /> */}
        </>
    );
};

export default GamePvPLobby;