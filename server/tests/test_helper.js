const Streamer = require('../models/streamer');

const initialStreamers = [
	{
		name: 'streamer1',
		description: "Streamer1's content focuses on video games",
		platform: 'Twitch',
		image:
			'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
	},
	{
		name: 'streamer2',
		description: "Streamer2's content focuses on travelling",
		platform: 'YouTube',
		image:
			'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
	},
];

const nonExistingId = async () => {
	const streamer = new Streamer({
		name: 'blahblah',
		description: 'blah',
		platform: 'blah',
		image: 'dasda',
	});
	await streamer.save();
	await streamer.deleteOne();

	return streamer._id.toString();
};

const streamersInDb = async () => {
	const streamers = await Streamer.find({});
	return streamers.map((streamer) => streamer.toJSON());
};

module.exports = { initialStreamers, streamersInDb, nonExistingId };
