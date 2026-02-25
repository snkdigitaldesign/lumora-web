
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Centralized AI logic for Lumora Web.
 * Enforces the use of a single model and provides safety limits.
 */

// Using gemini-3-flash-preview as the modern, non-deprecated equivalent for flash tasks.
// Note: gemini-1.5-flash is deprecated in this environment.
const GEMINI_MODEL = "gemini-3-flash-preview";

/**
 * Core function to generate AI response.
 * @param prompt The input prompt for the AI.
 * @param config Optional configuration overrides.
 */
export async function generateAIResponse(prompt: string, config: any = {}) {
  const apiKey = process.env.API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("Configuration Error: API Key is missing");
  }

  // Safety limit: Trim input prompt if it exceeds 4000 characters
  const safePrompt = prompt.length > 4000 ? prompt.substring(0, 4000) : prompt;

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: safePrompt,
      config: {
        maxOutputTokens: 1024,
        ...config
      },
    });

    if (!response.text) {
      throw new Error("จักรวาลว่างเปล่า: ไม่ได้รับข้อมูลจากดวงดาว");
    }

    return response.text;
  } catch (error: any) {
    // Do not expose API key in frontend console logs
    console.error("AI Generation Error:", error.message || "Unknown error");
    throw new Error("ไม่สามารถเชื่อมต่อกับดวงดาวได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง");
  }
}

/**
 * Helper to extract and parse JSON from AI response.
 */
export function parseAIJSON<T>(text: string): T {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error("ข้อมูลจากดวงดาวอยู่ในรูปแบบที่ไม่ถูกต้อง");
  }
  
  const cleanJson = text.substring(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(cleanJson) as T;
  } catch (error) {
    throw new Error("ไม่สามารถถอดรหัสข้อความจากดวงดาวได้");
  }
}
