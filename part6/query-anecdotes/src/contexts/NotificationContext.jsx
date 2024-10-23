import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_MSG':
			return action.payload;
		case 'CLEAR_MSG':
			return '';
		default:
			return state;
	}
};

export const useNotificationValue = () => {
	return useContext(NotificationContext)[0];
};

export const useNotificationDispatch = () => {
	return useContext(NotificationContext)[1];
};

export const displayNotification = (dispatch, content, type, secs) => {
	let payload = `anecdote "${content}" `;
	payload += type === 'add' ? 'added!' : 'voted!';

	dispatch({
		type: 'SET_MSG',
		payload: type !== 'error' ? payload : content,
	});
	setTimeout(() => {
		dispatch({ type: 'CLEAR_MSG' });
	}, secs * 1000);
};

export const NotificationContextProvider = (props) => {
	const [notify, notifyDispatch] = useReducer(notificationReducer, 0);

	return (
		<NotificationContext.Provider value={[notify, notifyDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
