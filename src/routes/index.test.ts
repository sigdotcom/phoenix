import { agent } from "supertest";

import { app } from "../app";

const server = app.listen();
const request = agent(server);

describe("ROUTE /", () => {
  beforeEach(async (done) => {
    jest.clearAllMocks();
    done();
  });
  afterEach(async () => {
    await server.close();
  });

  describe(`GET /`, async () => {
    it("should display 'Hello, World!'", async (done) => {
      const response = await request.get("/");
      expect(response.status).toEqual(200);
      expect(response.text).toEqual("Hello, World!");
      done();
    });
  });

  describe(`GET /healthcheck/`, async () => {
    it("should display 'OK'", async (done) => {
      const response = await request.get("/healthcheck/");
      expect(response.status).toEqual(200);
      expect(response.text).toEqual("OK");
      done();
    });
  });
});
