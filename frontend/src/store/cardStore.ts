import { create } from 'zustand';
import { Card, CardQueryParams } from '@/lib/types';
import { getCards } from '@/lib/api';

interface CardStore {
  cards: Card[];
  total: number;
  loading: boolean;
  error: string | null;
  queryParams: CardQueryParams;
  setQueryParams: (params: Partial<CardQueryParams>) => void;
  fetchCards: () => Promise<void>;
}

export const useCardStore = create<CardStore>((set, get) => ({
  cards: [],
  total: 0,
  loading: false,
  error: null,
  queryParams: {
    page: 1,
    limit: 12,
    sortBy: 'name',
    sortOrder: 'ASC'
  },
  setQueryParams: (params) => {
    set((state) => ({
      queryParams: {
        ...state.queryParams,
        ...params
      }
    }));
    get().fetchCards();
  },
  fetchCards: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getCards(get().queryParams);
      set({
        cards: response.cards,
        total: response.total,
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