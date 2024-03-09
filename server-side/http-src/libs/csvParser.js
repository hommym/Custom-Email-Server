const csvParser = require("csv-parser");
const fileSys = require("fs");
const { Readable } = require("stream");

const csvToArray = async (fileBuffer, res) => {
	let results = [];
	const stream = new Readable.from(fileBuffer.toString("utf-8"));
	stream
		.pipe(csvParser())
		.on("data", (data) => {
			results.push({ ...data, category: category ? category : "" });
		})
		.on("end", () => {
			res.status(200).json({ emailAddresses: results, addressCount: results.length });
		});
};

module.exports = {
	csvToArray,
};
