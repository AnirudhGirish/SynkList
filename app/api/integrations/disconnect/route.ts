import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const adminClient = createAdminClient();

    // Check if user is authenticated - using getUser() for security
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { platform, deleteData = false } = body;

    if (!platform) {
      return NextResponse.json(
        { error: "Platform name is required" },
        { status: 400 }
      );
    }

    // Get the connection first
    const { data: connection, error: connectionError } = await adminClient
      .from("platform_connections")
      .select("id")
      .eq("user_id", user.id)
      .eq("platform_name", platform)
      .single();

    if (connectionError || !connection) {
      return NextResponse.json(
        { error: "Platform connection not found" },
        { status: 404 }
      );
    }

    // If user wants to delete their data, delete messages first
    if (deleteData) {
      const { error: messagesError } = await adminClient
        .from("messages")
        .delete()
        .eq("platform_connection_id", connection.id)
        .eq("user_id", user.id);

      if (messagesError) {
        console.error("Error deleting messages:", messagesError);
      }
    }

    // Delete the platform connection
    const { error: deleteError } = await adminClient
      .from("platform_connections")
      .delete()
      .eq("id", connection.id)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Error disconnecting platform:", deleteError);
      return NextResponse.json(
        { error: "Failed to disconnect platform" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: deleteData 
        ? "Platform disconnected and data deleted" 
        : "Platform disconnected (data preserved)"
    });
  } catch (error) {
    console.error("Error in disconnect:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
