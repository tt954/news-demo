"use client";

import { Button, Input, Label } from "@/components/ui";
import { useActionState } from "react";
import { login } from "@/app/(auth)/actions";
import Link from "next/link";

export default function LogIn() {
  const [errors, formAction, isSubmitting] = useActionState(login, null);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-6 text-2xl font-bold">Welcome back</h1>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="name@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Password" />
        </div>

        {errors?.message && <p className="text-red-500">{errors.message}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full">
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
