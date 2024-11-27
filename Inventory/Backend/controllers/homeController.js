const db = require('../config/db');

// Function to get equipment counts
exports.getEquipmentCounts = (req, res) => {
    const sqlSelect = 'SELECT * FROM equipment_counts WHERE id = 1'; // Assuming there's only one row

    db.query(sqlSelect, (err, results) => {
        if (err) {
            console.error('Error fetching equipment counts:', err);
            return res.status(500).send('Error fetching equipment counts');
        }
        res.status(200).json(results[0]); // Send the first row of results
    });
};
