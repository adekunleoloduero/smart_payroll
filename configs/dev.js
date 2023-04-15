require('dotenv').config();


const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}


module.exports = config;