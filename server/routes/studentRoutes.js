var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var StudentController = require('../controllers/studentController.js');

/* Gets a student
 * input  -> {}
 * output -> {firstName, lastName, username, password}
 */

router.get('/:id', StudentController.getStudent);

/* Creates a student
 * input  -> {firstName, lastName, username, password}
 * output -> {id, firstName, lastName, username, password, createdAt, updatedAt}
 */

router.post('/', Auth.checkIf('Teacher'), StudentController.createStudent);

/* Edits a student
 * input  -> {firstName, lastName, username, password}
 * output -> {id, firstName, lastName, username, password, createdAt, updatedAt}
 */

router.put('/:id', Auth.checkIf('Teacher'), StudentController.editStudent);

/* Deletes a student
 * input  -> {}
 * output -> {id, firstName, lastName, username, password, createdAt, updatedAt} 
 */

router.delete('/:id', Auth.checkIf('Teacher'), StudentController.deleteStudent);

module.exports = router;