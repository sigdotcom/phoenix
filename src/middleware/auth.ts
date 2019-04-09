import * as Koa from "koa";
import * as passport from "koa-passport";

import * as JWT from "jsonwebtoken";

import { OAuth2Strategy as googleStrategy } from "passport-google-oauth";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import {
  KoaMiddlewareInterface,
  Middleware,
  UnauthorizedError
} from "routing-controllers";

import { config } from "../config";
import { http } from "../lib/http";

import { Account } from "../entity/Account";
import { Application } from "../entity/Application";

@Middleware({ type: "before" })
export class HeaderAuthMiddleware implements KoaMiddlewareInterface {
  public authenticateWithBearer = (ctx, next) =>
    this.bearerAuthentication((err, user, info) => {
      ctx.user = user;
      return next();
    })(ctx, next);

  public authenticateWithJwt = (ctx, next) =>
    this.jwtAuthentication((err, user, info) => {
      ctx.user = user;
      return next();
    })(ctx, next);

  public bearerAuthentication = callback =>
    passport.authenticate("bearer", { session: false }, callback);

  public jwtAuthentication = callback =>
    passport.authenticate("jwt", { session: false }, callback);

  public use(
    ctx: Koa.ParameterizedContext,
    next: (err?: any) => Promise<any>
  ): Promise<any> {
    if (ctx.headers.authorization) {
      const potentialJwt: string = ctx.headers.authorization.split(" ")[1];
      const decodedJwt: string = JWT.decode(potentialJwt, { complete: true });

      if (decodedJwt) {
        return this.authenticateWithJwt(ctx, next);
      } else {
        return this.authenticateWithBearer(ctx, next);
      }
    } else {
      return next();
    }
  }
}

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      if (token.length() > 36) {
        return done(new Error("Invalid UUID Length"), null);
      }

      const application = await Application.findOne(
        { token },
        { relations: ["account", "account.permissions"] }
      );
      const user = application.account;

      if (!application) {
        return done(new Error("Application was not found"), null);
      }
      return done(undefined, user, { scope: "all" });
    } catch (err) {
      return done(err);
    }
  })
);

const keyProvider = async (request, rawJwtToken, done) => {
  const decodedJwt = JWT.decode(rawJwtToken, { complete: true });
  const header = decodedJwt.header;

  if (!header || !header.kid) {
    done(new Error("Invalid header"), null);
  }
  try {
    const response = await http.get(config.GOOGLE_CERTS_DOMAIN);
    const cert = response.data[header.kid];

    if (!cert) {
      done(new Error("Invalid JWT certificate"), null);
    }

    done(null, cert);
  } catch (err) {
    done(err, null);
  }
};

const JWT_OPTS = {
  algorithms: [config.GOOGLE_JWT_ALGORITHM],
  audience: config.GOOGLE_CLIENT_ID,
  issuer: config.GOOGLE_ISSUERS,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKeyProvider: keyProvider
};
passport.use(
  new JwtStrategy(JWT_OPTS, async (payload, done) => {
    const { hd, given_name, family_name, email } = payload;

    if (hd !== config.HOSTED_DOMAIN) {
      done(
        new Error(`Email does not match hosted domain ${config.HOSTED_DOMAIN}`),
        null
      );
    }

    try {
      let user = await Account.findOne({
        email,
        firstName: given_name,
        lastName: family_name
      });

      if (!user) {
        user = new Account();
        user.firstName = given_name;
        user.lastName = family_name;
        user.email = email;
        user = await user.save();
      }

      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);

passport.serializeUser((user: Account, done: any) => {
  done(undefined, user.id);
});

passport.deserializeUser(async (userID: string, done: any) => {
  const user = await Account.findOne(
    { id: userID },
    { relations: ["permissions"] }
  );
  if (user) {
    done(undefined, user);
  } else {
    done(undefined, false);
  }
});

export { passport };
