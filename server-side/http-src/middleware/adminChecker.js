const User = require("../schemas/userSchema");
const asyncHandler = require("express-async-handler");

const adminChecker = asyncHandler(async (req, res, next) => {
  // checking if member with the id in the body is an Admin
  const userAccount = await User.findOne({ _id: req.id });

  if (userAccount && (userAccount.role === "superAdmin" || userAccount.role === "admin")) {
    req.user = userAccount;
    console.log("account belongs to an Admin or SuperAdmin");
    next();
  } else {
    console.log("account do not belong an Admin or SuperAdmin");
    res.status(401);
    throw new Error("Unathorize to create an employee");
  }
});

module.exports = adminChecker;
