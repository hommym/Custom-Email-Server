const csvParser = require("csv-parser");
const { Readable } = require("stream");
const addressFilter = require("../../helperTools/emailadressFilter.js");

const csvToArray = async (fileBuffer, req, filterFlag = true) => {
  let results = [];
  const stream = new Readable.from(fileBuffer.toString("utf-8"));

  stream.pipe(csvParser());
  stream
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      if (filterFlag) {
        results = await addressFilter(results[0].split(","), req);
      } else {
        results = results[0].split(",");
      }

      return { emailAddresses: results, addressCount: results.length };
      // res.status(200).json({ emailAddresses: results, addressCount: results.length });
    });
};

module.exports = {
  csvToArray,
};
