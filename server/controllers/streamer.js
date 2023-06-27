const streamerRouter = require('express').Router();
const Streamer = require('../models/streamer');

streamerRouter.get('/:id', async (req, res) => {
	const streamer = await Streamer.findById(req.params.id);
	if (streamer) res.json(streamer);
	else res.status(404).end();
});

module.exports = streamerRouter;
