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

  socket.on("join_room", (room) => {
    socket.join(room);
    // console.log(room.user.use, 'New Player Joining')
    console.log(`User with ID: ${socket.id} joined room: ${room}`)
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  })

  socket.on("disconnect", () => {
    console.log('User Disconnected', socket.id);
  });

});
