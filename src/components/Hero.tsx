import { motion } from "motion/react";
import { config } from "../config";

/**
 * Hero Component
 * Renders the primary landing section with high-fidelity visual effects.
 * Utilizes Framer Motion for entrance animations and CSS clip-paths for geometric overlays.
 */
export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 px-6">
      {/* Texture Layer: Composite overlay for gritty surface depth */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }} />
      
      {/* Background Primitive: Distorted geometric slash using excessive scaling and rotation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-32 md:h-64 bg-[#c0392b] rotate-[-15deg] blur-[2px] opacity-90 shadow-[0_0_50px_rgba(192,57,43,0.5)] z-0"
           style={{ 
             clipPath: 'polygon(10% 20%, 90% 0%, 100% 80%, 0% 100%)',
             filter: 'contrast(1.5) brightness(0.8)'
           }} />
      
      {/* Secondary Slash / Texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210%] h-48 md:h-80 bg-gradient-to-r from-transparent via-[#e74c3c]/30 to-transparent rotate-[-15deg] blur-[20px] z-0" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[1200px] w-full">
        {/* Live Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="flex items-center gap-3 px-4 py-2 bg-neon/7 border border-neon/22 mb-10"
         >
           <div className="w-[5px] h-[5px] bg-neon rounded-full pulse shadow-[0_0_8px_#3af4ff]" />
           <span className="font-syne font-bold text-[9px] text-neon uppercase tracking-[0.2em]">
             {config.hero.badgeText}
           </span>
         </motion.div>

        {/* Headline */}
        <div className="relative mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 30, skewX: -12 }}
            animate={{ opacity: 1, y: 0, skewX: -12 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-reggae text-white text-[72px] md:text-[140px] leading-[0.8] relative z-10 select-none italic uppercase"
            style={{ 
              textShadow: "0px 0px 20px rgba(0,0,0,0.8)",
              WebkitTextStroke: "1px rgba(255,255,255,0.1)"
            }}
          >
            {config.name}
            {/* Distressed Effect Overlay on Text */}
            <span className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
                  style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }} />
          </motion.h1>
          
          {/* Jagged Shadow/Distress duplicate */}
          <div className="absolute top-1 left-1 md:top-2 md:left-2 font-reggae text-[#121212] text-[72px] md:text-[140px] leading-[0.8] skew-x-[-12deg] italic blur-[1px] opacity-80 z-0 uppercase">
            {config.name}
          </div>
        </div>

        {/* Kanji Branding Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="brand-kanji-stack"
        >
          <span className="kanji">{config.hero.kanji}</span>
          <span className="subtext">
            {config.hero.kanjiSubtext}
          </span>
        </motion.div>


        {/* Subtext (Bio) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-syne text-[15px] md:text-[18px] text-white/80 font-medium max-w-[800px] mb-12 leading-relaxed"
        >
          {config.hero.bio}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a 
            href={config.socials.youtube} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-4 bg-neon/8 border border-neon/35 text-neon font-syne font-bold text-[9px] uppercase tracking-[0.2em] transition-all hover:bg-neon/15 hover:border-neon/60"
          >
            YouTube
          </a>
          <a 
            href={`mailto:${config.email}`}
            className="px-10 py-4 border border-white/12 text-[#d4d4d4]/55 font-syne font-bold text-[9px] uppercase tracking-[0.2em] transition-all hover:border-white/25 hover:text-white/70"
          >
            Send Email
          </a>
        </motion.div>
      </div>

    </section>
  );
}

