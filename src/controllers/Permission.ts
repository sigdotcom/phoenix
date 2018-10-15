import { Body, Delete, Get, Param, Patch, Put, JsonController, OnUndefined } from "routing-controllers";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import { Permission } from "../entity/Permission";

@JsonController()
export class PermissionController {
    @Get("/permissions/")
    public async getAll() {
      return Permission.find();
    }

  /**
   * TODO: Waiting for
   * https://github.com/typeorm/typeorm-routing-controllers-extensions/pull/12
   * which allows strings to be parsed.
   * @Get("/permissions/:id")
   * public get(@EntityFromParam("id") permission: Permission) {
   *   return permission;
   * }
   */
  @Get("/permissions/:name/")
  public async get(@Param("name") name: string) {
    return Permission.findOne({name});
  }

  /**
   * TODO: Save for when permissions are added
   * @Put("/permissions/:id/")
   * public async put(@Param("id") id: string, @Body() permission: Permission) {
   *    return Permission.update(id, permission);
   * }
   *
   * @Patch("/permissions/:id/")
   * public async patch(@Param("id") id: string, @Body() permission: object) {
   *    return Permission.update(id, permission);
   * }
   *
   * @Delete("/permissions/:id/")
   * @OnUndefined(204)
   * public async remove(@Param("id") id: string) {
   *   return Permission.delete({id});
   * }
   */
}
