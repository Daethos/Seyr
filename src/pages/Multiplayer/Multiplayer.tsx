import { useEffect, useState } from 'react'
import HostScene from '../../game/scenes/HostScene';
import { useDispatch, useSelector } from 'react-redux';
import { getGameFetch } from '../../game/reducers/gameState';
import EventEmitter from '../../game/phaser/EventEmitter';
import { Player } from '../../components/GameCompiler/GameStore';
import { getUserAsceanFetch } from '../../game/reducers/userState';
import { compress } from '../../sagas/combatSaga';
import { User } from '../App/App';
import SolaAscean from '../../components/SolaAscean/SolaAscean';
import { getSocketInstance } from '../../sagas/socketManager';
import { setIsTyping, setMessageList, setPassword, setPlayers, setRoom, setSelf, setShowChat, setPhaserGameChange, getPhaserAssets, setRemovePlayer } from '../../game/reducers/phaserState';
import MultiChat from '../../game/ui/MultiChat';
import { Socket } from 'socket.io-client';

interface Multiplayer {
    id: string;
    ascean: Player;
    position: number;
    room: string;
    ready: boolean;
    user: User;
    x: number;
    y: number;
};

export const usePhaserEvent = (event: string, callback: any) => {
    useEffect(() => {
        EventEmitter.on(event, callback);
        return () => {
            EventEmitter.off(event, callback);
        };
    }, [event, callback]);
};

export const useKeyEvent = (event: string, callback: any) => {
    useEffect(() => {
        const eventListener = (event: Event) => callback(event);
        window.addEventListener(event, eventListener);
        return () => {
            window.removeEventListener(event, eventListener);
        };
    }, [event, callback]);
};

const useSocketEvent = (websocket: Socket, event: string, callback: any) => {
    useEffect(() => {
        websocket.on(event, callback);
        return () => {
            websocket.off(event, callback);
        };
    }, [websocket, event, callback]);
};

interface Props {
    user: User
};

const Multiplayer = ({ user }: Props) => {
    const dispatch = useDispatch();
    const asceans = useSelector((state: any) => state.user.ascean) as Player[];
    const ascean = useSelector((state: any) => state.game.player) as Player;
    const [asceanId, setAsceanId] = useState<any>('');
    const phaser = useSelector((state: any) => state.phaser);
    const [gameRoom, setGameRoom] = useState<string>('')
    // let socket: Socket = getSocketInstance();
    const [socket, setSocket] = useState<Socket>(getSocketInstance());
    
    useEffect(() => {
        dispatch(getUserAsceanFetch());
        dispatch(getPhaserAssets());
        joinLobby();
    }, [dispatch]);

    useEffect(() => {
        if (asceanId === '') return;
        fetchData();
    }, [asceanId]);

    useEffect(() => {
        currentPlayers(phaser.players);
    }, [phaser.players])

    useEffect(() => {
        socket.emit('requestPlayers', socket.id);
    }, [phaser.room, socket])
    
    const fetchData = async (): Promise<void> => {
        try {
            dispatch(getGameFetch(asceanId)); 
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
        };
    };  

    function joinLobby(): void {
        if (!socket.id) setSocket(getSocketInstance());
        const asceanData = {
            user: user,
            ascean: ascean,
            room: 'Lobby',
            password: 'Lobby',
            x: 200,
            y: 200,
        };
        const compressAsceanData = compress(asceanData);
        socket.emit('joinRoom', compressAsceanData, (error: any) => {
            if (error) {
                const errorMessage = {
                    room: phaser.room,
                    sender: 'The Ascea',
                    message: `Error Joining Room: ${error}`,
                    time: Date.now()
                };
                dispatch(setMessageList([...phaser.messageList, errorMessage]));
                return;
            } else {
                dispatch(setRoom('Lobby'));
                dispatch(setPassword('Lobby'));
            };
        });
        const message = {
            room: phaser.room,
            sender: user,
            message: 'Entering Lobby',
            time: Date.now()
        };
        dispatch(setMessageList([...phaser.messageList, message])); 
    };

    function joinRoom(): void {
        if (asceanId === '') {
            dispatch(setMessageList([...phaser.messageList, {
                room: gameRoom,
                sender: 'The Ascea',
                message: 'You must choose an Ascean before joining a room.',
                time: Date.now()
            }]));
            return;
        };
        if (phaser.playerCount > 1) resetPlayers(phaser.players);
        socket.emit("leaveRoom");
        dispatch(setPlayers({}))

        const strippedAscean = {
            _id: ascean._id,
            name: ascean.name,
            level: ascean.level,
            health: ascean.health,
            weapon_one: ascean.weapon_one,
            weapon_two: ascean.weapon_two,
            weapon_three: ascean.weapon_three,
            helmet: ascean.helmet,
            chest: ascean.chest,
            legs: ascean.legs,
            amulet: ascean.amulet,
            ring_one: ascean.ring_one,
            ring_two: ascean.ring_two,
            trinket: ascean.trinket,
        };
        console.log(strippedAscean, "The Lighter Ascean being Utilized for the Players Object")
        const asceanData = {
            user: user,
            ascean: strippedAscean,
            room: gameRoom,
            password: phaser.password,
            x: 200,
            y: 200,
        };
        const compressAsceanData = compress(asceanData);
        const message = {
            room: gameRoom,
            sender: user,
            message: `Entering: ${gameRoom}`,
            time: Date.now()
        };
        dispatch(setMessageList([...phaser.messageList, message])); 
        socket.emit("joinRoom", compressAsceanData, (error: any) => {
            if (error) {
                const errorMsg = {
                    room: gameRoom,
                    sender: 'The Ascea',
                    message: `Error Joining Room: ${error}`,
                    time: Date.now()
                };
                dispatch(setMessageList([...phaser.messageList, errorMsg]));
                return;
            };
        });
        dispatch(setRoom(gameRoom));
        dispatch(setShowChat(true));
    };

    function handleRoomReset(): void {
        socket.emit('removePlayer', socket.id);
        socket.emit("leaveRoom");
        dispatch(setPlayers({}));
        dispatch(setShowChat(false));
        joinLobby();
    };

    function addSelf(player: Multiplayer) {
        console.log('SELF', player.ascean)
        dispatch(setSelf(player));
        dispatch(setPlayers({ ...phaser.players, [player.id]: player }));
        socket.emit('requestPlayers', socket.id);
    };

    function addPlayer(player: Multiplayer) {
        console.log('OTHER', player.ascean)
        dispatch(setPlayers({ ...phaser.players, [player.id]: player }));
        socket.emit('playerAdded', player);
    }; 

    function currentPlayers(players: any): void {
        Object.keys(players).forEach((id: string) => {
            const existingPlayer = phaser.players[id];
            if (!existingPlayer) {
                console.log(players[id].ascean, 'pinged: currentPlayers')
                dispatch(setPlayers({...phaser.players, [id]: players[id]}));
                socket.emit('playerAdded', players[id]);
            };
        });
    };

    // Realized that because you join a lobby first and you have your character, the .ascean is {} empty, and needs to be essentially reimplemented
    // So I have to marry or also set the phaser.self when I set the socket.emit perhaps? Just make sure I ping itself so it gets itself, so to speak.

    function playerAdded(player: Multiplayer): void {
        const existing = phaser.players[player.id];
        if (existing) return;
        if (player.id === socket.id) {
            addSelf(player);
        } else {
            addPlayer(player);
        };
    };

    function removePlayer(id: string): void {
        console.log(id, 'Player ID being Removed')
        // dispatch(setRemovePlayer(id));
        // console.log(players, id, 'Players and ID being Removed')
        // console.log(players[id], 'Player Before Removal')
        let players = { ...phaser.players };
        if (players[id]) delete players[id];
        console.log(players, 'Players After Removal')
        dispatch(setPlayers(players));
    };

    //TODO:FIXME: Order of Operations and Timing for Sockets/Redux-Saga TODO:FIXME:
    // Player joins room: (2) Events occur: 
    // The player joining pings and gives a copy of themself to everyone present
    // The player pings the room to give copies of themself?
    // Or the people present in turn send a copy of themself to the specific player?
    // Can specifically ping socket.id's, use that method

    // When a player leaves a room, (2) Events occur:
    // Player leaving removes everyone else from his players object
    // Other players remove leaving player from their players object

    // That should be everything, tackle this tomorrow

    function playerRequested(id: string): void {
        socket.emit('sendPlayer', { id, player: phaser.self});
    };

    function resetPlayers(players: any): void {
        let keys = { ...players }; // Deep Copy, not Reference
        Object.keys(keys).forEach((id: string) => {
            if (id !== socket.id) {
                delete keys[id];
                socket.emit('playerRemoved', id);
            };
        });
        dispatch(setPlayers(keys));
    };

    function startGame(): void {
        socket.emit('startGame');
    };

    usePhaserEvent('playerMoving', (data: any) => {
        const move = { ...data, id: socket.id };
        socket.emit('playerMoving', move);
    });
    useSocketEvent(socket, 'playerMoved', (data: any) => {
        // console.log(data, 'Player Moved')
        EventEmitter.emit('playerMoved', data);
    });

    useSocketEvent(socket, 'playerRequested', playerRequested);
    useSocketEvent(socket, 'gameStarted', () => dispatch(setPhaserGameChange(true)));
    useSocketEvent(socket, 'currentPlayers', currentPlayers);
    useSocketEvent(socket, 'playerAdded', playerAdded);
    useSocketEvent(socket, 'playerMoved', (player: any) => dispatch(setPlayers({...phaser.players, [player.id]: { ...phaser.players[player.id], x: player.x, y: player.y }})));
    useSocketEvent(socket, 'removePlayer', removePlayer);
    useSocketEvent(socket, 'receiveMessage', (message: any) => dispatch(setMessageList([...phaser.messageList, message])));
    useSocketEvent(socket, 'typing', (_flag: any) => dispatch(setIsTyping(true)));
    useSocketEvent(socket, 'stopTyping', (_flag: any) => dispatch(setIsTyping(false)))
        
    return (
        <div>
            { phaser.gameChange ? ( 
                <HostScene /> 
            ) : (
                <>
                <div style={{ width: '75%', marginLeft: '12.5%', marginTop: '2%', fontFamily: 'Cinzel' }}>
                { !phaser.showChat && (
                    <div>
                        <select className='my-1' value={asceanId} onChange={(e) => setAsceanId(e.target.value)} >
                            <option>Ascean</option>
                            {asceans.map((ascean: Player, index: number) => {
                                return (
                                    <option value={ascean._id} key={index}>{ascean.name} - Level: {ascean.level}</option>
                                )
                            })}
                        </select><br />
                        <input className='my-1' type='text' placeholder='Room ID...' onChange={(e) => setGameRoom(e.target.value)}/><br />
                        <input className='my-1' type='text' placeholder='Password...' onChange={(e) => dispatch(setPassword(e.target.value))}/><br />
                        <button className='btn btn-outline-info my-1' onClick={joinRoom} style={{ width: '20%' }}>Join Room</button>
                    </div>
                ) }
                </div>
                <MultiChat ascean={ascean} user={user} socket={socket} handleRoomReset={handleRoomReset} />
                { Object.keys(phaser.players).length > 0 && phaser.room !== 'Lobby' && ( 
                    <button className='btn btn-outline-success mt-3' onClick={startGame} style={{ width: '20%', marginLeft: '40%' }}>Start Game</button>
                )}
                <div className='mt-4' style={{ width: '85%', marginLeft: '7.5%' }}>
                    { ascean._id === asceanId && (
                        <SolaAscean ascean={ascean} />
                    ) }
                </div>
                </>
            ) }
        </div>
    );
};

export default Multiplayer;