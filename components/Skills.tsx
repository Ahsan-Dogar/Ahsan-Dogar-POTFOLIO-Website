
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const skills = [
  { name: 'React.js', level: 'Expert', desc: 'Architecture & State' },
  { name: 'TypeScript', level: 'Advanced', desc: 'Safe & Scalable Code' },
  { name: 'GSAP', level: 'Master', desc: 'Timeline & Motion' },
  { name: 'Three.js', level: 'Creative', desc: '3D Visuals & Shaders' },
  { name: 'Tailwind', level: 'Fluent', desc: 'Utility-first styling' },
  { name: 'Next.js', level: 'Robust', desc: 'Full-stack delivery' },
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.skill-card');
    
    gsap.fromTo(cards, 
      { scale: 0.9, opacity: 0, y: 30 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="min-h-screen py-32 flex flex-col items-center justify-center px-6"
    >
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/40 font-bold mb-4">Visual Expertise</p>
          <h2 className="text-5xl md:text-7xl luxury-text italic">Technological <span className="not-italic font-bold">Palette</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <div 
              key={i} 
              className="skill-card group relative p-10 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
              
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4">{skill.level}</p>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">{skill.name}</h3>
              <p className="text-white/50 font-light text-sm italic">{skill.desc}</p>
              
              <div className="mt-8 flex items-center gap-2">
                <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/50 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 delay-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
