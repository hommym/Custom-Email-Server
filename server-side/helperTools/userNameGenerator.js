const UserSchema = require("../http-src/schemas/userSchema.js");

const randomNumberGenerator = () => {
  return Math.floor(Math.random() * 90000) + 10000;
};
const userNameGenerator = async (firstName) => {
  console.log("Starting username generation...");
  let userName = null;
  //  checking if userName exist

  while (!userName) {
    // creating userName
    const name = `${firstName}${randomNumberGenerator()}@123stmtp.com`;
    console.log("A username created");
    console.log("Checking if username already exists...");
    const accountsWithThisUserName = await UserSchema.findOne({ userName: name });

    if (!accountsWithThisUserName) {
      // setting userName when accountsWithThisUserName meaning no account has this userName
      console.log("Username avialable for use");
      userName = name;
      break;
    }

    console.log("Username already exists");
    console.log("Creating a new username...");
  }

  return userName
};

module.exports=userNameGenerator
