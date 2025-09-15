/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  MessageSquare, 
  Smartphone, 
  Globe, 
  Zap, 
  X,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { IconBrandWhatsapp } from '@tabler/icons-react';

interface CompetitiveEdgeProps {
  onOpenWaitlist: () => void;
}

const CompetitiveEdge = ({ onOpenWaitlist }: CompetitiveEdgeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeComparison, setActiveComparison] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [transitionActive, setTransitionActive] = useState(false);

  // Auto-rotate comparisons
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setTransitionActive(true);
      setTimeout(() => {
        setActiveComparison((prev) => (prev + 1) % 4);
        setTransitionActive(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView]);


  const comparisons = [
    {
      title: "No Context Switching",
      description: "Stay in your familiar WhatsApp interface",
      problem: "Traditional apps force you to juggle 10+ different interfaces daily",
      solution: "Everything happens in WhatsApp - no app switching required",
      icon: <MessageSquare size={20} />
    },
    {
      title: "Always Available", 
      description: "WhatsApp is always open on every device you own",
      problem: "Standalone apps get buried, forgotten, or require separate logins",
      solution: "Access your AI assistant instantly - WhatsApp is always there",
      icon: <Smartphone size={20} />
    },
    {
      title: "Universal Platform",
      description: "Works on any device, any OS, anywhere in the world",
      problem: "Platform-specific apps limit where and how you can work",
      solution: "WhatsApp works everywhere - desktop, mobile, web, all OS",
      icon: <Globe size={20} />
    },
    {
      title: "Zero Learning Curve",
      description: "No new interfaces, shortcuts, or workflows to memorize",
      problem: "Complex dashboards require training and constant re-learning",
      solution: "Just chat naturally - you already know how to use WhatsApp",
      icon: <Zap size={20} />
    }
  ];

  const traditionalApps = [
    { name: "Email Client", status: "disconnected", issues: 3 },
    { name: "Calendar App", status: "offline", issues: 1 },
    { name: "Task Manager", status: "syncing", issues: 2 },
    { name: "File Storage", status: "error", issues: 4 },
    { name: "Note Taking", status: "disconnected", issues: 2 },
    { name: "CRM System", status: "loading", issues: 1 }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-zinc-50/30 to-white"
    >
      {/* Enhanced background pattern */}
      {/* <motion.div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,.03) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px', '0px 0px']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      /> */}

      <div className="max-w-7xl mx-auto">
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
                      "hue-rotate(2deg)",
                      "hue-rotate(0deg)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.12 }}
          >
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

            {/* Scanning line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div 
              className="w-2 h-2 bg-zinc-500 rounded-full relative z-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <span className="text-sm font-mono text-zinc-600 relative z-10">COMPETITIVE ANALYSIS</span>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            animate={
              glitchActive
                ? {
                    x: [0, -3, 3, 0],
                  }
                : {}
            }
            transition={{ duration: 0.12 }}
          >
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              Why WhatsApp
            </span>
            <br />
            <motion.span 
              className="bg-gradient-to-b from-zinc-800 via-zinc-600 to-zinc-800 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: "400% 400%"
              }}
            >
              Changes Everything
            </motion.span>
          </motion.h2>

          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Stop juggling dozens of apps. Start working where you already spend your time.
          </p>
        </motion.div>

        {/* Main comparison split */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          
          {/* Traditional approach - chaos */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

              {/* Header */}
              <div className="relative border-b border-zinc-200/40 bg-white/40 px-6 py-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-zinc-600" size={20} />
                  <h3 className="text-lg font-bold text-zinc-800">Traditional Apps</h3>
                  <div className="flex gap-1 ml-auto">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-zinc-500 rounded-full"
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* App chaos visualization */}
              <div className="relative p-2 lg:p-4 h-80">
                <div className="grid grid-cols-2 gap-3 h-full">
                  {traditionalApps.map((app, index) => (
                    <motion.div
                      key={app.name}
                      className="relative p-2 lg:p-3 rounded-xl bg-gradient-to-br from-zinc-200/40 to-zinc-300/30 border border-zinc-400/30 backdrop-blur-sm"
                      animate={{
                        y: [0, -2, 0],
                        rotate: [0, Math.random() * 2 - 1, 0]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded bg-zinc-500/60" />
                        <span className="text-xs font-medium text-zinc-700 truncate">
                          {app.name}
                        </span>
                      </div>
                      
                      {/* Status indicators */}
                      <div className="flex flex-col lg:flex-row items-center justify-between">
                        <motion.div
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                            app.status === 'disconnected' ? 'bg-zinc-400/60 text-zinc-700' :
                            app.status === 'error' ? 'bg-zinc-500/60 text-white' :
                            app.status === 'syncing' ? 'bg-zinc-300/60 text-zinc-700' :
                            'bg-zinc-200/60 text-zinc-700'
                          }`}
                        >
                          {app.status === 'syncing' ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <RefreshCw size={8} />
                            </motion.div>
                          ) : (
                            <X size={8} />
                          )}
                          {app.status}
                        </motion.div>
                        
                        {app.issues > 0 && (
                          <div className="text-xs text-zinc-600">
                            {app.issues} issues
                          </div>
                        )}
                      </div>

                      {/* Corner indicators */}
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-l border-t border-zinc-400/30" />
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-r border-t border-zinc-400/30" />
                      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-l border-b border-zinc-400/30" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-r border-b border-zinc-400/30" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Status footer */}
              <div className="relative border-t border-zinc-200/40 bg-white/40 px-6 py-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 font-mono">12 APPS REQUIRED</span>
                  <span className="text-zinc-700 font-mono">13 ISSUES</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp approach - unified */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

              {/* Header */}
              <div className="relative border-b border-zinc-200/40 bg-white/40 px-6 py-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-zinc-700" size={20} />
                  <h3 className="text-lg font-bold text-zinc-800">SynkList + WhatsApp</h3>
                  <motion.div
                    className="w-2 h-2 bg-zinc-700 rounded-full ml-auto"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </div>
              </div>

              {/* Unified interface visualization */}
              <div className="relative p-6 h-80 flex items-center justify-center">
                
                {/* Central WhatsApp interface */}
                <motion.div
                  className="relative w-48 h-64 rounded-2xl bg-gradient-to-br from-zinc-200/60 to-zinc-300/40 border-2 border-zinc-400/30 flex flex-col overflow-hidden backdrop-blur-sm"
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(82, 82, 91, 0.1)",
                      "0 0 0 8px rgba(82, 82, 91, 0)",
                      "0 0 0 0 rgba(82, 82, 91, 0.1)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                >
                  {/* Chat header */}
                  <div className="bg-zinc-300/60 px-3 py-2 border-b border-zinc-400/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center">
                        <IconBrandWhatsapp size={12} className="text-white" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-800">SynkList</span>
                      <div className="ml-auto w-2 h-2 bg-zinc-700 rounded-full" />
                    </div>
                  </div>

                  {/* Chat content */}
                  <div className="flex-1 p-3 space-y-2 bg-zinc-100/40">
                    {[
                      "Check my emails",
                      "Schedule meeting for 3pm",
                      "Add groceries to list",
                      "Find Q3 report"
                    ].map((message, index) => (
                      <motion.div
                        key={message}
                        className="text-right"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.5 }}
                      >
                        <div className="inline-block bg-zinc-600/80 text-white text-xs px-2 py-1 rounded-lg max-w-xs">
                          {message}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input area */}
                  <div className="bg-zinc-200/60 px-3 py-2 border-t border-zinc-300/40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/60 rounded-full px-2 py-1">
                        <span className="text-xs text-zinc-500">Type a message...</span>
                      </div>
                      <div className="w-4 h-4 bg-zinc-600 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Status footer */}
              <div className="relative border-t border-zinc-200/40 bg-white/40 px-6 py-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-700 font-mono">1 INTERFACE</span>
                  <span className="text-zinc-700 font-mono">0 ISSUES</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key advantages showcase */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-zinc-900 mb-4">
              Key Advantages
            </h3>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              See why leading teams are choosing WhatsApp-native AI over traditional productivity suites
            </p>
          </div>

          <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

            {/* Scanning effects */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="p-8">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeComparison}
                  className="text-center"
                  initial={{ opacity: 0, y: 20, rotateY: 90 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  exit={{ opacity: 0, y: -20, rotateY: -90 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-zinc-200/60 border border-zinc-400/30 flex items-center justify-center"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity
                      }}
                    >
                      <div className="text-zinc-700">
                        {comparisons[activeComparison].icon}
                      </div>
                    </motion.div>
                  </div>

                  <h4 className="text-2xl font-bold text-zinc-900 mb-4">
                    {comparisons[activeComparison].title}
                  </h4>
                  
                  <p className="text-lg text-zinc-600 mb-6 max-w-2xl mx-auto">
                    {comparisons[activeComparison].description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="p-4 rounded-xl bg-zinc-200/40 border border-zinc-300/40">
                      <div className="flex items-center gap-2 mb-2">
                        <X className="text-zinc-600" size={16} />
                        <span className="text-sm font-semibold text-zinc-700">Traditional Approach</span>
                      </div>
                      <p className="text-sm text-zinc-600 text-left">
                        {comparisons[activeComparison].problem}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-zinc-300/40 border border-zinc-400/40">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="text-zinc-700" size={16} />
                        <span className="text-sm font-semibold text-zinc-800">SynkList Solution</span>
                      </div>
                      <p className="text-sm text-zinc-700 text-left">
                        {comparisons[activeComparison].solution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center gap-2 pb-6">
              {comparisons.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeComparison === index ? 'bg-zinc-700 w-6' : 'bg-zinc-400'
                  }`}
                  onClick={() => setActiveComparison(index)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.button
            onClick={onOpenWaitlist}
            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-zinc-900 text-white font-semibold text-lg border border-zinc-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {/* Animated background */}
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
            
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/20" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/20" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/20" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/20" />

            <span className="relative z-10">Experience the Difference</span>
            
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>

          <p className="mt-6 text-zinc-600 font-medium">
            Join thousands who&apos;ve already made the switch to unified productivity
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitiveEdge;