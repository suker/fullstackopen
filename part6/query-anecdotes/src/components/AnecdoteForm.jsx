import { createNew } from '../requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	useNotificationDispatch,
	displayNotification,
} from '../contexts/NotificationContext';

const AnecdoteForm = () => {
	const setNotification = useNotificationDispatch();

	const queryClient = useQueryClient();

	const newAnecdoteMutation = useMutation({
		mutationFn: createNew,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(
				['anecdotes'],
				anecdotes.concat(newAnecdote)
			);
			displayNotification(setNotification, newAnecdote.content, 'add', 5);
		},
		onError: ({ response }) => {
			displayNotification(
				setNotification,
				response.data.error,
				'error',
				5
			);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		newAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
