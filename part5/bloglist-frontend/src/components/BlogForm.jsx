import React, { useState } from 'react';

const BlogForm = ({ addBlog }) => {
	const defaultBlogValues = {
		title: '',
		author: '',
		url: '',
	};

	const [blog, setBlog] = useState(defaultBlogValues);

	const handleInputs = (ev, input) => {
		const text = ev.target.value;
		setBlog((prevState) => ({ ...prevState, [input]: text }));
	};

	const handleAddBlog = (ev) => {
		ev.preventDefault();
		addBlog(blog);
		setBlog(defaultBlogValues);
	};

	return (
		<form onSubmit={handleAddBlog}>
			<span>Title:</span>
			<input
				type="text"
				value={blog.title}
				onChange={(title) => handleInputs(title, 'title')}
			/>
			<br />
			<span>Author:</span>
			<input
				type="text"
				value={blog.author}
				onChange={(author) => handleInputs(author, 'author')}
			/>
			<br />
			<span>Url:</span>
			<input
				type="url"
				value={blog.url}
				onChange={(url) => handleInputs(url, 'url')}
			/>
			<br />
			<button type="submit">Create</button>
		</form>
	);
};

export default BlogForm;
