var express = require('express');
var router = express.Router();
var StudentClassController = require('../controllers/studentClassController.js');

/* Adds student to class
 * input  -> {StudentId}
 * output -> [[{ClassId, StudentId, createdAt, updatedAt}]]
*/

router.post('/:id', StudentClassController.addStudentToClass);

/* Removes student from class
 * input  -> {StudentId}
 * output -> {ClassId, StudentId, createdAt, updatedAt}
*/

router.put('/:id', StudentClassController.removeStudentFromClass);


module.exports = router;