// importing required modules
const express = require("express");
const {
  userSignUpController,
  logInController,
  emailConfirmationController,
  setPasswordController,
  changePasswordController,
  smtpAuthController,
  resetPasswordController,
} = require("./authController.js");
const adminChecker = require("../../middleware/adminChecker.js");
const userChecker = require("../../middleware/userChecker.js");
const sendConfirmation = require("../../middleware/accountConfirmation.js");
const UserSchema = require("../../schemas/userSchema.js");
const verifyJWT = require("../../middleware/verifyJwt.js");
const authRouter = express.Router();

authRouter.post("/user/sign-up", userSignUpController);

authRouter.post("/login", userChecker, logInController);

authRouter.put("/reset-password", userChecker, resetPasswordController);
authRouter.put("/set-password", verifyJWT, userChecker, setPasswordController);

authRouter.put("/change-password", verifyJWT, userChecker, changePasswordController);

authRouter.put("/verify-email", verifyJWT, emailConfirmationController);

// route to hit when authenticating people on the smtp server
authRouter.get("/smtp-auth", userChecker, smtpAuthController);

authRouter.post("/change-to-super-admin", async (req, res) => {
  console.log("Changing a normal account to SuperAdmin");
  const { email } = req.body;

  const update = await UserSchema.updateOne({ email }, { $set: { role: "superAdmin" } });
  console.log(update);
  res.status(200).json(`Account with email: ${email} has been promoted to SuperAdmin`)
});
module.exports = authRouter;
