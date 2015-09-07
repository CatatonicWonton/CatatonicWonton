var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');

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

// get a page from a project
router.get('/:id', function (req, res) {
  Page.findById(req.params.id)
    .then(sendResponse(res));
}); 

// add a page to a project
router.post('/:projectId', function (req, res) {
  Project
    .findById(req.params.projectId)
    .then(function (project) {
      return Promise.props({page: Page.create(req.body), project: project});
    })
    .then(function (results) {
      var page = results.page;
      var project = results.project;
      return Promise.join(project.addPage(page), function () {
        return page;
      });
    })
    .then(sendResponse(res));
});

// edit page from a project
router.put('/:id', function (req, res) {
  Page
    .upsert(extend(req.body, {id: req.params.id}))
    .then(function () {
      return Page.findById(req.params.id);
    })
    .then(sendResponse(res));
}); 


// delete a page from a project
router.delete('/:id', function (req, res) {
  Page
    .findById(req.params.id)
    .then(function (page) {
      return page.destroy();
    })
    .then(sendResponse(res));
});

module.exports = router;    
