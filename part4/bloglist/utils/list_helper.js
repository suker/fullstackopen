const dummy = (blogs) => {
	// blogs ->  array
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.map((blog) => blog.likes).reduce((sum, value) => sum + value);
};

const favoriteBlog = (blogs) => {
	let mostLikes = 0;
	let favoriteBlog = {};

	blogs.forEach((blog) => {
		if (blog.likes > mostLikes) {
			mostLikes = blog.likes;
			favoriteBlog = blog;
		}
	});

	delete favoriteBlog._id;
	delete favoriteBlog.url;
	delete favoriteBlog.__v;

	return favoriteBlog;
};

module.exports = { dummy, totalLikes, favoriteBlog };
