const express = require('express');
// const routes = require('./routes/index');
const cookieParser = require('cookie-parser');
const prisma = require('./prisma/index')


const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());


//Routes
// app.use('/api', routes.authRoute);

app.post('/api/signup', async (req, res) => {
    const body = req.body;
    const user = await prisma.users.create({
        data: body
    })
    res.status(201).json(user);
})

//Home route
app.get('/', (req, res) => {
    res.send('Welocome to smart payroll home page');
});


module.exports = app;
