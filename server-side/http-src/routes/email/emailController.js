// importing neccesary modules
require("dotenv").config();
const OutBox = require("../../schemas/outboxSchema");
const nodeMailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const UserSchema = require("../../schemas/userSchema.js");

const sendController = asyncHandler(async (req, res, next) => {
  //  setting up nodemailer
  const transporter = nodeMailer.createTransport({
    host: "123stmtp.com",
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: req.body.username,
      pass: req.body.password,
    },
  });

  // console.log("Setting email tracker...");
  // //   setting up tracking feature in the email message
  // const newText = `email-tracker/${req.emailId}`;
  // const pattern = /email-tracker/g;
  // const originalHtml = req.body.mailObject.html;
  // req.body.mailObject.html = originalHtml.replace(pattern, newText);
  // console.log("Finished setting email tracker");
  // console.log(req.body.mailObject.html);

  //   sending email to my server
if (req.body.senderId){
 req.body.mailObject.from = `${req.body.senderId} <${req.body.username}>`;
} 
await transporter.sendMail(req.body.mailObject);
  res.status(200).json({ message: "Email successfully sent" });
});

const sendControllerMailer2 = asyncHandler(async (req, res, next) => {
  //  setting up nodemailer
  const transporter = nodeMailer.createTransport({
    host: "mail2.123stmtp.com",
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "mailX123@123stmtp.com",
      pass: "mailer12345",
    },
  });

  // console.log("Setting email tracker...");
  // //   setting up tracking feature in the email message
  // const newText = `email-tracker/${req.emailId}`;
  // const pattern = /email-tracker/g;
  // const originalHtml = req.body.mailObject.html;
  // req.body.mailObject.html = originalHtml.replace(pattern, newText);
  // console.log("Finished setting email tracker");
  // console.log(req.body.mailObject.html);

  //   sending email to my server
  const message = {};
  message.subject=req.body.subject
  message.html=req.body.message
  message.to=req.body.to
  
  if(req.body.replyTo){
    message.replyTo = req.body.replyTo;
  }

  if(req.body.bcc){
     message.to = `${message.to},${req.body.bcc}`;
  }
   if (req.body.cc) {
     message.to = `${message.to},${req.body.cc}`;
   }

   if (req.file) {
    console.log("Attachment recieved")
     message.attachment = req.file.buffer;
   }

  if (req.body.senderName) {
    message.from = `${req.body.senderName} <dmxeafault@123stmtp.com>`;
  }
  else{
    message.from = "dmxeafault@123stmtp.com";
  }
 

  await transporter.sendMail(message);
  res.status(200).json({ message: "Email successfully sent" });
});


const emailTrackerController = asyncHandler(async (req, res, next) => {
  const { emailId } = req.params;
  // updating number people opening the email
  const oldDocument = await OutBox.findById(emailId);
  await OutBox.updateOne({ _id: new mongoose.Types.ObjectId(emailId) }, { $set: { viewCount: oldDocument.viewCount + 1 } });
  res.end("Email tracked");
});

const outBoxController = asyncHandler(async (req, res) => {
  if (req.user) {
    const allEmail = await OutBox.find({ organisation: req.user.orgId });
    return res.status(200).json({ outBox: allEmail });
  }

  const allEmail = await OutBox.find({ organisation: req.employee.orgId });
  res.status(200).json({ outBox: allEmail });
});

const emailSentController = asyncHandler(async (req, res) => {
  const { username, numOfEmailToSend } = req.body;
  console.log("Checking email sending limit for account..");
  console.log(`number of emails to send: ${numOfEmailToSend}`);

  // getting the number of emails that has already been sent
  const numberOfEmailsLeftForSending = await UserSchema.findOne({ userName: username }).select("emailLeftForSend");
  console.log(`${numberOfEmailsLeftForSending.emailLeftForSend} left for sending`);
  console.log("Checking ammount that can be sent....");
  if (numberOfEmailsLeftForSending.emailLeftForSend !== 0) {
    const recentNumberOfEmailsLeftForSending = numberOfEmailsLeftForSending.emailLeftForSend - numOfEmailToSend;
    console.log(`${recentNumberOfEmailsLeftForSending} emails can be sent (when negative it represent the amount that cannot be sent)`);
    if (recentNumberOfEmailsLeftForSending >= 0) {
      await UserSchema.updateOne({ userName: username }, { $set: { emailLeftForSend: recentNumberOfEmailsLeftForSending } });
      return res.status(200).json({ numberOfEmailToRemove: 0 });
    } else {
      //  the value send back to the client here will always be negative
      await UserSchema.updateOne({ userName: username }, { $set: { emailLeftForSend: 0 } });
      return res.status(200).json({ numberOfEmailToRemove: recentNumberOfEmailsLeftForSending });
    }
  } else {
    res.status(401);
    console.log("Limit exceeded");
    throw new Error("Email Limit for the month exceeded");
  }
});

module.exports = {
  sendControllerMailer2,
  sendController,
  emailTrackerController,
  outBoxController,
  emailSentController,
};
