import { Context } from "koa";
import { createConnection, getConnection } from "typeorm";
import { Product } from "../entity/Product";

import * as Router from "koa-router";
import { POINT_CONVERSION_UNCOMPRESSED } from "constants";

// MAKE SURE YOU ARE USING TEST KEY WHEN DEVELOPING (e.g. sk_test_xxxxxx)
const stripe = require("stripe")("sk_test_9ZGlktvPFLh1mq4KTxcwDSBV");

const router = new Router();

// Initialize database connection
createConnection();

// Route to process payments
router.post("/charge", async (ctx: Context) => {
    // Get product object requested to purchase
    const productRepository = await getConnection().getRepository(Product);
    const product = await productRepository.findOne({ where: { stripeId: ctx.request.body.stripeProduct } });

    // Process received payment request
    let charge;
    try {
        charge = await stripe.charges.create({    
            amount: product.price,
            currency: "usd",
            source: ctx.request.body.stripeToken,
            description: "Ryan's Test Charge"
        });
    } catch (err) {
        console.log("Unsuccessful payment submission");
        console.log(err);
    } finally {
        ctx.body = charge; 
    }   
});

export { router };
