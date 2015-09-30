var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var ProjectController = require('../controllers/projectController.js');

/* Gets a single project
 * req.body -> {}
 * res.data -> {id, subject, name, teacherId, pages, createdAt, updatedAt}
*/

router.get('/:id', ProjectController.getProject);

/* Gets all projects from user
 * req.body -> {}
 * res.data -> [{id, subject, name, teacherId, pages, createdAt, updatedAt}]
*/

router.get('/', Auth.checkIfLoggedIn, ProjectController.getUserProjects);

/* Creates a project
 * req.body -> {name, subject}
 * res.data -> {name, subject, pages}
*/

router.post('/', Auth.checkIf('Teacher'), ProjectController.createProject);

/* Edits a project
 * req.body -> {name, subject}
 * res.data -> {id, name, subject, TeacherId, createdAt, updatedAt}
*/

router.put('/:id', Auth.checkIf('Teacher'), ProjectController.editProject); 

/* Deletes a project
 * req.body -> {}
 * res.data -> {id, name, subject, TeacherId, createdAt, updatedAt}
*/

router.delete('/:id', Auth.checkIf('Teacher'), ProjectController.deleteProject);

module.exports = router;