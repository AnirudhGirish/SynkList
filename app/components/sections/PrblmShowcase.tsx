"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap, ArrowRight, Calendar, CheckSquare } from "lucide-react";
import {
  IconBrandNotion,
  IconBrandGmail,
  IconBrandSlack,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
interface ProblemShowcaseProps {
  onOpenWaitlist: () => void;
}

const ProblemShowcase = ({ onOpenWaitlist }: ProblemShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [currentStep, setCurrentStep] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Auto-progression through the chaos
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) {
          setShowSolution(true);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isInView]);

  // Periodic glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const chaosApps = [
    {
      name: "Gmail",
      icon: <IconBrandGmail size={20} />,
      position: { x: -80, y: -70 },
      delay: 0,
    },
    {
      name: "Tasks",
      icon: <CheckSquare size={20} />,
      position: { x: -100, y: 0 },
      delay: 0.8,
    },
    {
      name: "Slack",
      icon: <IconBrandSlack size={20} />,
      position: { x: -80, y: 70 },
      delay: 0.4,
    },
    {
      name: "Calendar",
      icon: <Calendar size={20} />,
      position: { x: 100, y: 0 },
      delay: 0.2,
    },
    {
      name: "Notion",
      icon: <IconBrandNotion size={20} />,
      position: { x: 80, y: 70 },
      delay: 0.6,
    },
  ];

  const frustrationPoints = [
    "Switch between 12+ apps daily",
    "Lose context constantly",
    "Miss important updates",
    "Waste 2+ hours on app switching",
    "Feel overwhelmed & scattered",
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-10 px-6 overflow-hidden bg-gradient-to-b from-white via-zinc-50/30 to-white"
    >
      {/* Sophisticated background grid */}
      {/* <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px', '0px 0px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      /> */}

      <div className="max-w-7xl mx-auto">
        {/* Enhanced section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 border border-zinc-200/60 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-8 overflow-hidden"
            animate={
              glitchActive
                ? {
                    x: [0, -2, 2, 0],
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(5deg)",
                      "hue-rotate(0deg)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.15 }}
          >
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

            {/* Scanning line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

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
              SYSTEM ANALYSIS
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            animate={
              glitchActive
                ? {
                    x: [0, -3, 3, 0],
                  }
                : {}
            }
            transition={{ duration: 0.15 }}
          >
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              The Current
            </span>
            <br />
            <motion.span
              className="bg-gradient-to-b from-zinc-800 via-zinc-600 to-zinc-800 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "400% 400%",
              }}
            >
              Inefficiency
            </motion.span>
          </motion.h2>

          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Every day you juggle dozens of apps, lose context, miss updates, and
            waste hours switching between tools.
          </p>
        </motion.div>

        {/* Split comparison with enhanced design */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem side - Enhanced with design language */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

              {/* Scanning lines */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative h-96 p-8 flex items-center justify-center">
                {/* Central stressed interface */}
                <motion.div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-200/80 to-zinc-300/60 border border-zinc-400/30 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-zinc-500/60 flex items-center justify-center">
                    <div className="w-4 h-4 rounded bg-zinc-600/80" />
                  </div>
                </motion.div>

                {/* Chaotic app icons with design language */}
                {chaosApps.map((app, index) => (
                  <motion.div
                    key={app.name}
                    className="absolute w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-100/80 to-zinc-200/60 border border-zinc-300/40 flex items-center justify-center shadow-sm backdrop-blur-sm"
                    style={{
                      left: `calc(50% + ${app.position.x}px)`,
                      top: `calc(50% + ${app.position.y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                    animate={
                      currentStep > index
                        ? {
                            opacity: 1,
                            scale: 1,
                          }
                        : {}
                    }
                    transition={{
                      delay: app.delay,
                      duration: 0.6,
                    }}
                  >
                    <div className="text-zinc-600">{app.icon}</div>

                    {/* Corner indicators on hover effect */}
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 border-l border-t border-zinc-400/30" />
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 border-r border-t border-zinc-400/30" />
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-l border-b border-zinc-400/30" />
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-r border-b border-zinc-400/30" />

                    {/* Notification indicators */}
                    {currentStep > 2 && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-zinc-600 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{
                          scale: [0, 0.5, 1],
                        }}
                        transition={{
                          scale: { delay: 1, duration: 0.3 },
                        }}
                      >
                        <div className="w-1 h-1 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Status bar */}
              <div className="relative border-t border-zinc-200/40 bg-white/40 px-6 py-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-3 bg-zinc-500 rounded-full"
                          animate={{
                            scaleY: [1, 2, 1],
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-600 font-mono">
                      CHAOS DETECTED
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    {chaosApps.length} APPS
                  </span>
                </div>
              </div>
            </div>

            {/* Problem metrics */}
            <motion.div
              className="mt-8 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {frustrationPoints.map((point, index) => (
                <motion.div
                  key={point}
                  className="flex items-center gap-3 text-zinc-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={currentStep > index ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                  <span className="text-lg font-medium">{point}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Solution side with enhanced design */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {!showSolution ? (
              <motion.div
                className="relative rounded-3xl bg-gradient-to-br from-zinc-50/40 via-white/20 to-zinc-50/40 backdrop-blur-xl border-2 border-dashed border-zinc-300/60 overflow-hidden"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="h-96 flex items-center justify-center p-8">
                  <div className="text-center text-zinc-400">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-zinc-100/60 border-2 border-dashed border-zinc-300/60 flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        borderColor: [
                          "rgb(212 212 216)",
                          "rgb(161 161 170)",
                          "rgb(212 212 216)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Zap size={24} className="text-zinc-500" />
                    </motion.div>
                    <p className="text-lg font-medium font-mono">
                      SOLUTION LOADING...
                    </p>
                    <div className="flex justify-center gap-1 mt-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-zinc-400"
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

                {/* Scanning lines */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative h-96 p-8 flex flex-col gap-10 items-center justify-end">
                  {/* Central WhatsApp hub */}
                  <motion.div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-200/60 to-zinc-300/40 border-2 border-zinc-400/30 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-xl bg-zinc-600/80 flex items-center justify-center">
                      <IconBrandWhatsapp size={20} className="text-white" />
                    </div>

                    {/* Success indicator */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-white text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 400,
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 border border-zinc-200/60 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-8 overflow-hidden"
                    animate={
                      glitchActive
                        ? {
                            x: [0, -2, 2, 0],
                            filter: [
                              "hue-rotate(0deg)",
                              "hue-rotate(5deg)",
                              "hue-rotate(0deg)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 0.15 }}
                  >
                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

                    {/* Scanning line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

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
                      SYNKLIST
                    </span>
                  </motion.div>

                  {/* Organized service connections */}
                  {chaosApps.slice(0, 5).map((app, index) => {
                    const spacing = 80; // horizontal distance between items
                    const x = (index - (5 - 1) / 2) * spacing; // centers the row
                    const y = -120; // all at same height

                    return (
                      <motion.div
                        key={app.name}
                        className="absolute w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-100/80 to-zinc-200/60 border border-zinc-300/40 flex items-center justify-center shadow-sm backdrop-blur-sm"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                        }}
                        initial={{ opacity: 1, scale: 1 }}
                      >
                        <div className="text-zinc-600">{app.icon}</div>

                        {/* Corner indicators */}
                        <div className="absolute top-1 left-1 w-1.5 h-1.5 border-l border-t border-zinc-400/30" />
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 border-r border-t border-zinc-400/30" />
                        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-l border-b border-zinc-400/30" />
                        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-r border-b border-zinc-400/30" />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Status bar */}
                <div className="relative border-t border-zinc-200/40 bg-white/40 px-6 py-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-3 bg-zinc-600 rounded-full"
                            animate={{
                              scaleY: [1, 1.5, 1],
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-zinc-700 font-mono">
                        UNIFIED SYSTEM
                      </span>
                    </div>
                    <span className="text-xs text-zinc-600 font-mono">
                      1 INTERFACE
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Solution benefits */}
            <motion.div
              className="mt-8 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={showSolution ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {[
                "One unified interface",
                "Never lose context",
                "Instant notifications",
                "Save 2+ hours daily",
                "Feel calm & organized",
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-3 text-zinc-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={showSolution ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                >
                  <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                  <span className="text-lg font-medium">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={showSolution ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.button
            onClick={onOpenWaitlist}
            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-zinc-900 text-white font-semibold text-lg border border-zinc-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/20" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/20" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/20" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/20" />

            <span className="relative z-10">Stop the Chaos. Start Here.</span>

            <motion.div
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemShowcase;
