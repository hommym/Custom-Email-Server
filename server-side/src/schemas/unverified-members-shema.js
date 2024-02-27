// importing required modules
const mongoose=require("mongoose")


const unverfiedMembersSchema= new mongoose.Schema({
    userName:String,
    verificationCode:Number
})




module.exports=mongoose.model("Unverified-Members",unverfiedMembersSchema)