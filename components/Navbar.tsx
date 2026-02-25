
'use client';

import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'horoscope-section', label: 'พยากรณ์ดวง', icon: '🔮' },
    { id: 'lifegraph-section', label: 'กราฟชีวิต', icon: '📊' },
    { id: 'dream-section', label: 'ทำนายฝัน', icon: '🌙' },
    { id: 'numerology-section', label: 'เลขศาสตร์', icon: '🔢' },
    { id: 'tarot-section', label: 'ไพ่ทาโรต์', icon: '🎴' },
    { id: 'insight-section', label: 'สะท้อนจิต', icon: '✨' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['horoscope-section', 'lifegraph-section', 'dream-section', 'numerology-section', 'tarot-section', 'insight-section'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let current = 'hero';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-[#0a0a2e]/95 backdrop-blur-2xl border-b border-[#d4af37]/20 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-elegant text-[#d4af37] tracking-widest uppercase cursor-pointer hover:scale-105 transition-transform"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Lumora
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-all hover:text-[#d4af37] flex items-center gap-2 relative group px-2 py-1 ${
                activeSection === link.id ? 'text-[#d4af37] scale-110' : 'text-gray-400'
              }`}
            >
              <span className={`text-sm transition-transform duration-500 ${activeSection === link.id ? 'scale-125' : 'group-hover:scale-110'}`}>{link.icon}</span>
              {link.label}
              <span className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-[#d4af37] transition-all duration-500 shadow-[0_0_10px_#d4af37] ${activeSection === link.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-30 group-hover:scale-x-50'}`}></span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => scrollTo('horoscope-section')}
          className="bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:brightness-110 transition-all shadow-lg shadow-[#d4af37]/20 hover:scale-105 active:scale-95"
        >
          เช็กดวงชะตา
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
