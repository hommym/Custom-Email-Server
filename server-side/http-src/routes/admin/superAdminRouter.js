const express = require("express");
const { allAdminAccountsController, accounActivationController, accountDeactivationController, emailListUploadController, allEmailListController } = require("./superAdminController.js");
const verifyJwt = require("../../middleware/verifyJwt.js");
const superAdminChecker=require("../../middleware/superAdminChecker.js")

const adminRouter = express.Router();

adminRouter.get("/admin-accounts", verifyJwt, superAdminChecker, allAdminAccountsController);

adminRouter.get("/email-list", verifyJwt, superAdminChecker, allEmailListController);

adminRouter.put("/admin-account/activate", verifyJwt, superAdminChecker, accounActivationController);

adminRouter.put("/admin-account/deactivate", verifyJwt, superAdminChecker, accountDeactivationController);

adminRouter.post("/email-list", verifyJwt, superAdminChecker, emailListUploadController);

module.exports = adminRouter;
