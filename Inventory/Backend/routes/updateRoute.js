const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Handle form submission
router.post('/api/report', (req, res) => {
    const { rollNo, returned, damaged } = req.body;

    // Delete the record from the issues table
    const sqlDelete = 'DELETE FROM issues WHERE roll_no = ?';
    db.query(sqlDelete, [rollNo], (err, results) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).send('Error deleting record');
        }

        // Update the counts in the equipment_counts table
        const sqlUpdateCounts = `
            UPDATE equipment_counts 
            SET 
                returned_equipment = returned_equipment + ?, 
                damaged_equipment = damaged_equipment + ?, 
                available_equipment = available_equipment + ?, 
                issued_equipment = issued_equipment - ? 
            WHERE id = 1;`;
        
        // Calculate the values to update
        const availableIncrease = parseInt(returned, 10);
        const issuedDecrease = parseInt(returned, 10);

        db.query(sqlUpdateCounts, [returned, damaged, availableIncrease, issuedDecrease], (err) => {
            if (err) {
                console.error('Error updating counts:', err);
                return res.status(500).send('Error updating counts');
            }

            // Send a success response
            res.json({ message: 'Report submitted successfully!' });
        });
    });
});

// Export the router
module.exports = router;