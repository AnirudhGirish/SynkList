"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, X } from "lucide-react";
import { IconBrandGmail, IconBrandSlack, IconBrandDiscord, IconBrandNotion } from "@tabler/icons-react";
import type { PlatformConnection, Message } from "@/lib/types/database";
import GmailTab from "@/app/components/notifications/GmailTab";
import CalendarTab from "@/app/components/notifications/CalendarTab";
import ComingSoonTab from "@/app/components/notifications/ComingSoonTab";

type Tab = "gmail" | "calendar" | "slack" | "discord" | "notion";

type EmailMessage = {
  id: string;
  subject: string;
  sender: string;
  senderEmail?: string;
  to?: string;
  snippet: string;
  body?: string;
  date: string;
  isRead: boolean;
};

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
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("gmail");
  const [loading, setLoading] = useState(true);
  const [gmailConnection, setGmailConnection] = useState<PlatformConnection | null>(null);
  const [calendarConnection, setCalendarConnection] = useState<PlatformConnection | null>(null);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  // Gmail state
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [fetchingEmails, setFetchingEmails] = useState(false);
  const [pinningId, setPinningId] = useState<string | null>(null);

  // Calendar state
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [groupedEvents, setGroupedEvents] = useState<{ [date: string]: CalendarEvent[] }>({});
  const [fetchingEvents, setFetchingEvents] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const tabs = [
    { id: "gmail" as Tab, name: "Gmail", icon: <IconBrandGmail size={20} />, connected: !!gmailConnection },
    { id: "calendar" as Tab, name: "Calendar", icon: <Calendar size={20} />, connected: !!calendarConnection },
    { id: "slack" as Tab, name: "Slack", icon: <IconBrandSlack size={20} />, comingSoon: true },
    { id: "discord" as Tab, name: "Discord", icon: <IconBrandDiscord size={20} />, comingSoon: true },
    { id: "notion" as Tab, name: "Notion", icon: <IconBrandNotion size={20} />, comingSoon: true },
  ];

  const fetchPinnedMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/messages/pin");
      const data = await response.json();
      if (data.messages) setPinnedIds(new Set(data.messages.map((m: Message) => m.external_id)));
    } catch (err) { console.error(err); }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }

      const { data: gmailData } = await supabase.from("platform_connections").select("*").eq("user_id", session.user.id).eq("platform_name", "gmail").eq("is_active", true).single();
      setGmailConnection(gmailData);

      const { data: calendarData } = await supabase.from("platform_connections").select("*").eq("user_id", session.user.id).eq("platform_name", "calendar").eq("is_active", true).single();
      setCalendarConnection(calendarData);

      await fetchPinnedMessages();
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [supabase, router, fetchPinnedMessages]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => { setGlitchActive(true); setTimeout(() => setGlitchActive(false), 120); }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Gmail handlers
  const handleFetchEmails = async () => {
    setFetchingEmails(true);
    setError(null);
    try {
      const response = await fetch("/api/integrations/google/gmail/messages");
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setEmails(data.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch emails");
    } finally {
      setFetchingEmails(false);
    }
  };

  const handlePinEmail = async (email: EmailMessage, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!gmailConnection) return;
    setPinningId(email.id);
    try {
      await fetch("/api/messages/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: email.id,
          subject: email.subject,
          sender: email.sender,
          senderEmail: email.senderEmail,
          content: email.body || email.snippet,
          date: email.date,
          isRead: email.isRead,
          platformConnectionId: gmailConnection.id,
        }),
      });
      await fetchPinnedMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to pin");
    } finally {
      setPinningId(null);
    }
  };

  const handleUnpinEmail = async (externalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinningId(externalId);
    try {
      await fetch("/api/messages/pin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ externalId }),
      });
      await fetchPinnedMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unpin");
    } finally {
      setPinningId(null);
    }
  };

  // Calendar handlers
  const handleFetchEvents = async () => {
    setFetchingEvents(true);
    setError(null);
    try {
      const response = await fetch("/api/integrations/calendar/events");
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setEvents(data.events || []);
      setGroupedEvents(data.groupedEvents || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setFetchingEvents(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white via-zinc-50/30 to-white">
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-12 h-12 border-2 border-zinc-200 border-t-zinc-700 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          <span className="text-sm font-mono text-zinc-600">LOADING</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-linear-to-b from-white via-zinc-50/30 to-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.08) 1px, transparent 0)", backgroundSize: "50px 50px" }} animate={{ backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
      </div>

      <main className="relative pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-8 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Dashboard</span>
            </Link>

            <motion.div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-linear-to-br from-zinc-100/90 via-white/80 to-zinc-100/90 border border-zinc-200/80 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-10 overflow-hidden" animate={glitchActive ? { x: [0, -2, 2, 0] } : {}} transition={{ duration: 0.12 }}>
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />
              <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm font-mono text-zinc-700">NOTIFICATIONS</span>
            </motion.div>

            <motion.h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" animate={glitchActive ? { x: [0, -3, 3, 0] } : {}} transition={{ duration: 0.12 }}>
              <span className="bg-linear-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">Your Inbox</span>
            </motion.h1>

            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">View, manage, and pin important messages across all your connected platforms.</p>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mb-12 p-5 rounded-2xl bg-zinc-100 border border-zinc-300 text-zinc-800 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)}><X size={18} /></button>
            </motion.div>
          )}

          {/* Tabs */}
          <motion.div className="flex justify-center gap-3 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => !tab.comingSoon && setActiveTab(tab.id)} disabled={tab.comingSoon} className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-zinc-900 text-white" : tab.comingSoon ? "bg-zinc-100/50 text-zinc-400 cursor-not-allowed" : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300"}`}>
                {activeTab === tab.id && (
                  <>
                    <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/30" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-white/30" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-white/30" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/30" />
                  </>
                )}
                {tab.icon}
                <span>{tab.name}</span>
                {tab.connected && <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />}
                {tab.comingSoon && <span className="text-xs opacity-60 ml-1">Soon</span>}
              </button>
            ))}
          </motion.div>

          {/* Main Content Card */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <div className="relative rounded-3xl bg-linear-to-br from-zinc-100/80 via-white/70 to-zinc-100/80 backdrop-blur-xl border border-zinc-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

              <motion.div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-600/40 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

              <div className="p-10 md:p-14">
                {activeTab === "gmail" && (
                  <GmailTab
                    connection={gmailConnection}
                    emails={emails}
                    pinnedIds={pinnedIds}
                    onFetchEmails={handleFetchEmails}
                    onPinEmail={handlePinEmail}
                    onUnpinEmail={handleUnpinEmail}
                    fetchingEmails={fetchingEmails}
                    pinningId={pinningId}
                  />
                )}
                {activeTab === "calendar" && (
                  <CalendarTab
                    connection={calendarConnection}
                    events={events}
                    groupedEvents={groupedEvents}
                    onFetchEvents={handleFetchEvents}
                    fetchingEvents={fetchingEvents}
                  />
                )}
                {activeTab === "slack" && (
                  <ComingSoonTab platformName="Slack" />
                )}
                {activeTab === "discord" && (
                  <ComingSoonTab platformName="Discord" />
                )}
                {activeTab === "notion" && (
                  <ComingSoonTab platformName="Notion" />
                )}
              </div>

              {/* Footer */}
              <div className="relative border-t border-zinc-200/40 bg-white/40 px-8 py-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <motion.div className={`w-2 h-2 rounded-full ${gmailConnection || calendarConnection ? "bg-green-500" : "bg-zinc-400"}`} animate={gmailConnection || calendarConnection ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : {}} transition={{ duration: 2, repeat: Infinity }} />
                    <span className="text-zinc-600 font-mono">{gmailConnection || calendarConnection ? "CONNECTED" : "NOT CONNECTED"}</span>
                  </div>
                  <span className="text-zinc-600 font-mono">{[gmailConnection, calendarConnection].filter(Boolean).length} PLATFORMS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
