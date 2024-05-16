const net = require("net");
const { eventEmmitter, retryConnectionListner } = require("./events");
const fileSys = require("fs/promises");
const path = require("path");
const smtpPorts = [25, 465, 587];
let port = 1;

const createConnection = (mailObject,MxRecord,port) => {
  const configOptions = {
    host: MxRecord.mailServerName,
    port: port,
  };

  const client = net.createConnection(configOptions,  () => {
    
    retryConnectionListner("retryConnection", () => {
      client = createConnection(mailObject, smtpPorts[port]);
    });

    client.write(`HELO ${mailObject.mxRecord.domainName}\r\n`);
  });

  return client;
};
const sendMail = async (MxRecord,portNum,mailObject) => {
  

let commandTracker = 1;
let retryConnection = false;

  const privateKey = await fileSys.readFile(path.resolve("private.key"), { encoding: "utf8" });
  let client = createConnection(mailObject, MxRecord.mailServerName,portNum);

  // Handle data received from the mail server
  client.on("data", (data) => {
    const response = data.toString();
    console.log("Received:", response);

    if (response.includes("220") && commandTracker === 1) {
      commandTracker++;
      eventEmmitter("ehloF", { client, mailObject });
    } else if (response.includes("250") && commandTracker === 2) {
      commandTracker++;
      eventEmmitter("mailF", { client, mailObject });
    } else if (response.includes("250") && commandTracker === 3) {
      commandTracker++;
      eventEmmitter("rcptF", client);
    } else if (response.includes("354") || (response.includes("250") && commandTracker === 4)) {
      commandTracker++;
      eventEmmitter("dataF", { client, mailObject, privateKey });
    } else if (response.includes("550 5.5.1 Protocol error")) {
      commandTracker = 1;
      retryConnection = true;
      client.end();
    } else if (commandTracker === 5) {
      client.write("QUIT\r\n");
    } else {
      throw new Error(response);
    }
  });

  // Handle connection errors
  client.on("error", (error) => {
    console.error("Connection error:", error);
  });

  // Handle connection close
  client.on("close", () => {
    console.log("Connection closed");
    // if (retryConnection) {
    //   client = createConnection(mailObject, smtpPorts[port]);
    // }
  });
};
module.exports = {
  sendMail,
};
