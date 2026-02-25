// Updated to use the correct exported function name 'fetchTarotInterpretation'
import { fetchTarotInterpretation } from '../../../lib/gemini';
import { MAJOR_ARCANA } from '../../../constants';

export async function GET() {
  try {
    const randomIndex = Math.floor(Math.random() * MAJOR_ARCANA.length);
    const cardName = MAJOR_ARCANA[randomIndex];
    // Call fetchTarotInterpretation instead of the non-existent fetchServerTarotInterpretation
    const meaning = await fetchTarotInterpretation(cardName);
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: { name: cardName, meaning } 
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error: any) {
    console.error("[API/Tarot] Handler Error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || "Failed to draw a card" 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}