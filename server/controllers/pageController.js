var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

//MODELS
var Page = Models.Page;
var Project = Models.Project;

module.exports = {
  getPage: function (req, res, next) {
    Page
      .findById(req.params.id)
      .then(helpers.sendResponse(res));
  },

  addPage: function (req, res, next) {
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
  },

  editPage: function (req, res, next) {
    Page
      .upsert(Utils.extend(req.body, {id: req.params.id}))
      .then(function () {
        return Page.findById(req.params.id);
      })
      .then(helpers.sendResponse(res));
  },

  deletePage: function (req, res, next) {
    Page
      .findById(req.params.id)
      .then(function (page) {
        return page.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};