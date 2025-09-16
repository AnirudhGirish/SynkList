/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ChevronRight,
  Mail,
  Shield,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SynklistLoader from "@/components/SynkLoader";

const JoinWaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [focused, setFocused] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  }, [email]);

  // Rotating stats
  const stats = [
    { value: "2,847", label: "Developers Waiting", icon: <Users size={14} /> },
    { value: "99.9%", label: "Uptime SLA", icon: <Shield size={14} /> },
    { value: "<100ms", label: "Response Time", icon: <Zap size={14} /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !isValid || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to join");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.8] rounded-3xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,.3) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "30px 30px", "0px 0px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {!submitted ? (
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100/60 to-zinc-50/40 border border-zinc-200/50 backdrop-blur-sm mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
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
                EARLY ACCESS
              </span>

              {/* Rotating stats */}
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentStat}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.4 }}
                >
                  {stats[currentStat].icon}
                  <span className="text-sm font-mono text-zinc-800 font-bold">
                    {stats[currentStat].value}
                  </span>
                  <span className="text-sm font-mono text-zinc-500">
                    {stats[currentStat].label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.h2
              className="text-4xl lg:text-5xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                Join the Revolution
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-zinc-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Be among the first to experience AI that understands context,
              manages your tasks, and lives where you chat—all while keeping
              your data{" "}
              <span className="text-zinc-800 font-semibold">
                completely private
              </span>
              .
            </motion.p>
          </div>

          {/* Integration Visual */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          ></motion.div>

          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Input field with enhanced design */}
              <motion.div
                className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  focused
                    ? "border-zinc-400 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                    : "border-zinc-200/60"
                } bg-gradient-to-br from-white/80 to-zinc-50/60 backdrop-blur-sm`}
                whileFocus={{ scale: 1.02 }}
                animate={focused ? { y: -2 } : { y: 0 }}
              >
                {/* Corner accents */}
                <div
                  className={`absolute top-2 left-2 w-3 h-3 border-l border-t transition-colors duration-300 ${
                    focused ? "border-zinc-400/60" : "border-zinc-300/40"
                  }`}
                />
                <div
                  className={`absolute top-2 right-2 w-3 h-3 border-r border-t transition-colors duration-300 ${
                    focused ? "border-zinc-400/60" : "border-zinc-300/40"
                  }`}
                />
                <div
                  className={`absolute bottom-2 left-2 w-3 h-3 border-l border-b transition-colors duration-300 ${
                    focused ? "border-zinc-400/60" : "border-zinc-300/40"
                  }`}
                />
                <div
                  className={`absolute bottom-2 right-2 w-3 h-3 border-r border-b transition-colors duration-300 ${
                    focused ? "border-zinc-400/60" : "border-zinc-300/40"
                  }`}
                />

                {/* Scanning line when focused */}
                {focused && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                <div className="flex items-center px-6 py-4">
                  <motion.div
                    animate={focused ? { rotate: 360 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Mail
                      className={`mr-3 transition-colors duration-300 ${
                        focused ? "text-zinc-700" : "text-zinc-500"
                      }`}
                      size={20}
                    />
                  </motion.div>

                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent border-none focus:outline-none text-zinc-900 placeholder:text-zinc-500 text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />

                  {/* Email validation indicator */}
                  <AnimatePresence>
                    {email && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="ml-[-3rem] lg:ml-3"
                      >
                        {isValid ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-zinc-300" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={!isValid || !email}
                className={`mt-6 w-full relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  isValid && email
                    ? "bg-zinc-900 border-zinc-800 text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
                    : "bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed"
                }`}
                whileHover={isValid && email ? { scale: 1.02, y: -2 } : {}}
                whileTap={isValid && email ? { scale: 0.98 } : {}}
              >
                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center px-8 py-4">
                  <span className="text-lg font-semibold mr-3">
                    {loading ? <SynklistLoader /> : "Join the Waitlist"}
                  </span>
                  {loading ? (
                    ""
                  ) : (
                    <motion.div
                      animate={isValid && email ? { x: [0, 4, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight size={20} />
                    </motion.div>
                  )}
                </div>

                {/* Animated background for active state */}
                {isValid && email && (
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
                )}

                {/* Corner indicators for active state */}
                {isValid && email && (
                  <>
                    <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/20" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/20" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/20" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/20" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>

          {/* Trust indicators */}
          <motion.div
            className="hidden lg:block mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-sm text-zinc-500 mb-4">
              Join developers from top companies
            </p>
            <div className="flex justify-center items-center gap-6 opacity-60">
              {["Microsoft", "Google", "Meta", "Apple", "OpenAI"].map(
                (company) => (
                  <motion.div
                    key={company}
                    className="text-xs font-mono text-neutral-900"
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    {company}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        // Success state
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="relative mx-auto w-24 h-24 mb-8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, ease: "easeInOut" },
              scale: { duration: 1, ease: "easeInOut" },
            }}
          >
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-zink-100 to-zonk-50 border-2 border-neutral-200 flex items-center justify-center text-4xl">
              ✨
            </div>

            {/* Success particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-neutral-400 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, Math.cos((i * 60 * Math.PI) / 180) * 40],
                  y: [0, Math.sin((i * 60 * Math.PI) / 180) * 40],
                  opacity: [1, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          <motion.h3
            className="text-3xl font-bold text-zinc-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to the Synklist
          </motion.h3>

          <motion.div
            className="relative max-w-md mx-auto rounded-2xl bg-gradient-to-br from-zinc-100/80 to-zinc-50/60 border border-zinc-200/50 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

            {/* Scanning line */}
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

            <div className="p-6 text-center">
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-sm font-mono text-zinc-600">
                  REGISTRATION CONFIRMED
                </span>
              </motion.div>

              <p className="text-zinc-700 leading-relaxed">
                You&apos;re now on the exclusive waitlist! We&apos;ll notify you
                the moment SynkList is ready to transform your WhatsApp into an
                AI command center.
              </p>

              <motion.div
                className="mt-4 text-xs font-mono text-zinc-500"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                Position #{Math.floor(Math.random() * 1000) + 2847} in queue
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="hidden lg:block px-6 py-2 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />
              SynkList
            </motion.div>
            <motion.div
              className="px-6 py-2 rounded-xl border border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AI Assistant. Gmail. Calander. Reminders. List
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default JoinWaitlistForm;
