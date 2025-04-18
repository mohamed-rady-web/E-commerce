const express =require('express');
const router = express.Router();
const ContactController = require('../Controllers/ContactUsController');
router.post('/add-contact/', ContactController.UsContact);
router.get('/see-reports/', ContactController.SeeAllRep);
router.post('/respond-rep/:reportId', ContactController.RespondToReport);
router.delete('/delete-rep/:reportId', ContactController.DeleteReport);
module.exports = router;  