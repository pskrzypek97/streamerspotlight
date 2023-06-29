import { useState, useEffect } from 'react';

import streamersService from '../services/streamers';

import Form from '../components/Form';
import Streamer from '../components/Streamer';

const Home = () => {
	const [streamersArray, setStreamersArray] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await streamersService.getStreamers();
				setStreamersArray(res);
			} catch (e) {
				setStreamersArray([]);
			}
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
			<h2>Streamer List</h2>
			{streamersArray.map((streamer) => (
				<Streamer key={streamer.id} {...streamer} />
			))}
		</>
	);
};

export default Home;
