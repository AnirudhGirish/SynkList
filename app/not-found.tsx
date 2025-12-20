"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { AlertTriangle, ArrowLeft, Home, Search, Zap } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanActive, setScanActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 8000);

    const scanInterval = setInterval(() => {
      setScanActive(true);
      setTimeout(() => setScanActive(false), 2000);
    }, 12000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50/30 to-white flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px", "0px 0px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <main ref={containerRef} className="relative px-6 py-20 w-full max-w-4xl mx-auto text-center">
        
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 border border-zinc-200/60 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-12 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
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
            SYSTEM ALERT
          </span>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-8xl md:text-9xl font-bold tracking-tight mb-6 font-mono"
            animate={
              glitchActive
                ? {
                    x: [0, -4, 4, 0],
                    textShadow: [
                      "0 0 0 transparent",
                      "2px 0 0 rgba(113, 113, 122, 0.3), -2px 0 0 rgba(113, 113, 122, 0.3)",
                      "0 0 0 transparent"
                    ]
                  }
                : {}
            }
            transition={{ duration: 0.15 }}
          >
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              404
            </span>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-zinc-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Resource Not Found
          </motion.h2>

          <motion.p
            className="text-lg text-zinc-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The requested endpoint could not be located in the system architecture. 
            This may be due to a mistyped URL or the resource has been moved.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
              animate={
                scanActive
                  ? {
                      x: ["-100%", "100%"],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            />

            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-4">
                  System Diagnostic
                </h3>
                <p className="text-zinc-600">
                  Error analysis and recovery options
                </p>
              </div>

              <div className="relative h-32 flex items-center justify-center mb-8">
                <motion.div
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-200/80 to-zinc-300/60 border-2 border-zinc-400/40 flex items-center justify-center backdrop-blur-sm"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AlertTriangle size={24} className="text-zinc-700" />

                  <motion.div
                    className="absolute inset-[-4px] rounded-2xl border border-zinc-500/30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />

                  <motion.div
                    className="absolute inset-[-8px] rounded-2xl border border-zinc-400/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white/60 border border-zinc-200/50">
                  <div className="font-medium text-zinc-800 mb-1">Status Code</div>
                  <div className="font-mono text-zinc-600">HTTP 404</div>
                </div>
                <div className="p-4 rounded-xl bg-white/60 border border-zinc-200/50">
                  <div className="font-medium text-zinc-800 mb-1">Error Type</div>
                  <div className="font-mono text-zinc-600">NOT_FOUND</div>
                </div>
                <div className="p-4 rounded-xl bg-white/60 border border-zinc-200/50">
                  <div className="font-medium text-zinc-800 mb-1">Response Time</div>
                  <div className="font-mono text-zinc-600">143ms</div>
                </div>
              </div>
            </div>

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
                    DIAGNOSTIC COMPLETE
                  </span>
                </div>
                <span className="text-zinc-600 font-mono">
                  SYSTEM OPERATIONAL
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-b from-zinc-100/90 to-zinc-200/60 border border-zinc-300/70 text-zinc-800 font-medium shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <Home size={18} className="group-hover:scale-110 transition-transform duration-200" />
              Return Home
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/60 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/80 border border-zinc-200/80 text-zinc-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Go Back
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Link
              href="/docs"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/80 border border-zinc-200/80 text-zinc-700 font-medium shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <Search size={18} className="group-hover:scale-110 transition-transform duration-200" />
              Search Docs
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-zinc-500 font-mono">
            <Zap size={14} />
            <span>System operational • All services online</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFoundPage;