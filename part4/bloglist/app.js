const express = require('express');
const app = express();
require('express-async-errors')
const cors = require('cors');
const middleware = require('./utils/middleware.js');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config.js');

mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((err) => {
		console.log('Error on connecting to database:', err.message);
	});

module.exports = app;
