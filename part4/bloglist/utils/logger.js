const info = (...params) => {
	if (process.env.NODE_ENV === 'test')
		return
	console.log(...params);
};

const errorLogger = (...params) => {
	if (process.env.NODE_ENV === 'test')
		return
	console.log(...params);
};

module.exports = {
	info,
	errorLogger,
};
