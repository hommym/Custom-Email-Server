// importing required module
const bcrypt = require("bcrypt");
const User = require("../../schemas/userSchema.js");
const employee = require("../../schemas/employeeSchema.js");
const organisation = require("../../schemas/organisationSchema");
const { jwtForLogIn } = require("../../libs/jsonwebtoken.js");
require("dotenv").config();

const asyncHandler = require("express-async-handler");
require("dotenv").config();

const userSignUpController = asyncHandler(async (req, res, next) => {
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

	// console.log(userNamesInDatabase,workEmailsInDatabase)
	if (emailsInDatabase.length !== 0) {
		return res.status(409).json({ message: "Account with this email already exist" });
	}

	// saving data in database
	const savedDocument = await User.create({ firstname, lastname, password: hashedPassword, email });
	console.log("account created successfully");
	req.body.user = savedDocument;
	// req.body = {...req.body , _id : savedDocument , type : 'user'}
	next();
});

const employeeSignUpController = asyncHandler(async (req, res, next) => {
	const { firstName,lastName,email,password } = req.body;
	if (!(firstName || email || password || lastName)) {
		throw new Error("Some fields in the body are empty");
	}

	// checking if account already exist
	if (await employee.findOne({ email: email })) {
		res.status(200);
		throw new Error("Account already exist");
	}

  if (!req.user.orgId) {
    return res.status(402).json({ message: "No Organisation present for employees to be added to" });
  }

  const userWithOrgDocumentAvailable = await req.user.populate("orgId");
  const { employeeCount, maxEmployeeCount } = userWithOrgDocumentAvailable.orgId;

  if (maxEmployeeCount) {
    if (employeeCount === maxEmployeeCount) {
      return res.status(402).json({ message: "You can't add anymore employees you limit has been reached" });
    }
  }

	// hashing password
	const hashedPassword = await bcrypt.hash(process.env.DefaultPasswordEmployee, 10);

  // saving employee data in database
  const newEmployee = await employee.create({ firstName,lastName ,email, password: hashedPassword, orgId: req.user.orgId });
  console.log("New employee saved in database");

  // updating number of employees
  await organisation.updateOne({ _id: req.user.orgId }, { $set: { employeeCount: userWithOrgDocumentAvailable.orgId.employeeCount + 1 } });
  req.body.employee = newEmployee;
  console.log("Orgnisation employeeCont Updated");

	next();
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
		throw new Error("Password incorrect");
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
	throw new Error("Password incorrect");
});

const setPasswordController = asyncHandler(async (req, res, next) => {
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

const smtpAuthController = asyncHandler(async (req, res, next) => {
	console.log("Authenticating a user hiting smtp server...");
	// if smtp server is being access by orgOwner
	if (req.user) {
		const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.user.password);
		//  comparing hashed password in body to the one in the database(req.user.password)
		if (isPasswordsTheSame) {
			console.log("User authenticated");
			return res.status(200).json({ message: "Account present on server" });
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
  employeeSignUpController,
  setPasswordController,
  changePasswordController,
  smtpAuthController,
};
