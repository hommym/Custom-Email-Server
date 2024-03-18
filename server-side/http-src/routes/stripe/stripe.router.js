require("dotenv").config();
const express = require("express");

const verifyJwt = require("../../middleware/verifyJwt");

const { createSubscriptionCheckoutSession, validateSubscriptionSession, getSubscriptions } = require("./stripe.controller");
const userChecker = require("../../middleware/userChecker");

const subscriptionsRouter = express.Router();

subscriptionsRouter.get("/get-plans", getSubscriptions);
subscriptionsRouter.get("/create-subscription-session", verifyJwt, userChecker, createSubscriptionCheckoutSession);
subscriptionsRouter.get("/handle-success", verifyJwt, userChecker, validateSubscriptionSession);

module.exports = subscriptionsRouter;
