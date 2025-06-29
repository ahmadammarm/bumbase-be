const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json({limit: '500mb'}));

app.use(bodyParser.urlencoded({extended: true, limit: '500mb'}));

module.exports = app;
