const multer = require("multer");

const parseSingleFileFormData = (fileType) => {
  return multer().single(fileType);
};

module.exports = {
  parseSingleFileFormData,
};
