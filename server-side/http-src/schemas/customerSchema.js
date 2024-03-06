// importing required modules
const mongoose = require("mongoose");

const orgEmailAdresses = new mongoose.Schema({
  orgId: ObjectId,
  emailAdress: String,
  category: String,
});

module.exports = mongoose.model("Org-Email-Adress", orgEmailAdresses);
