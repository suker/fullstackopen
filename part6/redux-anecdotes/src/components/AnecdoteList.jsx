import { useDispatch, useSelector } from 'react-redux';
import { clickVote } from '../reducers/anecdoteReducer';
import PropTypes from 'prop-types';

const Anecdote = ({ anecdote }) => {
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log('vote', id);
		dispatch(clickVote(id));
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
	const anecdotes = useSelector((state) => state).sort(
		(a, b) => b.votes - a.votes
	);

	return anecdotes.map((anecdote) => (
		<Anecdote
			key={anecdote.id}
			anecdote={anecdote}
		/>
	));
};

export default AnecdoteList;
