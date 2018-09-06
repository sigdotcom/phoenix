import request = require("supertest");
import { app } from "../../app";

const server = app.listen(config.port);

describe("payments", () => {
    afterEach(async () => {
      await server.close();
    });

    describe(`POST /payments/charge`, () => {
        it("should process a payment for the given amount", async done => {
            const response = await request(server)
                    .post('/payments/charge')
                    .send({ stripeToken: "tok_visa", stripeAmount: "100" }); 
            expect(response.status).toEqual(200);
            expect(response.type).toEqual('application/json');
            expect(response.body.amount).toEqual(100);
            done();
        });
    });
});
