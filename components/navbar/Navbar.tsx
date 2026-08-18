"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Menu, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#why-leahvigor" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const easing = [0.16, 1, 0.3, 1] as any;

const menuVariants: Variants = {
  closed: { opacity: 0, x: "100%" },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easing },
  },
};

const linkVariants: Variants = {
  closed: { opacity: 0, x: 40 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.07, ease: easing },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      
      // Scrollspy logic
      const sections = navLinks.map(link => link.href.split("#")[1]);
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the element crosses the upper-middle of the screen
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 glass border-b border-white/5"
            : "py-5 bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href="/#hero"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 group"
            aria-label="LEAHVIGOR Solutions — Home"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src="/logo/logo (2).png"
              alt="LEAHVIGOR Logo"
              className="h-8 w-auto object-contain"
            />
            
            <div className="flex items-center h-8">
              <motion.span
                layoutId="brand-logo-text"
                className="font-display font-bold tracking-wide text-white text-lg lg:text-xl"
                style={{ transformOrigin: "left center" }}
              >
                LEAHVIGOR
              </motion.span>
            </div>
          </Link>

          {/* Desktop nav */}
          <AnimatePresence>
            {scrolled && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:flex items-center gap-1"
              >
                {navLinks.map((link) => {
                  const sectionId = link.href.split("#")[1];
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`relative flex flex-col items-center justify-center px-4 py-2 text-sm font-sans transition-colors group ${
                        isActive ? "text-white font-bold" : "text-slate-300 hover:text-white hover:font-bold"
                      }`}
                    >
                      {/* Invisible bold text to reserve maximum width and prevent layout shift */}
                      <span className="font-bold h-0 invisible overflow-hidden" aria-hidden="true">
                        {link.label}
                      </span>
                      {/* Visible text */}
                      <span>{link.label}</span>
                      
                      {/* Active Underline - ONLY shows when isActive is true */}
                      <span 
                        className={`absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-electric to-violet transition-transform duration-300 origin-left ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`} 
                      />
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop CTA */}
          <AnimatePresence>
            {scrolled && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden lg:flex items-center gap-4"
              >
                <Link
                  href="/#contact"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-500/40 text-sm font-medium text-white hover:bg-indigo-500/10 hover:border-indigo-500/70 transition-all duration-300"
                  data-cursor="TALK"
                >
                  Let&apos;s Talk
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile hamburger */}
          <AnimatePresence>
            {scrolled && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="mobile-menu-toggle"
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-indigo-400 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={22} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit={{
              opacity: 0,
              x: "100%",
              transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-[60] bg-midnight flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <Link
                href="/#hero"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <img
                  src="/logo/logo (2).png"
                  alt="LEAHVIGOR Logo"
                  className="h-7 w-auto object-contain"
                />
                <span className="font-display font-bold text-white text-lg">LEAHVIGOR</span>
              </Link>
              <button
                id="mobile-menu-close"
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white hover:text-indigo-400 transition-colors"
                aria-label="Close mobile menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between py-4 border-b border-white/5 text-3xl font-display font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={24}
                      className="opacity-0 group-hover:opacity-100 text-indigo-400 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="px-8 pb-10 pt-6">
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gradient-to-r from-electric via-indigo to-violet text-white font-display font-bold text-lg hover:opacity-90 transition-opacity"
              >
                Let&apos;s Talk
                <ArrowUpRight size={20} />
              </Link>
              <p className="text-center text-slate-500 text-sm mt-4">
                contact@leahvigor.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
