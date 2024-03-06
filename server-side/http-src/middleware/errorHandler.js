const jwt = require("jsonwebtoken");

//  the errorHandler is a method for handling all error thrown from express async handler
const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  res.json({ message: err.message });
};

module.exports = errorHandler;
