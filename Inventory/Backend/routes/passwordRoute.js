const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

// Change Password route
router.post('/api/change-password', passwordController.changePassword);

module.exports = router;
