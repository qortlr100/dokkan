import { create } from 'zustand';
import { Card, CardQueryParams } from '@/lib/types';
import { getCards } from '@/lib/api';

interface CardStore {
  cards: Card[];
  loading: boolean;
  error: string | null;
  fetchCards: () => Promise<void>;
}

export const useCardStore = create<CardStore>((set) => ({
  cards: [],
  loading: false,
  error: null,
  fetchCards: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getCards({
        limit: 10,
        sortBy: 'open_at',
        sortOrder: 'DESC',
        idPrefix: '1'
      });
      set({
        cards: response.cards,
        loading: false
      });
    } catch (error) {
      set({
        error: '카드 정보를 불러오는데 실패했습니다.',
        loading: false
      });
      console.error('Error fetching cards:', error);
    }
  }
})); 