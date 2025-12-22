"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

type ComingSoonTabProps = {
  platformName: string;
};

export default function ComingSoonTab({ platformName }: ComingSoonTabProps) {
  return (
    <div className="text-center py-24">
      <motion.div
        className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-zinc-100 border border-zinc-200 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Mail size={40} className="text-zinc-400" />
      </motion.div>
      <motion.h3
        className="text-2xl font-bold text-zinc-800 mb-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Coming Soon
      </motion.h3>
      <motion.p
        className="text-zinc-600 max-w-md mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {platformName} integration is on the way. Stay tuned for updates!
      </motion.p>
    </div>
  );
}
