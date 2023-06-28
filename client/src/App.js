import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import RecordPage from './pages/RecordPage';

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/streamer/:id" element={<RecordPage />} />
				<Route path="*" element={<h1>404: No Match!</h1>} />
			</Routes>
		</div>
	);
};

export default App;
