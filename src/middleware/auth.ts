import * as passport from "koa-passport";

import { OAuth2Strategy as googleStrategy } from "passport-google-oauth";
import { Strategy as BearerStrategy } from "passport-http-bearer";

import { config } from "../config";
import { Account } from "../entity/Account";
import { Application } from "../entity/Application";

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

// TODO: remove hard-coded userProfileURL
// TODO: change callbackURL to support standard website
passport.use(
  new googleStrategy(
    {
      callbackURL: `http://localhost/auth/google/callback/`,
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    async (token, tokenSecret, profile, done) => {
      const EMAIL = profile.emails[0].value;
      const FIRST_NAME = profile.name.givenName;
      const LAST_NAME = profile.name.familyName;

      try {
        let user = await Account.findOne({
          email: EMAIL,
          firstName: FIRST_NAME,
          lastName: LAST_NAME
        });

        if (!user) {
          user = new Account();
          user.firstName = FIRST_NAME;
          user.lastName = LAST_NAME;
          user.email = EMAIL;
          await user.save();
        }

        done(undefined, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const application = await Application.findOne(
        { token },
        { relations: ["account", "account.permissions"] }
      );
      const user = application.account;

      if (!application) {
        return done(undefined, true);
      }
      return done(undefined, user, { scope: "all" });
    } catch (err) {
      return done(err);
    }
  })
);

export { passport };
