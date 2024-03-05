//  the errorHandler is a method for handling all error thrown from express async handler
const errorHandler = (err, req, res, next) => {
	console.log(err);

	if (err.message.includes("401")) {
		res.status(401).json({ message: "Unauthorized Access" });
	} else if (err.message.includes("400")) {
		res.status(401).json({ message: "Bad Request" });
	} else {
		res.status(500).json({ message: "Server Error" });
	}
};

module.exports = errorHandler;
