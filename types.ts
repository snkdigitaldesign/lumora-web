
export interface Zodiac {
  id: string;
  name: string;
  date: string;
  icon: string;
}

export interface TarotCard {
  name: string;
  description: string;
  meaning: string;
  image: string;
}

export interface InsightResult {
  thought: string;
  insight: string;
  guidance: string;
}

// Fixed: Added DreamResult interface to match the actual API response and components/DreamInterpretation.tsx usage
export interface DreamResult {
  interpretation: string;
  luckyNumbers: string;
}

// Fixed: Added NumerologyResult interface to match the actual API response and components/Numerology.tsx usage
export interface NumerologyResult {
  analysis: string;
  energyLevel: number;
  recommendation: string;
}

// Fixed: Added westernZodiac and chineseZodiac to match the actual API response and components/Horoscope.tsx usage
export interface HoroscopeResult {
  westernZodiac: string;
  chineseZodiac: string;
  prediction: string;
  luckyColor: string;
  luckyNumber: string;
}

export interface LifeGraphResult {
  "ภาควาสนา": number;
  "ภาคทรัพย์": number;
  "ภาคเพื่อน": number;
  "ภาคญาติ": number;
  "ภาคบริวาร": number;
  "ภาคศัตรู": number;
  "ภาคคู่ครอง": number;
  "ภาคโรคภัย": number;
  "ภาคความสุข": number;
  "ภาคการงาน": number;
  "ภาคเกียรติยศ": number;
  "ภาคการเงิน": number;
  summary: string;
}
