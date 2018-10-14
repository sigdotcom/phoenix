import { router as authRouter } from "./routes/auth";
import { router as indexRouter } from "./routes/index";

import * as Router from "koa-router";


const router = new Router();
router.use("", authRouter.routes(), authRouter.allowedMethods());
router.use("", indexRouter.routes(), indexRouter.allowedMethods());

export { router };

