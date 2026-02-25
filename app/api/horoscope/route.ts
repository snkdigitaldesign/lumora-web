// Updated to use the correct exported function name 'fetchHoroscope'
import { generateAIResponse, parseAIJSON } from '../../../lib/ai';
import { HoroscopeResult } from '../../../types';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { birthDate, period = 'daily' } = body;

    if (!birthDate) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Birth date is required" 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const prompt = `พยากรณ์ดวงชะตาแบบ ${period} สำหรับผู้ที่เกิดวันที่ ${birthDate} 
    เน้นคำทำนายเชิงภาษาที่พรีเมียม 
    กรุณาระบุราศีแบบตะวันตก (westernZodiac) และปีนักษัตรไทย (chineseZodiac)`;

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

    return new Response(JSON.stringify({ 
      success: true, 
      data 
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error: any) {
    console.error("[API/Horoscope] Handler Error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || "Celestial alignment failed" 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}