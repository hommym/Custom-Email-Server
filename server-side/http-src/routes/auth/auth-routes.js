// importing required modules 
const express= require("express")
const expressAsynHandler=require("express-async-handler")
const {signUpController,logInController,emailConfirmationController}=require("./auth-controller.js")
const adminChecker=require("../../middleware/admin-checker.js")


const authRouter=express.Router()


authRouter.post("/create-account",expressAsynHandler(adminChecker),expressAsynHandler(signUpController))


authRouter.get("/login",expressAsynHandler(logInController))

authRouter.get("/email-confirmation",expressAsynHandler(emailConfirmationController))




module.exports=authRouter