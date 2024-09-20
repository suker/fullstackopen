const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	const body = request.body;

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
	});
	const result = await blog.save();
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
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).send();
});

module.exports = blogsRouter;
