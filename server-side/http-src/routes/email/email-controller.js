const nodeMailer=require("nodemailer")


const sendController=(req,res,next)=>{

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





module.exports={
    sendController
}