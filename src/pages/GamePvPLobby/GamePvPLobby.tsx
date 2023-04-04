import { useCallback, useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';
import userService from '../../utils/userService';
import * as io from 'socket.io-client'
import Container from 'react-bootstrap/Container'
import Loading from '../../components/Loading/Loading'
import GameChat from '../../components/GameCompiler/GameChat';
import { ACTIONS, initialPvPData, PvPData, PvPStore, PLAYER_ACTIONS, initialPlayerData, PlayerStore } from '../../components/GameCompiler/PvPStore';
import { GAME_ACTIONS, GameStore, initialGameData, Enemy, Player, getAsceanTraits } from '../../components/GameCompiler/GameStore';
import { MAP_ACTIONS, MapStore, initialMapData, MapData } from '../../components/GameCompiler/WorldStore';
import useGameSounds from '../../components/GameCompiler/Sounds';
import { Bear, Wolf } from '../../components/GameCompiler/Animals';
import { getMerchantDialog, getNpcDialog } from '../../components/GameCompiler/Dialog';

interface Props {
    user: any;
};

const GamePvPLobby = ({ user }: Props) => {
    const [socket, setSocket] = useState<any>(null);
    const [state, dispatch] = useReducer(PvPStore, initialPvPData);
    const [playerState, playerDispatch] = useReducer(PlayerStore, initialPlayerData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
    const [mapState, mapDispatch] = useReducer(MapStore, initialMapData);

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState<any>([]);
    const [liveGameplay, setLiveGameplay] = useState<boolean>(false);

    const [asceanVaEsai, setAsceanVaEsai] = useState<any>([]);
    const [ascean, setAscean] = useState<any>({});
    const [username, setUsername] = useState<any>('');
    const [users, setUsers] = useState<any>([]);
    const [spectator, setSpectator] = useState<boolean>(false);
    const [room, setRoom] = useState<any>("");
    const [showChat, setShowChat] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [socketConnected, setSocketConnected] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const [emergencyText, setEmergencyText] = useState<any[]>([])
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [moveTimer, setMoveTimer] = useState<number>(6)
    const { playOpponent, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playCombatRound } = useGameSounds(gameState.soundEffectVolume);
    
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false);
    const navigate = useNavigate();
    const [asceanState, setAsceanState] = useState({
        ascean: ascean,
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
        if (socket) {
          socket.on(event, callback);
        };
    }, [socket]);

      useEffect(() => {
        // "http://localhost:3001" When Tinkering Around 
        // "https://ascea.herokuapp.com" When Deploying
        const newSocket = io.connect('http://localhost:3000');
        setSocket(newSocket);
        return () => {
          newSocket.disconnect();
        };
      }, []);

    useEffect(() => {
        if (socket) socket.emit("setup", user);
        
        const socketConnectedCallback = () => setSocketConnected(true);
        handleSocketEvent('Connected', socketConnectedCallback);
        
        const typingCallback = () => setIsTyping(true);
        handleSocketEvent('typing', typingCallback);

        const stopTypingCallback = () => setIsTyping(false);
        handleSocketEvent('stop_typing', stopTypingCallback);

        const playerDataCallback = (player: any) => {
          if (player.user._id === user._id) dispatch({ type: ACTIONS.SET_PLAYER, payload: player.data });
        };
        handleSocketEvent('player_data', playerDataCallback);
    
        const newUserCallback = async (userData: any) => {
            if (userData.user._id === user._id && userData.player !== 1) {
                await socket.emit(`request_new_player`);
            };
            switch (userData.player) {
                case 1:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_ONE, payload: userData });
                    if (userData.user._id === user._id) dispatch({ type: ACTIONS.SET_PLAYER_POSITION, payload: userData.player });
                    break;
                case 2:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_TWO, payload: userData });
                    if (userData.user._id === user._id) dispatch({ type: ACTIONS.SET_PLAYER_POSITION, payload: userData.player })
                    break;
                case 3:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_THREE, payload: userData });
                    if (userData.user._id === user._id) dispatch({ type: ACTIONS.SET_PLAYER_POSITION, payload: userData.player })
                    break;
                case 4:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_FOUR, payload: userData });
                    if (userData.user._id === user._id) dispatch({ type: ACTIONS.SET_PLAYER_POSITION, payload: userData.player })
                    break;
                default:
                    break;
            };
        };
        handleSocketEvent('new_user', newUserCallback);

        const requestPlayerDataCallback = async () => {
            await socket.emit(`player_data_responding`);
        };
        handleSocketEvent('requesting_player_data', requestPlayerDataCallback);

        const newPlayerDataResponseCallback = async (data: any) => {
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
        };
        handleSocketEvent('new_player_data_response', newPlayerDataResponseCallback);

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

        const duelReadyResponseCallback = async (data: any) => {
        };
        handleSocketEvent('duel_ready_response', duelReadyResponseCallback);

        const combatResponseCallback = async (response: any) => {
            console.log(response.playerPosition, state.playerPosition, "Positions To Determine Response");

            if (response.playerPosition === state.playerPosition) await statusUpdate(response);
        };
        handleSocketEvent('combat_response', combatResponseCallback);

        const softResponseCallback = async (response: any) => {
            if (response.playerPosition === state.playerPosition) await softUpdate(response);
        };
        handleSocketEvent('soft_response', softResponseCallback);

        const instantResponseCallback = async (response: any) => {
            if (response.playerPosition === state.playerPosition) await instantUpdate(response);
        };
        handleSocketEvent('instant_response', instantResponseCallback);

        const consumePrayerResponseCallback = async (response: any) => {
            if (response.playerPosition === state.playerPosition) await statusUpdate(response);
        };
        handleSocketEvent('consume_prayer_response', consumePrayerResponseCallback);

        const playerDirectionChangedCallback = (data: any) => {
            mapDispatch({ type: MAP_ACTIONS.SET_MULTIPLAYER_PLAYER, payload: data });
        }; 
        handleSocketEvent('playerDirectionChanged', playerDirectionChangedCallback);
    
        return () => {
          if (socket) {
                socket.off('player_data', playerDataCallback);
                socket.off('new_user', newUserCallback);
                socket.off('requesting_player_data', requestPlayerDataCallback);
                socket.off('new_player_data_response', newPlayerDataResponseCallback);
                socket.off('mapCreated', mapCreatedCallback);
                socket.off('player_ready', playerReadyCallback);
                socket.off('Game Commencing', gameCommencingCallback);
                socket.off('receive_message', receiveMessageCallback);
                socket.off('combat_response', combatResponseCallback);
                socket.off('soft_response', softResponseCallback);
                socket.off('instant_response', instantResponseCallback);
                socket.off('consume_prayer_response', consumePrayerResponseCallback);
                socket.off('duel_ready_response', duelReadyResponseCallback);
                socket.off('playerDirectionChanged', playerDirectionChangedCallback);
            };
        };
      }, [handleSocketEvent, socket, playerState, mapState, gameState, state]);

    useEffect(() => {
        getUserAscean();
    }, []);

    const generateWorld = async (mapName: string) => {
        try {
            socket.emit("createMap", { name: mapName, ascean: ascean });
        } catch (err: any) {
            console.log(err.message, 'Error Generating World Environment.');
        };
    };

    const setCoordinates = async (players: any, map: any) => {
        try {
            let playerCoords = { x: 0, y: 0 };
            if (players?.playerOne?.ascean._id === gameState?.player?._id) {
                playerCoords = { x: -75, y: 75 };
            } else if (players?.playerTwo?.ascean?._id === gameState?.player?._id) {
                playerCoords = { x: 75, y: 75 };
            } else if (players?.playerThree?.ascean?._id === gameState?.player?._id) {
                playerCoords = { x: -75, y: -75 };
            } else if (players?.playerFour?.ascean?._id === gameState?.player?._id) {
                playerCoords = { x: 75, y: -75 };
            };
            const coords = await getAsceanCoords(playerCoords.x, playerCoords.y, map.map);
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_COORDS,
                payload: coords,
            });
        } catch (err: any) {
            console.log(err.message, 'Error Setting Coordinates');
        };
    };

    async function getAsceanCoords(x: number, y: number, map: any) {
        const tile = map?.[x + 100]?.[y + 100];
        return tile ?? null;
    };

    const getOpponentDialog = async (enemy: string) => {
        try {
            const response = getNpcDialog(enemy);
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    const getNPCDialog = async (enemy: string) => {
        try {
            const response = getMerchantDialog(enemy);
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    const getOpponent = async (player: Player) => {
        gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        try {
            let minLevel: number = 0;
            let maxLevel: number = 0;
            const chance = Math.random();
            if (player.level === 1) {
                if (chance > 0.5) {
                    const wolf: Enemy = Object.assign({}, Wolf);
                    gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: wolf });
                    const response = await asceanAPI.getAnimalStats(wolf);
                    setAsceanState({
                        ...asceanState,
                        'opponent': wolf.level,
                    });
                    dispatch({ type: ACTIONS.SET_NEW_ENEMY, payload: { enemy: response.data.data, playerState: playerState } });
                    setTimeout(() => {
                        dispatch({
                            type: ACTIONS.SET_DUEL,
                            payload: ''
                        });
                        playOpponent();
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                    }, 2000);
                    return;
                }
            }
            if (player.level === 2) {
                if (chance > 0.67) {
                    const wolf: Enemy = Object.assign({}, Wolf);
                    gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: wolf });
                    const response = await asceanAPI.getAnimalStats(wolf);
                    setAsceanState({
                        ...asceanState,
                        'opponent': wolf.level,
                    });
                    dispatch({ type: ACTIONS.SET_NEW_ENEMY, payload: { enemy: response.data.data, playerState: playerState } });
                    setTimeout(() => {
                        dispatch({
                            type: ACTIONS.SET_DUEL,
                            payload: ''
                        });
                        playOpponent();
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                    }, 2000);
                    return;
                }
            }
            if (player.level < 3) {
                minLevel = 1;
                maxLevel = 2;
            } else  if (player.level <= 4) { // 3-4
                if (player.level === 3) {
                    if (chance > 0.5) {
                        const bear: Enemy = Object.assign({}, Bear);
                        gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: bear });
                        const response = await asceanAPI.getAnimalStats(bear);
                        setAsceanState({
                            ...asceanState,
                            'opponent': bear.level,
                        });
                        dispatch({ type: ACTIONS.SET_NEW_ENEMY, payload: { enemy: response.data.data, playerState: playerState } });
                        setTimeout(() => {
                            dispatch({
                                type: ACTIONS.SET_DUEL,
                                payload: ''
                            });
                            playOpponent();
                            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                        }, 2000);
                        return;
                    };
                };
                if (player.level === 4) {
                    if (chance > 0.67) {
                        const bear: Enemy = Object.assign({}, Bear);
                        gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: bear });
                        const response = await asceanAPI.getAnimalStats(bear);
                        setAsceanState({
                            ...asceanState,
                            'opponent': bear.level,
                        });
                        dispatch({ type: ACTIONS.SET_NEW_ENEMY, payload: { enemy: response.data.data, playerState: playerState } });
                        setTimeout(() => {
                            dispatch({
                                type: ACTIONS.SET_DUEL,
                                payload: ''
                            });
                            playOpponent();
                            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                        }, 2000);
                        return;
                    };
                };
                minLevel = 2;
                maxLevel = 4;
            } else if (player.level === 5) { // 5
                minLevel = 4;
                maxLevel = 6;
            } else if (player.level === 6) { // 6
                minLevel = 4;
                maxLevel = 8;
            } else if (player.level <= 8) { // 7-8
                minLevel = 6;
                maxLevel = 10;
            } else if (player.level <= 10) { // 9-10
                minLevel = 6;
                maxLevel = 12;
            } else if (player.level <= 14) { // 11-14
                minLevel = 8;
                maxLevel = 16;
            } else if (player.level <= 18) { // 15-18
                minLevel = 12;
                maxLevel = 18;
            } else if (player.level <= 20) {
                minLevel = 16;
                maxLevel = 20;
            }
            const enemyData = {
                username: 'mirio',
                minLevel: minLevel,
                maxLevel: maxLevel
            };
            const secondResponse = await userService.getRandomEnemy(enemyData);
            const selectedOpponent = await asceanAPI.getCleanAscean(secondResponse.data.ascean._id);
            const response = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: selectedOpponent.data })
            setAsceanState({
                ...asceanState,
                'opponent': selectedOpponent.data.level,
            });
            dispatch({ type: ACTIONS.SET_NEW_ENEMY, payload: { enemy: response.data.data, playerState: playerState } });
            playOpponent();
            await getOpponentDialog(selectedOpponent.data.name);
            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
            if (!gameState?.showDialog && mapState?.currentTile?.content !== 'city') {
                gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        };
    };

    const gainExperience = async (combatData: PvPData) => {
        try {
            let opponentExp: number = Math.round(combatData.enemy.level * 100 * (combatData.enemy.level / combatData.player.level) + combatData.player.kyosir);
            if (asceanState.ascean.experience + opponentExp >= asceanState.experienceNeeded) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'experience': asceanState.experienceNeeded,
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
            if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'experience': Math.round(asceanState.experience + opponentExp),
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error Gaining Experience')
        };
    };

    async function soundEffects(effects: PvPData) {
        try {
            if (effects.critical_success === true) {
                const soundEffectMap = {
                    Spooky: playDaethic,
                    Righteous: playDaethic,
                    Wild: playWild,
                    Earth: playEarth,
                    Fire: playFire,
                    Frost: playFrost,
                    Lightning: playLightning,
                    Sorcery: playSorcery,
                    Wind: playWind,
                    Pierce: (weapons: any[]) =>
                      weapons[0].type === "Bow" ? playBow() : playPierce(),
                    Slash: playSlash,
                    Blunt: playBlunt,
                  };
            
                const { player_damage_type, weapons } = effects;
                const soundEffectFn = soundEffectMap[player_damage_type as keyof typeof soundEffectMap];
                if (soundEffectFn) {
                    soundEffectFn(weapons);
                };
            };
            if (effects.religious_success === true) {
                playReligion();
            };
            if (effects.roll_success === true || effects.enemy_roll_success === true) {
                playRoll();
            };
            if (effects.counter_success === true || effects.enemy_counter_success === true) {
                playCounter();
            };
            setTimeout(() => {
                if (effects.player_win !== true && effects.enemy_win !== true) {
                    playCombatRound();
                };
            }, 500);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Sound Effects')
        };
    };

    const clearOpponent = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: null });
            dispatch({ type: ACTIONS.CLEAR_DUEL, payload: null });
            if (gameState.showDialog) gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: false });
            if (mapState.currentTile.content === 'enemy' && state.new_enemy_health <= 0) mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
            if (mapState.currentTile.content !== 'city') gameDispatch({ type: GAME_ACTIONS.SET_SHOW_MAP, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Clearing Duel');
        };
    };

    async function handlePlayerWin(combatData: PvPData) {
        try {
            if (mapState?.currentTile?.content === 'city') { playWin(); } else { playReligion(); };
            await gainExperience(combatData);
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            setTimeout(() => {
                setTimeLeft(0);
                dispatch({ type: ACTIONS.PLAYER_WIN, payload: combatData });
                if (mapState?.currentTile?.content === 'enemy' && combatData.enemy.name !== "Wolf" && combatData.enemy.name !== "Bear") gameDispatch({ type: GAME_ACTIONS.LOOT_ROLL, payload: true });
                if (combatData.enemy.name === "Wolf" || combatData.enemy.name === "Bear") clearOpponent();
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleEnemyWin(combatData: PvPData) {
        if (combatData.player.hardcore === true) {
            await handleHardcoreDeath(combatData);
            return;
        };
        try {
            playDeath();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You have lost the battle to ${combatData.enemy.name}, yet still there is always Achre for you to gain.` })
            setTimeout(() => {
                setTimeLeft(0);
                dispatch({ type: ACTIONS.ENEMY_WIN, payload: combatData });
                if (combatData.enemy.name === "Wolf" || combatData.enemy.name === "Bear") clearOpponent();
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleHardcoreDeath(data: PvPData) {
        try {
            playDeath();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You have died in battle to ${data.enemy.name}, yet there is another way for those with the fortitude.` });
            const response = await asceanAPI.kill(data.player._id);
            setTimeout(() => {
                setTimeLeft(0);
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: response });
                dispatch({
                    type: ACTIONS.ENEMY_WIN,
                    payload: data
                });
                clearOpponent();
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
                if (data.player.level > 3) {
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                } else {
                    navigate('/');
                };
            }, 6000);
        } catch (err: any) {
            console.log(err, "Error Handling Hardcore Death");
        };
    };

    async function handleInitiate(pvpState: PvPData) {
        try {
            setEmergencyText(['']);
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            if (pvpState.enemyPosition === -1) {
                await socket.emit('computer_combat_initiated', pvpState);
                return;
            };
            await socket.emit('initiated', pvpState);
            dispatch({ type: ACTIONS.SET_PLAYER_READY, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action');
        };
    };

    async function handleInstant(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            await socket.emit('instant_action', state);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            playReligion();
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Insant Action')
        };
    };

    async function handlePrayer(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            if (state.prayerSacrifice === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose A Prayer to Sacrifice!\n`]);
                return;
            };
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            await socket.emit('consume_prayer', state);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            playReligion();
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        };
    };
    async function autoAttack(combatData: PvPData) {
        if (combatData.enemyPosition !== -1 && playerState.playerOne.ascean._id !== state.player._id) {
            setTimeLeft(gameState.timeLeft);
            return;
        };
        try {
            setTimeLeft(gameState.timeLeft);
            setEmergencyText([`Auto Engagement Response`]);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            await socket.emit(`auto_engage`, combatData);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action');
        };
    };

    const instantUpdate = async (response: any) => {
        try {
            dispatch({
                type: ACTIONS.INSTANT_COMBAT,
                payload: response
            });
        } catch (err: any) {
            console.log(err.message, 'Error Performing Instant Update');
        };
    };

    const softUpdate = async (response: any) => {
        try {
            dispatch({
                type: ACTIONS.INITIATE_COMBAT,
                payload: response
            });
        } catch (err: any) {
            console.log(err.message, 'Error Performing Soft Update');
        };
    };
    
    const statusUpdate = async (response: any) => {
        try {
            await soundEffects(response);
            dispatch({
                type: ACTIONS.INITIATE_COMBAT,
                payload: response
            });
            if (response.player_win === true) {
                if (response.gameIsLive === true) dispatch({ type: ACTIONS.AUTO_ENGAGE, payload: false });
                await handlePlayerWin(response);
            };
            if (response.enemy_win === true) {
                if (response.gameIsLive === true) dispatch({ type: ACTIONS.AUTO_ENGAGE, payload: false });
                await handleEnemyWin(response);
            };
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Updating Status');
        };
    };

    const setPlayerOrder = async (you: any, enemy: any) => {
        setLoading(true);
        try {   
        setLoading(false);

        } catch (err: any) {
            console.log('Error Setting Player Order');
        };
    };

    useEffect(() => { console.log(gameState, "Game State in Lobby") }, [gameState]);

    useEffect(() => { console.log(playerState, "Player State in Lobby") }, [playerState]);

    useEffect(() => { console.log(state, 'PvP State Lobby') }, [state]);

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
                room: room,
                user: user,
                combatData: state
            };
            socket.emit("join_room", asceanData);
            await socket.emit(`ascean`, asceanData);
            setShowChat(true);
        };
    };

    function handleAscean(e: any) {
        setUsername(e.target.value);
    };

    function handleRoom(e: any) {
        setRoom(e.target.value);
    };

    function handleRoomReset() {
        setShowChat(false);
        
    };

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
                user={user} ascean={gameState.player} spectator={spectator} enemy={gameState.opponent}  getOpponent={getOpponent} getNPCDialog={getNPCDialog}
                handleRoomReset={handleRoomReset} room={room} setShowChat={setShowChat} socket={socket} handleSocketEvent={handleSocketEvent}
                handlePlayerWin={handlePlayerWin} handleEnemyWin={handleEnemyWin} mapState={mapState} mapDispatch={mapDispatch} autoAttack={autoAttack}
                currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} messageList={messageList} setMessageList={setMessageList}
                liveGameplay={liveGameplay} setLiveGameplay={setLiveGameplay} statusUpdate={statusUpdate} softUpdate={softUpdate} instantUpdate={instantUpdate}
                handleInitiate={handleInitiate} handlePrayer={handlePrayer} handleInstant={handleInstant} clearOpponent={clearOpponent}
                getAsceanCoords={getAsceanCoords} generateWorld={generateWorld} emergencyText={emergencyText} setEmergencyText={setEmergencyText}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft} moveTimer={moveTimer} setMoveTimer={setMoveTimer} asceanState={asceanState} setAsceanState={setAsceanState}
            />
        }
        </>

    )
}

export default GamePvPLobby