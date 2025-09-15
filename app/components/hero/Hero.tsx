"use client";
import { ArrowRight, Shield, Zap, MessageSquare } from "lucide-react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IconBrandWhatsapp } from '@tabler/icons-react';
import Visual from "@/components/Visual";

const Hero = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100 };
  const mouseSpringX = useSpring(mouseX, springConfig);
  const mouseSpringY = useSpring(mouseY, springConfig);

  // Rotating data points
  const dataPoints = [
    { value: "∞", label: "Possibilities", icon: <Zap size={14} /> },
    { value: "E2E", label: "Encrypted", icon: <Shield size={14} /> },
    { value: "24/7", label: "Available", icon: <MessageSquare size={14} /> }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set((x - rect.width / 2) * 0.02);
        mouseY.set((y - rect.height / 2) * 0.02);
      }
    };

    // Periodic glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 12000);

    // Data rotation
    const dataInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dataPoints.length);
    }, 2500);

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
      clearInterval(dataInterval);
    };
  }, [mouseX, mouseY, dataPoints.length]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 lg:pt-40 pb-16 overflow-hidden"
      onMouseEnter={() => setIsInView(true)}
      onMouseLeave={() => setIsInView(false)}
    >

      {/* Ambient mouse-following field */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.2] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 60%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
        animate={{
          scale: isInView ? 1.3 : 1,
          opacity: isInView ? 0.04 : 0.02
        }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* Main Brand Identity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          {/* Primary logo */}
          <motion.div 
            className="relative mb-8"
            style={{
              x: mouseSpringX,
              y: mouseSpringY
            }}
            animate={
              glitchActive
                ? {
                    x: [0, -3, 3, 0],
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(5deg)",
                      "hue-rotate(0deg)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.15 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight relative">
              <motion.span 
                className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent relative inline-block"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "400% 400%"
                }}
              >
                SynkList
              </motion.span>
              
              {/* Layered glitch shadows */}
              <span className="absolute -top-1 -left-1 text-zinc-900/4 font-bold text-6xl md:text-8xl lg:text-9xl -z-10">
                SynkList
              </span>
              <span className="absolute -bottom-1 -right-1 text-zinc-900/3 font-bold text-6xl md:text-8xl lg:text-9xl -z-20">
                SynkList
              </span>
            </h1>
          </motion.div>

          {/* Command interface tagline */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-zinc-100/60 via-zinc-50/40 to-zinc-100/60 border border-zinc-200/50 backdrop-blur-sm">
              <span className="text-lg md:text-xl font-mono text-zinc-500">{">"}</span>
              <motion.span 
                className="text-lg md:text-xl font-medium text-black"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
               AI Command Center in{" "}
              </motion.span>
              <motion.span 
                className="text-lg md:text-xl font-bold text-[#25D366] relative flex items-center gap-1"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(37, 211, 102, 0)",
                    "0 0 8px rgba(37, 211, 102, 0.3)",
                    "0 0 0px rgba(37, 211, 102, 0)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              >
               WhatsApp <IconBrandWhatsapp/> 
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
               <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <div className="relative mx-auto max-w-xl">
            <div className="relative rounded-2xl bg-gradient-to-br from-white/70 via-zinc-50/60 to-white/70 backdrop-blur-xl border border-zinc-200/50 overflow-hidden shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)]">
              
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

              {/* Scanning line */}
               <motion.div
                  className="absolute top-0 left-auto right-auto w-full h-0.5 bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-30"
                  animate={{
                    y: [-15, 55, -15],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                    <span className="text-sm font-mono text-zinc-600">SYSTEM ONLINE</span>
                  </div>
                  
                  {/* Rotating data display */}
                  <AnimatePresence>
                    <motion.div
                      key={activeIndex}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0.4, rotateY: 90}}
                      animate={{ opacity: 1, rotateY: 0}}
                      transition={{ duration: 0.3 }}
                    >
                      {dataPoints[activeIndex].icon}
                      <span className="text-sm font-mono text-zinc-800 font-bold">
                        {dataPoints[activeIndex].value}
                      </span>
                      <span className="text-sm font-mono text-zinc-500">
                        {dataPoints[activeIndex].label}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Core value proposition */}
        <div
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed">
              Your AI assistant lives where you chat. Connect Gmail, Calendar, Notion and more.{" "}
              <span 
                className="text-zinc-800 font-semibold"
              >
                Private by design.
              </span>
            </p>
          </div>
        </div>

        {/* Advanced CTA Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            
            {/* Primary Action */}
            <motion.button
              onClick={onOpenWaitlist}
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
                {/* Animated background layers */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative px-8 py-4 flex items-center gap-3">
                  <span className="text-lg font-semibold text-white relative z-10">
                    Join Waitlist
                  </span>
                  
                  <motion.div
                    className="relative z-10"
                    animate={{ 
                      x: [0, 4, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  >
                    <ArrowRight size={20} className="text-white" />
                  </motion.div>
                </div>

                {/* Corner scan effects */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/20" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/20" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/20" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/20" />
              </div>
            </motion.button>
          </div>
        </motion.div>

      <Visual />


        {/* System Metrics Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="relative"
        >
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">
            {[
              { metric: "100%", label: "Private", desc: "End-to-end encrypted" },
              { metric: "<1s", label: "Response", desc: "Lightning fast AI" },
              { metric: "24/7", label: "Available", desc: "Always-on assistant" }
            ].map((item, index) => (
              <motion.div
                key={item.metric}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-2xl md:text-3xl font-mono font-bold text-zinc-800 mb-1">
                  {item.metric}
                </div>
                <div className="text-sm font-semibold text-zinc-600 mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-zinc-500">
                  {item.desc}
                </div>
                
                {/* Metric underline */}
                <motion.div
                  className="mt-2 mx-auto h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;