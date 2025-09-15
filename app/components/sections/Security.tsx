/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Lock, Eye, Server, Key, CheckCircle } from "lucide-react";

const SecurityPanel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanActive, setScanActive] = useState(false);

  // Auto-rotation through security features
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Periodic effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 18000);

    const scanInterval = setInterval(() => {
      setScanActive(true);
      setTimeout(() => setScanActive(false), 2000);
    }, 12000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scanInterval);
    };
  }, []);

  const securityFeatures = [
    {
      icon: <Lock size={20} />,
      title: "End-to-End Encryption",
      description: "Your data is encrypted before it leaves your device",
      detail: "Military-grade encryption ensures only you can access your information"
    },
    {
      icon: <Eye size={20} />,
      title: "Zero Knowledge",
      description: "We can't see your data even if we wanted to",
      detail: "Your private information never touches our servers in plain text"
    },
    {
      icon: <Server size={20} />,
      title: "Private Environment",
      description: "Your own secure, isolated workspace",
      detail: "Each user gets their own encrypted data environment"
    },
    {
      icon: <Key size={20} />,
      title: "Your Keys, Your Control",
      description: "You hold the encryption keys to your data",
      detail: "Complete ownership and control over your digital privacy"
    }
  ];

  const complianceItems = [
    "GDPR Compliant",
    "SOC 2 Ready", 
    "HIPAA Compatible",
    "ISO 27001 Standards"
  ];

  return (
    <section 
      ref={containerRef}
      className="relative h-[100rem] lg:h-[65rem] py-20 px-6 overflow-hidden bg-gradient-to-b from-white via-zinc-50/20 to-white"
    >
      {/* Enhanced background pattern */}
      {/* <motion.div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(0,0,0,0.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px', '0px 0px']
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      /> */}
      <div className="max-w-6xl mx-auto">
        {/* Compact header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 border border-zinc-200/60 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-6 overflow-hidden"
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
            <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-l border-t border-zinc-400/40" />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-r border-b border-zinc-400/40" />

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

            <Shield className="w-4 h-4 text-zinc-600 relative z-10" />
            <span className="text-sm font-mono text-zinc-600 relative z-10">SECURITY PROTOCOL</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            animate={
              glitchActive
                ? {
                    x: [0, -2, 2, 0],
                  }
                : {}
            }
            transition={{ duration: 0.12 }}
          >
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              Private by Design
            </span>
          </motion.h2>

          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Your data stays yours. Enterprise-grade security with zero-knowledge architecture.
          </p>
        </motion.div>

        {/* Main security showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Security visualization */}
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

              {/* Scanning effects */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
                animate={{
                  x: ['-100s%', '100%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent"
                animate={{
                  x: ['100%', '-100%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />

              <div className="relative h-80 p-6 flex items-center justify-center">
                
                {/* Data vault visualization */}
                <div className="relative">
                  {/* Secure vault container */}
                  <motion.div
                    className="relative w-48 h-32 rounded-2xl bg-gradient-to-br from-zinc-300/40 to-zinc-400/30 border-2 border-zinc-500/30 backdrop-blur-sm overflow-hidden"
                    animate={{
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
                    {/* Vault door with lock */}
                    <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-zinc-200/60 to-zinc-300/40 border border-zinc-400/40 flex flex-col items-center justify-center">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center mb-2"
                        animate={{
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity
                        }}
                      >
                        <Lock size={16} className="text-white" />
                      </motion.div>
                      <div className="text-xs font-mono text-zinc-700">SECURED</div>
                    </div>

                    {/* Vault corner bolts */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-zinc-500/60 border border-zinc-600/40"
                        style={{
                          top: i < 2 ? '8px' : 'auto',
                          bottom: i >= 2 ? '8px' : 'auto',
                          left: i % 2 === 0 ? '8px' : 'auto',
                          right: i % 2 === 1 ? '8px' : 'auto'
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Encryption tunnel effect */}
                  <motion.div
                    className="absolute left-0 top-1/2 w-48 h-1 bg-gradient-to-r from-zinc-400/60 via-zinc-600/40 to-transparent"
                    style={{ transform: 'translateY(-50%)' }}
                    animate={{
                      scaleX: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Protection barrier */}
                <motion.div
                  className="absolute inset-8 border-2 border-dashed border-zinc-400/30 rounded-3xl"
                  animate={{
                    borderColor: [
                      "rgba(161, 161, 170, 0.2)",
                      "rgba(161, 161, 170, 0.5)",
                      "rgba(161, 161, 170, 0.2)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                />

                {/* Security labels */}
                <div className="absolute top-12 left-12 text-xs font-mono text-zinc-600 bg-zinc-100/60 px-2 py-1 rounded border border-zinc-300/40">
                  YOUR DATA
                </div>
                <div className="absolute top-12 right-12 text-xs font-mono text-zinc-600 bg-zinc-100/60 px-2 py-1 rounded border border-zinc-300/40">
                  ENCRYPTED
                </div>

                {/* Floating security indicators */}
                {[
                  { icon: <Lock size={12} />, pos: { bottom: '15%', left: '35%' } },
                  { icon: <Shield size={20} />, pos: { bottom: '18%', left: '46%' } },
                  { icon: <Key size={12} />, pos: { bottom: '15%', right: '35%' } },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 rounded-xl bg-zinc-200/60 border border-zinc-300/40 flex items-center justify-center backdrop-blur-sm"
                    style={item.pos}
                  >
                    <div className="text-zinc-600">
                      {item.icon}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status indicator */}
              <div className="relative border-t border-zinc-200/40 bg-white/40 px-6 py-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-zinc-600 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                    <span className="text-xs text-zinc-700 font-mono">SECURED</span>
                  </div>
                  <span className="text-xs text-zinc-600 font-mono">256-BIT AES</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security features list */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={`relative p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-gradient-to-br from-zinc-100/80 to-zinc-50/60 border-zinc-300/60 shadow-lg'
                      : 'bg-gradient-to-br from-zinc-50/40 to-white/20 border-zinc-200/40 hover:border-zinc-300/60'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  {/* Feature scan effect */}
                  {activeFeature === index && (
                    <motion.div
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent"
                      animate={{
                        x: ['-15%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                        activeFeature === index
                          ? 'bg-zinc-200/60 border-zinc-400/30 text-zinc-800'
                          : 'bg-zinc-100/40 border-zinc-300/30 text-zinc-600'
                      }`}
                      animate={activeFeature === index ? {
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {feature.icon}
                    </motion.div>

                    <div className="flex-1">
                      <h3 className={`font-bold mb-1 transition-colors duration-300 ${
                        activeFeature === index ? 'text-zinc-900' : 'text-zinc-800'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-zinc-600 text-sm mb-2">
                        {feature.description}
                      </p>
                      <AnimatePresence>
                        {activeFeature === index && (
                          <motion.p
                            className="text-zinc-700 text-sm font-medium"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {feature.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Active indicator */}
                    {activeFeature === index && (
                      <motion.div
                        className="shrink-0 w-2 h-2 bg-zinc-600 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>

                  {/* Corner indicators for active state */}
                  {activeFeature === index && (
                    <>
                      <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-zinc-400/40" />
                      <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-zinc-400/40" />
                      <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-zinc-400/40" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-zinc-400/40" />
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Compliance badges */}
            <motion.div
              className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-zinc-50/60 to-white/40 border border-zinc-200/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <h4 className="text-sm font-mono text-zinc-600 uppercase tracking-wide mb-3">
                Compliance Ready
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {complianceItems.map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  >
                    <CheckCircle size={14} className="text-zinc-600" />
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecurityPanel;