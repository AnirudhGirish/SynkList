"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  LogOut,
  Zap,
  Shield,
  Trash2,
  X,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import {
  IconBrandGmail,
  IconBrandSlack,
  IconBrandDiscord,
  IconBrandTelegram,
  IconBrandNotion,
  IconCalendar,
} from "@tabler/icons-react";
import type { User as DbUser, PlatformConnection } from "@/lib/types/database";

export default function DashboardPage() {
  const [user, setUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [pinnedCount, setPinnedCount] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [showDisconnectModal, setShowDisconnectModal] = useState<string | null>(null);
  const [deleteDataOnDisconnect, setDeleteDataOnDisconnect] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }

      const { data: userData } = await supabase.from("users").select("*").eq("id", session.user.id).single();
      if (userData) setUser(userData);

      const { data: connectionsData } = await supabase.from("platform_connections").select("*").eq("user_id", session.user.id).eq("is_active", true);
      setConnections(connectionsData || []);

      const { count } = await supabase.from("messages").select("*", { count: "exact", head: true }).eq("user_id", session.user.id).eq("status", "starred");
      setPinnedCount(count || 0);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [supabase, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("gmail_connected") === "true" || params.get("calendar_connected") === "true") { fetchData(); window.history.replaceState({}, "", "/dashboard"); }
    if (params.get("error")) { setError(decodeURIComponent(params.get("error")!)); window.history.replaceState({}, "", "/dashboard"); }
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => { setGlitchActive(true); setTimeout(() => setGlitchActive(false), 120); }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleDisconnect = async (platform: string) => {
    setDisconnecting(platform);
    try {
      await fetch("/api/integrations/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, deleteData: deleteDataOnDisconnect }),
      });
      await fetchData();
      setShowDisconnectModal(null);
      setDeleteDataOnDisconnect(false);
    } catch (err) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setDisconnecting(null); }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); router.push("/login"); };

  const getConnection = (platform: string) => connections.find(c => c.platform_name === platform);

  const handleConnectGmail = async () => {
    try {
      const response = await fetch("/api/integrations/gmail/authorize");
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to connect"); }
  };

  const handleConnectCalendar = async () => {
    try {
      const response = await fetch("/api/integrations/calendar/authorize");
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to connect"); }
  };

  const integrations = [
    { id: "gmail", name: "Gmail", desc: "Emails & Messages", icon: <IconBrandGmail size={28} />, platform: "gmail", status: getConnection("gmail") ? "connected" : "available" as const, connectFn: handleConnectGmail },
    { id: "calendar", name: "Calendar", desc: "Events & Schedules", icon: <IconCalendar size={28} />, platform: "calendar", status: getConnection("calendar") ? "connected" : "available" as const, connectFn: handleConnectCalendar },
    { id: "slack", name: "Slack", desc: "Workspace", icon: <IconBrandSlack size={28} />, platform: "slack", status: "coming_soon" as const },
    { id: "discord", name: "Discord", desc: "Servers", icon: <IconBrandDiscord size={28} />, platform: "discord", status: "coming_soon" as const },
    { id: "notion", name: "Notion", desc: "Workspace", icon: <IconBrandNotion size={28} />, platform: "notion", status: "coming_soon" as const },
    { id: "telegram", name: "Telegram", desc: "Messages", icon: <IconBrandTelegram size={28} />, platform: "telegram", status: "coming_soon" as const },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white via-zinc-50/30 to-white">
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-12 h-12 border-2 border-zinc-200 border-t-zinc-700 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          <span className="text-sm font-mono text-zinc-600">INITIALIZING</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-linear-to-b from-white via-zinc-50/30 to-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[0.4]"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.08) 1px, transparent 0)", backgroundSize: "50px 50px" }}
          animate={{ backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Disconnect Modal */}
      <AnimatePresence>
        {showDisconnectModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/30 backdrop-blur-sm" onClick={() => setShowDisconnectModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-3xl bg-linear-to-br from-zinc-100/95 via-white/90 to-zinc-100/95 border border-zinc-200/80 shadow-2xl overflow-hidden">
              <div className="absolute top-4 left-4 w-5 h-5 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-5 h-5 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />
              
              <div className="p-10">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Disconnect {showDisconnectModal}?</h3>
                <p className="text-zinc-600 mb-8">This will revoke access to your account.</p>
                
                <label className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200/60 cursor-pointer mb-8">
                  <input type="checkbox" checked={deleteDataOnDisconnect} onChange={(e) => setDeleteDataOnDisconnect(e.target.checked)} className="mt-1 w-4 h-4 border-zinc-300 text-zinc-900 focus:ring-zinc-500" />
                  <div>
                    <p className="font-medium text-zinc-900">Delete my saved data</p>
                    <p className="text-sm text-zinc-600">Remove all pinned messages from this platform.</p>
                  </div>
                </label>
                
                <div className="flex gap-4">
                  <button onClick={() => { setShowDisconnectModal(null); setDeleteDataOnDisconnect(false); }} className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 text-zinc-700 font-medium hover:bg-zinc-50">Cancel</button>
                  <button onClick={() => handleDisconnect(showDisconnectModal.toLowerCase())} disabled={!!disconnecting} className="flex-1 px-6 py-3 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 disabled:opacity-50 flex items-center justify-center gap-2">
                    {disconnecting && <motion.div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />}
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            <motion.div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-linear-to-br from-zinc-100/90 via-white/80 to-zinc-100/90 border border-zinc-200/80 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-10 overflow-hidden" animate={glitchActive ? { x: [0, -2, 2, 0] } : {}} transition={{ duration: 0.12 }}>
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />
              <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm font-mono text-zinc-700">COMMAND CENTER</span>
            </motion.div>

            <motion.h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" animate={glitchActive ? { x: [0, -3, 3, 0] } : {}} transition={{ duration: 0.12 }}>
              <span className="bg-linear-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
              </span>
            </motion.h1>

            <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-10">
              Your unified notification hub. Connect platforms, manage integrations, and take control of your digital life.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/notifications">
                <motion.button className="group relative overflow-hidden" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
                    <motion.div className="absolute inset-0 bg-linear-to-r from-zinc-800 via-zinc-700 to-zinc-800" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                    <div className="relative px-8 py-4 flex items-center gap-3">
                      <Bell size={20} className="text-white" />
                      <span className="text-lg font-semibold text-white">View Notifications</span>
                      <ArrowRight size={18} className="text-white" />
                    </div>
                    <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/20" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-white/20" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-white/20" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/20" />
                  </div>
                </motion.button>
              </Link>
              <motion.button onClick={handleLogout} className="px-6 py-4 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-700 font-medium flex items-center gap-2 hover:bg-zinc-200" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <LogOut size={18} />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl mx-auto mb-12 p-5 rounded-2xl bg-zinc-100 border border-zinc-300 text-zinc-800 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError(null)}><X size={18} /></button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <motion.div className="flex justify-center items-center gap-16 mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
            {[
              { value: connections.length, label: "Connected", icon: <Zap size={16} /> },
              { value: pinnedCount, label: "Pinned", icon: <Bell size={16} /> },
              { value: user?.role === "premium" ? "PRO" : "FREE", label: "Plan", icon: <Shield size={16} /> },
            ].map((stat) => (
              <motion.div key={stat.label} className="text-center" whileHover={{ y: -2 }}>
                <div className="text-3xl font-mono font-bold text-zinc-900 mb-1">{stat.value}</div>
                <div className="flex items-center justify-center gap-1 text-sm text-zinc-500">
                  {stat.icon}
                  <span>{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Integrations Card */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <div className="relative rounded-3xl bg-linear-to-br from-zinc-100/80 via-white/70 to-zinc-100/80 backdrop-blur-xl border border-zinc-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

              <motion.div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-600/40 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />

              <div className="p-12 md:p-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-zinc-900 mb-4">Platform Integrations</h2>
                  <p className="text-zinc-600 max-w-xl mx-auto">Connect your accounts to sync notifications. We respect your privacy — disconnect anytime and choose to keep or delete your data.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {integrations.map((integration, index) => (
                    <motion.div
                      key={integration.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                        integration.status === "connected" ? "bg-zinc-100/80 border-zinc-300/60" : integration.status === "coming_soon" ? "bg-zinc-50/30 border-zinc-200/30 opacity-50" : "bg-white/60 border-zinc-200/60 hover:shadow-lg hover:border-zinc-300"
                      }`}
                    >
                      {integration.status === "connected" && (
                        <>
                          <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-zinc-400/50" />
                          <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-zinc-400/50" />
                          <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-zinc-400/50" />
                          <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-zinc-400/50" />
                        </>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center text-zinc-700">
                          {integration.icon}
                        </div>
                        {integration.status === "connected" && (
                          <motion.div className="w-3 h-3 bg-green-500 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-zinc-900 mb-1">{integration.name}</h3>
                      <p className="text-sm text-zinc-600 mb-6">{integration.desc}</p>

                      {integration.status === "connected" ? (
                        <button onClick={() => setShowDisconnectModal(integration.name)} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-zinc-200 text-zinc-700 font-medium hover:bg-zinc-50">
                          <Trash2 size={16} />
                          <span>Disconnect</span>
                        </button>
                      ) : integration.status === "available" && integration.connectFn ? (
                        <button onClick={integration.connectFn} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800">
                          <ExternalLink size={16} />
                          <span>Connect</span>
                        </button>
                      ) : (
                        <div className="w-full text-center py-3 text-sm font-mono text-zinc-500">COMING SOON</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative border-t border-zinc-200/40 bg-white/40 px-8 py-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
                    <span className="text-zinc-600 font-mono">SYSTEM ONLINE</span>
                  </div>
                  <span className="text-zinc-600 font-mono">{connections.length} ACTIVE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* User info section */}
          <motion.div className="text-center mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
            <p className="text-zinc-500 mb-2">Signed in as</p>
            <p className="text-lg font-medium text-zinc-800">{user?.email}</p>
            <p className="text-sm font-mono text-zinc-600 mt-1">{user?.role?.toUpperCase() || "BASIC"} • Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
