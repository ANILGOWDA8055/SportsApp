const db = require('../config/db'); 

// Change Password function
exports.changePassword = (req, res) => {
    const { currentPassword, newPassword } = req.body; // Get currentPassword from request body

    // Query to check if the current password exists in the database
    const sqlSelect = 'SELECT * FROM users WHERE password = ?';
    db.query(sqlSelect, [currentPassword], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(401).send({ message: 'No such Current password exists!!' });
        }

        // If current password is found, check if new password and confirm password match
        const user = results[0]; // Get the user (you can also fetch the username if needed)

        // Check if new password and confirm password match
        if (newPassword !== req.body.confirmPassword) {
            return res.status(400).send({ message: 'New passwords do not match.' });
        }

        // Update the password in the database
        const sqlUpdate = 'UPDATE users SET password = ? WHERE username = ?';
        db.query(sqlUpdate, [newPassword, user.username], (err) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).send('Server error');
            }
            res.send({ message: 'Password updated successfully!' });
        });
    });
};
