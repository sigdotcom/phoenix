/**
 * Helper functions for user authentication. Act as a wrapper for passport
 * authentication functions for unit-testing and mocking purposes.
 */
import { Context } from "koa";

export function isAuthenticated(ctx: Context) {
  return ctx.isAuthenticated();
}
