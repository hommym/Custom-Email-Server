// importing required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToAccountInfoDatabase } = require("./libs/mongoose.js");
const authRouter = require("../http-src/routes/auth/authRoutes.js");
const userRouter = require("../http-src/routes/user/userRoutes.js");
const emailSendRouter = require("./routes/email/emailRoute.js");
const employeeRouter = require("../http-src/routes/employee/employeeRoutes.js");
const dnsRouter = require("../http-src/routes/dns/dnsRoutes.js");
const contactUsRouter = require("../http-src/routes/contactUs/contactUsRoute.js");
const errorHandler = require("../http-src/middleware/errorHandler.js");
const subscriptionsRouter = require("./routes/stripe/stripe.router.js");

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
app.use("/api/employee", employeeRouter);
app.use("/api/email", emailSendRouter);
app.use("/api/dns", dnsRouter);
app.use("/api/contact-us", contactUsRouter);
app.use("/api/stripe", subscriptionsRouter);
// error handling middleware
app.use(errorHandler);
const port = process.env.PORT ? process.env.PORT : 8000;

const startApplication = async () => {
	// connecting database
	console.log("Connecting to the database...");
	await connectToAccountInfoDatabase(process.env.MongoDbConnectionUrl);

	app.listen(port, () => {
		console.log(`Server with ip ${process.env.SmtpServerAdress} is listening on ${port} `);
	});
};

startApplication();
