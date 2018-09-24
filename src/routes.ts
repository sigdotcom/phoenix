import { router as authRouter } from "./routes/auth";
import { router as chargeRouter } from "./routes/charge";
import { router as indexRouter } from "./routes/index";
import { router as productRouter } from "./routes/product";

import * as Router from "koa-router";


const router = new Router();
router.use("", authRouter.routes(), authRouter.allowedMethods());
router.use("", chargeRouter.routes(), chargeRouter.allowedMethods());
router.use("", indexRouter.routes(), indexRouter.allowedMethods());
router.use("", productRouter.routes(), productRouter.allowedMethods());

export { router };

