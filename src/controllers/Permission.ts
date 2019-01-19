import * as Routing from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";
import { Permission } from "../entity/Permission";

@Routing.JsonController()
export class PermissionController {
  @Routing.Get("/permissions/")
  public async getAll() {
    return Permission.find();
  }
  @Routing.Post("/permissions/")
  public save(@EntityFromBody() permission: Permission) {
      return permission.save();
  }

  @Routing.Get("/permissions/:name/")
  public get(@Routing.Param("name") name: string) {
    return Permission.findOne({ name });
  }

  @Routing.Patch("/permissions/:name/")
  public async patch(@Routing.Param("name") name: string, @Routing.Body() permission: object) {
    await Permission.update(name, permission);
    return Permission.findOne({ name });
  }

  @Routing.Delete("/permissions/:name/")
  @Routing.OnUndefined(204)
  public async remove(@Routing.Param("name") name: string) {
    return Permission.delete({ name });
  }
}
