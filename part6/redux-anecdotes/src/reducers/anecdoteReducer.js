import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

// const anecdotesAtStart = [
// 	'If it hurts, do it more often',
// 	'Adding manpower to a late software project makes it later!',
// 	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 	'Premature optimization is the root of all evil.',
// 	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
// 	return {
// 		content: anecdote,
// 		id: getId(),
// 		votes: 0,
// 	};
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		clickVote: (state, action) => {
			// console.log('clickVote', current(state), action)
			return state.map((anecdote) =>
				action.payload === anecdote.id
					? { ...anecdote, votes: anecdote.votes + 1 }
					: anecdote
			);
		},
		appendAnecdote: (state, action) => {
			return [...state, action.payload];
		},
		setAnecdotes: (state, action) => action.payload,
	},
});

export const { clickVote, appendAnecdote, setAnecdotes } =
	anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const incrementVote = (anecdote) => {
	return async (dispatch) => {
		const updatedAnecdote = await anecdoteService.updateVotes(anecdote);
		dispatch(clickVote(updatedAnecdote.id));
	};
};

export default anecdoteSlice.reducer;
