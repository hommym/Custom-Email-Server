const express = require("express");

const contactUsRouter=express.Router()
const {contactUsController}=require("./contactUsController.js")


contactUsRouter.post("/",contactUsController)






module.exports=contactUsRouter