var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var StudentProjectController = require('../controllers/studentProjectController.js');

/* Adds relationship in StudentProject join table
 * input  -> {ProjectId}
 * output -> [[{ProjectId, StudentId, createdAt, updatedAt}]]
 */

router.post('/student/:id', Auth.checkIf('Teacher'), StudentProjectController.assignProjectToStudent);

/* Adds relationship in StudentProject join table for every student in a class
 * input  -> {ProjectId}
 * output -> [[[{ProjectId, StudentId, createdAt, updatedAt}]]]
 */
 
router.post('/class/:id', Auth.checkIf('Teacher'), StudentProjectController.assignProjectToClass);

/* Removes relationship in StudentProject join table
 * input  -> {ProjectId}
 * output -> {ProjectId, StudentId, createdAt, updatedAt}
 */
 
router.delete('/student/:id', Auth.checkIf('Teacher'), StudentProjectController.unassignProjectFromStudent);

/* Removes relationshiop in StudentProject join table for every student in a class
 * input  -> {ProjectId}
 * output -> [{ProjectId, StudentId, createdAt, updatedAt}]
 */
 
router.delete('/class/:id', Auth.checkIf('Teacher'), StudentProjectController.unassignProjectFromClass);

module.exports = router;