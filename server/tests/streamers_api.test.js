const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Streamer = require('../models/streamer');

beforeEach(async () => {
	await Streamer.deleteMany({});
	await Streamer.insertMany(helper.initialStreamers);
});

describe('when there is initially some streamers saved', () => {
	test('streamers are returned as json', async () => {
		await api
			.get('/streamers')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('all streamers are returned', async () => {
		const res = await api.get('/streamers');

		expect(res.body).toHaveLength(helper.initialStreamers.length);
	});

	test('a specific streamer is within the returned streamers', async () => {
		const res = await api.get('/streamers');
		const descriptions = res.body.map((r) => r.description);

		expect(descriptions).toContain("Streamer2's content focuses on travelling");
	});
});

describe('viewing a specific streamer', () => {
	test('succeeds with a valid id', async () => {
		const streamersAtStart = await helper.streamersInDb();

		const streamerToView = streamersAtStart[0];

		const resultStreamer = await api
			.get(`/streamer/${streamerToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(resultStreamer.body).toEqual(streamerToView);
	});

	test('fails with statuscode 404 if streamer does not exist', async () => {
		const validNonexistingId = await helper.nonExistingId();

		await api.get(`/streamer/${validNonexistingId}`).expect(404);
	});

	test('fails with statuscode 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445';

		await api.get(`/streamer/${invalidId}`).expect(400);
	});
});

describe('addition of a new streamer', () => {
	test('succeeds with valid data', async () => {
		const newStreamer = {
			name: 'streamer3',
			description: 'streamer3 loves sushi',
			platform: 'TikTok',
			image: 'some-url.com',
		};

		await api
			.post('/streamers')
			.send(newStreamer)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const streamersAtEnd = await helper.streamersInDb();
		expect(streamersAtEnd).toHaveLength(helper.initialStreamers.length + 1);

		const descriptions = streamersAtEnd.map((s) => s.description);
		expect(descriptions).toContain('streamer3 loves sushi');
	});

	test('fails with status code 400 if data is incomplete', async () => {
		const newStreamer = {
			name: 'streamer3',
			image: 'xddddd.com',
		};

		await api.post('/streamers').send(newStreamer).expect(400);

		const streamersAtEnd = await helper.streamersInDb();

		expect(streamersAtEnd).toHaveLength(helper.initialStreamers.length);
	});
});

describe('update of likes', () => {
	test('succeeds with status 200 if id is valid', async () => {
		const streamersAtStart = await helper.streamersInDb();
		const streamerToUpdate = streamersAtStart[0];

		const updatedLikes = {
			likes: 10,
		};

		await api
			.put(`/streamers/${streamerToUpdate.id}/vote`)
			.send(updatedLikes)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const streamersAtEnd = await helper.streamersInDb();
		const updatedStreamer = streamersAtEnd[0];
		expect(updatedStreamer.id).toBe(streamerToUpdate.id);
		expect(updatedStreamer.likes).not.toBe(streamerToUpdate.likes);
	});

	test('fails with status code 400 if id is incorrect', async () => {
		const invalidId = '2131312dqw121e1e121';

		const updatedLikes = {
			likes: 125,
		};

		await api
			.put(`/streamers/${invalidId}/vote`)
			.send(updatedLikes)
			.expect(400);
	});

	test('fails with status code 400 if likes is in incorrect format', async () => {
		const streamersAtStart = await helper.streamersInDb();
		const streamerToUpdate = streamersAtStart[0];

		const incorrectLikes = {
			likes: 'xdddddd',
		};

		await api
			.put(`/streamers/${streamerToUpdate.id}/vote`)
			.send(incorrectLikes)
			.expect(400);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
