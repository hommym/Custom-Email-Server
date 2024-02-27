const mongoDb= require("mongodb")
const companyMembers=require("../schemas/members-of-company-schema")



const adminChecker= async (req,res,next)=>{

const{adminId}=req.body


if(!adminId){
throw new Error("401")
}

// checking if member with the id in the body is an Admin
const membersAccount= await companyMembers.findById(adminId)

if(membersAccount && membersAccount.status==="Admin"){
    next() 
}
else{
    throw new Error("401")
}



}

module.exports=adminChecker