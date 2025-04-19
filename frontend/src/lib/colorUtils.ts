export const getElementColor = (element: string): string => {
  const colorMap: { [key: string]: string } = {
    'STR': '#FF4444', // 빨간색
    'DEX': '#44FF44', // 초록색
    'INT': '#4444FF', // 파란색
    'TEQ': '#FFFF44', // 노란색
    'PHY': '#FF44FF', // 보라색
    'AGL': '#44FFFF'  // 하늘색
  };

  return colorMap[element] || '#888888'; // 기본 회색
}; 