const express = require('express');
const router = express.Router();
const controller = require('../controllers/returnController');

// Get issued equipment data based on roll number
router.get('/api/issues/:rollNo', controller.getIssueByRollNo);

// Post returned equipment data
router.post('/api/return', controller.returnEquipment);

module.exports = router;
