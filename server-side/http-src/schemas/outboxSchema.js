// importing required modules
const mongoose=require("mongoose")

// schema for holding all emails sent 
const outBoxSchema= new mongoose.Schema({


composedEmail:Object,

senderId:{
    type:mongoose.Schema.Types.ObjectId,
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
},

state:{
    type:String,
    enum:["draft","in-progress","sent"],
    default:"draft"
}



})



module.exports=mongoose.model("Outbox",outBoxSchema)