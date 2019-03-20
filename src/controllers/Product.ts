import {
  Body,
  BodyParam,
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
import { Product } from "../entity/Product";
import { Transaction } from "../entity/Transaction";

const stripe = new Stripe(config.STRIPE_PRIVATE_TOKEN);

@JsonController()
export class ProductController {
  @Get("/products/")
  public async getAll(@CurrentUser({ required: true }) user: Account) {
    if (Auth.isAuthorized(user, ["view products"])) {
      return Product.find({ relations: ["transactions", "categories"] });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to view products."
      );
    }
  }

  @Post("/products/")
  public save(
    @CurrentUser({ required: true }) user: Account,
    @EntityFromBody() product: Product
  ) {
    if (Auth.isAuthorized(user, ["create products"])) {
      return product.save();
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to create a new product."
      );
    }
  }

  @Get("/products/:id/")
  public get(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string
  ) {
    if (Auth.isAuthorized(user, ["view products"])) {
      return Product.findOne(
        { id },
        { relations: ["transactions", "categories"] }
      );
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to view specific products."
      );
    }
  }

  @Patch("/products/:id/")
  public async patch(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string,
    @Body() product: object
  ) {
    if (Auth.isAuthorized(user, ["modify products"])) {
      await Product.update(id, product);
      return Product.findOne({ id });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to modify specific products."
      );
    }
  }

  @Delete("/products/:id/")
  @OnUndefined(204)
  public async remove(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string
  ) {
    if (Auth.isAuthorized(user, ["delete specific products"])) {
      return Product.delete({ id });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to delete specific products."
      );
    }
  }

  @Post("/products/:id/transactions/")
  public async save_transaction(
    @CurrentUser({ required: true }) user: Account,
    @Param("id") id: string,
    @BodyParam("token") token: string
  ) {
    const product = await Product.findOne({ id });
    try {
      const charge = await stripe.charges.create({
        amount: product.price * 100,
        currency: "usd",
        description: product.description,
        receipt_email: user.email,
        source: token
      });
      const transaction = new Transaction();
      transaction.id = charge.id;
      transaction.account = user;
      transaction.product = product;
      await transaction.save();

      return product.save();
    } catch (error) {
      switch (error.type) {
        case "StripeAuthenticationError":
          throw new InternalServerError(
            "Invalid stripe credentials provided. Please contact acm@mst.edu."
          );
          break;
        default:
          throw new InternalServerError(
            "Error occurred while processing transaction. Please contact acm@mst.edu."
          );
          break;
      }
    }
  }
}
