const dummy = (blogs) => {
	// blogs ->  array
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.map((blog) => blog.likes).reduce((sum, value) => sum + value);
};

module.exports = { dummy, totalLikes };
