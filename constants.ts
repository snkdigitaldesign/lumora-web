import { Zodiac, TarotCard } from './types';

export const ZODIACS: Zodiac[] = [
  { id: 'aries', name: 'ราศีเมษ', date: '13 เม.ย. - 13 พ.ค.', icon: '♈' },
  { id: 'taurus', name: 'ราศีพฤษภ', date: '14 พ.ค. - 13 มิ.ย.', icon: '♉' },
  { id: 'gemini', name: 'ราศีเมถุน', date: '14 มิ.ย. - 14 ก.ค.', icon: '♊' },
  { id: 'cancer', name: 'ราศีกรกฎ', date: '15 ก.ค. - 16 ส.ค.', icon: '♋' },
  { id: 'leo', name: 'ราศีสิงห์', date: '17 ส.ค. - 16 ก.ย.', icon: '♌' },
  { id: 'virgo', name: 'ราศีกันย์', date: '17 ก.ย. - 16 ต.ค.', icon: '♍' },
  { id: 'libra', name: 'ราศีตุลย์', date: '17 ต.ค. - 15 พ.ย.', icon: '♎' },
  { id: 'scorpio', name: 'ราศีพิจิก', date: '16 พ.ย. - 15 ธ.ค.', icon: '♏' },
  { id: 'sagittarius', name: 'ราศีธนู', date: '16 ธ.ค. - 13 ม.ค.', icon: '♐' },
  { id: 'capricorn', name: 'ราศีมังกร', date: '14 ม.ค. - 12 ก.พ.', icon: '♑' },
  { id: 'aquarius', name: 'ราศีกุมภ์', date: '13 ก.พ. - 13 มี.ค.', icon: '♒' },
  { id: 'pisces', name: 'ราศีมีน', date: '14 ม.ค. - 12 เม.ย.', icon: '♓' },
];

export const MAJOR_ARCANA: string[] = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"
];

export const TAROT_SYMBOLS: Record<string, string> = {
  "The Fool": "A youthful traveler standing at the edge of a cliff, a small white dog at their heels, a white rose in hand.",
  "The Magician": "A central figure with one hand pointed to the heavens and the other to the earth, surrounded by four elemental symbols (cup, pentacle, sword, wand).",
  "The High Priestess": "A seated woman between two pillars (one black, one white), wearing a horned crown with a crescent moon at her feet.",
  "The Empress": "A regal woman crowned with stars, sitting on a throne in a lush garden, holding a scepter.",
  "The Emperor": "A stern king with a white beard sitting on a stone throne decorated with ram heads, holding an ankh scepter.",
  "The Hierophant": "A religious figure seated between two pillars, hand raised in blessing, wearing a triple crown.",
  "The Lovers": "A man and a woman standing beneath an angel, a tree of life and a tree of knowledge behind them.",
  "The Chariot": "A warrior in a chariot pulled by two sphinxes (one black, one white), wearing a crown of stars.",
  "Strength": "A woman calmly closing the jaws of a lion, an infinity symbol above her head.",
  "The Hermit": "An old man in a cloak standing on a mountain peak, holding a staff and a lantern with a glowing star.",
  "Wheel of Fortune": "A large rotating wheel with mystical creatures and symbols of destiny.",
  "Justice": "A seated figure holding scales in one hand and a double-edged sword in the other, between two pillars.",
  "The Hanged Man": "A man suspended upside down from a wooden cross or tree by one leg, a halo of light around his head.",
  "Death": "A skeletal knight in black armor riding a white horse, holding a black banner with a white rose.",
  "Temperance": "An angel pouring liquid between two golden cups, one foot in water and one on land.",
  "The Devil": "A large horned goat-headed figure sitting on a pedestal, two chained humans at the base.",
  "The Tower": "A tall stone tower struck by lightning, flames erupting from the top, people falling from it.",
  "The Star": "A nude woman pouring water from two jars into a pool and onto the earth, beneath large radiant stars.",
  "The Moon": "A path between two towers under a large moon, a wolf, a dog, and a crayfish emerging from a pool.",
  "The Sun": "A young child on a white horse beneath a large radiant sun with sunflowers below.",
  "Judgement": "An angel in the sky blowing a trumpet, people rising from below with open arms.",
  "The World": "A figure dancing in a wreath of laurel, surrounded by symbols of the four elements (man, eagle, bull, lion)."
};
