// importing required modules
const mongoose = require("mongoose");

// the users been used here refers to the companies having an account on the server
const user = new mongoose.Schema({
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

	role: {
		type: String,
        enum:["admin","user"],
		default: "user",
	},

	provider:{
		type:String,
		enum:["google","local"],
		default:"local"
	}
	,
	isVerified: {
		type: Boolean,
		default: false,
	},

});

module.exports = mongoose.model("User", user);
