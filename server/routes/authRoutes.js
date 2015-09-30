var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var passport = require('passport');
var Models = require('../db.js').Models;

/* Checks if user is logged in
 * req.body -> {}
 * res.data -> {id, username, accountType}
*/
router.get('/login', Auth.isAuthenticated, Auth.sendUserData);

/* Log's in user and establishes session
 * req.body -> {username, password}
 * res.data -> {id, username, accountType}
*/ 
router.post('/login', passport.authenticate('local'), Auth.sendUserData);

/* Creates account 
 * req.body -> {firstName, lastName, username, password, accountType}
 * res.data -> {true}
*/
router.post('/signup', Auth.createAccount, Auth.sendSuccess);

/* Log's out user and ends session
 * req.body -> {}
 * res.data -> {true}
*/
router.post('/logout', Auth.logout, Auth.sendSuccess);

module.exports = router;