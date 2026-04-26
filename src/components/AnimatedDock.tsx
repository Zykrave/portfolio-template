import * as React from "react";
import { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface DockItemData {
  href: string;
  Icon: React.ReactNode;
  target?: string;
  title?: string;
}

export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}

export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-28 items-end gap-4 px-4 pb-3",
        className
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX}>
          <a
            href={item.href}
            target={item.target}
            rel="noopener noreferrer"
            title={item.title}
            className="flex items-center justify-center w-full h-full text-inherit"
          >
            {item.Icon}
          </a>
        </DockItem>
      ))}
    </motion.div>
  );
};

interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  key?: number;
}

const DockItem = ({ mouseX, children }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Base size is 64px (from the existing design), expanding to 100px
  const widthSync = useTransform(distance, [-150, 0, 150], [64, 100, 64]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconScale = useTransform(width, [64, 100], [1, 1.4]);
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-none border border-white/10 bg-white/5 text-white/50 flex items-center justify-center transition-colors duration-300 hover:border-crimson hover:text-crimson hover:shadow-[0_0_20px_rgba(192,57,43,0.3)]"
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex items-center justify-center w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
