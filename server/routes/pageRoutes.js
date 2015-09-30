var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var PageController = require('../controllers/pageController.js');

/* Gets a single page
 * req.body -> {}
 * res.data -> {id, title, content, index, solution, ProjectId, createdAt, updatedAt}
*/

router.get('/:id', PageController.getPage); 

/* Adds a page to project
 * req.body -> {title, content, index, solution}
 * res.data -> {id, title, content, index, solution, ProjectId, createdAt, updatedAt}
*/

router.post('/:projectId', Auth.checkIf('Teacher'), PageController.addPage);

/* Edits a page
 * req.body -> {title, content, index, solution}
 * res.data -> {id, title, content, index, solution, ProjectId, createdAt, updatedAt}
*/

router.put('/:id', Auth.checkIf('Teacher'), PageController.editPage); 

/* Deletes a page
 * req.body -> {}
 * res.data -> {id, title, content, index, solution, ProjectId, createdAt, updatedAt}
*/

router.delete('/:id', Auth.checkIf('Teacher'), PageController.deletePage);

module.exports = router;    
