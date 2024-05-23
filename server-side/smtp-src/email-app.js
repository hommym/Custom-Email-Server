// imorting  needed modules
require("dotenv").config();
const SMTPServer = require("smtp-server").SMTPServer;
const axios = require("axios");
const { parseMail } = require("./libs/mailParser.js");
const emailQueue = new (require("../helperTools/emailQueue.js"))();
const emailRouter = require("../helperTools/emailRouting.js");
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
      if (!password || !username) {
        return callback(new Error("No password or username provided"));
      }

      // make a network request to http server to authenticate the user on the smtp server(not implemented)
      console.log("Checking server for account..");
      const response = await axios({
        method: "get",
        url: `http://123stmtp.com/api/auth/smtp-auth`,
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
    });

    stream.on("end", async () => {
      console.log("Message has been fully recieved");

      const messageObject = await parseMail(message);

      if (emailQueue.peek() !== null) {
        emailQueue.enqueue(messageObject);
        console.log(`${emailQueue.dataStorage.length} emails in queue`);
      } else {
        emailQueue.enqueue(messageObject);
        console.log(`${emailQueue.dataStorage.length} emails in queue`);
        eventEmmitter("peekAtEmailQueue", callback);
      }

      callback();
    });
  },
});

const startMailServer = () => {
  server.listen(587, "104.168.132.221", () => {
    console.log(`SMTP  listening on port 587`);
  });
};

startMailServer();
