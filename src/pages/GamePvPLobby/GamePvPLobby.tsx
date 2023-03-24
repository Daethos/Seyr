import { useEffect, useState, useReducer } from 'react'
import * as asceanAPI from '../../utils/asceanApi';
import * as io from 'socket.io-client'
import Container from 'react-bootstrap/Container'
import Loading from '../../components/Loading/Loading'
import GameChat from '../../components/GameCompiler/GameChat';
import { ACTIONS, initialPvPData, PvPStore, PLAYER_ACTIONS, initialPlayerData, PlayerStore } from '../../components/GameCompiler/PvPStore';
import { GAME_ACTIONS, GameStore, initialGameData, Ascean, Enemy, Player, NPC } from '../../components/GameCompiler/GameStore';

let socket: any;

interface Props {
    user: any;
};

const GamePvPLobby = ({ user }: Props) => {
    const [state, dispatch] = useReducer(PvPStore, initialPvPData);
    const [playerState, playerDispatch] = useReducer(PlayerStore, initialPlayerData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);

    const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
    const [ascean, setAscean] = useState<any>({});
    const [opponent, setOpponent] = useState<any>(null);
    const [username, setUsername] = useState<any>('');
    const [enemyPlayer, setEnemyPlayer] = useState<any>(null);
    const [users, setUsers] = useState<any>([]);
    const [spectator, setSpectator] = useState<boolean>(false);
    const [room, setRoom] = useState<any>("");
    const [showChat, setShowChat] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [socketConnected, setSocketConnected] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const [loadingAscean, setLoadingAscean] = useState<boolean>(false);

    useEffect(() => {
        socket = io.connect("http://localhost:3001") 
        // "http://localhost:3001" When Tinkering Around 
        // "https://ascea.herokuapp.com" When Deploying
        socket.emit("setup", user);
        socket.on("Connected", () => setSocketConnected(true));

        socket.on('typing', () => setIsTyping(true));
        socket.on('stop_typing', () => setIsTyping(false));

        socket.on('player_data', async (player: any) => {
            dispatch({ type: ACTIONS.SET_PLAYER, payload: player });
        });

        socket.on('new_user', async (userData: any) => {
            if (userData.user._id === user._id && userData.player !== 1) {
                await socket.emit(`request_new_player`);
            };
            console.log(userData, 'New User');
            switch (userData.player) {
                case 1:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_ONE, payload: userData });
                    break;
                case 2:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_TWO, payload: userData });
                    break;
                case 3:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_THREE, payload: userData });
                    break;
                case 4:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_FOUR, payload: userData });
                    break;
                default:
                    break;
            };
        });

        socket.on(`player_position`, async (player: any) => {
            dispatch({ type: ACTIONS.SET_PLAYER_POSITION, payload: player });
        });

        socket.on(`requesting_player_data`, async () => {
            await socket.emit(`player_data_responding`);
        });
        socket.on(`new_player_data_response`, async (data: any) => {
            console.log(data, 'Data Response from other Player');
            switch (data.player) {
                case 1:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_ONE, payload: data });
                    break;
                case 2:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_TWO, payload: data });
                    break;
                case 3:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_THREE, payload: data });
                    break;
                case 4:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_FOUR, payload: data });
                    break;
                default:
                    break;
            };
        });

        // socket.on(`update_ascean`, async (asceanData: any) => {
        //     console.log(asceanData, 'Did the opponent make it?');
        //     await setOpponentAscean(asceanData.ascean);
        //     setEnemyPlayer(asceanData.user);
        // });

        
        socket.on(`combat_response`, (response: any) => {
            console.log(response, 'Combat Response!');
            // TODO:FIXME: DISPATCH
            // statusUpdate(response);
        });
        
        socket.on(`duel_ready_response`, async (data: any) => {
        // TODO:FIXME: DISPATCH
        //         setCombatData(data);
        });
    }, []);

    useEffect(() => {
        getUserAscean();
    }, []);

    const setPlayerOrder = async (you: any, enemy: any) => {
        setLoading(true);
        try {   
            console.log(you, enemy, 'Hey are you two doing?')
        setLoading(false);

        } catch (err: any) {
            console.log('Error Setting Player Order');
        };
    };

    useEffect(() => { console.log(gameState, "GameState") }, [gameState]);

    useEffect(() => { console.log(playerState, "playerState") }, [playerState]);

    // useEffect(() => {
    //     if (enemyData && yourData) {
    //         console.log(enemyData, 'Setting Up Both Players!');
    //         setPlayerOrder(yourData, enemyData);
    //     } else {
    //         console.log('Halfway!');
    //     };
    // }, [enemyData, yourData]);

    // useEffect(() => {
    //     console.log(users, 'New User');
    //     socket.emit(`share_combatdata`, combatData);

    // }, [users]);



    useEffect(() => {
        console.log(opponent, 'Did the Opponent set correctly?');
    }, [opponent]);

    useEffect(() => {
        const findAscean = asceanVaEsai.filter(
            (ascean: { _id: any }) => ascean._id === username
        );
        const response = findAscean;
        console.log(response[0], 'Response in Filtering Ascean');
        gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: response[0] });
        //TODO:FIXME: DISPATCH
    }, [username]);

    const getUserAscean = async () => {
        try {
            const response = await asceanAPI.getAllAscean();
            console.log(response.data, 'User Ascean in Game Lobby');
            setAsceanVaEsai([...response.data.reverse()]);
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message, 'Error Retrieving User Ascean');
        };
    };

    const joinRoom = async () => {
        if (username !== '' && room !== '') {
            console.log(`Connecting to Room: ${room}`);
            const asceanData = {
                ascean: gameState.player,
                room: room,
                user: user,
                combatData: state
            };
            socket.emit("join_room", asceanData);
            socket.on("room_full", () => {
                console.log('Room is full!');
            });
            socket.on("join_room", () => {
                console.log('Socket working on the Front-End inside room: ' + room);
            });
            await socket.emit(`ascean`, asceanData);
            setShowChat(true);
        };
    };

    function handleAscean(e: any) {
        console.log(e.target.value, 'What do we have here?');
        setUsername(e.target.value);
        //TODO:FIXME: DISPATCH
    };

    function handleRoom(e: any) {
        console.log(e.target.value);
        setRoom(e.target.value);
        //TODO:FIXME: DISPATCH
    };

    function handleRoomReset() {
        setShowChat(false);
        
    };

    useEffect(() => {
        console.log(state, '(You)');
    }, [state]);

    if (loading || loadingAscean) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <>
        { !showChat 
            ? 
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
            {/* <h4>Choose a prospective Ascean to duel with, and either create a join an existing room to fight against an opponent.</h4> */}
                <div className='' style={{  }}>
            <select value={username} onChange={handleAscean} style={{ width: 45 + '%', marginRight: 10 + '%' }}>
                <option>Ascean</option>
                {asceanVaEsai.map((ascean: any, index: number) => {
                    return (
                        <option value={ascean._id} key={index}>{ascean.name}</option>
                    )
                })}
            </select>
            <input className='my-1' type='text' placeholder='Room ID...' onChange={handleRoom} style={{ width: 45 + '%' }}/>
                </div>
            <button className='btn btn-outline-info my-2' onClick={joinRoom}> Join Room </button>
            </Container>
            : 
            <GameChat 
                state={state} dispatch={dispatch} playerState={playerState} playerDispatch={playerDispatch} gameState={gameState} gameDispatch={gameDispatch} 
                user={user} ascean={gameState.player} spectator={spectator} opponent={gameState.opponent} enemyPlayer={enemyPlayer} 
                handleRoomReset={handleRoomReset} room={room} setShowChat={setShowChat} socket={socket} 
            />
        }
        </>

    )
}

export default GamePvPLobby