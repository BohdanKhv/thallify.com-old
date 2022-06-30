const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;


// connect to database
connectDB();


// Initialize express
const app = express();


// Body parser
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ limit: '2mb', extended: false }));


// Production routes
app.use('/api/thallify/profiles', require('./thallify/routes/profileRoutes'));
app.use('/api/thallify/lists', require('./thallify/routes/listRoutes'));


// Serv frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

// server connection
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});