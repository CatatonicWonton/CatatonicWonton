var Promise = require('bluebird');
var Models = require('./db.js').Models;
var bcrypt = require('bcrypt');
var Utils = require('./utilities');


module.exports = {

  checkIf: function (model) {
    return function (req, res, next) {
      if (req.session.passport.user.accountType === model) { 
        return next();
      }

      return res.status(401).send('User must be a ' + model);
    };
  },

  findUsername: function (username) {
    return Promise
      .some([
        Models.Student.findOne({
          where: {username: username}
        }),
        Models.Teacher.findOne({
          where: {username: username}
        })
      ], 2);
  },

  sendResponse: function (res) {
    return function (data) {
      res.status(200).send(data);
    };
  },

  sendError: function (res, errorCode){
    var status = errorCode || 500;
    return function (data) {
      res.status(status).send(data);
    };
  },

  createAccount: function (req, res, next) {
    var helpers = this;
    var accountType = req.body.accountType;
    var username = req.body.username;

    req.body.salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(req.body.password, req.body.salt);

    helpers
      .findUsername(username)
      .spread(function (student, teacher) {
        var user = student || teacher;
        if (!user) {
          Models[accountType]
            .create(Utils.extend(req.body, {password: hashedPassword}))
            .then(function(){
              next();
            });
        } else {
          res.status(200).send('Username is already taken!');
        }
      });
  },
};