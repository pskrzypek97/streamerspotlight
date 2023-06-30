import { useState } from 'react';
import { Link } from 'react-router-dom';

import streamersService from '../services/streamers';

import './Streamer.css';

const Streamer = (props) => {
	const [likes, setLikes] = useState(props.likes || 0);

	const vote = async (vote) => {
		setLikes((prevLike) => prevLike + vote);

		await streamersService.updateLikes(props.id, {
			...props,
			likes: likes + vote,
		});
	};

	return (
		<div className="streamer">
			<h3>Name: {props.name}</h3>
			<p>Platform: {props.platform}</p>

			<div className="streamer__likes">
				<p>Vote:</p>
				<button onClick={() => vote(1)}>+</button>
				<p>{likes}</p>
				<button onClick={() => vote(-1)}>-</button>
			</div>
			<Link to={`/streamers/${props.id}`}>More info</Link>
		</div>
	);
};

export default Streamer;
