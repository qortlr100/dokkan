import React from 'react';
import { getElementInfo, getElementName } from '@/constants/resourceMappings';
import { getElementColor } from '@/lib/colorUtils';
import Image from 'next/image';

interface CardProps {
  card: {
    element: number;
    name: string;
    rarity: number;
    imageUrl: string;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  const elementInfo = getElementInfo(card.element);
  const elementColor = getElementColor(elementInfo?.name || 'UNKNOWN');

  return (
    <div className="card" style={{ borderColor: elementColor }}>
      <div className="card-image">
        <Image
          src={card.imageUrl}
          alt={card.name}
          width={300}
          height={300}
          priority
        />
      </div>
      <div className="card-info">
        <h3>{card.name}</h3>
        <p>속성: {elementInfo?.description || getElementName(card.element)}</p>
        <p>레어도: {card.rarity}</p>
      </div>
    </div>
  );
};

export default Card; 