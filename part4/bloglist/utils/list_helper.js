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

// returns the author who has the largest amount of blogs
const mostBlogs = (blogs) => {

    const authorCounts = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }, {})

    const mostBlogsAuthor = Object.keys(authorCounts).reduce((a, b) => {
        return authorCounts[a] > authorCounts[b] ? a : b
    }, 0)

    return {
        author: mostBlogsAuthor,
        blogs: authorCounts[mostBlogsAuthor]
    }
}

const mostLikes = (blogs) => {

    const likesCount = blogs.reduce((acc, blog) => {
        console.log(blog.likes)
        if (acc[blog.author]) {
         acc[blog.author] += blog.likes
        } else 
          acc[blog.author] = (blog.likes || 0)
        return acc
    }, {})

    const mostBlogsAuthor = Object.keys(likesCount).reduce((a, b) => {
        return likesCount[a] > likesCount[b] ? a : b
    }, 0)

    return {
        author: mostBlogsAuthor,
        likes: likesCount[mostBlogsAuthor]
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
