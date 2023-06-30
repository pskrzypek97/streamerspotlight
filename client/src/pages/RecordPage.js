import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import streamersService from '../services/streamers';

import './RecordPage.css';

const RecordPage = () => {
	const [record, setRecord] = useState(null);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await streamersService.getOneStreamer(id);
				setRecord(res);
			} catch (e) {
				setRecord(null);
			}
			setLoading(false);
		};

		fetchData();
	}, [id]);

	if (loading) return <h1>Loading...</h1>;

	if (!record)
		return (
			<>
				<h1>404: Streamer not found</h1>
				<Link to="/">Back</Link>
			</>
		);

	return (
		<div className="record-page">
			<h1>Streamer Record</h1>
			<img src={record.image} alt="" />
			<h2>Name: {record.name}</h2>
			<h3>Platform: {record.platform}</h3>
			<p>Description: {record.description}</p>
			<Link to="/">Go back</Link>
		</div>
	);
};

export default RecordPage;
