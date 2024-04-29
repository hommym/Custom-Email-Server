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

const echloListner = (client, mailObject, eventToListen) => {
  eventObject.on(eventToListen, () => {
    console.log("Mail to");
    client.write(`MAIL FROM:<${mailObject.from}> \r\n`);
  });
};

const mailToListner = (client, mailObject, eventToListen) => {
  eventObject.on(eventToListen, () => {
    console.log("rcpt to");
    client.write(`RCPT TO:<${mailObject.to}> \r\n`);
  });
};

const rcptToListner = (client, eventToListen) => {
  eventObject.on(eventToListen, () => {
    client.write("DATA \r\n");
  });
};

const dataRListner = (client, mailObject, eventToListen, privateKey) => {
  eventObject.on(eventToListen, () => {
    const signedMail = signDKIM(privateKey, "continuumpayout.com", "default", ["From", "To", "Subject", "body"], mailObject);

    client.write(`Subject: ${mailObject.subject}\r\n`);
    client.write(`From: ${mailObject.from}\r\n`);
    client.write(`To: ${mailObject.to}\r\n`);
    client.write("\r\n"); // Blank line indicates end of email headers
    client.write(`${signedMail}\r\n.\r\n`); // Indicates end of email data

    // client.write(`Subject: ${mailObject.subject}\r\n`);
    // client.write(`From: ${mailObject.from}\r\n`);
    // client.write(`To: ${mailObject.to}\r\n`);
    // client.write("\r\n"); // Blank line indicates end of email headers
    // client.write(`${mailObject.emailMessage}\r\n`); // Email body
    // client.write(".\r\n"); // Indicates end of email data
  });
};

const retryConnectionListner = (eventToListen, callBack) => {
  eventObject.on(eventToListen, callBack);
};

const groupReadyListner = (eventToListen, callBack) => {
  eventObject.on(eventToListen, callBack);
};

const peekAtQueueDataListner = (eventToListen, callBack) => {
  eventObject.on(eventToListen, callBack);
};

module.exports = {
  eventEmmitter,
  echloListner,
  mailToListner,
  rcptToListner,
  dataRListner,
  retryConnectionListner,
  groupReadyListner,
  peekAtQueueDataListner
};
