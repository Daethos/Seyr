require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');


require('./config/database');

// Require controllers here

const app = express();

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
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
app.use('/api/community', require('./routes/api/community'));
app.use('/api', require('./routes/api/feelings'));

// "catch all" route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});
