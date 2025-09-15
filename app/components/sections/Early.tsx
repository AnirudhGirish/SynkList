/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Crown, 
  Zap, 
  Users, 
  Clock,
  ArrowRight,
} from "lucide-react";

interface EarlyAccessBenefitsProps {
  onOpenWaitlist: () => void;
}

const EarlyAccessBenefits = ({ onOpenWaitlist }: EarlyAccessBenefitsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);

  // Auto-tab rotation
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Periodic effects
  useEffect(() => {
    // const glitchInterval = setInterval(() => {
    //   setGlitchActive(true);
    //   setTimeout(() => setGlitchActive(false), 150);
    // }, 20000);

    const countdownInterval = setInterval(() => {
      setCountdownActive(true);
      setTimeout(() => setCountdownActive(false), 3000);
    }, 8000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const benefitTiers = [
    {
      title: "Founder's Tier",
      subtitle: "Limited to first 100 users",
      icon: <Crown size={24} />,
      benefits: [
        "Lifetime 60% discount",
        "Direct line to founders",
        "Product roadmap influence",
        "Exclusive founder badge",
        "Priority feature requests"
      ],
      highlight: "EXCLUSIVE",
      remaining: 47
    },
    {
      title: "Beta Pioneer",
      subtitle: "First 1,000 users",
      icon: <Zap size={24} />,
      benefits: [
        "Lifetime 40% discount",
        "Beta feature access",
        "Priority support queue",
        "Community moderator role",
        "Early integration access"
      ],
      highlight: "LIMITED",
      remaining: 342
    },
    {
      title: "Early Adopter",
      subtitle: "First 5,000 users",
      icon: <Users size={24} />,
      benefits: [
        "Lifetime 25% discount",
        "Community access",
        "Monthly office hours",
        "Feature voting rights",
        "Launch week bonus"
      ],
      highlight: "CLOSING SOON",
      remaining: 1847
    }
  ];

  const urgencyMessages = [
    "Founders’ access closing fast",
    "Beta access closes in 24 days",
    "2,847 developers already joined",
    "Be among the first to shape the future",
    "Early-bird beta ends in 9 days",
    "Exclusive launch access"
  ];

  const [currentUrgency, setCurrentUrgency] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUrgency((prev) => (prev + 1) % urgencyMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [urgencyMessages.length]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-zinc-50/40 to-white"
    >
      {/* Enhanced background pattern */}
      {/* <motion.div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(0,0,0,.03) 25%, rgba(0,0,0,.03) 50%, transparent 50%, transparent 75%, rgba(0,0,0,.03) 75%), linear-gradient(-45deg, transparent 25%, rgba(0,0,0,.03) 25%, rgba(0,0,0,.03) 50%, transparent 50%, transparent 75%, rgba(0,0,0,.03) 75%)',
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px', '0px 0px']
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      /> */}

      <div className="max-w-7xl mx-auto">
        {/* Header with urgency */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Urgency ticker */}
          <motion.div
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 border border-zinc-200/60 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-8 overflow-hidden"
            animate={countdownActive ? {
              scale: [1, 1.02, 1],
              borderColor: ["rgba(161, 161, 170, 0.6)", "rgba(82, 82, 91, 0.8)", "rgba(161, 161, 170, 0.6)"]
            } : {}}
            transition={{ duration: 0.3 }}
          >
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

            {/* Urgency scanning line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div 
              className="w-2 h-2 bg-zinc-600 rounded-full relative z-10"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
            
            <AnimatePresence mode="popLayout">
              <motion.span
                key={currentUrgency}
                className="text-sm font-mono text-zinc-700 font-medium relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {urgencyMessages[currentUrgency]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            animate={
              glitchActive
                ? {
                    x: [0, -3, 3, 0],
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(2deg)",
                      "hue-rotate(0deg)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.15 }}
          >
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              Early Access
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
              Exclusive Perks
            </motion.span>
          </motion.h2>

          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Join now and secure lifetime benefits, priority access, and exclusive influence over the future of SynkList.
          </p>
        </motion.div>

        {/* Benefit tiers */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {benefitTiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              className={`group relative cursor-pointer ${
                activeTab === index ? 'z-10' : 'z-0'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
              onClick={() => setActiveTab(index)}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className={`relative h-full rounded-3xl border backdrop-blur-xl overflow-hidden transition-all duration-500 ${
                activeTab === index
                  ? 'bg-gradient-to-br from-zinc-200/60 via-white/50 to-zinc-200/60 border-zinc-300/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]'
                  : 'bg-gradient-to-br from-zinc-100/40 via-white/30 to-zinc-100/40 border-zinc-200/40 hover:border-zinc-300/50'
              }`}>
                
                {/* Enhanced corner accents for active state */}
                <AnimatePresence>
                  {activeTab === index && (
                    <>
                      <motion.div
                        className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-zinc-500/50 rounded-tl-2xl"
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.div
                        className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-zinc-500/50 rounded-tr-2xl"
                        initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      />
                      <motion.div
                        className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-zinc-500/50 rounded-bl-2xl"
                        initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      />
                      <motion.div
                        className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-zinc-500/50 rounded-br-2xl"
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Active scanning effects */}
                {activeTab === index && (
                  <>
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
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-600/40 to-transparent"
                      animate={{
                        y: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </>
                )}

                <div className="relative p-8 h-full flex flex-col">
                                                            <motion.div
                      className={`px-3 mb-2 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all duration-300 ${
                        index === 0
                          ? 'bg-zinc-900/90 text-white border-zinc-700'
                          : index === 1
                          ? 'bg-zinc-200/80 text-zinc-800 border-zinc-400/50'
                          : 'bg-zinc-100/60 text-zinc-700 border-zinc-300/40'
                      }`}
                      animate={activeTab === index ? {
                        scale: [1, 1.05, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {tier.highlight}
                    </motion.div>
                  {/* Tier header */}
                  <div className="flex items-start justify-between mb-6">

                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ${
                          activeTab === index
                            ? 'bg-zinc-300/60 border-zinc-500/40 text-zinc-800'
                            : 'bg-zinc-200/40 border-zinc-300/40 text-zinc-600'
                        }`}
                        animate={activeTab === index ? {
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {tier.icon}

                        {/* Icon pulse effect */}
                        {activeTab === index && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-zinc-500/30"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                        )}
                      </motion.div>

                      <div>
                        <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                          activeTab === index ? 'text-zinc-900' : 'text-zinc-800'
                        }`}>
                          {tier.title}
                        </h3>
                        <p className="text-zinc-600 text-sm">
                          {tier.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Highlight badge */}

                  </div>

                  {/* Benefits list */}
                  <div className="flex-1 space-y-3 mb-6">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefit}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.8 + index * 0.2 + benefitIndex * 0.1,
                          duration: 0.5
                        }}
                      >
                        <motion.div
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            activeTab === index ? 'bg-zinc-700' : 'bg-zinc-500'
                          }`}
                          animate={activeTab === index ? {
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: benefitIndex * 0.2
                          }}
                        />
                        <span className={`text-sm font-medium transition-colors duration-300 ${
                          activeTab === index ? 'text-zinc-800' : 'text-zinc-700'
                        }`}>
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Remaining spots */}
                  <div className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-zinc-200/50 border-zinc-400/40'
                      : 'bg-zinc-100/40 border-zinc-300/30'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-zinc-600" />
                      <span className="text-sm font-mono text-zinc-700">
                        {tier.remaining} spots left
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-16 h-2 bg-zinc-300/60 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-zinc-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${100 - (tier.remaining / (index === 0 ? 100 : index === 1 ? 1000 : 5000)) * 100}%`
                        }}
                        transition={{ delay: 1 + index * 0.2, duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="relative inline-block">
            {/* Surrounding benefit icons */}
            {/* <div className="absolute inset-0 pointer-events-none">
              {[Gift, Star, Crown, Target, Sparkles, Zap].map((Icon, index) => {
                const angle = (index * 60) - 90;
                const radius = 140;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={index}
                    className="absolute w-10 h-10 rounded-xl bg-zinc-100/60 border border-zinc-200/50 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 0.8, 
                      scale: 1,
                      y: [0, -6, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      delay: 2 + index * 0.15,
                      duration: 0.6,
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.7
                      },
                      rotate: {
                        duration: 5,
                        repeat: Infinity,
                        delay: index * 0.5
                      }
                    }}
                  >
                    <Icon size={16} className="text-zinc-600" />
                  </motion.div>
                );
              })}
            </div> */}

            <motion.button
              onClick={onOpenWaitlist}
              className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-3xl bg-zinc-900 text-white font-bold text-xl border border-zinc-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {/* Enhanced animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Enhanced corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-white/20" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-white/20" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-white/20" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/20" />

              <span className="relative z-10">Secure Your Spot</span>
              
              <motion.div
                className="relative z-10"
                animate={{ 
                  x: [0, 6, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              >
                <ArrowRight size={24} />
              </motion.div>

              {/* Button pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-white/20"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </motion.button>
          </div>

          {/* Final urgency message */}
          <motion.p
            className="mt-6 text-zinc-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            Don&apos;t miss out on lifetime benefits. Join the exclusive community today.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessBenefits;