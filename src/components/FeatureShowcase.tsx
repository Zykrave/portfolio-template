import { Video, Camera, LayoutGrid, Cpu, LucideIcon, Code2, Palette, Globe, Layers } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { config } from "../config";

export default function FeatureShowcase() {
  const iconMap: Record<number, LucideIcon> = {
    0: Video,
    1: Camera,
    2: LayoutGrid,
    3: Cpu,
    4: Code2,
    5: Palette,
    6: Globe,
    7: Layers
  };

  return (
    <section id="services" className="relative py-24 px-8 max-w-7xl mx-auto overflow-visible">
      <div className="mb-20 space-y-2">
        <h2 className="text-5xl md:text-6xl font-bebas tracking-[0.06em] text-[#d4d4d4]">
          WHAT I BRING...
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
        {config.skills.map((f, i) => (
          <FeatureCard
            key={f.title}
            title={f.title}
            description={f.description}
            icon={iconMap[i % 8]}
            isActive={!!f.isActive}
            isGold={!!f.isGold}
            delay={i * 0.15}
          />
        ))}
      </div>


    </section>
  );
}
