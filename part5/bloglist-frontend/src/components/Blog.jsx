import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
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
			style={blogStyle}
		>
			<div className="title-author">
				{blog.title} - author: {blog.author}
			</div>
			<button
				className="visiblity-btn"
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
					{blog.user.username === username && (
						<button
							className="remove-btn"
							onClick={() => deleteBlog(blog.id, blog)}
						>
							Remove
						</button>
					)}
				</div>
			)}
		</div>
	);
};
export default Blog;

// const Blog = ({ blog, blogs, setBlogs, setMessage }) => {
// 	const [visibility, setVisibility] = useState(false);

// 	const blogStyle = {
// 		paddingTop: 8,
// 		paddingLeft: 2,
// 		border: 'solid',
// 		borderWidth: 1,
// 		marginBottom: 5,
// 		height: !visibility ? 60 : 'auto',
// 		overflow: 'hidden',
// 	};

// 	const toggleView = () => {
// 		setVisibility(!visibility);
// 	};

// 	const handleLike = async () => {
// 		try {
// 			const updatedBLog = await blogservices.update(
// 				{ ...blog, likes: blog.likes + 1 },
// 				blog.user.token
// 			);
// 			setBlogs(
// 				blogs.map((b) =>
// 					b.id === blog.id
// 						? { ...b, likes: updatedBLog.likes, user: blog.user }
// 						: b
// 				)
// 			);
// 		} catch (exception) {
// 			console.log('exception on handleLike', exception);
// 		}
// 	};

// 	const handleDelete = async () => {
// 		if (!window.confirm('Are you sure you want to delete it?')) {
// 			return;
// 		}

// 		try {
// 			await blogservices.deleteBlog(blog, user.token);
// 			setBlogs(blogs.filter((b) => b.id !== blog.id));
// 		} catch (exception) {
// 			console.log('exception on handleDelete', exception);
// 		}
// 	};

// 	return (
// 		<li style={blogStyle} className="blog">
// 			<div className="blog-title">
// 				{blog.title}
// 				<Button
// 					onClick={toggleView}
// 					label={!visibility ? '🐵 View' : '🙈 Hide'}
// 					style={{ marginLeft: 10 }}
// 				/>
// 			</div>
// 			<p className="blog-author">
// 				<span style={{ fontWeight: 'bold' }}>Author:</span>
// 				{blog.author}
// 			</p>
// 			<div className="blog-likes">
// 				<span style={{ fontWeight: 'bold' }}>Likes:</span> {blog.likes}
// 				<Button
// 					onClick={handleLike}
// 					label="👍"
// 					style={{ borderWidth: 0 }}
// 				/>
// 			</div>
// 			<p className="blog-url">
// 				<span style={{ fontWeight: 'bold' }}>URL:</span>
// 				{blog.url}
// 			</p>
// 			<p className="blog-user">
// 				<span style={{ fontWeight: 'bold' }}>User:</span>
// 				{blog.user.name}
// 			</p>
// 			<Button
// 				onClick={handleDelete}
// 				label="delete"
// 				style={{
// 					backgroundColor: '#ff5d3a',
// 					marginBottom: 4,
// 					borderWidth: 0,
// 				}}
// 			/>
// 		</li>
// 	);
// };

// export default Blog;
