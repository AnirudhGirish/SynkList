/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Eye, Lock, Database, MessageSquare } from "lucide-react";
import { IconBrandWhatsapp, IconBrandMeta } from "@tabler/icons-react";
import ScrollToTopCircle from "@/components/Scroll";
import KeyScroller from "@/components/KeyScroll";

// ---- NOTE: Key mobile fixes ----
// 1) Ensure background stays behind content using -z-10 and wrapper relative
// 2) Higher contrast fallbacks on mobile (no transparent text unless md+)
// 3) useInView threshold lowered for small screens
// 4) Replace dynamic Tailwind color strings with a static class map
// 5) Fix a few invalid Tailwind classes (e.g. border-black-500 -> border-neutral-500)

const colorClassMap: Record<string, string> = {
  emerald: "from-emerald-100/80 to-emerald-200/60 border-emerald-300/50",
  blue: "from-blue-100/80 to-blue-200/60 border-blue-300/50",
  purple: "from-purple-100/80 to-purple-200/60 border-purple-300/50",
  orange: "from-orange-100/80 to-orange-200/60 border-orange-300/50",
  green: "from-green-100/80 to-green-200/60 border-green-300/50",
};

const PrivacyPolicyPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Periodic effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 120);
    }, 15000);

    const sectionRotation = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 5);
    }, 4000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(sectionRotation);
    };
  }, []);

  const privacyPillars = [
    { icon: <Shield size={16} />, name: "Zero Knowledge", color: "emerald" },
    { icon: <Eye size={16} />, name: "Transparency", color: "blue" },
    { icon: <Lock size={16} />, name: "Encryption", color: "purple" },
    { icon: <Database size={16} />, name: "Data Control", color: "orange" },
    {
      icon: <MessageSquare size={16} />,
      name: "WhatsApp Compliance",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-transparent via-zinc-50/30 to-white text-zinc-800 pt-16">
      <KeyScroller disabled={false} amountPx={100} />
      <div className="hidden lg:block">
        <ScrollToTopCircle />
      </div>
      {/* Background pattern (kept behind content explicitly) */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,1) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main ref={containerRef} className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                className="hidden sm:inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/90 via-white/80 to-zinc-100/90 border border-zinc-200/80 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-8 overflow-hidden"
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
                <span className="text-sm font-mono text-zinc-700 relative z-10">
                  PRIVACY ARCHITECTURE
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-7xl font-bold tracking-tight mb-6"
                animate={glitchActive ? { x: [0, -3, 3, 0] } : {}}
                transition={{ duration: 0.12 }}
              >
                {/* Fallback solid text on mobile; gradient text applied md+ */}
                <span className="text-zinc-900 md:bg-gradient-to-b md:from-zinc-900 md:via-zinc-700 md:to-zinc-900 md:bg-clip-text md:text-transparent">
                  Privacy Policy
                </span>
              </motion.h1>

              <p className="text-base md:text-xl text-zinc-700 md:text-zinc-600 max-w-3xl mx-auto">
                Comprehensive privacy protection built on zero-knowledge
                architecture. Your data stays yours, with full transparency and
                control over how it&apos;s used.
              </p>
            </motion.div>

            {/* Privacy Architecture Visualization */}
            <motion.div
              className="relative mb-16 md:mb-20"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100/80 via-white/80 to-zinc-100/80 backdrop-blur-xl border border-zinc-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/50 rounded-br-lg" />

                {/* Active scanning effect */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-600/40 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="p-6 md:p-12">
                  <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3 md:mb-4">
                      Zero-Knowledge Privacy Foundation
                    </h2>
                    <p className="text-zinc-700 md:text-zinc-600 max-w-2xl mx-auto">
                      Built from the ground up with privacy-first design
                      principles that ensure your personal data never leaves
                      your control, while complying with all WhatsApp Business
                      API requirements.
                    </p>
                  </div>

                  {/* Privacy visualization */}
                  <div className="relative h-64 md:h-80 flex items-center justify-center">
                    {/* Central privacy vault */}
                    <motion.div
                      className="relative w-36 md:w-40 h-36 md:h-40 rounded-3xl bg-gradient-to-br from-neutral-200/80 to-zinc-300/60 border-2 border-neutral-400/50 flex items-center justify-center backdrop-blur-sm"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div className="w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-neutral-700 flex items-center justify-center">
                        <Shield size={32} className="text-white" />
                      </motion.div>

                      {/* Privacy protection layers */}
                      <motion.div
                        className="absolute inset-4 rounded-2xl border-2 border-neutral-500/40"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Encryption layer */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-neutral-400/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                      />

                      {/* Zero-knowledge boundary */}
                      <motion.div
                        className="absolute -inset-3 md:-inset-3.5 rounded-3xl border-2 border-green-300/20"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                      />

                      {/* Meta compliance ring */}
                      <motion.div
                        className="absolute -inset-5 rounded-3xl border border-blue-300/15"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{ duration: 6, repeat: Infinity, delay: 3 }}
                      />
                    </motion.div>
                  </div>

                  {/* Orbiting privacy pillars */}
                  <div className="flex justify-center gap-3 md:gap-4">
                    {privacyPillars.map((pillar, index) => (
                      <motion.div
                        key={pillar.name}
                        animate={{
                          scale: [0.9, 1, 1.1],
                          opacity: [0.7, 0.9, 1],
                        }}
                        transition={{
                          duration: 5 + index * 5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div
                          className={`w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-zinc-400 via-transparent to-zinc-400 border flex items-center justify-center backdrop-blur-sm`}
                        >
                          <div className="text-zinc-700">{pillar.icon}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center mt-6 md:mt-8">
                    {[
                      "End-to-End Encryption",
                      "Zero Data Storage",
                      "User Consent Controls",
                      "GDPR Compliant",
                      "WhatsApp API Secure",
                      "No Third-Party Sharing",
                    ].map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="px-3 py-2 rounded-lg bg-zinc-100/90 border border-zinc-300/70 backdrop-blur-sm"
                        animate={{ y: [0, -2, 0], opacity: [0.9, 1, 0.9] }}
                        transition={{
                          duration: 3 + index * 0.3,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        <span className="text-xs font-medium text-zinc-700">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Status bar */}
                <div className="relative border-t border-zinc-200/60 bg-white/70 px-6 md:px-8 py-3 md:py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-zinc-700 font-mono">
                        PRIVACY SHIELD ACTIVE
                      </span>
                    </div>
                    <span className="text-zinc-700 font-mono">
                      ZERO-KNOWLEDGE VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp API Compliance Section */}
            <motion.div
              className="relative mb-16 md:mb-20"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-zinc-200/80 via-white/80 to-zinc-200/80 backdrop-blur-xl border border-zinc-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-blue-400/50 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-blue-400/50 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-blue-400/50 rounded-br-lg" />

                <div className="p-6 md:p-8">
                  <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 lg:inline-flex items-center gap-2">
                      <div className="flex justify-between">
                        <IconBrandMeta className="text-blue-400 size-7 md:size-8" />{" "}
                        <IconBrandWhatsapp className="block lg:hidden text-green-400 size-7 md:size-8" />
                      </div>
                      Meta&apos;s WhatsApp Business API Compliance{" "}
                      <IconBrandWhatsapp className="hidden lg:block text-green-400 size-7 md:size-8" />
                    </h3>
                    <p className="text-zinc-700 md:text-zinc-600 max-w-2xl mx-auto">
                      Full compliance with Meta&apos;s WhatsApp Business API
                      policies, data handling requirements, and user privacy
                      standards.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {[
                      {
                        title: "Data Processing",
                        items: [
                          "Only process messages for intended AI functionality",
                          "No storage of personal WhatsApp conversations",
                          "Immediate deletion of processed message content",
                          "Encrypted transmission of all data",
                        ],
                      },
                      {
                        title: "User Control",
                        items: [
                          "Clear opt-in consent for AI processing",
                          "Easy opt-out mechanisms at any time",
                          "Transparent data usage notifications",
                          "User data deletion on request",
                        ],
                      },
                      {
                        title: "Meta Requirements",
                        items: [
                          "Adherence to WhatsApp Business Policy",
                          "Compliance with Commerce Policy",
                          "Respect for user blocking and reporting",
                          "Regular privacy impact assessments",
                        ],
                      },
                      {
                        title: "Security Standards",
                        items: [
                          "ISO 27001 security management",
                          "SOC 2 Type II compliance",
                          "Regular security audits and testing",
                          "Incident response procedures",
                        ],
                      },
                    ].map((section, index) => (
                      <motion.div
                        key={section.title}
                        className="p-5 md:p-6 rounded-2xl bg-white/80 border border-zinc-200/70"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      >
                        <h4 className="font-semibold text-zinc-900 mb-3">
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-2 text-sm text-zinc-700"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="relative py-16 md:py-20 px-4 md:px-6 border-t border-zinc-200/60">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/90 via-white/80 to-zinc-100/90 border border-zinc-200/80 backdrop-blur-xl shadow-sm mb-8 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-zinc-400/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-zinc-400/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-zinc-400/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-zinc-400/40" />

              <motion.div
                className="w-2 h-2 bg-zinc-500 rounded-full relative z-10"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-mono text-zinc-700 relative z-10">
                PRIVACY DOCUMENTATION
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.7, duration: 0.8 }}
            >
              Complete Privacy Policy
              <br />
              <span className="text-zinc-700 md:text-zinc-600">
                Coming Soon
              </span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-zinc-700 md:text-zinc-600 mb-6 md:mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.9, duration: 0.8 }}
            >
              We&apos;re finalizing our comprehensive privacy policy with
              detailed explanations of data collection, processing, storage, and
              user rights. Full compliance documentation for GDPR, CCPA, and
              WhatsApp Business API requirements.
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.1, duration: 0.8 }}
            >
              <div className="px-4 py-2 rounded-lg bg-zinc-100/90 border border-zinc-200/80">
                <span className="text-sm font-mono text-zinc-700">
                  ETA: Q4 2025
                </span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-zinc-100/90 border border-zinc-200/80">
                <span className="text-sm font-mono text-zinc-700">
                  STATUS: LEGAL REVIEW
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
