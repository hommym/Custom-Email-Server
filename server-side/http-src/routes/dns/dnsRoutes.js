const express = require("express");
const {saveMxRecords}= require("./dnsController.js")


const dnsRouter = express.Router();



dnsRouter.post("/save-mxrecords",saveMxRecords)
dnsRouter.get("/get-mxRecords",)

module.exports = dnsRouter;
