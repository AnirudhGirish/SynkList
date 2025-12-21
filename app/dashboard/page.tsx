"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Mail,
  Calendar,
  LogOut,
  RefreshCw,
  Link as LinkIcon,
  CheckCircle,
  User,
  Clock,
  Pin,
  PinOff,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { IconBrandGoogle, IconBrandGmail } from "@tabler/icons-react";
import type { User as DbUser, PlatformConnection, Message } from "@/lib/types/database";

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

export default function DashboardPage() {
  const [user, setUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleConnection, setGoogleConnection] = useState<PlatformConnection | null>(null);
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [pinnedMessages, setPinnedMessages] = useState<Message[]>([]);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [fetchingEmails, setFetchingEmails] = useState(false);
  const [connectingGoogle, setConnectingGoogle] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  const [pinningId, setPinningId] = useState<string | null>(null);
  const [showPinned, setShowPinned] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const fetchPinnedMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/messages/pin");
      const data = await response.json();
      if (data.messages) {
        setPinnedMessages(data.messages);
        setPinnedIds(new Set(data.messages.map((m: Message) => m.external_id)));
      }
    } catch (err) {
      console.error("Error fetching pinned messages:", err);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }

      const { data: userData } = await supabase.from("users").select("*").eq("id", session.user.id).single();
      if (userData) setUser(userData);

      const { data: connectionData } = await supabase.from("platform_connections").select("*").eq("user_id", session.user.id).eq("platform_name", "google").eq("is_active", true).single();
      setGoogleConnection(connectionData);
      await fetchPinnedMessages();
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase, router, fetchPinnedMessages]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("google_connected") === "true") { fetchData(); window.history.replaceState({}, "", "/dashboard"); }
    const errorMsg = params.get("error");
    if (errorMsg) { setError(decodeURIComponent(errorMsg)); window.history.replaceState({}, "", "/dashboard"); }
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => { setGlitchActive(true); setTimeout(() => setGlitchActive(false), 120); }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleConnectGoogle = async () => {
    setConnectingGoogle(true); setError(null);
    try {
      const response = await fetch("/api/integrations/google/authorize");
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "Failed to initiate OAuth");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect Google");
      setConnectingGoogle(false);
    }
  };

  const handleFetchEmails = async () => {
    setFetchingEmails(true); setError(null);
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

  const handlePinEmail = async (email: EmailMessage) => {
    if (!googleConnection) return;
    setPinningId(email.id); setError(null);
    try {
      const response = await fetch("/api/messages/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: email.id, subject: email.subject, sender: email.sender,
          senderEmail: email.senderEmail, content: email.body || email.snippet,
          date: email.date, isRead: email.isRead, platformConnectionId: googleConnection.id,
        }),
      });
      const data = await response.json();
      if (data.error && !data.alreadyPinned) throw new Error(data.error);
      await fetchPinnedMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to pin message");
    } finally {
      setPinningId(null);
    }
  };

  const handleUnpinEmail = async (externalId: string) => {
    setPinningId(externalId); setError(null);
    try {
      const response = await fetch("/api/messages/pin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ externalId }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      await fetchPinnedMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unpin message");
    } finally {
      setPinningId(null);
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); router.push("/login"); };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const formatFullDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-zinc-50/30 to-white">
      <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="w-12 h-12 border-3 border-zinc-200 border-t-zinc-700 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        <span className="text-sm font-mono text-zinc-600">LOADING DASHBOARD</span>
      </motion.div>
    </div>
  );

  const EmailCard = ({ email, isPinned, index }: { email: EmailMessage; isPinned: boolean; index: number }) => {
    const isExpanded = expandedEmailId === email.id;
    const isPinning = pinningId === email.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        transition={{ delay: index * 0.05, duration: 0.4 }} layout
        className={`relative rounded-xl border overflow-hidden transition-all duration-300 ${email.isRead ? "bg-zinc-50/40 border-zinc-200/40" : "bg-white border-zinc-200/60"} ${isExpanded ? "shadow-lg" : "hover:shadow-md"}`}
      >
        {!email.isRead && <div className="absolute left-2 top-6 w-2 h-2 rounded-full bg-blue-500" />}
        {isPinned && (
          <div className="absolute right-2 top-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              <Pin size={10} /><span>Pinned</span>
            </div>
          </div>
        )}

        <div className="p-4 pl-6 cursor-pointer" onClick={() => setExpandedEmailId(isExpanded ? null : email.id)}>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold text-zinc-900 ${!email.isRead ? "font-bold" : ""} ${isExpanded ? "" : "truncate"}`}>{email.subject || "(No Subject)"}</h4>
              <p className="text-sm text-zinc-600 truncate">
                {email.sender}
                {email.senderEmail && email.senderEmail !== email.sender && <span className="text-zinc-400 ml-1">&lt;{email.senderEmail}&gt;</span>}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-zinc-500"><Clock size={12} /><span>{formatDate(email.date)}</span></div>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={18} className="text-zinc-400" /></motion.div>
            </div>
          </div>
          {!isExpanded && <p className="text-sm text-zinc-600 line-clamp-2">{email.snippet}</p>}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="px-6 pb-4 border-t border-zinc-100">
                <div className="py-3 text-sm text-zinc-600 space-y-1">
                  <p><span className="font-medium text-zinc-700">From:</span> {email.sender} {email.senderEmail && `<${email.senderEmail}>`}</p>
                  {email.to && <p><span className="font-medium text-zinc-700">To:</span> {email.to}</p>}
                  <p><span className="font-medium text-zinc-700">Date:</span> {formatFullDate(email.date)}</p>
                </div>
                <div className="mt-3 p-4 rounded-lg bg-zinc-50/80 border border-zinc-100 max-h-96 overflow-y-auto">
                  <p className="text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">{email.body || email.snippet}</p>
                </div>
                <div className="mt-4 flex items-center justify-end gap-3">
                  {isPinned ? (
                    <motion.button onClick={(e) => { e.stopPropagation(); handleUnpinEmail(email.id); }} disabled={isPinning}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100 text-amber-700 text-sm font-medium hover:bg-amber-200 transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      {isPinning ? <motion.div className="w-4 h-4 border-2 border-amber-300 border-t-amber-700 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /> : <PinOff size={16} />}
                      <span>Unpin</span>
                    </motion.button>
                  ) : (
                    <motion.button onClick={(e) => { e.stopPropagation(); handlePinEmail(email); }} disabled={isPinning}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      {isPinning ? <motion.div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /> : <Pin size={16} />}
                      <span>Pin Message</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50/30 to-white pt-24 pb-12 px-6">
      <motion.div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div>
            <motion.div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100/60 to-zinc-50/40 border border-zinc-200/50 backdrop-blur-sm mb-4" animate={glitchActive ? { x: [0, -2, 2, 0] } : {}} transition={{ duration: 0.12 }}>
              <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm font-mono text-zinc-600">DASHBOARD</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}</span>
            </h1>
            <p className="text-zinc-600 mt-2">Manage your integrations and view your unified inbox</p>
          </div>
          <motion.button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100/60 border border-zinc-200/50 text-zinc-700 hover:bg-zinc-200/60 transition-colors" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <LogOut size={18} /><span className="text-sm font-medium">Sign Out</span>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700"><X size={18} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <div className="relative rounded-2xl bg-gradient-to-br from-white/95 via-zinc-50/90 to-white/95 backdrop-blur-xl border border-zinc-200/60 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-zinc-400/40 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-zinc-400/40 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-zinc-400/40 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-zinc-400/40 rounded-br-lg" />
              <motion.div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center"><LinkIcon size={20} className="text-zinc-700" /></div>
                  <div><h2 className="text-lg font-bold text-zinc-900">Integrations</h2><p className="text-xs text-zinc-600">Connect your accounts</p></div>
                </div>

                <div className="relative rounded-xl bg-gradient-to-br from-zinc-100/60 to-zinc-50/40 border border-zinc-200/50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200/60 flex items-center justify-center shadow-sm"><IconBrandGoogle size={22} className="text-zinc-700" /></div>
                      <div><h3 className="font-semibold text-zinc-900">Google</h3><p className="text-xs text-zinc-600">Gmail & Calendar</p></div>
                    </div>
                    {googleConnection && <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium"><CheckCircle size={12} /><span>Connected</span></div>}
                  </div>

                  {googleConnection ? (
                    <div className="space-y-3">
                      <div className="text-xs text-zinc-600"><span className="font-mono">Connected as:</span><br /><span className="font-medium text-zinc-800">{googleConnection.platform_user_id}</span></div>
                      <motion.button onClick={handleFetchEmails} disabled={fetchingEmails} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        {fetchingEmails ? <><motion.div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /><span>Fetching...</span></> : <><RefreshCw size={16} /><span>Fetch Emails</span></>}
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button onClick={handleConnectGoogle} disabled={connectingGoogle} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      {connectingGoogle ? <><motion.div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /><span>Connecting...</span></> : <><IconBrandGoogle size={18} /><span>Connect Google</span></>}
                    </motion.button>
                  )}
                </div>

                <div className="mt-4 relative rounded-xl bg-zinc-100/40 border border-zinc-200/30 p-4 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/60 border border-zinc-200/40 flex items-center justify-center"><Calendar size={20} className="text-zinc-500" /></div>
                    <div><h3 className="font-semibold text-zinc-700">Calendar</h3><p className="text-xs text-zinc-500">Coming soon</p></div>
                  </div>
                </div>
              </div>
            </div>

            {pinnedMessages.length > 0 && (
              <motion.div className="mt-6 relative rounded-2xl bg-gradient-to-br from-amber-50/80 via-white/90 to-amber-50/80 backdrop-blur-xl border border-amber-200/60 shadow-sm overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-200/60 border border-amber-300/40 flex items-center justify-center"><Pin size={20} className="text-amber-700" /></div>
                      <div><h3 className="font-semibold text-zinc-900">Pinned</h3><p className="text-xs text-zinc-600">{pinnedMessages.length} saved</p></div>
                    </div>
                    <button onClick={() => setShowPinned(!showPinned)} className="text-amber-700 hover:text-amber-800">{showPinned ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</button>
                  </div>
                  <AnimatePresence>
                    {showPinned && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-2 overflow-hidden">
                        {pinnedMessages.slice(0, 5).map((msg) => (
                          <div key={msg.id} className="p-3 rounded-lg bg-white/60 border border-amber-100">
                            <h4 className="font-medium text-sm text-zinc-900 truncate">{msg.subject}</h4>
                            <p className="text-xs text-zinc-600 truncate">{msg.sender}</p>
                          </div>
                        ))}
                        {pinnedMessages.length > 5 && <p className="text-xs text-amber-700 text-center pt-2">+{pinnedMessages.length - 5} more pinned messages</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            <motion.div className="mt-6 relative rounded-2xl bg-gradient-to-br from-white/95 via-zinc-50/90 to-white/95 backdrop-blur-xl border border-zinc-200/60 shadow-sm overflow-hidden p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center"><User size={24} className="text-zinc-600" /></div>
                <div>
                  <h3 className="font-semibold text-zinc-900">{user?.name || "User"}</h3>
                  <p className="text-sm text-zinc-600">{user?.email}</p>
                  <div className="flex items-center gap-1 mt-1"><span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">{user?.role?.toUpperCase() || "BASIC"}</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="relative rounded-2xl bg-gradient-to-br from-white/95 via-zinc-50/90 to-white/95 backdrop-blur-xl border border-zinc-200/60 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-zinc-400/40 rounded-tl-lg" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-zinc-400/40 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-zinc-400/40 rounded-bl-lg" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-zinc-400/40 rounded-br-lg" />
              <motion.div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center"><IconBrandGmail size={22} className="text-zinc-700" /></div>
                    <div><h2 className="text-lg font-bold text-zinc-900">Recent Emails</h2><p className="text-xs text-zinc-600">{emails.length > 0 ? `${emails.length} messages` : "No messages yet"}{pinnedIds.size > 0 && ` • ${pinnedIds.size} pinned`}</p></div>
                  </div>
                  {googleConnection && emails.length > 0 && (
                    <motion.button onClick={handleFetchEmails} disabled={fetchingEmails} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100/60 border border-zinc-200/50 text-zinc-700 text-sm hover:bg-zinc-200/60 transition-colors disabled:opacity-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <RefreshCw size={14} className={fetchingEmails ? "animate-spin" : ""} /><span>Refresh</span>
                    </motion.button>
                  )}
                </div>

                {!googleConnection ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-100/60 border border-zinc-200/50 flex items-center justify-center"><Mail size={28} className="text-zinc-400" /></div>
                    <h3 className="text-lg font-semibold text-zinc-700 mb-2">Connect Google to see emails</h3>
                    <p className="text-sm text-zinc-500 max-w-sm mx-auto">Link your Google account to fetch and display your recent emails here.</p>
                  </div>
                ) : emails.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-100/60 border border-zinc-200/50 flex items-center justify-center"><Mail size={28} className="text-zinc-400" /></div>
                    <h3 className="text-lg font-semibold text-zinc-700 mb-2">No emails loaded</h3>
                    <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-4">Click &quot;Fetch Emails&quot; to load your recent messages.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {emails.map((email, index) => <EmailCard key={email.id} email={email} isPinned={pinnedIds.has(email.id)} index={index} />)}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="border-t border-zinc-200/40 bg-zinc-50/40 px-6 py-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
                    <span className="font-mono text-zinc-600">{googleConnection ? "SYNC ACTIVE" : "NOT CONNECTED"}</span>
                  </div>
                  {googleConnection && <span className="font-mono text-zinc-500">Last synced: {googleConnection.last_sync ? formatDate(googleConnection.last_sync) : "Never"}</span>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
