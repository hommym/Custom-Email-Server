// importing required modules 
const express= require("express")
const expressAsynHandler=require("express-async-handler")
const {userSignUpController,logInController,emailConfirmationController,employeeSignUpController,loggedInController,resetPasswordController}=require("./auth-controller.js")
const adminChecker=require("../../middleware/admin-checker.js")
const userChecker=require("../../middleware/userChecker.js")
const emailSender=require("../../middleware/confirmation-email-sender.js")
const verifyJWT=require("../../middleware/verify-jwt.js")
const expressAsyncHandler = require("express-async-handler")
const authRouter=express.Router()


authRouter.post("/user/sign-up",expressAsynHandler(userSignUpController),expressAsynHandler(emailSender))
authRouter.get("/user/send-confirmation-email",expressAsynHandler(emailSender))

authRouter.post("/employee/sign-up",expressAsynHandler(adminChecker),expressAsynHandler(employeeSignUpController),expressAsynHandler(emailSender))

authRouter.get("/login",expressAsynHandler(userChecker),expressAsynHandler(logInController))
authRouter.get("/logged-in",expressAsynHandler(verifyJWT),expressAsynHandler(userChecker),expressAsynHandler(loggedInController))

authRouter.post("/reset-password",expressAsyncHandler(userChecker),expressAsynHandler(resetPasswordController),expressAsynHandler(emailSender))

authRouter.get("/email-confirmation",expressAsynHandler(emailConfirmationController))




module.exports=authRouter