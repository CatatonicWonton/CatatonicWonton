var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var ClassController = require('../controllers/classController.js');

/* Gets all classes for a student (for the sake of joining)
 * req.body -> {}
 * res.data -> {id, name, TeacherId, createdAt, updatedAt}
*/

router.get('/all', Auth.checkIfLoggedIn, ClassController.getAllClasses);


/* Gets a single class
 * req.body -> {}
 * res.data -> {id, name, TeacherId, students, createdAt, updatedAt}
*/

router.get('/:id', ClassController.getClass);

/* Gets all classes of User
 * req.body -> {}
 * res.data -> [{id, name, TeacherId, createdAt, updatedAt}]
*/

router.get('/', Auth.checkIfLoggedIn, ClassController.getUserClasses);

/* Creates a class
 * req.body -> {name}
 * res.data -> {id, name, TeacherId, createdAt, updatedAt} 
*/

router.post('/', Auth.checkIf('Teacher'), ClassController.createClass);

/* Deletes a class
 * req.body -> {}
 * res.data -> {id, name, TeacherId, createdAt, updatedAt}
*/

router.delete('/:id', Auth.checkIf('Teacher'), ClassController.deleteClass);

module.exports = router;