import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import type { GmailListResponse, GmailMessage } from "@/lib/types/database";

const GMAIL_API_URL = "https://gmail.googleapis.com/gmail/v1";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

// Helper to refresh access token
async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  expires_at: number;
} | null> {
  try {
    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Token refresh error:", data);
      return null;
    }

    return {
      access_token: data.access_token,
      expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

// Helper to extract email header value
function getHeader(headers: Array<{ name: string; value: string }>, name: string): string {
  const header = headers.find((h) => h.name.toLowerCase() === name.toLowerCase());
  return header?.value || "";
}

// Helper to decode base64url encoded content
function decodeBase64Url(data: string): string {
  try {
    // Replace URL-safe characters and add padding
    const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
    const padding = base64.length % 4;
    const paddedBase64 = padding ? base64 + "=".repeat(4 - padding) : base64;
    return Buffer.from(paddedBase64, "base64").toString("utf-8");
  } catch {
    return "";
  }
}

// Helper to extract plain text or HTML from email payload
function extractEmailBody(payload: GmailMessage["payload"]): string {
  // Check if body has data directly
  if (payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }

  // Check parts for text/plain first, then text/html
  if (payload.parts) {
    // First try to find text/plain
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        return decodeBase64Url(part.body.data);
      }
    }
    // Fallback to text/html
    for (const part of payload.parts) {
      if (part.mimeType === "text/html" && part.body?.data) {
        // Strip HTML tags for plain text display
        const html = decodeBase64Url(part.body.data);
        return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      }
    }
    // Check nested multipart
    for (const part of payload.parts) {
      if (part.mimeType?.startsWith("multipart/") && part.parts) {
        for (const subpart of part.parts) {
          if (subpart.mimeType === "text/plain" && subpart.body?.data) {
            return decodeBase64Url(subpart.body.data);
          }
        }
      }
    }
  }

  return "";
}



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

    // Get Google connection
    const { data: connection, error: connectionError } = await adminClient
      .from("platform_connections")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("platform_name", "google")
      .eq("is_active", true)
      .single();

    if (connectionError || !connection) {
      return NextResponse.json(
        { error: "Google account not connected. Please connect your Google account first." },
        { status: 400 }
      );
    }

    let accessToken = connection.access_tokens.access_token;
    const refreshToken = connection.access_tokens.refresh_token;
    const expiresAt = connection.access_tokens.expires_at;

    // Check if token is expired or about to expire (within 5 minutes)
    const isExpired = expiresAt && expiresAt < Math.floor(Date.now() / 1000) + 300;

    if (isExpired && refreshToken) {
      const newTokens = await refreshAccessToken(refreshToken);
      
      if (newTokens) {
        accessToken = newTokens.access_token;

        // Update stored tokens
        await adminClient
          .from("platform_connections")
          .update({
            access_tokens: {
              ...connection.access_tokens,
              access_token: newTokens.access_token,
              expires_at: newTokens.expires_at,
            },
            updated_at: new Date().toISOString(),
          })
          .eq("id", connection.id);
      } else {
        return NextResponse.json(
          { error: "Failed to refresh Google access. Please reconnect your Google account." },
          { status: 401 }
        );
      }
    }

    // Fetch list of messages
    const listResponse = await fetch(
      `${GMAIL_API_URL}/users/me/messages?maxResults=5&labelIds=INBOX`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!listResponse.ok) {
      const errorData = await listResponse.json();
      console.error("Gmail API error:", errorData);
      
      if (listResponse.status === 401) {
        return NextResponse.json(
          { error: "Google access expired. Please reconnect your Google account." },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to fetch emails from Gmail" },
        { status: 500 }
      );
    }

    const listData: GmailListResponse = await listResponse.json();

    if (!listData.messages || listData.messages.length === 0) {
      // Update last sync time
      await adminClient
        .from("platform_connections")
        .update({
          last_sync: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", connection.id);

      return NextResponse.json({ messages: [] });
    }

    // Fetch full details for each message
    const messages = await Promise.all(
      listData.messages.map(async (msg) => {
        const msgResponse = await fetch(
          `${GMAIL_API_URL}/users/me/messages/${msg.id}?format=full`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!msgResponse.ok) {
          return null;
        }

        const msgData: GmailMessage = await msgResponse.json();

        const subject = getHeader(msgData.payload.headers, "Subject");
        const from = getHeader(msgData.payload.headers, "From");
        const to = getHeader(msgData.payload.headers, "To");
        const date = getHeader(msgData.payload.headers, "Date");
        const isRead = !msgData.labelIds.includes("UNREAD");

        // Parse sender name/email
        let sender = from;
        let senderEmail = from;
        const emailMatch = from.match(/<(.+)>/);
        if (emailMatch) {
          const name = from.split("<")[0].trim().replace(/"/g, "");
          sender = name || emailMatch[1];
          senderEmail = emailMatch[1];
        }

        // Extract full body content
        const body = extractEmailBody(msgData.payload);

        return {
          id: msgData.id,
          subject: subject || "(No Subject)",
          sender,
          senderEmail,
          to,
          snippet: msgData.snippet,
          body,
          date: date ? new Date(date).toISOString() : new Date(parseInt(msgData.internalDate)).toISOString(),
          isRead,
          threadId: msgData.threadId,
          labelIds: msgData.labelIds,
        };
      })
    );

    // Filter out any failed fetches
    const validMessages = messages.filter(Boolean);

    // Update last sync time
    await adminClient
      .from("platform_connections")
      .update({
        last_sync: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", connection.id);

    return NextResponse.json({ messages: validMessages });
  } catch (error) {
    console.error("Error fetching Gmail messages:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching emails" },
      { status: 500 }
    );
  }
}
