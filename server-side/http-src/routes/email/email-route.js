// importing required modules 
const express= require("express")
const expressAsyncHandler=require("express-async-handler")
const verifyJWT=require("../../middleware/verify-jwt.js")
const userChecker=require("../../middleware/userChecker.js")
const saveEmail= require("../../middleware/save-email.js")
const{sendController}=require("./email-controller.js")
const emailSendRouter= express.Router()





emailSendRouter.post("/send",expressAsyncHandler(verifyJWT),expressAsyncHandler(userChecker),expressAsyncHandler(saveEmail),expressAsyncHandler(sendController))









module.exports=emailSendRouter