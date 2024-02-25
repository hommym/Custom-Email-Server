// importing required modules 
const express= require("express")
const expressAsynHandler=require("express-async-handler")
const {signUpController,logInController}=require("./auth-controller.js")


const authRouter=express.Router()


authRouter.post("/signup",expressAsynHandler((req,res)=>{
    signUpController(req,res)
}))


authRouter.post("/login",expressAsynHandler((req,res)=>{
        logInController(req,res)
}))






module.exports=authRouter