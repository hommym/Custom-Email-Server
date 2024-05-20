const multer = require("multer");

const parseSingleFileFormData = (fieldName) => {
  return multer().single(fieldName);
};

module.exports = {
  parseSingleFileFormData,
};
