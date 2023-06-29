import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import streamersService from '../services/streamers';

const RecordPage = () => {
	const [record, setRecord] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await streamersService.getOneStreamer(id);
				setRecord(res);
			} catch (e) {
				setRecord(null);
			}
		};

		fetchData();
	}, [id]);

	if (!record)
		return (
			<>
				<h1>Unable to fetch data</h1>
				<Link to="/">Back</Link>
			</>
		);

	return (
		<>
			<h1>Streamer Record</h1>
			<img src={record.image} alt="" />
			<h2>{record.name}</h2>
			<h3>{record.platform}</h3>
			<p>{record.description}</p>
			<Link to="/">Back</Link>
		</>
	);
};

export default RecordPage;
