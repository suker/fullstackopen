const { after, test, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const User = require('../models/user');
const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const api = supertest(app);

describe('when doing login post requests', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		for (const user of helper.initialUsers) {
			const { name, username, password } = user;
			await api
				.post('/api/users')
				.send({ name, username, password })
				.expect('Content-Type', /application\/json/);
		}
	});

	test('succeeds on login request', async () => {
		const { username, password } = helper.initialUsers[0];
		await api
			.post('/api/login')
			.send({ username, password })
			.expect(200)
			.expect('content-type', /application\/json/);
	});

	test('fails on login request due to invalid username or password', async () => {
		const userNotValid = {
			username: 'noExisto',
			password: 'muchoMenos',
		};
		const result = await api
			.post('/api/login')
			.send(userNotValid)
			.expect(401)
			.expect('content-type', /application\/json/);

		assert(result.body.error.includes('invalid username or password'))
	});
});

after(async () => {
	await mongoose.connection.close();
});
