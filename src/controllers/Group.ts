import { Body, Delete, Get, Param, Patch, Put, JsonController, OnUndefined } from "routing-controllers";
import { EntityFromParam } from "typeorm-routing-controllers-extensions";
import { Group } from "../entity/Group";

@JsonController()
export class GroupController {
    @Get("/groups/")
    public async getAll() {
      return Group.find();
    }

  /**
   * TODO: Waiting for
   * https://github.com/typeorm/typeorm-routing-controllers-extensions/pull/12
   * which allows strings to be parsed.
   * @Get("/groups/:id")
   * public get(@EntityFromParam("id") group: Group) {
   *   return group;
   * }
   */
  @Get("/groups/:name/")
  public async get(@Param("name") name: string) {
    return Group.findOne({name});
  }

  /**
   * TODO: Save for when permissions are added
   * @Put("/groups/:id/")
   * public async put(@Param("id") id: string, @Body() group: Group) {
   *    return Group.update(id, group);
   * }
   *
   * @Patch("/groups/:id/")
   * public async patch(@Param("id") id: string, @Body() group: object) {
   *    return Group.update(id, group);
   * }
   *
   * @Delete("/groups/:id/")
   * @OnUndefined(204)
   * public async remove(@Param("id") id: string) {
   *   return Group.delete({id});
   * }
   */
}
