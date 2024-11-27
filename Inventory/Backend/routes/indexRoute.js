const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Login route
router.post('/api/login', indexController.login);

module.exports = router;
