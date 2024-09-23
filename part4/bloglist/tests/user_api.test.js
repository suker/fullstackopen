const { after, test, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const User = require('../models/user');
const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const api = supertest(app);

describe('when users are being initializing in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		await User.insertMany(helper.initialUsers);
	});

	test('users are returned in JSON format', async () => {
		await api
			.get('/api/users')
			.expect(200)
			.expect('content-type', /application\/json/);
	});

	test('creation succeeds with a new user', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			name: 'Marta',
			username: 'martita132',
			password: 'cortes1',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
		const usernames = usersAtEnd.map((u) => u.username);
		assert(usernames.includes(newUser.username));
	});

	test('fails on user creation with password shorter than 3 chars', async () => {
		const newUser = {
			name: 'Marta',
			username: 'marta',
			password: 'te',
		};

		const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)

		assert(result.body.error.includes('Password must be at least 3 characters long'))
	})

	test('fails on user creation without username or password property', async () => {
		const newUser = {
			name: 'Marta',
			password: 'te',
		};

		const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)

		assert(result.body.error.includes('username or password is missing'))
	})
});

after(async () => {
	await mongoose.connection.close();
});
