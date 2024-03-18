// importing neccesary modules
const OutBox = require("../../schemas/outboxSchema");
const nodeMailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const sendController = async (req, res, next) => {
  //  setting up nodemailer
  const transporter = nodeMailer.createTransport({
    host: "192.168.72.30",
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: req.body.email,
      pass: req.body.password,
    },
  });

  console.log("Setting email tracker...");
  //   setting up tracking feature in the email message
  const newText = `email-tracker/${req.emailId}`;
  const pattern = /email-tracker/g;
  const originalHtml = req.body.mailObject.html;
  req.body.mailObject.html = originalHtml.replace(pattern, newText);
  console.log("Finished setting email tracker");
  console.log(req.body.mailObject.html);

  //   sending email to my server
  transporter.sendMail(req.body.mailObject, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      next(new Error("500"));
    } else {
      console.log("Email sent: ", info.response);
      res.status(200).json({ message: "Email successfully sent" });
    }
  });
};

const emailTrackerController = async (req, res, next) => {
  const { emailId } = req.params;
  // updating number people opening the email
  const oldDocument = await OutBox.findById(emailId);
  await OutBox.updateOne({ _id: new mongoose.Types.ObjectId(emailId) }, { $set: { viewCount: oldDocument.viewCount + 1 } });
  res.end("Email tracked");
};

const outBoxController = asyncHandler(async (req, res) => {
  if (req.user) {
    const allEmail = await OutBox.find({ organisation: req.user.orgId });
    return res.status(200).json({ outBox: allEmail });
  }

  const allEmail = await OutBox.find({ organisation: req.employee.orgId });
  res.status(200).json({ outBox: allEmail });
});

module.exports = {
  sendController,
  emailTrackerController,
  outBoxController,
};
