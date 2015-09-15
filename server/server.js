var express = require('express');
var sequelize = require('sequelize');
var db = require('./db');

// DEPENDENCIES
var passport = require('passport');
var passportMiddleware = require('./passportMiddleware.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(express.static(__dirname + '/../client'));

// MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passportMiddleware(passport);

// ROUTE HANDLER
var authRoutes           = require('./routes/authRoutes');
var classRoutes          = require('./routes/classRoutes');
var pageRoutes           = require('./routes/pageRoutes');
var projectsRoutes       = require('./routes/projectsRoutes');
var studentRoutes        = require('./routes/studentRoutes');
var studentClassRoutes   = require('./routes/studentClassRoutes');
var studentProjectRoutes = require('./routes/studentProjectRoutes');
var helpRequestsRoutes   = require('./routes/helpRequestsRoutes');

// ROUTES
app.use('/auth', authRoutes);
app.use('/api/class', classRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/studentClass', studentClassRoutes);
app.use('/api/studentProject', studentProjectRoutes);
app.use('/api/helpRequests', helpRequestsRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(8000, function () {
    console.log('Running on port 8000');
  });
}

module.exports = app;