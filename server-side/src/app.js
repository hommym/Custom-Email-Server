// importing required modules 
const express= require("express")
require("dotenv").config()
const conectToCompaniesAccountsDatabase=require("./libs/mongoose.js")



const app= express()


// setting up routes middlewares(not ipmlemented)




const port= (process.env.PORT)?process.env.PORT:3000



const startApplication=()=>{
    // connecting database
conectToCompaniesAccountsDatabase(process.env.MongoDbConnectionUrl)

app.listen(3000,()=>{
    console.log(`Sever is listening on ${port} `);
})
}


startApplication()

