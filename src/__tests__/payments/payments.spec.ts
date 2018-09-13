import request = require("supertest");
import { app } from "../../app";

const server = app.listen();

describe("payments", () => {
    afterEach(async () => {
      await server.close();
    });

    describe(`POST /payments/charge`, () => {
        it("should process a payment for the given amount", async done => {
            const response = await request(server)
                    .post('/payments/charge')
                    .send({ stripeToken: "tok_visa", 
                            stripeAmount: "100" }); 
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.body.amount).toEqual(100);
            done();
        });
    });

    describe(`POST /payments/product`, () => {
        it("should create a stripe product with discount", async done => {
            const response = await request(server)
                .post('/payments/product')
                .send({ productName: "Test Product",
                        productPrice: "1000",
                        productDiscount: "600",
                        productDescription: "A great product..." });
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.body.description).toEqual('A great product...');
            done();
        });
    });

    describe(`POST /payments/product`, () => {
        it("should create a stripe product without discount", async done => {
            const response = await request(server)
                .post('/payments/product')
                .send({ productName: "Test Product 2",
                        productPrice: "1000",
                        productDescription: "A great product..." });
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.body.description).toEqual('A great product...');
            done();
        });
    });

    describe(`POST /payments/product`, () => {
        it("should fail to create a product due to lack of name", async done => {
            const response = await request(server)
                .post('/payments/product')
                .send({ productPrice: "1000",
                        productDescription: "A great product..." });
            expect(response.status).toEqual(200);
            done();
        });
    });

});
