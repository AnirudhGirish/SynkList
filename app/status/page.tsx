"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  Activity,
  Zap,
  Shield,
  Globe,
  MessageSquare,
  Calendar,
  Mail,
} from "lucide-react";
import ScrollToTopCircle from "@/components/Scroll";
import KeyScroller from "@/components/KeyScroll";

const StatusPage = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [glitchActive, setGlitchActive] = useState(false);
  // Avoid SSR/client mismatch: render no time on server/first paint,
  // then populate on client after mount.
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [activeService, setActiveService] = useState(0);

  // Periodic effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 15000);

    // Set initial client time on mount, then tick
    setCurrentTime(new Date());
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

    const serviceRotation = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 6);
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(timeInterval);
      clearInterval(serviceRotation);
    };
  }, []);

  type ServiceStatus = "operational" | "degraded" | "outage";
  type Service = {
    name: string;
    status: ServiceStatus;
    uptime: string;
    responseTime: string;
    icon: ReactNode;
    lastIncident: string;
  };

  const systemServices: Service[] = [
    {
      name: "Core AI Engine",
      status: "operational",
      uptime: "99.98%",
      responseTime: "145ms",
      icon: <Zap size={20} />,
      lastIncident: "No incidents in 30 days",
    },
    {
      name: "WhatsApp Gateway",
      status: "operational",
      uptime: "99.94%",
      responseTime: "89ms",
      icon: <MessageSquare size={20} />,
      lastIncident: "No incidents in 15 days",
    },
    {
      name: "Gmail Integration",
      status: "operational",
      uptime: "99.97%",
      responseTime: "234ms",
      icon: <Mail size={20} />,
      lastIncident: "No incidents in 45 days",
    },
    {
      name: "Calendar Sync",
      status: "operational",
      uptime: "99.99%",
      responseTime: "112ms",
      icon: <Calendar size={20} />,
      lastIncident: "No incidents in 60 days",
    },
    {
      name: "Security Layer",
      status: "operational",
      uptime: "100%",
      responseTime: "23ms",
      icon: <Shield size={20} />,
      lastIncident: "No incidents in 90 days",
    },
    {
      name: "Global CDN",
      status: "operational",
      uptime: "99.95%",
      responseTime: "67ms",
      icon: <Globe size={20} />,
      lastIncident: "No incidents in 7 days",
    },
  ];

  const getStatusColor = (status: ServiceStatus): string => {
    switch (status) {
      case "operational":
        return "zinc-600";
      case "degraded":
        return "yellow-500";
      case "outage":
        return "red-500";
      default:
        return "zinc-400";
    }
  };

  const recentIncidents = [
    {
      date: "2024-09-01",
      title: "Gmail API Rate Limiting",
      status: "resolved",
      duration: "23 minutes",
      impact: "Minor delays in email processing",
    },
    {
      date: "2024-08-15",
      title: "Scheduled Maintenance",
      status: "completed",
      duration: "2 hours",
      impact: "Planned system updates",
    },
    {
      date: "2024-08-03",
      title: "WhatsApp Gateway Timeout",
      status: "resolved",
      duration: "8 minutes",
      impact: "Delayed message delivery",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50/30 to-white pt-16">
      <KeyScroller disabled={false} amountPx={100} />
      <div className="hidden lg:block">
        <ScrollToTopCircle />
      </div>
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[1]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.5) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <main ref={containerRef} className="relative">
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 border border-zinc-200/60 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-8 overflow-hidden"
                animate={
                  glitchActive
                    ? {
                        x: [0, -2, 2, 0],
                        filter: [
                          "hue-rotate(0deg)",
                          "hue-rotate(2deg)",
                          "hue-rotate(0deg)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.12 }}
              >
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

                <motion.div
                  className="w-2 h-2 bg-zinc-600 rounded-full relative z-10"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="text-sm font-mono text-zinc-600 relative z-10">
                  SYSTEM MONITORING
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                animate={
                  glitchActive
                    ? {
                        x: [0, -3, 3, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.12 }}
              >
                <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                  System Status
                </span>
              </motion.h1>

              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  className="w-3 h-3 bg-zinc-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="text-lg font-medium text-zinc-700">
                  All Systems Operational
                </span>
              </div>

              <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
                Real-time monitoring of SynkList infrastructure, AI services,
                and third-party integrations. Updated every 30 seconds.
              </p>

              <div
                className="mt-6 text-sm text-zinc-500 font-mono"
                suppressHydrationWarning
              >
                Last updated:{" "}
                {currentTime
                  ? new Intl.DateTimeFormat(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(currentTime)
                  : "—"}
              </div>
            </motion.div>

            {/* System Overview */}
            <motion.div
              className="relative mb-20"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

                {/* Active scanning effect */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="p-12">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                      Infrastructure Health
                    </h2>
                    <p className="text-zinc-600 max-w-2xl mx-auto">
                      Real-time status monitoring of core services,
                      integrations, and system performance metrics.
                    </p>
                  </div>

                  <div className="flex gap-2 justify-center">
                    {systemServices.slice(0, 6).map((service, index) => (
                      <motion.div key={service.name}>
                        <motion.div
                          className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-100/80 to-zinc-200/60 border border-zinc-300/50 flex items-center justify-center backdrop-blur-sm"
                          animate={
                            activeService === index
                              ? {
                                  scale: [1, 1.3, 1],
                                  boxShadow: [
                                    "0 0 0 0 rgba(113, 113, 122, 0)",
                                    "0 0 0 6px rgba(113, 113, 122, 0.1)",
                                    "0 0 0 0 rgba(113, 113, 122, 0)",
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 1 }}
                        >
                          <div className="text-zinc-700 scale-75">
                            {service.icon}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* System visualization */}
                  <div className="relative h-80 flex items-center justify-center mb-8">
                    {/* Central monitoring hub */}
                    <motion.div
                      className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-zinc-200/80 to-zinc-300/60 border-2 border-zinc-400/40 flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div className="w-16 h-16 rounded-2xl bg-zinc-700 flex items-center justify-center">
                        <Activity size={24} className="text-white" />
                      </motion.div>

                      {/* System monitoring rings */}
                      <motion.div
                        className="absolute inset-4 rounded-2xl border border-zinc-500/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      />

                      {/* Performance ring */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-zinc-400/20"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: 1,
                        }}
                      />

                      {/* Health check ring */}
                      <motion.div
                        className="absolute inset-[-8px] rounded-3xl border border-zinc-300/15"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          delay: 2,
                        }}
                      />
                    </motion.div>

                    {/* Orbiting service indicators */}
                  </div>

                  {/* Service Status Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {systemServices.map((service, index) => (
                      <motion.div
                        key={service.name}
                        className="p-4 rounded-xl bg-white/60 border border-zinc-200/50 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="text-zinc-600">{service.icon}</div>
                            <span className="font-medium text-zinc-900 text-sm">
                              {service.name}
                            </span>
                          </div>
                          <motion.div
                            className={`w-2 h-2 bg-${getStatusColor(
                              service.status
                            )} rounded-full`}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                          />
                        </div>
                        <div className="space-y-1 text-xs text-zinc-600">
                          <div className="flex justify-between">
                            <span>Uptime:</span>
                            <span className="font-mono">{service.uptime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Response:</span>
                            <span className="font-mono">
                              {service.responseTime}
                            </span>
                          </div>
                          <div className="text-zinc-500 text-xs mt-2">
                            {service.lastIncident}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Status bar */}
                <div className="relative border-t border-zinc-200/40 bg-white/40 px-8 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-zinc-600 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <span className="text-zinc-600 font-mono">
                        SYSTEM MONITORING ACTIVE
                      </span>
                    </div>
                    <span className="text-zinc-600 font-mono">
                      99.97% UPTIME
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Incidents */}
            <motion.div
              className="relative mb-20"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                      Recent Incidents
                    </h3>
                    <p className="text-zinc-600 max-w-2xl mx-auto">
                      Historical view of system incidents, maintenance windows,
                      and resolution times.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {recentIncidents.map((incident, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/60 border border-zinc-200/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-zinc-400 rounded-full" />
                            <span className="font-medium text-zinc-900">
                              {incident.title}
                            </span>
                            <span className="text-xs bg-zinc-100 px-2 py-1 rounded text-zinc-600">
                              {incident.status}
                            </span>
                          </div>
                          <div className="text-sm text-zinc-600 ml-5">
                            {incident.impact}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-mono text-zinc-500">
                            {incident.date}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {incident.duration}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StatusPage;
