// importing required modules
const mongoose=require("mongoose")


const companiesAccountInfoSchema= new mongoose.Schema({
fullName:{
    type:String,
    required:true
},
workEmail:{
    type:String,
    required:true
},
userName:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},

isVerified:{
    type:Boolean,
    default:false
}

})


module.exports=mongoose.model("accounts",companiesAccountInfoSchema)