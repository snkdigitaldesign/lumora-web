// Updated to use the correct exported function name 'fetchTarotInterpretation'
import { generateAIResponse } from '../../../lib/ai';
import { MAJOR_ARCANA } from '../../../constants';

export async function GET() {
  try {
    const randomIndex = Math.floor(Math.random() * MAJOR_ARCANA.length);
    const cardName = MAJOR_ARCANA[randomIndex];
    
    const meaning = await generateAIResponse(`แปลความหมายไพ่ทาโรต์ "${cardName}" เป็นภาษาไทยในสไตล์พรีเมียม`, {
      systemInstruction: "คุณคือที่ปรึกษาด้านจิตวิญญาณมืออาชีพ"
    });
    
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