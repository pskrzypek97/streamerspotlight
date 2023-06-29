import { useState, useEffect } from 'react';

import streamersService from '../services/streamers';

import Form from '../components/Form';
import Streamer from '../components/Streamer';

const Home = () => {
	const [streamersArray, setStreamersArray] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await streamersService.getStreamers();
				setStreamersArray(res);
			} catch (e) {
				setStreamersArray([]);
			}
			setLoading(false);
		};

		fetchData();
	}, []);

	const appendStreamersArray = (newStreamer) => {
		setStreamersArray(streamersArray.concat(newStreamer));
	};

	return (
		<>
			<h2>Streamer Submission Form</h2>
			<Form onAppendStreamers={appendStreamersArray} />
			{loading && <h2>Loading streamers list</h2>}
			{!loading && <h2>Streamers List</h2>}
			{streamersArray.map((streamer) => (
				<Streamer key={streamer.id} {...streamer} />
			))}
		</>
	);
};

export default Home;
