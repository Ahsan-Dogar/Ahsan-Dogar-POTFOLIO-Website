
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const projects = [
  { 
    title: 'Aura Luxury', 
    category: 'E-Commerce Branding', 
    image: 'https://picsum.photos/1200/800?random=1',
    year: '2024'
  },
  { 
    title: 'Void Studio', 
    category: 'Creative Agency', 
    image: 'https://picsum.photos/1200/800?random=2',
    year: '2023'
  },
  { 
    title: 'Nexa Flow', 
    category: 'Fintech Interface', 
    image: 'https://picsum.photos/1200/800?random=3',
    year: '2024'
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const projectItems = gsap.utils.toArray('.project-item');
    
    projectItems.forEach((item: any) => {
      const img = item.querySelector('img');
      const details = item.querySelector('.project-details');
      
      gsap.fromTo(img, 
        { scale: 1.2 },
        { 
          scale: 1, 
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      gsap.fromTo(details, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-white/[0.02] px-4 md:px-0"
    >
      <div className="container mx-auto">
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
          <div className="max-w-xl">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 font-bold mb-4 md:mb-6">Works & Artifacts</p>
            <h2 className="text-4xl sm:text-6xl md:text-8xl luxury-text font-light leading-[1.1]">Selected <span className="font-bold">Creations</span></h2>
          </div>
          <div className="pb-0 md:pb-4 max-w-xs">
             <p className="text-white/40 uppercase tracking-[0.15em] text-[10px] md:text-xs leading-relaxed">A collection of premium digital experiences curated with architectural precision.</p>
          </div>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="project-item group cursor-pointer relative"
            >
              <div className="aspect-video md:aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 relative shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                
                {/* View Project Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none md:pointer-events-auto">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-[8px] md:text-[10px] uppercase tracking-widest font-bold">
                    View
                  </div>
                </div>
              </div>

              <div className="project-details mt-6 md:mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-2">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">#{i + 1}</span>
                    <span className="w-8 md:w-10 h-[1px] bg-white/20"></span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">{project.category}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl luxury-text">{project.title}</h3>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xl md:text-2xl font-light italic text-white/60">{project.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
