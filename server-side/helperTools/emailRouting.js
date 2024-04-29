const emailRouter = async (emailQueue, eventEmmitter) => {
  const addressesForThirdPartySender = [];
  const addressesForDefaultSender = [];
  const serverPortChecker = require("./serverPortCheker.js");
  const { sendMailToPostfix } = require("../http-src/libs/nodeMailer.js");
  const getMxrecord=require("../smtp-src/libs/dns.js")

 // sending the emails
 for (const address of (emailQueue.peek().to.text.split(","))) {
   if (address.includes("@gmail.com") || address.includes("@yahoo.com") || address.includes("@hotmail.com") || address.includes("@outlook.com")) {
     addressesForThirdPartySender.push(address);
   } else {
     //checking mx record of the domain

     const mxRecordsOfDomain = await getMxrecord(address.split("@")[1]);
     if (mxRecordsOfDomain) {
       //checking if the not so popular reciepient mail server is listening on port 25
       const isRecipientServerOnPort25 = await serverPortChecker(address.split("@")[1], 25);

       if (isRecipientServerOnPort25) {
         addressesForThirdPartySender.push(address);
       } else {
         addressesForDefaultSender.push(address);
       }
     } else {
       console.log("Invalid emaail address");
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
