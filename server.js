require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const zlib = require('zlib');
require('./config/database');

const app = express();
const cors = require('cors');
app.use(cors());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));

app.use(express.static(path.join(__dirname, 'build'))); 
app.use(require('./config/auth')); 

app.use('/api/users', require('./routes/api/users')); 
app.use('/api/equipment', require('./routes/api/equipment'));
app.use('/api/ascean', require('./routes/api/ascean'));
app.use('/api/game', require('./routes/api/game'));
app.use('/api/community', require('./routes/api/community'));
app.use('/api/friends', require('./routes/api/friends'));
app.use('/api/message', require('./routes/api/message'));
app.use('/api', require('./routes/api/feelings'));
app.use('/api/chat', require('./routes/api/chat'));
app.use('/api/chatMessages', require('./routes/api/chatMessages'));
app.use('/api/maps', require('./routes/api/maps'));
app.use('/api/gamesettings', require('./routes/api/gamesettings'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const gameService = require('./services/gameServices');
const pvpService = require('./services/pvpServices');
const asceanService = require('./services/asceanServices');
const WorldMap = require('./services/worldServices');
// const MultiplayerGame = require('./services/multiplayerServices');

const port = process.env.PORT || 3001;
const server = app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});
const io = require('socket.io')(server, {
    transports: ['websocket'],
    maxHttpBufferSize: 1e8,
    cors:  {
        origin: ["http://localhost:3000", "https://ascea.herokuapp.com"],
        methods: ["GET", "POST"],
    },
});
io.engine.pingInterval = 30000;
io.engine.pingTimeout = 5000;
const maxPlayersPerRoom = 4;
const rooms = new Map();
let player = {
    user: null, // User
    ascean: null, // Player
    stats: null, // Combat Stats
    settings: null, // Game Settings
    temp: null, // asceanState
    traits: null, // Player Traits
    room: null, // Room
};

let combatData = {};

io.on("connection", (socket) => {
    // socket.onAny((_eventName, ...args) => {
        // const data = args[0];
        // const size = data ? JSON.stringify(data).length : 0;
        // console.log((size / 1000), "KBs");
    // });
    console.log(`User Connected: ${socket.id}`);

    let connectedUsersCount;
    let personalUser = { user: null, ascean: null };
    let newUser = { user: null, room: null, ascean: null, player: null, ready: false };
    let newMap = {}; 
    let players = {};

    function sendPlayer(player) {  
        console.log(player.id, 'Player ID');
        io.to(player.room).emit('currentPlayers', players);
        // io.to(player.room).emit('playerAdded', player);
    };

    function removePlayer(id) {
        delete players[id];
        socket.broadcast.emit('playerRemoved', id);
    };

    function playerMovement(data) {
        const { id, x, y } = data
        players[id].x = x;
        players[id].y = y;
        socket.broadcast.emit('playerMoved', players[id]);
    };

    function onSetup(userData) {
        personalUser = {
            ...personalUser,
            user: userData,
        };
        socket.join(userData._id);
        socket.emit("Connected");
    };

    const setupPlayer = (data) => {
        const newData = zlib.inflateSync(data).toString();
        const parsedData = JSON.parse(newData); 
        player = {
            user: parsedData.user,
            ascean: parsedData.ascean,
            stats: parsedData.stats,
            settings: parsedData.settings,
            temp: parsedData.temp,
            traits: parsedData.traits,
            room: parsedData.user._id,
        };
        combatData = {
            ...combatData,
            phaser: true
        };

        rooms.set(parsedData.user._id);
        socket.join(parsedData.user._id);
        io.to(parsedData.user._id).emit('playerSetup', `${parsedData.user.username} has joined with ${parsedData.ascean.name}.`);
    };

    const updatePlayer = (data) => {
        const inflate = zlib.inflateSync(data).toString();
        const parse = JSON.parse(inflate);
        combatData = {
            ...combatData,
            ...parse,
        };
    };

    const computerCombat = (data) => {
        combatData = { ...combatData, ...data };
        const res = gameService.phaserActionCompiler(combatData); // data
        const deflate = zlib.deflateSync(JSON.stringify(res));
        combatData = { ...combatData, ...res };
        io.to(player.room).emit('computerCombatResponse', deflate);
    };

    const playerBlindCombat = (data) => {
        const dec = zlib.inflateSync(data).toString();
        const parse = JSON.parse(dec);
        const blind = { ...combatData, ...parse };
        const res = gameService.phaserActionCompiler(blind);
        const deflate = zlib.deflateSync(JSON.stringify(res));
        combatData = { 
            ...combatData, 
            newPlayerHealth: res.newPlayerHealth,
            playerEffects: res.playerEffects,
        };
        io.to(player.room).emit('playerCombatResponse', deflate);
    };

    const enemyCombat = (data) => {
        const dec = zlib.inflateSync(data).toString();
        const parse = JSON.parse(dec);
        const enemy = { ...combatData, ...parse };
        const res = gameService.phaserActionCompiler(enemy); // data
        const deflate = zlib.deflateSync(JSON.stringify(res));
        combatData = {
            ...combatData,
            newPlayerHealth: res.newPlayerHealth,
            playerEffects: res.playerEffects,
        };
        io.to(player.room).emit('enemyCombatResponse', deflate);
    };

    const invokePrayer = (data) => {
        combatData = {
            ...combatData,
            'playerBlessing': data
        };
        const res = gameService.instantActionCompiler(combatData); // data
        combatData = {
            ...combatData,
            ...res,
        };
        const deflateResponse = zlib.deflateSync(JSON.stringify(res));
        io.to(player.room).emit('invokePrayerResponse', deflateResponse);
    };

    const consumePrayer = (data) => {
        combatData = {
            ...combatData,
            'playerEffects': data,
        };
        const res = gameService.consumePrayer(combatData); // data
        const deflateResponse = zlib.deflateSync(JSON.stringify(res));
        io.to(player.room).emit('consumePrayerResponse', deflateResponse);
    }; 

    const tshaeralAction = (data) => {
        combatData = { ...combatData, ...data };
    };

    const effectTick = (data) => {
        let { effect, effectTimer } = data;
        const res = gameService.phaserEffectTick({combatData, effect, effectTimer}); // data
        combatData = {
            ...combatData,
            ...res,
        };
        const deflateResponse = zlib.deflateSync(JSON.stringify(res));
        io.to(player.room).emit('effectTickResponse', deflateResponse);
    };

    const removeEffect = (data) => {
        const res = gameService.phaserRemoveTick({ combatData, statusEffect: data });
        combatData = {
            ...combatData,
            ...res,
        };
        const deflateResponse = zlib.deflateSync(JSON.stringify(res));
        io.to(player.room).emit('effectTickResponse', deflateResponse);
    };

    const updateCombatData = (data) => {  
        combatData = {
            ...combatData,
            ...data,
        };
    };

    const setupEnemy = (data) => {
        const inf = zlib.inflateSync(data).toString();
        const parse = JSON.parse(inf);
        combatData = {
            ...combatData,
            ...parse,
        newPlayerHealth: combatData.newPlayerHealth > combatData.playerHealth ? combatData.playerHealth : combatData.newPlayerHealth === 0 ? combatData.playerHealth * 0.05 : combatData.newPlayerHealth,
        };
    };

    const setupCombatData = (data) => {
        const inf = zlib.inflateSync(data).toString();
        const parse = JSON.parse(inf);
        combatData = { ...parse };
    };

    const setCombat = () => {
        combatData = {
            ...combatData,
            'combatEngaged': true,
            'combatRound': 1,
            'sessionRound': combatData.sessionRound === 0 ? 1 : combatData.sessionRound,
        };
    };

    const clearCombat = () => {
        combatData = {
            ...combatData,
            player_win: false,
            computer_win: false,
            combatEngaged: false,
            enemyPersuaded: false,
            instantStatus: false,
            action: '',
            counter_guess: '',
            computer_action: '',
            computer_counter_guess: '',
            playerTrait: '',
            player_action_description: '',
            computer_action_description: '',
            player_start_description: '',
            computer_start_description: '',
            player_death_description: '',
            computer_death_description: '',
            player_special_description: '',
            computer_special_description: '',
            player_influence_description: '',
            computer_influence_description: '',
            player_influence_description_two: '',
            computer_influence_description_two: '',
            potential_player_damage: 0,
            potential_computer_damage: 0,
            realized_player_damage: 0,
            realized_computer_damage: 0,
            playerDamaged: false,
            computerDamaged: false,
            combatRound: 0,
            actionData: [],
            typeAttackData: [],
            typeDamageData: [],
            totalDamageData: 0,
            prayerData: [],
            deityData: [],
            playerEffects: [],
            computerEffects: [],
        };
    };

    const clearEnemy = () => {
        combatData = {
            ...combatData,
            computer: null,
            persuasionScenario: false,
            luckoutScenario: false,
            enemyPersuaded: false,
            player_luckout: false,
            player_win: false,
            playerGrapplingWin: false,
            computer_win: false,
            combatEngaged: false,
            playerTrait: '',
            isEnemy: false,
        };
    };

    const setPhaserAggression = (data) => {
        combatData = {
            ...combatData,
            'isAggressive': data,
            'combatEngaged': data
        };
    };

    const playerWin = (data) => {
        combatData = {
            ...combatData,
            weapons: data,
            loseStreak: 0,
            winStreak: combatData.winStreak + 1,
            highScore: combatData.highScore < combatData.winStreak + 1 ? combatData.winStreak + 1 : combatData.highScore,
            instantStatus: false,
        };
    };

    const computerWin = (data) => {
        combatData = {
            ...combatData,
            weapons: data,
            winStreak: 0,
            loseStreak: combatData.loseStreak + 1,
            combatEngaged: false,
            instantStatus: false,
        };  
    };

    function joinRoom(preData, callback) {
        const newData = zlib.inflateSync(preData).toString();
        const data = JSON.parse(newData);
        const room = rooms.get(data.room);
        if (!room) {
            exists = false;
            rooms.set(data.room, { playersInRoom: new Set(), password: data.password }); // new Set()
        };
        const { playersInRoom, password: correctPassword } = rooms.get(data.room);
        const numPlayers = playersInRoom.size;
        if (numPlayers >= maxPlayersPerRoom && data.room !== 'Lobby') {
            return callback('The Room you attempted to join is full.');
        };
        if (data.password !== correctPassword) {
            return callback('You have typed the incorrect password for room: ' + data.room);
        };
        playersInRoom.add(socket.id);
        socket.join(data.room);
        callback(); 
        console.log(`User with ID: ${socket.id} joined room: ${data.room} with ${data.ascean.name}`);
        connectedUsersCount = io.sockets.adapter.rooms.get(data.room).size;

        newUser = {
            ascean: data.ascean,
            id: socket.id,
            position: connectedUsersCount,
            room: data.room,
            ready: false,
            user: data.user,
            x: data.x,
            y: data.y,
        }; 
        players[socket.id] = newUser;
        io.to(data.room).emit('playerAdded', newUser);

        const welcomeMessage = {
            room: data.room,
            sender: {
                username: 'The Ascea',
            }, 
            message: `Welcome, ${data?.user.username.charAt(0).toUpperCase() + data?.user.username.slice(1)}. You have connected to ${data.room === 'Lobby' ? 'the Lobby' : `room ${data.room}`}.`,
            time: Date.now()
        };
        const userUpdateMessage = {
            room: data.room,
            sender: {
                username: 'The Ascea',
            }, 
            message: `${data?.user.username.charAt(0).toUpperCase() + data?.user.username.slice(1)} has joined ${data.room === 'Lobby' ? 'the Lobby' : `room ${data.room}`}.`,
            time: Date.now()
        };

        socket.to(data.room).emit('receiveMessage', userUpdateMessage);
        socket.emit('receiveMessage', welcomeMessage);
    };

    async function createMap(mapData) {
        const map = new WorldMap(mapData.name, mapData.ascean);
        newMap = zlib.deflateSync(JSON.stringify(map));
        const roomSockets = await io.of('/').in(newUser.room).fetchSockets();
        for (const clientSocket of roomSockets) {
        clientSocket.emit('mapCreated', newMap);
        };
    };

    async function playerDirection(directionData) {
        const newDirection = directionData;
        io.to(newUser.room).emit('playerDirectionChanged', newDirection);
    };

    async function commenceGame() {
        const username = personalUser.user.username;
        const messageData = {
            room: newUser.room,
            author: 'The Ascea',
            message: `Welcome, ${username.charAt(0).toUpperCase() + username.slice(1)}, to the Ascea. Your game is commencing in 10 seconds. Prepare, and good luck with ${personalUser.ascean.name}.`,
            time: Date.now(),
        };
        socket.emit('Game Commencing', messageData);
    };

    async function syncMapContent(mapData) {
        console.log('Syncing Map Content');
        const newMap = mapData;
        socket.to(newUser.room).emit('mapContentSynced', newMap);
    };

    async function newEnvironmentTile(tileData) {
        console.log("New Environment");
        socket.to(newUser.room).emit('newEnvironment', tileData);
    };

    socket.on("setup", onSetup);
    socket.on('clearCombat', clearCombat);
    socket.on('setCombat', setCombat);
    socket.on('setupPlayer', setupPlayer);
    socket.on('updatePlayer', updatePlayer);
    socket.on('setupEnemy', setupEnemy);
    socket.on('clearEnemy', clearEnemy);
    socket.on('setupCombatData', setupCombatData);
    socket.on('updateCombatData', updateCombatData);
    socket.on('setPhaserAggression', setPhaserAggression);

    socket.on('sendPlayer', sendPlayer);
    socket.on('removePlayer', removePlayer);
    socket.on('playerMovement', playerMovement);

    socket.on('playerAction', playerBlindCombat);
    socket.on('computerCombat', computerCombat);
    socket.on('enemyAction', enemyCombat);
    socket.on('invokePrayer', invokePrayer);
    socket.on('consumePrayer', consumePrayer);
    socket.on('tshaeralAction', tshaeralAction);
    socket.on('effectTick', effectTick);
    socket.on('removeEffect', removeEffect);
    socket.on('playerWin', playerWin);
    socket.on('computerWin', computerWin);

    socket.on("joinRoom", joinRoom);
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stopTyping', (room) => socket.in(room).emit('stopTyping'));
    socket.on('createMap', createMap);
    socket.on('playerDirectionChange', playerDirection);
    socket.on('commenceGame', commenceGame);
    socket.on('syncMapContent', syncMapContent);
    socket.on('newEnvironmentTile', newEnvironmentTile);

    socket.on("join_chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("new_message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;
        if (!chat.users) return console.log('Chat.Users is not defined');
        chat.users.forEach(user => {
            if (user._id === newMessageReceived.sender._id) return;
            socket.in(user._id).emit("messageReceived", newMessageReceived);
        });
    });

    socket.on('ascean', async (asceanData) => {
        const newData = zlib.inflateSync(asceanData).toString();
        const parsedData = JSON.parse(newData);
        socket.to(parsedData.room).emit('update_ascean', parsedData);
    });

    socket.on('spectatePlayer', async (playerData) => {
        io.to(newUser.room).emit('requestSpectatePlayer', playerData);
    });

    socket.on('spectatePlayerData', async (playerData) => {
        io.to(newUser.room).emit('spectatePlayerResponse', playerData);
    });

    socket.on('updateSpectatorData', async (spectator, data) => {
        io.to(newUser.room).emit('spectateUpdate', spectator, data);
    });

    socket.on('duelDataShare', async (duelData) => {
        console.log("Sharing Duel Data")
        io.to(newUser.room).emit('duelDataShared', duelData);
    });

    socket.on('pvpInitiated', async (pvpData) => {
        const inflateState = zlib.inflateSync(pvpData).toString();
        const pvpState = JSON.parse(inflateState);
        console.log('PvP Initiated: ', pvpState.playerPosition, pvpState.action);
        const playerKey = pvpState.playerPosition < pvpState.enemyPosition ? 'playerOneData' : 'playerTwoData';
        if (pvpState.playerPosition < pvpState.enemyPosition) {
        pvpState.playerOneReady = true;
        } else {
        pvpState.playerTwoReady = true;
        };
        pvpState.timestamp = pvpState.timestamp ? pvpState.timestamp + 1 : 1;  
        duelData[playerKey] = {
        ...duelData[playerKey],
        ...pvpState,
        };
        if (duelData.playerOneData && duelData.playerTwoData && duelData.playerOneData.playerOneReady === true && duelData.playerTwoData.playerTwoReady === true) {
        const response = await pvpService.pvpActionCompiler(duelData);
        duelData = response;
        const deflateResponse = zlib.deflateSync(JSON.stringify(response));
        io.to(newUser.room).emit('pvpInitiateUpdate', deflateResponse);
        } else {
        const deflateResponse = zlib.deflateSync(JSON.stringify(duelData));
        io.to(newUser.room).emit('pvpInitiateSoftUpdate', deflateResponse);
        };
    });
        
    socket.on('instantActionPvP', async (instantData) => {
        const inflateData = zlib.inflateSync(instantData).toString();
        const parsedData = JSON.parse(inflateData);
        const response = await pvpService.instantActionCompiler(parsedData);
        const deflateReponse = zlib.deflateSync(JSON.stringify(response));
        io.to(newUser.room).emit('instantResponsePvP', deflateReponse);
    });

    socket.on('consumePrayerPvP', async (prayerData) => {
        const inflatePrayer = zlib.inflateSync(prayerData).toString();
        const parsedPrayer = JSON.parse(inflatePrayer);
        const response = await pvpService.consumePrayer(parsedPrayer);
        const deflateReponse = zlib.deflateSync(JSON.stringify(response));
        io.to(newUser.room).emit('consumePrayerResponsePvP', deflateReponse);
    });

    socket.on('combatData_update', async () => {
        let newData = {
        user: newUser.user,
        room: newUser.room,
        combatData: combatData,
        player: newUser.player
        };
        io.to(newData.room).emit('updated_combatData', newData)
    });

    socket.on('share_combatdata', async (data) => { // THis was to share combatData but now I have it passing via the entire newUser object
        console.log('Sharing Combat Data')
        let newData = {
        user: newUser.user,
        room: newUser.room,
        combatData: data,
        player: newUser.player
        };
        socket.to(newUser.room).emit('sharing_combatdata', newData)
    });

    socket.on('requestNewPlayer', async () => {
        console.log('Requesting Data')
        socket.to(newUser.room).emit('requestingPlayerData');
    });

    socket.on('playerDataResponding', async () => {
        console.log('Responding Data')
        const compressUser = zlib.deflateSync(JSON.stringify(newUser));
        socket.to(newUser.room).emit('newPlayerDataResponse', compressUser)
    });

    socket.on('update_player_data', async (data) => {
        console.log('Updating Player Data');
        let newData = {
        player: newUser.player,
        ascean: data,
        };
        socket.to(newUser.room).emit('updatePlayerData', newData);
    });

    socket.on('player_game_ready', async (data) => { // user
        let newData = data;
        io.to(newData.room).emit('player_ready', newData);
    });

    socket.on('duel_ready', async (data) => {
        let newData = data;
        let duelMessage = {
        room: data.room,
        author: 'The Ascea',
        message: '',
        time: Date.now()
        }
        if (newUser.player === 1) {
        newData.player_one_ready = true;
        duelMessage.message = `${data.player_one.name.charAt(0).toUpperCase() + data.player_one.name.slice(1)} is ready to duel.`
        io.to(duelMessage.room).emit(`receiveMessage`, duelMessage)
        } else {
        newData.player_two_ready = true;
        duelMessage.message = `${data.player_two.name.charAt(0).toUpperCase() + data.player_two.name.slice(1)} is ready to duel.`
        io.to(duelMessage.room).emit(`receiveMessage`, duelMessage)
        };
        if (newData.player_one_ready === true && newData.player_two_ready === true) {
        io.to(newUser.room).emit('Game Commencing');
        } else {
        console.log(newUser.room, 'New User Room?')
        io.to(newUser.room).emit('duel_ready_response', newData)
        };
    });

    socket.on('computer_combat_initiated', async (combatData) => {
        const inflateData = zlib.inflateSync(combatData).toString();
        const parsedData = JSON.parse(inflateData);
        const response = await pvpService.actionCompiler(parsedData);
        const deflateResponse = zlib.deflateSync(JSON.stringify(response));
        io.to(newUser.room).emit('combat_response', deflateResponse);
    });

    socket.on('instant_action', async (instantData) => {
        const inflateData = zlib.inflateSync(instantData).toString();
        const parsedData = JSON.parse(inflateData);
        const response = await pvpService.instantActionCompiler(parsedData);
        const deflateResponse = zlib.deflateSync(JSON.stringify(response));
        io.to(newUser.room).emit('instant_response', deflateResponse);
    });

    socket.on('consume_prayer', async (prayerData) => {
        const inflateData = zlib.inflateSync(prayerData).toString();
        const parsedData = JSON.parse(inflateData);
        const response = await pvpService.consumePrayer(parsedData);
        const deflateResponse = zlib.deflateSync(JSON.stringify(response));
        io.to(newUser.room).emit('consume_prayer_response', deflateResponse);
    });

    socket.on('pvp_initiated', async (data) => {
        const inflateData = zlib.inflateSync(data).toString();
        const parsedData = JSON.parse(inflateData);
        let newData = parsedData;
        if (newUser.playerPosition === 1) {
        newData.player_one_initiated = true;
        } else {
        newData.player_two_initiated = true;
        };
        
        if (newData.player_one_initiated === true && newData.player_two_initiated === true) {
        const response = await pvpService.actionCompiler(parsedData);
        const deflateResponse = zlib.deflateSync(JSON.stringify(response));
        io.to(newUser.room).emit('combat_response', deflateResponse);
        } else {
        const deflateResponse = zlib.deflateSync(JSON.stringify(newData));
        io.to(newUser.room).emit('soft_response', deflateResponse);
        };
    });

    socket.on('request_reduel', async (data) => {
        let newData = data;
        if (newUser.player === 1) {
            newData.player_one_reduel = true;
        } else {
            newData.player_two_reduel = true;
        }
        if (newData.player_one_reduel === true && newData.player_two_reduel === true) {
            io.to(newUser.room).emit('reset_duel');
        } else {
            io.to(newUser.room).emit('reduel_requested', newData);
        }
    });
    
    socket.on('auto_engage', async (combatData) => {
        const inflateData = zlib.inflateSync(combatData).toString();
        const parsedData = JSON.parse(inflateData);
        const response = await pvpService.actionCompiler(parsedData);
        const deflateResponse = zlib.deflateSync(JSON.stringify(response));
        io.to(newUser.room).emit('combat_response', deflateResponse);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receiveMessage", data);
        console.log(data);
    });

    socket.on("send_ascean", (data) => {
        socket.to(data.room).emit("receive_opponent", data);
    });

    socket.on('leaveRoom', () => {
        const room = rooms.get(newUser.room);
        if (!room) return;
        const { playersInRoom } = room;
        playersInRoom.delete(socket.id);
        if (playersInRoom.size === 0) {
            rooms.delete(room.id);
        } else {
            socket.to(newUser.room).emit('removePlayer', socket.id);
            // socket.to(newUser.room).emit("playerLeft", newUser.player);
            const message = {
                room: newUser.room,
                sender: {
                    username: 'The Ascea',
                }, 
                message: `${newUser.user.username.charAt(0).toUpperCase() + newUser.user.username.slice(1)} has left ${newUser.room === 'Lobby' ? 'the Lobby' : `room ${newUser.room}`}.`,
                time: Date.now()
            };
            socket.to(newUser.room).emit('receiveMessage', message);
        };
        socket.leave(newUser.room);
        for (const player in players) {
            delete players[player];
        };
    });

    socket.off("setup", () => {
        socket.leave(userData._id);
    });

    socket.on("disconnect", () => {
        const room = rooms.get(newUser.room);
        if (!room) return;
        const { playersInRoom } = room;
        playersInRoom.delete(socket.id);
        if (playersInRoom.size === 0) {
            rooms.delete(room.id);
        } else {
            socket.to(newUser.room).emit('removePlayer', socket.id);
            // socket.to(newUser.room).emit("playerLeft", newUser.player);
            const message = {
                room: newUser.room,
                sender: {
                    username: 'The Ascea',
                }, 
                message: `${newUser.user.username.charAt(0).toUpperCase() + newUser.user.username.slice(1)} has left ${newUser.room === 'Lobby' ? 'the Lobby' : `room ${newUser.room}`}.`,
                time: Date.now()
            };
            socket.to(newUser.room).emit('receiveMessage', message);
        };
        socket.leave(newUser.room);
        for (const player in players) {
            delete players[player];
        };
    });
});
