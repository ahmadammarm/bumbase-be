const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const connectMongodb = require('./config/mongoose');

const {
  authRoutes,
  categoryRoutes,
  fileRoutes,
  recipeRoutes,
} = require('./routes');
const {geminiRoutes} = require('./routes');
const {errorHandler} = require('./utils/errors');
const notfound = require('./controllers/notfound');

const app = express();

connectMongodb();

// Middlewares
app.use(express.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '500mb'}));
app.use(morgan('dev'));

// routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', geminiRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', fileRoutes);
app.use('/api/v1', recipeRoutes);

// not found handler
app.use(notfound);

// error handler
app.use(errorHandler);

module.exports = app;
