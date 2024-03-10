const User = require("../http-src/schemas/userSchema.js");
const CustmerAdress = require("../http-src/schemas/customerSchema.js");

// this method is for filtering email addresses uploaded on to the server
const addressFilter = async (results, req) => {
  // removing duplicates form the list
  console.log("array converted to set");
  results = Array.from(new Set(results));
  console.log("duplicates removed set convert to array");

  // filtering out emails using orgId to get rid of already exist emails in dataBase
  const allEmailAddressOfOrg = await CustmerAdress.find({ orgId: (await User.findOne({ _id: req.id })).orgId });
  const indexOfElementToRemove = [];
  console.log("Filtering with data in database start..");
  allEmailAddressOfOrg.forEach((emailAdObj) => {
    let indexTracker = 0;

    for (const e of results) {
      if (e === emailAdObj.emailAdress) {
        if (!(indexTracker in indexOfElementToRemove)) {
          indexOfElementToRemove.push(indexTracker);
        }
      }

      indexTracker++;
    }
  });

  results = results.filter((resultItem) => !(results.indexOf(resultItem) in indexOfElementToRemove));
  console.log("Filtering done");
  return results;
};

module.exports = addressFilter;
