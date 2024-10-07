import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const addBlog = vi.fn();
	const user = userEvent.setup();

	render(<BlogForm addBlog={addBlog} />);

	const inputs = screen.getAllByRole('textbox');
	const sendButton = screen.getByText('Save');
	// console.log('inputs', inputs);

	await user.type(inputs[0], 'Harry Potter y la Camara Secreta');
	await user.type(inputs[1], 'J.K.Rowling');
	await user.type(
		inputs[2],
		'https://es.wikipedia.org/wiki/Harry_Potter_y_la_c%C3%A1mara_secreta_(pel%C3%ADcula)'
	);

	await user.click(sendButton);
	console.log(addBlog.mock.calls);
	expect(addBlog).toHaveBeenCalledTimes(1);
	expect(addBlog.mock.calls[0][0].title).toBe(
		'Harry Potter y la Camara Secreta'
	);
});
