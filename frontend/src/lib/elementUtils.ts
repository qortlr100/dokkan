interface ElementInfo {
  name: string;
  typeCode: string;
}

export const getElementInfo = (element: string): ElementInfo => {
  const elementMap: { [key: string]: ElementInfo } = {
    'STR': { name: '힘', typeCode: 'STR' },
    'DEX': { name: '민첩', typeCode: 'DEX' },
    'INT': { name: '지능', typeCode: 'INT' },
    'TEQ': { name: '기술', typeCode: 'TEQ' },
    'PHY': { name: '체력', typeCode: 'PHY' },
    'AGL': { name: '민첩', typeCode: 'AGL' }
  };

  return elementMap[element] || { name: '알 수 없음', typeCode: 'UNKNOWN' };
}; 