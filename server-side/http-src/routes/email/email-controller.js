// importing neccesary modules
const outBox= require("../../schemas/outbox-schema")
const nodeMailer=require("nodemailer")
const mongoose=require("mongoose")

const sendController= async (req,res,next) =>{

    //  setting up nodemailer
    const transporter = nodeMailer.createTransport({
        host: "localhost",
        port: 45,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: req.body.email,
            pass: req.body.password,
          }
      })

     console.log("Setting email tracker...");
    //   setting up tracking feature in the email message
      const newText=`email-tracker/${req.emailId}`
      const pattern=/email-tracker/g
      const originalHtml=req.body.mailObject.html
      req.body.mailObject.html=originalHtml.replace(pattern,newText)
      console.log("Finished setting email tracker");
      console.log(req.body.mailObject.html);
      

    //   sending email to my server
    transporter.sendMail(req.body.mailObject, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
          next(new Error("500"))
        } else {
          console.log("Email sent: ", info.response);
          res.status(200).json({message:"Email successfully sent"})
        }
      })

}

const emailTrackerController= async (req,res,next)=>{

const {emailId}=req.params
// updating number people opening the email
const oldDocument= await outBox.findById(emailId)
await outBox.updateOne({_id:new mongoose.Types.ObjectId(emailId)},{$set:{viewCount:(oldDocument.viewCount+1)}})
res.end("Email tracked")


}



module.exports={
    sendController,
    emailTrackerController
}