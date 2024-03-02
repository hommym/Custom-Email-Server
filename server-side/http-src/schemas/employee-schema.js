// importing required modules
const mongoose = require("mongoose");

const employees = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },

    userName:{
        type:String,  
    },
    password:{
        type:String,
        require:true,
        default:"ktx#trt5123"
    },

    role:{
      type:String,
      default:"employee"
    },

    status:{
        type:String,
        required:true,
        enum:["active","inactive"],
        default:"active"
    },
    orgId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organisation"
    } 


})



module.exports= mongoose.model("Employee",employees)