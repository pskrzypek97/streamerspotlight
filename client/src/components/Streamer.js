import { useState } from 'react';
import { Link } from 'react-router-dom';

import streamersService from '../services/streamers';

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
		<div>
			<h3>{props.name}</h3>
			<p>{props.platform}</p>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: 50,
					height: 20,
				}}
			>
				<button onClick={() => vote(1)}>+</button>
				<p>{likes}</p>
				<button onClick={() => vote(-1)}>-</button>
			</div>
			<Link to={`/streamer/${props.id}`}>More info</Link>
		</div>
	);
};

export default Streamer;
