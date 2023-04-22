const development = require('./dev');
const production = require('./prod');
const testing = require('./test');
require('dotenv').config();

let env = process.env.NODE_ENV;

const config = {
    development,
    production,
    testing
}

module.exports = config[env];