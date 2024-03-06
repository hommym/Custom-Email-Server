// importing required modules
const mongoose = require("mongoose");

const employees = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },

  role: {
    type: String,
    default: "employee",
  },

  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  },

  verfCode: {
    type: Number,
  },

  isVerified: {
    type: Boolean,
    default: true,
  },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
  },
});

module.exports = mongoose.model("Employee", employees);
