const User = require("../schemas/userSchema");
const asyncHandler = require("express-async-handler");

const superAdminChecker = asyncHandler(async (req, res, next) => {
  // checking if member with the id in the body is an Admin
  const userAccount = await User.findOne({ _id: req.id });

  if (userAccount && userAccount.role === "superAdmin") {
    req.user = userAccount;
    console.log("Access granted superAdmin detected..");
    next();
  } else {
    console.log("Access denied only superAdmin is allowed ");
    res.status(401);
    throw new Error("Unathorize to access resource or perform this action");
  }
});

module.exports = superAdminChecker;
