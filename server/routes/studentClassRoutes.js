var express = require('express');
var router = express.Router();
var StudentClassController = require('../controllers/studentClassController.js');

/* Adds student to class
 * req.body -> {StudentId}
 * res.data -> [[{ClassId, StudentId, createdAt, updatedAt}]]
*/

router.post('/:id', StudentClassController.addStudentToClass);

/* Removes student from class
 * req.body -> {StudentId}
 * res.data -> {ClassId, StudentId, createdAt, updatedAt}
*/

router.put('/:id', StudentClassController.removeStudentFromClass);


module.exports = router;