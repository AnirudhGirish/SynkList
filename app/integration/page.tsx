"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "lucide-react";
import ScrollToTopCircle from "@/components/Scroll";
import KeyScroller from "@/components/KeyScroll";

const IntegrationPage = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [glitchActive, setGlitchActive] = useState(false);

  // Periodic effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 15000);

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50/30 to-white pt-16">
            <KeyScroller disabled={false} amountPx={60}/>
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
                  className="w-2 h-2 bg-zinc-500 rounded-full relative z-10"
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
                  INTEGRATION HUB
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
                  Seamless Integrations
                </span>
              </motion.h1>

              <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
                Connect your entire digital ecosystem through secure,
                intelligent integrations designed for the modern workflow.
              </p>
            </motion.div>

            {/* Visual Integration Hub */}
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
                      Universal Connectivity
                    </h2>
                    <p className="text-zinc-600 max-w-2xl mx-auto">
                      One secure connection unlocks access to your entire
                      digital ecosystem through WhatsApp&apos;s familiar
                      interface.
                    </p>
                  </div>

                  {/* Integration visualization */}
                  <div className="relative h-80 flex  items-center justify-center">
                    {/* Central hub */}
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
                        <Link size={24} className="text-white" />
                      </motion.div>

                      {/* Connection rings */}
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

                      {/* Outer connection ring */}
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
                    </motion.div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-6 items-center justify-center lg:mt-[-3rem]">
                    {/* mapped items go here */}
                    {/* Connection indicators */}
                    {[
                      "Google",
                      "Gmail",
                      "Calander",
                      "Drive",
                      "Lists",
                      "Notion",
                      "Slack",
                    ].map((service, index) => (
                      <motion.div
                        key={service}
                        className="w-28 h-12 rounded-xl bg-zinc-100/70 border border-zinc-300/50 flex items-center justify-center backdrop-blur-sm"
                        animate={{
                          y: [0, -4, 0],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 3 + index * 0.5,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      >
                        <span className="text-xs font-medium text-zinc-700 text-center">
                          {service}
                        </span>
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
                        INTEGRATION ENGINE ACTIVE
                      </span>
                    </div>
                    <span className="text-zinc-600 font-mono">
                      15+ PLATFORMS
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="relative py-20 px-6 border-t border-zinc-200/40">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 border border-zinc-200/60 backdrop-blur-xl shadow-sm mb-8 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full relative z-10"
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
                PLATFORM EXPANSION
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.7, duration: 0.8 }}
            >
              Integration Library
              <br />
              <span className="text-zinc-600">Coming Soon</span>
            </motion.h2>

            <motion.p
              className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.9, duration: 0.8 }}
            >
              We&apos;re building comprehensive integration guides, setup
              tutorials, and platform-specific documentation. Connect your
              entire digital ecosystem with detailed instructions and best
              practices.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.1, duration: 0.8 }}
            >
              <div className="px-4 py-2 rounded-lg bg-zinc-100/60 border border-zinc-200/50">
                <span className="text-sm font-mono text-zinc-700">
                  ETA: Q4 2025
                </span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-zinc-100/60 border border-zinc-200/50">
                <span className="text-sm font-mono text-zinc-700">
                  STATUS: ACTIVE DEVELOPMENT
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IntegrationPage;
