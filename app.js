const express = require('express');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDoc = YAML.load('./api.yaml');


const app = express();

//Specify path to swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));


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
    const errStatus = error.status || 500;
    const errMsg = error.message || 'Internal Server Error.';
    console.log({
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? error.stack : {}
    })
    res.status(500).send('Internal Server Error');
});

//Undefined routes
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});


module.exports = app;
