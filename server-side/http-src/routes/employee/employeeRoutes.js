// importing required modules
const express = require("express")
const {employeeCountController}=require("../employee/employeeControllers.js")
const verifyJwt=require("../../middleware/verifyJwt.js")
const adminChecker=require("../../middleware/adminChecker.js")
const employeeRouter= express.Router()


employeeRouter.get("/show-employees",verifyJwt,adminChecker,employeeCountController)

module.exports=employeeRouter
