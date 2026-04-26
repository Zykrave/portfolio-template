import { motion, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureShowcase from "./components/FeatureShowcase";
import CompletedStories from "./components/CompletedStories";
import ImmersiveSection from "./components/ImmersiveSection";
import Footer from "./components/Footer";
import MatrixBackground from "./components/MatrixBackground";
import AnimeCursor from "./components/AnimeCursor";

import FrierenDivider from "./components/FrierenDivider";

import { config } from "./config";

export default function App() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Initialize scroll-triggered reveal animations via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adds 'active' class to trigger CSS transitions when elements enter viewport
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.08 } // Trigger when 8% of the element is visible
    );

    // Bind observer to all elements with the .reveal class
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative font-syne selection:bg-crimson selection:text-white min-h-screen text-white">
      <AnimeCursor />
      <MatrixBackground />
      
      {/* Global Background Layer */}
      <div className="grunge-bg" />

      <Navbar />
      
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-crimson shadow-[0_0_10px_rgba(192,57,43,0.8)] origin-left z-[60]"
        style={{ scaleX }}
      />
      
      {/* Content Layer */}
      <div className="relative z-[10]">
        <div className="reveal stagger-1">
          <Hero />
        </div>
        
        <FrierenDivider />

        <div className="reveal">
          <FeatureShowcase />
        </div>

        <FrierenDivider />

        <div className="reveal">
          <CompletedStories username={config.username} />
        </div>

        <FrierenDivider />

        <div className="reveal">
          <ImmersiveSection />
        </div>
        <div className="reveal">
          <Footer />
        </div>
      </div>
    </main>
  );
}

