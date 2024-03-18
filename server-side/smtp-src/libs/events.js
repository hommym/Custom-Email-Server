const Events = require("events");
const eventObject = new Events();

const eventEmmitter = (eventToEmmit) => {
  eventObject.emit(eventToEmmit);
};

const echloListner = (client, mailObject, eventToListen) => {
  eventObject.on(eventToListen, () => {
    console.log("Mail to")
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

const dataRListner = (client,mailObject,eventToListen)=>{
eventObject.on(eventToListen, () => {
  client.write(`Subject: ${mailObject.subject}\r\n`);
  client.write(`From: ${mailObject.from}\r\n`);
  client.write(`To: ${mailObject.to}\r\n`);
  client.write("\r\n"); // Blank line indicates end of email headers
  client.write(`${mailObject.emailMessage}\r\n`); // Email body
  client.write(".\r\n"); // Indicates end of email data
});

    
}

module.exports = {
  eventEmmitter,
  echloListner,
  mailToListner,
  rcptToListner,
  dataRListner,
};
