const wait = require("../helperMethods/timer");

const emailAddressesToGroups = async (listOfAddresses, eventObj) => {
  let addressCount = 1;
  let totalCount = 0;
  let addressListToEmmit = [];

  for (const address of listOfAddresses) {
    totalCount++;
    addressListToEmmit.push(`bcc_${address}`);

    if (totalCount === listOfAddresses.length) {
      console.log("Last group sent..");
      eventObj("group-ready", addressListToEmmit);
    } else if (addressCount === 500) {
      addressCount = 0;
      console.log("One email group ready..");
      eventObj("group-ready", addressListToEmmit);

      //   waiting time before sending
      console.log("Waiting for next group send..");
      await wait(1 * 60000);
      addressListToEmmit = [];
    }

    addressCount++;
  }
};

module.exports = emailAddressesToGroups;
