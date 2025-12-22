"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Clock,
  ChevronDown,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  ChevronRight,
  Sun,
  Sunrise,
  Sunset,
  Moon,
} from "lucide-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import type { PlatformConnection } from "@/lib/types/database";

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

type CalendarTabProps = {
  connection: PlatformConnection | null;
  events: CalendarEvent[];
  groupedEvents: { [date: string]: CalendarEvent[] };
  onFetchEvents: () => Promise<void>;
  fetchingEvents: boolean;
};

export default function CalendarTab({
  connection,
  events,
  groupedEvents,
  onFetchEvents,
  fetchingEvents,
}: CalendarTabProps) {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  };

  const getTimeOfDayIcon = (dateString: string) => {
    const hour = new Date(dateString).getHours();
    if (hour >= 5 && hour < 12) return <Sunrise size={14} className="text-zinc-600" />;
    if (hour >= 12 && hour < 17) return <Sun size={14} className="text-zinc-600" />;
    if (hour >= 17 && hour < 21) return <Sunset size={14} className="text-zinc-600" />;
    return <Moon size={14} className="text-zinc-600" />;
  };

  const getDurationString = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  // Not connected state
  if (!connection) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
          <IconCalendarEvent size={40} className="text-zinc-400" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-800 mb-3">Connect Calendar</h3>
        <p className="text-zinc-600 mb-8 max-w-md mx-auto">
          Connect your Google Calendar from the dashboard to view your events here.
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

  // No events state
  if (events.length === 0) {
    return (
      <>
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center text-zinc-700">
              <Calendar size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Calendar</h2>
              <p className="text-zinc-600">{connection.platform_user_id}</p>
            </div>
          </div>

          <motion.button
            onClick={onFetchEvents}
            disabled={fetchingEvents}
            className="relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 disabled:opacity-50 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-white/20" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-white/20" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/20" />
            <RefreshCw size={18} className={fetchingEvents ? "animate-spin" : ""} />
            <span>{fetchingEvents ? "Syncing..." : "Sync Calendar"}</span>
          </motion.button>
        </div>

        <div className="text-center py-24">
          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
            <Calendar size={40} className="text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-800 mb-3">No events loaded</h3>
          <p className="text-zinc-600">Click &quot;Sync Calendar&quot; to load your upcoming events.</p>
        </div>
      </>
    );
  }

  // Timeline View
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center text-zinc-700">
            <Calendar size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Calendar</h2>
            <p className="text-zinc-600">{connection.platform_user_id}</p>
          </div>
        </div>

        <motion.button
          onClick={onFetchEvents}
          disabled={fetchingEvents}
          className="relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 disabled:opacity-50 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/20" />
          <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-white/20" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-white/20" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/20" />
          <RefreshCw size={18} className={fetchingEvents ? "animate-spin" : ""} />
          <span>{fetchingEvents ? "Syncing..." : "Refresh"}</span>
        </motion.button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-300 via-zinc-200 to-transparent" />

        <div className="space-y-10">
          {Object.entries(groupedEvents).map(([date, dayEvents], dateIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: dateIndex * 0.1 }}
            >
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-zinc-900 text-white flex flex-col items-center justify-center shadow-lg">
                  <span className="text-lg font-bold leading-none">
                    {new Date(date).getDate()}
                  </span>
                  <span className="text-[10px] font-mono uppercase opacity-70">
                    {new Date(date).toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">{formatEventDate(date)}</h3>
                  <p className="text-sm text-zinc-500 font-mono">
                    {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Events for this day */}
              <div className="ml-16 space-y-3">
                {dayEvents.map((event, eventIndex) => {
                  const isExpanded = expandedEventId === event.id;

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dateIndex * 0.1 + eventIndex * 0.05 }}
                      className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                        event.isAllDay
                          ? "bg-zinc-100/80 border-zinc-300/60"
                          : "bg-white border-zinc-200/80"
                      } ${isExpanded ? "shadow-xl" : "hover:shadow-lg"}`}
                    >
                      {/* Time indicator bar */}
                      {!event.isAllDay && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800" />
                      )}

                      <div
                        className="p-5 cursor-pointer"
                        onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              {/* Time badge */}
                              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200">
                                {event.isAllDay ? (
                                  <span className="text-xs font-mono text-zinc-700">ALL DAY</span>
                                ) : (
                                  <>
                                    {getTimeOfDayIcon(event.start)}
                                    <span className="text-xs font-mono text-zinc-700">
                                      {formatEventTime(event.start)}
                                    </span>
                                  </>
                                )}
                              </div>
                              {!event.isAllDay && (
                                <span className="text-xs text-zinc-500 font-mono">
                                  {getDurationString(event.start, event.end)}
                                </span>
                              )}
                            </div>

                            <h4 className="font-semibold text-zinc-900 mb-1">{event.title}</h4>

                            {/* Location preview */}
                            {event.location && !isExpanded && (
                              <div className="flex items-center gap-2 text-sm text-zinc-600">
                                <MapPin size={14} />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}

                            {/* Attendees preview */}
                            {event.attendees.length > 0 && !isExpanded && (
                              <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                                <Users size={14} />
                                <span>
                                  {event.attendees.length} attendee
                                  {event.attendees.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                          </div>

                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={20} className="text-zinc-400" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 border-t border-zinc-100 pt-4 space-y-4">
                              {/* Time details */}
                              {!event.isAllDay && (
                                <div className="flex items-center gap-3 text-sm">
                                  <Clock size={16} className="text-zinc-500" />
                                  <span className="text-zinc-700">
                                    {formatEventTime(event.start)} — {formatEventTime(event.end)}
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-zinc-100 text-xs font-mono text-zinc-600">
                                    {getDurationString(event.start, event.end)}
                                  </span>
                                </div>
                              )}

                              {/* Location */}
                              {event.location && (
                                <div className="flex items-start gap-3 text-sm">
                                  <MapPin size={16} className="text-zinc-500 mt-0.5" />
                                  <span className="text-zinc-700">{event.location}</span>
                                </div>
                              )}

                              {/* Description */}
                              {event.description && (
                                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                                  <p className="text-sm text-zinc-700 whitespace-pre-wrap">
                                    {event.description}
                                  </p>
                                </div>
                              )}

                              {/* Attendees */}
                              {event.attendees.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 text-sm text-zinc-600 mb-2">
                                    <Users size={16} />
                                    <span className="font-medium">Attendees</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {event.attendees.slice(0, 5).map((attendee, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200"
                                      >
                                        <div
                                          className={`w-2 h-2 rounded-full ${
                                            attendee.responseStatus === "accepted"
                                              ? "bg-green-500"
                                              : attendee.responseStatus === "declined"
                                              ? "bg-zinc-400"
                                              : attendee.responseStatus === "tentative"
                                              ? "bg-zinc-500"
                                              : "bg-zinc-300"
                                          }`}
                                        />
                                        <span className="text-xs text-zinc-700">{attendee.name}</span>
                                      </div>
                                    ))}
                                    {event.attendees.length > 5 && (
                                      <div className="px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200">
                                        <span className="text-xs text-zinc-500">
                                          +{event.attendees.length - 5} more
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Open in Google Calendar */}
                              {event.htmlLink && (
                                <a
                                  href={event.htmlLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={14} />
                                  <span>Open in Google Calendar</span>
                                  <ChevronRight size={14} />
                                </a>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
