// importing required modules
const express = require("express");
const { employeeCountController, employeeSignUpController, changeStatusController } = require("../employee/employeeControllers.js");
const verifyJwt = require("../../middleware/verifyJwt.js");
const adminChecker = require("../../middleware/adminChecker.js");
const userChecker = require("../../middleware/userChecker.js");
const sendConfirmation = require("../../middleware/accountConfirmation.js");
const employeeRouter = express.Router();

employeeRouter.get("/show-employees", verifyJwt, adminChecker, employeeCountController);
employeeRouter.post("/sign-up", verifyJwt, adminChecker, employeeSignUpController, sendConfirmation);


employeeRouter.post("/:employeeId/change-status", verifyJwt, changeStatusController);
module.exports = employeeRouter;
