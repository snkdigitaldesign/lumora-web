
import { GoogleGenAI, Type } from "@google/genai";
import { HoroscopeResult, InsightResult } from "../types";

/**
 * Centralized AI service with error handling and optimized instance management.
 */

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }
  // Create a new instance to ensure the most up-to-date API key is used
  return new GoogleGenAI({ apiKey });
};

/**
 * Fetches daily horoscope prediction using Gemini 3 Flash.
 * Uses JSON response schema for structured data extraction.
 */
export const getHoroscope = async (zodiac: string): Promise<HoroscopeResult> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `ทำนายดวงรายวันสำหรับผู้ที่เกิดใน ${zodiac} ในวันนี้ โดยเน้นที่การพัฒนาตนเองและแนวคิดเชิงบวก`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            // Updated to match westernZodiac and chineseZodiac schema
            westernZodiac: { type: Type.STRING },
            chineseZodiac: { type: Type.STRING },
            prediction: { type: Type.STRING },
            luckyColor: { type: Type.STRING },
            luckyNumber: { type: Type.STRING },
          },
          required: ["westernZodiac", "chineseZodiac", "prediction", "luckyColor", "luckyNumber"]
        },
      },
    });

    // Directly access text property as it is a getter
    if (!response.text) throw new Error("Empty AI response");
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Horoscope Service Error:", error);
    throw new Error("ไม่สามารถดึงข้อมูลดวงชะตาได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง");
  }
};

/**
 * Interprets a single tarot card using Gemini 3 Flash.
 */
export const getTarotInterpretation = async (cardName: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `ให้คำแปลไพ่ทาโรต์ใบนี้: "${cardName}" ในเชิงจิตวิทยาและการนำไปใช้ในชีวิตประจำวัน (ภาษาไทย)`,
      config: {
        systemInstruction: "You are a wise and empathetic tarot reader. Focus on psychological insights rather than supernatural fortune-telling.",
      }
    });
    return response.text || "ขออภัย ไม่สามารถตีความไพ่ใบนี้ได้";
  } catch (error) {
    console.error("Tarot Service Error:", error);
    throw new Error("เกิดข้อผิดพลาดในการแปลความหมายไพ่");
  }
};

/**
 * Generates deep reflection insight using Gemini 3 Pro.
 */
export const getReflectionInsight = async (thought: string): Promise<InsightResult> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `นี่คือสิ่งที่ฉันคิดอยู่: "${thought}" ช่วยสะท้อนความคิดนี้และให้มุมมองที่ช่วยให้ฉันเติบโตขึ้น`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            thought: { type: Type.STRING, description: "Summarized original thought" },
            insight: { type: Type.STRING, description: "Deep psychological reflection" },
            guidance: { type: Type.STRING, description: "Actionable advice for self-improvement" },
          },
          required: ["thought", "insight", "guidance"]
        },
      },
    });

    if (!response.text) throw new Error("Empty AI response");
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Insight Service Error:", error);
    throw new Error("จักรวาลยังไม่พร้อมให้คำแนะนำในตอนนี้ กรุณาลองใหม่ภายหลัง");
  }
};
