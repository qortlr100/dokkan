export interface RarityInfo {
  id: number;
  en: string;
  ko: string;
}

export const RARITY_MAPPINGS: RarityInfo[] = [
  { id: 0, en: 'n', ko: 'n' },
  { id: 1, en: 'r', ko: 'r' },
  { id: 2, en: 'sr', ko: 'sr' },
  { id: 3, en: 'ssr', ko: 'ssr' },
  { id: 4, en: 'ur', ko: 'ur' },
  { id: 5, en: 'lr', ko: 'lr' },
];

export const getRarityInfo = (rarityId: number): RarityInfo | undefined => {
  return RARITY_MAPPINGS.find(r => r.id === rarityId);
};

export const getRarityCode = (rarityId: number): string => {
  return rarityId.toString().padStart(2, '0');
}; 