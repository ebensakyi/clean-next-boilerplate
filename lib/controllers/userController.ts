import { UserService } from "@/lib/services/userService";
import { CreateUserInput } from "@/lib/validation/userSchema";

export const UserController = {
  async handleCreateUser(data: CreateUserInput) {
    // You could add more logic here (e.g. check for existing email)
    const existing = await UserService.getUserByEmail(data.email);
    if (existing) {
      throw new Error("User already exists with this email");
    }

    return await UserService.createUser(data);
  },

  async handleGetAllUsers() {
    return await UserService.getAllUsers();
  },

  async handleUpdateUser(id: string, data: Partial<CreateUserInput>) {
    return await UserService.updateUser(id, data);
  },

  async handleDeleteUser(id: string) {
    return await UserService.deleteUser(id);
  },
};
