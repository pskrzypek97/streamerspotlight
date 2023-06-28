import { Link } from 'react-router-dom';

const Streamer = (props) => {
	return (
		<>
			<h3>{props.name}</h3>
			<p>{props.platform}</p>
			<p>{props.likes}</p>
			<Link to={`/streamer/${props.id}`}>More info</Link>
		</>
	);
};

export default Streamer;
