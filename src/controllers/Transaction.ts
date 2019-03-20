import {
  Body,
  CurrentUser,
  Delete,
  Get,
  InternalServerError,
  JsonController,
  OnUndefined,
  Param,
  Patch,
  Post,
  UnauthorizedError
} from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import * as Stripe from "stripe";

import * as Auth from "../lib/auth";

import { config } from "../config";
import { Account } from "../entity/Account";
import { Transaction } from "../entity/Transaction";

const stripe = new Stripe(config.STRIPE_PRIVATE_TOKEN);

@JsonController()
export class TransactionController {
  @Get("/transactions/")
  public async getAll(@CurrentUser({ required: true }) user: Account) {
    if (Auth.isAuthorized(user, ["view transactions"])) {
      return Transaction.find({ relations: ["account", "product"] });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to view transactions."
      );
    }
  }

  @Get("/transactions/:id/")
  public get(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string
  ) {
    if (Auth.isAuthorized(user, ["view transactions"])) {
      return Transaction.findOne({ id }, { relations: ["account", "product"] });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to view specific transactions."
      );
    }
  }

  @Delete("/transactions/:id/")
  @OnUndefined(204)
  public async remove(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string
  ) {
    if (Auth.isAuthorized(user, ["delete specific transactions"])) {
      return Transaction.delete({ id });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to delete specific transactions."
      );
    }
  }
}
