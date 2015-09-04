var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;

// Models
var Project = Models.Project;

router.get('/:id', function (req, res) {
  Project
    .findById(req.params.id)
    .then(sendResponse(res));
});

router.put('/:id', function (req, res) {
  Project
    .findById(req.params.id)
    .then(function (project) {
      return project.upsert(req.body);
    })
    .then(sendResponse(res));
}); 

router.delete('/:id', function (req, res) {
  Project
    .findById(req.params.id)
    .then(function (project) {
      return project.destroy();
    })
    .then(sendResponse(res));
})

module.exports = router;
