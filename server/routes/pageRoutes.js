var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;

// Models
var Project = Models.Project;
var Page = Models.Page;

var sendResponse = function (res) {
  return function (data) {
    res.status(200).send(data);
  };
};

var extend = function () {
  var object = {};
  for (var i = 0; i < arguments.length; i++) {
    for (var prop in arguments[i]) {
      object[prop] = arguments[i][prop];
    }
  }
  return object;
};

router.get('/:id', function (req, res) {
  Page.findById(req.params.id)
    .then(sendResponse(res));
}); 

router.post('/:projectId', function (req, res) {
  Project.findById(req.params.projectId).then(function(project){
    return Page.create(req.body).then(function(page){
      return project.addPage(page);
    });
  })
  .then(sendResponse(res));
});

router.put('/:id', function (req, res) {
  Page
    .upsert(extend(req.body, {id: req.params.id}))
    .then(function () {
      return Page.findById(req.params.id);
    })
    .then(sendResponse(res));
}); 

router.delete('/:id', function (req, res) {
  Page.findById(req.params.id)
    .then(function (page) {
      return page.destroy();
    })
    .then(sendResponse(res));
});

module.exports = router;    
