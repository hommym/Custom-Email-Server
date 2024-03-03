// importing necessary modules
const multer=require("multer")
const organisation=require("../../schemas/organisation-schema")
const user=require("../../schemas/user-account-schema.js")



const orgCreationController= async (req,res,next)=>{
const {orgName}=req.body

if(!orgName){

   return next(new Error("400"))
}
 
// checking if there is an organisation with the same name in the database
const orgWithSameName= await organisation.find({orgName:orgName})

if(orgWithSameName.length>=1){

    return res.status(402).json({message:"Organisatoin with this name already exist "})
}


if(req.file){
    console.log(req.file);
    // saving data on aws and return the url to the image(not yet implemented)
}

// saving orgnisation data
const savedOrganisation= await organisation.create({orgName:orgName})
await user.updateOne({_id:req.id},{$set:{userOrgnisation:savedOrganisation._id}})

console.log("Organisation Created Successfully");
res.status(200).json({message:"Organisation Created Successfully"})

}









module.exports={
    orgCreationController
}