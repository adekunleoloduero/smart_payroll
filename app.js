const express = require('express');
// const routes = require('./routes/index');
const cookieParser = require('cookie-parser');


const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());


//Routes
// app.use('/api', routes.authRoute);



//Home route
app.get('/', (req, res) => {
    res.send('Welocome to smart payroll home page');
});


module.exports = app;
