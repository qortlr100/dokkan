'use client';

import { useEffect } from 'react';
import { useCardStore } from '@/store/cardStore';
import CardGrid from '@/components/CardGrid';
import SearchFilters from '@/components/SearchFilters';

export default function Home() {
  const { cards, loading, error, fetchCards } = useCardStore();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">드래곤볼 독칸 배틀 카드 목록</h1>
      
      <div className="mb-8">
        <SearchFilters />
      </div>

      {loading ? (
        <div className="text-center">로딩 중...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <CardGrid cards={cards} />
      )}
    </main>
  );
}
