// importing required module
const bcrypt= require("bcrypt")
const user=require("../../schemas/user-account-schema.js")
const unverifiedMembers=require("../../schemas/unverified-accounts-shema.js")
const employee=require("../../schemas/employee-schema.js")
const nodeMailer=require("nodemailer")
const jwt= require("jsonwebtoken")



const userSignUpController=async (req,res,next)=>{

const{fullName,userName,password,email}= req.body

// checking all the needed data for creating account is present

if(!fullName || !userName || !password || !email){

  throw new Error("400")
}

// hashing password
const hashedPassword= await bcrypt.hash(password,10)
console.log(hashedPassword);

// checking if account already existed
const userNamesInDatabase=await user.find({userName:userName})
const emailsInDatabase=await user.find({email:email})

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
const savedDocument = await user.create({fullName:fullName,userName:userName,password:hashedPassword,email:email})
console.log(savedDocument)

res.status(201).json({message:"Account created successfully, verify email to login"})




}


const employeeSignUpController= async (req,res,next)=>{

const employeeData= req.body
if(!(employeeData.fullName || employeeData.email || employeeData.password || orgId)){
  throw new Error("400")
}

await employee.create({employeeData})
next()


}



const emailConfirmationController= async (req,res)=>{

  const {emailAdress,verfCode}=req.query

  if(!emailAdress || !verfCode ){
    throw new Error("400") 
  }

const updatedDocument= await user.updateOne({email:emailAdress},{$set:{isVerified:true}})
const deletedDocument= await  unverifiedMembers.deleteOne({email:emailAdress,verificationCode:Number(verfCode)})

// there will be a redirection to a page to show email has successfully being updated(not implemented yet for now we send a json respone) 

res.status(200).json({message:"Email has being successfully confirmed"})

}

const logInController= async (req,res)=>{




     


}




module.exports={
userSignUpController,
logInController,
emailConfirmationController,
employeeSignUpController
}