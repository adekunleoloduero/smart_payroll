const development = require('./dev');
const production = require('./prod');
require('dotenv').config();

let env = process.env.NODE_ENV;

const config = {
    development,
    production
}

module.exports = config[env];