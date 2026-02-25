// Updated to use the correct exported function name 'fetchReflectionInsight'
import { fetchReflectionInsight } from '../../../lib/gemini';

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

    // Call fetchReflectionInsight instead of the non-existent fetchServerReflectionInsight
    const data = await fetchReflectionInsight(thought);
    
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