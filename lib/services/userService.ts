import { prisma } from "@/lib/db";
import type { CreateUserInput } from "@/lib/validation/userSchema";

export const UserService = {
  async createUser(data: CreateUserInput) {
    return prisma.user.create({ data });
  },

  async getAllUsers() {
    return prisma.user.findMany();
  },

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async updateUser(id: string, data: Partial<CreateUserInput>) {
    return prisma.user.update({ where: { id }, data });
  },

  async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  },
};
