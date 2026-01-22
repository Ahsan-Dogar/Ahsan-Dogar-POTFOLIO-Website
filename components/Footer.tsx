
import React from 'react';
import { gsap } from 'gsap';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    gsap.to(window, { duration: 2, scrollTo: 0, ease: 'expo.inOut' });
  };

  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start">
          <h4 className="luxury-text text-xl font-bold mb-2">Ahsan Dogar</h4>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">Front-End Web Developer</p>
        </div>
        
        <div 
          onClick={scrollToTop}
          className="group cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
          <span className="text-[8px] uppercase tracking-[0.5em] text-white/30 group-hover:text-white transition-colors">Back to Top</span>
        </div>

        <div className="text-right flex flex-col items-center md:items-end">
           <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Based in Dubai, UAE</p>
           <p className="text-[10px] uppercase tracking-widest text-white/50">© 2024 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
