// importing necessary modules
const organisation = require("../../schemas/organisationSchema");
const user = require("../../schemas/userSchema");
const { csvToArray } = require("../../libs/csvParser.js");
const asyncHandler = require("express-async-handler");

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
  await user.updateOne({ _id: req.id }, { $set: { orgId: savedOrganisation._id } });
  console.log("Organisation Created Successfully");
  res.status(200).json({ message: "Organisation Created Successfully", orgId: savedOrganisation._id });
});

const emailUploadController = asyncHandler(async (req, res, next) => {
  if (req.file) {
    console.log("File received", req.file);
    if (req.file.mimetype === "text/csv") {
      return await csvToArray(req.file.buffer, res);
    } else {
      const jsonObject = JSON.parse(req.file.buffer.toString());
      // Convert JSON object into an array of values
      const results = Object.values(jsonObject);
      console.log("Json data converted into array");
      return res.status(200).json({ emailAdresses: results, adressCount: results.length });
    }
  }

  res.status(400).json({ error: "No file uploaded" });
});

const loggedInController = asyncHandler(async (req, res) => {
  if (req.user) {
    console.log("account info sent");
    return res.status(200).json({ accountInfo: await user.findOne({ _id: req.id }).select("-provider -verfCode -password -__v -isVerified") });
  }

  console.log("account info sent");
  res.status(200).json({ accountInfo: await employee.findOne({ _id: req.id }).select("-provider -verfCode -password -__v -isVerified") });
});

module.exports = {
  orgCreationController,
  emailUploadController,
  loggedInController,
};
