"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  MessageSquare,
  Link,
  Play,
  Pause,
} from "lucide-react";
import { IconBrandWhatsapp } from '@tabler/icons-react';

interface HowItWorksProps {
  onOpenWaitlist: () => void;
}

const HowItWorks = ({ onOpenWaitlist }: HowItWorksProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  // Auto-progression through steps
  useEffect(() => {
    if (!isInView || !isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, isPlaying]);

  // Periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 18000);

    return () => clearInterval(glitchInterval);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Connect Once",
      subtitle: "Secure Authentication",
      description: "Link your Google account through our secure OAuth flow. Your credentials never touch our servers.",
      details: [
        "One-click Google OAuth",
        "End-to-end encryption", 
        "Zero-knowledge architecture",
        "Instant account linking"
      ],
      icon: <Link size={24} />,
      color: "zinc-600"
    },
    {
      number: "02", 
      title: "Chat Naturally",
      subtitle: "AI Understanding",
      description: "Simply message SynkList in WhatsApp using natural language. No commands, no syntax to learn.",
      details: [
        "Natural conversation",
        "Context awareness", 
        "Intent recognition",
        "Multi-request handling"
      ],
      icon: <MessageSquare size={24} />,
      color: "zinc-700"
    },
    {
      number: "03",
      title: "Get Results",
      subtitle: "Instant Execution", 
      description: "SynkList processes your request, executes actions across your connected apps, and reports back instantly.",
      details: [
        "Multi-app coordination",
        "Real-time processing",
        "Intelligent routing",
        "Instant responses"
      ],
      icon: <Zap size={24} />,
      color: "zinc-800"
    }
  ];

  // Step 1: OAuth Connection Visual
  const ConnectionVisual = ({ isActive }: { isActive: boolean }) => (
    <div className="relative w-full h-80 flex items-center justify-center">
      {/* Central authentication hub */}
      <motion.div
        className="relative"
        animate={isActive ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
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
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

            <motion.div 
              className="w-2 h-2 bg-zinc-500 rounded-full relative z-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <span className="text-lg font-mono text-zinc-600 relative z-10">Join SynkList</span>
          </motion.div>

        {/* Main security vault */}
        <motion.div
          className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-zinc-200/80 via-white/60 to-zinc-300/70 border-2 border-zinc-400/40 backdrop-blur-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] overflow-hidden"
          animate={isActive ? {
            boxShadow: [
              "0 20px 40px -12px rgba(0,0,0,0.15)",
              "0 20px 60px -12px rgba(0,0,0,0.25)", 
              "0 20px 40px -12px rgba(0,0,0,0.15)"
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Corner tech details */}
          <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-zinc-500/40 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-zinc-500/40 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-zinc-500/40 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-zinc-500/40 rounded-br-lg" />

          {/* Central shield icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-zinc-700/90 flex items-center justify-center backdrop-blur-sm"
            //   animate={isActive ? { rotate: [0, 360] } : {}}
            //   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Shield size={28} className="text-white" />
            </motion.div>
          </div>

          {/* Security layers */}
          <motion.div
            className="absolute inset-2 rounded-2xl border border-zinc-400/30"
            animate={isActive ? {
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-4 rounded-xl border border-zinc-500/20"
            animate={isActive ? {
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.5, 0.2]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );

  // Step 2: WhatsApp Chat Interface
  const ChatVisual = ({ isActive }: { isActive: boolean }) => {
    return (
      <div className="relative w-full h-80 flex items-center justify-center">
        <motion.div
        className="relative"
        animate={isActive ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      >


        {/* Main security vault */}
        <motion.div
          className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-zinc-200/80 via-white/60 to-zinc-300/70 border-2 border-zinc-400/40 backdrop-blur-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] overflow-hidden"
          animate={isActive ? {
            boxShadow: [
              "0 20px 40px -12px rgba(0,0,0,0.15)",
              "0 20px 60px -12px rgba(0,0,0,0.25)", 
              "0 20px 40px -12px rgba(0,0,0,0.15)"
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Corner tech details */}
          <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-zinc-500/40 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-zinc-500/40 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-zinc-500/40 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-zinc-500/40 rounded-br-lg" />

          {/* Central shield icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-zinc-700/90 flex items-center justify-center backdrop-blur-sm"
            //   animate={isActive ? { rotate: [0, 360] } : {}}
            //   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <IconBrandWhatsapp size={28} className="text-white" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      </div>
    );
  };

  // Step 3: Results Execution
  const ResultsVisual = ({ isActive }: { isActive: boolean }) => (
    <div className="relative w-full h-80 flex items-center justify-center">
      <motion.div
        className="relative"
        animate={isActive ? { scale: [1, 1.01, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      >

        
        {/* Central processing unit */}
        <motion.div
          className="w-28 h-28 rounded-2xl bg-gradient-to-br from-zinc-800/90 via-zinc-700/80 to-zinc-800/90 border-2 border-zinc-600/40 flex items-center justify-center backdrop-blur-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] relative overflow-hidden"
          animate={isActive ? {
            boxShadow: [
              "0 20px 40px -12px rgba(0,0,0,0.25)",
              "0 20px 60px -12px rgba(0,0,0,0.4)",
              "0 20px 40px -12px rgba(0,0,0,0.25)"
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
            
          {/* Neural network pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
            animate={isActive ? {
              backgroundPosition: ['0px 0px', '8px 8px', '0px 0px']
            } : {}}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            className="relative z-10"
          >
            <Zap size={32} className="text-white" />
          </motion.div>

          {/* Processing rings */}
          <motion.div
            className="absolute inset-3 rounded-xl border border-white/20"
            animate={isActive ? {
              rotate: [0, -360],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-zinc-50/20 to-white"
    >
      {/* Subtle background pattern */}
      {/* <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px', '0px 0px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      /> */}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
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
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

            <motion.div 
              className="w-2 h-2 bg-zinc-500 rounded-full relative z-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <span className="text-sm font-mono text-zinc-600 relative z-10">PROCESS FLOW</span>

            <div className="relative z-10 ml-4 flex items-center gap-2">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-6 h-6 rounded bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center hover:bg-zinc-300/60 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <Pause size={12} className="text-zinc-600" />
                ) : (
                  <Play size={12} className="text-zinc-600 ml-0.5" />
                )}
              </motion.button>
            </div>
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
              How It Works
            </span>
          </motion.h2>

          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Three simple steps to transform your WhatsApp into a powerful AI command center. 
            No complex setup, no learning curve.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.3 + index * 0.2,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                
                {/* Content */}
                <motion.div 
                  className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  whileHover={{ x: index % 2 === 1 ? -8 : 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    
                    {/* Step indicator */}
                    <motion.div
                      className="relative inline-flex items-center gap-4 mb-8"
                      animate={activeStep === index ? {
                        scale: [1, 1.02, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className={`relative w-20 h-20 rounded-3xl border-2 flex items-center justify-center transition-all duration-500 ${
                        activeStep === index
                          ? 'bg-zinc-200/60 border-zinc-400/50 text-zinc-800'
                          : 'bg-zinc-100/40 border-zinc-300/40 text-zinc-600'
                      }`}>
                        <div className="text-zinc-700">
                          {step.icon}
                        </div>

                        {/* Active indicator */}
                        {activeStep === index && (
                          <motion.div
                            className="absolute inset-0 rounded-3xl border-2 border-zinc-500/30"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                        )}
                      </div>

                      <div>
                        <motion.div
                          className="text-sm font-mono text-zinc-500 mb-1"
                          animate={activeStep === index ? {
                            opacity: [0.7, 1, 0.7]
                          } : {}}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          STEP {step.number}
                        </motion.div>
                        <h3 className={`text-4xl font-bold transition-colors duration-500 ${
                          activeStep === index ? 'text-zinc-900' : 'text-zinc-800'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-xl text-zinc-600 font-medium">
                          {step.subtitle}
                        </p>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <p className="text-xl text-zinc-700 leading-relaxed mb-8 max-w-xl">
                      {step.description}
                    </p>

                    {/* Feature details */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detail}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.8 + index * 0.3 + detailIndex * 0.1,
                            duration: 0.5
                          }}
                        >
                          <motion.div
                            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                              activeStep === index ? 'bg-zinc-700' : 'bg-zinc-500'
                            }`}
                            animate={activeStep === index ? {
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: detailIndex * 0.3
                            }}
                          />
                          <span className="text-sm font-medium text-zinc-700">
                            {detail}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Step navigation */}
                    <div className="flex items-center gap-3">
                      {steps.map((_, stepIndex) => (
                        <motion.button
                          key={stepIndex}
                          onClick={() => setActiveStep(stepIndex)}
                          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                            activeStep === stepIndex
                              ? 'bg-zinc-700 border-zinc-700 w-8'
                              : 'bg-transparent border-zinc-400 hover:border-zinc-600'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced visuals */}
                <motion.div 
                  className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                    
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

                    {/* Active scanning effect */}
                    {activeStep === index && (
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent"
                        animate={{
                          x: ['-100%', '100%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    <div className="p-8">
                      {index === 0 && <ConnectionVisual isActive={activeStep === index} />}
                      {index === 1 && <ChatVisual isActive={activeStep === index} />}
                      {index === 2 && <ResultsVisual isActive={activeStep === index} />}
                    </div>

                    {/* Status bar */}
                    <div className="relative border-t border-zinc-200/40 bg-white/40 px-6 py-3 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                              activeStep === index ? 'bg-zinc-700' : 'bg-zinc-500'
                            }`}
                            animate={activeStep === index ? {
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                          <span className="text-zinc-600 font-mono">
                            {activeStep === index ? 'ACTIVE' : 'READY'}
                          </span>
                        </div>
                        <span className="text-zinc-600 font-mono">
                          {step.subtitle.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Connection arrow to next step */}
              {index < steps.length - 1 && (
                <motion.div
                  className="flex justify-center mt-16 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.3, duration: 0.6 }}
                >
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100/60 border border-zinc-200/50 backdrop-blur-sm"
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <span className="text-xs font-mono text-zinc-600">THEN</span>
                    <ArrowRight size={14} className="text-zinc-600" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5, duration: 0.8 }}
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

            <span className="relative z-10">Start Your Transformation</span>
            
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
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>

          <p className="mt-6 text-zinc-600 font-medium">
            Join the revolution. Transform your workflow in under 5 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;