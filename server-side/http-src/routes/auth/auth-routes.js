// importing required modules 
const express= require("express")
const expressAsynHandler=require("express-async-handler")
const {userSignUpController,logInController,emailConfirmationController,employeeSignUpController}=require("./auth-controller.js")
const adminChecker=require("../../middleware/admin-checker.js")


const authRouter=express.Router()


authRouter.post("/user/sign-up",expressAsynHandler(adminChecker),expressAsynHandler(userSignUpController))

authRouter.post("/employee/sign-up",expressAsynHandler(adminChecker),expressAsynHandler(employeeSignUpController))

authRouter.get("/login",expressAsynHandler(logInController))

authRouter.get("/email-confirmation",expressAsynHandler(emailConfirmationController))




module.exports=authRouter