"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { User, CheckSquare } from "lucide-react";
import SystemFlowDiagramWireframe from "@/components/SVGanim";

const SystemFlowDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [glitchActive, setGlitchActive] = useState(false);

  // Periodic effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 18000);

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-zinc-50/20 to-white"
    >
      {/* Background pattern */}
      {/* <motion.div
        className="absolute inset-0 opacity-[0.008]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      /> */}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
                      "hue-rotate(1deg)",
                      "hue-rotate(0deg)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.1 }}
          >
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

            <motion.div
              className="w-2 h-2 bg-zinc-500 rounded-full relative z-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-sm font-mono text-zinc-600 relative z-10">
              SYSTEM ARCHITECTURE
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            animate={
              glitchActive
                ? {
                    x: [0, -2, 2, 0],
                  }
                : {}
            }
            transition={{ duration: 0.1 }}
          >
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              How It All Connects
            </span>
          </motion.h2>

          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            See the intelligent data flow that powers your unified command
            center through WhatsApp.
          </p>
        </motion.div>
        <div className="mt-[-6rem] lg:mt-[-10rem]">
          <SystemFlowDiagramWireframe />
        </div>

        {/* Flow explanation */}
        <motion.div
          className="text-center max-w-4xl mx-auto lg:mt-[-6rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <div className="relative rounded-2xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden p-8">
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-zinc-400/40" />
            <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-zinc-400/40" />

            <h3 className="text-2xl font-bold text-zinc-900 mb-4">
              Seamless Data Flow
            </h3>

            <p className="text-zinc-700 leading-relaxed mb-6">
              Your request flows from WhatsApp to SynkList, which intelligently
              routes it to the appropriate AI model (OpenAI or Anthropic) and
              integrations (Gmail, Calendar, Notion, etc.) to deliver the
              perfect response back through your familiar chat interface.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center mb-3">
                  <User size={16} className="text-zinc-700" />
                </div>
                <div className="font-semibold text-zinc-800 mb-1">You Chat</div>
                <div className="text-zinc-600 text-center">
                  Natural conversation in WhatsApp
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-zinc-300/60 border border-zinc-400/40 flex items-center justify-center mb-3">
                  <div className="w-3 h-3 bg-zinc-700 rounded" />
                </div>
                <div className="font-semibold text-zinc-800 mb-1">
                  SynkList Processes
                </div>
                <div className="text-zinc-600 text-center">
                  AI analyzes and routes your request
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center mb-3">
                  <CheckSquare size={16} className="text-zinc-700" />
                </div>
                <div className="font-semibold text-zinc-800 mb-1">
                  Task Completed
                </div>
                <div className="text-zinc-600 text-center">
                  Results delivered instantly
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SystemFlowDiagram;
