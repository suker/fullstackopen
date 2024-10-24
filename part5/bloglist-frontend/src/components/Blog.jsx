import { useState } from 'react';

const Blog = ({ blog, deleteBlog, updateBlog, username }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};
	const [visible, setVisible] = useState(false);
	const [userLikes, setUserLikes] = useState(blog.likes);

	const updatedBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		user: blog.user.id,
		id: blog.id,
		likes: userLikes + 1,
	};

	const addLike = () => {
		setUserLikes(userLikes + 1);
		updateBlog(updatedBlog);
	};

	return (
		<div
			className="blog"
			data-testid="blog"
			style={blogStyle}
		>
			<div className="title-author">
				{blog.title} - author: {blog.author}
			</div>
			<button
				className="visibility-btn"
				onClick={() => setVisible(!visible)}
			>
				{visible ? '🙈 hide' : '🐵 View'}
			</button>
			{visible && (
				<div className="more-details">
					<a
						className="url"
						href={
							blog.url.includes('//') ? blog.url : `//${blog.url}`
						}
					>
						{blog.url}
					</a>
					<div className="likes">
						likes {blog.likes}{' '}
						<button
							className="like-btn"
							onClick={addLike}
						>
							👍
						</button>
					</div>
					<div className="creator">{blog.user.username}</div>
					{
						<button
							className="remove-btn"
							onClick={() => deleteBlog(blog.id, blog)}
						>
							Remove
						</button>
					}
				</div>
			)}
		</div>
	);
};
export default Blog;
