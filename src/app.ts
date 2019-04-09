import * as cors from "@koa/cors";
import * as Koa from "koa";
import * as koaBody from "koa-bodyparser";
import * as logger from "koa-logger";
import * as session from "koa-session";

import { Action, useKoaServer } from "routing-controllers";
import { createConnection } from "typeorm";

import * as controllers from "./controllers";

import { HeaderAuthMiddleware, passport } from "./middleware/auth";

import { config } from "./config";
import { router } from "./routes";

export const app = new Koa();

app.keys = [config.SECRET_APP_KEY];

app.use(koaBody());
app.use(cors());
app.use(logger());
app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());

app.use(router.routes());
app.use(router.allowedMethods());

useKoaServer(app, {
  controllers: Object.keys(controllers).map(key => controllers[key]),
  currentUserChecker: async (action: Action) => {
    if (config.NODE_ENV === "development") {
      console.log("Skipping authentication (development mode)...");
      return true;
    }
    return action.context.user;
  },
  middlewares: [HeaderAuthMiddleware],
  routePrefix: "/api/v1"
});

/* istanbul ignore next */
if (!module.parent) {
  createConnection()
    .then(async connection => {
      app.listen(config.port, config.host, () => {
        console.log(
          `Server is listening on ${config.host}:${config.port} (${
            config.NODE_ENV
          })`
        );
      });
    })
    .catch(error => console.log("TypeORM connection error: ", error));
}
