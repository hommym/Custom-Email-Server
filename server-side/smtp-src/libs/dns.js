const dns = require("dns/promises");
const MxRecordsOfDomain = require("../../http-src/schemas/mxRecordsOfDomains");

const getMxRecordsOfDomain = async (emailAdress) => {
  // getting domain from email address
  const domain = emailAdress.split("@")[1];
  const listMxRecords = [];
  try {
    const mxRecords = await dns.resolveMx(domain);

    if (mxRecords.length === 0) {
      throw new Error("No mail servers found on this domain");
    }

    // saving all mxRecords of domain
    for (const record of mxRecords) {
      console.log("Storing a Mx record", record);
      const documentToSave = { domainName: domain, mailServerName: record.exchange, preference: record.priority, mailServerIpAdress: await dns.resolve4(record.exchange) };

      
      // saving documents and adding to the list to be returned
      listMxRecords.push(documentToSave);
    }

    console.log("All mx records for the domain stored");
  } catch (error) {
    console.log(err);
  }

  return listMxRecords;
};

module.exports = {
  getMxRecordsOfDomain,
};
