import { Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, UnauthorizedError } from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import { Account } from "../entity/Account";
import { Application } from "../entity/Application";
import * as Auth from "../lib/auth";

@JsonController()
export class ApplicationController {

  @Get("/applications/")
  public async getAll(@CurrentUser({ required: true }) user: Account) {
    if (Auth.isAuthorized(user, ["view applications"])) {
      return Application.find({relations: ["account", ]});
    } else {
      throw new UnauthorizedError("You do not have sufficient permissions to view all applications.");
    }
  }

  @Post("/applications/")
  public save(@CurrentUser({ required: true }) user: Account, @EntityFromBody() application: Application) {
    if (Auth.isAuthorized(user, ["create applications"])) {
      application.account = user;
      return application.save();
    } else {
      throw new UnauthorizedError("You do not have sufficient permissions to create a new application.");
    }
  }

  @Get("/applications/:id/")
  public async get(@CurrentUser({ required: true }) user: Account, @Param("id") id: string) {
    const application = await Application.findOne({ id }, {relations: ["account"]});

    if (Auth.isAuthorized(user, ["view applications"]) || application.account.id === user.id) {
      return application;
    }
    else {
      throw new UnauthorizedError("You do not have sufficient permissions to access specific applications.");
    }
  }

  @Patch("/applications/:id/")
  public async patch(@CurrentUser({ required: true }) user: Account, @Param("id") id: string, @Body() application: object) {
    const curApplication = await Application.findOne({ id }, {relations: ["account"]});

    if (Auth.isAuthorized(user, ["modify applications"]) || curApplication.account.id === user.id) {
      await Application.update(id, application);
      return Application.findOne({ id });
    }
    else {
      throw new UnauthorizedError("You do not have sufficient permissions to modify applications.");
    }
  }

  @Delete("/applications/:id/")
  @OnUndefined(204)
  public async remove(@CurrentUser({ required: true }) user: Account, @Param("id") id: string) {
    const application = await Application.findOne({ id }, {relations: ["account"]});

    if (Auth.isAuthorized(user, ["delete applications"]) || application.account.id === user.id) {
      return Application.delete({ id });
    }
    else {
      throw new UnauthorizedError("You do not have sufficient permissions to delete applications.");
    }
  }
}
