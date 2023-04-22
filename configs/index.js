const development = require('./dev');
const production = require('./prod');
const staging = require('./stage');
require('dotenv').config();

let env = process.env.NODE_ENV;

const config = {
    development,
    production,
    staging
}

module.exports = config[env];