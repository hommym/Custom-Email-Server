const asyncHandler=require("express-async-handler")
const {sendMailToSuperAdmin}=require("../../libs/nodeMailer.js")
const User=require("../../schemas/userSchema.js")


const contactUsController=asyncHandler(async (req,res,next)=>{

const {name,emailAddress,message}= req.body
if (!name || !emailAddress || !message) {
  throw new Error("Some required fields in the body are empty");
}

// getting super admins email adress


const mailOptions = {
  from: emailAddress,
  to: (await User.findOne({ role: "superAdmin" })).email,
  subject: `Contact Form Submission: ${name}`,
  text: message,
};

sendMailToSuperAdmin(mailOptions);

res.status(200).json({message:"Message successfully sent"})

})



module.exports={
    contactUsController
}