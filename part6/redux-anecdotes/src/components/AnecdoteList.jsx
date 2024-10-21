import { useDispatch, useSelector } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import PropTypes from 'prop-types';
import { incrementVote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote }) => {
	const dispatch = useDispatch();

	const vote = (anecdote) => {
		dispatch(incrementVote(anecdote));
		dispatch(displayNotification(`You vote '${anecdote.content}'`, 5))
	};

	return (
		<div>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote)}>vote</button>
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
