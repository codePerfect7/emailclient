"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { User } from "@supabase/auth-js";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Inbox, Send } from "lucide-react";

type Props = {
  emails: Email[];
  user: User;
};

export default function Navlinks({ emails, user }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      {emails.map((email) => {
        return (
          <Link href={`/f/${email.id}`} key={email.id} className={"w-full"}>
            <Button
              className={"flex md:flex-col w-full justify-center p-4 h-fit"}
              variant={
                segment != null && segment == `${email.id}`
                  ? "secondary"
                  : "outline"
              }
            >
              <div>
                {email.from_email == user?.email ? <Send /> : <Inbox />}
              </div>
              <div className="flex flex-col p-2">
                <p>
                  {email.from_email == user?.email
                    ? `To: ${email.to_email}`
                    : `From: ${email.from_email}`}
                </p>
                <p>{email.subject}</p>
              </div>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
