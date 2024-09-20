const { after, test, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const api = supertest(app);

describe('When there are initial blogs created', () => {
	beforeEach(async () => {
		await Blog.deleteMany({});
		await Blog.insertMany(helper.initialBlogs);
	});

	// STEP 1

	test('blogs are returned in JSON', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('content-type', /application\/json/);
	});

	test('all blogs are created', async () => {
		const blogs = await helper.getBlogListDB();
		assert.strictEqual(blogs.length, helper.initialBlogs.length);
	});

	// STEP 2

	test('Verifies that the unique identifier property of the bloglist is named id', async () => {
		const blogs = await helper.getBlogListDB();
		let hasIdProperty = blogs.every((blog) => blog.id);
		assert.equal(hasIdProperty, true);
		assert.equal(
			blogs.every((blog) => blog._id),
			false
		);
	});

	// STEP 3

	describe('When new blog posts are created', () => {
		test('blog is created on DB', async () => {
			const newBlog = {
				title: 'The lord of the rings',
				author: 'J.R.R. Tolkien',
				url: 'https://es.wikipedia.org/wiki/El_Se%C3%B1or_de_los_Anillos',
				likes: '4',
			};

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('content-type', /application\/json/);

			const blogs = await helper.getBlogListDB();
			assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);
			assert(
				blogs
					.map((blog) => blog.title)
					.includes('The lord of the rings')
			);
		});

		// STEP 4

		test('blog is created on db without likes property defined', async () => {
			const newBlog = {
				title: 'The lord of the rings',
				author: 'J.R.R. Tolkien',
				url: 'https://es.wikipedia.org/wiki/El_Se%C3%B1or_de_los_Anillos',
			};

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('content-type', /application\/json/);

			const blogs = await helper.getBlogListDB();
			const blog = blogs.filter(
				(blog) => blog.title === 'The lord of the rings'
			);
			assert.equal(blog[0].likes, 0);
		});

		test('fails with status code 400 if title property is missing', async () => {
			const newBlog = {
				author: 'J.R.R. Tolkien',
				url: 'https://es.wikipedia.org/wiki/El_Se%C3%B1or_de_los_Anillos',
			};

			await api.post('/api/blogs').send(newBlog).expect(400);
		});

		test('fails with status 400 if url property is missing', async () => {
			const newBlog = {
				title: 'The lord of the rings',
				author: 'J.R.R. Tolkien',
			};

			await api.post('/api/blogs').send(newBlog).expect(400);
		});
	});

	describe('When blogs are deleted', () => {
		test('succeeds with status code 204 if id is valid', async () => {
			const validBlog = (await helper.getBlogListDB())[0];
			await api.delete(`/api/blogs/${validBlog.id}`).expect(204);
		});

		test('fails with status code 400 if id is invalid', async () => {
			const invalidBlogId = '66ed2f3d81b6be7cae94da0';
			await api.delete(`/api/blogs/${invalidBlogId}`).expect(400);
		});
	});

	describe('When blogs are updated', () => {
		test('succeeds with 200 updating likes of a blog', async () => {
			const validBlog = (await helper.getBlogListDB())[0];
			const updateBlog = { ...validBlog, likes: 12 };
			await api
				.put(`/api/blogs/${validBlog.id}`)
				.send(updateBlog)
				.expect(200);

			const blogs = await helper.getBlogListDB();
			assert.strictEqual(blogs[0].likes, updateBlog.likes);
		});

		test('fails with status code 400 if id is invalid', async () => {
			const validBlog = (await helper.getBlogListDB())[0];
			const updateBlog = { ...validBlog, title: 'Harry Potter #1' };
			const invalidBlogId = '66ed2f3d81b6be7cae94da0';
			await api
				.put(`/api/blogs/${invalidBlogId}`)
				.send(updateBlog)
				.expect(400);
		});
	});
});

after(async () => {
	await mongoose.connection.close();
});
