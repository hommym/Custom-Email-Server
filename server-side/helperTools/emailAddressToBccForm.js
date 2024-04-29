const wait = require("../helperMethods/timer");

const emailAddressesInBccForm =  (listOfAddresses) => {
 
 
  let addressListInBccForm = [];

  for (const address of listOfAddresses) {
    addressListInBccForm.push(`bcc_${address}`);
  }
  return addressListInBccForm
};

module.exports = emailAddressesInBccForm;
