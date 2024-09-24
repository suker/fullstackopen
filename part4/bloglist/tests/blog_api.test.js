const { after, test, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const User = require('../models/user');
const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest').agent;

const helper = require('./test_helper');

agent = supertest(app);

describe('When there are initial blogs created', async () => {
	beforeEach(async () => {
		await Blog.deleteMany({});
		await Blog.insertMany(helper.initialBlogs);

		await User.deleteMany({});
		for (const user of helper.initialUsers) {
			const { name, username, password } = user;
			await agent
				.post('/api/users')
				.send({ name, username, password })
				.expect('Content-Type', /application\/json/);
		}
		global.token = await helper.getJtw(agent, {
			username: 'juan',
			password: 'carlos',
		});
	});

	// STEP 1

	test('blogs are returned in JSON', async () => {
		await agent
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
			const users = await User.find({});
			const firstUser = users[0];

			const newBlog = {
				title: 'The lord of the rings',
				author: 'J.R.R. Tolkien',
				url: 'https://es.wikipedia.org/wiki/El_Se%C3%B1or_de_los_Anillos',
				likes: '4',
				user: firstUser.id,
			};

			// do no need to set auth headers
			await agent
				.post('/api/blogs')
				.auth(token, { type: 'bearer' })
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

			await agent
				.post('/api/blogs')
				.auth(token, { type: 'bearer' })
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

			await agent
				.post('/api/blogs')
				.auth(token, { type: 'bearer' })
				.send(newBlog)
				.expect(400);
		});

		test('fails with status 400 if url property is missing', async () => {
			const newBlog = {
				title: 'The lord of the rings',
				author: 'J.R.R. Tolkien',
			};

			await agent
				.post('/api/blogs')
				.auth(token, { type: 'bearer' })
				.send(newBlog)
				.expect(400);
		});

		test('fails with status 401 if token is not provided', async () => {
			const newBlog = {
				title: 'The lord of the rings',
				author: 'J.R.R. Tolkien',
				url: 'https://es.wikipedia.org/wiki/El_Se%C3%B1or_de_los_Anillos',
			};

			const response = await agent
				.post('/api/blogs')
				.auth('', { type: 'bearer' }) // token is falsy/missing
				.send(newBlog)
				.expect(401);

			assert(response.body.error.includes('token invalid'));
		});
	});

	describe('When blogs are deleted', () => {
		test('succeeds with status code 204 if id is valid', async () => {
			const validBlog = (await helper.getBlogListDB())[0];
			await agent
				.auth(token, { type: 'bearer' })
				.delete(`/api/blogs/${validBlog.id}`)
				.expect(204);
		});

		test('fails with status code 400 if id is invalid', async () => {
			const invalidBlogId = '66ed2f3d81b6be7cae94da0';
			await agent
				.auth(token, { type: 'bearer' })
				.delete(`/api/blogs/${invalidBlogId}`)
				.expect(400);
		});
	});

	describe('When blogs are updated', () => {
		test('succeeds with 200 updating likes of a blog', async () => {
			const validBlog = (await helper.getBlogListDB())[0];
			const updateBlog = { ...validBlog, likes: 12 };
			await agent
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
			await agent
				.put(`/api/blogs/${invalidBlogId}`)
				.send(updateBlog)
				.expect(400);
		});
	});
});

after(async () => {
	await mongoose.connection.close();
});
