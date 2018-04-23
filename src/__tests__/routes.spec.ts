import { agent } from "supertest";
import { app } from "../app";

const server = app.listen();
const request = agent(server);

describe("routes", () => {
  afterEach(async () => {
    await server.close();
  });

  describe(`GET /`, async () => {
    it("should error on the default route with a 401", async done => {
      const response = await request.get("/");
      expect(response.status).toEqual(401);
      done();
    });
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
