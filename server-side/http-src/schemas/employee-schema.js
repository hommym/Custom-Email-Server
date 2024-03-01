// importing required modules
const mongoose = require("mongoose");

const employees = new mongoose.Schema({

    name:{
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
        default:"Company_Name123"
    },

    role:{
      type:String,
      default:"employee"
    },

    status:{
        type:String,
        required:true,
        enum:["active","inactive"],
        default:"inactive"
    }


})



module.exports= mongoose.model("Employee",employees)