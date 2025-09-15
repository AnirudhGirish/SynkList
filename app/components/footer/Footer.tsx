"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [systemTime, setSystemTime] = useState<string | null>(null);
  const [buildNumber, setBuildNumber] = useState<string | null>(null);

  useEffect(() => {
    // Update system time every second
    const updateTime = () => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "UTC",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Set build number once at client render
    setBuildNumber(Math.floor(Date.now() / 1000).toString().slice(-6));

    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { name: "GitHub", icon: <Github size={16} />, href: "#" },
    { name: "Twitter", icon: <Twitter size={16} />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin size={16} />, href: "#" },
    { name: "Email", icon: <Mail size={16} />, href: "#" },
  ];

  const footerLinks = [
    {
      category: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Integrations", href: "/integration" },
        { name: "Security", href: "/security" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      category: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "#api" },
        { name: "Changelog", href: "#changelog" },
        { name: "Status", href: "/status" },
      ],
    },
    {
      category: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      category: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Compliance", href: "/compliance" },
      ],
    },
  ];

  return (
    <footer
      ref={containerRef}
      className="relative border-t border-zinc-200/60 bg-gradient-to-b from-white via-zinc-50/30 to-zinc-100/40 overflow-hidden"
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, transparent 25%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 50%, transparent 50%, transparent 75%, rgba(0,0,0,.05) 75%), linear-gradient(-45deg, transparent 25%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 50%, transparent 50%, transparent 75%, rgba(0,0,0,.05) 75%)",
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0.5, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Logo */}
                <div className="relative mb-6">
                  <motion.h3
                    className="text-3xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    SynkList
                  </motion.h3>
                </div>

                <p className="text-zinc-600 leading-relaxed mb-6 max-w-sm">
                  Your AI command center in WhatsApp. Private, secure, and
                  intelligently connected to your digital life.
                </p>

                {/* Status indicator */}
                <div className="relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-zinc-100/60 to-zinc-50/40 border border-zinc-200/50 backdrop-blur-sm">
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-sm font-mono text-zinc-600">
                    System Operational
                  </span>
                  {systemTime && (
                    <span className="text-xs font-mono text-zinc-400">
                      {systemTime} UTC
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Link sections */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map((section, sectionIndex) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + sectionIndex * 0.1,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <h4 className="text-sm font-semibold text-zinc-800 mb-4 font-mono uppercase tracking-wider">
                    {section.category}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay:
                            0.2 + sectionIndex * 0.1 + linkIndex * 0.05,
                        }}
                      >
                        <Link
                          href={link.href}
                          className="group relative inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors duration-300"
                          onMouseEnter={() => setHoveredLink(link.name)}
                          onMouseLeave={() => setHoveredLink(null)}
                        >
                          <span className="relative">
                            {link.name}
                            <motion.div
                              className="absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-zinc-400 to-zinc-800"
                              initial={{ width: 0 }}
                              animate={{
                                width:
                                  hoveredLink === link.name ? "100%" : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={
                              hoveredLink === link.name
                                ? { x: 2 }
                                : { x: 0 }
                            }
                          >
                            <ExternalLink
                              size={12}
                              className="text-zinc-400"
                            />
                          </motion.div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          className="relative border-t border-zinc-200/50 py-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-6">
              <motion.div
                className="text-zinc-600 font-mono text-sm"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                © {new Date().getFullYear()} SynkList
              </motion.div>

              {/* Build info */}
              {buildNumber && (
                <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span>Build {buildNumber}</span>
                </div>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  <Link
                    href={social.href}
                    className="group relative w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-100/60 to-zinc-50/40 border border-zinc-200/50 flex items-center justify-center hover:border-zinc-300 transition-all duration-300 backdrop-blur-sm"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
