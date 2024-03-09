const net = require("net");

const sendMail = (mailObject) => {
  const configOptions = {
    host:mailObject.mxRecord.mailServerIpAdress[0],
    port: 25, //mailObject.mxRecord.port[1],
  };

  const client = net.createConnection(configOptions, () => {
    
    // Send EHLO/HELO command to initiate the SMTP session
    client.write(`EHLO ${mailObject.mxRecord.domainName}\r\n`);

    // Send MAIL FROM command to specify the sender's email address
    client.write(`MAIL FROM:${mailObject.from}\r\n`);

    // Send RCPT TO command to specify the recipient's email address
    client.write(`RCPT TO:${mailObject.to}\r\n`);

    // Start the email data transfer
    client.write("DATA\r\n");

    // Send the email content
    client.write(`Subject: ${mailObject.subject}\r\n`);
    client.write(`From: ${mailObject.from}\r\n`);
    client.write(`To: ${mailObject.to}\r\n`);
    client.write("\r\n"); // Blank line indicates end of email headers
    client.write(`${mailObject.emailMessage}\r\n`); // Email body
    client.write(".\r\n"); // Indicates end of email data
    console.log("net is working");
    // End the SMTP session
    client.write("QUIT\r\n");
  });

  // Handle data received from the mail server
  client.on("data", (data) => {
    console.log("Received:", data.toString());
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
