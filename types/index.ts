
export interface Zodiac {
  id: string;
  name: string;
  date: string;
  icon: string;
}

export interface InsightResult {
  thought: string;
  insight: string;
  guidance: string;
}

export interface DreamResult {
  interpretation: string;
  luckyNumbers: string;
}

export interface NumerologyResult {
  analysis: string;
  energyLevel: number;
  recommendation: string;
}

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
