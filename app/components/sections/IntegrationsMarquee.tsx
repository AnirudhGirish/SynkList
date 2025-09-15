"use client";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckSquare } from "lucide-react";
import { IconBrandGoogle, IconBrandGmail, IconBrandNotion, IconBrandGoogleDrive, IconListDetails, IconFileSpreadsheet } from '@tabler/icons-react';

const brands = [
  { name: "Google", icon: IconBrandGoogle },
  { name: "Gmail", icon: IconBrandGmail },
  { name: "Calendar", icon: Calendar },
  { name: "Notion", icon: IconBrandNotion },
  { name: "Drive", icon: IconBrandGoogleDrive },
  { name: "Sheets", icon: IconFileSpreadsheet },
  { name: "Tasks", icon: CheckSquare },
  { name: "Lists", icon: IconListDetails }
];

export default function IntegrationsMarquee() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const items = useMemo(() => [...brands, ...brands, ...brands], []);

  // Periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 12000);

    // Periodic scan effect
    const scanInterval = setInterval(() => {
      setScanActive(true);
      setTimeout(() => setScanActive(false), 3000);
    }, 15000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <section className="px-6 py-20 relative overflow-hidden bg-gradient-to-b from-white via-zinc-50/20 to-white">
      {/* Enhanced background grid */}
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
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      /> */}

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: [0.23, 1, 0.32, 1]
        }}
        className="mx-auto max-w-7xl relative"
      >
        {/* Main container with enhanced glass morphism */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/85 via-zinc-50/80 to-white/85 border border-zinc-200/60 rounded-3xl overflow-hidden shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)]">
          
          {/* Enhanced header section */}
          <motion.div
            className="relative flex items-center justify-center px-8 py-12 border-b border-zinc-200/40 overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Corner accents with enhanced styling */}
            <motion.div
              className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg"
              initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg"
              initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            {/* Multiple scanning effects */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent"
              animate={{
                x: ['100%', '-100%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />

            <motion.div
              className="relative text-center"
              animate={
                glitchActive
                  ? {
                      x: [0, -3, 3, 0],
                      filter: [
                        "hue-rotate(0deg)",
                        "hue-rotate(3deg)",
                        "hue-rotate(0deg)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100/60 to-zinc-50/40 border border-zinc-200/50 backdrop-blur-sm mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-zinc-500 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity
                  }}
                />
                <span className="text-sm font-mono text-zinc-600">INTEGRATION MATRIX</span>
              </motion.div>

              <h3 className="text-3xl lg:text-5xl font-bold tracking-tight relative">
                <motion.span
                  className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "400% 400%"
                  }}
                >
                  Secure Connections
                </motion.span>
                
                {/* Vertical scanning line effect */}
                <motion.div
                  className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-zinc-600/30 to-transparent"
                  animate={{
                    x: [0, 400, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </h3>

              <p className="text-lg text-zinc-600 mt-4 max-w-2xl mx-auto">
                All your essential tools unified through a single, secure interface
              </p>
            </motion.div>

            {/* Enhanced status indicator */}
            <motion.div
              className="hidden lg:flex absolute right-8 items-center gap-2"
              initial={{ opacity: 0, x: 20,}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-zinc-600"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.9, 0.5],
                  boxShadow: [
                    "0 0 0 0 rgba(82, 82, 91, 0.3)",
                    "0 0 0 8px rgba(82, 82, 91, 0)",
                    "0 0 0 0 rgba(82, 82, 91, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-xs font-mono text-zinc-500">ONLINE</span>
            </motion.div>
          </motion.div>

          {/* Enhanced marquee container */}
          <div className="relative py-4 overflow-hidden">
            {/* Enhanced edge fade gradients */}
            <div className="absolute z-20 left-0 h-full w-40 md:w-56 lg:w-72 bg-gradient-to-r from-zinc-50/95 via-zinc-50/70 to-transparent pointer-events-none" />
            <div className="absolute z-20 right-0 h-full w-40 md:w-56 lg:w-72 bg-gradient-to-l from-zinc-50/95 via-zinc-50/70 to-transparent pointer-events-none" />

            {/* Global scan effect */}
            <AnimatePresence>
              {scanActive && (
                <motion.div
                  className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-zinc-600/40 to-transparent z-30"
                  initial={{ x: -8 }}
                  animate={{ x: window.innerWidth || 1200 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
              )}
            </AnimatePresence>

            {/* Enhanced marquee content */}
            <motion.div
              className="flex items-center min-w-max gap-8 px-12 py-10 will-change-transform"
              animate={{ x: [0, -2400] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ animationPlayState: hoveredIndex !== null ? "paused" : "running" }}
            >
              {items.map((brand, index) => {
                const Icon = brand.icon;
                return (
                  <motion.div
                    key={`${brand.name}-${index}`}
                    className="group relative shrink-0 w-52 h-36 cursor-pointer"
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{
                      scale: 1.08,
                      y: -4,
                      z: 10,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {/* Enhanced card background */}
                    <motion.div
                      className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/70 to-zinc-100/50 backdrop-blur-sm border border-zinc-300/40 overflow-hidden shadow-lg"
                      whileHover={{
                        borderColor: "rgba(82, 82, 91, 0.4)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                        background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(244,244,245,0.6) 100%)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Enhanced corner indicators */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-zinc-400/30 rounded-tl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-zinc-400/30 rounded-tr opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-zinc-400/30 rounded-bl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-zinc-400/30 rounded-br opacity-0 group-hover:opacity-100 transition-all duration-300" />

                      {/* Enhanced background glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-zinc-600/5 via-transparent to-zinc-700/5 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.4 }}
                      />

                      {/* Content */}
                      <div className="relative flex flex-col items-center justify-center h-full p-6 gap-5">
                        {/* Enhanced icon container */}
                        <motion.div
                          className="relative"
                          whileHover={{ 
                            rotate: [0, -8, 8, 0],
                            scale: 1.1
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-100/90 to-zinc-200/70 border border-zinc-300/50 shadow-inner backdrop-blur-sm">
                            <Icon
                              className="w-7 h-7 text-zinc-600 group-hover:text-zinc-800 transition-colors duration-300"
                              strokeWidth={1.5}
                            />
                          </div>

                          {/* Enhanced icon glow effect */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-zinc-600/10 opacity-0 group-hover:opacity-100 blur-lg"
                            transition={{ duration: 0.4 }}
                          />

                          {/* Pulse ring */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-zinc-400/20 opacity-0 group-hover:opacity-100"
                            animate={hoveredIndex === index ? {
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5]
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                        </motion.div>

                        {/* Enhanced brand name */}
                        <motion.div
                          className="relative text-center"
                          whileHover={{ y: -3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <p className="text-lg font-semibold text-zinc-700 group-hover:text-zinc-900 transition-colors duration-300 tracking-wide font-mono">
                            {brand.name}
                          </p>

                          {/* Enhanced text underline effect */}
                          <motion.div
                            className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-zinc-400 via-zinc-700 to-zinc-400"
                            initial={{ width: 0, opacity: 0 }}
                            whileHover={{ 
                              width: "100%", 
                              opacity: 1,
                              background: [
                                "linear-gradient(90deg, #a1a1aa, #374151, #a1a1aa)",
                                "linear-gradient(90deg, #374151, #a1a1aa, #374151)",
                                "linear-gradient(90deg, #a1a1aa, #374151, #a1a1aa)"
                              ]
                            }}
                            transition={{ 
                              width: { duration: 0.4 },
                              background: { duration: 1.5, repeat: Infinity }
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Enhanced holographic scan line effect */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent z-10"
                          initial={{ y: 0, opacity: 0 }}
                          animate={{
                            y: [0, 144, 0],
                            opacity: [0, 1, 0],
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Enhanced status bar */}
          <motion.div 
            className="relative flex items-center justify-between px-8 py-5 border-t border-zinc-200/40 bg-white/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {/* Scanning line across status bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/40 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            />

            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-5 bg-zinc-500 rounded-full"
                    animate={{
                      scaleY: [1, 2.2, 1],
                      opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-600 font-mono font-medium">
                SYNC ACTIVE
              </span>
              
              {/* Connection indicator */}
              <motion.div
                className="hidden lg:flex items-center gap-2"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                <span className="text-xs text-zinc-500 font-mono">ENCRYPTED</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-600 font-mono font-medium bg-neutral-300 p-1 rounded">
                {brands.length} INTEGRATIONS
              </span>
              <motion.div
                className="hidden lg:block px-3 py-1 rounded-full bg-zinc-200/60 border border-zinc-300/40"
                animate={{
                  background: [
                    "rgba(228, 228, 231, 0.6)",
                    "rgba(244, 244, 245, 0.8)",
                    "rgba(228, 228, 231, 0.6)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              >
                <span className="text-xs text-zinc-700 font-mono">READY</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced outer glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-600/8 via-transparent to-zinc-700/5 opacity-60 blur-2xl -z-10" />
      </motion.div>
    </section>
  );
}