const asyncHandler = require("express-async-handler");
const MxRecordOfDomain = require("../../schemas/mxRecordsOfDomains.js");

const saveMxRecords = asyncHandler(async (req, res) => {
    console.log("Server recieved mxRecords, saving records...");
  const { domainName, mailServerName, mailServerIpAdress, backUpMxRecord } = req.body;
  // save mxrecords in database
  const data =await MxRecordOfDomain.create({ domainName, mailServerName, mailServerIpAdress, backUpMxRecord });
  console.log("MxRecords saved successfully");
  res.status(200).json({ message: "Successfull" });
});

const allMxRecords = asyncHandler(async (req, res) => {
  // sending mxrecords
  const mxRecToSend=await MxRecordOfDomain.find({})
    console.log("Sending mxRecords",mxRecToSend);
  res.status(200).send(mxRecToSend);
});

module.exports = {
  saveMxRecords,
  allMxRecords,
};
