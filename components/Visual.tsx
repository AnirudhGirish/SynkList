/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowRight, Shield, Zap, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const Visual = () => {
  const connectedServices = [
    "Gmail",
    "Calendar",
    "Drive",
    "Notion",
    "Slack",
    "Teams",
    "Tasks",
    "Sheets",
  ];


  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{scale:1.05}}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="mb-16"
      >
        <div className="relative mx-auto max-w-2xl">
          <div className="relative rounded-2xl bg-gradient-to-br from-white/70 via-zinc-50/60 to-white/70 backdrop-blur-xl border border-zinc-200/50 overflow-hidden shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)]">
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

            {/* Data flow visualization */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(45deg, transparent 48%, rgba(82, 82, 91, 0.1) 49%, rgba(82, 82, 91, 0.1) 51%, transparent 52%)",
                backgroundSize: "20px 20px",
              }}
              animate={
                {
                      backgroundPosition: ["0px 0px", "20px 20px"],
                    }
              }
              transition={{
                duration: 2,
                ease: "linear",
              }}
            />

            <div className="relative px-8 py-6">
              {/* System status */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-sm font-mono text-zinc-600">
                    UNIFIED SYSTEM
                  </span>
                </div>

                {/* Rotating data display */}
                {/* <AnimatePresence>
                  <motion.div
                    key={activeIndex}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0.4, rotateY: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {dataPoints[activeIndex].icon}
                    <span className="text-sm font-mono text-zinc-800 font-bold">
                      {dataPoints[activeIndex].value}
                    </span>
                    <span className="text-sm font-mono text-zinc-500">
                      {dataPoints[activeIndex].label}
                    </span>
                  </motion.div>
                </AnimatePresence> */}
              </div>

              {/* Transformation representation */}
              <div className="flex items-center justify-between py-4">
                {/* Fragmented state */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs font-mono text-zinc-500 mb-1">
                    BEFORE
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 rounded bg-zinc-400/80 border border-zinc-400/30"
                        animate={{
                          scale: [1, 0.9, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-600 mt-1">Scattered</span>
                </div>

                {/* Transformation arrow */}
                <motion.div
                  className="flex items-center gap-2 px-4"
                  animate={
{
                          x: [0, 8, 0],
                        }

                  }
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="w-8 h-px bg-zinc-400"
                    animate={{
                      scaleX: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <ArrowRight size={16} className="text-zinc-600" />
                  <motion.div
                    className="w-8 h-px bg-zinc-400"
                    animate={{
                      scaleX: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  />
                </motion.div>

                {/* Unified state */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xs font-mono text-zinc-500 mb-1">
                    AFTER
                  </div>
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-zinc-700/80 border-2 border-zinc-600/40 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(82, 82, 91, 0.3)",
                        "0 0 0 8px rgba(82, 82, 91, 0)",
                        "0 0 0 0 rgba(82, 82, 91, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <IconBrandWhatsapp size={16} className="text-white" />
                  </motion.div>
                  <span className="text-xs text-zinc-800 mt-1 font-medium">
                    Unified
                  </span>
                </div>
              </div>

              {/* Connected services count */}
              <div className="flex items-center justify-center pt-4 border-t border-zinc-200/40">
                <motion.span
                  className="text-sm font-mono text-zinc-600"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  {connectedServices.length}+ APPS CONNECTED
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Visual;
