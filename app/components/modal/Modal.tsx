"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  const [glitchActive, setGlitchActive] = useState(false);

  // Close on ESC key
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Periodic glitch effect for the modal border
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 8000);
    return () => clearInterval(interval);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
        >
          {/* Enhanced backdrop with animated patterns */}
          <motion.div
            className="absolute inset-0 backdrop-blur-xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Animated grid overlay */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "40px 40px", "0px 0px"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Modal container */}
          <motion.div
            className="relative w-full max-w-2xl"
            initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.95, rotateX: -5 }}
            transition={{
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1],
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal box with glass morphism */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 via-zinc-50/90 to-white/95 backdrop-blur-2xl border border-zinc-200/60 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.2)]">
              {/* Corner accent decorations */}
              <motion.div
                className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.div
                className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg"
                initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg"
                initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <motion.div
                className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />

              {/* Enhanced close button */}
              <button
                onClick={onClose}
                className="absolute top-6 left-8 group relative w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-100/80 via-white/70 to-zinc-200/60 border border-zinc-300/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-150 ease-in-out
    active:scale-95 active:translate-y-[2px]"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-zinc-200/50 via-transparent to-zinc-300/30 rounded-2xl "
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="relative z-10"
                  animate={
                    glitchActive
                      ? {
                          rotate: [0, -10, 10, 0],
                          scale: [1, 0.9, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.1 }}
                >
                  <X
                    strokeWidth={2.5}
                    size={20}
                    className="text-zinc-700 drop-shadow-sm"
                  />
                </motion.div>

                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-zinc-300/30 rounded-2xl"
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileHover={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Corner indicators */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-l border-t border-zinc-400 opacity-100 transition-opacity duration-300" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-r border-t border-zinc-400 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-l border-b border-zinc-400 opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-r border-b border-zinc-400 opacity-100 transition-opacity duration-300" />
              </button>

              {/* Content area with padding */}
              <div className="p-8 lg:p-12 relative z-10">{children}</div>

              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-zinc-100/20 pointer-events-none" />
            </div>

            {/* Outer glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-900/5 to-transparent opacity-60 blur-2xl -z-10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
