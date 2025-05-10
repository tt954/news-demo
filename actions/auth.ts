"use server";

import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/session";
import type { User } from "@prisma/client";
import { redirect } from "next/navigation";

export async function signup(prevState: unknown, formData: FormData) {
  // 1. Get form fields
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  // 2. Validate form fields
  let errors: any = {};
  if (
    typeof email !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string"
  ) {
    errors.message = "Invalid or missing fields";
  }
  if (email && !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }
  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  // TODO: check password strength using haveibeenpwned

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // 3. Create user
  const user = await createUser(email, name, password);
  // TODO: email verification

  // 5. Create user session
  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  // 6. Redirect user
  return redirect("/create");
}

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
