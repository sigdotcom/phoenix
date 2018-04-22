import * as cors from "@koa/cors";
import * as Koa from "koa";
import * as koaBody from "koa-body";
import * as logger from "koa-logger";

import { config } from "./config";
import { routes } from "./routes";

const app = new Koa();

app.use(koaBody());
app.use(cors());
app.use(logger());
app.use(routes);
export const server = app.listen(config.port);
