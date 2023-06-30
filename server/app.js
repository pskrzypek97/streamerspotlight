const { MONGODB_URL } = require('./utils/config');
const express = require('express');
const path = require('path');
const app = express();
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const streamersRouter = require('./controllers/streamers');
const streamerRouter = require('./controllers/streamer');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URL);

morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'build')));
	app.get('/', (req, res) =>
		res.sendFile(path.join(__dirname, 'build', 'index.html'))
	);
}

app.use('/streamers', streamersRouter);
app.use('/streamer', streamerRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
