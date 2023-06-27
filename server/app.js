const { MONGODB_URL } = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const streamersRouter = require('./controllers/streamers');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URL);

morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(express.static('build'));
app.use(express.json());

app.use('/streamers', streamersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
