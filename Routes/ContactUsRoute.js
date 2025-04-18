const express =require('express');
const router = express.Router();
const ContactController = require('../Controllers/ContactUsController');
const Middlewares= require('../Middlewares/auth');

 router.get('/ContactUs', ContactController.GetContact);
 router.post('/Report',Middlewares ,ContactController.Report);
 module.exports = router;