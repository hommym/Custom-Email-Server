// importing required modules
const express = require("express");
const verifyJWT = require("../../middleware/verifyJwt.js");
const userChecker = require("../../middleware/userChecker.js");
const saveEmail = require("../../middleware/saveEmail.js");
const { sendController, emailTrackerController, outBoxController } = require("./emailController.js");
const emailRouter = express.Router();

emailRouter.post("/send", verifyJWT, userChecker, saveEmail, sendController);

emailRouter.get("/email-tracker/:emailId", emailTrackerController);

emailRouter.get("/outbox", verifyJWT,userChecker,outBoxController);

module.exports = emailRouter;
