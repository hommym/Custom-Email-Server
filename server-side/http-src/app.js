// importing required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToCompaniesAccountsDatabase = require("./libs/mongoose.js");
const authRouter = require("../http-src/routes/auth/authRoutes.js");
const userRouter = require("../http-src/routes/user/userRoutes.js");
const emailSendRouter = require("./routes/email/emailRoute.js");
const errorHandler = require("../http-src/middleware/errorHandler.js");

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
app.use("/api/email", emailSendRouter);

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
