const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();


// Register a new user
router.post('/register', UserController.register);

router.post('/verifyotp', UserController.verifyOtp);


// Get details of a single user
router.get('/users/:id', UserController.getUser);

// Update a user
router.put('/users/:id', UserController.updateUser);

router.get('/users', UserController.getUsers);
  

module.exports = router;
