export interface ElementMapping {
  id: number;
  classCode: number;  // 10의 자리: 계열 (0: 없음, 1: 초, 2: 극)
  typeCode: number;  // 1의 자리: 속성 (0: 민첩, 1: 기술, 2: 지능, 3: 근력, 4: 체력)
  className: string;  // 계열 이름 (0: '', 1: '초', 2: '극')
  typeName: string;  // 속성 이름 (0: '민첩', 1: '기술', 2: '지능', 3: '근력', 4: '체력')
}

export interface RarityMapping {
  id: number;
  name: string;
}

export const ELEMENT_MAPPINGS: ElementMapping[] = [
  // 기본 속성 (ID: 0~4)
  { id: 0, classCode: 0, typeCode: 0, className: '', typeName: '민첩' },   // 민첩
  { id: 1, classCode: 0, typeCode: 1, className: '', typeName: '기술' },   // 기술
  { id: 2, classCode: 0, typeCode: 2, className: '', typeName: '지능' },   // 지능
  { id: 3, classCode: 0, typeCode: 3, className: '', typeName: '근력' },   // 근력
  { id: 4, classCode: 0, typeCode: 4, className: '', typeName: '체력' },   // 체력
  // 초 속성 (ID: 10~14)
  { id: 10, classCode: 1, typeCode: 0, className: '초', typeName: '민첩' },  // 초 민첩
  { id: 11, classCode: 1, typeCode: 1, className: '초', typeName: '기술' },  // 초 기술
  { id: 12, classCode: 1, typeCode: 2, className: '초', typeName: '지능' },  // 초 지능
  { id: 13, classCode: 1, typeCode: 3, className: '초', typeName: '근력' },  // 초 근력
  { id: 14, classCode: 1, typeCode: 4, className: '초', typeName: '체력' },  // 초 체력
  // 극 속성 (ID: 20~24)
  { id: 20, classCode: 2, typeCode: 0, className: '극', typeName: '민첩' },  // 극 민첩
  { id: 21, classCode: 2, typeCode: 1, className: '극', typeName: '기술' },  // 극 기술
  { id: 22, classCode: 2, typeCode: 2, className: '극', typeName: '지능' },  // 극 지능
  { id: 23, classCode: 2, typeCode: 3, className: '극', typeName: '근력' },  // 극 근력
  { id: 24, classCode: 2, typeCode: 4, className: '극', typeName: '체력' },  // 극 체력
];

export const RARITY_MAPPINGS: RarityMapping[] = [
  { id: 0, name: 'n' },
  { id: 1, name: 'r' },
  { id: 2, name: 'sr' },
  { id: 3, name: 'ssr' },
  { id: 4, name: 'ur' },
  { id: 5, name: 'lr' },
];

export const getElementInfo = (elementId: number): ElementMapping | undefined => {
  return ELEMENT_MAPPINGS.find(e => e.id === elementId);
};

export const getRarityInfo = (rarityId: number): RarityMapping | undefined => {
  return RARITY_MAPPINGS.find(r => r.id === rarityId);
}; 