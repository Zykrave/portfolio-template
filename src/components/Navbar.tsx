import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu as MenuIcon, X } from "lucide-react";
import { config } from "../config";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", hasDropdown: false },
    { name: "Services", href: "#services", hasDropdown: true },
    { name: "Archive", href: "#completed", hasDropdown: false },
    { name: "Contact us", href: "#contact", hasDropdown: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black/5 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between px-6 lg:px-[120px] py-[8px] relative z-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-marker tracking-wider text-white uppercase" style={{ textShadow: "3px 3px 0 rgba(192,57,43,0.5), 6px 6px 0 rgba(192,57,43,0.25)" }}>
            {config.name}
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 ml-12 flex-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-1 font-syne font-bold uppercase tracking-[0.2em] text-[9px] text-white/50 hover:text-neon transition-colors"
            >
              {link.name}
              {link.hasDropdown && <ChevronDown className="w-3 h-3 group-hover:text-neon" />}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={config.socials.anilist}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-neon/35 bg-neon/8 text-neon font-syne font-bold text-[9px] uppercase tracking-[0.2em] transition-all hover:bg-neon/15 hover:border-neon/60"
          >
            AniList
          </a>
          <a
            href={`mailto:${config.email}`}
            className="px-6 py-2 bg-crimson text-white font-syne font-bold text-[9px] uppercase tracking-[0.2em] transition-all hover:bg-crimson2"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-void/95 backdrop-blur-xl z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center">
                <span className="text-xl font-marker tracking-wider text-white uppercase" style={{ textShadow: "3px 3px 0 rgba(192,57,43,0.5), 6px 6px 0 rgba(192,57,43,0.25)" }}>
                  {config.name}
                </span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="text-white">
                <X className="w-8 h-8 text-neon" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-syne font-bold uppercase tracking-[0.2em] text-white/70 hover:text-neon flex items-center justify-between transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-5 h-5 rotate-[-90deg]" />}
                </a>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4 w-full">
              <a
                href={config.socials.anilist}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 text-center border border-neon/35 bg-neon/8 text-neon font-syne font-bold text-[10px] uppercase tracking-[0.2em]"
                onClick={() => setIsMenuOpen(false)}
              >
                AniList
              </a>
              <a
                href={`mailto:${config.email}`}
                className="w-full py-4 text-center bg-crimson text-white font-syne font-bold text-[10px] uppercase tracking-[0.2em]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

