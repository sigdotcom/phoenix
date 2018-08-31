import { router as authRouter } from "./routes/auth";
import { router as indexRouter } from "./routes/index";
import { router as paymentsRouter } from "./routes/payments";

import * as Router from "koa-router";


const router = new Router();
router.use("", authRouter.routes(), authRouter.allowedMethods());
router.use("", indexRouter.routes(), indexRouter.allowedMethods());
router.use("", paymentsRouter.routes(), paymentsRouter.allowedMethods());

export { router };

