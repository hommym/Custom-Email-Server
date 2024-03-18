require("dotenv").config();

const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.stripe_key);
const Users = require("../../schemas/userSchema");

let prices = ["", process.env.ProStripePlan];

const extractSubscriptionDetails = asyncHandler(async (customerId) => {
	if (!customerId) return "free";
	// / Retrieve customer using  id
	const subscriptions = await stripe.subscriptions.list({
		customer: customerId,
	});

	if (subscriptions?.data?.length > 0) {
		// Retrieve subscription
		const subscription = await stripe.subscriptions.retrieve(subscriptions?.data?.[0]?.id);
		console.log("sub", subscription);
		let { plan, status } = subscription;
		if (status === "active") {
			plan = prices.findIndex((price) => price == plan.id);
			return plan !== -1 ? (plan === 1 ? "pro" : "free") : "free";
		} else {
			user.plan = "free";
		}
	} else {
		return "free";
	}
});

// This is just for getting a customer,
const getCustomerDetails = asyncHandler(async (customerId) => {
	const plan = await extractSubscription(customerId);
	res.status(200).json({ plan, customerId });
});

// Create customer on registration
const createCustomer = asyncHandler(async (email) => {
	console.log(email);
	const customer = await stripe.customers.create({
		email,
	});

	return customer;
});

const getSubscriptions = asyncHandler(async (req, res) => {
	res.status(200).json({ plans: prices });
});
const createSubscriptionCheckoutSession = asyncHandler(async (req, res) => {
	const { priceId } = req.query;
	// Retrieve customer Id or create one
	const user = await Users.findOne({ _id: req.user._id });
	let customerId = user?.customerId;
	if (!customerId) {
		// Create customer
		let customer = await createCustomer(user?.email);
		customerId = customer.id;
		await Users.updateOne({ _id: user?._id }, { customerId });
	}

	// Retrieve customer id
	const plan = await extractSubscriptionDetails(customerId);

	if (plan === "free") {
		// Check priceId
		if (!priceId) {
			return res.status(400).json({ error: "Please provide a priceId" });
		}
		// Create a session checkout
		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			success_url: `${process.env.CLIENT_URL}/stripe/success?type=recur&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/stripe/error`,
			customer: customerId,
		});
		res.status(200).json({ url: session?.url });
	} else {
		// Create a biiling
		const billingPortalSession = await stripe.billingPortal.sessions.create({
			customer: customerId,
			return_url: `${process.env.CLIENT_URL}/pricings`,
		});
		res.status(200).json({ url: billingPortalSession?.url });
	}
});

const validateSubscriptionSession = asyncHandler(async (req, res) => {
	// try {
	// 	const user = await User.findOne({ _id: req.session.user._id });
	// 	if (!user?.subscription?.sessionId) {
	// 		res.status(403);
	// 		throw new Error("User not authorized to perform this action");
	// 	}
	// 	// Validate session
	// 	const session = await stripe.checkout.sessions.retrieve(user?.subscription?.sessionId);
	// 	if (session.payment_status === "paid") {
	// 		// Update subscription
	// 		// Get subscription'
	// 		const subscription = await stripe.subscriptions.retrieve(session.subscription);
	// 		let { customer, status, plan } = subscription;
	// 		if (status === "active") {
	// 			// Update user's subscription
	// 			plan = prices.findIndex((price) => price == plan.id);
	// 			let subscriptionType = plan >= 0 ? (plan == 1 ? "premium" : plan === 2 ? "premiumPlus" : "free") : "free";
	// 			await User.updateOne({ _id: req.session.user._id }, { $set: { subscription: { customer, subscriptionId: session.subscription } } });
	// 			// Return new subscription
	// 			return res.status(200).json({ success: true, subscriptionType });
	// 		}
	// 		res.status(400);
	// 		throw new Error("There was an error since payment was cancelled");
	// 	} else {
	// 		res.status(400);
	// 		throw new Error("There was an error since payment was cancelled");
	// 	}
	// } catch (error) {
	// 	console.log(error);
	// 	res.status(400).json({ error: error.message });
	// }
});

module.exports = {
	getSubscriptions,
	validateSubscriptionSession,
	createSubscriptionCheckoutSession,
	getCustomerDetails,
	createCustomer,
	extractSubscriptionDetails,
};
