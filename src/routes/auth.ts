import { Context } from "koa";

import * as passport from "koa-passport";
import * as Router from "koa-router";

const router = new Router({
  prefix: "/auth",
});

router.get("/google/", async (ctx: Context, next: any) => {
  if (ctx.isUnauthenticated()) {
    await passport.authenticate('google', {
      hd: "mst.edu",
      scope: ["openid", "email", "profile"],
    })(ctx, next);
  }
  else {
    ctx.redirect("/");
  }
});

router.get("/google/callback/", async (ctx: Context, next: any) => {
  if (ctx.isUnauthenticated()) {
    await passport.authenticate("google", {
      failureRedirect: "/",
      successRedirect: "/"
    })(ctx, next);
  } else {
    ctx.redirect("/");
  }
});

export { router };
