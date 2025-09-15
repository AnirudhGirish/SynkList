"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Mail, 
  Calendar, 
  CheckSquare, 
  FileText, 
  Users,
  MessageSquare,
  Search,
  Bell,
} from "lucide-react";

const FeatureMatrix = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [scanActive, setScanActive] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Periodic effects
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanActive(true);
      setTimeout(() => setScanActive(false), 4000);
    }, 20000);

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 15000);

    return () => {
      clearInterval(scanInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const features = [
    {
      icon: <Mail size={24} />,
      title: "Smart Email Management",
      description: "Read, compose, search, and manage emails directly through WhatsApp",
      capabilities: ["Read email summaries", "Compose & send emails", "Smart search & filters", "Priority inbox"],
      demo: "Check my emails from sarah@company.com",
      category: "Communication"
    },
    {
      icon: <Calendar size={24} />,
      title: "Calendar Integration",
      description: "Schedule meetings, check availability, and manage your calendar seamlessly",
      capabilities: ["Schedule meetings", "Check availability", "Set reminders", "Meeting summaries"],
      demo: "Schedule a meeting with John for tomorrow 3pm",
      category: "Productivity"
    },
    {
      icon: <CheckSquare size={24} />,
      title: "Task Automation", 
      description: "Create, manage, and track tasks with intelligent reminders and organization",
      capabilities: ["Create task lists", "Set smart reminders", "Progress tracking", "Auto-categorization"],
      demo: "Add 'Review quarterly report' to my tasks",
      category: "Organization"
    },
    {
      icon: <Search size={24} />,
      title: "List Management",
      description: "Maintain shopping lists, todo lists, and custom lists with smart suggestions",
      capabilities: ["Shopping lists", "Todo lists", "Custom lists", "Smart suggestions"],
      demo: "Add milk and bread to shopping list",
      category: "Organization"
    },
    {
      icon: <FileText size={24} />,
      title: "Document Access",
      description: "Find, share, and collaborate on documents across all your storage platforms",
      capabilities: ["Search documents", "Share files instantly", "Real-time collaboration", "Version control"],
      demo: "Find the Q3 presentation in Drive",
      category: "Content"
    },
    {
      icon: <Users size={24} />,
      title: "Contact Intelligence",
      description: "Smart contact lookup, communication history, and relationship management",
      capabilities: ["Contact search", "Communication history", "Relationship insights", "Contact enrichment"],
      demo: "Show me my recent conversations with Alex",
      category: "Network"
    },
    {
      icon: <Bell size={24} />,
      title: "Smart Notifications",
      description: "Intelligent filtering and prioritization of notifications across all platforms",
      capabilities: ["Priority filtering", "Smart bundling", "Custom alerts", "Quiet hours"],
      demo: "Only notify me about urgent emails",
      category: "Intelligence"
    }
  ];

  const categories = ["All", "Communication", "Productivity", "Organization", "Content", "Network", "Intelligence"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFeatures = selectedCategory === "All" 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-zinc-50/30 to-white"
    >
      {/* Enhanced background grid */}
      {/* <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px', '0px 0px']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      /> */}

      {/* Global scan effect */}
      <AnimatePresence>
        {scanActive && (
          <motion.div
            className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-zinc-600/30 to-transparent z-10"
            initial={{ x: -8 }}
            animate={{ x: typeof window !== 'undefined' ? window.innerWidth : 1200 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4,
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
        >
          <motion.div
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 border border-zinc-200/60 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] mb-8 overflow-hidden"
            animate={
              glitchActive
                ? {
                    x: [0, -2, 2, 0],
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(3deg)",
                      "hue-rotate(0deg)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.15 }}
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
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

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
            <span className="text-sm font-mono text-zinc-600 relative z-10">CAPABILITY MATRIX</span>
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
            transition={{ duration: 0.15 }}
          >
            <span className="bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              Everything You Need
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
              In One Interface
            </motion.span>
          </motion.h2>

          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            Comprehensive AI capabilities that understand context, manage complexity, and deliver results through your familiar WhatsApp interface.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden ${
                selectedCategory === category
                  ? 'bg-zinc-900 text-white border border-zinc-800'
                  : 'bg-zinc-100/60 text-zinc-700 border border-zinc-200/60 hover:bg-zinc-200/60'
              }`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
            >
              {selectedCategory === category && (
                <>
                  {/* Corner accents for active state */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-white/20" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-white/20" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-white/20" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-white/20" />

                  {/* Active background scan */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="sync">
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1]
                }}
                onHoverStart={() => setActiveFeature(index)}
                onHoverEnd={() => setActiveFeature(null)}
                layout
              >
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-zinc-100/60 via-white/40 to-zinc-100/60 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                  
                  {/* Corner accents */}
                  <motion.div
                    className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-zinc-400/40 rounded-tl-lg"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  />
                  <motion.div
                    className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-zinc-400/40 rounded-tr-lg"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-zinc-400/40 rounded-bl-lg"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-zinc-400/40 rounded-br-lg"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  />

                  {/* Scanning effects */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />

                  {/* Feature scan on hover */}
                  <AnimatePresence>
                    {activeFeature === index && (
                      <motion.div
                        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent"
                        initial={{ x: -4 }}
                        animate={{ x: 350 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 2,
                          ease: "easeInOut",
                          repeat: Infinity
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative p-8 h-full flex flex-col">
                    {/* Icon and title */}
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div
                        className="relative shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-200/60 to-zinc-300/40 border border-zinc-400/30 flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="text-zinc-700">
                          {feature.icon}
                        </div>

                        {/* Icon pulse effect */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-zinc-400/20"
                          animate={activeFeature === index ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Capabilities list */}
                    <div className="flex-1 mb-6">
                      <div className="grid grid-cols-2 gap-2">
                        {feature.capabilities.map((capability, capIndex) => (
                          <motion.div
                            key={capability}
                            className="flex items-center gap-2 text-sm text-zinc-700"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 + capIndex * 0.05 }}
                          >
                            <div className="w-1 h-1 bg-zinc-500 rounded-full" />
                            <span>{capability}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Demo example */}
                    <div className="relative rounded-xl bg-zinc-100/60 border border-zinc-200/40 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare size={14} className="text-zinc-500" />
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wide">Demo</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-800 italic">
                        &quot;{feature.demo}&quot;
                      </p>

                      {/* Mini corner accents */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-zinc-300/50" />
                      <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-zinc-300/50" />
                      <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-zinc-300/50" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-zinc-300/50" />
                    </div>

                    {/* Category badge */}
                    {/* <motion.div
                      className="absolute top-6 right-6 px-2 py-1 rounded-lg bg-zinc-200/60 border border-zinc-300/40 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.05 }}
                    >
                      <span className="text-xs font-mono text-zinc-600">
                        {feature.category}
                      </span>
                    </motion.div> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureMatrix;