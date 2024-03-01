// importing required modules
const mongoose=require("mongoose")

// structure not yet implemented
const outBoxSchema= new mongoose.Schema({

companyId:ObjectId,
emailsSent:{
    type:Array,
    default:[]
}



})



module.exports=mongoose.model("outbox",outBoxSchema)