import { Button } from "@/components/ui";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { logout } from "@/app/(auth)/actions";

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect("/login");
  }
  return (
    <main>
      <form action={logout}>
        <Button>Log out</Button>
      </form>
      {children}
    </main>
  );
}
