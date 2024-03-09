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
  port:{
    type:Array,
    default:[25,465,587]
  },

  preference:Number

});


module.exports = mongoose.model("MxRecordsOfDomain", mxRecordOfDomain);