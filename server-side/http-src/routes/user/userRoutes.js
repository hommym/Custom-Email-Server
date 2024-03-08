// importing required modules
const express = require("express");
const { orgCreationController, emailUploadController, loggedInController } = require("./userController.js");
const verifyJWT = require("../../middleware/verifyJwt.js");
const userChecker=require("../../middleware/userChecker.js")
const { parseSingleFileFormData } = require("../../libs/multer.js");


const userRouter = express.Router();


userRouter.post("/create-org", parseSingleFileFormData("companyLogo"), verifyJWT, orgCreationController);

userRouter.post("/upload-contacts/", verifyJWT, parseSingleFileFormData("contacts"), emailUploadController);

userRouter.get("/logged-in", verifyJWT, userChecker, loggedInController)


module.exports = userRouter;
