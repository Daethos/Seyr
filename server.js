require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

require('./config/database');

const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
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

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const pvpService = require('./services/pvpServices')
const asceanService = require('./services/asceanServices')
const questService = require('./services/questServices')
const WorldMap = require('./services/worldServices')
const port = process.env.PORT || 3001;

const server = app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});
// https://ascea.herokuapp.com
// http://localhost:3000
const io = require('socket.io')(server, {
  cors:  {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("generate-map", async (data) => {
    console.log("Map Generating At: " + Date.now())
    const map = new WorldMap(data.name, data.ascean);
    socket.emit("map-generated", map);
    console.log("Map Generated At: " + Date.now())
  });

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData.username, userData._id);
    socket.emit("Connected");
  })

   socket.on("join_chat", (room) => {
      socket.join(room)
      console.log("User Joined Room: " + room)
   });

   socket.on('typing', (room) => socket.in(room).emit('typing'))
   socket.on('stop_typing', (room) => socket.in(room).emit('stop_typing'))

   socket.on("new_message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log('Chat.Users is not defined')

    chat.users.forEach(user => {
      if (user._id === newMessageReceived.sender._id) return

      socket.in(user._id).emit("message_received", newMessageReceived);
    })
   });

   let numPlayers = 0;

  // THIS IS FOR NON SAVEABLE CHAT
  socket.on("join_room", async (data) => {
    socket.join(data.room);
    // console.log(room.user.use, 'New Player Joining')
    console.log(`User with ID: ${socket.id} joined room: ${data.room} with ${data.ascean.name}`)
    
    let connectedUsersCount = io.sockets.adapter.rooms.get(data.room).size
    console.log(connectedUsersCount, 'Number of Users in Room ', data.room)

    let newUser = {
      room: data.room,
      ascean: data.ascean,
      user: data.user,
      player: connectedUsersCount,
    }

    const response = await asceanService.asceanCompiler(data.ascean);
    io.to(data.room).emit(`player_data`, response.data);
    // console.log(response, 'Response from Ascean Service')

    let combatData = {

      room: data.room,

      player: {},
      action: '',
      player_action: '',
      counter_guess: '',
      playerBlessing: 'Buff',
      prayerSacrifice: '',
      player_health: 0,
      current_player_health: 0,
      new_player_health: 0,

      weapons: [],
      weapon_one: {},
      weapon_two: {},
      weapon_three: {},
      playerEffects: [],
      player_damage_type: '',
      player_defense: {},
      player_attributes: {},
      player_defense_default: {},
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

    }

    newUser.combatData.player_one = response.data.ascean,
    newUser.combatData.player_one_health = response.data.attributes.healthTotal,
    newUser.combatData.current_player_one_health = response.data.attributes.healthTotal,
    newUser.combatData.new_player_one_health = response.data.attributes.healthTotal,
    newUser.combatData.player_one_weapons = [response.data.combat_weapon_one, response.data.combat_weapon_two, response.data.combat_weapon_three],
    newUser.combatData.player_one_weapon_one = response.data.combat_weapon_one,
    newUser.combatData.player_one_weapon_two = response.data.combat_weapon_two,
    newUser.combatData.player_one_weapon_three = response.data.combat_weapon_three,
    newUser.combatData.player_one_damage_type = response.data.combat_weapon_one.damage_type,
    newUser.combatData.player_one_defense = response.data.defense,
    newUser.combatData.player_one_attributes = response.data.attributes
    
    
    combatData.player = response.data.ascean,
    combatData.player_health = response.data.attributes.healthTotal,
    combatData.current_player_health = response.data.attributes.healthTotal,
    combatData.new_player_health = response.data.attributes.healthTotal,
    combatData.player_weapons = [response.data.combat_weapon_one, response.data.combat_weapon_two, response.data.combat_weapon_three],
    combatData.player_weapon_one = response.data.combat_weapon_one,
    combatData.player_weapon_two = response.data.combat_weapon_two,
    combatData.player_weapon_three = response.data.combat_weapon_three,
    combatData.player_damage_type = response.data.combat_weapon_one.damage_type,
    combatData.player_defense = response.data.defense,
    combatData.player_attributes = response.data.attributes
    

    io.to(data.room).emit(`new_user`, newUser)

    const helloMessage = {
      room: data.room,
      author: `The Seyr`,
      message: `Welcome to the Ascea, ${data?.user.username.charAt(0).toUpperCase() + data?.user.username.slice(1)}.`,
      time: Date.now()
    }

    io.to(data.room).emit(`receive_message`, helloMessage)

    socket.on(`ascean`, async (asceanData) => { // Used to update the Ascean Data, may repurpose this for when combat triggers
      console.log('Did the Ascean Update start?');
      socket.to(asceanData.room).emit(`update_ascean`, asceanData);
    })

    socket.on(`combatData_update`, async () => {
      console.log('Updating Combat Data')
      let newData = {
        user: newUser.user,
        room: newUser.room,
        combatData: combatData,
        player: newUser.player
      };
      // newData = combatData
      // console.log(newData, 'Updated Data?')
      io.to(newData.room).emit(`updated_combatData`, newData)
    })

    socket.on(`share_combatdata`, async (data) => { // THis was to share combatData but now I have it passing via the entire newUser object
      console.log('Sharing Combat Data')
      let newData = {
        user: newUser.user,
        room: newUser.room,
        combatData: data,
        player: newUser.player
      };
      socket.to(newUser.room).emit(`sharing_combatdata`, newData)
    })

    socket.on(`request_new_player`, async () => {
      console.log(`Requesting Data`)
      socket.to(newUser.room).emit(`requesting_player_data`);
    });

    socket.on(`player_data_responding`, async () => {
      console.log(`Responding Data`)
      socket.to(newUser.room).emit(`new_player_data_response`, newUser)
    });

    socket.on(`duel_ready`, async (data) => {
      let newData = data;
      let duelMessage = {
        room: data.room,
        author: `The Seyr`,
        message: ``,
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
      } 
      if (newData.player_one_ready === true && newData.player_two_ready === true) {
        io.to(newUser.room).emit(`Game Commencing`)
      } else {
        console.log(newUser.room, 'New User Room?')
        io.to(newUser.room).emit(`duel_ready_response`, newData)
      }
    })

    socket.on(`initiated`, async (data) => {
      let newData = data;
      // console.log(newData, 'Did the New Data transcribe?')
      if (newUser.player === 1) {
        newData.player_one_initiated = true;
      } else {
        newData.player_two_initiated = true;
      };
      
      if (newData.player_one_initiated === true && newData.player_two_initiated === true) {
        const response = await pvpService.actionCompiler(data)
        console.log(response, 'Is This Null?')
        io.to(newUser.room).emit(`combat_response`, response);
      } else {
        io.to(newUser.room).emit(`soft_response`, newData);
      };
    });

    socket.on(`request_reduel`, async (data) => {
      let newData = data;
      if (newUser.player === 1) {
        newData.player_one_reduel = true;
      } else {
        newData.player_two_reduel = true;
      }
      // console.log(newData, 'Did the New Data transcribe?')
      if (newData.player_one_reduel === true && newData.player_two_reduel === true) {
        // const response = await pvpService.actionCompiler(data)
        io.to(newUser.room).emit(`reset_duel`);
      } else {
        io.to(newUser.room).emit(`reduel_requested`, newData);
      }

    })
    
    socket.on(`auto_engage`, async (combatData) => {
      const response = await pvpService.actionCompiler(combatData)
      // console.log(response, 'Is this Null?')
      io.to(combatData.room).emit(`combat_response`, response)
    })

  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  })

  socket.on("send_ascean", (data) => {
    socket.to(data.room).emit("receive_opponent", data);

    console.log(players, 'Player(s) in Send Ascean Socket')

    // console.log(data)
  })



  // socket.on("disconnect", () => {
  //   console.log('User Disconnected', socket.id);
  // });

  socket.off("setup", () => {
    console.log('User Disonnected');
    socket.leave(userData._id);
  });
});
