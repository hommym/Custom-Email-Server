const dns = require("dns/promises");
const MxRecordsOfDomain = require("../../http-src/schemas/mxRecordsOfDomains");
require("dotenv").config()

const getMxRecordsOfDomain = async (emailAdress, listOfMxRecordsAvialable) => {
  // getting domain from email address
  const domain = emailAdress.split("@")[1];

  try {
    const mxRecords = await dns.resolveMx(domain);

    if (mxRecords.length === 0) {
      throw new Error("No mail servers found on this domain");
    }
    let mxRecordWithLowestPref = mxRecords[0];
    if (mxRecords.length >= 2) {
      mxRecordWithLowestPref.backUpMxRecord = mxRecords[1];
    }

    // saving all mxRecords of domain
    for (const record of mxRecords) {
      console.log("Storing a Mx record", record);
      const documentToSave = { domainName: domain, mailServerName: record.exchange,priority:record.priority,mailServerIpAdress: await dns.resolve4(record.exchange) };

      if (mxRecordWithLowestPref.priority >= record.priority) {
        const backUpMxRecord =mxRecordWithLowestPref.backUpMxRecord;
        mxRecordWithLowestPref= documentToSave;
        mxRecordWithLowestPref.backUpMxRecord = backUpMxRecord;
        continue;
      } else if (mxRecords.length > 2) {

        if (!mxRecordWithLowestPref.backUpMxRecord){

          mxRecordWithLowestPref.backUpMxRecord = documentToSave;

        } else if (mxRecordWithLowestPref.backUpMxRecord.priority <= record.priority) {
          mxRecordWithLowestPref.backUpMxRecord = documentToSave;
        }
      }

      // saving documents and adding to the list to be returned
    }

     console.log("Saving mxRecord..");
     const axios = require("axios");
     const response = await axios({
       method: "post",
       url: `http://localhost:8000/api/dns/save-mxrecords`,
       data: mxRecordWithLowestPref,
     });

     if(response.status!==200){
      throw new Error("Server Error")
     }

    console.log("MxRecord Successfully saved", mxRecordWithLowestPref);
    listOfMxRecordsAvialable.push(mxRecordWithLowestPref)
    return mxRecordWithLowestPref;
  } catch (error) {
    console.log(error);
    return null
  } 
};

module.exports = {
  getMxRecordsOfDomain,
};
