// importing required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {connectToAccountInfoDatabase} = require("./libs/mongoose.js");
const authRouter = require("./routes/auth/authRoutes.js");
const userRouter = require("./routes/user/userRoutes.js");
const emailSendRouter = require("./routes/email/emailRoute.js");
const employeeRouter=require("./routes/employee/employeeRoutes.js")
const dnsRouter=require("./routes/dns/dnsRoutes.js")
const errorHandler = require("./middleware/errorHandler.js");

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);

// setting up routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/employee",employeeRouter)
app.use("/api/email", emailSendRouter);
app.use("/api/dns", dnsRouter);

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
