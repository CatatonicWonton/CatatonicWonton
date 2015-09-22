var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var passport = require('passport');
var Models = require('../db.js').Models;

/* Checks if user is logged in
 * input  -> {}
 * output -> {id, username, accountType}
*/
router.get('/login', Auth.isAuthenticated, Auth.sendUserData);

/* Log's in user and establishes session
 * input  -> {username, password}
 * output -> {id, username, accountType}
*/ 
router.post('/login', function (req, res, next) {console.log('login in called');next()},passport.authenticate('local'), Auth.sendUserData);

/* Creates account 
 * input  -> {firstName, lastName, username, password, accountType}
 * output -> {true}
*/
router.post('/signup', function (req, res, next) {console.log('sign up called');next()}, Auth.createAccount, Auth.sendSuccess);

/* Log's out user and ends session
 * input -> {}
 * output -> {true}
*/
router.post('/logout', Auth.logout, Auth.sendSuccess);

module.exports = router;