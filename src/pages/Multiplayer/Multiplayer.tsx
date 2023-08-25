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
interface Props {
    user: User
};

const Multiplayer = ({ user }: Props) => {
    const [assets, setAssets] = useState<any>([]);
    const dispatch = useDispatch();
    const gameChange = useSelector((state: any) => state.game.gameChange);
    const asceans = useSelector((state: any) => state.user.ascean) as Player[];
    const ascean = useSelector((state: any) => state.game.player) as Player;
    const [password, setPassword] = useState<any>('');
    const [room, setRoom] = useState<any>('');
    const [username, setUsername] = useState<any>('');

    useEffect(() => {
        dispatch(getUserAsceanFetch());
    }, [dispatch]);

    // useEffect(() => {
    //     const fetchData = async (): Promise<void> => {
    //         try {
    //             dispatch(getGameFetch('asceanID'));
    //             const res = await eqpAPI.index();
    //             const sanitized = await sanitizeAssets(res.data);
    //             setAssets(sanitized);
    //             dispatch(setGameChange(true));
    //         } catch (err: any) {
    //             console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
    //         };
    //     }; 
    //     fetchData(); 
    // }, [dispatch]); 

    useEffect(() => {
        if (username === '') return;
        console.log(username, "Fetching This ID")
        fetchData();
    }, [username]);
    
    const fetchData = async (): Promise<void> => {
        try {
            dispatch(getGameFetch(username));
            // const res = await eqpAPI.index();
            // const sanitized = await sanitizeAssets(res.data);
            // setAssets(sanitized);
            // dispatch(setGameChange(true));
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
        };
    }; 

    const sanitizeAssets = async (assets: any): Promise<[]> => {
        const fields = ['weapons', 'shields', 'helmets', 'chests', 'legs', 'rings', 'amulets', 'trinkets'];
        const array: any = [];
        const imageSprite = async (url: string): Promise<string> => url.split('/')[2].split('.')[0];

        await Promise.all(fields.map(async (field: string) => {
            await Promise.all(assets[field].map(async (item: any) => {
                const sprite = await imageSprite(item.imgURL);
                array.push({
                    sprite: sprite,
                    imgURL: item.imgURL,
                });
            }));
        }));
        return array;
    };

    const joinRoom = async () => {
        if (username !== '' && room !== '') {
            const asceanData = {
                user: user,
                room: room,
                password: password,
            };
            const compressAsceanData = await compress(asceanData);
            // await socket.emit("join_room", compressAsceanData, (error: any) => {
            //     if (error) {
            //         console.log(error, "Error Joining Room");
            //         const messageData = {
            //             room: room,
            //             author: user.username,
            //             message: `Error Joining Room: ${error}`,
            //             time: Date.now()
            //         };
            //         setMessageList((list: any) => [...list, messageData]);
            //         return;
            //     };
            // });
            // await socket.emit(`ascean`, compressAsceanData);
            // setShowChat(true);
        };
    };
        
    return (
        <div>
            <div style={{ maxWidth: '75%', marginLeft: '12.5%', marginTop: '5%' }}>
            <div>
                <input className='my-1' type='text' placeholder='Room ID...' onChange={(e) => setRoom(e.target.value)} style={{ width: '39%' }}/>{' '}
                <input className='my-1' type='text' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} style={{ width: '39%' }}/>{' '}
                <button className='btn btn-outline-info my-1' onClick={joinRoom} style={{ width: '20%' }}>Join Room</button>
            </div>
            <select value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '45%', marginRight: '10%' }}>
                <option>Ascean</option>
                {asceans.map((ascean: Player, index: number) => {
                    return (
                        <option value={ascean._id} key={index}>{ascean.name} - Level: {ascean.level}</option>
                    )
                })}
            </select>
            { ascean._id === username && (
                <SolaAscean ascean={ascean} />
            ) }
                </div>
            { gameChange && ( 
                <HostScene /> 
            ) }
        </div>
    );
};

export default Multiplayer;