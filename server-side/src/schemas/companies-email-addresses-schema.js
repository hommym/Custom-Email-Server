// importing required modules
const mongoose=require("mongoose")


const companiesEmailAdressesSchema= new mongoose.Schema({

    companyId:{
        type:ObjectId,
        required:true
    },
    emailAdresses:{
        type:Array,
        default:[]
    }
})


module.exports=mongoose.model("Companies-Email-Addresses",companiesEmailAdressesSchema)