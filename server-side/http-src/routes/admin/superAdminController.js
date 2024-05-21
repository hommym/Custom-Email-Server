const asyncHandler = require("express-async-handler");
const UserSchema = require("../../schemas/userSchema");
const EmployeeSchema = require("../../schemas/employeeSchema");
const BulkEmailListUploadSchema = require("../../schemas/bulkEmailAddress.js");
const { tObjectId } = require("../../libs/mongoose");

const { csvToArray } = require("../../libs/csvParser.js");

const allAdminAccountsController = asyncHandler(async (req, res) => {
  // getting all users id's and firstName from database
  const allAccounts = await UserSchema.find({ role: "admin" }).select("_id firstname accountStatus");

  res.status(200).json({ accounts: allAccounts });
});

const accounActivationController = asyncHandler(async (req, res) => {
  const { adminId } = req.query;
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

const bulkEmailUploadController = asyncHandler(async (req, res) => {
  const { title, country, price, description } = req.query;
  if (title && price && country) {
    // getting the bulk email from the file

    const { emailAddresses, addressCount } = req.emailAddressObject;

    // saving the data in the data base

    const documentToSave = { title: title, country: country, price: Number(price), emailAddresses: emailAddresses, numOfAddress: Number(addressCount) };

    if (description) {
      documentToSave.description = description;
    }

    // checking if this email list already exist in database
    console.log("Checking if uploaded file already exist in database");
    if ((await BulkEmailListUploadSchema.find({ title: title, emailAddresses: emailAddresses }).length) !== 0) {
      console.log("File already exist in database")
       return res.status(200).json({ message: "Emails uploaded not successfull, file already exist in the database" });
    }
    console.log("File does not exist in database")
    console.log("Saving file content...");
    await BulkEmailListUploadSchema.create(documentToSave);
    console.log("Content Saved");

    return res.status(200).json({ message: "Emails uploaded successfully" });
  }

  res.status(400);
  throw new Error("Incomplete query parameters");
});

const allBulkEmailController = asyncHandler(async (req, res) => {});

module.exports = {
  allAdminAccountsController,
  accounActivationController,
  accountDeactivationController,
  bulkEmailUploadController,
  allBulkEmailController,
};