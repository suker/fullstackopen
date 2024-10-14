const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', ['username', 'name']);
	response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body;
	const user = request.user;

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

blogsRouter.delete(
	'/:id',
	middleware.userExtractor,
	async (request, response) => {
		const user = request.user;
		const blog = await Blog.findById(request.params.id);
		if (isInvalidBlog(user, blog)) {
			return response
				.status(401)
				.json({ error: 'blog must belong to user who created it' });
		}
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).send();
	}
);

const isInvalidBlog = (user, blog) => {
	if (
		blog.user === undefined ||
		blog.user.toString() === user.id.toString()
	) {
		return false;
	}
	return true;
};

module.exports = blogsRouter;
