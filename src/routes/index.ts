// Basic Routes
import { Context } from "koa";

import * as Router from "koa-router";


const router = new Router();

/**
 * Base route, return a 401
 */
router.get("/home/", async (ctx: Context) => {
    ctx.body = "Hello, World!";
    ctx.status = 200;
});

/**
 * Basic healthcheck
 */
router.get("/healthcheck", async (ctx: Context) => {
    ctx.body = "OK";
});

export { router };
