var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var passport = require('passport');

/* Log's in user and establishes session
 * input  -> {username, password}
 * output -> {id, username, accountType}
*/ 

router.post('/login', passport.authenticate('local'), Auth.sendUserData);

/* Creates account 
 * input  -> {firstName, lastName, username, password, accountType}
 * output -> {true}
*/

router.post('/signup', Auth.createAccount, Auth.sendSuccess);

/* Log's out user and ends session
 * input -> {}
 * output -> {true}
*/

router.post('/logout', Auth.logout, Auth.sendSuccess);
||||||| merged common ancestors
var success = function (req, res, next) {
  res.status(200).send(true);
  next();
};

router.post('/login', passport.authenticate('local'), function (req, res, next) {
  res.status(200).send(req.session.passport.user);
});

router.post('/signup', createAccount, success);

// sign out
router.post('/logout', logout);

module.exports = router;