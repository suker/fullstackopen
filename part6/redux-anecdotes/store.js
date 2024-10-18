import { configureStore } from '@reduxjs/toolkit';
import { default as anecdoteReducer } from './src/reducers/anecdoteReducer';
import { default as filterReducer } from './src/reducers/filterReducer';
import { default as notificationReducer } from './src/reducers/notificationReducer';

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer,
	},
});

export default store;
