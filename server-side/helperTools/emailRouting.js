const emailRouter = async (emailQueue, eventEmmitter) => {
  const addressesForThirdPartySender = [];
  const addressesForDefaultSender = [];
  const serverPortChecker = require("./serverPortCheker.js");
  const { sendMailToPostfix } = require("../http-src/libs/nodeMailer.js");
  const getMxrecord = require("../smtp-src/libs/dns.js");

  //  Grouping email addresses into the one to be sent by MTA(for public email addresses like gmail,yahoo etc) and default native sender(for private emails)
  console.log("Grouping addresses into those delivered by MTA and Default sender...");
  for (const address of emailQueue.peek().to.text.split(",")) {
    // checking if the adress belongs to public or private mail servers
    if (address.includes("@gmail.com") || address.includes("@yahoo.com") || address.includes("@hotmail.com") || address.includes("@outlook.com")) {
      addressesForThirdPartySender.push(address);
    } else {
      console.log("Private mail address found");

      //checking mx record of the domain
      console.log("Checking Mx record of private email address ...");
      const mxRecordsOfDomain = await getMxrecord(address.split("@")[1]);
      if (mxRecordsOfDomain) {
        //checking if the private mail server is listening on port 25
        console.log("Checking if private mail server is listening on 25....");
        const isRecipientServerOnPort25 = await serverPortChecker(mxRecordsOfDomain.mailServerName, 25);

        if (isRecipientServerOnPort25) {
          // using postfix to handle private mail server addresses if it is on port 25
          // addressesForThirdPartySender.push(address);
        } else {
          addressesForDefaultSender.push(address);
        }
         addressesForThirdPartySender.push(address);
      } else {
        console.log("Invalid email address");
        // add code for removing such email addresses from users contacts(Not implemented yet)
      }
    }
  }
  if (addressesForDefaultSender.length !== 0) {
    // deafualt sending system(Not implemented)
    console.log("Preparing to send emails using Native Sending system");
  }

  if (addressesForThirdPartySender.length !== 0) {
    // use node mailer to push emails to third party sender (ie Postfix)
    console.log("Preparing to send emails To Postfix");
    await sendMailToPostfix(emailQueue, addressesForThirdPartySender, eventEmmitter);
  }
};

module.exports = emailRouter;
