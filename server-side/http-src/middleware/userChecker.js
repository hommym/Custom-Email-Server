// importing required modules
const user=require("../schemas/user-account-schema")
const employee=require("../schemas/employee-schema")

const userChecker=  async (req,res,next)=>{

    const userWanted= await user.findOne({email:req.body.email})

    

    if(userWanted){

        if(!userWanted.isVerified){

            return res.status(401).json({message:"Email has not been verified"})
            
            }

        req.user=userWanted
        return next()
    }

    const employeeWanted= await employee.findOne({email:req.body.email})

    if(employeeWanted){
        
        if(!employeeWanted.isVerified){

            return res.status(401).json({message:"Email has not been verified"})

            }

        req.employee=employeeWanted
        console.log(req.employee);
        return next()
    }


    next(new Error("404")) 

}



module.exports=userChecker