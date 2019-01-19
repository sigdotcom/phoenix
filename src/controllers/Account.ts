import * as Routing from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";
import { Account } from "../entity/Account";

@Routing.JsonController()
export class AccountController {

  @Routing.Get("/accounts/")
  @Routing.Authorized()
  public async getAll() {
    return Account.find({relations: ["permissions", "groups", ]});
  }
  @Routing.Post("/accounts/")
  public save(@EntityFromBody() account: Account) {
      return account.save();
  }

  @Routing.Get("/accounts/:id/")
  public get(@Routing.Param("id") id: string) {
    return Account.findOne({ id });
  }

  @Routing.Patch("/accounts/:id/")
  public async patch(@Routing.Param("id") id: string, @Routing.Body() account: object) {
    await Account.update(id, account);
    return Account.findOne({ id });
  }

  @Routing.Delete("/accounts/:id/")
  @Routing.OnUndefined(204)
  public async remove(@Routing.Param("id") id: string) {
    return Account.delete({ id });
  }
}
