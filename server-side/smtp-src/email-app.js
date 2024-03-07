// imorting  needed modules
const SMTPServer = require("smtp-server").SMTPServer;
const nodeMailer = require("nodemailer");
const { parseMail } = require("./libs/mailParser.js");
require("dotenv").config();

const port = process.env.PORT ? process.env.PORT : 25;

//  setting up nodemailer
const transporter = nodeMailer.createTransport({
  host: process.env.SmtpServerAdress,
  port: port,
  tls: {
    rejectUnauthorized: false,
  },
  
});

const server = new SMTPServer({
  logger: true,
  authOptional: true,
  onConnect(session, callback) {
    console.log(`New user with ip ${session.remoteAddress} has being connected`);
    return callback();
  },

  onAuth: async (auth, session, callback) => {
    console.log("Authentication Started..");
    const { password, username } = auth;

    try {
      // checking if the connected client has an account on the server
      if (!password || !username) {
        return callback(new Error("No password or username provided"));
      }

      // make a network request to http server to authenticate the user on the smtp server(not implemented)
      console.log("Checking server for account..");
      const axios = require("axios");
      const response = await axios({
        method: "get",
        url: `http://localhost:8000/api/auth/smtp-auth`,
        data: {
          email: username,
          password: password,
        },
      });

      if (response.status === 200) {
        console.log("Account present on server");
        console.log("User authorized..");
        transporter.auth = { user: username, pass: password };
        return callback(null, { user: username });
      }
    } catch (error) {
      console.log(error);
      callback(null, false);
    }
  },
  onData(stream, session, callback) {
    let message = Buffer.alloc(0);

    stream.on("data", (data) => {
      message = Buffer.concat([message, data]);

      // message=data
    });

    stream.on("end", async () => {
      console.log("Message has been fully recieved");

      // const messageObject = await parseMail(message);
      // console.log(messageObject.to);

      // sending email to the reciepeint
       transporter.sendMail(message.toString(), (error, info) => {
         if (error) {
           console.error("Error sending email: ", error);
         } else {
           console.log("Email sent: ", info.response);
         }
       });


      callback();
    });
  },
});

server.listen(port, process.env.SmtpServerAdress, () => {
  console.log(`SMTP listening on port ${port}`);
});
