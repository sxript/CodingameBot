require('dotenv').config();
const app = require('./app');
//const logger = require('../config/logger');
const port = process.env.PORT || 8080;

require('./discord');

const server = app.listen(port, () => console.log(`Server started on port: ${port}`));

module.exports = server;
