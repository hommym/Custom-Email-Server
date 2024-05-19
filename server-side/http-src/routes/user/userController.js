// importing necessary modules
const organisation = require("../../schemas/organisationSchema");
const User = require("../../schemas/userSchema");
const Employee = require("../../schemas/employeeSchema");
const { csvToArray } = require("../../libs/csvParser.js");
const asyncHandler = require("express-async-handler");
const addressFilter = require("../../../helperTools/emailadressFilter.js");
const CustmerAdress = require("../../schemas/customerSchema");
const { extractSubscriptionDetails } = require("../stripe/stripe.controller.js");
require("dotenv").config();

const orgCreationController = asyncHandler(async (req, res, next) => {
  const { orgName, employeeRange, businessType } = req.body;
  let maxEmployeeCount = 0;

  if (!orgName) {
    throw new Error("No data passed for organisation name ");
  }

  if (!employeeRange) {
    throw new Error("No data passed for employeeRange");
  }

  if (employeeRange.includes("5")) {
    maxEmployeeCount = 5;
  } else if (employeeRange.includes("10")) {
    maxEmployeeCount = 10;
  } else if (employeeRange.includes("20")) {
    maxEmployeeCount = 10;
  }

  // checking if there is an organisation with the same name in the database
  const orgWithSameName = await organisation.find({ orgName: orgName });

  if (orgWithSameName.length >= 1) {
    return res.status(402).json({ message: "Organisatoin with this name already exist " });
  }

  if (req.file) {
    console.log(req.file);
    // saving data on aws and return the url to the image(not yet implemented)
  }

  // saving orgnisation data
  const savedOrganisation = !employeeRange.includes("21") ? await organisation.create({ orgName, maxEmployeeCount, businessType }) : await organisation.create({ orgName, businessType });
  await User.updateOne({ _id: req.id }, { $set: { orgId: savedOrganisation._id } });
  console.log("Organisation Created Successfully");
  res.status(200).json({ message: "Organisation Created Successfully", orgId: savedOrganisation._id });
});

const contactsUploadController = asyncHandler(async (req, res, next) => {
  if (req.file) {
    console.log("File received", req.file);
    if (req.file.mimetype === "text/csv") {
      return res.status(200).json(await csvToArray(req.file.buffer,req));
    } else {
      const jsonObject = JSON.parse(req.file.buffer.toString());
      // Convert JSON object into an array of values
      let results = Object.values(jsonObject);
      console.log("Json data converted into array");
      results = await addressFilter(results, req);
      return res.status(200).json({ emailAdresses: results, adressCount: results.length });
    }
  }

  res.status(400).json({ error: "No file uploaded" });
});

const loggedInController = asyncHandler(async (req, res) => {
  let accountInfo = {};
  if (req.user) {
    accountInfo = await User.findOne({ _id: req.id }).select("-provider -verfCode -password -__v -isVerified");
    // Get customer details
    const subscription = await extractSubscriptionDetails(accountInfo?.customerId);
    accountInfo = { ...accountInfo?._doc, subscription };
  } else {
    accountInfo = await Employee.findOne({ _id: req.id }).select("-provider -verfCode -password -__v -isVerified");
    // accountInfo = { ...accountInfo?._doc, subscription };
  }
  res.status(200).json({ accountInfo });
});

const saveContactController = asyncHandler(async (req, res) => {
  const { emailAddresses } = req.body;

  if (emailAddresses.length === 0) {
    return res.status(200).json({ message: "no contacts uploaded", uploadedContacts: [] });
  }
  let listOfDocToSave = [];
  const orgId = (await User.findOne({ _id: req.id })).orgId;

  for (const address of emailAddresses) {
    listOfDocToSave.push({ emailAddress: address, orgId });
  }

  console.log("Contacts uploading...");
  const uploadedContacts = await CustmerAdress.insertMany(listOfDocToSave);
  console.log("Upload complete");
  res.status(200).json({ message: "Contacts successfully uploaded", uploadedContacts });
});

module.exports = {
  orgCreationController,
  contactsUploadController,
  loggedInController,
  saveContactController,
};
