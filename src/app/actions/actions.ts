"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signInWithGithub = async () => {
  const supabase = createClient();
  const origin = headers().get("origin");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) console.error(error);
  if (data.url) return redirect(data.url);
};

export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error(error);
  return redirect("/login");
};

export const sendMail = async (formdata: FormData) => {
  const supabase = createClient();
  const to_email = formdata.get("to_email") as string;
  const subject = formdata.get("subject") as string;
  const body = formdata.get("body") as string;

  const { data, error } = await supabase
    .from("emails")
    .insert({
      to_email,
      subject,
      body,
    })
    .select()
    .single();

  if (error || data == null) {
    console.error(error?.message);
    return redirect("/error");
  }
  revalidatePath("/");
  return redirect(`/f/${data.id}`);
};
