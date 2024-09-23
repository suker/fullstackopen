const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	// body: { name, username, password }
	const { name, username, password } = request.body;

	if (!username || !password) {
		return response
			.status(400)
			.json({ error: 'username or password is missing' });
	}
	if (password.length < 3) {
		return response
			.status(400)
			.json({ error: 'Password must be at least 3 characters long' });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const newUser = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await newUser.save();
	response.status(201).json(savedUser);
});

module.exports = usersRouter;
