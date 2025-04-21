const express =require('express');
const router = express.Router();
const ContactController = require('../Controllers/ContactUsController');

 router.get('/ContactUs', ContactController.GetContact);
 router.post('/Report' ,ContactController.Report);
 module.exports = router;