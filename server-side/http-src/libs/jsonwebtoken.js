const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtForLogIn = async (id) => {
  return await jwt.sign({ userId: id }, process.env.JwtSecretKey, { expiresIn: "1d" });
};

const jwtForSignUp = async (id, verfCode) => {
  return await jwt.sign({ userId: id, code: verfCode }, process.env.JwtSecretKey, { expiresIn: "1hr" });
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JwtSecretKey);
  } catch (error) {
    return error;
  }
};

module.exports = {
  jwtForLogIn,
  jwtForSignUp,
  verifyToken,
};
