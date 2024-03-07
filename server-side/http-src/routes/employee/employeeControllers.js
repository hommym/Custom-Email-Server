const asyncHandler=require("express-async-handler")
const Employee= require("../../schemas/employeeSchema")
const{tObjectId}=require("../../libs/mongoose.js")

const employeeCountController = asyncHandler( async (req, res, next) => {

const employees = await Employee.find({ orgId:tObjectId(req.query.orgId) });

if(employees.length===0){

   return  res.status(200).json({message:"You haven't not added any employees yet"})
}

res.status(200).json({employees,employeeCount:employees.length})






});




module.exports={
    employeeCountController
}