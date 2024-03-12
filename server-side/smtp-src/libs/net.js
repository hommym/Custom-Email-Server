const net = require("net");
const {eventEmmitter,echloListner,mailToListner,rcptToListner,dataRListner}=require("./events")
let commandTracker=1
const sendMail = (mailObject) => {
  const configOptions = {
    host: mailObject.mxRecord.mailServerIpAdress[0],
    port: 25, //mailObject.mxRecord.port[1],
  };

  const client = net.createConnection(configOptions, ()=>{
// defining all my listners
echloListner(client,mailObject,"ehloF")
mailToListner(client, mailObject,"mailF");
rcptToListner(client,"rcptF");
dataRListner(client, mailObject,"dataF");


    client.write(`EHLO ${mailObject.mxRecord.domainName}\r\n`);


  });

  // Handle data received from the mail server
  client.on("data", (data) => {
    const response = data.toString();
    console.log("Received:",response);

    if (response.includes("220")&& commandTracker===1) {
      commandTracker++
      eventEmmitter("ehloF");
    } else if (response.includes("250") && commandTracker === 2) {
      commandTracker++;
      eventEmmitter("mailF");
    } else if (response.includes("250") && commandTracker === 3) {
      commandTracker++;
      eventEmmitter("rcptF");
    } else if (response.includes("354") && commandTracker === 4) {
      commandTracker++;
      eventEmmitter("dataF");
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
  });
};
module.exports = {
  sendMail,
};
