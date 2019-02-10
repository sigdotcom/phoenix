import * as cors from "@koa/cors";
import * as Koa from "koa";
import * as koaBody from "koa-bodyparser";
import * as logger from "koa-logger";
import * as session from "koa-session";

import { Action, useKoaServer } from "routing-controllers";
import { createConnection } from "typeorm";
import { AccountController } from "./controllers/Account";
import { ApplicationController } from "./controllers/Application";
import { EventController } from "./controllers/Event";
import { GroupController } from "./controllers/Group";
import { PermissionController } from "./controllers/Permission";
import { passport } from "./middleware/auth";

import { config } from "./config";
import { router } from "./routes";

export const app = new Koa();

app.keys = ['put secret key here'];

app.use(koaBody());
app.use(cors());
app.use(logger());
app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());

app.use(router.routes());
app.use(router.allowedMethods());

useKoaServer(app, {
  controllers: [AccountController, ApplicationController, EventController, GroupController, PermissionController],
  currentUserChecker: async (action: Action) => {
    const user = action.context.state.user;
    const auth_header = action.context.headers.authorization;
    if (user) {
      return user;
    }

    await passport.authenticate('bearer', { session: false })(action.context, async () => {});
    return action.context.state.user;
  },
  routePrefix: "/api/v1",
});

/* istanbul ignore next */
if (!module.parent) {
  createConnection().then(async connection => {
    app.listen(config.port, config.host, () => {
      console.log(
        `Server is listening on ${config.host}:${config.port} (${config.NODE_ENV})`
      );
    });
  }).catch(error => console.log("TypeORM connection error: ", error));
}
