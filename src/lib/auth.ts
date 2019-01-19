/**
 * Helper functions for user authentication. Act as a wrapper for passport
 * authentication functions for unit-testing and mocking purposes.
 */
import * as Koa from "koa";

export function isAuthenticated(ctx: Koa.BaseContext) {
  return ctx.isAuthenticated();
}
