// importing required modules
const mongoose=require("mongoose")


const unverfiedMembersSchema= new mongoose.Schema({
    email:String,
    verificationCode:Number
})




module.exports=mongoose.model("Unverified-Account",unverfiedMembersSchema)