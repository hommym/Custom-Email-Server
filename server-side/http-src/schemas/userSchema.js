// importing required modules
const mongoose = require("mongoose");

// the users been used here refers to the companies having an account on the server
const user = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},

	role: {
		type: String,
		enum: ["admin", "superAdmin"],
		default: "admin",
	},

	provider: {
		type: String,
		enum: ["google", "local"],
		default: "local",
	},
	isVerified: {
		type: Boolean,
		default: false,
	},

	verfCode: {
		type: Number,
		default: 0,
	},
	orgId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Organisation",
	},
	customerId: {
		type: String,
		// required: true,
	},
	accountStatus:{
		type:String,
		enum:["active","inactive"],
		default:"active"
	},
	// the field is set for account which are created by the superAdmin himself and will allow the user to use the system even without paying
	hasSpecialAccess:Boolean
});

module.exports = mongoose.model("User", user);
