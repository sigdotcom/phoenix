import { Body, Delete, Get, Param, Patch, Put, JsonController, OnUndefined } from "routing-controllers";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import { Account } from "../entity/Account";

@JsonController()
export class AccountController {
    @Get("/accounts/")
    public async getAll() {
      return Account.find({relations: ["permissions", "groups", ]});
    }

  /**
   * TODO: Waiting for
   * https://github.com/typeorm/typeorm-routing-controllers-extensions/pull/12
   * which allows strings to be parsed.
   * @Get("/accounts/:id")
   * public get(@EntityFromParam("id") account: Account) {
   *   return account;
   * }
   */
  @Get("/accounts/:id/")
  public async get(@Param("id") id: string) {
    return Account.findOne({id}, {relations: ["permissions", "groups", ]});
  }

  /**
   * TODO: Save for when permissions are added
   * @Put("/accounts/:id/")
   * public async put(@Param("id") id: string, @Body() account: Account) {
   *    return Account.update(id, account);
   * }
   *
   * @Patch("/accounts/:id/")
   * public async patch(@Param("id") id: string, @Body() account: object) {
   *    return Account.update(id, account);
   * }
   *
   * @Delete("/accounts/:id/")
   * @OnUndefined(204)
   * public async remove(@Param("id") id: string) {
   *   return Account.delete({id});
   * }
   */
}
