// importing required module
const bcrypt= require("bcrypt")
const user=require("../../schemas/user-account-schema.js")
const unverifiedMembers=require("../../schemas/unverified-accounts-shema.js")
const employee=require("../../schemas/employee-schema.js")
const nodeMailer=require("nodemailer")
const jwt= require("jsonwebtoken")
require("dotenv").config()


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

const logInController= async (req,res,next)=>{
 // hashing password
 
 

  if(req.user){
    const isPasswordsTheSame= await bcrypt.compare(req.body.password,req.user.password)
    //  comparing hashed password in body to the one in the database(req.user.password)
    if(isPasswordsTheSame){
     // creating jwt using user's id
     
    jwt.sign({userId:req.user._id},process.env.JwtSecretKey,{expiresIn:"1h"},function(err, token) {
        if(err){
          return next(err)
        }

      console.log(token);
       //  sending token back to client
     return res.status(200).json({jwt:token,message:"Log in successful"})

    })

   
   
    }
    else{
         return next(new Error("401"))
    }

   

  }
  else{
    const isPasswordsTheSame= await bcrypt.compare(req.body.password,res.employee.password)

    if(isPasswordsTheSame){
      // creating jwt using user's id
       jwt.sign({userId:req.employee._id},process.env.JwtSecretKey,{expiresIn:"1h"},function(err, token) {
        if(err){
          return next(err)
        }

        console.log(token);
         //  sending token back to client
        res.status(200).json({jwt:token,message:"Log in successful"})
      })
    
      

     }
     else{
      return  next(new Error("401"))
     }
    

  }


     


}




module.exports={
userSignUpController,
logInController,
emailConfirmationController,
employeeSignUpController
}