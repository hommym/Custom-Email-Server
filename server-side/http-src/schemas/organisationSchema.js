// importing required modules
const mongoose = require("mongoose");

const organisation = new mongoose.Schema({
  logo: String,
  orgName: {
    type: String,
    required: true,
  },

  customer: {
    type: Object,
  },

  employeeCont: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Organisation", organisation);
