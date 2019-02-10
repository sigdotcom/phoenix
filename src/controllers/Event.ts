import { Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, UnauthorizedError } from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import { Account } from "../entity/Account";
import { Application } from "../entity/Application";
import { Event } from "../entity/Event";
import * as Auth from "../lib/auth";

@JsonController()
export class EventController {

  @Get("/events/")
  public async getAll(@CurrentUser({ required: false }) user: Account) {
    return Event.find();
  }

  @Post("/events/")
  public save(@CurrentUser({ required: false }) user: Account, @EntityFromBody() event: Event) {
    if (Auth.isAuthorized(user, ["create events"])) {
      return event.save();
    } else {
      throw new UnauthorizedError("You do not have sufficient permissions to create a new user.");
    }
  }

  @Get("/events/:id/")
  public async get(@CurrentUser({ required: false }) user: Account, @Param("id") id: string) {
    if (Auth.isAuthorized(user, ["access specific events"]) || id === user.id) {
      return Event.findOne({ id }, {relations: ["groups", "permissions", "applications"]});
    }
    else {
      throw new UnauthorizedError("You do not have sufficient permissions to access specific users.");
    }
  }

  @Patch("/events/:id/")
  public async patch(@CurrentUser({ required: false }) user: Account, @Param("id") id: string, @Body() event: object) {
    if (Auth.isAuthorized(user, ["modify specific events"]) || id === user.id) {
      await Event.update(id, event);
      return Event.findOne({ id });
    }
    else {
      throw new UnauthorizedError("You do not have sufficient permissions to modify specific users.");
    }
  }

  @Delete("/events/:id/")
  @OnUndefined(204)
  public async remove(@CurrentUser({ required: true }) user: Account, @Param("id") id: string) {
    if (Auth.isAuthorized(user, ["delete specific events"]) || id === user.id) {
      return Event.delete({ id });
    }
    else {
      throw new UnauthorizedError("You do not have sufficient permissions to delete specific users.");
    }
  }
}
