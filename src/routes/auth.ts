import * as Koa from "koa";
import { config } from "../config";
import { isAuthenticated } from "../lib/auth";

import * as passport from "koa-passport";
import * as Router from "koa-router";

const router = new Router();

router.get(`/${config.GOOGLE_PROVIDER_NAME}/`, async (ctx: Koa.ParameterizedContext, next: any) => {
  if (!isAuthenticated(ctx)) {
    await passport.authenticate('google', {
      hd: "mst.edu",
      scope: ["openid", "profile", "email"],
    })(ctx, next);
  }
  else {
    ctx.redirect("/");
  }
});

router.get(`/${config.GOOGLE_PROVIDER_NAME}/callback/`, async (ctx: Koa.ParameterizedContext, next: any) => {
  if (!isAuthenticated(ctx)) {
    await passport.authenticate("google", {
      failureRedirect: "/",
      successRedirect: "/"
    })(ctx, next);
  } else {
    ctx.redirect("/");
  }
});

router.get("/logout/", async (ctx: Koa.ParameterizedContext, next: any) => {
  ctx.logout();
  ctx.redirect("/");
});

export { router };
