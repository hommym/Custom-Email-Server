const mongoDb = require("mongodb");
const user = require("../schemas/user-account-schema");

const adminChecker = async (req, res, next) => {
	const { adminId } = req.body;

	if (!adminId) {
		throw new Error("401");
	}

	// checking if member with the id in the body is an Admin
	const membersAccount = await companyMembers.findById(adminId);

	// checking if member with the id in the body is an Admin
	const userAccount = await user.findById(req.id);

	if (userAccount && (userAccount.role === "user" || userAccount === "admin")) {
		req.user = userAccount;
		console.log("account belongs to orgOwner or Admin");
		next();
	} else {
		console.log("account do not belong orgOwner or Admin");
		throw new Error("401");
	}
};

module.exports = adminChecker;
