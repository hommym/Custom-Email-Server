// importing required modules
const express = require("express");
require("dotenv").config();
const connectToCompaniesAccountsDatabase = require("./libs/mongoose.js");
const authRouter = require("../http-src/routes/auth/auth-routes.js");
const userRouter=require("../http-src/routes/user/user-routes.js")
const emailSendRouter=require("./routes/email/email-route.js")
const errorHandler = require("../http-src/middleware/error-handler.js");

const app = express();

app.use(express.json());

// setting up routes
app.use("/auth", authRouter);
app.use("/user",userRouter);
app.use("/email",emailSendRouter)

// error handling middleware
app.use(errorHandler);
const port = process.env.PORT ? process.env.PORT : 8000;

const startApplication = async () => {
	// connecting database
	console.log("Connecting to the database...");
	await connectToCompaniesAccountsDatabase(process.env.MongoDbConnectionUrl);

	app.listen(port, () => {
		console.log(`Server is listening on ${port} `);
	});
};

startApplication();

