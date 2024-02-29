// importing required modules
const mongoose = require("mongoose");

// the users been used here refers to the companies having an account on the server
const userAccountSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},

	accountStatus: {
		type: String,
		default: "user",
	},

	isVerified: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("user-accounts", userAccountSchema);
