import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: initialState,
	reducers: {
		setNotification: (state, action) => {
			return action.payload
		},
        clearNotification: (state, action) => ''
	},
});

export const { setNotification,clearNotification } = notificationSlice.actions;

export const displayNotification = (msg, secs) => {
	return async dispatch => {
		dispatch(setNotification(msg))
		setTimeout(() => {
			dispatch(clearNotification());
		}, secs * 1000);
	}
}

export default notificationSlice.reducer;
