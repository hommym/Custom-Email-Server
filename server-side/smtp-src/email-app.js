// imorting  needed modules
const SMTPServer = require("smtp-server").SMTPServer;
const axios = require("axios");
const { parseMail } = require("./libs/mailParser.js");
const { getMxRecordsOfDomain } = require("../smtp-src/libs/dns.js");
const MxrecordsOfDomains = require("../../server-side/http-src/schemas/mxRecordsOfDomains");
const { sendMail } = require("./libs/net.js");
require("dotenv").config();
let mxRecordsWithHighImportance = [];
const emailAddressesToGroups = require("../helperMethods/emailAddressToGroups.js");
const { groupReadyListner, eventEmmitter } = require("./libs/events.js");
const port = process.env.PORT ? process.env.PORT : 25;

const server = new SMTPServer({
  logger: true,
  authOptional: true,
  socketTimeout: 60 * 60000,
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

      const messageObject = await parseMail(message);
      console.log(messageObject.to);

      // implement strategy for sending here

      groupReadyListner("group-ready", (data) => {
        // send mail
        console.log("Emails Sent For one group", data[0]);
      });

      await emailAddressesToGroups(messageObject.to.text.split(","), eventEmmitter);

      // const mailObjectForSend = {
      //   subject: messageObject.subject,
      //   to: messageObject.to.text,
      //   from: messageObject.from.text,
      //   emailMessage: messageObject.text ? messageObject.text : messageObject.html.text,
      //   // mxRecord: listOfMxRecords[0],
      // };
      // sendMail(mailObjectForSend);

      console.log("Message Delivered");

      callback();
    });
  },
});

server.listen(port, process.env.SmtpServerAdress, () => {
  console.log(`SMTP listening on port ${port}`);
});
