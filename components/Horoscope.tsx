
'use client';

import React, { useState, useCallback } from 'react';
import { generateAIResponse, parseAIJSON } from '../lib/ai';
import { HoroscopeResult } from '../types';

type Period = 'daily' | 'monthly' | 'yearly';

const Horoscope: React.FC = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [period, setPeriod] = useState<Period>('daily');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HoroscopeResult | null>(null);
  const [zodiacImage, setZodiacImage] = useState<string | null>(null);

  const handlePredict = useCallback(async () => {
    if (!day || !month || !year) {
      setError('กรุณาระบุวันเดือนปีเกิดให้ครบถ้วน');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    setZodiacImage(null);

    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    try {
      const prompt = `พยากรณ์ดวงชะตาแบบ ${period === 'daily' ? 'รายวัน' : period === 'monthly' ? 'รายเดือน' : 'รายปี'} สำหรับผู้ที่เกิดวันที่ ${formattedDate} 
      เน้นคำทำนายเชิงภาษาที่พรีเมียม 
      กรุณาระบุราศีแบบตะวันตก (westernZodiac) เช่น 'กุมภ์' และปีนักษัตรไทย (chineseZodiac) เช่น 'ปีชวด' 
      กฎเหล็ก: ห้ามส่งข้อมูลเกี่ยวกับคะแนนกราฟชีวิต 12 ภาคในส่วนนี้เด็ดขาด`;

      const responseText = await generateAIResponse(prompt, {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            westernZodiac: { type: "STRING" },
            chineseZodiac: { type: "STRING" },
            prediction: { type: "STRING" },
            luckyColor: { type: "STRING" },
            luckyNumber: { type: "STRING" },
          },
          required: ["westernZodiac", "chineseZodiac", "prediction", "luckyColor", "luckyNumber"]
        },
      });

      const data = parseAIJSON<HoroscopeResult>(responseText);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'ขออภัย การเชื่อมต่อดวงดาวขัดข้อง');
    } finally {
      setLoading(false);
    }
  }, [day, month, year, period]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { v: '1', n: 'มกราคม' }, { v: '2', n: 'กุมภาพันธ์' }, { v: '3', n: 'มีนาคม' },
    { v: '4', n: 'เมษายน' }, { v: '5', n: 'พฤษภาคม' }, { v: '6', n: 'มิถุนายน' },
    { v: '7', n: 'กรกฎาคม' }, { v: '8', n: 'สิงหาคม' }, { v: '9', n: 'กันยายน' },
    { v: '10', n: 'ตุลาคม' }, { v: '11', n: 'พฤศจิกายน' }, { v: '12', n: 'ธันวาคม' },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="animate-fade-in px-4 max-w-4xl mx-auto z-10 relative pt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-elegant text-[#d4af37] mb-4 uppercase tracking-tighter">Temporal Oracle</h2>
        <p className="text-gray-400">พยากรณ์โชคชะตาที่หมุนเวียนไปตามกาลเวลา</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden shadow-2xl">
        <div className="flex justify-center gap-3 mb-12 p-1.5 bg-black/40 rounded-2xl max-w-md mx-auto border border-white/10">
          {(['daily', 'monthly', 'yearly'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPeriod(p);
                if (result) setResult(null);
              }}
              className={`flex-1 py-3 px-6 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all ${
                period === p ? 'bg-[#d4af37] text-black shadow-inner' : 'text-gray-500 hover:text-white'
              }`}
            >
              {p === 'daily' ? 'รายวัน' : p === 'monthly' ? 'รายเดือน' : 'รายปี'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <select className="bg-black/40 border border-[#d4af37]/30 text-white p-5 rounded-2xl outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50" value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">วันเกิด</option>{days.map(d => <option key={d} value={d.toString()}>{d}</option>)}
          </select>
          <select className="bg-black/40 border border-[#d4af37]/30 text-white p-5 rounded-2xl outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">เดือนเกิด</option>{months.map(m => <option key={m.v} value={m.v}>{m.n}</option>)}
          </select>
          <select className="bg-black/40 border border-[#d4af37]/30 text-white p-5 rounded-2xl outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">ปีเกิด ค.ศ.</option>{years.map(y => <option key={y} value={y.toString()}>{y}</option>)}
          </select>
        </div>

        <button 
          onClick={handlePredict}
          disabled={loading || !day || !month || !year}
          className={`w-full py-6 font-bold uppercase tracking-[0.5em] transition-all rounded-2xl shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
            loading 
            ? 'bg-gray-800 text-gray-500' 
            : 'bg-[#d4af37] text-black hover:brightness-110 border border-[#d4af37]'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              Consulting the Cosmic Oracle...
            </>
          ) : `รับคำทำนาย${period === 'daily' ? 'รายวัน' : period === 'monthly' ? 'รายเดือน' : 'รายปี'}`}
        </button>

        {error && <p className="mt-8 text-red-400 text-center text-[10px] tracking-widest uppercase animate-pulse">{error}</p>}

        {result && !loading && (
          <div className="mt-16 animate-fade-in border-t border-white/5 pt-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {zodiacImage && (
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,0.25)] shrink-0 group">
                  <img src={zodiacImage} alt={result.westernZodiac} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s]" />
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-6 py-2 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-[14px] font-bold mb-6">
                  ราศี{result.westernZodiac} ({result.chineseZodiac})
                </div>
                <h3 className="text-4xl font-elegant text-white mb-8">
                  ชะตาลิขิต{period === 'daily' ? 'ประจำวัน' : period === 'monthly' ? 'ประจำเดือน' : 'ประจำปี'}
                </h3>
                <p className="text-xl leading-relaxed text-gray-200 italic font-light whitespace-pre-wrap mb-10 px-4 md:px-0">
                  "{result.prediction}"
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-12 text-sm border-t border-white/5 pt-10">
                  <div>
                    <p className="text-gray-500 uppercase tracking-widest text-[9px] mb-3 font-bold">Lucky Color</p>
                    <p className="text-[#d4af37] font-bold text-2xl tracking-tight">{result.luckyColor}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase tracking-widest text-[9px] mb-3 font-bold">Lucky Number</p>
                    <p className="text-[#d4af37] font-bold text-2xl tracking-tight">{result.luckyNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Horoscope;
