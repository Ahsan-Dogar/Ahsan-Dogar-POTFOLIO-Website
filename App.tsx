
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial loading sequence
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    });

    tl.to(".loading-overlay", {
      opacity: 0,
      duration: 1.5,
      delay: 2,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(".loading-overlay", { display: "none" });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative w-full min-h-screen">
      {/* Loading Overlay */}
      <div className="loading-overlay fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none">
        <div className="overflow-hidden mb-4">
          <h1 className="text-white text-2xl tracking-[0.5em] uppercase font-light translate-y-full animate-reveal">
            Ahsan Dogar
          </h1>
        </div>
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-white/80 w-0 animate-loading-bar"></div>
        </div>
        <p className="mt-8 text-xs text-white/40 tracking-widest uppercase italic">
          Crafting Digital Excellence
        </p>
      </div>

      <Background3D />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
        <Footer />
      </main>

      <style>{`
        @keyframes reveal {
          to { transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
        @keyframes loading-bar {
          0% { width: 0; left: -100%; }
          50% { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
