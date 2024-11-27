const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Route to issue equipment
router.post('/api/issue', issueController.issueEquipment);

module.exports = router;
