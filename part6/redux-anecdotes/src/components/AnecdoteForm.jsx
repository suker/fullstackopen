import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notify, removeNotify } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = (ev) => {
		ev.preventDefault();
		const content = ev.target.anecdote.value;

		anecdoteService.createAnecdote(content).then((anecdote) => {
			dispatch(createAnecdote(anecdote));
		});

		dispatch(notify(`Added '${content}'`));
		setTimeout(() => {
			dispatch(removeNotify());
		}, 5000);
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
