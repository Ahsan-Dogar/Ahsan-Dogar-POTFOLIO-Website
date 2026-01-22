
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMagnetic } from '../hooks/useMagnetic';

const navItems = [
  { label: 'Intro', href: '#hero' },
  { label: 'Story', href: '#about' },
  { label: 'Vision', href: '#skills' },
  { label: 'Works', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Connect', href: '#contact' },
];

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out', delay: 2.5 }
    );
  }, []);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    if (newState) {
      gsap.to(menuOverlayRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 1.2,
        ease: 'expo.inOut'
      });
      gsap.fromTo('.mobile-nav-link', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.4 }
      );
    } else {
      gsap.to(menuOverlayRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 1,
        ease: 'expo.inOut'
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isOpen) toggleMenu();
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: href, autoKill: false },
      ease: 'expo.inOut'
    });
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[60] flex justify-center py-4 md:py-6 px-4 md:px-10 pointer-events-none"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 md:px-8 py-2 md:py-3 flex items-center justify-between md:justify-start w-full md:w-auto max-w-[95%] pointer-events-auto">
          <div className="text-white font-bold tracking-tighter text-lg luxury-text md:mr-4">AD</div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink 
                key={item.label} 
                item={item} 
                onClick={(e) => handleNavClick(e, item.href)} 
              />
            ))}
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white flex items-center gap-2 group"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60 group-hover:opacity-100 transition-opacity">
              {isOpen ? 'Close' : 'Menu'}
            </span>
            <div className="w-5 h-4 flex flex-col justify-between items-end">
              <span className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'w-5 translate-y-2 rotate-45' : 'w-5'}`}></span>
              <span className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-3'}`}></span>
              <span className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'w-5 -translate-y-2 -rotate-45' : 'w-4'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div 
        ref={menuOverlayRef}
        style={{ clipPath: 'circle(0% at 100% 0%)' }}
        className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="mobile-nav-link text-3xl font-light luxury-text italic text-white hover:text-yellow-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="absolute bottom-12 flex gap-6 opacity-40">
           <span className="text-[8px] uppercase tracking-widest">LinkedIn</span>
           <span className="text-[8px] uppercase tracking-widest">Twitter</span>
           <span className="text-[8px] uppercase tracking-widest">Github</span>
        </div>
      </div>
    </>
  );
};

const NavLink: React.FC<{ item: any; onClick: (e: any) => void }> = ({ item, onClick }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  useMagnetic(linkRef);

  return (
    <a
      ref={linkRef}
      href={item.href}
      onClick={onClick}
      className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 hover:text-white transition-colors relative group py-2"
    >
      {item.label}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-500"></span>
    </a>
  );
};

export default Navbar;
