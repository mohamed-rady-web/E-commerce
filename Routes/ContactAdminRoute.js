const express =require('express');
const router = express.Router();
const ContactController = require('../Controllers/ContactUsController');
router.post('/add-contact/', ContactController.UsContact);
router.get('/see-reports/', ContactController.SeeAllRep);
router.post('/respond-rep/', ContactController.RespondToReport);
router.delete('/delete-rep/', ContactController.DeleteReport);
module.exports = router;  