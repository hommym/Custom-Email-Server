// importing required modules
const user = require("../schemas/userSchema");
const employee = require("../schemas/employeeSchema");
const asyncHandler = require("express-async-handler");

const userChecker = asyncHandler(async (req, res, next) => {
	const userWanted = req.body.email ? await user.findOne({ email: req.body.email }) : req.body.username ? await user.findOne({userName:req.body.username}) : await user.findById(req.id);
	// console.log(req.id);
	// console.log(userWanted)

	if (userWanted) {
		if (!userWanted.isVerified) {
			return res.status(401).json({ message: "Email has not been verified" });
		}

		req.user = userWanted;
		console.log("Account exist");
		return next();
	}

	const employeeWanted = req.body.email ? await employee.findOne({ email: req.body.email }) : await employee.findById(req.id);

	if (employeeWanted) {
		if (!employeeWanted.isVerified) {
			return res.status(401).json({ message: "Email has not been verified" });
		}

		req.employee = employeeWanted;
		console.log("Account exist");
		return next();
	}

	throw new Error("Account does not exist");
});

module.exports = userChecker;
