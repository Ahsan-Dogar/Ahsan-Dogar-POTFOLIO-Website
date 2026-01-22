
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useMagnetic } from '../hooks/useMagnetic';

const Contact: React.FC = () => {
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  useMagnetic(submitBtnRef);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful submission with motion
    gsap.to('.contact-form', { opacity: 0.5, pointerEvents: 'none' });
    alert("Message received. I will reach out shortly.");
  };

  return (
    <section id="contact" className="min-h-screen py-32 flex items-center justify-center px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.5em] text-white/40 font-bold mb-4">Connect</p>
          <h2 className="text-5xl md:text-8xl luxury-text font-light italic">Let's start a <span className="not-italic font-bold underline decoration-1">Legacy</span></h2>
        </div>

        <form onSubmit={handleSubmit} className="contact-form grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative group">
            <input 
              type="text" 
              required 
              placeholder="Full Name" 
              className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 text-lg font-light"
            />
          </div>
          <div className="relative group">
            <input 
              type="email" 
              required 
              placeholder="Email Address" 
              className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 text-lg font-light"
            />
          </div>
          <div className="md:col-span-2 relative group">
            <textarea 
              rows={4} 
              required 
              placeholder="Your Narrative" 
              className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 text-lg font-light resize-none"
            ></textarea>
          </div>
          
          <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-10 mt-10">
            <div className="flex items-center gap-6">
               <a href="#" className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold">LinkedIn</a>
               <a href="#" className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold">Dribbble</a>
               <a href="#" className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold">GitHub</a>
            </div>
            
            <button 
              ref={submitBtnRef}
              type="submit"
              className="group relative px-12 py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold rounded-full overflow-hidden"
            >
              <span className="relative z-10">Send Message</span>
              <div className="absolute inset-0 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
