"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Clock,
  Pin,
  PinOff,
  ChevronDown,
  Inbox,
} from "lucide-react";
import { IconBrandGmail } from "@tabler/icons-react";
import type { PlatformConnection } from "@/lib/types/database";

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

type GmailTabProps = {
  connection: PlatformConnection | null;
  emails: EmailMessage[];
  pinnedIds: Set<string>;
  onFetchEmails: () => Promise<void>;
  onPinEmail: (email: EmailMessage, e: React.MouseEvent) => Promise<void>;
  onUnpinEmail: (externalId: string, e: React.MouseEvent) => Promise<void>;
  fetchingEmails: boolean;
  pinningId: string | null;
};

export default function GmailTab({
  connection,
  emails,
  pinnedIds,
  onFetchEmails,
  onPinEmail,
  onUnpinEmail,
  fetchingEmails,
  pinningId,
}: GmailTabProps) {
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const formatFullDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Not connected state
  if (!connection) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
          <IconBrandGmail size={40} className="text-zinc-400" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-800 mb-3">Connect Gmail</h3>
        <p className="text-zinc-600 mb-8 max-w-md mx-auto">
          Connect your Google account from the dashboard to view your emails here.
        </p>
        <Link href="/dashboard">
          <motion.button
            className="px-8 py-4 rounded-2xl bg-zinc-900 text-white font-medium hover:bg-zinc-800"
            whileHover={{ scale: 1.02 }}
          >
            Go to Dashboard
          </motion.button>
        </Link>
      </div>
    );
  }

  // No emails state
  if (emails.length === 0) {
    return (
      <>
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center text-zinc-700">
              <IconBrandGmail size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Gmail</h2>
              <p className="text-zinc-600">{connection.platform_user_id}</p>
            </div>
          </div>

          <motion.button
            onClick={onFetchEmails}
            disabled={fetchingEmails}
            className="relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 disabled:opacity-50 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-white/20" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-white/20" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/20" />
            <RefreshCw size={18} className={fetchingEmails ? "animate-spin" : ""} />
            <span>{fetchingEmails ? "Fetching..." : "Fetch Emails"}</span>
          </motion.button>
        </div>

        <div className="text-center py-24">
          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
            <Inbox size={40} className="text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-800 mb-3">No emails loaded</h3>
          <p className="text-zinc-600">Click &quot;Fetch Emails&quot; to load your recent messages.</p>
        </div>
      </>
    );
  }

  // Emails list
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center text-zinc-700">
            <IconBrandGmail size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Gmail</h2>
            <p className="text-zinc-600">{connection.platform_user_id}</p>
          </div>
        </div>

        <motion.button
          onClick={onFetchEmails}
          disabled={fetchingEmails}
          className="relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 disabled:opacity-50 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/20" />
          <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-white/20" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-white/20" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/20" />
          <RefreshCw size={18} className={fetchingEmails ? "animate-spin" : ""} />
          <span>{fetchingEmails ? "Fetching..." : "Refresh"}</span>
        </motion.button>
      </div>

      {/* Emails List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {emails.map((email, index) => {
            const isExpanded = expandedEmailId === email.id;
            const isPinned = pinnedIds.has(email.id);
            const isPinning = pinningId === email.id;

            return (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.03 }}
                layout
                className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                  email.isRead ? "bg-zinc-50/60 border-zinc-200/50" : "bg-white border-zinc-200/80"
                } ${isExpanded ? "shadow-xl" : "hover:shadow-lg"}`}
              >
                {!email.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800" />}

                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedEmailId(isExpanded ? null : email.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 pl-2">
                      <div className="flex items-center gap-3 mb-2">
                        <h4
                          className={`font-semibold text-zinc-900 ${!email.isRead ? "font-bold" : ""} ${
                            isExpanded ? "" : "truncate"
                          }`}
                        >
                          {email.subject || "(No Subject)"}
                        </h4>
                        {isPinned && (
                          <span className="px-2 py-0.5 text-xs font-mono bg-zinc-200 text-zinc-700 rounded">
                            PINNED
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-600 truncate">{email.sender}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <motion.button
                        onClick={(e) =>
                          isPinned ? onUnpinEmail(email.id, e) : onPinEmail(email, e)
                        }
                        disabled={isPinning}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                          isPinned
                            ? "bg-zinc-200 border-zinc-300 text-zinc-700"
                            : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPinning ? (
                          <motion.div
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : isPinned ? (
                          <PinOff size={16} />
                        ) : (
                          <Pin size={16} />
                        )}
                      </motion.button>
                      <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                        <Clock size={12} />
                        <span>{formatDate(email.date)}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={20} className="text-zinc-400" />
                      </motion.div>
                    </div>
                  </div>
                  {!isExpanded && (
                    <p className="text-sm text-zinc-600 line-clamp-2 mt-3 pl-2">{email.snippet}</p>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 border-t border-zinc-100">
                        <div className="py-4 text-sm text-zinc-600 space-y-1 font-mono">
                          <p>
                            <span className="text-zinc-800">From:</span> {email.sender}{" "}
                            {email.senderEmail && `<${email.senderEmail}>`}
                          </p>
                          {email.to && (
                            <p>
                              <span className="text-zinc-800">To:</span> {email.to}
                            </p>
                          )}
                          <p>
                            <span className="text-zinc-800">Date:</span> {formatFullDate(email.date)}
                          </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 max-h-80 overflow-y-auto">
                          <p className="text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
                            {email.body || email.snippet}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
