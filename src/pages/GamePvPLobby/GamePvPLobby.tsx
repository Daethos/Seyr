import { useCallback, useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';
import userService from '../../utils/userService';
import * as io from 'socket.io-client'
import Container from 'react-bootstrap/Container'
import Loading from '../../components/Loading/Loading'
import GameChat from '../../components/GameCompiler/GameChat';
import { ACTIONS, initialPvPData, PvPData, PvPStore, PLAYER_ACTIONS, initialPlayerData, PlayerStore, PlayerData, SpectatorStore, SPECTATOR_ACTIONS } from '../../components/GameCompiler/PvPStore';
import { GAME_ACTIONS, GameStore, initialGameData, Enemy, Player, getAsceanTraits } from '../../components/GameCompiler/GameStore';
import { MAP_ACTIONS, MapStore, initialMapData, MapData } from '../../components/GameCompiler/WorldStore';
import { shakeScreen } from '../../components/GameCompiler/CombatStore';
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
    const [specState, specDispatch] = useReducer(SpectatorStore, initialPvPData);
    const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(0);
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
    // const [socketConnected, setSocketConnected] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const [emergencyText, setEmergencyText] = useState<any[]>([])
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [moveTimer, setMoveTimer] = useState<number>(6)
    const { playOpponent, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playCombatRound } = useGameSounds(gameState.soundEffectVolume);
    
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false);
    const navigate = useNavigate();
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
        if (socket) {
          socket.on(event, callback);
        };
    }, [socket]);

      useEffect(() => {
        // "http://localhost:3001" When Tinkering Around 
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
    
        const newUserCallback = async (userData: any) => {
            if (userData.user._id === user._id && userData.player !== 1) {
                await socket.emit(`requestNewPlayer`);
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
        handleSocketEvent('newUser', newUserCallback);

        const requestPlayerDataCallback = async () => {
            await socket.emit(`playerDataResponding`);
        };
        handleSocketEvent('requestingPlayerData', requestPlayerDataCallback);

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
        handleSocketEvent('newPlayerDataResponse', newPlayerDataResponseCallback);

        const updatePlayerDataCallback = async (data: any) => {
            switch (data.player) {
                case 1:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_ONE_ASCEAN, payload: data.ascean });
                    break;
                case 2:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_TWO_ASCEAN, payload: data.ascean });
                    break;
                case 3:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_THREE_ASCEAN, payload: data.ascean });
                    break;
                case 4:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_FOUR_ASCEAN, payload: data.ascean });
                    break;
                default:
                    break;
            };
        };
        handleSocketEvent('updatePlayerData', updatePlayerDataCallback);

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
            setMessageList((list: any) => [...list, messageData]);
            await setCoordinates(playerState, response);
            await socket.emit('commenceGame');
        };
        handleSocketEvent("mapCreated", mapCreatedCallback);

        const mapContentSyncedCallback = async (response: any) => {
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA_SYNC,
                payload: response
            });
        };
        handleSocketEvent("mapContentSynced", mapContentSyncedCallback);

        const newEnvironmentCallback = async (response: any) => {
            console.log(response, "New Environment Response");
            const newMapData = {
                ...mapState,
                convertedTile: response
            };
            mapDispatch({ type: MAP_ACTIONS.SYNC_NEW_ENVIRONMENT, payload: newMapData });
        };
        handleSocketEvent("newEnvironment", newEnvironmentCallback);

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

        const gameCommencingCallback = async (data: any) => {
            setMessageList((list: any) => [...list, data]);
            setTimeout(() => setLiveGameplay(true), 10000);
        };
        handleSocketEvent('Game Commencing', gameCommencingCallback);

        const receiveMessageCallback = async (data: any) => {
            setMessageList((list: any) => [...list, data]);
        };
        handleSocketEvent('receive_message', receiveMessageCallback);

        const duelReadyResponseCallback = async (data: any) => {
        };
        handleSocketEvent('duel_ready_response', duelReadyResponseCallback);

        const combatResponseCallback = async (response: any) => {
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

        const spectatePlayerCallback = async (data: any) => {
            console.log(data, gameState.player._id, "Spectate Player Callback");
            if (data.spectate === gameState.player._id) {
                await spectate(data);
            };
        };
        handleSocketEvent('requestSpectatePlayer', spectatePlayerCallback);

        const spectatePlayerResponseCallback = async (data: any) => {
            console.log(data, gameState.player._id, "Spectate Player Response Callback");
            if (data.data.spectator === gameState.player._id) {
                specDispatch({ type: SPECTATOR_ACTIONS.SET_SPECTATOR, payload: data.state });
                gameDispatch({ type: GAME_ACTIONS.LOADING_SPECTATOR, payload: true });
            };
        };
        handleSocketEvent('spectatePlayerResponse', spectatePlayerResponseCallback);

        const spectateUpdateCallback = async (spectator: string, data: PvPData) => {
            console.log(data, "Spectate Update Data");
            if (spectator === gameState.player._id) await updateSpecate(data);
        };
        handleSocketEvent('spectateUpdate', spectateUpdateCallback);

        const duelDataSharedCallback = async (data: any) => {
            console.log(data, "Duel Data Callback");
            if (data.playerOne === gameState.player._id || data.playerTwo === gameState.player._id) {
                await duelData(data);
            };
        };
        handleSocketEvent('duelDataShared', duelDataSharedCallback);

        const instantResponsePvPCallback = async (response: any) => {
            if (response.playerPosition === state.playerPosition) await instantUpdate(response);
            if (response.playerPosition === state.enemyPosition) await instantUpdateReverse(response);
        };
        handleSocketEvent('instantResponsePvP', instantResponsePvPCallback);

        const consumePrayerResponsePvPCallback = async (response: any) => {
            if (response.playerPosition === state.playerPosition) await statusUpdate(response);
            if (response.playerPosition === state.enemyPosition) await instantUpdateReverse(response);
        };
        handleSocketEvent('consumePrayerResponsePvP', consumePrayerResponsePvPCallback);

        const pvpInitiateUpdateCallback = async (data: any) => {
            console.log(data, "PVP Initiate Update Callback");
            const playerOne = data.playerOneData;
            const playerTwo = data.playerTwoData;
            console.log(playerOne, playerTwo, "Player One and Two Data")
            if (state.playerPosition === playerOne.playerPosition) {
                await statusUpdate(playerOne);
            } else {
                await statusUpdate(playerTwo);
            };
        };
        handleSocketEvent('pvpInitiateUpdate', pvpInitiateUpdateCallback);
    
        const pvpInitiateSoftUpdateCallback = async (data: any) => {
            console.log('pvpInitiateSoftUpdateCallback', data);
            const playerTwo = data.playerTwoData;
            if (playerTwo && state.playerPosition === playerTwo.enemyPosition) { // This means it would be p2 relaying info to p1 ? 
                console.log(playerTwo.timestamp, "Player Two Timestamp");
                if (playerTwo.timestamp === 1) await softUpdate(playerTwo);
            };
        };
        handleSocketEvent('pvpInitiateSoftUpdate', pvpInitiateSoftUpdateCallback);

        return () => {
          if (socket) {
                socket.off('playerData', playerDataCallback);
                socket.off('newUser', newUserCallback);
                socket.off('requestingPlayerData', requestPlayerDataCallback);
                socket.off('newPlayerDataResponse', newPlayerDataResponseCallback);
                socket.off('mapCreated', mapCreatedCallback);
                socket.off('mapContentSynced', mapContentSyncedCallback);
                socket.off('newEnvironment', newEnvironmentCallback);
                socket.off('player_ready', playerReadyCallback);
                socket.off('Game Commencing', gameCommencingCallback);
                socket.off('receive_message', receiveMessageCallback);
                socket.off('combat_response', combatResponseCallback);
                socket.off('soft_response', softResponseCallback);
                socket.off('instant_response', instantResponseCallback);
                socket.off('consume_prayer_response', consumePrayerResponseCallback);
                socket.off('duel_ready_response', duelReadyResponseCallback);
                socket.off('playerDirectionChanged', playerDirectionChangedCallback);
                socket.off('requestSpectatePlayer', spectatePlayerCallback);
                socket.off('spectatePlayerResponse', spectatePlayerResponseCallback);
                socket.off('spectateUpdate', spectateUpdateCallback);
                socket.off('duelDataShared', duelDataSharedCallback);
                socket.off('pvpInitiateUpdate', pvpInitiateUpdateCallback);
                socket.off('pvpInitiateSoftUpdate', pvpInitiateSoftUpdateCallback);
                socket.off('instantResponsePvP', instantResponsePvPCallback);
                socket.off('consumePrayerResponsePvP', consumePrayerResponsePvPCallback);
            };
        };
      }, [handleSocketEvent, socket, playerState, mapState, gameState, state]);

    useEffect(() => {
        getUserAscean();
    }, []);

    useEffect(() => {
        let timeoutId: any;
        if (state.player_luckout) {
            handlePlayerLuckout(state);
            timeoutId = setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
                dispatch({ type: ACTIONS.RESET_LUCKOUT, payload: false });
            }, 6000);
            return () => clearTimeout(timeoutId);
        };
    }, [state.player_luckout]);

    const duelData = async (data: any) => {
        if (data.duelDataID === gameState?.player._id) return; // This is you, you don't need to set yourself
        gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        shakeScreen(gameState.shake);
        dispatch({ type: ACTIONS.SET_DUEL_DATA, payload: data });
        gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: data.player });
        setAsceanState({
            ...asceanState,
            'opponent': data.player.level,
        });
        setTimeout(() => {
            playOpponent();
            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
        }, 2000);
    };

    const checkPlayerTiles = async (mapData: MapData) => {
        console.log(mapData, "Map Data Checking Player Tiles")
        try {
            if ((mapData?.player1Tile?.x === mapData?.player2Tile?.x) && (mapData?.player1Tile?.y === mapData?.player2Tile?.y)) {
                console.log(gameState?.player._id, playerState?.playerOne?.ascean._id, playerState?.playerTwo?.ascean._id, "Players are in the same tile");
                if (gameState?.player._id === playerState?.playerOne?.ascean._id || gameState?.player._id === playerState?.playerTwo?.ascean._id) {  
                    const duelData = {
                        duelDataID:gameState?.player._id,
                        playerOne: playerState?.playerOne?.ascean._id,
                        playerTwo: playerState?.playerTwo?.ascean._id,
                        player: state.player,
                        playerPosition: state.playerPosition,
                        player_health: state.player_health,
                        current_player_health: state.current_player_health,
                        new_player_health: state.new_player_health,
                        weapons: state.weapons,
                        weapon_one: state.weapon_one,
                        weapon_two: state.weapon_two,
                        weapon_three: state.weapon_three,
                        player_damage_type: state.player_damage_type,
                        player_defense: state.player_defense,
                        player_attributes: state.player_attributes,
                        player_defense_default: state.player_defense_default,
                    };
                    await socket?.emit('duelDataShare', duelData);
                };
            };

            if ((mapData?.player1Tile?.x === mapData?.player3Tile?.x) && (mapData?.player1Tile?.y === mapData?.player3Tile?.y)) {
                if (gameState?.player._id === playerState?.playerOne?.ascean._id || gameState?.player._id === playerState?.playerThree?.ascean._id) {  
                    const duelData = {
                        duelDataID:gameState?.player._id,
                        playerOne: playerState?.playerOne?.ascean._id,
                        playerTwo: playerState?.playerThree?.ascean._id,
                        player: state.player,
                        playerPosition: state.playerPosition,
                        player_health: state.player_health,
                        current_player_health: state.current_player_health,
                        new_player_health: state.new_player_health,
                        weapons: state.weapons,
                        weapon_one: state.weapon_one,
                        weapon_two: state.weapon_two,
                        weapon_three: state.weapon_three,
                        player_damage_type: state.player_damage_type,
                        player_defense: state.player_defense,
                        player_attributes: state.player_attributes,
                        player_defense_default: state.player_defense_default,
                    };
                    await socket?.emit('duelDataShare', duelData);
                };
            };

            if ((mapData?.player1Tile?.x === mapData?.player4Tile?.x) && (mapData?.player1Tile?.y === mapData?.player4Tile?.y)) {
                if (gameState?.player._id === playerState?.playerOne?.ascean._id || gameState?.player._id === playerState?.playerFour?.ascean._id) {  
                    const duelData = {
                        duelDataID:gameState?.player._id,
                        playerOne: playerState?.playerOne?.ascean._id,
                        playerTwo: playerState?.playerFour?.ascean._id,
                        player: state.player,
                        playerPosition: state.playerPosition,
                        player_health: state.player_health,
                        current_player_health: state.current_player_health,
                        new_player_health: state.new_player_health,
                        weapons: state.weapons,
                        weapon_one: state.weapon_one,
                        weapon_two: state.weapon_two,
                        weapon_three: state.weapon_three,
                        player_damage_type: state.player_damage_type,
                        player_defense: state.player_defense,
                        player_attributes: state.player_attributes,
                        player_defense_default: state.player_defense_default,
                    };
                    await socket?.emit('duelDataShare', duelData);
                };
            };

            if ((mapData?.player2Tile?.x === mapData?.player3Tile?.x) && (mapData?.player2Tile?.y === mapData?.player3Tile?.y)) {
                if (gameState?.player._id === playerState?.playerTwo?.ascean._id || gameState?.player._id === playerState?.playerThree?.ascean._id) {  
                    const duelData = {
                        duelDataID:gameState?.player._id,
                        playerOne: playerState?.playerTwo?.ascean._id,
                        playerTwo: playerState?.playerThree?.ascean._id,
                        player: state.player,
                        playerPosition: state.playerPosition,
                        player_health: state.player_health,
                        current_player_health: state.current_player_health,
                        new_player_health: state.new_player_health,
                        weapons: state.weapons,
                        weapon_one: state.weapon_one,
                        weapon_two: state.weapon_two,
                        weapon_three: state.weapon_three,
                        player_damage_type: state.player_damage_type,
                        player_defense: state.player_defense,
                        player_attributes: state.player_attributes,
                        player_defense_default: state.player_defense_default,
                    };
                    await socket?.emit('duelDataShare', duelData);
                };
            };

            if ((mapData?.player2Tile?.x === mapData?.player4Tile?.x) && (mapData?.player2Tile?.y === mapData?.player4Tile?.y)) {
                if (gameState?.player._id === playerState?.playerTwo?.ascean._id || gameState?.player._id === playerState?.playerFour?.ascean._id) {  
                    const duelData = {
                        duelDataID:gameState?.player._id,
                        playerOne: playerState?.playerTwo?.ascean._id,
                        playerTwo: playerState?.playerFour?.ascean._id,
                        player: state.player,
                        playerPosition: state.playerPosition,
                        player_health: state.player_health,
                        current_player_health: state.current_player_health,
                        new_player_health: state.new_player_health,
                        weapons: state.weapons,
                        weapon_one: state.weapon_one,
                        weapon_two: state.weapon_two,
                        weapon_three: state.weapon_three,
                        player_damage_type: state.player_damage_type,
                        player_defense: state.player_defense,
                        player_attributes: state.player_attributes,
                        player_defense_default: state.player_defense_default,
                    };
                    await socket?.emit('duelDataShare', duelData);
                };
            };

            if ((mapData?.player3Tile?.x === mapData?.player4Tile?.x) && (mapData?.player3Tile?.y === mapData?.player4Tile?.y)) {
                if (gameState?.player._id === playerState?.playerThree?.ascean._id || gameState?.player._id === playerState?.playerFour?.ascean._id) {  
                    const duelData = {
                        duelDataID:gameState?.player._id,
                        playerOne: playerState?.playerThree?.ascean._id,
                        playerTwo: playerState?.playerFour?.ascean._id,
                        player: state.player,
                        playerPosition: state.playerPosition,
                        player_health: state.player_health,
                        current_player_health: state.current_player_health,
                        new_player_health: state.new_player_health,
                        weapons: state.weapons,
                        weapon_one: state.weapon_one,
                        weapon_two: state.weapon_two,
                        weapon_three: state.weapon_three,
                        player_damage_type: state.player_damage_type,
                        player_defense: state.player_defense,
                        player_attributes: state.player_attributes,
                        player_defense_default: state.player_defense_default,
                    };
                    await socket?.emit('duelDataShare', duelData);
                };
            };
        } catch (err: any) {
            console.log(err, "Error Checking Player Tiles");
        }
    };

    const updateSpecate = async (response: PvPData) => {
        // 
        await soundEffects(response);
        specDispatch({ type: SPECTATOR_ACTIONS.UPDATE_SPECTATOR, payload: response });
        if (response.player_win === true || response.enemy_win === true) {
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_SPECTATOR_OVERLAY, payload: true });
            setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.LOADING_SPECTATOR, payload: false });
                specDispatch({ type: SPECTATOR_ACTIONS.CLEAR_SPECTATOR, payload: response });
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_SPECTATOR_OVERLAY, payload: false });
            }, 6000);
        };
    };
    
    const spectate = async (data: any) => {
        try {
            console.log(data, "Spectate Data");
            const specData = { data, state };
            await socket.emit('spectatePlayerData', specData);
            dispatch({ type: ACTIONS.SET_SPECTATOR, payload: data.spectator });
        } catch (err: any) { 
            console.log(err.message, 'Error Spectating Player.'); 
        };
    };

    const generateWorld = async (mapName: string) => {
        try {
            await socket.emit("createMap", { name: mapName, ascean: ascean });
        } catch (err: any) {
            console.log(err.message, 'Error Generating World Environment.');
        };
    };

    function getRandomCoordinates(coordinate: number) {
        const random = Math.floor(Math.random() * 26);
        const chance = Math.floor(Math.random() * 2);
        if (chance === 0) {
            return coordinate + random;
        } else {
            return coordinate - random;
        };
    };

    const setCoordinates = async (players: any, map: any) => {
        console.log(players, map, "Players and Map (Set Coordinates)");
        try {
            let playerCoords = { x: 0, y: 0 };
            if (players?.playerOne?.ascean._id === gameState?.player?._id) {
                playerCoords = { x: getRandomCoordinates(-75), y: getRandomCoordinates(75) };
            } else if (players?.playerTwo?.ascean?._id === gameState?.player?._id) {
                playerCoords = { x: getRandomCoordinates(75), y: getRandomCoordinates(75) };
            } else if (players?.playerThree?.ascean?._id === gameState?.player?._id) {
                playerCoords = { x: getRandomCoordinates(-75), y: getRandomCoordinates(-75) };
            } else if (players?.playerFour?.ascean?._id === gameState?.player?._id) {
                playerCoords = { x: getRandomCoordinates(75), y: getRandomCoordinates(-75) };
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
                    'currentHealth': combatData.new_player_health,
                    'experience': asceanState.experienceNeeded,
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
            if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'currentHealth': combatData.new_player_health,
                    'experience': Math.round(asceanState.experience + opponentExp),
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error Gaining Experience')
        };
    };

    const higherPosition = (playerPosition: number, enemyPosition: number) => {
        console.log(playerPosition, enemyPosition, 'playerPosition, enemyPosition')
        if (playerPosition > enemyPosition) {
            return true;
        } else {
            return false;
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

    useEffect(() => {
        if (state.deaths === 5) {
            handleHardcoreDeath(state);
        };
    }, [state.deaths]);

    const clearOpponent = async () => {
        try {
            if (gameState.showDialog) gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: false });
            if (mapState.currentTile.content === 'enemy' && state.new_enemy_health <= 0) {
                await socket.emit('newEnvironmentTile', mapState.currentTile);
                mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
            };
            if (mapState.currentTile.content !== 'city') gameDispatch({ type: GAME_ACTIONS.SET_SHOW_MAP, payload: true });
            setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: null });
                dispatch({ type: ACTIONS.CLEAR_DUEL, payload: null });
                mapDispatch({ type: MAP_ACTIONS.SET_JOYSTICK_DISABLED, payload: false });
            }, 500);
        } catch (err: any) {
            console.log(err.message, 'Error Clearing Duel');
        };
    };

    async function handlePlayerLuckout(combatData: PvPData) {
        try {
            if (mapState?.currentTile?.content === 'city') {
                playWin();
            } else {
                playReligion();
            };
            gameDispatch({ type: GAME_ACTIONS.LOOT_ROLL, payload: true });
            await gainExperience(combatData);
        } catch (err: any) {
            console.log("Error Handling Player Win");
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
                if (combatData.enemy.name === "Wolf" || combatData.enemy.name === "Bear" || combatData.enemyPosition !== -1) clearOpponent();
                gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleEnemyWin(combatData: PvPData) {
        try {
            switch (combatData.playerPosition) {
                case 1:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_ONE_DEATH, payload: true });
                    break;
                case 2:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_TWO_DEATH, payload: true });
                    break;
                case 3:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_THREE_DEATH, payload: true });
                    break;
                case 4:
                    playerDispatch({ type: PLAYER_ACTIONS.SET_PLAYER_FOUR_DEATH, payload: true });
                    break;
                default:
                    break;
            };
            playDeath();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You have lost the battle to ${combatData.enemy.name}, yet still there is always Achre for you to gain.` })
            setTimeout(() => {
                setTimeLeft(0);
                dispatch({ type: ACTIONS.ENEMY_WIN, payload: combatData });
                if (combatData.enemy.name === "Wolf" || combatData.enemy.name === "Bear" || combatData.enemyPosition !== -1) clearOpponent();
                gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
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

    async function handlePvPInitiate(pvpState: PvPData) {
        try {
            shakeScreen(gameState.shake);
            setEmergencyText(['']);
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
            const data = {
                player: pvpState.player._id,
                state: pvpState
            };
            await socket.emit('pvpInitiated', state);
            dispatch({ type: ACTIONS.SET_PLAYER_READY, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action');
        };
    };

    async function handlePvPInstant(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            shakeScreen(gameState.shake);
            gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: true });
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
            await socket.emit('instantActionPvP', state);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            playReligion();
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Insant Action')
        };
    };

    async function handlePvPPrayer(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            if (state.prayerSacrifice === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose A Prayer to Sacrifice!\n`]);
                return;
            };
            shakeScreen(gameState.shake);
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
            await socket.emit('consumePrayerPvP', state);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            playReligion();
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        };
    };

    async function handleInitiate(pvpState: PvPData) {
        try {
            shakeScreen(gameState.shake);
            setEmergencyText(['']);
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
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
            shakeScreen(gameState.shake);
            gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: true });
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
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
            shakeScreen(gameState.shake);
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > gameState.timeLeft ? gameState.timeLeft : timeLeft + 2);
            await socket.emit('consume_prayer', state);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            playReligion();
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        };
    };

    async function autoAttack(combatData: PvPData) {
        if (combatData.enemyPosition !== -1 && !higherPosition(combatData.playerPosition, combatData.enemyPosition)) {
            setTimeLeft(gameState.timeLeft);
            return;
        };
        try {
            shakeScreen(gameState.shake);
            setTimeLeft(gameState.timeLeft);
            setEmergencyText([`Auto Engagement Response`]);
            if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
            await socket.emit(`auto_engage`, combatData);
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action');
        };
    };

    const instantUpdateReverse = async (response: any) => {
        // Reverse results ala backend TODO:FIXME:
        try {
            let reverseResult = {
                weapons: response.enemy_weapons, // All 3 Weapons
                player_damage_type: response.enemy_damage_type, 
                player_defense: response.enemy_defense, // Posseses Base + Postured Defenses
                player_attributes: response.enemy_attributes, // Possesses compiled Attributes, Initiative
                action: response.enemy_action,
                player_action: response.enemy_action,
        
                enemy_attributes: response.player_attributes, // Possesses compiled Attributes, Initiative
                enemy_defense: response.player_defense, // Posseses Base + Postured Defenses
                enemy_weapons: response.weapons,  // All 3 Weapons
                enemy_damage_type: response.player_damage_type,
                enemy_action: response.action,
    
                potential_player_damage: response.potential_enemy_damage, // All the Damage that is possible on hit for a player
                potential_enemy_damage: response.potential_player_damage, // All the Damage that is possible on hit for a enemy
                realized_player_damage: response.realized_enemy_damage, // Player Damage - enemy Defenses
                realized_enemy_damage: response.realized_player_damage, // enemy Damage - Player Defenses
        
                playerDamaged: response.playerDamaged,
                enemyDamaged: response.enemyDamaged,
        
                player_start_description: response.enemy_start_description,
                enemy_start_description: response.player_start_description,
                player_special_description: response.enemy_special_description,
                enemy_special_description: response.player_special_description,
                player_action_description: response.enemy_action_description, // The combat text to inject from the player
                enemy_action_description: response.player_action_description, // The combat text to inject from the enemy
                player_influence_description: response.enemy_influence_description,
                enemy_influence_description: response.player_influence_description,
                player_influence_description_two: response.enemy_influence_description_two,
                enemy_influence_description_two: response.player_influence_description_two,
                player_death_description: response.enemy_death_description,
                enemy_death_description: response.player_death_description,
        
                current_player_health: response.new_enemy_health, // New player health post-combat action
                current_enemy_health: response.new_player_health, // New enemy health post-combat action
                new_player_health: response.new_enemy_health, // New player health post-combat action
                new_enemy_health: response.new_player_health, // New enemy health post-combat action
        
                religious_success: response.enemy_religious_success,
                enemy_religious_success: response.religious_success,
                dual_wielding: response.enemy_dual_wielding,
                enemy_dual_wielding: response.dual_wielding,
                roll_success: response.enemy_roll_success,
                counter_success: response.enemy_counter_success,
                enemy_roll_success: response.roll_success,
                enemy_counter_success: response.counter_success,
                player_win: response.enemy_win,
                enemy_win: response.player_win,
        
                critical_success: response.enemy_critical_success,
                enemy_critical_success: response.critical_success,
                glancing_blow: response.enemy_glancing_blow,
                enemy_glancing_blow: response.glancing_blow,
        
                combatRound: response.combatRound,
                sessionRound: response.sessionRound,
        
                playerEffects: response.enemyEffects,
                enemyEffects: response.playerEffects,
                playerBlessing: response.enemyBlessing,
                enemyBlessing: response.playerBlessing,
            };
            const newResponse = {
                ...state,
                ...reverseResult
            }
            if (newResponse.spectacle) {
                await newResponse.spectators.map((spectator: any) => {
                    console.log(spectator, "Spectator?")
                    socket.emit('updateSpectatorData', spectator, newResponse);
                });
            };
            dispatch({ type: ACTIONS.INSTANT_COMBAT, payload: newResponse });
            if (newResponse.player_win === true) {
                if (newResponse.gameIsLive === true) dispatch({ type: ACTIONS.AUTO_ENGAGE, payload: false });
                await handlePlayerWin(newResponse);
            };
            if (newResponse.enemy_win === true) {
                if (newResponse.gameIsLive === true) dispatch({ type: ACTIONS.AUTO_ENGAGE, payload: false });
                await handleEnemyWin(newResponse);
            };
            setTimeout(() => {
                dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false });
            }, 1500);
        } catch (err: any) {
            console.log(err.message, 'Error Performing Instant Update');
        };
    };

    const instantUpdate = async (response: any) => {
        try {
            if (response.spectacle) {
                await response.spectators.map((spectator: any) => {
                    console.log(spectator, "Spectator?")
                    socket.emit('updateSpectatorData', spectator, response);
                });
            };
            dispatch({ type: ACTIONS.INSTANT_COMBAT, payload: response });
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
            console.log(err.message, 'Error Performing Instant Update');
        };
    };

    const softUpdate = async (response: any) => {
        try {
            console.log('Player One Doing The Lords Work');
            await socket.emit('pvpInitiated', response);
            setLastUpdateTimestamp(response.timestamp);
        } catch (err: any) {
            console.log(err.message, 'Error Performing Soft Update');
        };
    };
    
    const statusUpdate = async (response: PvPData) => {
        try {
            console.log(response.spectacle, "Is this a Spectable?");
            if (response.spectacle) {
                response.spectators.map(async (spectator: any) => {
                    console.log(spectator, "Spectator?")
                    await socket.emit('updateSpectatorData', spectator, response);
                });
            };
            await soundEffects(response);
            dispatch({ type: ACTIONS.INITIATE_COMBAT, payload: response });
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


    const playerSameTileCheck = (mapData: MapData) => {
        let p1 = mapData?.player1Tile ? mapData.player1Tile : null;
        let p2 = mapData?.player2Tile ? mapData.player2Tile : null;
        let p3 = mapData?.player3Tile ? mapData.player3Tile : null;
        let p4 = mapData?.player4Tile ? mapData.player4Tile : null;
        if ((p1 && p2 && p1.x === p2.x && p1.y === p2.y) || 
            (p1 && p3 && p1.x === p3.x && p1.y === p3.y) ||
            (p1 && p4 && p1.x === p4.x && p1.y === p4.y) ||
            (p2 && p3 && p2.x === p3.x && p2.y === p3.y) ||
            (p2 && p4 && p2.x === p4.x && p2.y === p4.y) ||
            (p3 && p4 && p3.x === p4.x && p3.y === p4.y)) {
            return true;
        } else {
            return false;
        };
    };

    useEffect(() => { console.log(gameState, "Game State in Lobby") }, [gameState]);

    useEffect(() => { console.log(playerState, "Player State in Lobby") }, [playerState]);

    useEffect(() => { console.log(state, 'PvP State Lobby') }, [state]);

    useEffect(() => {
        if (!playerSameTileCheck(mapState)) return;
        checkPlayerTiles(mapState);
    }, [mapState?.player1Tile, mapState?.player2Tile, mapState?.player3Tile, mapState?.player4Tile]);

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
                specState={specState} specDispatch={specDispatch} handlePvPInitiate={handlePvPInitiate} handlePvPPrayer={handlePvPPrayer} handlePvPInstant={handlePvPInstant}
            />
        }
        </>

    );
};

export default GamePvPLobby;