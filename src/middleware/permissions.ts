import * as Koa from "koa";
import * as Router from "koa-router";


export function koaPerms(opts?: object) {
  return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
    await next();
  };
}
