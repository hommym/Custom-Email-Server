// importing required modules
const express = require("express");
const {
  userSignUpController,
  logInController,
  emailConfirmationController,
  employeeSignUpController,
  setPasswordController,
  changePasswordController,
  smtpAuthController,
} = require("./authController.js");
const adminChecker = require("../../middleware/adminChecker.js");
const userChecker = require("../../middleware/userChecker.js");
const sendConfirmation = require("../../middleware/accountConfirmation.js");
const verifyJWT = require("../../middleware/verifyJwt.js");
const authRouter = express.Router();

authRouter.post("/user/sign-up", userSignUpController, sendConfirmation);

authRouter.post("/employee/sign-up", verifyJWT, adminChecker, employeeSignUpController, sendConfirmation);

authRouter.post("/login", userChecker, logInController);


authRouter.put("/reset-password", userChecker, sendConfirmation);
authRouter.put("/set-password", verifyJWT, userChecker, setPasswordController);

authRouter.put("/change-password", verifyJWT, userChecker, changePasswordController);

authRouter.put("/verify-email", verifyJWT, emailConfirmationController);

// route to hit when authenticating people on the smtp server
authRouter.get("/smtp-auth", userChecker, smtpAuthController);

module.exports = authRouter;
