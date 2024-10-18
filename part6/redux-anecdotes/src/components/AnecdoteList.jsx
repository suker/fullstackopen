import { useDispatch, useSelector } from 'react-redux';
import { clickVote } from '../reducers/anecdoteReducer';
import { notify, removeNotify } from '../reducers/notificationReducer';
import PropTypes from 'prop-types';

const Anecdote = ({ anecdote }) => {
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(clickVote(id));
		dispatch(notify(`You vote '${anecdote.content}'`));
		setTimeout(() => {
			dispatch(removeNotify());
		}, 5000);
	};

	return (
		<div>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote.id)}>vote</button>
			</div>
		</div>
	);
};

Anecdote.propTypes = {
	anecdote: PropTypes.object,
};

const AnecdoteList = () => {
	const anecdotesList = useSelector(({ filter, anecdotes }) => {
		const newAnecdotes = [...anecdotes];
		if (filter) {
			return newAnecdotes.filter((anecdote) =>
				anecdote.content.toLowerCase().includes(filter)
			);
		}
		return newAnecdotes;
	}).sort((a, b) => b.votes - a.votes);

	return (
		<>
			{anecdotesList.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
				/>
			))}
		</>
	);
};

export default AnecdoteList;
