const info = (...params) => {
	console.log(...params);
};

const errorLogger = (...params) => {
	console.log(...params);
};

module.exports = {
	info,
	errorLogger,
};
