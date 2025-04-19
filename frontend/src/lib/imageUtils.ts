import { Card } from './types';
import { getRarityInfo, getRarityCode } from '@/constants/rarityMappings';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:43000';

// 이미지 로드를 위한 유틸리티 함수
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';  // CORS 이슈 방지
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const getCharacterThumbnailLayers = (card: Card) => {
  // 요소와 레어리티 정보 가져오기
  // 마지막 숫자 추출 (1의 자리)
  const elementLastDigit = card.element % 10;
  const rarityInfo = getRarityInfo(card.rarity);

  // 배경 이미지 경로
  const bgPath = `${API_URL}/resources/layout/ko/image/character/character_thumb_bg/cha_base_${elementLastDigit.toString().padStart(2, '0')}_${card.rarity.toString().padStart(2, '0')}.png`;

  // 캐릭터 썸네일 경로
  const thumbPath = `${API_URL}/resources/character/thumb/card_${card.id}_thumb.png`;

  // 타입 아이콘 경로
  const typeIconPath = `${API_URL}/resources/layout/ko/image/character/cha_type_icon_${card.element.toString().padStart(2, '0')}.png`;

  // 레어리티 아이콘 경로
  const rarityIconPath = rarityInfo
    ? `${API_URL}/resources/layout/ko/image/character/cha_rare_sm_${rarityInfo.en}.png`
    : null;

  // 기본 이미지 경로
  const emptyImagePath = `${API_URL}/resources/layout/ko/image/character/cha_base_empty.png`;

  return {
    background: bgPath,
    character: thumbPath,
    typeIcon: typeIconPath,
    rarityIcon: rarityIconPath,
    emptyImage: emptyImagePath,
  };
};

export const generateThumbnail = async (card: Card): Promise<string> => {
  const layers = getCharacterThumbnailLayers(card);
  
  // Canvas 생성 및 설정
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Canvas context를 생성할 수 없습니다.');
  
  // 썸네일 크기 설정 (게임 스타일에 맞게 조정)
  canvas.width = 265;
  canvas.height = 265;

  // 기본 배경 위치와 크기 설정
  const BG_X = 29;
  const BG_Y = 43;
  const BG_WIDTH = 204;
  const BG_HEIGHT = 204;
  
  try {
    // 배경 이미지 그리기 (지정된 위치와 크기로)
    const bgImage = await loadImage(layers.background);
    ctx.drawImage(bgImage, BG_X, BG_Y, BG_WIDTH, BG_HEIGHT);
    
    // 캐릭터 이미지 그리기 (원본 크기 사용)
    const characterImage = await loadImage(layers.character);
    ctx.drawImage(characterImage, 6, 12, characterImage.width, characterImage.height);
    
    // 타입 아이콘 그리기 (지정된 위치와 크기로)
    const typeIconImage = await loadImage(layers.typeIcon);
    ctx.drawImage(typeIconImage, 173, 13, 96, 96);
    
    // 레어리티 아이콘 그리기 (원본 크기의 2배로)
    if (layers.rarityIcon) {
      const rarityIconImage = await loadImage(layers.rarityIcon);
      ctx.drawImage(
        rarityIconImage,
        0,
        159,
        rarityIconImage.width * 2,
        rarityIconImage.height * 2
      );
    }
    
    return canvas.toDataURL('image/png', 1.0); // 최상의 품질로 설정
  } catch (error) {
    // 에러 발생 시 빈 이미지를 배경 이미지와 동일한 위치와 크기로 그리기
    const emptyImage = await loadImage(layers.emptyImage);
    ctx.drawImage(emptyImage, BG_X, BG_Y, BG_WIDTH, BG_HEIGHT);
    return canvas.toDataURL('image/png');
  }
}; 