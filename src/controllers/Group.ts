import { Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, UnauthorizedError } from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import * as Auth from "../lib/auth";

import { Account } from "../entity/Account";
import { Group } from "../entity/Group";


@JsonController()
export class GroupController {
  @Get("/groups/")
  public async getAll() {
    return Group.find({ relations: ["accounts", "permissions"] });
  }

  @Post("/groups/")
  public save(@CurrentUser({ required: true }) user: Account, @EntityFromBody() group: Group) {
    if (Auth.isAuthorized(user, ["create groups"])) {
      return group.save();
    } else {
      throw new UnauthorizedError("You do not have sufficient permission to create a new group");
    }
  }

  @Get("/groups/:name/")
  public get(@Param("name") name: string) {
    return Group.findOne({ name });
  }

  @Patch("/groups/:name/")
  public async patch(@CurrentUser({ required: true }) user: Account, @Param("name") name: string, @Body() group: object) {
    if (Auth.isAuthorized(user, ["modify specific groups"])) {
      await Group.update(name, group);
      return Group.findOne({ name });
    } else {
      throw new UnauthorizedError("You do not have sufficient permission to modify specific groups");
    }
  }

  @Delete("/groups/:name/")
  @OnUndefined(204)
  public async remove(@CurrentUser({ required: true }) user: Account, @Param("name") name: string) {
    if (Auth.isAuthorized(user, ["delete specific groups"])) {
      return Group.delete({ name });
    } else {
      throw new UnauthorizedError("You do not have sufficient permission to delete specific groups");
    }
  }
}
