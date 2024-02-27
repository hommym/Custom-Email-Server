// importing required module
const bcrypt= require("bcrypt")
const companies=require("../../schemas/members-of-company-schema.js")



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

// send email for verifying the account that was created(not implemented)



res.status(201).json({message:"Account created successfully"})


}


const logInController= async (req,res)=>{

    // implement session based authentication(not implemented) 


}




module.exports={
signUpController,
logInController
}