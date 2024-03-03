const jwt= require("jsonwebtoken")
require("dotenv").config()


const verifyJwt= (req,res,next)=>{

const authInHeader= req.headers.authorization
let token=null

if(!authInHeader.includes("Bearer")){

    return next(new Error("401"))
}
token= (authInHeader.split(" "))[1]
// console.log(token);

jwt.verify(token,process.env.JwtSecretKey,(err,data)=>{


if(err){
    return next(err)
}

req.id=data.userId
console.log("Token verified")
next()

})

}

module.exports=verifyJwt