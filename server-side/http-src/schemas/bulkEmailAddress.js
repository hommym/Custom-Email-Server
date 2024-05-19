// importing required modules
const mongoose = require("mongoose");

const bulkEmailAdressForSale = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  emailAddresses: {
    type: Array,
    default: [],
  },

  numOfAddress: Number,
  country: {
    type: String,
    required: true,
  },

  description:{
    type:String,
    default:"No description"
  },
  price:{
    type:Number,
    required:true
  },

  isAvailable:{
    type:Boolean,
    deafault:true
  }

});


module.exports = mongoose.model("BulkEmailForSale", bulkEmailAdressForSale);