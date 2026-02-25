// Updated to use the correct exported function name 'fetchReflectionInsight'
import { generateAIResponse, parseAIJSON } from '../../../lib/ai';
import { InsightResult } from '../../../types';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { thought } = body;

    if (!thought || thought.trim().length < 2) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Please share a more detailed thought" 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const prompt = `วิเคราะห์และสะท้อนความคิดนี้: "${thought}" (ภาษาไทย)`;
    const responseText = await generateAIResponse(prompt, {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          thought: { type: "STRING" },
          insight: { type: "STRING" },
          guidance: { type: "STRING" },
        },
        required: ["thought", "insight", "guidance"]
      },
    });

    const data = parseAIJSON<InsightResult>(responseText);
    
    return new Response(JSON.stringify({ 
      success: true, 
      data 
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error: any) {
    console.error("[API/Insight] Handler Error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || "Insight processing failed" 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}