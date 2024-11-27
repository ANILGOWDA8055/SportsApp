const db = require('../config/db'); // Import the database connection
const bcrypt = require('bcrypt');

// Login function
exports.login = (req, res) => {
    const { usernameInput, passwordInput } = req.body;

    const sqlSelect = 'SELECT * FROM users WHERE username = ?';
    db.query(sqlSelect, [usernameInput], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(401).send({ message: 'Invalid Username!!' });
        }

        const user = results[0];

        // Log the stored password and the input password for debugging
        // console.log('Stored Password from DB:', user.password);
        // console.log('Input Password:', passwordInput);

        // Compare the input password with the stored password
        if (user.password === passwordInput) {
            // Successful login
            res.send({ message: 'Login Successful!!' });
        } else {
            // console.log('Password does not match.'); // Debugging line
            return res.status(401).send({ message: 'Invalid Password!!' });
        }
    });
};