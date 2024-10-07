import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { expect } from 'vitest';

test('renders title and author by default and not number of likes', async () => {
	const blog = {
		title: 'Harry Potter y la Camara Secreta',
		author: 'J.K.Rowling',
		likes: 42,
		url: 'https://es.wikipedia.org/wiki/Harry_Potter_y_la_c%C3%A1mara_secreta_(pel%C3%ADcula)',
		user: {},
	};
	render(<Blog blog={blog} />);
	// screen.debug();
	const titleElement = screen.getByText(
		'Harry Potter y la Camara Secreta - author: J.K.Rowling'
	);
	expect(titleElement).toBeDefined();

	const { container } = render(<Blog blog={blog} />);
	const likes = container.querySelector('.likes');
	expect(likes).toEqual(null);
	const url = container.querySelector('.url');
	expect(url).toEqual(null);
});

test('clicking the like button twice calls the event handler prop twice', async () => {
	const blog = {
		title: 'Taş Ouza Asi Olup Beyrek',
		author: 'Anonim',
		likes: 100000000,
		url: 'https://en.wikipedia.org/wiki/Book_of_Dede_Korkut',
		user: {},
	};

	const user = userEvent.setup();
	const updateBlog = vi.fn();

	render(
		<Blog
			blog={blog}
			updateBlog={updateBlog}
		/>
	);
	const viewButton = screen.getByText('🐵 View');
	await user.click(viewButton);

	const likeButton = screen.getByText('👍');
	await user.click(likeButton);
	await user.click(likeButton);
	expect(updateBlog).toHaveBeenCalledTimes(2);
});
