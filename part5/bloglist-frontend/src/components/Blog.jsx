import { useState } from 'react';
import Button from './Button';
import blogservices from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, user, setMessage }) => {
	const [visibility, setVisibility] = useState(false);

	const blogStyle = {
		paddingTop: 8,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
		height: !visibility ? 30 : 'auto',
		overflow: 'hidden',
	};

	const toggleView = () => {
		setVisibility(!visibility);
	};

	const handleLike = async () => {
		try {
			const updatedBLog = await blogservices.update(
				{ ...blog, likes: blog.likes + 1 },
				user.token
			);
			setBlogs(
				blogs.map((b) =>
					b.id === blog.id
						? { ...b, likes: updatedBLog.likes, user: user }
						: b
				)
			);
		} catch (exception) {
			console.log('exception on handleLike', exception);
		}
	};

	const handleDelete = async () => {
		if (!window.confirm('Are you sure you want to delete it?')) {
			return;
		}

		try {
			await blogservices.deleteBlog(blog, user.token);
			setBlogs(blogs.map((b) => (b.id !== blog.id ? blog : {})));
		} catch (exception) {
			console.log('exception on handleDelete', exception);
		}
	};

	return (
		<li style={blogStyle}>
			<div>
				{blog.title}
				<Button
					onClick={toggleView}
					label={!visibility ? '🐵 View' : '🙈 Hide'}
					style={{ marginLeft: 10 }}
				/>
			</div>
			<p>
				<span style={{ fontWeight: 'bold' }}>Author:</span>
				{blog.author}
			</p>
			<div>
				<span style={{ fontWeight: 'bold' }}>Likes:</span> {blog.likes}
				<Button
					onClick={handleLike}
					label="👍"
					style={{borderWidth: 0}}
				/>
			</div>
			<p>
				<span style={{ fontWeight: 'bold' }}>URL:</span>
				{blog.url}
			</p>
			<p>
				<span style={{ fontWeight: 'bold' }}>User:</span>
				{blog.user.name}
			</p>
			<Button
				onClick={handleDelete}
				label="delete"
				style={{ backgroundColor: '#ff5d3a', marginBottom: 4, borderWidth: 0}}
			/>
		</li>
	);
};

export default Blog;
