const express = require("express");
const { allAdminAccountsController, accounActivationController, accountDeactivationController, bulkEmailUploadController,allBulkEmailController } = require("./superAdminController.js");
const verifyJwt = require("../../middleware/verifyJwt.js");
const superAdminChecker=require("../../middleware/superAdminChecker.js")
const {parseSingleFileFormData}= require("../../libs/multer.js")
const csvToArray = require("../../middleware/csvToArray.js");

const adminRouter = express.Router();

adminRouter.get("/admin-accounts", verifyJwt, superAdminChecker, allAdminAccountsController);

adminRouter.get("/bulk-email-for-sale", verifyJwt, superAdminChecker, allBulkEmailController);

adminRouter.put("/admin-account/activate", verifyJwt, superAdminChecker, accounActivationController);

adminRouter.put("/admin-account/deactivate", verifyJwt, superAdminChecker, accountDeactivationController);

adminRouter.post("/bulk-email-upload", verifyJwt, superAdminChecker,parseSingleFileFormData("bulkEmail") ,csvToArray,bulkEmailUploadController);

module.exports = adminRouter;
