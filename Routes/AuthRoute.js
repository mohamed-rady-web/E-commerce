const express = require('express');
const router = express.Router();
const Ucontroller= require('../Controllers/UsersController');
const authMiddleware = require('../Middlewares/auth');

router.post('/register/', Ucontroller.register);
router.post('/login/', Ucontroller.login);
router.post('/logout/',authMiddleware,Ucontroller.logout);
router.post('/forget-password/', Ucontroller.forgotPassword);
router.post('/reset-password/', Ucontroller.resetPassword);
router.put('/update-profile/',authMiddleware,Ucontroller.updateProfile);
router.put('/change-password/',authMiddleware,Ucontroller.ChangePassword);
router.get('/dash-board/',authMiddleware,Ucontroller.DashboardCounter)
module.exports = router;