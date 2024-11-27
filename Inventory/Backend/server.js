const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// importing routes
const indexRoutes = require('./routes/indexRoute');
const passwordRoutes = require('./routes/passwordRoute');
const issueRoutes = require('./routes/issueRoute');
const homeRoutes = require('./routes/homeRoute');
const returnRoutes = require('./routes/returnRoute');
const reportRoutes = require('./routes/reportRoute');
const issuedRoutes = require('./routes/issuedRoute');
const updateRoutes = require('./routes/updateRoute');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../Frontend')));

// Serve login.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'login.html'));
});

// Routes
app.use('/', indexRoutes);
app.use(passwordRoutes);
app.use(homeRoutes);
app.use(issueRoutes);
app.use(issuedRoutes);
app.use(returnRoutes);
app.use(reportRoutes);
app.use(updateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  