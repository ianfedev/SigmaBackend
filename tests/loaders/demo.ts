import { Container, Service } from "typedi";
import UserService from "../../src/services/userService";
import GroupService from "../../src/services/groupService";
import { IUser } from "../../src/interfaces/IUser";
import { IGroup } from "../../src/interfaces/IGroup";

@Service()
export default class DemoLoader {

  private static async createDefaultUser(): Promise<IUser> {
    const userService : UserService = Container.get(UserService);
    return await userService.createUser(
      {
        name: "Administrator",
        email: "administrator@sigmabackend.github.io",
        password: "1234"
      }
    );
  }

  private static async createDefaultGroup(user : IUser): Promise<IGroup> {
    const groupService : GroupService = Container.get(GroupService);
    return await groupService.createGroup({name: "Administrative", admin: true} as IGroup, user);
  }

  private static async assignDefaultGroup(user : IUser, group : IGroup): Promise<void> {
    const groupService : GroupService = Container.get(GroupService);
    groupService.addUser(user._id, group._id);
  }

  public async generateDemoModels(): Promise<void> {
    const adminUser : IUser = await DemoLoader.createDefaultUser();
    const adminGroup : IGroup = await  DemoLoader.createDefaultGroup(adminUser);
    DemoLoader.assignDefaultGroup(adminUser, adminGroup);
  }

}
