export interface ElementMapping {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface RarityMapping {
  id: number;
  code: string;
  name: string;
  description: string;
}

export const ELEMENT_MAPPINGS: ElementMapping[] = [
  { id: 1, code: '01', name: 'AGL', description: '민첩' },
  { id: 2, code: '02', name: 'TEQ', description: '기술' },
  { id: 3, code: '03', name: 'INT', description: '지능' },
  { id: 4, code: '04', name: 'STR', description: '힘' },
  { id: 5, code: '05', name: 'PHY', description: '체력' },
];

export const RARITY_MAPPINGS: RarityMapping[] = [
  { id: 1, code: '01', name: 'N', description: '일반' },
  { id: 2, code: '02', name: 'R', description: '레어' },
  { id: 3, code: '03', name: 'SR', description: '슈퍼 레어' },
  { id: 4, code: '04', name: 'SSR', description: '슈퍼 슈퍼 레어' },
  { id: 5, code: '05', name: 'UR', description: '울트라 레어' },
  { id: 6, code: '06', name: 'LR', description: '레전더리 레어' },
];

export const getElementCode = (elementId: number): string => {
  const element = ELEMENT_MAPPINGS.find(e => e.id === elementId);
  return element?.code || '01';
};

export const getRarityCode = (rarityId: number): string => {
  const rarity = RARITY_MAPPINGS.find(r => r.id === rarityId);
  return rarity?.code || '01';
}; 