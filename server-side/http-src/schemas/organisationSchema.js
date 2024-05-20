// importing required modules
const mongoose = require("mongoose");

const organisation = new mongoose.Schema({
  logo: String,
  orgName: {
    type: String,
    required: true,
  },

  maxEmployeeCount: {
    type: Number,
  },

  businessType: String,

  employeeCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Organisation", organisation);
