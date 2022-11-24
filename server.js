require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');


require('./config/database');

// Require controllers here

const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());




// add in when the app is ready to be deployed
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build'))); // this allows express to find the build folder
// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user

// TODO: Remember to update this
// FIXME: When you add the file again
app.use(require('./config/auth')); 

// api routes must be before the "catch all" route

// TODO: Remember to update this
// FIXME: When you add the file again
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

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`)
//   })

//   socket.on("disconnect", () => {
//     console.log('User Disconnected', socket.id);
//   });
// });

// server.listen(3002, () => {
//   console.log('SERVER RUNNING')
// });
const pvpService = require('./services/pvpServices')
const asceanService = require('./services/asceanServices')
const port = process.env.PORT || 3001;

const server = app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});

const io = require('socket.io')(server, {
  cors:  {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

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
      combatData: data.combatData,
      player: connectedUsersCount,
    }

    const response = await asceanService.asceanCompiler(data.ascean)
    // console.log(response, 'Response from Ascean Service')

    let combatData = {
      room: data.room,
      action: '',
      player_one: '',
      player_one_action: '',
      player_one_counter_guess: '',
      player_one_health: 0,
      player_one_weapons: [],
      player_one_weapon_one: {},
      player_one_weapon_two: {},
      player_one_weapon_three: {},
      player_one_defense: {},
      player_one_attributes: {},
      current_player_one_health: 0,
      new_player_one_health: 0,

      player_one_religious_success: false,
      player_one_dual_wielding: false,
      player_one_critical_success: false,
      player_one_counter_success: false,
      player_one_roll_success: false,
      player_one_win: false,

      player_one_start_description: '',
      player_one_special_description: '',
      player_one_action_description: '',
      player_one_influence_description: '',
      player_one_influence_description_two: '',

      player_two: '',
      player_two_health: 0,
      player_two_action: '',
      player_two_counter_guess: '',
      player_two_weapons: [],
      player_two_weapon_one: {},
      player_two_weapon_two: {},
      player_two_weapon_three: {},
      player_two_defense: {},
      player_two_attributes: {},
      player_two_start_description: '',
      player_two_special_description: '',
      player_two_action_description: '',
      player_two_influence_description: '',
      player_two_influence_description_two: '',

      current_player_two_health: 0,
      new_player_two_health: 0,

      player_two_critical_success: false,
      player_two_dual_wielding: false,
      player_two_roll_success: false,
      player_two_counter_success: false,
      player_two_win: false,
    }

    if (newUser.player === 1) {
      newUser.combatData.player_one = response.data.ascean,
      newUser.combatData.player_one_health = response.data.attributes.healthTotal,
      newUser.combatData.current_player_one_health = response.data.attributes.healthTotal,
      newUser.combatData.new_player_one_health = response.data.attributes.healthTotal,
      newUser.combatData.player_one_weapons = [response.data.combat_weapon_one, response.data.combat_weapon_two, response.data.combat_weapon_three],
      newUser.combatData.player_one_weapon_one = response.data.combat_weapon_one,
      newUser.combatData.player_one_weapon_two = response.data.combat_weapon_two,
      newUser.combatData.player_one_weapon_three = response.data.combat_weapon_three,
      newUser.combatData.player_one_defense = response.data.defense,
      newUser.combatData.player_one_attributes = response.data.attributes
      
      
      combatData.player_one = response.data.ascean,
      combatData.player_one_health = response.data.attributes.healthTotal,
      combatData.current_player_one_health = response.data.attributes.healthTotal,
      combatData.new_player_one_health = response.data.attributes.healthTotal,
      combatData.player_one_weapons = [response.data.combat_weapon_one, response.data.combat_weapon_two, response.data.combat_weapon_three],
      combatData.player_one_weapon_one = response.data.combat_weapon_one,
      combatData.player_one_weapon_two = response.data.combat_weapon_two,
      combatData.player_one_weapon_three = response.data.combat_weapon_three,
      combatData.player_one_defense = response.data.defense,
      combatData.player_one_attributes = response.data.attributes
    
    }

    if (newUser.player === 2) {
      newUser.combatData.player_two = response.data.ascean,
      newUser.combatData.player_two_health = response.data.attributes.healthTotal,
      newUser.combatData.current_player_two_health = response.data.attributes.healthTotal,
      newUser.combatData.new_player_two_health = response.data.attributes.healthTotal,
      newUser.combatData.player_two_weapons = [response.data.combat_weapon_one, response.data.combat_weapon_two, response.data.combat_weapon_three],
      newUser.combatData.player_two_weapon_one = response.data.combat_weapon_one,
      newUser.combatData.player_two_weapon_two = response.data.combat_weapon_two,
      newUser.combatData.player_two_weapon_three = response.data.combat_weapon_three,
      newUser.combatData.player_two_defense = response.data.defense,
      newUser.combatData.player_two_attributes = response.data.attributes
    
      
      combatData.player_two = response.data.ascean,
      combatData.player_two_health = response.data.attributes.healthTotal,
      combatData.current_player_two_health = response.data.attributes.healthTotal,
      combatData.new_player_two_health = response.data.attributes.healthTotal,
      combatData.player_two_weapons = [response.data.combat_weapon_one, response.data.combat_weapon_two, response.data.combat_weapon_three],
      combatData.player_two_weapon_one = response.data.combat_weapon_one,
      combatData.player_two_weapon_two = response.data.combat_weapon_two,
      combatData.player_two_weapon_three = response.data.combat_weapon_three,
      combatData.player_two_defense = response.data.defense,
      combatData.player_two_attributes = response.data.attributes
    
    }

    io.to(data.room).emit(`new_user`, newUser)

    socket.on(`ascean`, async (asceanData) => {
      console.log('Did the Ascean Update start?')
      socket.to(asceanData.room).emit(`update_ascean`, asceanData)
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

    socket.on(`share_combatdata`, async (data) => {
      console.log('Sharing Combat Data')
      let newData = {
        user: newUser.user,
        room: newUser.room,
        combatData: data,
        player: newUser.player
      };
      socket.to(newUser.room).emit(`sharing_combatdata`, newData)
    })

    socket.on(`request_data`, async () => {
      console.log(`Requesting Data`)
      socket.to(newUser.room).emit(`requesting_data`)
    })
    socket.on(`data_responding`, async () => {
      console.log(`Responding Data`)
      socket.to(newUser.room).emit(`data_response`, newUser)
    })
    
    if (connectedUsersCount === 2) {
      io.to(data.room).emit(`Game Commencing`)
    }

    socket.on(`initiated`, async (data) => {
      let newData = data;
      console.log(newData, 'Did the New Data transcribe?')
      if (newUser.player === 1) {
        newData.player_one_initiated = true;
      } else {
        newData.player_two_initiated = true;
      }
      
      if (newData.player_one_initiated === true && newData.player_two_initiated === true) {
        const response = await pvpService.actionCompiler(data)
        io.to(newUser.room).emit(`combat_response`, response);
      } else {
        io.to(newUser.room).emit(`soft_response`, newData);
      }
    })

    socket.on(`request_reduel`, async (data) => {
      let newData = data;
      if (newUser.player === 1) {
        newData.player_one_reduel = true;
      } else {
        newData.player_two_reduel = true;
      }
      console.log(newData, 'Did the New Data transcribe?')
      if (newData.player_one_reduel === true && newData.player_two_reduel === true) {
        // const response = await pvpService.actionCompiler(data)
        io.to(newUser.room).emit(`reset_duel`);
      } else {
        io.to(newUser.room).emit(`reduel_requested`, newData);
      }

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

  socket.on(`auto_engage`, async (combatData) => {
    const response = await pvpService.actionCompiler(combatData)
    // console.log(response)
    io.to(combatData.room).emit(`combat_response`, response)
  })


  // socket.on("disconnect", () => {
  //   console.log('User Disconnected', socket.id);
  // });

  socket.off("setup", () => {
    console.log('User Disonnected');
    socket.leave(userData._id);
  });
});
