const asyncHandler = require("express-async-handler");
const UserSchema = require("../../schemas/userSchema");
const { tObjectId } = require("../../libs/mongoose");

const allAdminAccountsController = asyncHandler(async (req, res) => {
  // getting all users id's and firstName from database
  const allAccounts = await UserSchema.find({ role: "admin" }).select("_id firstname accountStatus");

  res.status(200).json({ accounts: allAccounts });
});

const accounActivationController = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    req.status(400);
    throw new Error("Bad request no id found");
  }

  // activating account
  await UserSchema.updateOne({ _id: tObjectId(id) }, { $set: { accountStatus: "active" } });
  res.status(200).json({ message: "account activated" });
});

const accountDeactivationController = asyncHandler(async (req, res) => {

     const { id } = req.body;

  if (!id) {
    req.status(400);
    throw new Error("Bad request no id found");
  }

  // activating account
  await UserSchema.updateOne({ _id: tObjectId(id) }, { $set: { accountStatus: "inactive" } });
  res.status(200).json({ message: "account deactivated" });
});

module.exports = {
  allAdminAccountsController,
  accounActivationController,
  accountDeactivationController,
};
