const nodeMailer = require("nodemailer");
require("dotenv").config();
const transporter = nodeMailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SmtpUserName,
    pass: process.env.SmtpSecret,
  },
});

const sendConfirmationMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

const sendMailToSuperAdmin = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
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

  const mailObject = {
    from: mailObjectFromQueue.from.text,
    bcc: addresses,
    subject: mailObjectFromQueue.subject,
    html: mailObjectFromQueue.html,
  };

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
};
