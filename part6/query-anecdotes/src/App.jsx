import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAll, updateAnecdote } from './requests';
import { useMutation } from '@tanstack/react-query';

import {
	useNotificationDispatch,
	displayNotification,
} from './contexts/NotificationContext';

const App = () => {
	const queryClient = useQueryClient();
	const setNotification = useNotificationDispatch();

	const addVoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			const updatedAnecdotes = anecdotes.map((anecdote) =>
				anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
			);
			queryClient.setQueryData(['anecdotes'], updatedAnecdotes);
			displayNotification(
				setNotification,
				updatedAnecdote.content,
				'vote',
				5
			);
		},
		onError: (wtf) => {
			console.log(wtf);
		},
	});

	const handleVote = (anecdote) => {
		const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
		addVoteMutation.mutate(updatedAnecdote);
	};

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAll,
		retry: 1,
	});

	// console.log(JSON.parse(JSON.stringify(result)));
	if (result.isLoading) {
		return <div>Loading data...</div>;
	}

	if (result.isError) {
		return (
			<div>anecdote service not available due to problems in server</div>
		);
	}

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
