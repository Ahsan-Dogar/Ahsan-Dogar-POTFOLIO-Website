
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = gsap.utils.toArray('.reveal-line');
    
    // Staggered text reveal
    lines.forEach((line: any) => {
      gsap.fromTo(line, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Image Parallax & Reveal
    gsap.fromTo(containerRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { 
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 2,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.to(imageRef.current, {
      yPercent: 15,
      scale: 1.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Background Decor Parallax
    gsap.to('.bg-shape', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: -300,
      rotate: 45
    });
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 flex items-center justify-center px-4 md:px-6 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="bg-shape absolute top-1/2 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Profile Image Column */}
        <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
          <div 
            ref={containerRef}
            className="relative w-full max-w-[450px] aspect-[3/4] overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            <img 
              ref={imageRef}
              // Note: Using a high-quality placeholder that matches the provided portrait (Professional man in suit)
              // You can replace this src with your specific local path './ahsan-dogar.jpg'
              src="'./unamed.jpgq=80&w=2000&auto=format&fit=crop" 
              alt="Ahsan Dogar" 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000 origin-top"
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 w-32 h-32 md:w-44 md:h-44 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center p-4 md:p-8 text-center shadow-2xl z-20 group hover:scale-110 transition-transform duration-500">
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold leading-relaxed text-white/80">
              Defining <br/> Modern <br/> Luxury <br/> <span className="text-white italic">Since 2014</span>
            </p>
          </div>
        </div>

        {/* Narrative Column */}
        <div ref={textRef} className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
          <div className="reveal-line">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/40 font-bold mb-2">The Architect</p>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </div>
          
          <h2 className="reveal-line text-4xl md:text-6xl lg:text-7xl luxury-text leading-tight font-light">
            Crafting <span className="italic font-normal">Digital</span> <br/> 
            <span className="font-bold">Masterpieces</span>.
          </h2>
          
          <div className="reveal-line flex flex-col gap-6 text-white/60 text-base md:text-xl leading-relaxed font-light max-w-xl">
            <p>
              I am <span className="text-white font-medium">Ahsan Dogar</span>, a Front-End Architect dedicated to pushing the boundaries of what's possible in a browser. 
            </p>
            <p className="italic">
              My work lives at the intersection of cinematic motion and high-performance engineering, ensuring every interaction feels as luxurious as a bespoke timepiece.
            </p>
          </div>
          
          <div className="reveal-line mt-4 md:mt-8 flex items-center gap-6">
             <div>
               <p className="text-white text-2xl font-bold luxury-text italic leading-none">100+</p>
               <p className="text-[8px] uppercase tracking-widest text-white/30 mt-1">Projects Delivered</p>
             </div>
             <div className="w-[1px] h-10 bg-white/10"></div>
             <div>
               <p className="text-white text-2xl font-bold luxury-text italic leading-none">Global</p>
               <p className="text-[8px] uppercase tracking-widest text-white/30 mt-1">Client Network</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
