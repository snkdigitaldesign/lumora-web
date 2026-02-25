
'use client';

import React, { useState } from 'react';
import { generateAIResponse, parseAIJSON } from '../lib/ai';
import { NumerologyResult } from '../types';

const Numerology: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const prompt = `วิเคราะห์เลขศาสตร์หรือชื่อ: "${input}" ตามหลักทักษาหรือเลขศาสตร์สากล (ภาษาไทย) บอกพลังงานและคำแนะนำ`;
      const responseText = await generateAIResponse(prompt, {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            analysis: { type: "STRING" },
            energyLevel: { type: "NUMBER" },
            recommendation: { type: "STRING" },
          },
          required: ["analysis", "energyLevel", "recommendation"]
        },
      });

      const data = parseAIJSON<NumerologyResult>(responseText);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "ขออภัย ระบบขัดข้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in px-4 max-w-4xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-elegant text-[#d4af37] mb-4">เลขศาสตร์</h2>
        <p className="text-gray-400 italic">วิเคราะห์พลังงานผ่านตัวเลขและชื่อ</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] border-[#d4af37]/20 shadow-2xl text-center">
        <input
          type="text"
          className="w-full bg-black/40 border border-[#d4af37]/30 rounded-2xl p-6 text-white focus:outline-none focus:border-[#d4af37] transition-all mb-6 text-center text-2xl tracking-widest placeholder:text-gray-700"
          placeholder="ระบุชื่อหรือตัวเลขที่ต้องการวิเคราะห์"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !input.trim()}
          className="w-full py-5 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold uppercase tracking-widest rounded-2xl transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? 'กำลังวิเคราะห์...' : 'วิเคราะห์พลังงาน'}
        </button>

        {error && <p className="mt-6 text-red-400">{error}</p>}

        {result && (
          <div className="mt-12 animate-fade-in text-left border-t border-white/5 pt-10">
            <div className="mb-8">
              <h3 className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-4">ผลวิเคราะห์</h3>
              <p className="text-lg text-gray-200 leading-relaxed">{result.analysis}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-[#d4af37]/10">
                <h4 className="text-[#d4af37] text-[10px] uppercase font-bold mb-2">ระดับพลังงาน</h4>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#d4af37] h-full transition-all duration-1000" 
                    style={{ width: `${result.energyLevel}%` }}
                  />
                </div>
                <span className="text-[#d4af37] text-sm mt-2 block">{result.energyLevel}/100</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-[#d4af37]/10">
                <h4 className="text-[#d4af37] text-[10px] uppercase font-bold mb-2">คำแนะนำ</h4>
                <p className="text-sm text-gray-300">{result.recommendation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Numerology;
