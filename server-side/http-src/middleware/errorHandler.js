const jwt = require("jsonwebtoken");

//  the errorHandler is a method for handling all error thrown from express async handler
const errorHandler = (err, req, res, next) => {
	if (res.statusCode === 200) {
		res.status(500);
	}

	res.json({ error: err.message });
};

module.exports = errorHandler;
