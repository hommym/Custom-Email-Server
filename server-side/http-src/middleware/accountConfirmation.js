const User = require("../schemas/userSchema");
const Employee = require("../schemas/employeeSchema");
const { jwtForSignUp } = require("../libs/jsonwebtoken");
const { sendConfirmationMail } = require("../libs/nodeMailer");
require("dotenv").config();

function verificationNumberGenerator() {
	// Generate a random number between 10000 and 99999 (inclusive)
	return Math.floor(Math.random() * 90000) + 10000;
}

const emailSender = async (req, res) => {
	const emailAdress = req.body.email;
	const mailOptions = {
		from: "herbertharthur80@gmail.com",
		to: emailAdress,
	};

	const verificationCode = verificationNumberGenerator();

	if (req.body.user || req.body.employee) {
		mailOptions.subject = "OurBusinessName Email Confirmation";

		if (req.body.user) {
			await User.updateOne({ email: emailAdress }, { $set: { verfCode: verificationCode } });
			mailOptions.text = `${req.body.firstname} ,your account has being created successfully, to confirm email click on this link ${
				process.env.FrontEndBaseUrl
			}/verify-email?token=${await jwtForSignUp(req.body.user._id, verificationCode)}`;
		} else {
			mailOptions.text = `${req.body.firstname} your account has being successfully created, to confirm email and set password click this link ${
				process.env.FrontEndBaseUrl
			}/set-password?token=${await jwtForSignUp(req.body.employee._id, verificationCode)}.`;

			await Employee.updateOne({ email: emailAdress }, { $set: { verfCode: verificationCode } });
		}
	} else {
		mailOptions.subject = "OurBusinessName Password Reset";

		let updDoc = await User.findOneAndUpdate({ email: emailAdress }, { $set: { verfCode: verificationCode } });
		console.log(1);
		if (!updDoc) {
			console.log(2);
			updDoc = await Employee.findOneAndUpdate({ email: emailAdress }, { $set: { verfCode: verificationCode } });
		}

		mailOptions.text = `To reset the password please click this link ${process.env.FrontEndBaseUrl}/set-password?token=${await jwtForSignUp(updDoc._id, verificationCode)}`;
		console.log(updDoc);
		sendConfirmationMail(mailOptions);
		return res.status(201).json({ message: "Account reset successfully" });
	}

	// the service , host and port below will be change during production, the ones below is for testing

	sendConfirmationMail(mailOptions);

	res.status(201).json({ message: "Account created successfully, check email to confirm account" });
};

module.exports = emailSender;
