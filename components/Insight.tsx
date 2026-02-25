
'use client';

import React, { useState, useCallback } from 'react';
import { InsightResult } from '../types';
import { fetchReflectionInsight } from '../lib/gemini';

const Insight: React.FC = () => {
  const [thought, setThought] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InsightResult | null>(null);

  const handleGetInsight = useCallback(async () => {
    if (!thought.trim() || thought.trim().length < 5) {
      setError("โปรดแชร์ความคิดของคุณให้ละเอียดยิ่งขึ้นเพื่อให้กระจกเงาสามารถสะท้อนภาพได้ชัดเจน");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchReflectionInsight(thought);
      setResult(data);
    } catch (err: any) {
      console.error("[Insight] Component Error:", err);
      setError(err.message || 'ขออภัย การสะท้อนความคิดขัดข้อง กรุณาลองใหม่อีกครั้งภายหลัง');
    } finally {
      setLoading(false);
    }
  }, [thought]);

  return (
    <section id="insight" className="py-24 px-4 z-10 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-elegant text-[#d4af37] mb-4">Mirror of Soul</h2>
          <p className="text-gray-400 italic">"Understanding yourself is the beginning of all wisdom."</p>
        </div>

        <div className="glass p-10 rounded-2xl shadow-2xl border border-white/5">
          <label className="block text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
            Share your reflection with the universe
          </label>
          <textarea 
            className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-6 text-white focus:outline-none focus:border-[#d4af37]/60 transition-all resize-none mb-8 placeholder:text-gray-700 text-lg font-light leading-relaxed"
            placeholder="Release your thoughts, worries, or dreams here..."
            value={thought}
            onChange={(e) => {
              setThought(e.target.value);
              if (error) setError(null);
            }}
            disabled={loading}
          />
          
          {error && (
            <div className="mb-8 p-4 bg-red-900/10 border border-red-900/20 text-red-400 text-xs rounded-lg animate-fade-in text-center">
              {error}
            </div>
          )}

          <button 
            onClick={handleGetInsight}
            disabled={loading || !thought.trim()}
            className="w-full py-5 border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-500 font-bold tracking-[0.5em] uppercase text-[10px] disabled:opacity-20 active:scale-[0.98]"
          >
            {loading ? 'Consulting the Void...' : 'Seek Insight'}
          </button>
        </div>

        {result && !loading && (
          <div className="mt-16 animate-fade-in">
            <div className="glass p-12 border-l-4 border-l-[#d4af37] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl pointer-events-none">✦</div>
              <h4 className="text-[#d4af37] font-elegant text-2xl mb-6 tracking-wide uppercase">Reflections from Lumora</h4>
              <p className="text-gray-200 leading-relaxed mb-10 italic text-xl font-light">"{result.insight}"</p>
              <div className="h-px bg-gradient-to-r from-[#d4af37]/30 to-transparent mb-10"></div>
              <h4 className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] font-bold mb-6">Pathways for Growth</h4>
              <p className="text-gray-400 leading-relaxed text-lg font-light">{result.guidance}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Insight;
