import { useEffect, useState } from 'react'
import * as eqpAPI from '../../utils/equipmentApi';
import * as asceanAPI from '../../utils/asceanApi';
import HostScene from '../../game/scenes/HostScene';
import { useDispatch, useSelector } from 'react-redux';
import { getGameFetch, setGameChange } from '../../game/reducers/gameState';
import EventEmitter from '../../game/phaser/EventEmitter';
import { Player } from '../../components/GameCompiler/GameStore';
import { getUserAsceanFetch } from '../../game/reducers/userState';
import { compress } from '../../sagas/combatSaga';
import { User } from '../App/App';
import SolaAscean from '../../components/SolaAscean/SolaAscean';
import { getSocketInstance } from '../../sagas/socketManager';
import { setIsTyping, setMessageList, setPassword, setPlayers, setRoom, setSelf, setShowChat, setSocketId } from '../../game/reducers/phaserState';
import MultiChat from '../../game/ui/MultiChat';
import { Socket } from 'socket.io-client';

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
    // let socket: Socket = getSocketInstance();
    const [socket, setSocket] = useState<Socket>(getSocketInstance());
    
    useEffect(() => {
        dispatch(getUserAsceanFetch());
        joinLobby();
    }, [dispatch]);

    useEffect(() => {
        if (asceanId === '') return;
        fetchData();
    }, [asceanId]);
    
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
            x: 0,
            y: 0,
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
                room: phaser?.room,
                sender: 'The Ascea',
                message: 'You must choose an Ascean before joining a room.',
                time: Date.now()
            }]));
            return;
        };
        socket.emit("leaveRoom");
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
        const asceanData = {
            user: user,
            ascean: strippedAscean,
            room: phaser.room,
            password: phaser.password,
            x: 0,
            y: 0,
        };
        const compressAsceanData = compress(asceanData);
        const message = {
            room: phaser.room,
            sender: user,
            message: `Entering: ${phaser.room}`,
            time: Date.now()
        };
        dispatch(setMessageList([...phaser.messageList, message])); 
        socket.emit("joinRoom", compressAsceanData, (error: any) => {
            if (error) {
                const errorMsg = {
                    room: phaser.room,
                    sender: 'The Ascea',
                    message: `Error Joining Room: ${error}`,
                    time: Date.now()
                };
                dispatch(setMessageList([...phaser.messageList, errorMsg]));
                return;
            };
        });
        dispatch(setShowChat(true));
    };

    function handleRoomReset(): void {
        socket.emit("leaveRoom");
        dispatch(setPlayers({}));
        dispatch(setShowChat(false));
        joinLobby();
    };

    function currentPlayers(players: any): void {
        Object.keys(players).forEach((id: string) => {
            const existingPlayer = phaser.players[id];
            if (!existingPlayer) {
                console.log('Setting Players in currentPlayers', id)
                dispatch(setPlayers({...phaser.players, [id]: players[id]}));
            };
        });
    };

    function playerAdded(player: any): void {
        const existing = phaser.players[player.id];
        if (existing) return;
        
        if (player.id === socket.id) {
            console.log(player, 'Setting Self')
            dispatch(setSelf(player));
        };
        if (player.id !== socket.id && phaser.self) {
            console.log(phaser.players[socket.id], 'Sending Yourself')
            socket.emit('sendPlayer', phaser.self);
        };
        dispatch(setPlayers({ ...phaser.players, [player.id]: player }));
    };

    function addNewPlayer(player: any): void {
        console.log(player, 'New Player')
        dispatch(setPlayers({...phaser.players, [player.id]: player}));
    };

    function removePlayer(id: string): void {
        let players = { ...phaser.players };
        console.log(players, id, 'Players and ID being Removed')
        console.log(players[id], 'Player Before Removal')
        if (players[id]) delete players[id];
        console.log(players, 'Players After Removal')
        dispatch(setPlayers(players));
    };

    useSocketEvent(socket, 'currentPlayers', currentPlayers);
    useSocketEvent(socket, 'playerAdded', playerAdded);
    useSocketEvent(socket, 'newPlayer', addNewPlayer);
    useSocketEvent(socket, 'playerMoved', (player: any) => dispatch(setPlayers({...phaser.players, [player.id]: { ...phaser.players[player.id], x: player.x, y: player.y }})));
    useSocketEvent(socket, 'removePlayer', removePlayer);

    useSocketEvent(socket, 'receiveMessage', (message: any) => dispatch(setMessageList([...phaser.messageList, message])));
    useSocketEvent(socket, 'typing', (_flag: any) => dispatch(setIsTyping(true)));
    useSocketEvent(socket, 'stopTyping', (_flag: any) => dispatch(setIsTyping(false)))
        
    return (
        <div>
            <h3 style={{ color: '#fdf6d8', textAlign: 'center', marginTop: '3%', fontSize: '32px' }}>Multiplayer</h3>
            <MultiChat ascean={ascean} user={user} socket={socket} handleRoomReset={handleRoomReset} />
            <div style={{ width: '75%', marginLeft: '14.5%' }}>
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
                    <input className='my-1' type='text' placeholder='Room ID...' onChange={(e) => dispatch(setRoom(e.target.value))}/><br />
                    <input className='my-1' type='text' placeholder='Password...' onChange={(e) => dispatch(setPassword(e.target.value))}/><br />
                    <button className='btn btn-outline-info my-1' onClick={joinRoom} style={{ width: '20%' }}>Join Room</button>
                </div>
            ) }
            </div>
            <div className='mt-5' style={{ width: '85%', marginLeft: '7.5%' }}>
            { ascean._id === asceanId && (
                <SolaAscean ascean={ascean} />
                ) }
            </div>
            { phaser.gameChange && ( 
                <HostScene /> 
            ) }
        </div>
    );
};

export default Multiplayer;