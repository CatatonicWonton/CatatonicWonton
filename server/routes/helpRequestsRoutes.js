var express = require('express');
var router = express.Router();
var Auth = require('../controllers/authController.js');
var HelpRequestController = require('../controllers/helpRequestController.js');

/* Student submitting a single help request
 * req.body -> {teacherId, question}
 * res.data -> {} 
*/
router.post('/', /*Auth.checkIf('Student'),*/ HelpRequestController.addQuestion);


/* Toggles acknowledged and resolved properities
 * req.body -> {teacherId, question}
 * res.data -> {} 
*/
router.post('/:helpRequestId/:prop', /*Auth.checkIf('Teacher'),*/ HelpRequestController.toggleTrue);



/* Get all outstanding help requests that haven't been resolved i.e. resolved = false;
 * req.body -> {}
 * res.data -> [
               helpRequest1,
               helpRequest2,
               helpRequest3, 
             ]
*/
router.get('/', /*Auth.checkIf('Teacher'),*/ HelpRequestController.getUnresolved);

router.get('/recentlyUpdated', /*Auth.checkIf('Teacher'),*/ HelpRequestController.getLatest);

router.delete('/:id', /*Auth.checkIf('Teacher'),*/ HelpRequestController.deleteRequest);

module.exports = router;    
