const nodeMailer = require("nodemailer");
require("dotenv").config();
const User = require("../schemas/userSchema.js");
const Employee = require("../schemas/employeeSchema.js");
const { jwtForSignUp } = require("../libs/jsonwebtoken.js");

const transporter = nodeMailer.createTransport({
  host: "123stmtp.com",
  port: 587,
  auth: {
    user: "hommy88009@123stmtp.com",
    pass: "Herberth1624",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendConfirmationMail = async (req) => {
  try {
    console.log("Preparing Email Confirmation message....");
    const emailAddress = req.body.email;
    const mailOptions = {
      from: "AccountConfirmation@123stmtp.com",
      to: emailAddress,
      subject: "123stmtp Account Confirmation email",
    };
    // Randomly generating verfCode
    const verificationCode = Math.floor(Math.random() * 90000) + 10000;

    if (req.body.user) {
      // Email for admin accounts
      console.log("The Email being Prepared is for an Admin....");
      await User.updateOne({ email: emailAddress }, { $set: { verfCode: verificationCode } });
      mailOptions.text = `${req.body.firstname} ,your account has being created successfully, to confirm email click on this link ${
        process.env.FrontEndBaseUrl
      }/verify-email?token=${await jwtForSignUp(req.body.user._id, verificationCode)}`;
    } else {
      // email for employee
      console.log("The Email being Prepared is for an Employee..");
      mailOptions.text = `${req.body.firstname} your account has being successfully created, to confirm email and set password click this link ${
        process.env.FrontEndBaseUrl
      }/set-password?token=${await jwtForSignUp(req.body.employee._id, verificationCode)}.`;

      await Employee.updateOne({ email: emailAddress }, { $set: { verfCode: verificationCode } });
    }

    console.log("Preparation Finished Sending Email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

const sendPasswordResetEmail = async (req) => {
  try {
    console.log("Preparing Password Reset emal message...");
    const emailAddress = req.body.email;
    const mailOptions = {
      from: "AccountReset@123stmtp.com",
      to: emailAddress,
      subject: "123stmtp Account Reset email",
    };
    // Randomly generating verfCode
    const verificationCode = Math.floor(Math.random() * 90000) + 10000;

    mailOptions.subject = "123smtp Account Password Reset";

    let updDoc = await User.findOneAndUpdate({ email: emailAddress }, { $set: { verfCode: verificationCode } });
    if (!updDoc) {
      updDoc = await Employee.findOneAndUpdate({ email: emailAddress }, { $set: { verfCode: verificationCode } });
    }

    mailOptions.text = `To reset the password please click this link ${process.env.FrontEndBaseUrl}/set-password?token=${await jwtForSignUp(updDoc._id, verificationCode)}`;
    console.log(updDoc);

    // sending email
    await transporter.sendMail(mailOptions);
    console.log("Email sent sucessfully");
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

const sendMailToSuperAdmin = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

const sendMailToPostfix = async (emailQueue, addresses, eventEmitter) => {
  const mailObjectFromQueue = emailQueue.peek();
  const postfixTransporter = nodeMailer.createTransport({
    host: "localhost",
    port: 25,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailObject = mailObjectFromQueue.html
    ? {
        from: mailObjectFromQueue.from,
        bcc: addresses,
        subject: mailObjectFromQueue.subject,
        html: mailObjectFromQueue.html,
      }
    : {
        from: mailObjectFromQueue.from,
        bcc: addresses,
        subject: mailObjectFromQueue.subject,
        text: mailObjectFromQueue.text,
      };
  // console.log(`this is the mailobject ${mailObject.html}`);
  try {
    await postfixTransporter.sendMail(mailObject);
    emailQueue.dequeue();
    console.log("Emails sent to Postfix");
    eventEmitter("peekAtEmailQueue");
  } catch (error) {
    console.log(`SendMailToPostfix Error: ${error}`);
  }
};

module.exports = {
  sendConfirmationMail,
  sendMailToSuperAdmin,
  sendMailToPostfix,
  sendPasswordResetEmail,
};
