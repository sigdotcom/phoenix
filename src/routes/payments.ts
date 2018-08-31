import { Context } from "koa";

import * as Router from "koa-router";

// MAKE SURE YOU ARE USING TEST KEY WHEN DEVELOPING (e.g. sk_test_xxxxxx)
const stripe = require("stripe")("sk_test_9ZGlktvPFLh1mq4KTxcwDSBV");

const router = new Router({
    prefix: "/payments",
});

// Route to process payments
router.get("/charge", async (ctx: Context, next: any) => {
    // TODO: Associate token with real payment info
    // TODO: Associate amount with real product object

    // const stripeToken = ctx.request.body.stripeToken;
    // const stripeAmount = ctx.request.body.stripeAmount;

    // Process received payment request
    let charge;
    try {
        charge = await stripe.charges.create({
            amount: 50,
            currency: "usd",
            source: "tok_visa",
            description: "Ryan's Test Charge"
        });
    } catch (err) {
        console.log("Payment unsuccessful: " + err.message);
    }
    ctx.response.body = charge;
});

export { router };