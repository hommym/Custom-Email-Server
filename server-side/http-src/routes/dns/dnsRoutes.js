const express = require("express");
const { saveMxRecords,allMxRecords} = require("./dnsController.js");


const dnsRouter = express.Router();



dnsRouter.post("/save-mxrecords",saveMxRecords)
dnsRouter.get("/get-mxRecords",allMxRecords)

module.exports = dnsRouter;
