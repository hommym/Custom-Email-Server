// importing required module
const bcrypt= require("bcrypt")
const companies=require("../../schemas/user-account-schema.js")
const unverifiedMembers=require("../../schemas/unverified-accounts-shema.js")
const nodeMailer=require("nodemailer")


function verificationNumberGenerator() {
  // Generate a random number between 10000 and 99999 (inclusive)
  return Math.floor(Math.random() * 90000) + 10000;
}

const signUpController=async (req,res)=>{

const{fullName,userName,password,email}= req.body

// checking all the needed data for creating account is present

if(!fullName || !userName || !password || !email){

  throw new Error("400")
}

// hashing password
const hashedPassword= await bcrypt.hash(password,10)
console.log(hashedPassword);

// checking if account already existed
const userNamesInDatabase=await companies.find({userName:userName})
const emailsInDatabase=await companies.find({email:email})

// console.log(userNamesInDatabase,workEmailsInDatabase)
if(userNamesInDatabase.length!==0 && emailsInDatabase.length!==0){
  return  res.status(409).json({message:"Account already exist"})

}
else if(userNamesInDatabase.length!==0){
  return  res.status(409).json({message:"Account with this username already exist"}) 
}
else if(emailsInDatabase.length!==0){
return  res.status(409).json({message:"Account with this email already exist"}) 
}



// saving data in database
const savedDocument = await companies.create({fullName:fullName,userName:userName,password:hashedPassword,email:email})

console.log(savedDocument)

// adding newly created users to unverified members
const verificationCode=verificationNumberGenerator()
const unverifiedMember= await unverifiedMembers.create({userName:userName,verificationCode:verificationCode})

// send email for verifying the account that was created
const linkForVerfication=`http://localhost:3000/auth/email-confirmation?userName=${userName},verfCode=${verificationCode}`

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
  from: "herbertharthur80@gmail.com",
  to: email,
  subject: "Company Name:Email Confirmation",
  text: `To confirm email click on this link ${linkForVerfication}`,
}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email: ", error);
  } else {
    console.log("Email sent: ", info.response);
  }
});


// the purpose of sending the username and verfCode is to help send the email again if the user could not recieve the email
res.status(201).json({userName:userName,verfCode:verificationCode,message:"Account created successfully, verify email to login"})


}


const logInController= async (req,res)=>{

    // implement session based authentication(not implemented) 


}

const emailConfirmationController= async (req,res)=>{

  const {userName,verfCode}=req.query

  if(!userName || !verfCode ){
    throw new Error("400") 
  }

const updatedDocument= await companies.updateOne({userName:userName},{$set:{isVerified:true}})
const deletedDocument= await  unverifiedMembers.deleteOne({userName:userName,verificationCode:Number(verfCode)})

// there will be a redirection to a page to show email has successfully being updated(not implemented yet for now we send a json respone) 

res.status(200).json({message:"Email has being successfully confirmed"})

}


module.exports={
signUpController,
logInController,
emailConfirmationController
}