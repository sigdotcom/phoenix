import request = require("supertest");
import { server } from "../app";

describe("routes", () => {
  afterEach(async () => {
    await server.close();
  });

  describe(`GET /`, () => {
    it("should error on the default route with a 401", async () => {
      const response = await request(server).get("/");
      expect(response.status).toEqual(401);
    });
  });

  describe(`GET /healthcheck`, () => {
    it("should healthcheck", async () => {
        const response = await request(server).get("/healthcheck/");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("text/plain");
    });
  });
});
