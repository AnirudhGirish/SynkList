"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", handleMouseMove);}
  }, [mouseX, mouseY]);

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "Integration", href: "/integration" },
    { name: "Docs", href: "/docs" },
    { name: "Security", href: "/security" },
  ];

  return (
    <>
    <motion.div
        className="hidden lg:block fixed w-5 h-5 border-2 border-zinc-400/30 rounded-full pointer-events-none z-100 mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.05 }}
      />

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "px-6 py-4" : "px-0 py-0"
        }`}
        layout
      >
        <motion.div
          className={`relative transition-all duration-500 ease-out ${
            scrolled
              ? "mx-auto max-w-6xl rounded-2xl bg-white/90 backdrop-blur-xl border border-zinc-200/60 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)]"
              : "bg-white/95 backdrop-blur-sm border-b border-zinc-200/50"
          }`}
          layout
        >
          {/* Corner accents for floating state */}
          <AnimatePresence>
            {scrolled && (
              <>
                <motion.div
                  className="absolute top-3 left-3 w-4 h-4 border-l border-t border-zinc-400/40"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.div
                  className="absolute top-3 right-3 w-4 h-4 border-r border-t border-zinc-400/40"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
                <motion.div
                  className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-zinc-400/40"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-zinc-400/40"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                />
              </>
            )}
          </AnimatePresence>

          <div 
            className={`flex justify-between items-center transition-all duration-500 ${
              scrolled ? "px-8 py-4" : "px-6 py-4"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="relative group items-center inline-flex transition-all duration-600 ease-out">
              <Image alt="SynkList Logo" src={"/icon-512.png"} width={45} height={45}/>
              <motion.h1
                className={`font-bold text-3xl bg-gradient-to-b from-zinc-900 via-zinc-600 to-zinc-900 bg-clip-text text-transparent ${scrolled ?"hidden": "block"} transition-all duration-600 ease-linear`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                SynkList
              </motion.h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="relative"
                    onHoverStart={() => setHoveredItem(index)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.href}
                      className="relative px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors duration-200"
                    >
                      {item.name}
                      
                      {/* Subtle underline */}
                      <motion.div
                        className="absolute bottom-0 left-4 right-4 h-px bg-zinc-600"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{
                          scaleX: hoveredItem === index ? 1 : 0,
                          opacity: hoveredItem === index ? 1 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="relative px-6 py-2.5 text-sm font-medium text-zinc-800 rounded-xl border border-zinc-300/70 bg-gradient-to-b from-zinc-100/90 to-zinc-200/60 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden">
                  <span className="relative z-10">Coming Soon</span>
                  
                  {/* Scanning line effect */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/60 to-transparent"
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
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/60 to-transparent"
                    animate={{
                      x: ['100%', '-100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden relative w-10 h-10 rounded-lg bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} className="text-zinc-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} className="text-zinc-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 mx-6 lg:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200/60 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] overflow-hidden">
                
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-zinc-400/40" />
                <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-zinc-400/40" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-zinc-400/40" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-zinc-400/40" />

                <div className="p-6">
                  <nav className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          className="block px-4 py-3 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50/80 rounded-lg transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile CTA */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-zinc-200/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3,  duration: 0.3,ease: "easeInOut" }}
                  >
                    <div className="px-6 py-3 text-sm font-medium text-zinc-800 text-center rounded-xl border border-zinc-300/70 bg-gradient-to-b from-zinc-100/90 to-zinc-200/60 shadow-sm">
                      Comming Soon
                    </div>
                  </motion.div>
                </div>

                {/* Scanning line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/40 to-transparent"
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
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-500/40 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
