const Events = require("events");
const eventObject = new Events();
const { signDKIM } = require("./dkimConfig.js");

const eventEmmitter = (eventToEmmit, data = null) => {
  if (data) {
    eventObject.emit(eventToEmmit, data);
    return;
  }
  eventObject.emit(eventToEmmit);
};

const echloListner = (eventToListen, callback) => {
  eventObject.on(eventToListen, callback);
};

const mailToListner = (eventToListen, callback) => {
  eventObject.on(eventToListen, callback);
};

const rcptToListner = (eventToListen, callback) => {
  eventObject.on(eventToListen, callback);
};

const dataRListner = (eventToListen, callback) => {
  eventObject.on(eventToListen, callback);
};

const retryConnectionListner = (eventToListen, callBack) => {
  eventObject.on(eventToListen, callBack);
};

const peekAtQueueDataListner = (eventToListen, callBack) => {
  eventObject.on(eventToListen, callBack);
};

const defaultEmailSenderListners = () => {
  // defining all my listners
  echloListner("ehloF", (data) => {
    console.log("Mail to");
    data.client.write(`MAIL FROM:<${data.mailObject.from}> \r\n`);
  });
  mailToListner("mailF", (data) => {
    console.log("rcpt to");
    data.client.write(`RCPT TO:<${data.mailObject.to}> \r\n`);
  });
  rcptToListner("rcptF", (client) => {
    client.write("DATA \r\n");
  });
  dataRListner("dataF", (data) => {
    // const signedMail = signDKIM(data.privateKey, "continuumpayout.com", "default", ["From", "To", "Subject", "body"], data.mailObject);

    data.client.write(`Subject: ${data.mailObject.subject}\r\n`);
    data.client.write(`From: ${data.mailObject.from}\r\n`);
    data.client.write(`To: ${data.mailObject.to}\r\n`);
    data.client.write("\r\n"); // Blank line indicates end of email headers
    data.client.write(`${mailObject.emailMessage}\r\n`); // Email body
    data.client.write(".\r\n"); // Indicates end of email data
    // data.client.write(`${signedMail}\r\n.\r\n`); // Indicates end of email data

    // client.write(`Subject: ${mailObject.subject}\r\n`);
    // client.write(`From: ${mailObject.from}\r\n`);
    // client.write(`To: ${mailObject.to}\r\n`);
    // client.write("\r\n"); // Blank line indicates end of email headers
    // client.write(`${mailObject.emailMessage}\r\n`); // Email body
    // client.write(".\r\n"); // Indicates end of email data
  });
};

module.exports = {
  eventEmmitter,
  defaultEmailSenderListners,
  echloListner,
  mailToListner,
  rcptToListner,
  dataRListner,
  retryConnectionListner,
  peekAtQueueDataListner,
};
