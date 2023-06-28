import { useState, useEffect } from 'react';

import axios from 'axios';

import Form from '../components/Form';
import Streamer from '../components/Streamer';

const Home = () => {
	const [streamersArray, setStreamersArray] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('http://localhost:3001/streamers');
				setStreamersArray(res.data);
			} catch (e) {
				setStreamersArray([]);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<h2>Streamer Submission Form</h2>
			<Form />
			<h2>Streamer List</h2>
			{streamersArray.map((streamer) => (
				<Streamer key={streamer.id} {...streamer} />
			))}
		</>
	);
};

export default Home;
