var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var ClassController = require('../controllers/classController.js');

/* Gets all classes for a student (for the sake of joining)
 * input  -> {}
 * output -> {id, name, TeacherId, createdAt, updatedAt}
*/

router.get('/all', Auth.checkIfLoggedIn, ClassController.getAllClasses);


/* Gets a single class
 * input  -> {}
 * output -> {id, name, TeacherId, students, createdAt, updatedAt}
*/

router.get('/:id', ClassController.getClass);

/* Gets all classes of User
 * input  -> {}
 * output -> [{id, name, TeacherId, createdAt, updatedAt}]
*/

router.get('/', Auth.checkIfLoggedIn, ClassController.getUserClasses);

/* Creates a class
 * input  -> {name}
 * output -> {id, name, TeacherId, createdAt, updatedAt} 
*/

router.post('/', Auth.checkIf('Teacher'), ClassController.createClass);

/* Deletes a class
 * input  -> {}
 * output -> {id, name, TeacherId, createdAt, updatedAt}
*/

router.delete('/:id', Auth.checkIf('Teacher'), ClassController.deleteClass);

module.exports = router;