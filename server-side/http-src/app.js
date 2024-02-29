// importing required modules 
const express= require("express")
require("dotenv").config()
const conectToCompaniesAccountsDatabase=require("./libs/mongoose.js")
const authRouter= require("../src/routes/auth/auth-routes.js")
const errorHandler=require("../src/middleware/error-handler.js")

const app= express()

app.use(express.json())

// setting up routes 
app.use("/auth",authRouter)

// error handling middleware
app.use(errorHandler)
const port= (process.env.PORT)?process.env.PORT:8000



const startApplication=()=>{
    // connecting database
conectToCompaniesAccountsDatabase(process.env.MongoDbConnectionUrl)

app.listen(port,()=>{
    console.log(`Server is listening on ${port} `);
})
}


startApplication()

