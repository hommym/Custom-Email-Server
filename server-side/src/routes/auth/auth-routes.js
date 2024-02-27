// importing required modules 
const express= require("express")
const expressAsynHandler=require("express-async-handler")
const {signUpController,logInController}=require("./auth-controller.js")
const adminChecker=require("../../middleware/admin-checker.js")


const authRouter=express.Router()


authRouter.post("/create-account",expressAsynHandler(adminChecker),expressAsynHandler(signUpController))


authRouter.post("/login",expressAsynHandler(logInController))






module.exports=authRouter