// importing required modules
const express = require("express");
require("dotenv").config();
const {connectToAccountInfoDatabase} = require("./libs/mongoose.js");
const authRouter = require("../http-src/routes/auth/authRoutes.js");
const userRouter = require("../http-src/routes/user/userRoutes.js");
const emailSendRouter = require("./routes/email/emailRoute.js");
const employeeRouter=require("../http-src/routes/employee/employeeRoutes.js")
const errorHandler = require("../http-src/middleware/errorHandler.js");

const app = express();

app.use(express.json());

// setting up routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/employee",employeeRouter)
app.use("/api/email", emailSendRouter);

// error handling middleware
app.use(errorHandler);
const port = process.env.PORT ? process.env.PORT : 8000;

const startApplication = async () => {
  // connecting database
  console.log("Connecting to the database...");
  await connectToAccountInfoDatabase(process.env.MongoDbConnectionUrl);

  app.listen(port, () => {
    console.log(`Server is listening on ${port} `);
  });
};

startApplication();
