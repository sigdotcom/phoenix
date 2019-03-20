import {
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

import * as Auth from "../lib/auth";

import { Account } from "../entity/Account";
import { ProductCategory } from "../entity/ProductCategory";

@JsonController()
export class CategoryController {
  @Get("/categories/")
  public async getAll(@CurrentUser({ required: true }) user: Account) {
    if (Auth.isAuthorized(user, ["view categories"])) {
      return ProductCategory.find({ relations: ["products"] });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to view categories."
      );
    }
  }

  @Post("/categories/")
  public save(
    @CurrentUser({ required: true }) user: Account,
    @EntityFromBody() category: ProductCategory
  ) {
    if (Auth.isAuthorized(user, ["create categories"])) {
      return category.save();
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to create a new category."
      );
    }
  }

  @Get("/categories/:name/")
  public get(
    @CurrentUser({ required: true }) user: Account,
    @Param("name") name: string
  ) {
    if (Auth.isAuthorized(user, ["view categories"])) {
      return ProductCategory.findOne({ name }, { relations: ["products"] });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to view specific categories."
      );
    }
  }

  @Patch("/categories/:name/")
  public async patch(
    @CurrentUser({ required: true }) user: Account,
    @Param("name") name: string,
    @Body() category: object
  ) {
    if (Auth.isAuthorized(user, ["modify categories"])) {
      await ProductCategory.update(name, category);
      return ProductCategory.findOne({ name });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to modify specific categories."
      );
    }
  }

  @Delete("/categories/:name/")
  @OnUndefined(204)
  public async remove(
    @CurrentUser({ required: true }) user: Account,
    @Param("name") name: string
  ) {
    if (Auth.isAuthorized(user, ["delete specific categories"])) {
      return ProductCategory.delete({ name });
    } else {
      throw new UnauthorizedError(
        "You do not have sufficient permission to delete specific categories."
      );
    }
  }
}
