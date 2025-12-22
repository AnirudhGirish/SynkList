/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Shield, Zap, Lock } from "lucide-react";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const router = useRouter();
  const supabase = createClient();

  const metrics = [
    { value: "E2E", label: "Encrypted" },
    { value: "0", label: "Data Stored" },
    { value: "∞", label: "Possibilities" },
  ];

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.push("/dashboard");
    };
    checkSession();
  }, [supabase, router]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 12000);

    const metricInterval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(metricInterval);
    };
  }, [metrics.length]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-linear-to-b from-white via-zinc-50/30 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.08) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Status badge */}
            <motion.div
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-linear-to-br from-zinc-100/90 via-white/80 to-zinc-100/90 border border-zinc-200/80 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-10 overflow-hidden"
              animate={glitchActive ? { x: [0, -2, 2, 0] } : {}}
              transition={{ duration: 0.12 }}
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full relative z-10"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-mono text-zinc-700 relative z-10">SECURE ACCESS</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
              animate={glitchActive ? { x: [0, -3, 3, 0] } : {}}
              transition={{ duration: 0.12 }}
            >
              <span className="bg-linear-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                Welcome
              </span>
            </motion.h1>

            <p className="text-xl text-zinc-600 max-w-md mx-auto">
              Sign in to access your unified command center. 
              Private by design, powerful by nature.
            </p>
          </motion.div>

          {/* Main Login Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative rounded-3xl bg-linear-to-br from-zinc-100/80 via-white/70 to-zinc-100/80 backdrop-blur-xl border border-zinc-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

              {/* Scanning line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-600/40 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="p-12 md:p-16">
                {/* Central orb visualization */}
                <div className="relative h-48 flex items-center justify-center mb-12">
                  <motion.div
                    className="relative w-28 h-28 rounded-3xl bg-linear-to-br from-zinc-200/80 to-zinc-300/60 border-2 border-zinc-400/50 flex items-center justify-center backdrop-blur-sm"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center">
                      <Lock size={24} className="text-white" />
                    </motion.div>

                    {/* Pulse rings */}
                    <motion.div
                      className="absolute inset-2 rounded-2xl border border-zinc-500/30"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-zinc-400/20"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.div>

                  {/* Floating icons */}
                  {[
                    { icon: <Shield size={16} />, x: -80, y: -30 },
                    { icon: <Zap size={16} />, x: 80, y: -30 },
                    { icon: <Lock size={16} />, x: 0, y: 60 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-10 h-10 rounded-xl bg-zinc-100/80 border border-zinc-300/50 flex items-center justify-center backdrop-blur-sm"
                      style={{ left: `calc(50% + ${item.x}px - 20px)`, top: `calc(50% + ${item.y}px - 20px)` }}
                      animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <div className="text-zinc-600">{item.icon}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Login Button */}
                <motion.button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="group relative w-full overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-zinc-800 via-zinc-700 to-zinc-800"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative px-8 py-5 flex items-center justify-center gap-4">
                      {loading ? (
                        <motion.div
                          className="w-6 h-6 border-2 border-zinc-500 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <IconBrandGoogle size={24} className="text-white relative z-10" />
                      )}
                      <span className="text-lg font-semibold text-white relative z-10">
                        {loading ? "Connecting..." : "Continue with Google"}
                      </span>
                    </div>

                    {/* Button corner accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/20" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/20" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/20" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/20" />
                  </div>
                </motion.button>

                {/* Privacy note */}
                <p className="text-center text-sm text-zinc-500 mt-8">
                  By signing in, you agree to our Terms and Privacy Policy.
                  <br />
                  <span className="text-zinc-600 font-medium">Your data is encrypted end-to-end.</span>
                </p>
              </div>

              {/* Footer */}
              <div className="relative border-t border-zinc-200/40 bg-white/40 px-8 py-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-zinc-600 font-mono">SYSTEM READY</span>
                  </div>
                  <motion.div
                    className="flex items-center gap-2"
                    key={activeMetric}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-zinc-800 font-mono font-bold">{metrics[activeMetric].value}</span>
                    <span className="text-zinc-500 font-mono">{metrics[activeMetric].label}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom metrics */}
          <motion.div
            className="flex justify-center items-center gap-12 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { metric: "100%", label: "Private" },
              { metric: "<1s", label: "Response" },
              { metric: "24/7", label: "Available" },
            ].map((item, index) => (
              <motion.div
                key={item.metric}
                className="text-center"
                whileHover={{ y: -2 }}
              >
                <div className="text-2xl font-mono font-bold text-zinc-800 mb-1">{item.metric}</div>
                <div className="text-sm text-zinc-500">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
