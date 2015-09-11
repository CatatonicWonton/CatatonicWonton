var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var ProjectController = require('../controllers/projectController.js');

/* Gets a single project
 * input  -> {}
 * output -> {id, subject, name, teacherId, pages, createdAt, updatedAt}
*/

router.get('/:id', ProjectController.getProject);

/* Gets all projects from user
 * input  -> {}
 * output -> [{id, subject, name, teacherId, pages, createdAt, updatedAt}]
*/

router.get('/', Auth.checkIfLoggedIn, ProjectController.getUserProjects);

/* Creates a project
 * input  -> {name, subject}
 * output -> {name, subject, pages}
*/

router.post('/', Auth.checkIf('Teacher'), ProjectController.createProject);

/* Edits a project
 * input  -> {name, subject}
 * output -> {id, name, subject, TeacherId, createdAt, updatedAt}
*/

router.put('/:id', Auth.checkIf('Teacher'), ProjectController.editProject); 

/* Deletes a project
 * input  -> {}
 * output -> {id, name, subject, TeacherId, createdAt, updatedAt}
*/

router.delete('/:id', Auth.checkIf('Teacher'), ProjectController.deleteProject);

module.exports = router;