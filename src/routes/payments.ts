import { Context } from "koa";
import { createConnection, getConnection } from "typeorm";
import { Product } from "../entity/Product";

import * as Router from "koa-router";


// MAKE SURE YOU ARE USING TEST KEY WHEN DEVELOPING (e.g. sk_test_xxxxxx)
const stripe = require("stripe")("sk_test_9ZGlktvPFLh1mq4KTxcwDSBV");

const router = new Router({
    prefix: "/payments",
});

// Initialize database connection
createConnection();

// Route to process payments
router.post("/charge", async (ctx: Context) => {
    // Process received payment request
    let charge;
    try {
        charge = await stripe.charges.create({    
            amount: ctx.request.body.stripeAmount,
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

// Route to create product
router.post("/product", async (ctx: Context) => {
    // Check for optional discount.
    const productDiscount = ctx.request.body.hasOwnProperty('productDiscount') ? 
                                ctx.request.body.productDiscount : null;

    // Create a product instance
    let new_product = new Product();
    try {
        let stripeResponse = await stripe.products.create({
            name: ctx.request.body.productName,
            type: 'good',
            description: ctx.request.body.productDescription
        });

        // Create our product instance
        new_product.name = ctx.request.body.productName;
        new_product.price = ctx.request.body.productPrice;
        new_product.description = ctx.request.body.productDescription;
        new_product.discount = productDiscount;
        new_product.stripeId = stripeResponse.id;

        await getConnection().manager.save(new_product);

    } catch (err) {
        console.log("Unsuccessful product creation");
        console.log(err);
    } finally {
        console.log(new_product);
        ctx.body = new_product;
    }
});

export { router };
