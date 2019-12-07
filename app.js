const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import Route
const authRoute = require('./routes/authRoute');
const studentRoute = require('./routes/studentRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();

// Mongodb URI, adjust the database to be used
const MONGODB_URI = 'mongodb://localhost:27017/HexaInstitute';


app.use(bodyParser.json());

// Middleware to allow Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Use Route
app.use('/api/auth/', authRoute);
app.use('/api/student/', studentRoute);
app.use('/api/admin/', adminRoute);

// Error Handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


// Connect database and run server using port 8080
mongoose
    .connect(
        MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    )
    .then(result => {
        console.log('Connected');
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });
