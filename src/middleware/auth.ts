import * as passport from "koa-passport";

import { OAuth2Strategy as googleStrategy } from "passport-google-oauth";
import { getManager } from "typeorm";
import { config } from "../config";
import { Account } from "../entity/Account";

passport.serializeUser((user: Account, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (userID: string, done: any) => {
  const user = await Account.findOne({id: userID});
  if (user){
    done(null, user);
  } else {
    done(null, false);
  }
});


// TODO: remove hard-coded userProfileURL
// TODO: change callbackURL to support standard website
passport.use(new googleStrategy({
    callbackURL: `http://${config.host}:${config.port}/auth/google/callback/`,
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
        lastName: LAST_NAME,
      });

      if (!user) {
        user = new Account();
        user.firstName = FIRST_NAME;
        user.lastName = LAST_NAME;
        user.email = EMAIL;
        await user.save();
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

export { passport };
