// importing required modules
const mongoose=require("mongoose")




const connectToAccountInfoDatabase=(connectionUrl)=>{

mongoose.connect(connectionUrl)

}


module.exports=connectToAccountInfoDatabase