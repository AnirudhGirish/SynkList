import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

    // Parse request body
    const body = await request.json();
    const { 
      id, 
      subject, 
      sender, 
      senderEmail,
      content, 
      date, 
      isRead,
      platformConnectionId 
    } = body;

    if (!id || !sender || !platformConnectionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if message already pinned
    const { data: existingMessage } = await adminClient
      .from("messages")
      .select("id")
      .eq("external_id", id)
      .eq("user_id", session.user.id)
      .single();

    if (existingMessage) {
      return NextResponse.json(
        { error: "Message already pinned", alreadyPinned: true },
        { status: 400 }
      );
    }

    // Insert pinned message
    const { data: pinnedMessage, error: insertError } = await adminClient
      .from("messages")
      .insert({
        platform_connection_id: platformConnectionId,
        user_id: session.user.id,
        external_id: id,
        sender: senderEmail || sender,
        subject: subject || "(No Subject)",
        content: content || "",
        priority: "normal",
        status: "starred",
        is_read: isRead ?? false,
        message_date: date || new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error pinning message:", insertError);
      return NextResponse.json(
        { error: "Failed to pin message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: pinnedMessage,
      id: pinnedMessage.id 
    });
  } catch (error) {
    console.error("Error in pin message:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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

    // Parse request body
    const body = await request.json();
    const { externalId } = body;

    if (!externalId) {
      return NextResponse.json(
        { error: "Missing message ID" },
        { status: 400 }
      );
    }

    // Delete pinned message
    const { error: deleteError } = await adminClient
      .from("messages")
      .delete()
      .eq("external_id", externalId)
      .eq("user_id", session.user.id);

    if (deleteError) {
      console.error("Error unpinning message:", deleteError);
      return NextResponse.json(
        { error: "Failed to unpin message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in unpin message:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// GET pinned messages
export async function GET() {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    // Fetch pinned messages
    const { data: pinnedMessages, error: fetchError } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("status", "starred")
      .order("message_date", { ascending: false });

    if (fetchError) {
      console.error("Error fetching pinned messages:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch pinned messages" },
        { status: 500 }
      );
    }

    return NextResponse.json({ messages: pinnedMessages || [] });
  } catch (error) {
    console.error("Error in get pinned messages:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
