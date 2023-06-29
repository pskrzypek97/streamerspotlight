import axios from 'axios';

const baseUrl = '/streamer';

const getStreamers = async () => {
	const req = await axios.get(`${baseUrl}s`);

	return req.data;
};

const getOneStreamer = async (id) => {
	const req = await axios.get(`${baseUrl}/${id}`);

	return req.data;
};

const addStreamer = async (newObject) => {
	const req = await axios.post(`${baseUrl}s`, {
		...newObject,
		image:
			'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
	});

	return req.data;
};

const updateLikes = async (id, newObject) => {
	const req = axios.put(`${baseUrl}s/${id}/vote`, newObject);

	return req.data;
};

const streamersService = {
	getStreamers,
	getOneStreamer,
	addStreamer,
	updateLikes,
};

export default streamersService;
