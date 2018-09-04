import { agent } from "supertest";
import { app } from "../app";

const server = app.listen();
const request = agent(server);

describe("routes", () => {
  afterEach(async () => {
    await server.close();
  });

  describe(`GET /healthcheck`, () => {
    it("should healthcheck", async done => {
        const response = await request.get("/healthcheck/");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("text/plain");
        done();
    });
  });
});
