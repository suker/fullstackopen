import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: initialState,
	reducers: {
		notify: (state, action) => action.payload,
        removeNotify: (state, action) => ''
	},
});

export const { notify,removeNotify } = notificationSlice.actions;
export default notificationSlice.reducer;
