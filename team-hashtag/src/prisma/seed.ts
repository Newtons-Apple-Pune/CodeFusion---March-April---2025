import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const hashedPassword = await bcrypt.hash("adminpassword", 10);

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("testpassword", 10);

  await prisma.user.upsert({
    where: { email: "test@cybersecure.ai" },
  update: {},
  create: {
    email: "test@cybersecure.ai",
    name: "Test User",
    password: hashedPassword, 
    role: "admin",
    },
  });

  console.log("✅ Seeded admin user");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
