// Updated to use the correct exported function name 'fetchHoroscope'
import { fetchHoroscope } from '../../../lib/gemini';

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

    // Call fetchHoroscope with both required arguments: birthDate and period
    const data = await fetchHoroscope(birthDate, period as 'daily' | 'monthly' | 'yearly');

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