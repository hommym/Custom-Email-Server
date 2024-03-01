// importing required modules
const mongoose=require("mongoose")


const companiesEmailAdressesSchema= new mongoose.Schema({

    accountId:ObjectId,
    emailAdresses:{
        type:Array,
        default:[]
    },
    category:{
        type:String,
        default:"None"
    }
})


module.exports=mongoose.model("Company-Clients-Email-Addresses",companiesEmailAdressesSchema)