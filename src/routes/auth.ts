import { Context } from "koa";
import { config } from "../config";
import { isAuthenticated } from "../lib/auth";

import * as passport from "koa-passport";
import * as Router from "koa-router";

const router = new Router();

router.get(`/${config.GOOGLE_PROVIDER_NAME}/`, async (ctx: Context, next: any) => {
  if (!isAuthenticated(ctx)) {
    await passport.authenticate('google', {
      hd: "mst.edu",
      scope: ["openid", "email", "profile"],
    })(ctx, next);
  }
  else {
    ctx.redirect("/");
  }
});

router.get(`/${config.GOOGLE_PROVIDER_NAME}/callback/`, async (ctx: Context, next: any) => {
  if (!isAuthenticated(ctx)) {
    await passport.authenticate("google", {
      failureRedirect: "/",
      successRedirect: "/"
    })(ctx, next);
  } else {
    ctx.redirect("/");
  }
});

export { router };
