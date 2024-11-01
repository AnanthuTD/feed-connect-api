// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController/userController1');

// Define routes and link them to controller functions
router.get('/', userController.getHome);
router.get('/create', userController.showCreateUserForm);
router.post('/create', userController.createUser);

module.exports = router;
