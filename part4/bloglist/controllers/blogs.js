const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// const getTokenFrom = (request) => {
// 	const authorization = request.get('authorization');
// 	if (authorization && authorization.startsWith('Bearer ')) {
// 		return authorization.replace('Bearer ', '');
// 	}
// 	return null;
// };

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', ['username', 'name']);
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	const body = request.body;

	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' });
	}
	const user = await User.findById(decodedToken.id);

	if (!body.title || !body.url) {
		return response.status(400).json({
			error: 'title or url missing',
		});
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ?? 0,
		user: user.id,
	});
	const result = await blog.save();
	user.blogs = user.blogs.concat(result._id);
	await user.save();
	response.status(201).json(result);
});

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body;

	if (!body.title || !body.url || !body.author) {
		return response.status(400).json({
			error: 'title/url/author is missing',
		});
	}

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ?? 0,
	};
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});
	response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' });
	}
	const user = await User.findById(decodedToken.id);
	const blog_id = request.params.id
	if ((await canUserDeleteBlog(user, blog_id)) === false) {
		return response
			.status(401)
			.json({ error: 'blog must belong to user who created it' });
	}
	await Blog.findByIdAndDelete(blog_id);
	response.status(204).send();
});

module.exports = blogsRouter;

const canUserDeleteBlog = async (user, blog_id) => {
	const blog = await Blog.findById(blog_id)
	if (blog.user === undefined || blog.user.toString() === user.id.toString()) {
		return true
	}
		return false
}
