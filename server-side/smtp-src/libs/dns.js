const dns = require("dns/promises");
require("dotenv").config();

const getMxRecordsOfDomain = async (domainName) => {
 

  try {
    const mxRecords = await dns.resolveMx(domainName);

    if (mxRecords.length === 0) {
      throw new Error("No mail servers found on this domainName");
    }

    const mxRecordWithIp = { mailServerName: mxRecords[0].exchange, mailServerIpAdress: await dns.resolve4(mxRecords[0].exchange) };
    console.log(`Mx record of private mail server ready..`);

    return mxRecordWithIp
  } catch (error) {
    console.log("Domain name does not exist");
    return null;
  }
};

module.exports = getMxRecordsOfDomain;
