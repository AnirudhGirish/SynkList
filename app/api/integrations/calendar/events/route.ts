import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

const GOOGLE_CALENDAR_API = "https://www.googleapis.com/calendar/v3";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      return data.access_token;
    }
    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const adminClient = createAdminClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get calendar connection
    const { data: connection, error: connectionError } = await adminClient
      .from("platform_connections")
      .select("*")
      .eq("user_id", user.id)
      .eq("platform_name", "calendar")
      .eq("is_active", true)
      .single();

    if (connectionError || !connection) {
      return NextResponse.json(
        { error: "Calendar not connected. Please connect your Google Calendar first." },
        { status: 400 }
      );
    }

    let accessToken = connection.access_tokens?.access_token;
    const refreshToken = connection.access_tokens?.refresh_token;
    const expiresAt = connection.access_tokens?.expires_at;

    // Check if token needs refresh
    if (expiresAt && Date.now() / 1000 > expiresAt - 300) {
      if (!refreshToken) {
        return NextResponse.json(
          { error: "Session expired. Please reconnect your Calendar." },
          { status: 401 }
        );
      }

      const newAccessToken = await refreshAccessToken(refreshToken);
      if (!newAccessToken) {
        return NextResponse.json(
          { error: "Failed to refresh session. Please reconnect your Calendar." },
          { status: 401 }
        );
      }

      accessToken = newAccessToken;

      // Update token in database
      await adminClient
        .from("platform_connections")
        .update({
          access_tokens: {
            ...connection.access_tokens,
            access_token: newAccessToken,
            expires_at: Math.floor(Date.now() / 1000) + 3600,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", connection.id);
    }

    // Get calendar list first
    const calendarsResponse = await fetch(
      `${GOOGLE_CALENDAR_API}/users/me/calendarList`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!calendarsResponse.ok) {
      const errorData = await calendarsResponse.json();
      console.error("Calendar list error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch calendars" },
        { status: 500 }
      );
    }

    const calendarsData = await calendarsResponse.json();
    const calendars = calendarsData.items || [];

    // Get events from primary calendar and any other selected calendars
    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Next 30 days

    const allEvents: CalendarEvent[] = [];

    // Fetch events from primary calendar
    const eventsResponse = await fetch(
      `${GOOGLE_CALENDAR_API}/calendars/primary/events?` +
        new URLSearchParams({
          timeMin,
          timeMax,
          maxResults: "50",
          singleEvents: "true",
          orderBy: "startTime",
        }),
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (eventsResponse.ok) {
      const eventsData = await eventsResponse.json();
      const events = eventsData.items || [];

      for (const event of events) {
        allEvents.push({
          id: event.id,
          title: event.summary || "(No title)",
          description: event.description || "",
          location: event.location || "",
          start: event.start?.dateTime || event.start?.date || "",
          end: event.end?.dateTime || event.end?.date || "",
          isAllDay: !event.start?.dateTime,
          status: event.status || "confirmed",
          htmlLink: event.htmlLink || "",
          attendees: (event.attendees || []).map((a: { email: string; displayName?: string; responseStatus?: string }) => ({
            email: a.email,
            name: a.displayName || a.email,
            responseStatus: a.responseStatus || "needsAction",
          })),
          organizer: event.organizer ? {
            email: event.organizer.email,
            name: event.organizer.displayName || event.organizer.email,
            self: event.organizer.self || false,
          } : null,
          calendarId: "primary",
          colorId: event.colorId || null,
          recurringEventId: event.recurringEventId || null,
          created: event.created || "",
          updated: event.updated || "",
        });
      }
    }

    // Update last sync time
    await adminClient
      .from("platform_connections")
      .update({ last_sync: new Date().toISOString() })
      .eq("id", connection.id);

    // Sort events by start time
    allEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    // Group events by date for easier display
    const groupedEvents: { [date: string]: CalendarEvent[] } = {};
    for (const event of allEvents) {
      const dateKey = new Date(event.start).toISOString().split("T")[0];
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    }

    return NextResponse.json({
      events: allEvents,
      groupedEvents,
      calendars: calendars.map((c: { id: string; summary: string; backgroundColor?: string; primary?: boolean }) => ({
        id: c.id,
        name: c.summary,
        color: c.backgroundColor,
        primary: c.primary || false,
      })),
      totalCount: allEvents.length,
    });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  isAllDay: boolean;
  status: string;
  htmlLink: string;
  attendees: { email: string; name: string; responseStatus: string }[];
  organizer: { email: string; name: string; self: boolean } | null;
  calendarId: string;
  colorId: string | null;
  recurringEventId: string | null;
  created: string;
  updated: string;
};
