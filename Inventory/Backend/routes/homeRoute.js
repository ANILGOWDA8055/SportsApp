const express = require('express');
const router = express.Router();
const indexController = require('../controllers/homeController');

// Route to get equipment counts
router.get('/api/equipment-counts', indexController.getEquipmentCounts);


module.exports = router;
