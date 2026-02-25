
'use client';

import React, { useState } from 'react';
import { MAJOR_ARCANA } from '../constants';
import { fetchTarotInterpretation, generateTarotImage } from '../lib/gemini';

const Tarot: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<{ name: string; meaning: string; imageUrl?: string } | null>(null);

  const drawCard = async () => {
    setLoading(true);
    setCard(null);
    setError(null);
    
    try {
      const randomIndex = Math.floor(Math.random() * MAJOR_ARCANA.length);
      const cardName = MAJOR_ARCANA[randomIndex];
      
      const [meaning, imageUrl] = await Promise.all([
        fetchTarotInterpretation(cardName),
        generateTarotImage(cardName)
      ]);
      
      setCard({ name: cardName, meaning, imageUrl });
    } catch (err: any) {
      setError(err.message || "การเชื่อมต่ออาณาจักรทาโรต์ขัดข้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tarot" className="py-24 px-4 bg-black/40 z-10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#d4af37] text-[11px] font-bold mb-4 uppercase tracking-[0.6em]">Mystic Guidance</div>
          <h2 className="text-4xl md:text-6xl font-elegant text-white mb-6">Vertical Divine Tarot</h2>
          <p className="text-gray-400 max-w-xl mx-auto italic">อธิษฐานจิตถึงสิ่งที่ต้องการหาคำตอบ แล้วเลือกเปิดไพ่เพื่อรับพลังงานจากจักรวาล</p>
        </div>

        <div className="flex flex-col items-center">
          {!card && !loading && (
            <div 
              onClick={drawCard}
              className="w-72 aspect-[2/3] border-2 border-[#d4af37]/20 rounded-[2rem] flex items-center justify-center cursor-pointer hover:border-[#d4af37]/60 transition-all duration-700 group shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden bg-[#050510]"
            >
              {/* Premium Card Back Design */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#d4af37_0%,_transparent_70%)] animate-pulse"></div>
              <div className="absolute inset-4 border border-[#d4af37]/10 rounded-[1.5rem]"></div>
              <div className="absolute inset-8 border-2 border-[#d4af37]/5 rounded-[1.2rem] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-[#d4af37]/10 rotate-45"></div>
              </div>
              
              <div className="text-center group-hover:scale-110 transition-transform duration-700 z-10">
                <div className="text-5xl mb-6 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">🕯️</div>
                <span className="text-[#d4af37] uppercase tracking-[0.5em] text-[11px] font-bold">Draw Your Destiny</span>
                <div className="mt-6 h-px w-10 bg-[#d4af37]/30 mx-auto"></div>
              </div>
            </div>
          )}

          {loading && (
            <div className="w-72 aspect-[2/3] glass border-[#d4af37]/20 rounded-[2rem] flex flex-col items-center justify-center animate-pulse">
               <div className="w-12 h-12 border-4 border-[#d4af37]/10 border-t-[#d4af37] rounded-full animate-spin mb-6"></div>
               <span className="text-[#d4af37] text-[9px] uppercase tracking-widest font-bold">Summoning Cosmic Art...</span>
            </div>
          )}

          {card && (
            <div className="animate-fade-in flex flex-col lg:flex-row gap-16 lg:gap-24 items-center w-full max-w-5xl">
              <div className="w-full max-w-[380px] shrink-0">
                <div className="relative aspect-[2/3] glass border-[#d4af37]/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.2)] group transform hover:scale-[1.03] transition-all duration-700">
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050515]">
                      <span className="text-7xl mb-6">🎴</span>
                      <h3 className="text-2xl font-elegant text-[#d4af37]">{card.name}</h3>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-10 left-0 right-0 text-center">
                    <h3 className="text-3xl font-elegant text-[#d4af37] tracking-widest uppercase">{card.name}</h3>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 glass p-10 md:p-14 rounded-[3rem] border border-white/5 shadow-2xl relative">
                <div className="absolute top-0 right-0 p-10 opacity-5 text-9xl pointer-events-none font-elegant italic">T</div>
                <h4 className="text-[#d4af37] text-[11px] font-bold mb-8 uppercase tracking-[0.5em] border-b border-[#d4af37]/10 pb-6">Sacred Interpretation</h4>
                <div className="text-gray-100 leading-relaxed text-2xl font-light italic whitespace-pre-wrap">
                  "{card.meaning}"
                </div>
                
                <div className="mt-14 flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={drawCard}
                    className="px-10 py-5 bg-[#d4af37] text-black hover:brightness-110 transition-all text-[11px] uppercase tracking-[0.4em] font-bold rounded-xl shadow-xl active:scale-95"
                  >
                    Draw Another Card
                  </button>
                  <button 
                    onClick={() => setCard(null)}
                    className="px-10 py-5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-[11px] uppercase tracking-[0.4em] font-bold rounded-xl"
                  >
                    Return to Void
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && <p className="mt-8 text-red-400 text-[10px] tracking-widest uppercase animate-pulse">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default Tarot;
