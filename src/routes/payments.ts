import { Context } from "koa";

import * as Router from "koa-router";

// MAKE SURE YOU ARE USING TEST KEY WHEN DEVELOPING (e.g. sk_test_xxxxxx)
const stripe = require("stripe")("sk_test_9ZGlktvPFLh1mq4KTxcwDSBV");

const router = new Router({
    prefix: "/payments",
});

const body = require("koa-json-body")({ limit: '10kb' });

// Route to process payments
router.post("/charge", async (ctx: Context) => {
    console.log(ctx.request);
    const stripeToken = ctx.request.body.stripeToken;
    const stripeAmount = ctx.request.body.stripeAmount;
    
    console.log("Token: " + stripeToken);
    console.log("Amount: " + stripeAmount);

    // Process received payment request
    let charge;
    try {
        charge = await stripe.charges.create({    
            amount: stripeAmount,
            currency: "usd",
            source: stripeToken,
            description: "Ryan's Test Charge"
        });
    } catch (err) {
        console.log("Unsuccessful payment submission");
        console.log(err);
    }
    console.log(charge);
    ctx.body = charge;    
});

export { router };
