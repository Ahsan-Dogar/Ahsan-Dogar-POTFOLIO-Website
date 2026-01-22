
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMagnetic } from '../hooks/useMagnetic';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  useMagnetic(ctaRef);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 });

    tl.fromTo(titleRef.current?.children || [], 
      { y: 100, opacity: 0, rotateX: -45 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 1.5, 
        stagger: 0.1, 
        ease: 'expo.out' 
      }
    )
    .fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
      "-=0.5"
    );

    // Subtle parallax for the whole hero content
    gsap.to(".hero-content", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 200,
      opacity: 0
    });
  }, []);

  const scrollToWorks = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: "#projects",
      ease: 'expo.inOut'
    });
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="hero-content container mx-auto px-4 md:px-6 text-center z-10 flex flex-col items-center">
        <h1 
          ref={titleRef} 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter luxury-text leading-[0.9] mb-6 md:mb-4 perspective-1000"
        >
          <span className="block italic">Ahsan</span>
          <span className="block font-bold">Dogar</span>
        </h1>
        
        <div 
          ref={subtitleRef}
          className="max-w-xl mx-auto mb-10 md:mb-12"
        >
          <p className="text-white/40 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-sm font-medium mb-4">
            Front-End Web Developer
          </p>
          <p className="text-base md:text-xl font-light text-white/80 leading-relaxed italic px-4 md:px-0">
            "Designing immersive digital experiences that blend emotion with precision."
          </p>
        </div>

        <button 
          ref={ctaRef}
          onClick={scrollToWorks}
          className="group relative px-8 md:px-10 py-3 md:py-4 bg-white text-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold rounded-full overflow-hidden transition-all duration-500 hover:px-14 active:scale-95"
        >
          <span className="relative z-10">Explore My Works</span>
          <div className="absolute inset-0 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <span className="text-[8px] uppercase tracking-widest">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
};

export default Hero;
