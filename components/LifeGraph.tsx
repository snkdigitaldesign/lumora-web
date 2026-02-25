
'use client';

import React, { useState, useCallback } from 'react';
import { generateAIResponse, parseAIJSON } from '../lib/ai';
import { LifeGraphResult } from '../types';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register ChartJS modules
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const LifeGraph: React.FC = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LifeGraphResult | null>(null);

  const handleCalculate = useCallback(async () => {
    if (!day || !month || !year) {
      setError('กรุณาระบุข้อมูลวันเดือนปีเกิดเพื่อวิเคราะห์กราฟชีวิต');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    try {
      const prompt = `วิเคราะห์กราฟชีวิต 12 ภาค (House Matrix) สำหรับผู้ที่เกิดวันที่ ${formattedDate} 
      คำนวณคะแนนพลังงาน (0-100) สำหรับแต่ละภาคส่วน
      ส่งกลับเป็น JSON เท่านั้น ห้ามมีคำพยากรณ์รายวันปน`;

      const responseText = await generateAIResponse(prompt, {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "ภาควาสนา": { type: "NUMBER" },
            "ภาคทรัพย์": { type: "NUMBER" },
            "ภาคเพื่อน": { type: "NUMBER" },
            "ภาคญาติ": { type: "NUMBER" },
            "ภาคบริวาร": { type: "NUMBER" },
            "ภาคศัตรู": { type: "NUMBER" },
            "ภาคคู่ครอง": { type: "NUMBER" },
            "ภาคโรคภัย": { type: "NUMBER" },
            "ภาคความสุข": { type: "NUMBER" },
            "ภาคการงาน": { type: "NUMBER" },
            "ภาคเกียรติยศ": { type: "NUMBER" },
            "ภาคการเงิน": { type: "NUMBER" },
            "summary": { type: "STRING" }
          },
          required: [
            "ภาควาสนา", "ภาคทรัพย์", "ภาคเพื่อน", "ภาคญาติ", "ภาคบริวาร", 
            "ภาคศัตรู", "ภาคคู่ครอง", "ภาคโรคภัย", "ภาคความสุข", 
            "ภาคการงาน", "ภาคเกียรติยศ", "ภาคการเงิน", "summary"
          ]
        },
      });

      const data = parseAIJSON<LifeGraphResult>(responseText);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'ขออภัย การวิเคราะห์กราฟชีวิตขัดข้อง');
    } finally {
      setLoading(false);
    }
  }, [day, month, year]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { v: '1', n: 'มกราคม' }, { v: '2', n: 'กุมภาพันธ์' }, { v: '3', n: 'มีนาคม' },
    { v: '4', n: 'เมษายน' }, { v: '5', n: 'พฤษภาคม' }, { v: '6', n: 'มิถุนายน' },
    { v: '7', n: 'กรกฎาคม' }, { v: '8', n: 'สิงหาคม' }, { v: '9', n: 'กันยายน' },
    { v: '10', n: 'ตุลาคม' }, { v: '11', n: 'พฤศจิกายน' }, { v: '12', n: 'ธันวาคม' },
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const chartData = result ? {
    labels: [
      "วาสนา", "ทรัพย์", "เพื่อน", "ญาติ", "บริวาร", "ศัตรู", 
      "คู่ครอง", "โรคภัย", "ความสุข", "การงาน", "เกียรติยศ", "การเงิน"
    ],
    datasets: [
      {
        label: 'ระดับพลังงาน',
        data: [
          result["ภาควาสนา"], result["ภาคทรัพย์"], result["ภาคเพื่อน"], result["ภาคญาติ"], 
          result["ภาคบริวาร"], result["ภาคศัตรู"], result["ภาคคู่ครอง"], result["ภาคโรคภัย"], 
          result["ภาคความสุข"], result["ภาคการงาน"], result["ภาคเกียรติยศ"], result["ภาคการเงิน"]
        ],
        backgroundColor: 'rgba(212, 175, 55, 0.25)',
        borderColor: 'rgba(212, 175, 55, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(212, 175, 55, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(212, 175, 55, 1)',
        pointRadius: 4,
      },
    ],
  } : null;

  const chartOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(212, 175, 55, 0.2)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { 
          color: '#d4af37', 
          font: { size: 14, family: 'Sarabun', weight: 'bold' as const } 
        },
        ticks: { display: false, stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(10, 10, 46, 0.95)',
        titleFont: { family: 'Sarabun', size: 14 },
        bodyFont: { family: 'Sarabun', size: 14 },
        borderColor: 'rgba(212, 175, 55, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `ระดับพลังงาน: ${context.raw}%`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="animate-fade-in px-4 max-w-6xl mx-auto z-10 relative pt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-elegant text-[#d4af37] mb-4 uppercase tracking-tighter">Matrix of Soul</h2>
        <p className="text-gray-400">วิเคราะห์โครงสร้างพลังงาน 12 ภาคส่วนหลัก ผ่านกราฟใยแมงมุมระดับสากล</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] border-[#d4af37]/30 shadow-2xl overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] text-[#d4af37] uppercase tracking-widest font-bold block ml-2">วันที่เกิด</label>
            <select className="w-full bg-black/60 border border-[#d4af37]/40 text-white p-5 rounded-2xl outline-none focus:border-[#d4af37] transition-all" value={day} onChange={e => setDay(e.target.value)}>
              <option value="">เลือกวันที่</option>{days.map(d => <option key={d} value={d.toString()}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-[#d4af37] uppercase tracking-widest font-bold block ml-2">เดือนที่เกิด</label>
            <select className="w-full bg-black/60 border border-[#d4af37]/40 text-white p-5 rounded-2xl outline-none focus:border-[#d4af37] transition-all" value={month} onChange={e => setMonth(e.target.value)}>
              <option value="">เลือกเดือน</option>{months.map(m => <option key={m.v} value={m.v}>{m.n}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-[#d4af37] uppercase tracking-widest font-bold block ml-2">ปี ค.ศ. เกิด</label>
            <select className="w-full bg-black/60 border border-[#d4af37]/40 text-white p-5 rounded-2xl outline-none focus:border-[#d4af37] transition-all" value={year} onChange={e => setYear(e.target.value)}>
              <option value="">เลือกปี</option>{years.map(y => <option key={y} value={y.toString()}>{y}</option>)}
            </select>
          </div>
        </div>

        <button 
          onClick={handleCalculate} 
          disabled={loading || !day || !month || !year} 
          className={`w-full py-6 font-bold uppercase tracking-[0.5em] text-xs shadow-xl transition-all rounded-2xl active:scale-95 flex items-center justify-center gap-3 ${
            loading 
            ? 'bg-gray-800 text-gray-500' 
            : 'bg-[#d4af37] text-black hover:brightness-110 border border-[#d4af37]'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              Calculating Universal Matrix...
            </>
          ) : 'เริ่มวิเคราะห์กราฟชีวิต 12 ภาค'}
        </button>

        {error && <p className="mt-8 text-red-400 text-center animate-pulse text-sm font-bold uppercase tracking-widest">{error}</p>}

        {result && chartData && !loading && (
          <div className="mt-16 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] relative p-4 flex items-center justify-center">
                <Radar data={chartData} options={chartOptions} />
              </div>

              <div className="w-full lg:w-1/2 space-y-8">
                <div className="glass p-10 border-l-8 border-l-[#d4af37] rounded-r-3xl shadow-xl bg-gradient-to-r from-[#d4af37]/5 to-transparent">
                  <h4 className="text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">Cosmic Summary</h4>
                  <p className="text-2xl font-light italic leading-relaxed text-gray-200">"{result.summary}"</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(result).map(([key, value]) => {
                    if (key === 'summary') return null;
                    return (
                      <div key={key} className="glass p-4 rounded-xl text-center border border-white/5 hover:border-[#d4af37]/30 transition-all group">
                        <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-1 font-bold group-hover:text-[#d4af37] transition-colors">{key.replace('ภาค', '')}</p>
                        <p className="text-[#d4af37] font-bold text-lg">{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!result && !loading && (
          <div className="text-center py-24 opacity-30">
            <div className="text-8xl mb-6 grayscale brightness-150 animate-pulse">⚛️</div>
            <p className="text-xs uppercase tracking-[0.6em]">Awaiting birth coordinates to generate Matrix</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifeGraph;
