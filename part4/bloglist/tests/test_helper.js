const Blog = require('../models/blog');

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
	return blogs.map((note) => note.toJSON());
};

module.exports = { initialBlogs, nonExistingId, getBlogListDB };
