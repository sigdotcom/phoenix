import {
  BadRequestError,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Patch,
  Post,
  UnauthorizedError
} from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import { Account } from "../entity/Account";
import { Application } from "../entity/Application";
import * as Auth from "../lib/auth";

@JsonController()
export class AccountController {
  @Get("/accounts/")
  public async getAll(@CurrentUser({ required: true }) user: Account) {
    return Account.find();
  }

  @Post("/accounts/")
  public save(
    @CurrentUser({ required: true }) user: Account,
    @EntityFromBody() account: Account
  ) {
    if (Auth.isAuthorized(user, ["create accounts"])) {
      return account.save();
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permissions to create a new user."
      );
    }
  }

  @Get("/accounts/:id/")
  public async get(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string
  ) {
    if (
      id === user.id ||
      Auth.isAuthorized(user, ["access specific accounts"])
    ) {
      return Account.findOne(
        { id },
        { relations: ["groups", "permissions", "applications"] }
      );
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permissions to access specific users."
      );
    }
  }

  @Patch("/accounts/:id/")
  public async patch(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string,
    @Body() account: object
  ) {
    if (
      id === user.id ||
      Auth.isAuthorized(user, ["modify specific accounts"])
    ) {
      if (
        !Auth.isAuthorized(user, ["modify specific accounts"]) &&
        (account as any).isSuperAdmin
      ) {
        throw new BadRequestError(
          'Attempting to change "isSuperAdmin" without permissions'
        );
      }
      await Account.update(id, account);
      return Account.findOne({ id });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permissions to modify specific users."
      );
    }
  }

  @Delete("/accounts/:id/")
  @OnUndefined(204)
  public async remove(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string
  ) {
    if (
      id === user.id ||
      Auth.isAuthorized(user, ["delete specific accounts"])
    ) {
      return Account.delete({ id });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permissions to delete specific users."
      );
    }
  }

  @Post("/accounts/:id/applications/")
  public async create_app(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string,
    @EntityFromBody() application: Application
  ) {
    if (
      id === user.id ||
      Auth.isAuthorized(user, ["create user application"])
    ) {
      const foundUser = await Account.findOne({ id });
      application.account = foundUser;
      return application.save();
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permissions to create an application for a specific user."
      );
    }
  }
}
