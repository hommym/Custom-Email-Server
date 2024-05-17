const express = require("express");
const { allAdminAccountsController, accounActivationController, accountDeactivationController, emailListUploadController, allEmailListController } = require("./superAdminController.js");
const verifyJwt = require("../../middleware/verifyJwt.js");

const adminRouter = express.Router();

adminRouter.get("/admin-accounts", verifyJwt, allAdminAccountsController);

adminRouter.get("/email-list", allEmailListController);

adminRouter.post("/admin-accont/activate", verifyJwt, accounActivationController);

adminRouter.post("/admin-account/deactivate", verifyJwt, accountDeactivationController);

adminRouter.post("/email-list",verifyJwt, emailListUploadController);

module.exports = adminRouter;
