const mongoDb= require("mongodb")
const user=require("../schemas/user-account-schema")



const adminChecker= async (req,res,next)=>{




// checking if member with the id in the body is an Admin
const userAccount= await user.findById(req.id)

if(userAccount && (userAccount.role==="user" || userAccount==="admin")){
    req.user=userAccount
    next() 
}
else{
    throw new Error("401")
}



}

module.exports=adminChecker