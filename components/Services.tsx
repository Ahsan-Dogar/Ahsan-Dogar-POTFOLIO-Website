
import React from 'react';

const services = [
  { 
    title: 'Front-End Development', 
    desc: 'High-performance React applications built with modern architecture and clean code.',
    icon: '01'
  },
  { 
    title: 'UI / UX Implementation', 
    desc: 'Pixel-perfect translation of complex designs into functional, accessible web interfaces.',
    icon: '02'
  },
  { 
    title: 'Motion & Interaction', 
    desc: 'Engaging users through GSAP-driven storytelling and purposeful interface transitions.',
    icon: '03'
  },
  { 
    title: '3D Immersive Worlds', 
    desc: 'Pushing boundaries with Three.js to create depth and interactive 3D environments.',
    icon: '04'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-white/40 font-bold mb-4">The Value</p>
            <h2 className="text-5xl md:text-7xl luxury-text mb-10 italic">Core <span className="not-italic font-bold">Expertise</span></h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-12">
              I provide end-to-end frontend solutions that don't just work—they captivate. By focusing on the intersection of performance and aesthetics, I ensure your brand leaves a lasting digital footprint.
            </p>
            <div className="inline-block px-8 py-4 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all cursor-pointer">
              Download Credentials
            </div>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group py-10 border-b border-white/10 flex items-start gap-10 hover:px-6 transition-all duration-500 cursor-pointer"
              >
                <span className="text-xs font-bold text-white/20 mt-2 group-hover:text-yellow-400">{service.icon}</span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-light luxury-text mb-4 group-hover:translate-x-4 transition-transform duration-500">{service.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-md group-hover:translate-x-4 transition-transform duration-500 delay-100">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
