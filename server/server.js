var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var sequelize = require('sequelize');

// ROUTE HANDLER
var classRoutes           = require('./routes/classRoutes');
var pageRoutes            = require('./routes/pageRoutes');
var projectsRoutes        = require('./routes/projectsRoutes');
var studentRoutes         = require('./routes/studentRoutes');
var studentClassRoutes    = require('./routes/studentClassRoutes');
var studentProjectRoutes  = require('./routes/studentProjectRoutes');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client'));

// Define Routes
app.use('/api/class', classRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/studentClass', studentClassRoutes);
app.use('/api/studentProject', studentProjectRoutes);

app.listen(8000, function () {
  console.log('listening on port 8000');
});
