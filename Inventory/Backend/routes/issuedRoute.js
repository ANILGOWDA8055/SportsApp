const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get issued equipment data from the issue table
router.get('/api/issues', (req, res) => {
    const sqlSelect = `
        SELECT roll_no, academic_year, institute, mobile_number, sport, equipment, date_issued, issued_time 
        FROM issues 
        WHERE returned = 'Still not returned' 
        ORDER BY date_issued DESC`;
    
    db.query(sqlSelect, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.json(results); // Send data as JSON
    });
});

module.exports = router;
