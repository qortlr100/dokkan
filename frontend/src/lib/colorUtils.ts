export const getElementColor = (typeCode: number): string => {
  const colorMap: { [key: number]: string } = {
    1: '#FF4444', // STR - 빨간색
    2: '#44FF44', // DEX - 초록색
    3: '#4444FF', // INT - 파란색
    4: '#FFFF44', // TEQ - 노란색
    5: '#FF44FF', // PHY - 보라색
    6: '#44FFFF'  // AGL - 하늘색
  };

  return colorMap[typeCode] || '#888888'; // 기본 회색
}; 