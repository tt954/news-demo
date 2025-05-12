"use client";

import { signup } from "@/app/(auth)/actions";
import { Input, Label, Button } from "@/components/ui";
import Link from "next/link";
import { useActionState } from "react";

export default function SignUpPage() {
  const [errors, formAction, isSubmitting] = useActionState(signup, null);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-6 text-2xl font-bold">Create an account</h1>

      <form className="space-y-4" action={formAction}>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {errors?.message && <p className="text-red-500">{errors.message}</p>}

        <Button className="w-full" disabled={isSubmitting}>
          Create account
        </Button>
      </form>

      <div className="mt-8 pb-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
