// importing required modules
const user=require("../schemas/user-account-schema")
const employee=require("../schemas/employee-schema")

const userChecker=  async (req,res,next)=>{

    const userWanted= await user.findOne({email:req.body.email})

    if(userWanted){
        req.user=userWanted
        return next()
    }

    const employeeWanted= await employee.findOne({email:req.body.email})

    if(employeeWanted){
        req.employee=employeeWanted
        return next()
    }


    throw new Error("404")

}



module.exports=userChecker