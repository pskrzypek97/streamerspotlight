import { useForm } from 'react-hook-form';

import axios from 'axios';

const Form = () => {
	const { register, handleSubmit } = useForm();

	const platforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'];

	const onSubmit = async (data) => {
		const req = await axios.post('http://localhost:3001/streamers', {
			...data,
			image:
				'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png',
		});
		console.log(req.data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="name">Name: </label>
				<input
					placeholder="name"
					id="name"
					{...register('name', { required: true })}
				/>
			</div>
			<div>
				<label>Platform: </label>
				<select name="Platform" {...register('platform', { required: true })}>
					{platforms.map((platform) => (
						<option value={platform} key={platform}>
							{platform}
						</option>
					))}
				</select>
			</div>
			<div style={{ display: 'flex' }}>
				<label htmlFor="description">Description: </label>
				<textarea
					placeholder="description"
					id="description"
					style={{ marginLeft: '5px' }}
					{...register('description', { required: true })}
				/>
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default Form;
