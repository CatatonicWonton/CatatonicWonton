var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var sequelize = require('sequelize');

// ROUTE HANDLER
var studentRoutes  = require('./routes/studentRoutes');
var projectRoutes  = require('./routes/projectRoutes');
var projectsRoutes = require('./routes/projectsRoutes');
var classRoutes    = require('./routes/classRoutes');


var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

// Define Routes
app.use('/student', studentRoutes);
app.use('/projects', projectsRoutes);
app.use('/project', projectRoutes);
app.use('/class', classRoutes);

app.listen(8000, function () {
  console.log('listening on port 8000');
});



// app.get('/student', function (req, res) {
//   console.log('werking');
// });

// app.post('/student', function (req, res) {
//   var body = req.body;
//   console.log(body);
//   res.sendStatus(200);
// });