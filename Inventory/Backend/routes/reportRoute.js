const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route for date range report
router.get('/api/report/range/:startDate/:endDate', reportController.generateDateRangeReport);

module.exports = router;
