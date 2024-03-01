// importing required modules
const mongoose = require("mongoose");


const organisation = new mongoose.Schema({

    logo:String,
    orgName:{
        type:String,
        required:true
    },
    orgOwner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    customer:{
        type:Object
    }


})


module.exports=mongoose.model("Organisation",organisation)