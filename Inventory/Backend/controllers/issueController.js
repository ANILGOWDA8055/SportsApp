const db = require('../config/db');

// Function to handle form submission
exports.issueEquipment = (req, res) => {
    const { rollNo, academicYear, institute, sport, equipment, quantity, equip_condi, dateIssued, issuedTime, mobileNumber } = req.body; 

    const sqlInsert = 'INSERT INTO issues (roll_no, academic_year, institute, sport, equipment, quantity, equip_condi, date_issued, issued_time, mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    // Convert equipment array to a string
    const equipmentString = equipment.join(',');

    db.query(sqlInsert, [rollNo, academicYear, institute, sport, equipmentString, quantity, equip_condi, dateIssued, issuedTime, mobileNumber], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }

        // Update equipment counts
        const issuedCount = equipment.length; // Number of issued equipment
        const sqlUpdate = `
            UPDATE equipment_counts
            SET issued_equipment = issued_equipment + ?, 
            available_equipment = available_equipment - ?
            WHERE id = 1;
        `;
        
        db.query(sqlUpdate, [issuedCount, issuedCount], (err) => {
            if (err) {
                console.error('Error updating equipment counts:', err);
                return res.status(500).send('Error updating equipment counts');
            }

            // Fetch the updated equipment counts to send back to the client
            const sqlSelect = 'SELECT * FROM equipment_counts WHERE id = 1';
            db.query(sqlSelect, (err, counts) => {
                if (err) {
                    console.error('Error fetching updated equipment counts:', err);
                    return res.status(500).send('Error fetching updated equipment counts');
                }

                // Send the updated counts back to the client
                res.status(201).json({ 
                    id: results.insertId,
                    total_equipment: counts[0].total_equipment,
                    available_equipment: counts[0].available_equipment,
                    issued_equipment: counts[0].issued_equipment,
                    returned_equipment: counts[0].returned_equipment,
                    institution_equipment: counts[0].institution_equipment,
                    damaged_equipment: counts[0].damaged_equipment
                });
            });
        });
    });
};
