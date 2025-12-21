import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import crypto from "crypto";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
].join(" ");

export async function GET() {
  try {
    const supabase = await createClient();
    const adminClient = createAdminClient();

    // Check if user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    // Generate state for CSRF protection
    const state = crypto.randomBytes(32).toString("hex");

    // Store state in database with expiry
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    const { error: stateError } = await adminClient
      .from("oauth_states")
      .insert({
        state,
        user_id: session.user.id,
        expires_at: expiresAt.toISOString(),
      });

    if (stateError) {
      console.error("Error storing OAuth state:", stateError);
      return NextResponse.json(
        { error: "Failed to initiate OAuth flow" },
        { status: 500 }
      );
    }

    // Build Google OAuth URL
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/google/callback`,
      response_type: "code",
      scope: SCOPES,
      state,
      access_type: "offline",
      prompt: "consent", // Force consent to get refresh token
    });

    const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error("Error in Google authorize:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
