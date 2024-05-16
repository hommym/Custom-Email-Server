const express = require("express");
const {allAdminAccountsController,accounActivationController,accountDeactivationController}=require("./superAdminController.js")
const verifyJwt=require("../../middleware/verifyJwt.js")

const adminRouter = express.Router();


adminRouter.get("/admin-accounts",verifyJwt,allAdminAccountsController)

adminRouter.post("/admin-accont/activate",verifyJwt,accounActivationController)

adminRouter.post("/admin-account/deactivate",verifyJwt,accountDeactivationController)



module.exports= adminRouter
