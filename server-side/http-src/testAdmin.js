// const bcrypt= require("bcrypt")

// const main=async (p)=>{

//     const hashedPassword= await bcrypt.hash(p,10)
//     console.log(hashedPassword);
// }

// main("Herberth1624")

// hashed password of test admin =$2b$10$wPF4BBiDvizVDI7pRgn2kehYkvhYHMQ8Tv4ZrXxhUgSCjbmIYN0C2
// id for test admin =65dd3f47c54da83b73f21bb5

// passwor for gmail when using nodemailer=xcgf scrz anbg ofxu

// testing smtp server

// const nodeMailer = require("nodemailer");
// // const { sendMail } = require("../smtp-src/libs/net.js");
// // const { getMxRecordsOfDomain } = require("../smtp-src/libs/dns.js");

// const transporter = nodeMailer.createTransport({
//   host: "email-smtp.eu-north-1.amazonaws.com",
//   port: 25,

//   auth: {
//     user: "AKIAW3MEBZ2ZXZPF5GE3",
//     pass: "BGyqP3SJ4pHBdzTeoT17e1rOIbV8DhRhzuTdG6DlyAGD",
//   },
// });
// // hommyM@continuumpayout.com
// const mailOptions = {
//   from: "EmaCompanyLimited@123stmtp.com",
//   to: "herbertharthur80@gmail.com",
//   subject: "Test Mail",
//   text: `You are welcome`,
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("Error sending email: ", error);
//   } else {
//     console.log("Email sent: ", info.response);
//   }
// });

const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
  logger: true,
  authOptional: true,
  socketTimeout: 60 * 60000,
  onConnect(session, callback) {
    console.log(`New user with ip ${session.remoteAddress} has being connected`);
    return callback();
  },

  onData(stream, session, callback) {
    let message = Buffer.alloc(0);

    stream.on("data", (data) => {
      message = Buffer.concat([message, data]);

      // message=data
    });

    stream.on("end", async () => {
      console.log("Message has been fully recieved");
    });

    callback();
  },
});

server.listen(25, "127.0.0.1", () => {
  console.log(`SMTP listening on port ${25}`);
});
