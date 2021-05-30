const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();


// middleware
app.enable('trust proxy');
app.use(helmet());
app.use(morgan(':remote-addr :remote-user :method :url :status :response-time ms - :res[content-length]'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ status: 200, message: 'CodingameBot' });
});

app.use((req, res) => {
    res.status(404).json({ status: 404, message: `Unknown Request: ${req.method} ${req.originalUrl}` });
});

module.exports = app;
