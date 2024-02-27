// importing required modules
const mongoose=require("mongoose")


const companyMembersSchema= new mongoose.Schema({
fullName:{
    type:String,
    required:true
},
email:{
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

status:{
    type:String,
    enum:["Admin","Employee"],
    default:"Employee"
},

isVerified:{
    type:Boolean,
    default:false
},

})


module.exports=mongoose.model("Company-Members",companyMembersSchema)