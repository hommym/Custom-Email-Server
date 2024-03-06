// importing required modules
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { orgCreationController } = require("./userController.js");
const verifyJWT = require("../../middleware/verifyJwt.js");
const multer = require("multer");

const userRouter = express.Router();
// multer configuration setting
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.post("/create-org", upload.single("Company-Logo"), expressAsyncHandler(verifyJWT), expressAsyncHandler(orgCreationController));

module.exports = userRouter;
