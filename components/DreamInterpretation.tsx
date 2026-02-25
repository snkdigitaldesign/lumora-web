
'use client';

import React, { useState } from 'react';
import { generateAIResponse, parseAIJSON } from '../lib/ai';
import { DreamResult } from '../types';

const DreamInterpretation: React.FC = () => {
  const [dream, setDream] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DreamResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!dream.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const prompt = `ทำนายความฝัน: "${dream}" ในสไตล์พรีเมียมและลึกซึ้ง (ภาษาไทย) พร้อมให้เลขนำโชค`;
      const responseText = await generateAIResponse(prompt, {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            interpretation: { type: "STRING" },
            luckyNumbers: { type: "STRING" },
          },
          required: ["interpretation", "luckyNumbers"]
        },
      });

      const data = parseAIJSON<DreamResult>(responseText);
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
        <h2 className="text-3xl md:text-5xl font-elegant text-[#d4af37] mb-4">ทำนายความฝัน</h2>
        <p className="text-gray-400 italic">ถอดรหัสข้อความจากจิตใต้สำนึก</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] border-[#d4af37]/20 shadow-2xl">
        <textarea
          className="w-full h-40 bg-black/40 border border-[#d4af37]/30 rounded-2xl p-6 text-white focus:outline-none focus:border-[#d4af37] transition-all resize-none mb-6 placeholder:text-gray-600"
          placeholder="เล่าความฝันของคุณให้ฟังหน่อย..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
        />

        <button
          onClick={handlePredict}
          disabled={loading || !dream.trim()}
          className="w-full py-5 bg-[#d4af37] text-black font-bold uppercase tracking-widest rounded-2xl transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
        >
          {loading ? 'กำลังถอดรหัสฝัน...' : 'ทำนายฝัน'}
        </button>

        {error && <p className="mt-6 text-red-400 text-center">{error}</p>}

        {result && (
          <div className="mt-12 animate-fade-in border-t border-white/5 pt-10">
            <h3 className="text-[#d4af37] text-sm font-bold uppercase tracking-widest mb-4">คำทำนาย</h3>
            <p className="text-xl text-gray-200 leading-relaxed mb-8 italic">"{result.interpretation}"</p>
            <div className="p-6 bg-white/5 rounded-2xl border border-[#d4af37]/20 inline-block">
              <span className="text-gray-500 text-xs uppercase block mb-1">เลขนำโชค</span>
              <span className="text-3xl font-bold text-[#d4af37] tracking-widest">{result.luckyNumbers}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamInterpretation;
