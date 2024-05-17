const asyncHandler = require("express-async-handler");
const UserSchema = require("../../schemas/userSchema");
const EmployeeSchema = require("../../schemas/employeeSchema");
const { tObjectId } = require("../../libs/mongoose");

const allAdminAccountsController = asyncHandler(async (req, res) => {
  // getting all users id's and firstName from database
  const allAccounts = await UserSchema.find({ role: "admin" }).select("_id firstname accountStatus");

  res.status(200).json({ accounts: allAccounts });
});

const accounActivationController = asyncHandler(async (req, res) => {
  const{adminId}=req.query
   console.log("Activating an account....");
  // activating account
  const updatedDoc = await UserSchema.findOneAndUpdate({ _id: tObjectId(adminId) }, { $set: { accountStatus: "inactive" } }).select("orgId");

  if (updatedDoc.orgId) {
    // activating all employee account under this account
   await EmployeeSchema.updateMany({ orgId: updatedDoc.orgId }, { $set: { status: "active" } });
  }
   console.log("Account activated");
  res.status(200).json({ message: "account activated" });
});

const accountDeactivationController = asyncHandler(async (req, res) => {
  const { adminId } = req.query;
  console.log("Deactivating an account....");
  // activating account
  const updatedDoc = await UserSchema.findOneAndUpdate({ _id: tObjectId(adminId) }, { $set: { accountStatus: "inactive" } }).select("orgId");

  
  if (updatedDoc.orgId) {
    // activating all employee account under this account
    await EmployeeSchema.updateMany({ orgId: updatedDoc.orgId }, { $set: { status: "inactive" } });
  }

  console.log("Account deactivated");
  res.status(200).json({ message: "account deactivated" });
});

const emailListUploadController = asyncHandler(async (req, res) => {});

const allEmailListController = asyncHandler(async (req, res) => {});

module.exports = {
  allAdminAccountsController,
  accounActivationController,
  accountDeactivationController,
  emailListUploadController,
  allEmailListController,
};
