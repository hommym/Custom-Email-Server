const net = require("net");
const { eventEmmitter, echloListner, mailToListner, rcptToListner, dataRListner, retryConnectionListner } = require("./events");
const fileSys = require("fs/promises");
const path = require("path");
const smtpPorts = [25, 465, 587];
let port = 1;
let commandTracker = 1;
let retryConnection = false;
const createConnection = (mailObject, port) => {
  retryConnection = false;
  const configOptions = {
    host: "p.webshare.io",
    port: 9999,
  };

  const client = net.createConnection(configOptions, async () => {
    // defining all my listners
    echloListner(client, mailObject, "ehloF");
    mailToListner(client, mailObject, "mailF");
    rcptToListner(client, "rcptF");
    const privateKey = await fileSys.readFile(path.resolve("private.key"), { encoding: "utf8" });
    dataRListner(client, mailObject, "dataF", privateKey);
    retryConnectionListner("retryConnection", () => {
      client = createConnection(mailObject, smtpPorts[port]);
    });

    client.write(`HELO ${mailObject.mxRecord.domainName}\r\n`);
  });

  return client;
};
const sendMail = (mailObject) => {
  // const configOptions = {
  //   host: mailObject.mxRecord.mailServerIpAdress[0],
  //   port: 25, //mailObject.mxRecord.port[1],
  // };

  let client = createConnection(mailObject, smtpPorts[port]);

  // Handle data received from the mail server
  client.on("data", (data) => {
    const response = data.toString();
    console.log("Received:", response);

    if (response.includes("220") && commandTracker === 1) {
      commandTracker++;
      eventEmmitter("ehloF");
    } else if (response.includes("250") && commandTracker === 2) {
      commandTracker++;
      eventEmmitter("mailF");
    } else if (response.includes("250") && commandTracker === 3) {
      commandTracker++;
      eventEmmitter("rcptF");
    } else if (response.includes("354") || (response.includes("250") && commandTracker === 4)) {
      commandTracker++;
      eventEmmitter("dataF");
    } else if (response.includes("550 5.5.1 Protocol error")) {
      // Remove all event listeners from the client object
      port++;
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
