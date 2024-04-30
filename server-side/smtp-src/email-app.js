// imorting  needed modules
const SMTPServer = require("smtp-server").SMTPServer;
const axios = require("axios");
const { parseMail } = require("./libs/mailParser.js");
const { getMxRecordsOfDomain } = require("../smtp-src/libs/dns.js");
const emailQueue = new (require("../helperTools/emailQueue.js"))();
const emailRouter= require("../helperTools/emailRouting.js")
require("dotenv").config();
const {  eventEmmitter, peekAtQueueDataListner } = require("./libs/events.js");
const port = 25;



 peekAtQueueDataListner("peekAtEmailQueue", async () => {
   console.log("Queue listner executed");
   if (emailQueue.peek() !== null) {
     // routing emails to be sent with either thirdParty sender or native sender
     await emailRouter(emailQueue, eventEmmitter);
   }
   else{
    console.log("All Email Sent")
   }
 });


const server = new SMTPServer({
  // logger: true,
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
     
      if (emailQueue.peek() !== null) {
        emailQueue.enqueue(messageObject);
      } else {
        emailQueue.enqueue(messageObject);
        eventEmmitter("peekAtEmailQueue",callback);
      }
      console.log(`${emailQueue.dataStorage.length} emails in queues`);
     

      callback();
    });
  },
});

server.listen(port, "192.168.177.30", () => {
  console.log(`SMTP listening on port ${port}`);
});
