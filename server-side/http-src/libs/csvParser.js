const csvParser = require("csv-parser");
const fileSys = require("fs");
const {Readable} = require("stream");

const csvToArray = async (fileBuffer,res) => {
  let results = [];
 const stream = new Readable.from([fileBuffer.toString()])
    stream.pipe(csvParser());
    stream.on("data", (data) => results.push(data))
    stream.on("end", () => {
      
      results= results[0].split(",")
      console.log("Array of contacts formed");
      res.status(200).json({emailAdresses:results,adressCount:results.length})
    });

  
}

module.exports={
    csvToArray
}
