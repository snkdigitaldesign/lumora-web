
import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [clickedBtn, setClickedBtn] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    setClickedBtn(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Reset after transition
    setTimeout(() => setClickedBtn(null), 1000);
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 z-10">
      <div className="animate-fade-in">
        <h1 className="text-7xl md:text-9xl font-elegant text-[#d4af37] mb-4 tracking-tighter">
          Lumora
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 tracking-[0.2em] uppercase">
          Insight Beyond the Stars
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollTo('horoscope-section')}
            className={`px-8 py-4 border transition-all duration-500 rounded-xl uppercase tracking-widest text-[10px] font-bold ${
              clickedBtn === 'horoscope-section' 
                ? 'bg-[#d4af37] text-black border-[#d4af37] scale-95' 
                : 'border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-black'
            }`}
          >
            🔮 พยากรณ์ดวง
          </button>
          <button 
            onClick={() => scrollTo('lifegraph-section')}
            className={`px-8 py-4 border transition-all duration-500 rounded-xl uppercase tracking-widest text-[10px] font-bold ${
              clickedBtn === 'lifegraph-section'
                ? 'bg-white text-black border-white scale-95'
                : 'bg-white/5 border-white/20 text-white hover:border-[#d4af37]'
            }`}
          >
            📊 กราฟชีวิต
          </button>
          <button 
            onClick={() => scrollTo('dream-section')}
            className={`px-8 py-4 border transition-all duration-500 rounded-xl uppercase tracking-widest text-[10px] font-bold ${
              clickedBtn === 'dream-section'
                ? 'bg-white text-black border-white scale-95'
                : 'bg-white/5 border-white/20 text-white hover:border-[#d4af37]'
            }`}
          >
            🌙 ทำนายฝัน
          </button>
          <button 
            onClick={() => scrollTo('tarot-section')}
            className={`px-8 py-4 border transition-all duration-500 rounded-xl uppercase tracking-widest text-[10px] font-bold ${
              clickedBtn === 'tarot-section'
                ? 'bg-white text-black border-white scale-95'
                : 'bg-white/5 border-white/20 text-white hover:border-[#d4af37]'
            }`}
          >
            🎴 เปิดไพ่ทาโรต์
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 animate-bounce cursor-pointer" onClick={() => scrollTo('horoscope-section')}>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
