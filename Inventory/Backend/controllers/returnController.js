const db = require('../config/db');

// Get issued equipment data based on roll number
exports.getIssueByRollNo = (req, res) => {
    const rollNo = req.params.rollNo;
    const sqlSelect = `
        SELECT roll_no, academic_year, institute, sport, equipment, date_issued, issued_time, mobile_number, returned 
        FROM issues 
        WHERE roll_no = ? 
        ORDER BY id DESC LIMIT 1`; // Get the latest record for the roll number

    db.query(sqlSelect, [rollNo], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (results.length > 0) {
            const issue = results[0];
            if (issue.returned === "Still not returned") {
                res.json(issue); // Send the first matching record
            } else {
                res.status(400).send('The equipment has already been returned by the student.');
            }
        } else {
            res.status(404).send('The equipment was not issued to the entered roll number.');
        }
    });
};

// Post returned equipment data
exports.returnEquipment = (req, res) => {
    const { rollNo, condition, returnedDate } = req.body;

    // First, retrieve the quantity from the issues table
    const sqlSelect = `
        SELECT quantity, equipment 
        FROM issues 
        WHERE roll_no = ? 
        AND returned = 'Still not returned' 
        ORDER BY id DESC LIMIT 1`; // Get the latest record for the roll number

    db.query(sqlSelect, [rollNo], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (results.length === 0) {
            return res.status(404).send('No record found for this roll number.');
        }

        const { quantity, equipment } = results[0];

        // Update the issues table
        const sqlUpdate = 'UPDATE issues SET returned = ?, equip_condi = ? WHERE roll_no = ? AND returned = ?';
        db.query(sqlUpdate, [returnedDate, condition, rollNo, 'Still not returned'], (err) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).send('Error updating data');
            }

            // Update the equipment_counts table based on the condition
            let sqlEquipmentUpdate;
            if (condition === 'Good') {
                sqlEquipmentUpdate = `
                    UPDATE equipment_counts 
                    SET available_equipment = available_equipment + ?, 
                        returned_equipment = returned_equipment + ?, 
                        issued_equipment = issued_equipment - ? 
                    WHERE id = 1;`;
                db.query(sqlEquipmentUpdate, [quantity, quantity, quantity], (err) => {
                    if (err) {
                        console.error('Error updating equipment counts:', err);
                        return res.status(500).send('Error updating equipment counts');
                    }
                    res.status(200).send('Equipment returned successfully!!');
                });
            } else if (condition === 'Damaged') {
                sqlEquipmentUpdate = `
                    UPDATE equipment_counts 
                    SET damaged_equipment = damaged_equipment + ? 
                    WHERE id = 1;`;
                db.query(sqlEquipmentUpdate, [quantity], (err) => {
                    if (err) {
                        console.error('Error updating equipment counts:', err);
                        return res.status(500).send('Error updating equipment counts');
                    }
                    res.status(200).send('Equipment returned successfully!!');
                });
            } else {
                res.status(400).send('Invalid condition specified.');
            }
        });
    });
};
