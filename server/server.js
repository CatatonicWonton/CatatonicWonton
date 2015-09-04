var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var sequelize = require('sequelize');

// ROUTE HANDLER
var projectRoutes  = require('./routes/projectRoutes');
var projectsRoutes = require('./routes/projectsRoutes');
var classRoutes    = require('./routes/classRoutes');


var app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '../client'));

// Define Routes
app.use('api/project', projectRoutes);
app.use('api/projects', projectsRoutes);
app.use('api/class', classRoutes);

app.listen(8000, function () {
  console.log('listening on port 8000');
});
