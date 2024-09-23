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
		response.status(400).json({ error: 'username or password is missing' });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const newUser = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await newUser.save();
	response.json(savedUser);
});

module.exports = usersRouter;
