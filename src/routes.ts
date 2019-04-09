import { koaPerms } from "./middleware/permissions";
import { router as indexRouter } from "./routes/index";

import * as Router from "koa-router";

const router = new Router();
router.use("/", indexRouter.routes(), indexRouter.allowedMethods());

export { router };
