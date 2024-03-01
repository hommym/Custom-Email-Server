// importing required modules
const mongoose=require("mongoose")




const adminAccountSchema= new mongoose.Schema({
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
    accountStatus:{
        type:String,
        default:"admin"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    
    numberOfUsers:{
        type:Number,
        default:0
    },

    numberOfActiveUsers:{
        type:Number,
        default:0
    }


    })
    
    
    module.exports=mongoose.model("admin-account",adminAccountSchema)