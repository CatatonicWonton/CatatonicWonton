var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var StudentController = require('../controllers/studentController.js');

/* Gets a student
 * req.body -> {}
 * res.data -> {firstName, lastName, username, password}
 */

router.get('/:id', StudentController.getStudent);

/* Creates a student
 * req.body -> {firstName, lastName, username, password}
 * res.data -> {id, firstName, lastName, username, password, createdAt, updatedAt}
 */

router.post('/', Auth.checkIf('Teacher'), StudentController.createStudent);

/* Edits a student
 * req.body -> {firstName, lastName, username, password}
 * res.data -> {id, firstName, lastName, username, password, createdAt, updatedAt}
 */

router.put('/:id', Auth.checkIf('Teacher'), StudentController.editStudent);

/* Deletes a student
 * req.body -> {}
 * res.data -> {id, firstName, lastName, username, password, createdAt, updatedAt} 
 */

router.delete('/:id', Auth.checkIf('Teacher'), StudentController.deleteStudent);

module.exports = router;