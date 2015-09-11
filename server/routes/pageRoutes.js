var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var PageController = require('../controllers/pageController.js');

/* Gets a single page
 * input  -> {}
 * output -> {id, title, content, index, solution, ProjectId, createdAt, updatedAt}
*/

router.get('/:id', PageController.getPage); 

/* Adds a page to project
 * input  -> {title, content, index, solution}
 * output -> {id, title, content, index, solution, ProjectId, createdAt, updatedAt}
*/

router.post('/:projectId', Auth.checkIf('Teacher'), PageController.addPage);

/* Edits a page
 * input  -> {title, content, index, solution}
 * output -> {id, title, content, index, solution, ProjectId, createdAt, updatedAt}
*/

router.put('/:id', Auth.checkIf('Teacher'), PageController.editPage); 

/* Deletes a page
 * input  -> {}
 * output -> {id, title, content, index, solution, ProjectId, createdAt, updatedAt}
*/

router.delete('/:id', Auth.checkIf('Teacher'), PageController.deletePage);

module.exports = router;    
