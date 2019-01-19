import * as Routing from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";
import { Group } from "../entity/Group";

@Routing.JsonController()
export class GroupController {
  @Routing.Get("/groups/")
  public async getAll() {
    return Group.find({ relations: ["accounts"] });
  }
  @Routing.Post("/groups/")
  public save(@EntityFromBody() group: Group) {
      return group.save();
  }

  @Routing.Get("/groups/:name/")
  public get(@Routing.Param("name") name: string) {
    return Group.findOne({ name });
  }

  @Routing.Patch("/groups/:name/")
  public async patch(@Routing.Param("name") name: string, @Routing.Body() group: object) {
    await Group.update(name, group);
    return Group.findOne({ name });
  }

  @Routing.Delete("/groups/:name/")
  @Routing.OnUndefined(204)
  public async remove(@Routing.Param("name") name: string) {
    return Group.delete({ name });
  }
}
