// importing required modules
const mongoose=require("mongoose")

// schema for holding all emails sent 
const outBoxSchema= new mongoose.Schema({


// the ref is to help us know where sender's id is coming from (wheather from User or Employee schema)
 ref:{
    type:String,
    required:true

 },  
senderId:{
    type:mongoose.Schema.Types.ObjectId,
    refPath:"ref"
},

organisation:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Organisation"
},

viewCount:{
    type:Number,
    default:0
},

sendProgress:{
    type:Number,
    deafault:0
}


})



module.exports=mongoose.model("Outbox",outBoxSchema)