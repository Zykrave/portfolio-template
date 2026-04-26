import { motion } from "motion/react";
import { Instagram, Youtube, Send, Mail, Github } from "lucide-react";
import AniListStatus from "./AniListStatus";
import { config } from "../config";

import { AnimatedDock } from "./AnimatedDock";

export default function ImmersiveSection() {
  const bars = [
    { label: "VID", height: "55%" },
    { label: "PHO", height: "72%" },
    { label: "CON", height: "40%" },
    { label: "COD", height: "88%" },
  ];

  const socialIcons = [
    { name: "GitHub", icon: Github, href: config.socials.github },
    { name: "Instagram", icon: Instagram, href: config.socials.instagram },
    { name: "Youtube", icon: Youtube, href: config.socials.youtube },
    { name: "Telegram", icon: Send, href: config.socials.telegram },
    { name: "Email", icon: Mail, href: `mailto:${config.email}` },
  ];

  const dockItems = socialIcons.map((social) => ({
    href: social.href,
    Icon: <social.icon size={28} />,
    title: social.name,
    target: "_blank"
  }));

  return (
    <section id="vision" className="relative min-h-screen flex flex-col items-center justify-center py-32 px-8 overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Large Quote */}
        <div className="text-center mb-16">
          <h3 className="font-marker text-white tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(30px, 9vw, 50px)" }}>
            {config.quotes.main.split("LOUDEST")[0]}<span className="text-crimson2 crimson-pulse">LOUDEST</span>{config.quotes.main.split("LOUDEST")[1]}
          </h3>
          <p className="font-crimson italic text-white/30" style={{ fontSize: "clamp(18px, 5vw, 26px)" }}>
            {config.quotes.sub.split("loudest")[0]}<span className="text-crimson2 not-italic">loudest</span>{config.quotes.sub.split("loudest")[1]}
          </p>
        </div>

        <AniListStatus username={config.username} />

        <div className="w-full flex flex-col items-center gap-16 mt-16">
          {/* Social Icons Column */}
          <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] font-syne font-bold uppercase tracking-[0.5em] text-white/40">
              CONNECT WITH ME
            </span>
            <AnimatedDock items={dockItems} />
          </div>

          {/* Timeline Column */}
          <div className="flex flex-col items-center gap-8 text-center bg-white/2 p-8 border border-white/5 w-full max-w-2xl">
            <div className="flex flex-col gap-2">
               <h4 className="font-bebas italic text-gold text-4xl tracking-widest">TIMELINE</h4>
               <p className="text-[13px] font-syne text-[#d4d4d4]/60 max-w-[400px]">
                 Mapping the resonance of quiet stories through multiple digital dimensions.
               </p>
            </div>

            <div className="flex items-end gap-6 h-[60px]">
              {bars.map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div 
                    className="w-[16px] bg-crimson/20 border-t-2 border-crimson/50"
                    style={{ height: bar.height }}
                  />
                  <span className="text-[9px] font-syne text-[#d4d4d4]/50 font-bold">{bar.label}</span>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div 
                  key={dot} 
                  className={`w-[6px] h-[6px] rounded-full ${dot === 2 ? "bg-crimson" : "bg-white/10"}`} 
                />
              ))}
            </div>
            
            <div className="mt-4">
                <span className="text-[10px] font-syne font-bold uppercase tracking-[0.4em] text-white/20">
                    RESIDENTIAL FLOW
                </span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
