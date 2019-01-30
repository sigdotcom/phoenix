/**
 * Helper functions for user authentication. Act as a wrapper for passport
 * authentication functions for unit-testing and mocking purposes.
 */
import * as Koa from "koa";
import { Account } from "../entity/Account";

export function isAuthenticated(ctx: Koa.BaseContext): boolean {
  return ctx.isAuthenticated();
}

export function isAuthorized(user: Account, roles = []): boolean {
    const permissions = user.permissions;
    const permissionNames = permissions.map(item => item.name);

    if (user && !roles.length) {
      return true;
    }

    if (user && user.isSuperAdmin) {
      return true;
    }

    if (user && roles.find(role => permissionNames.indexOf(role) !== -1)) {
      return true;
    }

    return false;
}
