// importing required modules 
const express= require("express")
const expressAsyncHandler=require("express-async-handler")
const {userSignUpController,logInController,emailConfirmationController,employeeSignUpController,loggedInController,resetPasswordController,changePasswordController}=require("./auth-controller.js")
const adminChecker=require("../../middleware/admin-checker.js")
const userChecker=require("../../middleware/userChecker.js")
const emailSender=require("../../middleware/confirmation-email-sender.js")
const verifyJWT=require("../../middleware/verify-jwt.js")
const authRouter=express.Router()


authRouter.post("/user/sign-up",expressAsyncHandler(userSignUpController),expressAsyncHandler(emailSender))
authRouter.get("/user/send-confirmation-email",expressAsyncHandler(emailSender))

authRouter.post("/employee/sign-up",expressAsyncHandler(verifyJWT),expressAsyncHandler(adminChecker),expressAsyncHandler(employeeSignUpController),expressAsyncHandler(emailSender))

authRouter.get("/login",expressAsyncHandler(userChecker),expressAsyncHandler(logInController))
authRouter.get("/logged-in",expressAsyncHandler(verifyJWT),expressAsyncHandler(userChecker),expressAsyncHandler(loggedInController))

authRouter.put("/reset-password",expressAsyncHandler(userChecker),expressAsyncHandler(resetPasswordController),expressAsyncHandler(emailSender))

authRouter.put("/change-password",expressAsyncHandler(verifyJWT),expressAsyncHandler(userChecker),expressAsyncHandler(changePasswordController))

authRouter.get("/email-confirmation",expressAsyncHandler(emailConfirmationController))




module.exports=authRouter