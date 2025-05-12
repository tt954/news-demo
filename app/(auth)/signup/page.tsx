"use client";

import { signup } from "@/app/(auth)/actions";
import { Input, Label, Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useActionState } from "react";

export default function SignUpPage() {
  const [errors, formAction, isSubmitting] = useActionState(signup, null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-md h-max">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>

        <form className="" action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            {errors?.message && (
              <p className="text-red-500">{errors.message}</p>
            )}
          </CardContent>

          <CardFooter className="mt-8">
            <Button className="w-full" disabled={isSubmitting}>
              Create account
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-8 pb-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
