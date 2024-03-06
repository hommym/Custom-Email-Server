// importing neccesary modules
const outBox = require("../schemas/outboxSchema.js");

const saveEmailInDatabase = async (req, res, next) => {
  // setting query.emailMes into req.body.mailObject.html
  req.body.mailObject.html = req.query.emailMes;

  // if the sender is the orgOwner
  if (req.user) {
    // saving email to database
    console.log("Saving email..");
    const savedEmail = await outBox.create({ composedEmail: req.body.mailObject, senderId: req.id, organisation: req.user.orgId, state: "in-progress" });
    console.log("Email saved");
    // the purpose of this to help in setting up tracking system for opened emails
    req.emailId = savedEmail._id;

    return next();
  }

  // if the sender is the orgOwner
  console.log("Saving email..");
  const savedEmail = await outBox.create({ composedEmail: req.body.mailObject, senderId: req.id, organisation: req.employee.orgId, state: "in-progress" });
  console.log("Email saved");

  // the purpose of this to help in setting up tracking system for opened emails
  req.emailId = savedEmail._id;

  next();
};

module.exports = saveEmailInDatabase;
