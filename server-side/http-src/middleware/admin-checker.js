const mongoDb= require("mongodb")
const companyMembers=require("../schemas/user-account-schema")



const adminChecker= async (req,res,next)=>{

const{id}=req.body


if(!adminId){
throw new Error("401")
}

// checking if member with the id in the body is an Admin
const userAccount= await companyMembers.findById(id)

if(userAccount && (userAccount.role==="user" || userAccount==="admin")){
    next() 
}
else{
    throw new Error("401")
}



}

module.exports=adminChecker