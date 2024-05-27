// imorting  needed modules
require("dotenv").config();
const SMTPServer = require("smtp-server").SMTPServer;
const axios = require("axios");
const { parseMail } = require("./libs/mailParser.js");
const emailQueue = new (require("../helperTools/emailQueue.js"))();
const usernameQueue = new (require("../helperTools/emailQueue.js"))();
const emailRouter = require("../helperTools/emailRouting.js");
const sendingLimitChecker = require("../helperTools/sendingLimitChecker.js");
const { eventEmmitter, peekAtQueueDataListner, defaultEmailSenderListners } = require("./libs/events.js");

peekAtQueueDataListner("peekAtEmailQueue", async () => {
  console.log("Queue listner executed");
  if (emailQueue.peek() !== null) {
    // routing emails to be sent with either thirdParty sender or native sender
    await emailRouter(emailQueue, eventEmmitter);
  } else {
    console.log("All Email Sent");
  }
});

// defining all listeners used by default email sender
// defaultEmailSenderListners();

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
      // if (!password || !username) {
      //   throw new Error("No password or username provided");
      // }

      // make a network request to http server to authenticate the user on the smtp server(not implemented)
      console.log("Checking server for account..");
      const response = await axios({
        method: "get",
        url: `http://123stmtp.com/api/auth/smtp-auth`,
        data: {
          username: username,
          password: password,
        },
      });

      if (response.status === 200) {
        console.log("Account present on server");
        console.log("User authorized..");
        usernameQueue.enqueue(username);
        return callback(null, { user: username });
      }
    } catch (error) {
      console.log(error);
      callback(error);
    }
  },
  onData(stream, session, callback) {
    let message = Buffer.alloc(0);

    stream.on("data", (data) => {
      message = Buffer.concat([message, data]);
    });

    stream.on("end", async () => {
      try {
        console.log("Message has been fully recieved");
        console.log("Message parsing...");
        const messageObject = await parseMail(message);
        console.log("Message parsed");

        console.log("Converting the to property in the parsed message into array..");
        messageObject.to = messageObject.to.text.split(",");
        console.log("Convertion Complete");

        // checking account sending limit
        console.log("Checking account sending limit...");
        messageObject.numberOfEmailsAllowedForSending = await sendingLimitChecker(messageObject.to, usernameQueue.peek());
        console.log(`The number of address allowed for sending is ${messageObject.numberOfEmailsAllowedForSending}`);

        // setting the from field using the username
        if (!messageObject.from){
           console.log("Setting from field in message object...");
           messageObject.from = usernameQueue.dequeue();
           console.log("From field set");
        }

        // console.log(messageObject.html);
        if (emailQueue.peek() !== null) {
          emailQueue.enqueue(messageObject);
          console.log(`${emailQueue.dataStorage.length} emails in queue`);
        } else {
          emailQueue.enqueue(messageObject);
          console.log(`${emailQueue.dataStorage.length} emails in queue`);
          eventEmmitter("peekAtEmailQueue", callback);
        }

        callback();
      } catch (error) {
        console.log(error);
        callback(error);
      }
    });
  },
});

const startMailServer = () => {
  server.listen(587, "104.168.132.221", () => {
    console.log(`SMTP  listening on port 587..`);
  });
};

startMailServer();
