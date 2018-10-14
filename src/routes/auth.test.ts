import { agent } from "supertest";
import { Account } from "../entity/Account";

import * as nock from "nock";
import * as auth_lib from "../lib/auth";

import { app } from "../app";

const server = app.listen();
const request = agent(server);

describe("ROUTE /auth/", () => {
  beforeEach(async (done) => {
    jest.clearAllMocks();
    done();
  });
  afterEach(async () => {
    await server.close();
  });

  describe(`GET /auth/google/`, async () => {
    it("should redirect unauthed user to google", async (done) => {
      jest.spyOn(auth_lib, "isAuthenticated").mockReturnValue(false);
      const response = await request.get("/auth/google/");
      expect(response.status).toEqual(302);
      expect(response.header.location)
        .toEqual(
          expect.stringMatching(
            /^https:\/\/accounts.google.com\/o\/oauth2\/v2\/.+/
          )
        );
      done();
    });

    it("should redirect authed user to /", async (done) => {
      jest.spyOn(auth_lib, "isAuthenticated").mockReturnValue(true);
      const response = await request.get("/auth/google/");
      expect(response.status).toEqual(302);
      expect(response.header.location).toEqual("/");
      done();
    });
  });

  describe(`GET /auth/google/callback/`, async () => {
    /**
     * Cannot test actual login without valid login / authorization token. Will
     * assume that a call to passport.authenticate works as valid "login".
     */
    it("should call authenticate on unauthenticated user", async (done) => {
      jest.spyOn(auth_lib, "isAuthenticated").mockReturnValue(false);
      const response = await request.get("/auth/google/callback/");
      expect(response.status).toEqual(302);
      expect(response.header.location)
        .toEqual(
          expect.stringMatching(
            /^https:\/\/accounts.google.com\/o\/oauth2\/v2\/.+/
          )
        );
      done();
    });

    it("should redirect authed user to /", async (done) => {
      jest.spyOn(auth_lib, "isAuthenticated").mockReturnValue(true);
      const response = await request.get("/auth/google/callback/");
      expect(response.status).toEqual(302);
      expect(response.header.location).toEqual("/");
      done();
    });
  });

});
