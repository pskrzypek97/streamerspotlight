import { useForm } from 'react-hook-form';

import streamersService from '../services/streamers';

import './Form.css';

const Form = ({ onAppendStreamers }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const platforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'];

	const onSubmit = async (data) => {
		const res = await streamersService.addStreamer(data);

		onAppendStreamers(res);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form">
			<div className="input">
				<label htmlFor="name">Name: </label>
				<input
					placeholder="name"
					id="name"
					{...register('name', {
						required: { value: true, message: 'Name is required' },
						minLength: {
							value: 3,
							message: 'Name must be at least 3 characters long',
						},
					})}
				/>
				{errors?.name && <span className="error">{errors.name.message}</span>}
			</div>
			<div className="input">
				<label>Platform: </label>
				<select name="Platform" {...register('platform', { required: true })}>
					{platforms.map((platform) => (
						<option value={platform} key={platform}>
							{platform}
						</option>
					))}
				</select>
			</div>
			<div className="input">
				<label htmlFor="description">Description: </label>
				<textarea
					placeholder="description"
					id="description"
					{...register('description', {
						required: { value: true, message: 'Description is required' },
					})}
				/>
				{errors?.description && (
					<span className="error">{errors.description.message}</span>
				)}
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default Form;
