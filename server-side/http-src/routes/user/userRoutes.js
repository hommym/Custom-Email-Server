// importing required modules
const express = require("express");
const { orgCreationController, emailUploadController } = require("./userController.js");
const verifyJWT = require("../../middleware/verifyJwt.js");
const { parseSingleFileFormData } = require("../../libs/multer.js");


const userRouter = express.Router();


userRouter.post("/create-org", parseSingleFileFormData("companyLogo"), verifyJWT, orgCreationController);

userRouter.post("/upload-contacts/", verifyJWT, parseSingleFileFormData("contacts"), emailUploadController);


module.exports = userRouter;
