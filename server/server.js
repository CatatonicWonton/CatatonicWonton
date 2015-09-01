var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var sequelize = require('sequelize');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.get('/student', function (req, res) {
  console.log('werking');
});

app.post('/student', function (req, res) {
  var body = req.body;
  console.log(body);
  res.sendStatus(200);
});

app.listen(8000, function () {
  console.log('listening on port 8000');
});