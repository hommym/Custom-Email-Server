// importing required modules
const user=require("../schemas/user-account-schema")
const employee=require("../schemas/employee-schema")

const userChecker=  async (req,res,next)=>{

    const userWanted= (req.body.email)?await user.findOne({email:req.body.email}):await user.findById(req.id)
    console.log(req.id);
    console.log(userWanted)
    

    if(userWanted){

        if(!userWanted.isVerified){

            return res.status(401).json({message:"Email has not been verified"})
            
            }

        req.user=userWanted
        return next()
    }

    const employeeWanted= (req.body.email)?await employee.findOne({email:req.body.email}):await employee.findById(req.id)

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