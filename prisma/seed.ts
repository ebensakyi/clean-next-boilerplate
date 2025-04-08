// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const superadminEmail = "admin@example.com";
  const superadminPassword = "12345678";

  const existingUser = await prisma.user.findUnique({
    where: { email: superadminEmail },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(superadminPassword, 10);

    await prisma.user.create({
      data: {
        email: superadminEmail,
        password: hashedPassword,
        role: "SUPERADMIN",
      },
    });

    console.log(`✅ SuperAdmin seeded: ${superadminEmail}`);
  } else {
    console.log(`⚠️ SuperAdmin already exists: ${superadminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
