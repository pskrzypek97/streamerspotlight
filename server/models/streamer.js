const mongoose = require('mongoose');

const streamerSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	platform: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	likes: Number,
});

//changing _id property (Object) to id (String)
//and removing _id and __v
streamerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Streamer', streamerSchema);
