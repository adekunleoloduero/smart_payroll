const { BASE_URL } = require('./stage');

require('dotenv').config();


const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_MAIL_USERNAME: process.env.GOOGLE_MAIL_USERNAME,
    GOOGLE_MAIL_PASSWORD: process.env.GOOGLE_MAIL_PASSWORD,
    GOOGLE_0AUTH2_CLIENT_ID: process.env.GOOGLE_0AUTH2_CLIENT_ID,
    GOOGLE_0AUTH2_CLIENT_SECRET: process.env.GOOGLE_0AUTH2_CLIENT_SECRET,
    GOOGLE_0AUTH2_REFRESH_TOKEN: process.env.GOOGLE_0AUTH2_REFRESH_TOKEN,
    BASE_URL: process.env.LOCAL_BASE_URL
}


module.exports = config;