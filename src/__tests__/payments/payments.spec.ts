import request = require("supertest");
import { app } from "../../app";

const server = app.listen();

describe("payments", () => {
    afterEach(async () => {
      await server.close();
    });

    describe(`POST /payments/charge`, () => {
        it("should process a payment for the requested product", async done => {
            // Create Product
            let response = await request(server)
                    .post('/payments/product')
                    .send({ productName: "Automated Test Product",
                            productPrice: "2000",
                            productDescription: "A test product",
                            productDiscount: "1500"});

            let product = response.body;

            // Process charge for created product
            response = await request(server)
                    .post('/payments/charge')
                    .send({ stripeToken: "tok_visa", 
                            stripeProduct: product.stripeId }); 
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.body.amount).toEqual(2000);
            done();
        });
    });

    describe(`POST /payments/charge`, () => {
        it("should fail to process a payment for a non-existent product", async done => {
            // Process charge for non-existent product
            const response = await request(server)
                    .post('/payments/charge')
                    .send({ stripeToken: "tok_visa", 
                            stripeProduct: "bad_id" }); 
            expect(response.status).toEqual(204);
            done();
        });
    });

    describe(`POST /payments/product`, () => {
        it("should create a stripe product with discount", async done => {
            // Create Product using valid request containing discount
            const response = await request(server)
                .post('/payments/product')
                .send({ productName: "Test Product",
                        productPrice: "1000",
                        productDiscount: "600",
                        productDescription: "A great product..." });
            // Check product was created
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.body.discount).toEqual("600");
            done();
        });
    });

    describe(`POST /payments/product`, () => {
        it("should create a stripe product without discount", async done => {
            // Create Product using valid request not containing discount
            const response = await request(server)
                .post('/payments/product')
                .send({ productName: "Test Product 2",
                        productPrice: "1000",
                        productDescription: "A great product..." });
            // Check product was created
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.body.description).toEqual('A great product...');
            done();
        });
    });

    describe(`POST /payments/product`, () => {
        it("should fail to create a product due to lack of name", async done => {
            // Create Product using invalid request
            const response = await request(server)
                .post('/payments/product')
                .send({ productPrice: "1000",
                        productDescription: "A great product..." });
            // Check product was not created
            expect(response.body.hasOwnProperty("name")).toEqual(false);
            done();
        });
    });

});
