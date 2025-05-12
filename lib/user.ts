import type { User } from "@prisma/client";
import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";

export async function createUser(
  email: string,
  name: string,
  password: string
): Promise<User> {
  const passwordHash = await hashPassword(password);
  return await prisma.user.create({
    data: {
      email,
      name,
      password: passwordHash,
      role: "user",
    },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
  });
}
