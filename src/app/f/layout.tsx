import { createClient } from "@/utils/supabase/server";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/actions/actions";
import LogoutButton from "@/app/f/LogoutButton";
import Navlinks from "@/app/f/Navlinks";

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const { data } = await supabase
    .from("emails")
    .select("*")
    .order("id", { ascending: false });
  return (
    <div className={"block md:flex w-full min-h-screen"}>
      <div
        className={
          "w-full md:w-[30vw] flex flex-col gap-3 p-2 border md:fixed md:top-0 md:left-0 md:inset-0 overflow-y-auto"
        }
      >
        <Link href="/f/new">
          <Button className={"w-full"}>New</Button>
        </Link>
        <form action={signOut}>
          <LogoutButton from={user?.email ?? ""} />
        </form>
        {!data || !data.length ? (
          "No emails found. Use the new button to send"
        ) : (
          <Navlinks emails={data} user={user} />
        )}
      </div>
      <div className={"w-full md:pl-[30vw]"}>{children}</div>
    </div>
  );
}
