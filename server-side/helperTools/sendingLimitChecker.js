const axios = require("axios");

const sendingLimitChecker = async (addressList, username) => {
  // this method returns the number addresses in the addressList that the user is allowed to send
  const response = await axios({
    method: "post",
    url: `http://123stmtp.com/api/email/updateEmailSent`,
    data: {
      username: username,
      numOfEmailToSend: addressList.length,
    },
  });

  if (response.data.numberOfEmailToRemove === 0) {
    return addressList.length;
  }

  //   when numberOfEmailToRemove is less than zero
  return addressList.length + response.data.numberOfEmailToRemove;
};

module.exports = sendingLimitChecker;
