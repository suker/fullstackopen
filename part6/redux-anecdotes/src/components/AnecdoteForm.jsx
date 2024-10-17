import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = (ev) => {
		ev.preventDefault();
		const rawData = {
			content: ev.target.anecdote.value,
		};
		dispatch(createAnecdote(rawData));
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={create}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
