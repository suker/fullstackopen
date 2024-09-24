const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
	{
		title: 'Harry Potter',
		author: 'JK.Rowling',
		url: 'https://es.wikipedia.org/wiki/Harry_Potter',
		likes: '10',
	},
	{
		title: 'Pirates of the Caribbean',
		author: 'Gore Verbinski',
		url: 'https://es.wikipedia.org/wiki/Piratas_del_Caribe',
		likes: '7',
	},
];

const initialUsers = [
	{
		name: 'Juanito',
		username: 'juan',
		password: 'carlos',
	},
	{
		name: 'Pepito',
		username: 'pepito',
		password: 'grillo',
	},
];

const nonExistingId = async () => {
	const note = new Blog({
		title: 'willremovethissoon',
		author: 'testing',
		url: 'https://test.com',
		likes: 42,
	});
	await note.save();
	await note.deleteOne();

	return note._id.toString();
};

const getBlogListDB = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

const getJtw = async ( agent, { username, password }) => {
	const response = await agent
	.post('/api/login')
	.send({
		username: 'juan',
		password: 'carlos',
	})
	.expect(200)
	.expect('content-type', /application\/json/)

	return response.body?.token
}

module.exports = {
	initialBlogs,
	initialUsers,
	nonExistingId,
	getBlogListDB,
	usersInDb,
	getJtw
};
