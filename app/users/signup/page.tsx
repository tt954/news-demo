"use client";

import { signup } from "@/actions/auth";
import { Input, Label, Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActionState } from "react";

export default function SignUpPage() {
  const [state, formAction, isSubmitting] = useActionState(signup, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
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
              {state?.errors && state?.errors?.email && (
                <p className="text-red-500">{state.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state?.errors && state?.errors?.password && (
                <p className="text-red-500">{state.errors.password}</p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </form>
        {/* <div className="px-8 pb-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Sign in
            </Link>
          </div> */}
      </Card>
    </div>
  );
}
