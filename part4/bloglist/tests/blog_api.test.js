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

// STEP 1

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

// STEP 2

test('Verifies that the unique identifier property of the bloglist is named id', async () => {
    const blogs = await helper.getBlogListDB()
    let hasIdProperty = blogs.every(blog => blog.id)
    assert.equal(hasIdProperty, true)
    assert.equal(blogs.every(blog => blog._id), false)
});

// STEP 3

test('new blog is created in db', async () => {
    const newBlog = {
        title: 'The lord of the rings',
        author: 'J.R.R. Tolkien',
        url: 'https://es.wikipedia.org/wiki/El_Se%C3%B1or_de_los_Anillos',
        likes: '4'
    }

    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('content-type', /application\/json/)

    const blogs = await helper.getBlogListDB()
    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
    assert(blogs.map(blog => blog.title).includes('The lord of the rings'))
})

// STEP 4

test.only('default value of 0 on noexisting likes property', async () => {
    const newBlog = {
        title: 'The lord of the rings',
        author: 'J.R.R. Tolkien',
        url: 'https://es.wikipedia.org/wiki/El_Se%C3%B1or_de_los_Anillos',
    }

    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('content-type', /application\/json/)

    const blogs = await helper.getBlogListDB()
    const blog = blogs.filter(blog => blog.title  === 'The lord of the rings')
    assert.equal(blog[0].likes, 0)
})

after(async () => {
	await mongoose.connection.close();
});
