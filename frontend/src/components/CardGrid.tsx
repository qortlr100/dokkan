import { Card } from '@/lib/types';
import Link from 'next/link';
import { Thumbnail } from './Thumbnail';
import { getElementInfo } from '@/constants/resourceMappings';

interface CardGridProps {
  cards: Card[];
}

const getTypeColor = (typeCode: number): string => {
  const colorMap: { [key: number]: string } = {
    0: 'text-blue-600', // 민첩 - 파랑색
    1: 'text-green-600', // 기술 - 초록색
    2: 'text-purple-600', // 지능 - 보라색
    3: 'text-red-600', // 근력 - 빨강색
    4: 'text-yellow-600', // 체력 - 노랑색
  };
  return colorMap[typeCode] || 'text-gray-600';
};

export default function CardGrid({ cards }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {cards.map((card) => {
        const elementInfo = getElementInfo(card.element);
        const typeColor = elementInfo ? getTypeColor(elementInfo.typeCode) : 'text-gray-600';
        
        return (
          <Link key={card.id} href={`/cards/${card.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
              <div className="relative aspect-square">
                <Thumbnail
                  card={card}
                  width={265}
                  height={265}
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className={`text-lg font-semibold text-center ${typeColor}`}>{card.name}</h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 