"use client";

import { Button, Input, Label } from "@/components/ui";
import { useActionState } from "react";
import { login } from "@/app/(auth)/actions";
import Link from "next/link";

export default function LogIn() {
  const [errors, formAction, isSubmitting] = useActionState(login, null);

  return (
    <div>
      <form action={formAction}>
        <h1>Welcome back</h1>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" placeholder="name@example.com" />

        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" placeholder="Password" />

        {errors?.message && <p className="text-red-500">{errors.message}</p>}

        <Button type="submit" disabled={isSubmitting}>
          Log In
        </Button>
      </form>
      <div className="mt-8 pb-6 text-center text-sm">
        A new user?{" "}
        <Link href="/signup" className="text-primary underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
