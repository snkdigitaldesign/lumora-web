
import { GoogleGenAI, Type } from "@google/genai";
import { HoroscopeResult, InsightResult, LifeGraphResult, DreamResult, NumerologyResult } from "../types";
import { TAROT_SYMBOLS } from "../constants";

function extractAndParseJSON<T>(text: string | undefined): T {
  if (!text) {
    throw new Error("จักรวาลว่างเปล่า: ไม่ได้รับข้อมูลจากดวงดาว");
  }
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

const getAIInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Configuration Error: API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchDreamInterpretation = async (dreamDescription: string): Promise<DreamResult> => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `ทำนายความฝัน: "${dreamDescription}" ในสไตล์พรีเมียมและลึกซึ้ง (ภาษาไทย) พร้อมให้เลขนำโชค`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interpretation: { type: Type.STRING },
            luckyNumbers: { type: Type.STRING },
          },
          required: ["interpretation", "luckyNumbers"]
        },
      },
    });
    return extractAndParseJSON<DreamResult>(response.text);
  } catch (error: any) {
    throw error;
  }
};

export const fetchNumerologyAnalysis = async (input: string): Promise<NumerologyResult> => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `วิเคราะห์เลขศาสตร์หรือชื่อ: "${input}" ตามหลักทักษาหรือเลขศาสตร์สากล (ภาษาไทย) บอกพลังงานและคำแนะนำ`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            energyLevel: { type: Type.NUMBER },
            recommendation: { type: Type.STRING },
          },
          required: ["analysis", "energyLevel", "recommendation"]
        },
      },
    });
    return extractAndParseJSON<NumerologyResult>(response.text);
  } catch (error: any) {
    throw error;
  }
};

export const fetchHoroscope = async (birthDate: string, period: 'daily' | 'monthly' | 'yearly'): Promise<HoroscopeResult> => {
  const ai = getAIInstance();
  const periodThai = period === 'daily' ? 'รายวัน' : period === 'monthly' ? 'รายเดือน' : 'รายปี';
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `พยากรณ์ดวงชะตาแบบ ${periodThai} สำหรับผู้ที่เกิดวันที่ ${birthDate} 
      เน้นคำทำนายเชิงภาษาที่พรีเมียม 
      กรุณาระบุราศีแบบตะวันตก (westernZodiac) เช่น 'กุมภ์' และปีนักษัตรไทย (chineseZodiac) เช่น 'ปีชวด' 
      กฎเหล็ก: ห้ามส่งข้อมูลเกี่ยวกับคะแนนกราฟชีวิต 12 ภาคในส่วนนี้เด็ดขาด`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
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
    return extractAndParseJSON<HoroscopeResult>(response.text);
  } catch (error: any) {
    throw error;
  }
};

export const fetchLifeGraph = async (birthDate: string): Promise<LifeGraphResult> => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `วิเคราะห์กราฟชีวิต 12 ภาค (House Matrix) สำหรับผู้ที่เกิดวันที่ ${birthDate} 
      คำนวณคะแนนพลังงาน (0-100) สำหรับแต่ละภาคส่วน
      ส่งกลับเป็น JSON เท่านั้น ห้ามมีคำพยากรณ์รายวันปน`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            "ภาควาสนา": { type: Type.NUMBER },
            "ภาคทรัพย์": { type: Type.NUMBER },
            "ภาคเพื่อน": { type: Type.NUMBER },
            "ภาคญาติ": { type: Type.NUMBER },
            "ภาคบริวาร": { type: Type.NUMBER },
            "ภาคศัตรู": { type: Type.NUMBER },
            "ภาคคู่ครอง": { type: Type.NUMBER },
            "ภาคโรคภัย": { type: Type.NUMBER },
            "ภาคความสุข": { type: Type.NUMBER },
            "ภาคการงาน": { type: Type.NUMBER },
            "ภาคเกียรติยศ": { type: Type.NUMBER },
            "ภาคการเงิน": { type: Type.NUMBER },
            "summary": { type: Type.STRING }
          },
          required: [
            "ภาควาสนา", "ภาคทรัพย์", "ภาคเพื่อน", "ภาคญาติ", "ภาคบริวาร", 
            "ภาคศัตรู", "ภาคคู่ครอง", "ภาคโรคภัย", "ภาคความสุข", 
            "ภาคการงาน", "ภาคเกียรติยศ", "ภาคการเงิน", "summary"
          ]
        },
      },
    });
    return extractAndParseJSON<LifeGraphResult>(response.text);
  } catch (error: any) {
    throw error;
  }
};

export const generateZodiacArt = async (zodiacName: string): Promise<string> => {
  const ai = getAIInstance();
  const prompt = `Premium mystical illustration of the zodiac sign '${zodiacName}'. Elegant gold line art, constellation stars, deep indigo background.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return "";
  } catch (error) {
    return "";
  }
};

export const fetchTarotInterpretation = async (cardName: string): Promise<string> => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `แปลความหมายไพ่ทาโรต์ "${cardName}" เป็นภาษาไทยในสไตล์พรีเมียม`,
      config: { systemInstruction: "คุณคือที่ปรึกษาด้านจิตวิญญาณมืออาชีพ" }
    });
    return response.text || "จักรวาลยังไม่พร้อมให้คำตอบ";
  } catch (error: any) {
    throw error;
  }
};

export const generateTarotImage = async (cardName: string): Promise<string> => {
  const ai = getAIInstance();
  const symbolDescription = TAROT_SYMBOLS[cardName] || "Mystical symbol.";
  const prompt = `Detailed vertical tarot card: ${cardName}. ${symbolDescription}. Cosmic gold art style.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "3:4" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("Image error");
  } catch (error) {
    throw error;
  }
};

export const fetchReflectionInsight = async (thought: string): Promise<InsightResult> => {
  const ai = getAIInstance();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `วิเคราะห์และสะท้อนความคิดนี้: "${thought}" (ภาษาไทย)`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            thought: { type: Type.STRING },
            insight: { type: Type.STRING },
            guidance: { type: Type.STRING },
          },
          required: ["thought", "insight", "guidance"]
        },
      },
    });
    return extractAndParseJSON<InsightResult>(response.text);
  } catch (error: any) {
    throw error;
  }
};
