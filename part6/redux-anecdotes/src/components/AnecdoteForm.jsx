import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = (ev) => {
		ev.preventDefault();
		const content = ev.target.anecdote.value;
		ev.target.anecdote.value = ''
		dispatch(createAnecdote(content))
		dispatch(displayNotification(`Added '${content}'`, 5))
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
