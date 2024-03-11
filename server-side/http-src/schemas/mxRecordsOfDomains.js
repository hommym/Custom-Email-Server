// importing required modules
const mongoose = require("mongoose");

const mxRecordOfDomain = new mongoose.Schema({
  domainName: {
    type: String,
    required: true,
  },

  mailServerName: {
    type: String,
    required: true,
  },

  mailServerIpAdress: {
    type: String,
    required: true,
  },
 
  backUpMxRecord:{
    type:Object
  },

});


module.exports = mongoose.model("MxRecordsOfDomain", mxRecordOfDomain);