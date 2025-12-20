// ./comonents/SynkLoarder.tsx
"use client";
import { motion } from "framer-motion";
import React from "react";

interface SynklistLoaderProps {
  size?: number;
  color?: string;
  text?: string;
}

const SynklistLoader: React.FC<SynklistLoaderProps> = ({
  size = 8,
  color = "bg-gradient-to-r from-zinc-400 via-white to-zinc-400 shadow-[0_0_8px_rgba(255,255,255,0.6)]",
  text,
}) => {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`rounded-full ${color}`}
          style={{ width: size, height: size }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
      {text && (
        <span className="text-sm font-mono text-white/80">{text}</span>
      )}
    </div>
  );
};

export default SynklistLoader;
