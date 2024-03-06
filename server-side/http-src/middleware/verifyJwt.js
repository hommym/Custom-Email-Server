const { verifyToken } = require("../libs/jsonwebtoken.js");
require("dotenv").config();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const verifyJwt = asyncHandler(async (req, res, next) => {
  let token = null;

  if (req.headers.authorization) {
    if (!req.headers.authorization.includes("Bearer")) {
      throw new Error("Bad Request Bearer scheme not found");
    }

    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.body.token;
    // console.log(req.body);
  }
  // console.log(token);
  const data = await verifyToken(token);
  console.log(data);
  if (data.userId) {
    req.id = new mongoose.Types.ObjectId(data.userId);
    if (data.code) {
      req.verfCode = data.code;
    }

    console.log("Token verified");
    next();
  } else {
    res.status(401);
    throw new Error(data.message);
  }
});

module.exports = verifyJwt;
