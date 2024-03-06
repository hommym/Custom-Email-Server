// importing required modules
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const verifyJWT = require("../../middleware/verifyJwt.js");
const userChecker = require("../../middleware/userChecker.js");
const saveEmail = require("../../middleware/saveEmail.js");
const { sendController, emailTrackerController } = require("./emailController.js");
const emailSendRouter = express.Router();

emailSendRouter.post("/send", expressAsyncHandler(verifyJWT), expressAsyncHandler(userChecker), expressAsyncHandler(saveEmail), expressAsyncHandler(sendController));

emailSendRouter.get("/email-tracker/:emailId", expressAsyncHandler(emailTrackerController));

module.exports = emailSendRouter;
