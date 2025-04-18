const express =require('express');
const router = express.Router();
const AboutController = require('../Controllers/AboutController');
const Middlewares =require ('../Middlewares/auth')

    router.post('/admin/ContactUs',Middlewares,AboutController.AddToUs);
    router.get('/About',AboutController.Us);
    module.exports = router;