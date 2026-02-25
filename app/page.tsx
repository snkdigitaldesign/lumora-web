
'use client';

import React from 'react';
import StarBackground from '../components/StarBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Horoscope from '../components/Horoscope';
import LifeGraph from '../components/LifeGraph';
import Tarot from '../components/Tarot';
import Insight from '../components/Insight';
import SEOContent from '../components/SEOContent';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="relative selection:bg-[#d4af37] selection:text-black min-h-screen">
      <StarBackground />
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        
        <div className="bg-gradient-to-b from-transparent via-[#0a0a2e]/80 to-[#000000] pb-24">
          
          <div id="horoscope-section" className="scroll-mt-24">
            <Horoscope />
          </div>

          <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent my-20"></div>
          
          <div id="lifegraph-section" className="scroll-mt-24">
            <LifeGraph />
          </div>

          <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent my-20"></div>
          
          <div id="tarot-section" className="scroll-mt-24">
            <Tarot />
          </div>

          <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent my-20"></div>
          
          <div id="insight-section" className="scroll-mt-24">
            <Insight />
          </div>
        </div>
        
        <SEOContent />
      </div>
      <Footer />
    </main>
  );
}
