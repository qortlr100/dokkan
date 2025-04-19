import { Card } from '@/lib/types';
import Link from 'next/link';
import { Thumbnail } from './Thumbnail';

interface CardGridProps {
  cards: Card[];
}

export default function CardGrid({ cards }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {cards.map((card) => (
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
              <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  레어리티: <span className="font-medium">{card.rarity}</span>
                </p>
                <p className="text-sm text-gray-600">
                  타입: <span className="font-medium">{card.type}</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 