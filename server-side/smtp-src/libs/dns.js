const dns = require("dns/promises");
require("dotenv").config();

const getMxRecordsOfDomain = async (domainName) => {
  // getting domainName from email address

  try {
    const mxRecords = await dns.resolveMx(domainName);

    if (mxRecords.length === 0) {
      throw new Error("No mail servers found on this domainName");
    }

    const mxRecordWithIp = { mailServerName: mxRecords[0].exchange, mailServerIpAdress: await dns.resolve4(mxRecords[0].exchange) };
    console.log(`Mx record ready..`);

    return mxRecordWithIp
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = getMxRecordsOfDomain;
