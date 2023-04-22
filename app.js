const express = require('express');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');


const app = express();


//Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());


//Routes
app.use('/api/auth', routes.authRoute);


//Home route
app.get('/', (req, res) => {
    res.send('Home page of EkoUNIMED Payroll Managment System');
});


//Error handling middleware
app.use((error, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || 'Internal Server Error.';
    console.log({
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
    res.status(500).json({ message: 'Internal Server Error' });
});

//Undefined routes
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});


module.exports = app;
