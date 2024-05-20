const csvParser = require("csv-parser");
const { Readable } = require("stream");
const addressFilter = require("../../helperTools/emailadressFilter.js");


// this middle ware checks if there is a csv file in the form submission and then convert it content into a list

const asyncHandler = require("express-async-handler");

const csvToArray = asyncHandler(async (req, res, next) => {
  

  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  console.log("A File has been uploaded");

  if (req.file.mimetype === "text/csv") {
    console.log("File is of type csv");
    let results = [];
    const stream = new Readable.from(req.file.buffer.toString("utf-8"));

    stream.pipe(csvParser());
    stream
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        if (req.file.fieldname == "contacts") {
          results = await addressFilter(results[0].split(","), req);
        } else {
          results = results[0].split(",");
        }

        req.emailAddressObject = { emailAddresses: results, addressCount: results.length };

        next();

        // res.status(200).json({ emailAddresses: results, addressCount: results.length });
      });
  } else {
    next();
  }
});

module.exports = csvToArray;
