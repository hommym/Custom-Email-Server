const nodeMailer=require("nodemailer")
const unverifiedMembers=require("../schemas/unverified-accounts-shema.js")



function verificationNumberGenerator() {
    // Generate a random number between 10000 and 99999 (inclusive)
    return Math.floor(Math.random() * 90000) + 10000;
  }

const emailSender= async (req,res)=>{

const emailAdress=req.body.email
let message=null
let emailTitle=null

if(req.body.user || req.body.employee ){
  // adding newly created users to unverified members
  const verificationCode=verificationNumberGenerator()
  await unverifiedMembers.create({email:emailAdress,verificationCode:verificationCode})
  emailTitle="OurBusinessName Email Confirmation"

  if(req.body.user){

    message=`${req.body.name} ,your account has being created successfully, to confirm email click on this link http://localhost:8000/auth/email-confirmation?emailAdress=${emailAdress}&verfCode=${verificationCode}`
  }
  else{
    message=`${req.body.name} your account has being successfully, to confirm email click this link http://localhost:8000/auth/email-confirmation?emailAdress=${emailAdress}&verfCode=${verificationCode} . /n this is the default password for loging into your account password:ktx#trt5123 . Remember to change your password from the default password after log in `

  }
  

}
else{
emailTitle="OurBusinessName Password Reset"
message=`This the new password for logging into your account ${req.body.newPassword}, remember to change password after logging in `
    
}

  


// the service , host and port below will be change during production, the ones below is for testing
const transporter = nodeMailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "herbertharthur80@gmail.com",
      pass: "xcgf scrz anbg ofxu",
    },
  })
  
  
  const mailOptions = {
    from:"herbertharthur80@gmail.com",
    to:emailAdress,
    subject:emailTitle,
    text:message,
  }
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
  
  
  // the purpose of sending the username and verfCode is to help send the email again if the user could not recieve the email
  res.status(201).json({message:"Email sent successfully"})


}


module.exports=emailSender