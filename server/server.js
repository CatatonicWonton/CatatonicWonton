var express = require('express');
var db = require('./db.js');
var sequelize = require('sequelize');

// Auth
var passport = require('passport');
var passportMiddleware = require('./passportMiddleware.js');

// middleware
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// ROUTE HANDLER
var authRoutes           = require('./routes/authRoutes');
var classRoutes          = require('./routes/classRoutes');
var pageRoutes           = require('./routes/pageRoutes');
var projectsRoutes       = require('./routes/projectsRoutes');
var studentRoutes        = require('./routes/studentRoutes');
var studentClassRoutes   = require('./routes/studentClassRoutes');
var studentProjectRoutes = require('./routes/studentProjectRoutes');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client'));

// middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passportMiddleware(passport);

// Define Routes
app.use('/auth', authRoutes);
app.use('/api/class', classRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/studentClass', studentClassRoutes);
app.use('/api/studentProject', studentProjectRoutes);

app.listen(8000, function () {
  console.log('listening on port 8000');
});
