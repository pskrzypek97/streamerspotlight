const streamersRouter = require('express').Router();
const Streamer = require('../models/streamer');
const logger = require('../utils/logger');

streamersRouter.get('/', async (req, res) => {
	const streamers = await Streamer.find({});
	res.json(streamers);
});

streamersRouter.get('/:id', async (req, res) => {
	const streamer = await Streamer.findById(req.params.id);
	if (streamer) res.json(streamer);
	else res.status(404).end();
});

streamersRouter.post('/', async (req, res) => {
	const body = req.body;

	const streamer = new Streamer({
		name: body.name,
		description: body.description,
		platform: body.platform,
		image: body.image,
		likes: body.likes,
	});

	const savedStreamer = await streamer.save();
	res.status(201).json(savedStreamer);
});

streamersRouter.put('/:id/vote', async (req, res) => {
	const body = req.body;

	logger.info('params', req.params);
	logger.info('body', body);

	const streamer = {
		likes: body.likes,
	};

	const updatedStreamer = await Streamer.findByIdAndUpdate(
		req.params.id,
		streamer,
		{ new: true }
	);
	res.json(updatedStreamer);
});

module.exports = streamersRouter;
