const csvParser = require("csv-parser");
const { Readable } = require("stream");
const addressFilter=require("../../helperMethods/emailadressFilter.js")


const csvToArray = async (fileBuffer, res,req) => {
  let results = [];
  const stream = new Readable.from(fileBuffer.toString("utf-8"));
  
   stream.pipe(csvParser())
     stream.on("data", (data) => {
       results.push(data);
     })
     .on("end", async () => {
       console.log(results);
       results = await addressFilter(results[0].split(","), req);
       res.status(200).json({ emailAddresses: results, addressCount: results.length });
     });
};

module.exports = {
  csvToArray,
};
