var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// Models
var Project = Models.Project;
var Page = Models.Page;

// get a page from a project
router.get('/:id', function (req, res) {
  Page
    .findById(req.params.id)
    .then(helpers.sendResponse(res));
}); 

// add a page to a project
router.post('/:projectId', helpers.checkIf('Teacher'), function (req, res) {
  Promise
    .all([
      Page
        .create(req.body),

      Project
        .findById(req.params.projectId)
    ])
    .spread(function (page, project) {
      return Promise.join(project.addPage(page), function () {
        return page;
      });
    })
    .then(helpers.sendResponse(res));
});

// edit page from a project
router.put('/:id', helpers.checkIf('Teacher'), function (req, res) {
  Page
    .upsert(Utils.extend(req.body, {id: req.params.id}))
    .then(function () {
      return Page.findById(req.params.id);
    })
    .then(helpers.sendResponse(res));
}); 


// delete a page from a project
router.delete('/:id', helpers.checkIf('Teacher'), function (req, res) {
  Page
    .findById(req.params.id)
    .then(function (page) {
      return page.destroy();
    })
    .then(helpers.sendResponse(res));
});

module.exports = router;    
