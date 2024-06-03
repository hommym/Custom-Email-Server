// importing required module
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../../schemas/userSchema.js");
const employee = require("../../schemas/employeeSchema.js");
const { jwtForLogIn } = require("../../libs/jsonwebtoken.js");
const { sendConfirmationMail, sendPasswordResetEmail } = require("../../libs/nodeMailer");
const userNameGenerator = require("../../../helperTools/userNameGenerator.js");

const asyncHandler = require("express-async-handler");
require("dotenv").config();

const userSignUpController = asyncHandler(async (req, res) => {
  const { lastname, firstname, password, email } = req.body;

  // checking all the needed data for creating account is present

  if (!lastname || !firstname || !password || !email) {
    res.status(400);
    throw new Error("Some of the fields in the body are empty");
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // checking if account already existed
  const emailsInDatabase = await User.find({ email: email });

  // generating a deafualt userName for account
  const userName = await userNameGenerator(firstname);

  // console.log(userNamesInDatabase,workEmailsInDatabase)
  if (emailsInDatabase.length !== 0) {
    return res.status(409).json({ message: "Account with this email already exist" });
  }

  // saving data in database
  const savedDocument = await User.create({ firstname, lastname, password: hashedPassword, email, userName });
  console.log("account created successfully");
  req.body.user = savedDocument;

  // sending confirmation email
  await sendConfirmationMail(req);

  res.status(201).json({ message: "Account created successfully, check email to confirm account" });
});

const sendEmailConfirmationController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Invalid body email field undefined");
  }
  console.log("Sending account-confirmation email...");

  console.log("Checking if account exist and is verified ...");

  const userAccount = await User.findOne({ email: email });

  if (!userAccount) {
    console.log("Account does not exist");
    res.status(401);
    throw new Error("Unthorized access");
  }

  console.log("Account exists");

  if (!userAccount.isVerified) {
    console.log("Account verifification email not sent");
    return res.status(200).json({ message: "Account has already been verified" });
  }
  console.log("Account not verified");
  console.log("Setting up  user field  data in req object");
  req.body.user = userAccount;

  // sending confirmation email
  await sendConfirmationMail(req);

  res.status(200).json({ message: "Email sent successfully" });
});

const emailConfirmationController = asyncHandler(async (req, res) => {
  const updatedDocument = await User.updateOne({ _id: req.id, verfCode: req.verfCode }, { $set: { isVerified: true, verfCode: 0 } });
  if (updatedDocument.modifiedCount === 0) {
    await employee.updateOne({ _id: req.id, verfCode: req.verfCode }, { $set: { isVerified: true, verfCode: 0 } });
  }

  console.log("isVerified has been set to true and verfcode is set to 0");

  // there will be a redirection to a page to show email has successfully being updated(not implemented yet for now we send a json respone)

  res.status(200).json({ message: "Email has being successfully confirmed" });
});

const logInController = asyncHandler(async (req, res, next) => {
  // if smtp server is being access by orgOwner
  if (req.user) {
    const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.user.password);
    //  comparing hashed password in body to the one in the database(req.user.password)

    if (isPasswordsTheSame) {
      // creating jwtForLogIn using user's id

      const token = await jwtForLogIn(req.user._id);
      console.log("token created");

      //  sending token back to client
      return res.status(200).json({ jwtForLogIn: token, message: "Log in successful" });
    }
    res.status(401);
    throw new Error("Invalid email and password");
  }

  // if smtp server is being access by an employee
  const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.employee.password);
  if (isPasswordsTheSame) {
    // creating jwtForLogIn using user's id
    const token = await jwtForLogIn(req.employee._id);

    console.log("token created");
    //  sending token back to client
    return res.status(200).json({ jwtForLogIn: token, message: "Log in successful" });
  }
  res.status(401);
  throw new Error("Invalid email and password");
});

const setPasswordController = asyncHandler(async (req, res) => {
  // hashing password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let updDoc = await User.findByIdAndUpdate(req.id, { $set: { password: hashedPassword, verfCode: 0 } });

  if (!updDoc) {
    updDoc = await employee.findByIdAndUpdate(req.id, { $set: { password: hashedPassword, verfCode: 0 } });
  }

  console.log("Password changed successfully");
  res.status(200).json({ message: "Password changed successfully" });
});

const changePasswordController = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("oldPassword or newPassword is empty");
  }

  if (req.user) {
    const isOldPasswordTheSameInDatabase = await bcrypt.compare(oldPassword, req.user.password);

    if (isOldPasswordTheSameInDatabase) {
      // hashing password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.updateOne({ email: req.user.email }, { $set: { password: hashedPassword } });
      console.log("Password Updated");
      return res.status(200).json({ message: "Password changed successfully" });
    }

    console.log("Old password is incorrect. Unable to change password");
    return res.status(403).json({ message: "Old password is incorrect. Unable to change password" });
  } else {
    const isOldPasswordTheSameInDatabase = await bcrypt.compare(oldPassword, req.employee.password);

    if (isOldPasswordTheSameInDatabase) {
      // hashing password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await employee.updateOne({ email: req.employee.email }, { $set: { password: hashedPassword } });
      console.log("Password Updated");
      return res.status(200).json({ message: "Password changed successfully" });
    }

    console.log("Old password is incorrect. Unable to change password");
    return res.status(403).json({ message: "Old password is incorrect. Unable to change password" });
  }
});

const resetPasswordController = asyncHandler(async (req, res) => {
  // sending emaill
  await sendPasswordResetEmail(req);
  res.status(201).json({ message: "An email has been sent check your mail to proceed with password reset" });
});

const smtpAuthController = asyncHandler(async (req, res, next) => {
  console.log("Authenticating a user hiting smtp server...");
  // if smtp server is being access by orgOwner
  if (req.user) {
    const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.user.password);
    //  comparing hashed password in body to the one in the database(req.user.password)
    if (isPasswordsTheSame) {
      console.log("User authenticated");
      console.log("Checking if user is on a paid plan or has been given special access by superAdmin");
      // checking if user has special access
      if (req.user.hasSpecialAccess) {
        console.log("User has special access");
        return res.status(200).json({ message: "Account present on server" });
      }

      // checking if user is on a subscription(Not yet implemented)

      res.status(401);
      throw new Error("User is not a subscription or have special access");
    }
    res.status(401);
    throw new Error("Password does not match");
  }

  // if smtp server is being access by an employee
  const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.employee.password);

  if (isPasswordsTheSame) {
    console.log("User authenticated");
    return res.status(200).json({ message: "Account present on server" });
  }

  res.status(401);
  throw new Error("Password does not match");
});

module.exports = {
  userSignUpController,
  logInController,
  emailConfirmationController,
  setPasswordController,
  changePasswordController,
  smtpAuthController,
  resetPasswordController,
  sendEmailConfirmationController,
};
