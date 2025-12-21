"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { IconBrandGoogle } from "@tabler/icons-react";
import Image from "next/image";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Check if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  // Periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 12000);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-white via-zinc-50/30 to-white">
      {/* Background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Main card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-white/95 via-zinc-50/90 to-white/95 backdrop-blur-2xl border border-zinc-200/60 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
          {/* Corner accents */}
          <motion.div
            className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          />

          {/* Scanning line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                className="flex justify-center mb-6"
                animate={
                  glitchActive
                    ? { x: [0, -2, 2, 0], filter: ["hue-rotate(0deg)", "hue-rotate(3deg)", "hue-rotate(0deg)"] }
                    : {}
                }
                transition={{ duration: 0.12 }}
              >
                <Image
                  src="/icon-512.png"
                  alt="SynkList"
                  width={64}
                  height={64}
                  className="rounded-2xl"
                />
              </motion.div>

              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100/60 to-zinc-50/40 border border-zinc-200/50 backdrop-blur-sm mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-mono text-zinc-600">SECURE LOGIN</span>
              </motion.div>

              <motion.h1
                className="text-3xl font-bold tracking-tight mb-3"
                animate={glitchActive ? { x: [0, -2, 2, 0] } : {}}
                transition={{ duration: 0.12 }}
              >
                <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                  Welcome to SynkList
                </span>
              </motion.h1>

              <p className="text-zinc-600">
                Sign in to access your unified command center
              </p>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Google Sign In Button */}
            <motion.button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl border border-zinc-200/60 bg-white hover:bg-zinc-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {/* Corner accents on button */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-300/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-300/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-300/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-300/50 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative px-6 py-4 flex items-center justify-center gap-4">
                {loading ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-700 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <IconBrandGoogle size={24} className="text-zinc-700" />
                    <span className="text-lg font-medium text-zinc-800">
                      Continue with Google
                    </span>
                  </>
                )}
              </div>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-zinc-200/60" />
              <span className="text-xs font-mono text-zinc-500">SECURE</span>
              <div className="flex-1 h-px bg-zinc-200/60" />
            </div>

            {/* Security info */}
            <div className="flex items-center justify-center gap-3 text-zinc-600">
              <Shield size={16} />
              <span className="text-sm">End-to-end encrypted • Privacy first</span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          className="text-center mt-6 text-sm text-zinc-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-zinc-700 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-zinc-700 hover:underline">
            Privacy Policy
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
