import { Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, UnauthorizedError } from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import * as Auth from "../lib/auth";

import { Account } from "../entity/Account";
import { Permission } from "../entity/Permission";

@JsonController()
export class PermissionController {
  @Get("/permissions/")
  public async getAll(@CurrentUser({ required: true }) user: Account) {
    if (Auth.isAuthorized(user, ["view permissions"])) {
      return Permission.find();
    } else {
      throw new UnauthorizedError("You do not have sufficient permissions to view all permissions.");
    }
  }

  @Post("/permissions/")
  public save(@CurrentUser({ required: true }) user: Account, @EntityFromBody() permission: Permission) {
    if (Auth.isAuthorized(user, ["create permissions"])) {
      return permission.save();
    } else {
      throw new UnauthorizedError("You do not have sufficient permission to create a new permission.");
    }
  }

  @Get("/permissions/:name/")
  public get(@CurrentUser({ required: true }) user: Account, @Param("name") name: string) {
    if (Auth.isAuthorized(user, ["view permissions"])) {
      return Permission.findOne({ name });
    } else {
      throw new UnauthorizedError("You do not have sufficient permissions to view specific permissions.");
    }
  }

  @Patch("/permissions/:name/")
  public async patch(@CurrentUser({ required: true }) user: Account, @Param("name") name: string, @Body() permission: object) {
    if (Auth.isAuthorized(user, ["modify permissions"])) {
      await Permission.update(name, permission);
      return Permission.findOne({ name });
    } else {
      throw new UnauthorizedError("You do not have sufficient permission to modify permissions.");
    }
  }

  @Delete("/permissions/:name/")
  @OnUndefined(204)
  public async remove(@CurrentUser({ required: true }) user: Account, @Param("name") name: string) {
    if (Auth.isAuthorized(user, ["delete permissions"])) {
      return Permission.delete({ name });
    } else {
      throw new UnauthorizedError("You do not have sufficient permission to delete permissions.");
    }
  }
}
