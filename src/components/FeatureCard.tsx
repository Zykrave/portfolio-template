import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import React, { useRef, useState } from "react";

export interface FeatureCardProps {
  key?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
  isActive?: boolean;
  isGold?: boolean;
}

export default function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  className = "", 
  isActive = false,
  isGold = false
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "500px",
      }}
      className={`group relative overflow-visible ${className}`}
    >
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative p-8 h-full bg-[#0f1010] transition-shadow duration-500 overflow-hidden
          ${isActive ? "mana-glow-blue" : isGold ? "mana-glow-gold" : "border border-white/5 hover:mana-glow-blue hover:corner-accent-tl hover:corner-accent-br"}
        `}
      >
        {/* Hover Accents */}
        {!isActive && !isGold && (
            <>
                <div className="absolute top-0 left-0 w-full h-full corner-accent-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 left-0 w-full h-full corner-accent-br opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 glowing-dot opacity-0 group-hover:opacity-70 transition-opacity" />
            </>
        )}
        {/* For Active/Gold states, always show some dot or accent if desired but follow prompt strictly */}
        {(isActive || isGold) && (
            <div className={`absolute top-2 right-2 glowing-dot opacity-70 ${isGold ? "bg-gold shadow-[0_0_8px_#c9a84c]" : ""}`} />
        )}

        <div className="relative z-10">
          <div className="mb-6">
            <Icon className={`w-8 h-8 transition-colors ${isActive ? "text-neon" : isGold ? "text-gold" : "text-white/40 group-hover:text-neon"}`} />
          </div>
          <h3 className={`text-xl font-bebas tracking-wider mb-4 ${isActive ? "text-neon" : isGold ? "text-gold" : "text-[#d4d4d4]"}`}>{title}</h3>
          <p className="text-[#d4d4d4]/45 font-syne text-[12.5px] leading-[1.85]">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}
