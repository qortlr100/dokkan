import { useEffect, useState } from 'react';
import { Card } from '@/lib/types';
import { generateThumbnail } from '@/lib/imageUtils';

interface ThumbnailProps {
  card: Card;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export const Thumbnail = ({
  card,
  width = 256,
  height = 256,
  className = '',
  onClick,
}: ThumbnailProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadThumbnail = async () => {
      try {
        setIsLoading(true);
        const dataUrl = await generateThumbnail(card);
        setThumbnailUrl(dataUrl);
        setError(false);
      } catch (err) {
        console.error('썸네일 생성 중 오류:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadThumbnail();
  }, [card]);

  return (
    <div
      className={`relative overflow-hidden rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
      
      {!isLoading && !error && thumbnailUrl && (
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={thumbnailUrl}
            alt={card.name}
            className="object-contain"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </div>
      )}

      {!isLoading && error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-red-500">이미지 로드 실패</span>
        </div>
      )}
    </div>
  );
}; 