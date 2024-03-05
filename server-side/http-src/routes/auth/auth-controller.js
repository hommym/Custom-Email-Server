// importing required module
const bcrypt = require("bcrypt");
const user = require("../../schemas/user-account-schema.js");
const unverifiedMembers = require("../../schemas/unverified-accounts-shema.js");
const employee = require("../../schemas/employee-schema.js");
const organisation = require("../../schemas/organisation-schema");
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const userSignUpController = async (req, res, next) => {
	// checking all the needed data for creating account is present

	if (!fullName || !userName || !password || !email) {
		throw new Error("400");
	}

	// hashing password
	const hashedPassword = await bcrypt.hash(password, 10);
	// console.log(hashedPassword);

	// checking if account already existed
	const userNamesInDatabase = await user.find({ userName: userName });
	const emailsInDatabase = await user.find({ email: email });

	console.log(savedDocument);

	// adding newly created users to unverified members
	const verificationCode = verificationNumberGenerator();
	const unverifiedMember = await unverifiedMembers.create({ userName: userName, verificationCode: verificationCode });

	// send email for verifying the account that was created
	const linkForVerfication = `http://localhost:3000/auth/email-confirmation?userName=${userName},verfCode=${verificationCode}`;

	// the service , host and port below will be change during production, the ones below is for testing
	const transporter = nodeMailer.createTransport({
		service: "Gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "herbertharthur80@gmail.com",
			pass: "xcgf scrz anbg ofxu",
		},
	});

	// saving data in database
	const savedDocument = await user.create({ fullName: fullName, userName: userName, password: hashedPassword, email: email });
	console.log("account created successfully");

	if (!userName || !verfCode) {
		throw new Error("400");
	}

	res.status(201).json({ message: "Account created successfully, verify email to login" });
};

const employeeSignUpController = async (req, res, next) => {
	const employeeData = req.body;
	if (!(employeeData.fullName || employeeData.email || employeeData.password)) {
		throw new Error("400");
	}

	if (!req.user.userOrgnisation) {
		return res.status(402).json({ message: "No Organisation present for employees to be added to" });
	}

	// hashing password
	const hashedPassword = await bcrypt.hash("ktx#trt5123", 10);
	// saving employee data in database
	await employee.create({ fullName: employeeData.fullName, email: employeeData.email, password: hashedPassword, orgId: req.user.userOrgnisation });

	// updating number of employees
	const userWithOrgDocumentAvailable = await req.user.populate("userOrgnisation");

	await organisation.updateOne({ _id: req.user.userOrgnisation }, { $set: { employeeCont: userWithOrgDocumentAvailable.userOrgnisation.employeeCont + 1 } });
	req.body.employee = "employee";
	console.log("Orgnisation employeeCont Updated");

	next();

	res.status(200).json({ message: "Email has being successfully confirmed" });
};

const emailConfirmationController = async (req, res) => {
	const { emailAdress, verfCode } = req.query;

	if (!emailAdress || !verfCode) {
		throw new Error("400");
	}

	const updatedDocument = await user.updateOne({ email: emailAdress }, { $set: { isVerified: true } });
	if (updatedDocument.modifiedCount === 0) {
		await employee.updateOne({ email: emailAdress }, { $set: { isVerified: true } });
	}

	const deletedDocument = await unverifiedMembers.deleteOne({ email: emailAdress, verificationCode: Number(verfCode) });
	console.log("isVerified has been set to true and account has been removed from unverified-accounts");

	// there will be a redirection to a page to show email has successfully being updated(not implemented yet for now we send a json respone)

	res.status(200).json({ message: "Email has being successfully confirmed" });
};

const logInController = async (req, res, next) => {
	// if smtp server is being access by orgOwner
	if (req.user) {
		const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.user.password);
		//  comparing hashed password in body to the one in the database(req.user.password)
		if (isPasswordsTheSame) {
			// creating jwt using user's id

			jwt.sign({ userId: req.user._id }, process.env.JwtSecretKey, { expiresIn: "5h" }, function (err, token) {
				if (err) {
					return next(err);
				}

				console.log("token created");
				//  sending token back to client
				res.status(200).json({ jwt: token, message: "Log in successful" });
			});

			return 0;
		}

		next(new Error("401"));
	}

	// if smtp server is being access by an employee
	const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.employee.password);
	if (isPasswordsTheSame) {
		// creating jwt using user's id
		jwt.sign({ userId: req.employee._id }, process.env.JwtSecretKey, { expiresIn: "1h" }, function (err, token) {
			if (err) {
				return next(err);
			}

			console.log("token created");
			//  sending token back to client
			res.status(200).json({ jwt: token, message: "Log in successful" });
		});

		return 0;
	}

	next(new Error("401"));
};

const loggedInController = async (req, res) => {
	if (req.user) {
		console.log("account info sent");
		return res.status(200).json({ accountInfo: req.user });
	}

	console.log("account info sent");
	res.status(200).json({ accountInfo: req.employee });
};

const resetPasswordController = async (req, res, next) => {
	req.body.newPassword = `ahswtgs${Math.floor(Math.random() * 90000) + 10000}`;
	// hashing password
	const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

	if (req.user) {
		await user.updateOne({ email: req.body.email }, { $set: { password: hashedPassword } });
	} else {
		await employee.updateOne({ email: req.body.email }, { $set: { password: hashedPassword } });
	}
	console.log("Password changed to default");
	next();
};

const changePasswordController = async (req, res, next) => {
	const { oldPassword, newPassword } = req.body;

	if (!oldPassword || !newPassword) {
		next(new Error(400));
	}

	if (req.user) {
		const isOldPasswordTheSameInDatabase = await bcrypt.compare(oldPassword, req.user.password);

		if (isOldPasswordTheSameInDatabase) {
			// hashing password
			const hashedPassword = await bcrypt.hash(newPassword, 10);

			await user.updateOne({ email: req.user.email }, { $set: { password: hashedPassword } });
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
};

const smtpAuthController = async (req, res, next) => {
	console.log("Authenticating a user hiting smtp server...");
	// if smtp server is being access by orgOwner
	if (req.user) {
		const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.user.password);
		//  comparing hashed password in body to the one in the database(req.user.password)
		if (isPasswordsTheSame) {
			console.log("User authenticated");
			return res.status(200).json({ message: "Account present on server" });
		}

		return next(new Error("401"));
	}

	// if smtp server is being access by an employee
	const isPasswordsTheSame = await bcrypt.compare(req.body.password, req.employee.password);

	if (isPasswordsTheSame) {
		console.log("User authenticated");
		return res.status(200).json({ message: "Account present on server" });
	}

	next(new Error("401"));
};

module.exports = {
	userSignUpController,
	logInController,
	emailConfirmationController,
	employeeSignUpController,
	loggedInController,
	resetPasswordController,
	changePasswordController,
	smtpAuthController,
};
