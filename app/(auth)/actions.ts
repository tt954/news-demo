"use server";

import { hashPassword, verifyPasswordHash } from "@/lib/password";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/session";
import { createUser, getUserByEmail } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState: unknown, formData: FormData) {
  // 1. Get form fields
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (
    typeof email !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string"
  ) {
    return { message: "Invalid or missing fields" };
  }
  if (email && !email.includes("@")) {
    return { message: "Please enter a valid email" };
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { message: "An account already exist with this email" };
  }

  if (password.trim().length < 8) {
    return { message: "Password must be at least 8 characters long" };
  }
  // TODO: check password strength using haveibeenpwned

  // 3. Create user
  const newUser = await createUser(email, name, password);
  // TODO: email verification

  // 5. Create user session
  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, newUser.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  // 6. Redirect user
  return redirect("/create");
}

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { message: "Invalid or missing fields" };
  }
  if (email === "" || password === "") {
    return { message: "Please enter your email and password" };
  }
  // TODO verify if email is valid

  const user = await getUserByEmail(email);
  if (!user) {
    return { message: "An account does not exist with this email" };
  }

  const passwordHash = await hashPassword(password);
  const isValidPassword = await verifyPasswordHash(passwordHash, user.password);
  if (!isValidPassword) {
    return { message: "Invalid password. Try again" };
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  return redirect("/create");
}
