/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { waitlistEmailHTML, waitlistEmailText } from "@/app/emails/waitlist_temp";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const candidate = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidate)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error: dbError } = await supabase
      .from("waitlist")
      .insert([{ email: candidate }]);

    if (dbError) {
      if (dbError && "code" in dbError && dbError.code === "23505") {
      } else {
        return NextResponse.json({ error: dbError.message }, { status: 500 });
      }
    }

    const updatesUrl = process.env.EMAIL_UPDATES_URL || "https://yourdomain.com/updates";
    const from = process.env.EMAIL_FROM || "team@waitlist.synklist.com";

    await resend.emails.send({
      from,
      to: candidate,
      subject: "You're on the SynkList Waitlist",
      html: waitlistEmailHTML({ email: candidate, updatesUrl }),
      text: waitlistEmailText({ updatesUrl }),
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
