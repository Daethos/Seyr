import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
import { setIsTyping, setMessageList, setPassword, setRoom, setShowChat } from '../../game/reducers/phaserState';
import MultiChat from '../../game/ui/MultiChat';

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

const useSocketEvent = (event: string, callback: any) => {
    const socket = getSocketInstance();
    useEffect(() => {
        socket.on(event, callback);
        return () => {
            socket.off(event, callback);
        };
    }, [event, callback]);
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
    const socket = getSocketInstance();
    
    useEffect(() => {
        dispatch(getUserAsceanFetch());
    }, [dispatch]);

    useEffect(() => {
        if (asceanId === '') return;
        fetchData();
        // dispatch(getGameFetch(asceanId));
    }, [asceanId]);
    
    const fetchData = async (): Promise<void> => {
        try {
            dispatch(getGameFetch(asceanId));
            const asceanData = {
                user: user,
                ascean: ascean,
                room: phaser.room,
                password: phaser.password,
                x: 0,
                y: 0,
            };
            const compressAsceanData = compress(asceanData);
            socket.emit('joinRoom', compressAsceanData, (error: any) => {
                if (error) {
                    const errorMessage = {
                        room: phaser.room,
                        author: 'The Ascea',
                        message: `Error Joining Room: ${error}`,
                        time: Date.now()
                    };
                    dispatch(setMessageList([...phaser.messageList, errorMessage]));
                    return;
                };
            });
            const messageData = {
                room: phaser.room,
                author: user.username,
                message: 'Entering Lobby',
                time: Date.now()
            };
            dispatch(setMessageList([...phaser.messageList, messageData]));
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
        };
    };  

    function joinRoom(): void {
        if (asceanId === '') {
            dispatch(setMessageList([...phaser.messageList, {
                room: phaser?.room,
                author: 'The Ascea',
                message: 'You must choose an Ascean before joining a room.',
                time: Date.now()
            }]));
            return;
        };
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
        socket.emit("joinRoom", compressAsceanData, (error: any) => {
            if (error) {
                const messageData = {
                    room: phaser.room,
                    author: 'The Ascea',
                    message: `Error Joining Room: ${error}`,
                    time: Date.now()
                };
                dispatch(setMessageList([...phaser.messageList, messageData]));
                return;
            };
        });
        dispatch(setShowChat(true));
    };

    function handleRoomReset(): void {
        socket.emit("leaveRoom");
        dispatch(setShowChat(false));
    };

    function currentPlayers(players: any): void {
        console.log(players, "Current Players?");
    };

    function playerAdded(player: any): void {
        console.log(player, "Player Added?");
    };

    useSocketEvent('currentPlayers', currentPlayers);
    useSocketEvent('playerAdded', playerAdded);

    useSocketEvent('receiveMessage', (messageData: any) => dispatch(setMessageList([...phaser.messageList, messageData])));
    useSocketEvent('typing', () => dispatch(setIsTyping(true)));
    useSocketEvent('stopTyping', () => dispatch(setIsTyping(false)));
        
    return (
        <div>
            <h3 style={{ color: '#fdf6d8', textAlign: 'center', marginTop: '3%', fontSize: '32px' }}>Multiplayer</h3>
            {/* { phaser.showChat && ( */}
                <MultiChat ascean={ascean} user={user} socket={socket} handleRoomReset={handleRoomReset} />
            {/* )} */}
            <div style={{ maxWidth: '75%', marginLeft: '12.5%', marginTop: '3%' }}>
                { !phaser.showChat && (
                    <div>
                        <input className='my-1' type='text' placeholder='Room ID...' onChange={(e) => dispatch(setRoom(e.target.value))} style={{ width: '39%' }}/>{' '}
                        <input className='my-1' type='text' placeholder='Password...' onChange={(e) => dispatch(setPassword(e.target.value))} style={{ width: '39%' }}/>{' '}
                        <button className='btn btn-outline-info my-1' onClick={joinRoom} style={{ width: '20%' }}>Join Room</button>
                    </div>
                ) }
            <select value={asceanId} onChange={(e) => setAsceanId(e.target.value)} style={{ width: '50%', marginLeft: '25%' }}>
                <option>Ascean</option>
                {asceans.map((ascean: Player, index: number) => {
                    return (
                        <option value={ascean._id} key={index}>{ascean.name} - Level: {ascean.level}</option>
                    )
                })}
            </select>
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