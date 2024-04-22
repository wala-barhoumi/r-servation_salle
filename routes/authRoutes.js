const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/login', authController.getLogin);
router.post('/login', authController.login);

// Routes for signup
router.get('/signup', authController.getSignup);
router.post('/signup', authController.register);

// Route for logout
router.get('/logout', authController.logout);



router.get('/userList', authController.getUserList);
module.exports = router;
