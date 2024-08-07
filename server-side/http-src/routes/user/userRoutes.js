// importing required modules
const express = require("express");
const { orgCreationController, contactsUploadController, loggedInController, saveContactController } = require("./userController.js");
const verifyJWT = require("../../middleware/verifyJwt.js");
const userChecker = require("../../middleware/userChecker.js");
const { parseSingleFileFormData } = require("../../libs/multer.js");
const csvToArray=require("../../middleware/csvToArray.js")


const userRouter = express.Router();

userRouter.post("/create-org", verifyJWT, parseSingleFileFormData("companyLogo"), orgCreationController);

userRouter.post("/upload-contacts/", verifyJWT, parseSingleFileFormData("contacts"), csvToArray,contactsUploadController);

userRouter.post("/save-contacts", verifyJWT, saveContactController);

userRouter.get("/logged-in", verifyJWT, userChecker, loggedInController);

module.exports = userRouter;
