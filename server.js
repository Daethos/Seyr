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
app.use(express.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'build'))); // this allows express to find the build folder
app.use(require('./config/auth')); 

app.use('/api/users', require('./routes/api/users')); // USERS IS NOW LIVE!
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
app.use('/api/quest', require('./routes/api/quest'));
app.use('/api/gamesettings', require('./routes/api/gamesettings'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const pvpService = require('./services/pvpServices');
const asceanService = require('./services/asceanServices');
const questService = require('./services/questServices');
const WorldMap = require('./services/worldServices');
const port = process.env.PORT || 3001;
const URL = process.env.DATABASE_URL || 'mongodb://localhost:3000';
const debug = require('debug')('socket');
const server = app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});
// https://ascea.herokuapp.com
// http://localhost:3000
const io = require('socket.io')(server, {
  transports: ['websocket'],
  maxHttpBufferSize: 1e8,
  cors:  {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.engine.pingInterval = 30000;
io.engine.pingTimeout = 5000;
io.on("connection", (socket) => {
  const clientIp = socket.handshake.address;
  debug(`Client connected from ${clientIp}`);
  socket.onAny((eventName, ...args) => {
    const data = args[0];
    const size = data ? JSON.stringify(data).length : 0;
    console.log((size / 1000), "KBs");
    debug(`Message from client: ${eventName}, size: ${size} bytes`);
  });
  console.log(`User Connected: ${socket.id}`);
  let connectedUsersCount;
  let personalUser = { user: null, ascean: null };
  let newUser = { user: null, room: null, ascean: null, player: null, ready: false };
  let mapSyncData = {};
  let combatData = {};
  let newMap = {};
  let duelData = { playerOneData: null, playerTwoData: null };
  let playerStateData = {
    playerOne: null,
    playerTwo: null,
    playerThree: null,
    playerFour: null,
  };

  async function onSetup(userData) {
    console.log("Setting Up");
    personalUser.user = userData;
    socket.join(userData._id);
    console.log(userData.username, userData._id);
    socket.emit("Connected");
  };

  async function joinRoom(preData) {
    const newData = zlib.inflateSync(preData).toString();
    const data = JSON.parse(newData);
    socket.join(data.room);
    console.log(`User with ID: ${socket.id} joined room: ${data.room} with ${data.ascean.name}`);
    connectedUsersCount = io.sockets.adapter.rooms.get(data.room).size;
    if (data.user._id === personalUser.user._id) personalUser.ascean = data.ascean;
    newUser = {
      room: data.room,
      ascean: data.ascean,
      user: data.user,
      player: connectedUsersCount,
      ready: false,
    };
    if (newUser.player === 1) {
      playerStateData.playerOne = newUser;
    } else if (newUser.player === 2) {
      playerStateData.playerTwo = newUser;
    } else if (newUser.player === 3) {
      playerStateData.playerThree = newUser;
    } else if (newUser.player === 4) {
      playerStateData.playerFour = newUser;
    };
    
    const response = await asceanService.asceanCompiler(data.ascean);
    const responseData = {
      data: response.data,
      user: data.user,
    };
    combatData = {
      room: data.room,
  
      player: response.data.ascean,
      action: '',
      player_action: '',
      counter_guess: '',
      playerBlessing: 'Buff',
      prayerSacrifice: '',
      player_health: response.data.attributes.healthTotal,
      current_player_health: response.data.attributes.healthTotal,
      new_player_health: response.data.attributes.healthTotal,
  
      weapons: [response.data.combat_weapon_one, response.data.combat_weapon_two, response.data.combat_weapon_three],
      weapon_one: response.data.combat_weapon_one,
      weapon_two: response.data.combat_weapon_two,
      weapon_three: response.data.combat_weapon_three,
      playerEffects: [],
      player_damage_type: response.data.combat_weapon_one.damage_type,
      player_defense: response.data.defense,
      player_attributes: response.data.attributes,
      player_defense_default: response.data.defense,
      realized_player_damage: 0,
      player_start_description: '',
      player_special_description: '',
      player_action_description: '',
      player_influence_description: '',
      player_influence_description_two: '',
      player_death_description: '',
  
      critical_success: false,
      counter_success: false,
      dual_wielding: false,
      glancing_blow: false,
      religious_success: false,
      roll_success: false,
      player_win: false,
  
      enemy: {},
      enemy_action: '',
      enemy_counter_guess: '',
      enemyBlessing: 'Buff',
      enemy_health: 0,
      current_enemy_health: 0,
      new_enemy_health: 0,
  
      enemy_weapons: [],
      enemy_weapon_one: {},
      enemy_weapon_two: {},
      enemy_weapon_three: {},
      enemyEffects: [],
      enemy_damage_type: '',
      enemy_defense: {},
      enemy_attributes: {},
      enemy_defense_default: {},
      realized_enemy_damage: 0,
  
      attack_weight: 0,
      counter_weight: 0,
      dodge_weight: 0,
      posture_weight: 0,
      roll_weight: 0,
      counter_attack_weight: 0,
      counter_counter_weight: 0,
      counter_dodge_weight: 0,
      counter_posture_weight: 0,
      counter_roll_weight: 0,
  
      enemy_start_description: '',
      enemy_special_description: '',
      enemy_action_description: '',
      enemy_influence_description: '',
      enemy_influence_description_two: '',
      enemy_death_description: '',
  
      enemy_critical_success: false,
      enemy_counter_success: false,
      enemy_dual_wielding: false,
      enemy_glancing_blow: false,
      enemy_religious_success: false,
      enemy_roll_success: false,
      enemy_win: false,
  
      playerReady: false,
      enemyReady: false,
      playerOneReady: false,
      playerTwoReady: false,
  
      combatInitiated: false,
      actionStatus: false,
      gameIsLive: false,
      combatEngaged: false,
      dodgeStatus: false,
      instantStatus: false,
  
      combatRound: 0,
      sessionRound: 0,
      highScore: 0,
      winStreak: 0,
      loseStreak: 0,
      weather: '',
    };
    io.to(data.room).emit(`playerData`, responseData);
    io.to(data.room).emit(`player_position`, newUser);
    io.to(data.room).emit(`player_state`, playerStateData);
    io.to(data.room).emit('newUser', newUser);
    
    const helloMessage = {
      room: data.room,
      author: 'The Ascea',
      message: `Welcome to the Ascea, ${data?.user.username.charAt(0).toUpperCase() + data?.user.username.slice(1)}.`,
      time: Date.now()
    };
    const userUpdateMessage = {
      room: data.room,
      author: 'The Ascea',
      message: `${data?.user.username.charAt(0).toUpperCase() + data?.user.username.slice(1)} has joined the game.`,
      time: Date.now()
    };
    socket.to(data.room).emit('receive_message', userUpdateMessage);
    socket.emit('receive_message', helloMessage);
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
    // mapSyncData = newMap;
    socket.broadcast.emit('mapContentSynced', newMap);
  };

  async function newEnvironmentTile(tileData) {
    console.log("New Environment");
    socket.broadcast.emit('newEnvironment', tileData);
  };

  socket.on("setup", onSetup);
  socket.on("join_room", joinRoom);
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop_typing', (room) => socket.in(room).emit('stop_typing'));
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
      socket.in(user._id).emit("message_received", newMessageReceived);
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
      io.to(duelMessage.room).emit(`receive_message`, duelMessage)
    } else {
      newData.player_two_ready = true;
      duelMessage.message = `${data.player_two.name.charAt(0).toUpperCase() + data.player_two.name.slice(1)} is ready to duel.`
      io.to(duelMessage.room).emit(`receive_message`, duelMessage)
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

  })
  
  socket.on('auto_engage', async (combatData) => {
    const inflateData = zlib.inflateSync(combatData).toString();
    const parsedData = JSON.parse(inflateData);
    const response = await pvpService.actionCompiler(parsedData);
    const deflateResponse = zlib.deflateSync(JSON.stringify(response));
    io.to(newUser.room).emit('combat_response', deflateResponse);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("send_ascean", (data) => {
    socket.to(data.room).emit("receive_opponent", data);
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
