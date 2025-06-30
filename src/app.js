const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require("morgan")

dotenv.config();


const connectMongodb = require('./config/mongoose');

const { authRoutes } = require('./routes');
const { errorHandler } = require('./utils/errors');

const app = express();

connectMongodb();

// Middlewares
app.use(express.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '500mb'}));
app.use(morgan("dev"));

// routes
app.use("/api/v1", authRoutes);

// error handler
app.use(errorHandler);

module.exports = app;
