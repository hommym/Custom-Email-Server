// importing required modules
const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("Database connection successfully established");
});

mongoose.connection.on("error", (e) => {
  console.log(`An error occurred while connecting ${e.message}`);
});

const connectToAccountInfoDatabase = async (connectionUrl) => {
  await mongoose.connect(connectionUrl);
};

module.exports = connectToAccountInfoDatabase;
