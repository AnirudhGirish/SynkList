import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Handle errors from Google
  if (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(
      `${baseUrl}/dashboard?error=${encodeURIComponent("Google authorization was denied")}`
    );
  }

  // Validate required params
  if (!code || !state) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard?error=${encodeURIComponent("Missing authorization parameters")}`
    );
  }

  try {
    const adminClient = createAdminClient();

    // Verify state and get user_id
    const { data: stateData, error: stateError } = await adminClient
      .from("oauth_states")
      .select("user_id, expires_at")
      .eq("state", state)
      .single();

    if (stateError || !stateData) {
      console.error("Invalid OAuth state:", stateError);
      return NextResponse.redirect(
        `${baseUrl}/dashboard?error=${encodeURIComponent("Invalid or expired authorization request")}`
      );
    }

    // Check if state has expired
    if (new Date(stateData.expires_at) < new Date()) {
      // Clean up expired state
      await adminClient.from("oauth_states").delete().eq("state", state);
      return NextResponse.redirect(
        `${baseUrl}/dashboard?error=${encodeURIComponent("Authorization request expired. Please try again.")}`
      );
    }

    const userId = stateData.user_id;

    // Exchange code for tokens
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${baseUrl}/api/integrations/google/callback`,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("Token exchange error:", tokenData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard?error=${encodeURIComponent("Failed to complete Google authorization")}`
      );
    }

    // Get user info from Google
    const userInfoResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userInfo = await userInfoResponse.json();

    if (!userInfo.email) {
      return NextResponse.redirect(
        `${baseUrl}/dashboard?error=${encodeURIComponent("Failed to get user information from Google")}`
      );
    }

    // Calculate token expiry
    const expiresAt = tokenData.expires_in
      ? Math.floor(Date.now() / 1000) + tokenData.expires_in
      : null;

    // Store or update platform connection
    const { error: upsertError } = await adminClient
      .from("platform_connections")
      .upsert(
        {
          user_id: userId,
          platform_name: "google",
          platform_user_id: userInfo.email,
          access_tokens: {
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            expires_at: expiresAt,
            token_type: tokenData.token_type,
            scope: tokenData.scope,
          },
          is_active: true,
          last_sync: null,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,platform_name",
        }
      );

    if (upsertError) {
      console.error("Error storing connection:", upsertError);
      return NextResponse.redirect(
        `${baseUrl}/dashboard?error=${encodeURIComponent("Failed to save Google connection")}`
      );
    }

    // Clean up used state
    await adminClient.from("oauth_states").delete().eq("state", state);

    // Redirect to dashboard with success
    return NextResponse.redirect(`${baseUrl}/dashboard?google_connected=true`);
  } catch (error) {
    console.error("Error in Google callback:", error);
    return NextResponse.redirect(
      `${baseUrl}/dashboard?error=${encodeURIComponent("An unexpected error occurred")}`
    );
  }
}
