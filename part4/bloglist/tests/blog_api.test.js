const { after, test, beforeEach } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	const blogObject = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObject.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

test('blogs are returned in JSON', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('content-type', /application\/json/);
});

test('there are initialBlogs created', async () => {
	const blogs = await helper.getBlogListDB();

	assert.strictEqual(blogs.length, helper.initialBlogs.length);
});

after(async () => {
	await mongoose.connection.close();
});
